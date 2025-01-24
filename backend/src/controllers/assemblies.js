import { Router } from 'express'
import { Assembly, Material, Project } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { projectFindOptions } from './projects.js'
import { materialFindOptions } from './materials.js'
const assembliesRouter = Router()

const transformAssembly = (assembly) => {
  return {
    id: assembly.id,
    code: assembly.code,
    project: assembly.project,
    billOfMaterials: assembly.materials.map(
      ({
        id,
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
        vendor,
        assemblyMaterial,
      }) => ({
        id,
        material: {
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
          vendor,
        },
        quantity: assemblyMaterial.quantity,
      }),
    ),
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
    throw new CustomError(
      'NotFoundError',
      `Assembly with id ${id} not found`,
      404,
    )
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
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
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

/*
assembliesRouter.post('/batch/', async (request, response, next) => {
  const assemblies = request.body

  const projectInDb = await Project.findOne({
    where: { number: assemblies[0].project.number },
  })

  if (!projectInDb) {
    throw new CustomError(
      'NotFoundError',
      `Project with number ${assemblies[0].project.number} not found`,
      404,
    )
  }

  const transaction = await sequelize.transaction()

  try {
    for (const assembly of assemblies) {
      let assemblyInDb = await Assembly.findOne({
        where: { identifier: assembly.identifier, projectId: projectInDb.id },
        transaction,
      })

      if (assemblyInDb) {
        throw new CustomError(
          'ValidationError',
          `Assembly with identifier ${assembly.identifier} already exists for project ${projectInDb.number} ${projectInDb.name}.`,
          400,
        )
      }

      assemblyInDb = await Assembly.create(
        {
          code: assembly.code,
          projectId: projectInDb.id,
        },
        { transaction },
      )

      // Create assemblyMaterial entries
      for (const assemblyMaterial of assembly.billOfMaterials) {
        let materialInDb = await Material.findOne({
          where: { partNumber: assemblyMaterial.material.partNumber },
          transaction,
        })

        if (!materialInDb) {
          throw new CustomError(
            'NotFoundError',
            `Material with partNumber ${assemblyMaterial.material.partNumber} not found`,
            404,
          )
        }

        await AssemblyMaterial.create(
          {
            assemblyId: assemblyInDb.id,
            materialId: materialInDb.id,
            quantity: assemblyMaterial.quantity,
          },
          { transaction },
        )
      }
    }

    await transaction.commit()

    // Send the assembly data back as response
    response.status(201).send(assemblies)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})
*/

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
