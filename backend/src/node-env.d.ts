declare module 'process' {
  global {
    var process: NodeJS.Process

    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        // Default
        readonly TZ?: string

        // Server
        readonly PORT?: string | number

        // Api
        readonly API_BASE_URI?: string
        readonly API_VERSION?: string | number

        // Database
        readonly DATABASE_URL?: string
      }
    }
  }

  export = process
}
