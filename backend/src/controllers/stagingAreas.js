import { Router } from 'express'
import { StagingArea, Project } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { projectFindOptions } from './projects.js'
import { stagingAreasService } from '../services/stagingAreasService.js'
import { sequelize } from '../util/db.js'
import { info } from '../util/logger.js'
const stagingAreasRouter = Router()

export const stagingAreaFindOptions = {
  attributes: {
    exclude: ['projectId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
  ],
}

const stagingAreaFinder = async (request, _response, next) => {
  const { id } = request.params
  const stagingArea = await StagingArea.findByPk(id, stagingAreaFindOptions)

  if (!stagingArea) {
    throw new CustomError(
      'NotFoundError',
      `Staging area with id ${id} not found`,
      404,
    )
  }
  request.stagingArea = stagingArea
  next()
}

stagingAreasRouter.get('/', async (_request, response) => {
  const stagingArea = await StagingArea.findAll(stagingAreaFindOptions)

  response.status(200).send(stagingArea)
})

stagingAreasRouter.get('/:id', stagingAreaFinder, async (request, response) => {
  response.status(200).send(request.stagingArea)
})

stagingAreasRouter.post('/', async (request, response) => {
  const { name, projectId } = request.body

  const projectInDb = await Project.findByPk(projectId)

  if (!projectInDb) {
    throw new CustomError(
      'NotFoundError',
      `Project with id ${projectId} not found`,
      404,
    )
  }

  const stagingArea = await StagingArea.create({
    name,
    projectId,
  })

  response.status(201).send(stagingArea)
})

stagingAreasRouter.post('/deep/', async (request, response, next) => {
  const transaction = await sequelize.transaction()

  try {
    const stagingArea = await stagingAreasService.deepCreate(
      request.body,
      transaction,
    )

    await transaction.commit()

    response.status(201).send(stagingArea)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

stagingAreasRouter.delete(
  '/:id',
  stagingAreaFinder,
  async (request, response) => {
    await request.stagingArea.destroy()
    response
      .status(204)
      .json({ message: 'Staging area entry deleted successfully' })
  },
)

stagingAreasRouter.delete('/', async (request, response) => {
  await StagingArea.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All staging areas deleted successfully' })
})

export default stagingAreasRouter
