interface LogEntry {
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    userId?: string;
    ip?: string;
    userAgent?: string;
    path?: string;
    method?: string;
    additionalData?: Record<string, unknown>;
}

class Logger {
    private formatLog(entry: LogEntry): string {
        const baseInfo = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;

        const contextInfo = [
            entry.userId && `userId=${entry.userId}`,
            entry.ip && `ip=${entry.ip}`,
            entry.path && `path=${entry.path}`,
            entry.method && `method=${entry.method}`,
            entry.userAgent && `ua=${entry.userAgent}`
        ].filter(Boolean).join(' ');

        return `${baseInfo}${contextInfo ? ` | ${contextInfo}` : ''}${entry.additionalData ? ` | ${JSON.stringify(entry.additionalData)}` : ''
            }`;
    }

    private createLogEntry(
        level: LogEntry['level'],
        message: string,
        req?: Request,
        additionalData?: Record<string, unknown>
    ): LogEntry {
        const forwarded = req?.headers?.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            ip,
            userAgent: req?.headers?.get('user-agent') || undefined,
            path: req ? new URL(req.url).pathname : undefined,
            method: req?.method,
            additionalData
        };
    }

    info(message: string, req?: Request, additionalData?: Record<string, unknown>) {
        const entry = this.createLogEntry('info', message, req, additionalData);
        console.log(this.formatLog(entry));
    }

    warn(message: string, req?: Request, additionalData?: Record<string, unknown>) {
        const entry = this.createLogEntry('warn', message, req, additionalData);
        console.warn(this.formatLog(entry));
    }

    error(message: string, req?: Request, additionalData?: Record<string, unknown>) {
        const entry = this.createLogEntry('error', message, req, additionalData);
        console.error(this.formatLog(entry));
    }

    // Security-specific logging
    security(message: string, req?: Request, additionalData?: Record<string, unknown>) {
        const entry = this.createLogEntry('warn', `[SECURITY] ${message}`, req, additionalData);
        console.warn(this.formatLog(entry));
    }

    auth(message: string, req?: Request, additionalData?: Record<string, unknown>) {
        const entry = this.createLogEntry('info', `[AUTH] ${message}`, req, additionalData);
        console.log(this.formatLog(entry));
    }
}

export const logger = new Logger();

// CSRF Protection utility
export function generateCSRFToken(): string {
    return crypto.randomUUID();
}

export function validateCSRFToken(token: string, expectedToken: string): boolean {
    // In production, use timing-safe comparison
    return token === expectedToken;
}

// Rate limit exceeded logging
export function logRateLimitExceeded(req: Request, identifier: string) {
    logger.security(`Rate limit exceeded for ${identifier}`, req, {
        identifier,
        action: 'rate_limit_exceeded'
    });
}

// Authentication logging
export function logAuthAttempt(req: Request, success: boolean, userId?: string) {
    logger.auth(
        success ? 'Login successful' : 'Login failed',
        req,
        { success, userId }
    );
}

export function logAuthLogout(req: Request, userId?: string) {
    logger.auth('Logout', req, { userId });
}

// Admin action logging
export function logAdminAction(req: Request, action: string, userId: string, details?: Record<string, unknown>) {
    logger.info(`[ADMIN] ${action}`, req, {
        userId,
        action,
        ...details
    });
}
