import { Router } from 'express'
import { Vendor } from '../models/index.js'
import { info } from '../util/logger.js'
import { CustomError } from '../util/errors/CustomError.js'
const vendorsRouter = Router()

export const vendorFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
}

const vendorFinder = async (request, _response, next) => {
  const { id } = request.params
  const vendor = await Vendor.findByPk(id, vendorFindOptions)

  if (!vendor) {
    throw new CustomError(
      'NotFoundError',
      `Vendor with id ${id} not found`,
      404,
    )
  }

  request.vendor = vendor
  next()
}

vendorsRouter.get('/', async (_request, response) => {
  const vendor = await Vendor.findAll(vendorFindOptions)

  response.status(200).send(vendor)
})

vendorsRouter.get('/:id', vendorFinder, async (request, response) => {
  response.status(200).send(request.vendor)
})

vendorsRouter.post('/', async (request, response, next) => {
  const { name } = request.body

  try {
    const vendor = await Vendor.create({
      name,
    })

    response.status(201).send(vendor)
  } catch (error) {
    next(error)
  }
})

vendorsRouter.delete('/:id', vendorFinder, async (request, response) => {
  await request.vendor.destroy()
  response.status(204).json({ message: 'Vendor entry deleted successfully' })
})

vendorsRouter.delete('/', async (request, response) => {
  await Vendor.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All vendors deleted successfully' })
})

export default vendorsRouter
