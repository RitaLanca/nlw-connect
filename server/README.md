# Project Name

A brief description of the project.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **Fastify** - High-performance web framework
- **Zod** - Schema validation
- **REST Client** - VS Code extension for API testing
- **Swagger** - API documentation
- **Biome** - Linter and formatter
- **ioRedis** - Redis client for Node.js
- **PostgreSQL** - SQL database
- **Drizzle** - TypeScript ORM
- **Tsup** - TypeScript to JavaScript bundler

## 🗄️ Database

This project uses **PostgreSQL** and **Redis**.

## 🚀 Getting Started

### **Prerequisites**

- Docker Desktop must be running

### **Run the server**

1. Start containers:
   ```sh
   docker compose up
   ```
2. Start the server:
   ```sh
   npm run dev
   ```

## 🔧 Drizzle Kit

- Generate SQL migration:
  ```sh
  npx drizzle-kit generate
  ```
- Apply migrations:
  ```sh
  npx drizzle-kit migrate
  ```
- Run both commands in one step:
  ```sh
  npx drizzle-kit push
  ```

## 🔨 Build and Test

- Build the project:
  ```sh
  npm run build
  ```
- Run the built project:
  ```sh
  node --env-file .env dist/server.mjs
  ```

## 🚀 Deployment

- **PostgreSQL on Neon** – Cloud-based PostgreSQL hosting (**TODO**)
- **Redis on Upstash** – Serverless Redis hosting (**TODO**)
- **Node.js on Render** – Simple cloud deployment for Node.js apps (**TODO**)

# NOTES

## ⚡ Redis - Common Data Structures

- **Key/Value Pairs**
- **Lists (`[]`)** – Methods start with `l` (e.g., `lindex`)
- **Hashes (`{}`)** – Methods start with `h` (e.g., `hgetAll`)
- **Sorted Sets (`[]` sorted by a field)** – Methods start with `z` (e.g., `zadd`)

## Fastify

- When deploying to a Docker (or another type of) container using 0.0.0.0 or :: would be the easiest method for exposing the application.

```js
app.listen({ port: 3000, host: "0.0.0.0" });
```
