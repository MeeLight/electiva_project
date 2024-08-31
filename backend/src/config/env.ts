import type { EnvVariables } from '@interfaces/env.interfaces'

const envConfig: EnvVariables = {
  server: {
    port: +process.env.PORT! || 8080
  },
  api: {
    baseUri: <string>process.env.API_BASE_URI,
    version: <string>process.env.API_VERSION
  },
  database: {
    uri: <string>process.env.DATABASE_URL
  }
}

// Database
if (!envConfig.database.uri) {
  throw new Error('Config [database] `uri` does not exist.')
}

// Api
if (!envConfig.api.baseUri) {
  throw new Error('Config [api] `baseUri` does not exist.')
}
if (!envConfig.api.version) {
  throw new Error('Config [api] `version` does not exist.')
}

export { envConfig }
