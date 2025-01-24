import { Router } from 'express'
import { Material, Project, Stock } from '../models/index.js'
import { materialFindOptions } from './materials.js'
import { projectFindOptions } from './projects.js'
import { CustomError } from '../util/errors/CustomError.js'
const stockRouter = Router()

export const stockFindOptions = {
  attributes: {
    exclude: ['materialId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Material,
      as: 'material',
      ...materialFindOptions,
    },
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const stockFinder = async (request, response, next) => {
  const { id } = request.params
  const stock = await Stock.findByPk(id, stockFindOptions)

  if (!stock) {
    throw new CustomError('NotFoundError', `Stock with id ${id} not found`, 404)
  }

  request.stock = stock
  next()
}

stockRouter.get('/', async (_request, response) => {
  const stock = await Stock.findAll(stockFindOptions)

  response.status(200).send(stock)
})

stockRouter.get('/material/:partNumber', async (request, response) => {
  const stock = await Stock.findOne({
    attributes: {
      exclude: ['materialId', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Material,
        as: 'material',
        where: { partNumber },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })

  if (!stock) {
    return response.status(404).send({
      message: 'No stock found for the given material',
    })
  }

  response.status(200).send(stock)
})

stockRouter.post('/', async (request, response) => {
  const { materialId, projectId, quantity } = request.body

  const materialExists = await Material.findByPk(materialId)

  if (!materialExists) {
    throw new CustomError(
      'NotFoundError',
      `Material with id ${materialId} not found.`,
      404,
    )
  }

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found.`,
      404,
    )
  }

  const stock = await Stock.create({
    materialId,
    quantity,
    projectId,
  })

  response.status(201).send(stock)
})

stockRouter.put('/:id', stockFinder, async (request, response) => {
  const { quantity, material, project } = request.body

  if (!material || !material.id) {
    return response.status(400).json({
      error: 'Material objects with valid IDs are required.',
    })
  }

  request.stock.quantity = quantity
  request.stock.materialId = material.id
  request.stock.projectId = project.id ? project.id : null

  await request.stock.save()
  response.status(201).send(request.stock)
})

stockRouter.delete('/', async (request, response) => {
  await Stock.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All stock deleted successfully' })
})

export default stockRouter
