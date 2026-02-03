import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

let redis: Redis | null = null;

export function getRedisClient() {
  if (!redis) {
    redis = new Redis(redisUrl);
  }
  return redis;
}
