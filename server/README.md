### technologies

- node js
- fastity
- zod for validation
- REST Client extension to test requests
- swagger to api documentation
- Biome - to lint and formatter
- ioRedis - a redis client for node
- postgres - a postgres client for node
- drizzle - ORM to
- tsup - to build and convert ts into js

### Database

- postgres and Redis

### Run server

- required: Docker desktop is running
- run containers with: `docker compose up`
- start server with: `npm run dev`

## Drizzke kit

`npx drizzle-kit generate` to generate the sql file
`npx drizzle-kit migrate` to apply the sql file and create tables on the DB

or just use `npx drizzle-kit push` that do both commands at once

### Redis - concepts

Common data structures

- key/value pair
- lists - [] - (=> all methods starts with "l" ex: lindex)
- hashes - {} - (=> all methods starts with "h" ex: hgetAll)
- sorted sors - [] sorted by a column - (=> all methods starts with "z" ex: zadd)

# Build e testar o build

- Run `npm run build`
- Run with node directly: `node --env-file .env dist/server.mjs`

# Deploy

- Deploy postgres on neon (TODO)
- Deploy redis on upstash (TODO)
- Deploy node on with render (TODO)
