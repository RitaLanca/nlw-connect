import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/drizzle/schema/*', // path to drizzle schemas
  out: './src/drizzle/migrations', // path to drizzle migrations
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
})

// other way
// export default({
//   schema: './drizzle/schema/*', // path to drizzle schemas
//   out: './src/drizzle/migrations', // path to drizzle migrations
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: process.env.POSTGRES_URL as string,
//   },
// }) satisfies import('drizzle-kit').Config
