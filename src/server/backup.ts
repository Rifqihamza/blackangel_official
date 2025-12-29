// Database backup and recovery utilities
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from './logger';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

interface BackupOptions {
    databaseUrl: string;
    backupDir: string;
    retentionDays: number;
    compress: boolean;
}

export class DatabaseBackup {
    private options: BackupOptions;

    constructor(options: BackupOptions) {
        this.options = options;
    }

    // Create a database backup
    async createBackup(filename?: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFileName = filename || `backup-${timestamp}.sql`;
        const backupPath = path.join(this.options.backupDir, backupFileName);

        try {
            // Ensure backup directory exists
            await fs.promises.mkdir(this.options.backupDir, { recursive: true });

            // Extract database connection details from URL
            const dbUrl = new URL(this.options.databaseUrl);
            const host = dbUrl.hostname;
            const port = dbUrl.port || '5432';
            const database = dbUrl.pathname.slice(1);
            const username = dbUrl.username;
            const password = dbUrl.password;

            // Create pg_dump command
            const dumpCommand = `pg_dump --host=${host} --port=${port} --username=${username} --dbname=${database} --no-password --format=custom --compress=9 --file=${backupPath}`;

            // Set password environment variable
            const env = { ...process.env, PGPASSWORD: password };

            logger.info(`Starting database backup: ${backupFileName}`);

            await execAsync(dumpCommand, { env });

            // Verify backup file was created
            const stats = await fs.promises.stat(backupPath);
            logger.info(`Database backup completed: ${backupFileName} (${stats.size} bytes)`);

            return backupPath;
        } catch (error) {
            logger.error(`Database backup failed: ${backupFileName}`, undefined, {
                error: (error as Error).message
            });
            throw error;
        }
    }

    // Restore from backup
    async restoreBackup(backupPath: string): Promise<void> {
        try {
            // Verify backup file exists
            await fs.promises.access(backupPath);

            // Extract database connection details
            const dbUrl = new URL(this.options.databaseUrl);
            const host = dbUrl.hostname;
            const port = dbUrl.port || '5432';
            const database = dbUrl.pathname.slice(1);
            const username = dbUrl.username;
            const password = dbUrl.password;

            // Create pg_restore command
            const restoreCommand = `pg_restore --host=${host} --port=${port} --username=${username} --dbname=${database} --no-password --clean --if-exists ${backupPath}`;

            const env = { ...process.env, PGPASSWORD: password };

            logger.info(`Starting database restore from: ${backupPath}`);

            await execAsync(restoreCommand, { env });

            logger.info(`Database restore completed from: ${backupPath}`);
        } catch (error) {
            logger.error(`Database restore failed from: ${backupPath}`, undefined, {
                error: (error as Error).message
            });
            throw error;
        }
    }

    // Clean up old backups
    async cleanupOldBackups(): Promise<void> {
        try {
            const files = await fs.promises.readdir(this.options.backupDir);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - this.options.retentionDays);

            let deletedCount = 0;
            for (const file of files) {
                if (file.startsWith('backup-') && file.endsWith('.sql')) {
                    const filePath = path.join(this.options.backupDir, file);
                    const stats = await fs.promises.stat(filePath);

                    if (stats.mtime < cutoffDate) {
                        await fs.promises.unlink(filePath);
                        deletedCount++;
                    }
                }
            }

            if (deletedCount > 0) {
                logger.info(`Cleaned up ${deletedCount} old backup files`);
            }
        } catch (error) {
            logger.error('Failed to cleanup old backups', undefined, {
                error: (error as Error).message
            });
        }
    }

    // Get backup statistics
    async getBackupStats(): Promise<{
        totalBackups: number;
        totalSize: number;
        oldestBackup?: Date;
        newestBackup?: Date;
    }> {
        try {
            const files = await fs.promises.readdir(this.options.backupDir);
            const backupFiles = files.filter(f => f.startsWith('backup-') && f.endsWith('.sql'));

            if (backupFiles.length === 0) {
                return { totalBackups: 0, totalSize: 0 };
            }

            let totalSize = 0;
            let oldestDate: Date | undefined;
            let newestDate: Date | undefined;

            for (const file of backupFiles) {
                const filePath = path.join(this.options.backupDir, file);
                const stats = await fs.promises.stat(filePath);
                totalSize += stats.size;

                const fileDate = stats.mtime;
                if (!oldestDate || fileDate < oldestDate) {
                    oldestDate = fileDate;
                }
                if (!newestDate || fileDate > newestDate) {
                    newestDate = fileDate;
                }
            }

            return {
                totalBackups: backupFiles.length,
                totalSize,
                oldestBackup: oldestDate,
                newestBackup: newestDate
            };
        } catch (error) {
            logger.error('Failed to get backup statistics', undefined, {
                error: (error as Error).message
            });
            return { totalBackups: 0, totalSize: 0 };
        }
    }
}

// Backup scheduler
export class BackupScheduler {
    private intervalId?: NodeJS.Timeout;

    constructor(
        private backupService: DatabaseBackup,
        private schedule: {
            cronExpression: string; // Simplified - would need a cron parser
            enabled: boolean;
        }
    ) { }

    start(): void {
        if (!this.schedule.enabled) return;

        // For simplicity, run daily at midnight
        // In production, you'd want a proper cron scheduler
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const timeUntilMidnight = midnight.getTime() - now.getTime();

        setTimeout(() => {
            this.runScheduledBackup();
            // Then run every 24 hours
            this.intervalId = setInterval(this.runScheduledBackup.bind(this), 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);

        logger.info('Database backup scheduler started');
    }

    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        logger.info('Database backup scheduler stopped');
    }

    private async runScheduledBackup(): Promise<void> {
        try {
            const backupPath = await this.backupService.createBackup();
            logger.info(`Scheduled backup completed: ${backupPath}`);

            // Cleanup old backups
            await this.backupService.cleanupOldBackups();
        } catch (error) {
            logger.error('Scheduled backup failed', undefined, {
                error: (error as Error).message
            });
        }
    }
}
