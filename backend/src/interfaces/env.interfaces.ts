export interface EnvVariables {
  server: {
    port: number
  }
  api: {
    baseUri: string
    version: string | number
  }
  database: {
    uri: string
  }
}
