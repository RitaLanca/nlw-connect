import { defineConfig } from 'drizzle-kit'
import { env } from './src/env-var'

export default defineConfig({
  schema: './src/drizzle/schema/*', // path to drizzle schemas
  out: './src/drizzle/migrations', // path to drizzle migrations
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
})

// other way
// export default({
//   schema: './drizzle/schema/*', // path to drizzle schemas
//   out: './src/drizzle/migrations', // path to drizzle migrations
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: env.POSTGRES_URL,
//   },
// }) satisfies import('drizzle-kit').Config
