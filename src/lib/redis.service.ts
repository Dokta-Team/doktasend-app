import { redis } from './redis';

/**
 * Reusable Redis CRUD Service
 * - JSON safe
 * - TTL support
 * - Namespaced keys
 */
class RedisService {
    /* ----------------------------------------------------
     * CREATE / SET
     * -------------------------------------------------- */
    async set<T>(key: string, value: T, ttlSeconds?: number) {
        const data = JSON.stringify(value);

        if (ttlSeconds && ttlSeconds > 0) {
            await redis.set(key, data, 'EX', ttlSeconds);
        } else {
            await redis.set(key, data);
        }
    }

    /* ----------------------------------------------------
     * READ / GET
     * -------------------------------------------------- */
    async get<T>(key){
        const data = await redis.get(key);
        if (!data) return null;

        try {
            return JSON.parse(data) as T;
        } catch {
            return null;
        }
    }

    /* ----------------------------------------------------
     * UPDATE
     * (fails if key does not exist)
     * -------------------------------------------------- */
    async update<T>(
        key: string,
        value: T,
        ttlSeconds?: number
    ){
        const exists = await redis.exists(key);
        if (!exists) {
            throw new Error(`Redis key "${key}" does not exist`);
        }

        await this.set(key, value, ttlSeconds);
    }

    /* ----------------------------------------------------
     * DELETE
     * -------------------------------------------------- */
    async delete(key: string): Promise<void> {
        await redis.del(key);
    }

    /* ----------------------------------------------------
     * EXISTS
     * -------------------------------------------------- */
    async exists(key: string): Promise<boolean> {
        return (await redis.exists(key)) === 1;
    }

    /* ----------------------------------------------------
     * INCREMENT (counters, views, etc.)
     * -------------------------------------------------- */
    async increment(key: string, by = 1): Promise<number> {
        return redis.incrby(key, by);
    }

    /* ----------------------------------------------------
     * TTL / EXPIRATION
     * -------------------------------------------------- */
    async ttl(key: string): Promise<number> {
        return redis.ttl(key);
    }

    async expire(key: string, ttlSeconds: number): Promise<void> {
        await redis.expire(key, ttlSeconds);
    }

    /* ----------------------------------------------------
     * PATTERN KEYS (use carefully)
     * -------------------------------------------------- */
    async keys(pattern: string): Promise<string[]> {
        return redis.keys(pattern);
    }

    /* ----------------------------------------------------
     * FLUSH (dev / testing only)
     * -------------------------------------------------- */
    async flush(): Promise<void> {
        await redis.flushall();
    }
}

/**
 * Singleton export
 */
export const redisService = new RedisService();
