const Redis = require('ioredis');

class RedisClient {
    constructor() {
        console.log("NEXT_PUBLIC_REDIS_HOST", "process.env.NEXT_PUBLIC_REDIS_HOST")
        console.log("isProduction", process.env.NEXT_PUBLIC_REDIS_HOST)
        this.client = new Redis({
            host: process.env.NEXT_PUBLIC_REDIS_HOST || 'localhost',
            port: 6379,
            // Optional: Add password if you set one
            // password: process.env.REDIS_PASSWORD,

            // Connection options
            maxRetriesPerRequest: 3,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },

            // Enable offline queue
            enableOfflineQueue: true,

            // Set connection timeout
            connectTimeout: 10000,
        });

        // Error handling
        this.client.on('error', (err) => {
            console.error('❌ Redis Client Error:', err.message);
        });

        this.client.on('connect', () => {
            console.log('✅ Redis connected successfully');
        });

        this.client.on('ready', () => {
            console.log('✅ Redis ready for commands');
        });

        this.client.on('end', () => {
            console.log('🔴 Redis connection closed');
        });
    }

    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    getClient() {
        return this.client;
    }

    async disconnect() {
        await this.client.quit();
    }

    async ping() {
        return await this.client.ping();
    }

    async flushAll() {
        await this.client.flushall();
        console.log('🗑️  Redis cache cleared');
    }

    async getStats() {
        try {
            const [info, dbsize] = await Promise.all([
                this.client.info(),
                this.client.dbsize(),
            ]);

            // Parse memory info
            const memoryMatch = info.match(/used_memory_human:(\S+)/);
            const uptimeMatch = info.match(/uptime_in_seconds:(\d+)/);

            return {
                connected: true,
                memory: memoryMatch ? memoryMatch[1] : 'N/A',
                keys: dbsize,
                uptime: uptimeMatch ? parseInt(uptimeMatch[1]) : 0,
            };
        } catch (error) {
            return {
                connected: false,
                memory: 'N/A',
                keys: 0,
                uptime: 0,
            };
        }
    }
}

// Export singleton instance
const redisClient = RedisClient.getInstance();
export default redisClient.getClient();

// Helper functions
export const redis = redisClient.getClient();
export const redisManager = redisClient;