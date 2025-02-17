import { StagingArea } from '../models/index.js'
import { info } from '../util/logger.js'
import { projectsService } from './projectsService.js'

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
  findOrCreate,
  deepCreate,
}
