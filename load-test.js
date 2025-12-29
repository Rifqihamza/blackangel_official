#!/usr/bin/env node

/**
 * Simple Load Testing Script for Black Angel Store API
 *
 * Usage:
 *   node load-test.js [endpoint] [concurrency] [requests]
 *
 * Examples:
 *   node load-test.js /api/products 10 100
 *   node load-test.js /api/auth/signin 5 50
 */

import https from 'https';
import http from 'http';

class LoadTester {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
        this.results = {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            responseTimes: [],
            statusCodes: {},
            errors: []
        };
    }

    async makeRequest(endpoint, method = 'GET', data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(endpoint, this.baseUrl);
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname + url.search,
                method: method,
                headers: {
                    'User-Agent': 'LoadTest/1.0',
                    'Content-Type': 'application/json',
                    ...headers
                }
            };

            const startTime = Date.now();
            const client = url.protocol === 'https:' ? https : http;

            const req = client.request(options, (res) => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;

                this.results.responseTimes.push(responseTime);
                this.results.statusCodes[res.statusCode] = (this.results.statusCodes[res.statusCode] || 0) + 1;

                if (res.statusCode >= 200 && res.statusCode < 300) {
                    this.results.successfulRequests++;
                } else {
                    this.results.failedRequests++;
                }

                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        responseTime,
                        body: body.length > 500 ? body.substring(0, 500) + '...' : body
                    });
                });
            });

            req.on('error', (error) => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;

                this.results.responseTimes.push(responseTime);
                this.results.failedRequests++;
                this.results.errors.push(error.message);

                reject(error);
            });

            if (data && (method === 'POST' || method === 'PUT')) {
                req.write(JSON.stringify(data));
            }

            req.setTimeout(30000, () => {
                req.destroy();
                this.results.failedRequests++;
                this.results.errors.push('Request timeout');
                reject(new Error('Request timeout'));
            });

            req.end();
        });
    }

    async runLoadTest(endpoint, concurrency = 10, totalRequests = 100) {
        console.log(`🚀 Starting load test: ${endpoint}`);
        console.log(`📊 Concurrency: ${concurrency}, Total Requests: ${totalRequests}`);
        console.log(`🎯 Target: ${this.baseUrl}${endpoint}`);
        console.log('─'.repeat(50));

        this.results.totalRequests = totalRequests;
        const startTime = Date.now();

        // Create batches of concurrent requests
        const batches = [];
        for (let i = 0; i < totalRequests; i += concurrency) {
            const batchSize = Math.min(concurrency, totalRequests - i);
            const batch = Array.from({ length: batchSize }, () =>
                this.makeRequest(endpoint).catch(() => null)
            );
            batches.push(batch);
        }

        // Execute batches sequentially
        for (const batch of batches) {
            await Promise.all(batch);

            // Show progress
            const completed = this.results.successfulRequests + this.results.failedRequests;
            const progress = Math.round((completed / totalRequests) * 100);
            process.stdout.write(`\r📈 Progress: ${completed}/${totalRequests} (${progress}%)`);
        }

        console.log('\n' + '─'.repeat(50));

        const endTime = Date.now();
        const totalDuration = endTime - startTime;

        this.printResults(totalDuration);
    }

    printResults(totalDuration) {
        const { responseTimes, successfulRequests, failedRequests, statusCodes, errors } = this.results;

        console.log('📊 LOAD TEST RESULTS');
        console.log('─'.repeat(30));

        console.log(`⏱️  Total Duration: ${totalDuration}ms`);
        console.log(`📈 Total Requests: ${this.results.totalRequests}`);
        console.log(`✅ Successful: ${successfulRequests}`);
        console.log(`❌ Failed: ${failedRequests}`);
        console.log(`📊 Success Rate: ${((successfulRequests / this.results.totalRequests) * 100).toFixed(2)}%`);
        console.log(`🚀 Requests/sec: ${(this.results.totalRequests / (totalDuration / 1000)).toFixed(2)}`);

        if (responseTimes.length > 0) {
            const sortedTimes = responseTimes.sort((a, b) => a - b);
            console.log('\n⏱️  Response Times (ms):');
            console.log(`  Average: ${Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)}`);
            console.log(`  Median: ${sortedTimes[Math.floor(sortedTimes.length / 2)]}`);
            console.log(`  95th percentile: ${sortedTimes[Math.floor(sortedTimes.length * 0.95)]}`);
            console.log(`  Min: ${Math.min(...responseTimes)}`);
            console.log(`  Max: ${Math.max(...responseTimes)}`);
        }

        if (Object.keys(statusCodes).length > 0) {
            console.log('\n📋 Status Codes:');
            Object.entries(statusCodes)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .forEach(([code, count]) => {
                    console.log(`  ${code}: ${count}`);
                });
        }

        if (errors.length > 0) {
            console.log('\n❌ Top Errors:');
            const errorCounts = {};
            errors.forEach(error => {
                errorCounts[error] = (errorCounts[error] || 0) + 1;
            });

            Object.entries(errorCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .forEach(([error, count]) => {
                    console.log(`  ${error}: ${count}`);
                });
        }

        console.log('\n🎯 Performance Assessment:');
        const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
        const successRate = (successfulRequests / this.results.totalRequests) * 100;

        if (successRate >= 99 && avgResponseTime < 500) {
            console.log('  🟢 EXCELLENT: High success rate and fast responses');
        } else if (successRate >= 95 && avgResponseTime < 1000) {
            console.log('  🟡 GOOD: Acceptable performance');
        } else if (successRate >= 90) {
            console.log('  🟠 FAIR: Performance needs improvement');
        } else {
            console.log('  🔴 POOR: Critical performance issues');
        }
    }

    // Test specific endpoints with different scenarios
    async runComprehensiveTest() {
        console.log('🧪 Running comprehensive API load test...\n');

        const tests = [
            { endpoint: '/api/products', name: 'Public Products List', concurrency: 20, requests: 200 },
            { endpoint: '/api/categories', name: 'Categories List', concurrency: 10, requests: 100 },
            // Note: Admin endpoints would require authentication
            // { endpoint: '/api/admin/products', name: 'Admin Products List', concurrency: 5, requests: 50 },
        ];

        for (const test of tests) {
            console.log(`\n🎯 Testing: ${test.name}`);
            await this.runLoadTest(test.endpoint, test.concurrency, test.requests);
            console.log('');
        }
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    const tester = new LoadTester(process.env.BASE_URL || 'http://localhost:3000');

    if (args.length === 0) {
        console.log('🔧 Load Testing Script for Black Angel Store API');
        console.log('');
        console.log('Usage:');
        console.log('  node load-test.js <endpoint> [concurrency] [requests]');
        console.log('  node load-test.js comprehensive');
        console.log('');
        console.log('Examples:');
        console.log('  node load-test.js /api/products 10 100');
        console.log('  node load-test.js /api/auth/signin 5 50');
        console.log('  node load-test.js comprehensive');
        console.log('');
        console.log('Environment Variables:');
        console.log('  BASE_URL - Base URL for testing (default: http://localhost:3000)');
        return;
    }

    if (args[0] === 'comprehensive') {
        await tester.runComprehensiveTest();
        return;
    }

    const endpoint = args[0];
    const concurrency = parseInt(args[1]) || 10;
    const requests = parseInt(args[2]) || 100;

    try {
        await tester.runLoadTest(endpoint, concurrency, requests);
    } catch (error) {
        console.error('❌ Load test failed:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = LoadTester;
