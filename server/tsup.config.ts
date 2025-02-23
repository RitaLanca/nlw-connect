import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'], // where are the files i want to compile
  format: 'esm',
  outDir: 'dist',
  clean: true, // to delete the dist folder before compiling
})
