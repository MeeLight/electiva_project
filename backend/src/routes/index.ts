import { Router } from 'express'
import { readdirSync } from 'fs'

// Utilities
import { getFilenameWithoutExtension } from '@helpers/directories/index'

// Interfaces
import type { IRouterModule } from '@interfaces/router.interfaces'

const ROUTER_PATH = __dirname
const router = Router()

// Dynamic loading of all routes
readdirSync(ROUTER_PATH).filter((filename: string): void => {
  const cleanedFilename = getFilenameWithoutExtension(filename)
  const routeFolderName = `${ROUTER_PATH}/${cleanedFilename}`

  if (cleanedFilename !== 'index' && cleanedFilename !== '404') {
    readdirSync(routeFolderName).filter((tmpFilename: string): void => {
      const newCleanedFilename = getFilenameWithoutExtension(tmpFilename)

      import(`${routeFolderName}/${newCleanedFilename}`).then(
        (routerModule: IRouterModule): void => {
          router.use(`/${newCleanedFilename}`, routerModule.router)
        }
      )
    })
  }
})

export default router
