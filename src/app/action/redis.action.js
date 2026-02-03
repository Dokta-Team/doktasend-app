"use server";

import { redisService } from "@/lib/redis.service";


const SEVEN_DAYS = 60 * 60 * 24 * 7;

export async function createCache(key, value) {
    if (!key || key.trim() === '') {
        throw new Error("Cache key is missing! Please add it");
    }

    if (typeof key !== 'string' || key.trim().length === 0) {
        throw new Error("Cache key is required");
    }
    await redisService.set(key, value, SEVEN_DAYS);
}

export async function getCache(key) {
    return redisService.get(`${key}`);
}


export async function updateCache(key, value) {
    console.log("updateCache called with key:", key);

    if (!key || key.trim() === '') {
        throw new Error("Cache key is required");
    }

    // Update the cache (set will overwrite existing key)
    await redisService.set(key, value, SEVEN_DAYS);
}



export async function deleteCache(key) {
    await redisService.delete(`${key}`);
}