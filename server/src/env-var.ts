import { z } from 'zod'

const envSchema = z.object({
  // NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  // JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), // try to convert to a number, if fails, default to 3333
  WEB_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
