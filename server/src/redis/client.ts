import { Redis } from 'ioredis'
import { env } from '../env-var'

export const redis = new Redis(env.REDIS_URL)
