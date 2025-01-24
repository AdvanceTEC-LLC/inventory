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
  const { manufacturerId, name, divisionId } = request.body

  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId)

  if (!manufacturerInDb) {
    throw new CustomError(
      'NotFoundError',
      `Manufacturer with id ${manufacturerId} not found`,
      404,
    )
  }

  const divisionInDb = await Division.findByPk(divisionId)

  if (!divisionInDb) {
    throw new CustomError(
      'NotFoundError',
      `Division with id ${divisionId} not found`,
      404,
    )
  }

  const material = await Material.create({
    manufacturerId,
    name,
    divisionId,
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
