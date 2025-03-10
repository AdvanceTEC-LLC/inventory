import { AssemblyCrate, StagingArea } from '../models/index.js'
import { info } from '../util/logger.js'
import { projectsService } from './projectsService.js'
import { assemblyCrateFindOptions } from '../controllers/assemblyCrates.js'

const update = async (stagingArea, transaction) => {
  info('ENTERING STAGING AREA UPDATE')

  const assemblyCratesInStagingArea = await AssemblyCrate.findAll({
    ...assemblyCrateFindOptions,
    where: {
      stagingAreaId: stagingArea.id,
    },
    transaction,
  })

  let projectId = null
  if (assemblyCratesInStagingArea.length > 0) {
    projectId = assemblyCratesInStagingArea[0].crate.project.id
  }

  const updatedStagingArea = {
    ...stagingArea,
    projectId,
  }

  const updatedStagingAreaInDb = await StagingArea.update(updatedStagingArea, {
    where: { id: stagingArea.id },
    transaction,
  })

  return updatedStagingAreaInDb
}

const findOrCreate = async (stagingArea, transaction) => {
  let stagingAreaInDb = await StagingArea.findOne({
    where: { name: stagingArea.name },
    transaction,
  })

  if (!stagingAreaInDb) {
    stagingAreaInDb = await StagingArea.create(stagingArea, {
      transaction,
    })
  }

  return stagingAreaInDb
}

const bulkCreate = async (stagingAreas, transaction) => {
  const stagingAreasInDb = await StagingArea.bulkCreate(stagingAreas, {
    transaction,
  })

  return stagingAreasInDb
}

const deepCreate = async (stagingArea, transaction) => {
  const { name, project } = stagingArea

  const projectInDb = await projectsService.findOrCreate(project, transaction)

  const stagingAreaInDb = await findOrCreate(
    {
      ...stagingArea,
      projectId: projectInDb.id,
    },
    transaction,
  )
  return stagingAreaInDb
}

export const stagingAreasService = {
  update,
  findOrCreate,
  bulkCreate,
  deepCreate,
}
