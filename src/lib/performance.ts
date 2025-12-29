// Performance optimization utilities
import { logger } from './logger';

// Response caching
class Cache {
    private cache = new Map<string, { data: unknown; expires: number }>();

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }

        return item.data as T;
    }

    set(key: string, data: unknown, ttlSeconds: number = 300): void {
        const expires = Date.now() + (ttlSeconds * 1000);
        this.cache.set(key, { data, expires });
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }
}

export const responseCache = new Cache();

// Optimized database queries with caching
export class QueryOptimizer {
    private static cache = new Map<string, { data: unknown; timestamp: number }>();

    static async getCachedQuery<T>(
        cacheKey: string,
        queryFn: () => Promise<T>,
        ttlSeconds: number = 60
    ): Promise<T> {
        const cached = this.cache.get(cacheKey);
        const now = Date.now();

        if (cached && (now - cached.timestamp) < (ttlSeconds * 1000)) {
            logger.info(`Cache hit for: ${cacheKey}`);
            return cached.data as T;
        }

        const data = await queryFn();
        this.cache.set(cacheKey, { data, timestamp: now });

        logger.info(`Cache miss for: ${cacheKey}`);
        return data;
    }

    static clearCache(): void {
        this.cache.clear();
        logger.info('Query cache cleared');
    }

    static getCacheStats() {
        return {
            size: this.cache.size,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Image optimization utilities
export class ImageOptimizer {
    static generateResponsiveSizes(baseWidth: number): number[] {
        // Generate responsive image sizes
        const sizes = [];
        let width = baseWidth;

        while (width >= 320) {
            sizes.push(width);
            width = Math.floor(width * 0.75); // Reduce by 25% each time
        }

        return sizes.reverse();
    }

    static generateSrcSet(images: string[], sizes: number[]): string {
        return images
            .map((img, index) => `${img} ${sizes[index]}w`)
            .join(', ');
    }

    static getOptimalFormat(acceptHeader: string): string {
        if (acceptHeader.includes('image/webp')) return 'webp';
        if (acceptHeader.includes('image/avif')) return 'avif';
        return 'jpeg';
    }
}

// Lazy loading and virtualization helpers
export class VirtualScroller {
    static calculateVisibleRange(
        scrollTop: number,
        itemHeight: number,
        containerHeight: number,
        totalItems: number
    ): { start: number; end: number } {
        const start = Math.floor(scrollTop / itemHeight);
        const visibleCount = Math.ceil(containerHeight / itemHeight);
        const end = Math.min(start + visibleCount + 2, totalItems); // Add buffer

        return { start: Math.max(0, start), end };
    }

    static getVisibleItems<T>(
        items: T[],
        scrollTop: number,
        itemHeight: number,
        containerHeight: number
    ): T[] {
        const { start, end } = this.calculateVisibleRange(
            scrollTop,
            itemHeight,
            containerHeight,
            items.length
        );

        return items.slice(start, end);
    }
}

// Memory usage monitoring
export class MemoryMonitor {
    static getMemoryUsage() {
        if (typeof performance !== 'undefined' && 'memory' in performance) {
            const mem = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
            return {
                used: mem.usedJSHeapSize,
                total: mem.totalJSHeapSize,
                limit: mem.jsHeapSizeLimit,
                usedMB: Math.round(mem.usedJSHeapSize / 1024 / 1024),
                totalMB: Math.round(mem.totalJSHeapSize / 1024 / 1024),
                limitMB: Math.round(mem.jsHeapSizeLimit / 1024 / 1024)
            };
        }

        return null;
    }

    static logMemoryUsage(context: string = '') {
        const memory = this.getMemoryUsage();
        if (memory) {
            logger.info(`Memory usage ${context}`, undefined, {
                usedMB: memory.usedMB,
                totalMB: memory.totalMB,
                limitMB: memory.limitMB,
                usagePercent: Math.round((memory.usedMB / memory.limitMB) * 100)
            });
        }
    }

    static checkMemoryPressure(): 'low' | 'medium' | 'high' | 'critical' {
        const memory = this.getMemoryUsage();
        if (!memory) return 'low';

        const usagePercent = (memory.usedMB / memory.limitMB) * 100;

        if (usagePercent > 90) return 'critical';
        if (usagePercent > 75) return 'high';
        if (usagePercent > 50) return 'medium';
        return 'low';
    }
}

// Bundle size optimization helpers
export class BundleOptimizer {
    static async loadComponent<T>(
        importFn: () => Promise<{ default: T }>
    ): Promise<{ default: T }> {
        const start = Date.now();
        try {
            const componentModule = await importFn();
            const loadTime = Date.now() - start;

            if (loadTime > 1000) {
                logger.warn(`Slow component load`, undefined, {
                    loadTime,
                    component: importFn.toString().substring(0, 100)
                });
            }

            return componentModule;
        } catch (error) {
            logger.error(`Component load failed`, undefined, {
                error: (error as Error).message,
                component: importFn.toString().substring(0, 100)
            });
            throw error;
        }
    }

    static preloadCriticalImages(images: string[]): void {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Database connection pooling optimization
export class ConnectionPoolOptimizer {
    static async optimizeConnectionPool(): Promise<void> {
        // This would be used in production with connection poolers like PgBouncer
        // For now, just log connection pool stats
        logger.info('Connection pool optimization placeholder');
    }

    static async monitorConnectionHealth(): Promise<{
        activeConnections: number;
        idleConnections: number;
        waitingClients: number;
    }> {
        // Placeholder for connection monitoring
        return {
            activeConnections: 0,
            idleConnections: 0,
            waitingClients: 0
        };
    }
}

// CDN optimization
export class CDNOptimizer {
    static getOptimalCDNUrl(baseUrl: string): string {
        // Placeholder for CDN optimization based on user location
        // In production, you might use services like CloudFlare or AWS CloudFront
        return baseUrl;
    }

    static generateCacheKey(path: string, params: Record<string, string>): string {
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}=${params[key]}`)
            .join('&');

        return `${path}?${sortedParams}`;
    }
}

// Performance monitoring middleware
export function withPerformanceLogging<T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
    operationName: string
): T {
    return (async (...args: unknown[]) => {
        const start = Date.now();
        try {
            const result = await fn(...args);
            const duration = Date.now() - start;

            // Log performance metrics
            logger.info(`Performance: ${operationName}`, undefined, {
                duration,
                operation: operationName,
                timestamp: new Date().toISOString()
            });

            return result;
        } catch (error) {
            const duration = Date.now() - start;
            logger.error(`Performance error: ${operationName}`, undefined, {
                duration,
                operation: operationName,
                error: (error as Error).message
            });
            throw error;
        }
    }) as T;
}
