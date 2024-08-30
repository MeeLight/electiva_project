import type { Router } from 'express'

export interface IRouterModule {
  router: Router
}

export interface IRouters {
  uri: string
  router: Router
}
