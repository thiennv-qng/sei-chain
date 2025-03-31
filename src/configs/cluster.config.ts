import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  http: string
  ws: string
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    http: 'https://cluster.desig.dev',
    ws: '',
  },

  /**
   * Staging configurations
   */
  test: {
    http: 'https://cluster.desig.dev',
    ws: '',
  },

  /**
   * Production configurations
   */
  production: {
    http: 'https://cluster.desig.dev',
    ws: '',
  },
}

/**
 * Module exports
 */
export default conf
