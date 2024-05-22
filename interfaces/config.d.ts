import type { Endpoint } from './endpoint'

export interface Config {
  env: string
  server: {
    host: string
    port: number
  }
  log: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    level: 'error' | 'warn' | 'info' | 'http' | 'debug'
  }
  enableRateLimit: boolean
  baseURL: string
  endpoint: Endpoint
}
