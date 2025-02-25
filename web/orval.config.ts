import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:3333/docs/json',
    output: {
      target: './src/http/api.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true, // clean up the output directory before generation
      baseUrl: 'http://localhost:3333', // base api url
      override: {
        fetch: {
          includeHttpResponseReturnType: false, // don't include the response status code
        },
      },
    },
  },
})
