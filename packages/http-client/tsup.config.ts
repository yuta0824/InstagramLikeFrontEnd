import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  tsconfig: 'tsconfig.json',
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2020'
})
