import { getRedisClient } from "./client";

export async function getCachedData<T>(key: string): Promise<T | null> {
  const redis = getRedisClient();
  const data = await redis.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
}

export async function setCachedData(key: string, data: unknown, ttlSeconds = 3600) {
  const redis = getRedisClient();
  await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
}

export async function wrapWithCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  const cached = await getCachedData<T>(key);
  if (cached) return cached;

  const fresh = await fn();
  await setCachedData(key, fresh, ttlSeconds);
  return fresh;
}
