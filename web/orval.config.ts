import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: process.env.NODE_ENV === 'production'? `${process.env.API_URL}/docs/json`  : 'http://localhost:3333/docs/json',
    output: {
      target: './src/http/api.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true, // clean up the output directory before generation
      baseUrl: process.env.NODE_ENV === 'production'? process.env.API_URL : 'http://localhost:3333', // base api url
      override: {
        fetch: {
          includeHttpResponseReturnType: false, // don't include the response status code
        },
      },
    },
  },
})
