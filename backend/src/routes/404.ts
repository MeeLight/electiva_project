import { Router, Request, Response } from 'express'

const router = Router().use('*', (_req: Request, res: Response) => {
  res.status(404).json({ msg: 'Oops! 404 route not found' })
})

export default router
