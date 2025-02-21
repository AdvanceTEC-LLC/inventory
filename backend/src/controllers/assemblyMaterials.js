import { Router } from 'express'
import { Assembly, AssemblyMaterial, Material } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { materialFindOptions } from './materials.js'
import { assemblyFindOptions } from './assemblies.js'
const assemblyMaterialsRouter = Router()

export const assemblyMaterialFindOptions = {
  attributes: {
    exclude: ['assemblyId', 'projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Assembly,
      as: 'assembly',
      //...assemblyFindOptions,
    },
    {
      model: Material,
      as: 'material',
      ...materialFindOptions,
    },
  ],
}

const assemblyMaterialFinder = async (request, _response, next) => {
  const { id } = request.params
  const assemblyMaterial = await AssemblyMaterial.findByPk(
    id,
    assemblyMaterialFindOptions,
  )

  if (!assemblyMaterial) {
    throw new CustomError(
      'NotFoundError',
      `AssemblyMaterial with id ${id} not found`,
      404,
    )
  }
  request.assemblyMaterial = assemblyMaterial
  next()
}

assemblyMaterialsRouter.get('/', async (_request, response) => {
  const assemblyMaterial = await AssemblyMaterial.findAll(
    assemblyMaterialFindOptions,
  )

  response.status(200).send(assemblyMaterial)
})

assemblyMaterialsRouter.get(
  '/:id',
  assemblyMaterialFinder,
  async (request, response) => {
    response.status(200).send(request.assemblyMaterial)
  },
)

assemblyMaterialsRouter.post('/', async (request, response) => {
  const { assemblyId, materialId, quantity } = request.body

  const assemblyExists = await Assembly.findByPk(assemblyId)

  if (!assemblyExists) {
    throw new CustomError(
      'NotFoundError',
      `Assembly with id ${assemblyId} not found`,
      404,
    )
  }

  const materialExists = await Material.findByPk(materialId)

  if (!materialExists) {
    throw new CustomError(
      'NotFoundError',
      `Material with id ${materialId} not found`,
      404,
    )
  }

  if (quantity < 0) {
    throw new CustomError(
      'ValidationError',
      `Quantity ${quantity} cannot be less than 0.`,
      404,
    )
  }

  const assemblyMaterial = await AssemblyMaterial.create({
    assemblyId,
    materialId,
    quantity,
  })

  response.status(201).send(assemblyMaterial)
})

assemblyMaterialsRouter.delete(
  '/:id',
  assemblyMaterialFinder,
  async (request, response) => {
    await request.assemblyMaterial.destroy()
    response
      .status(204)
      .json({ message: 'AssemblyMaterial entry deleted successfully' })
  },
)

assemblyMaterialsRouter.delete('/', async (request, response) => {
  await AssemblyMaterial.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All assemblyMaterials deleted successfully' })
})

export default assemblyMaterialsRouter
