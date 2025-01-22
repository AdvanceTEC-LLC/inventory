import { Router } from 'express'
import { Material, Manufacturer } from '../models/index.js'
import { manufacturerFindOptions } from './manufacturers.js'
import { CustomError } from '../util/errors/CustomError.js'
const materialsRouter = Router()

export const materialFindOptions = {
  attributes: { exclude: ['manufacturerId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerFindOptions,
    },
  ],
}

const materialFinder = async (request, _response, next) => {
  const { id } = request.params
  const material = await Material.findByPk(id, materialFindOptions)

  if (!material) {
    throw new CustomError(
      'NotFoundError',
      `Material with id ${id} not found`,
      404,
    )
  }
  request.material = material
  next()
}

materialsRouter.get('/', async (_request, response) => {
  const material = await Material.findAll(materialFindOptions)

  response.status(200).send(material)
})

materialsRouter.get('/:id', materialFinder, async (request, response) => {
  response.status(200).send(request.material)
})

materialsRouter.post('/', async (request, response) => {
  const { manufacturerId } = request.body

  /*if (thickness < 0 || width < 0 || length < 0) {
    throw new CustomError(
      'BadRequest',
      'Material cannot have negative dimensions.',
      400,
    )
  }*/

  const manufacturerExists = await Manufacturer.findByPk(manufacturerId)

  if (!manufacturerExists) {
    throw new CustomError(
      'NotFoundError',
      `Manufacturer with id ${manufacturerId} not found`,
      404,
    )
  }

  const material = await Material.create({
    partNumber,
    description,
    thickness,
    width,
    length,
    topFinish,
    bottomFinish,
    xDimension,
    cutout,
    tag,
    vendorId,
  })

  response.status(201).send(material)
})

materialsRouter.delete('/:id', materialFinder, async (request, response) => {
  await request.material.destroy()
  response.status(204).json({ message: 'material entry deleted successfully' })
})

materialsRouter.delete('/', async (request, response) => {
  await Material.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All materials deleted successfully' })
})

export default materialsRouter
