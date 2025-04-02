import { Router } from 'express'
import { Assembly, Material, Project } from '../models/index.js'
import { projectFindOptions } from '../services/project.service.js'
import { materialFindOptions } from './material.controller.js'
import { sequelize } from '../util/db.js'
import { assembliesService } from '../services/assembliesService.js'

const assembliesRouter = Router()

const transformAssembly = (assembly) => {
  return {
    id: assembly.id,
    code: assembly.code,
    project: assembly.project,
    prefabricated: assembly.prefabricated,
    billOfMaterials: assembly.materials.map((material) => ({
      id: material.id,
      material: {
        id: material.id,
        name: material.name,
        unit: material.unit,
        manufacturer: material.manufacturer,
      },
      quantity: material.assemblyMaterial.quantity,
    })),
  }
}

export const assemblyFindOptions = {
  attributes: {
    exclude: ['projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: Material,
      as: 'materials',
      through: { attributes: ['quantity'] },
      ...materialFindOptions,
    },
  ],
}

const assemblyFinder = async (request, _response, next) => {
  const { id } = request.params
  const assembly = await Assembly.findByPk(id, assemblyFindOptions)

  if (!assembly) {
    throw new NotFoundError('Assembly', id)
  }

  const transformedAssembly = transformAssembly(assembly)

  request.assembly = transformedAssembly
  next()
}

assembliesRouter.get('/', async (_request, response) => {
  const assemblies = await Assembly.findAll(assemblyFindOptions)

  const transformedAssemblies = assemblies.map((assembly) => {
    return transformAssembly(assembly)
  })

  response.status(200).send(transformedAssemblies)
})

assembliesRouter.get('/:id', assemblyFinder, async (request, response) => {
  response.status(200).send(request.assembly)
})

assembliesRouter.post('/', async (request, response, next) => {
  const { code, type, projectId, prefabricated } = request.body

  const projectInDb = await Project.findByPk(projectId)

  if (!projectInDb) {
    throw new NotFoundError('Project', projectId)
  }

  const assembly = await Assembly.create({
    code,
    type,
    projectId,
    prefabricated,
  })

  // Send the assembly data back as response
  response.status(201).send(assembly)
})

assembliesRouter.post('/deep/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const assemblies = await assembliesService.deepCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(assemblies)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

assembliesRouter.put('/:id/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const updatedAssembly = await assembliesService.update(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(updatedAssembly)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

assembliesRouter.delete('/:id', assemblyFinder, async (request, response) => {
  await request.assembly.destroy()
  response.status(204).json({ message: 'Assembly entry deleted successfully' })
})

assembliesRouter.delete('/', async (request, response) => {
  await Assembly.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All assemblies deleted successfully' })
})

export default assembliesRouter
