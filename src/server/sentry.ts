// Lightweight monitoring system (Sentry-compatible API without external dependencies)
import { logger } from './logger';

interface ErrorEvent {
    exception?: {
        values: Array<{
            type: string;
            value: string;
            stacktrace?: unknown;
        }>;
    };
    level?: 'error' | 'warning' | 'info';
    timestamp: string;
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
}

// In-memory error aggregator (for development/production monitoring)
class ErrorAggregator {
    private errors: ErrorEvent[] = [];
    private maxErrors = 1000; // Keep last 1000 errors

    addError(error: ErrorEvent) {
        this.errors.push(error);
        if (this.errors.length > this.maxErrors) {
            this.errors.shift(); // Remove oldest
        }
    }

    getErrors(): ErrorEvent[] {
        return [...this.errors];
    }

    getErrorSummary() {
        const summary: Record<string, number> = {};
        this.errors.forEach(error => {
            const key = error.exception?.values?.[0]?.type || 'Unknown';
            summary[key] = (summary[key] || 0) + 1;
        });
        return summary;
    }
}

const errorAggregator = new ErrorAggregator();

// Initialize monitoring (call this in your app)
export function initMonitoring() {
    if (process.env.NODE_ENV === 'production') {
        logger.info('Production monitoring initialized');
    }
}

// Error boundary for React components
export class MonitoringErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
    { hasError: boolean; error?: Error }
> {
    constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const errorEvent: ErrorEvent = {
            exception: {
                values: [{
                    type: error.name,
                    value: error.message,
                    stacktrace: errorInfo.componentStack
                }]
            },
            level: 'error',
            timestamp: new Date().toISOString(),
            tags: { category: 'react_error' },
            extra: { componentStack: errorInfo.componentStack }
        };

        errorAggregator.addError(errorEvent);
        logger.error(`React Error Boundary: ${error.message}`, undefined, {
            componentStack: errorInfo.componentStack,
            errorName: error.name
        });
    }

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return React.createElement(FallbackComponent, { error: this.state.error });
            }

            return React.createElement('div', { className: 'error-boundary' },
                React.createElement('h2', null, 'Something went wrong'),
                React.createElement('p', null, 'Please try refreshing the page'),
                process.env.NODE_ENV === 'development' && React.createElement('details', null,
                    React.createElement('summary', null, 'Error Details'),
                    React.createElement('pre', null, this.state.error.message)
                )
            );
        }

        return this.props.children;
    }
}

// Monitoring logger
export const monitoringLogger = {
    error: (error: Error, context?: Record<string, unknown>) => {
        const errorEvent: ErrorEvent = {
            exception: {
                values: [{
                    type: error.name,
                    value: error.message,
                    stacktrace: error.stack
                }]
            },
            level: 'error',
            timestamp: new Date().toISOString(),
            tags: { category: 'error' },
            extra: context
        };

        errorAggregator.addError(errorEvent);
        logger.error(error.message, undefined, context);
    },

    security: (message: string, context?: Record<string, unknown>) => {
        logger.security(message, undefined, context);
    },

    performance: (operation: string, duration: number, context?: Record<string, unknown>) => {
        logger.warn(`[PERFORMANCE] ${operation} took ${duration}ms`, undefined, {
            operation,
            duration,
            ...context
        });
    },
};

// Performance monitoring wrapper
export function withPerformanceMonitoring<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    operationName: string
): T {
    return (async (...args: unknown[]) => {
        const start = Date.now();
        try {
            const result = await fn(...args);
            const duration = Date.now() - start;

            // Log slow operations (>1000ms)
            if (duration > 1000) {
                monitoringLogger.performance(operationName, duration, {
                    args: JSON.stringify(args).substring(0, 500), // Truncate for privacy
                });
            }

            return result;
        } catch (error) {
            const duration = Date.now() - start;
            monitoringLogger.error(error as Error, {
                operation: operationName,
                duration,
                args: JSON.stringify(args).substring(0, 500),
            });
            throw error;
        }
    }) as T;
}

// Database operation monitoring
export function withDatabaseMonitoring<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    operationName: string
): T {
    return (async (...args: unknown[]) => {
        const start = Date.now();
        try {
            const result = await fn(...args);
            const duration = Date.now() - start;

            // Log slow database operations (>500ms)
            if (duration > 500) {
                monitoringLogger.performance(`DB: ${operationName}`, duration, {
                    operation: operationName,
                });
            }

            return result;
        } catch (error) {
            monitoringLogger.error(error as Error, {
                operation: `DB: ${operationName}`,
                duration: Date.now() - start,
            });
            throw error;
        }
    }) as T;
}

// Monitoring API endpoint for health checks
export async function getMonitoringStats() {
    return {
        errorSummary: errorAggregator.getErrorSummary(),
        totalErrors: errorAggregator.getErrors().length,
        recentErrors: errorAggregator.getErrors().slice(-10), // Last 10 errors
        timestamp: new Date().toISOString()
    };
}

// Import React for the error boundary
import React from 'react';
