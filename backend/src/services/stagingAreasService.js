import { AssemblyCrate, StagingArea } from '../models/index.js'
import { info } from '../util/logger.js'
import { projectsService } from './project.service.js'
import { assemblyCrateFindOptions } from '../controllers/assemblyCrates.js'
import { stagingAreaFindOptions } from '../controllers/stagingAreas.js'

const update = async (stagingArea, transaction) => {
  info('ENTERING STAGING AREA UPDATE')

  if (stagingArea) {
    // Fetch projectId for the staging area if it has associated assembly crates
    const assemblyCrate = await AssemblyCrate.findOne({
      ...assemblyCrateFindOptions,
      where: { stagingAreaId: stagingArea.id },
      transaction,
    })

    const projectId = assemblyCrate ? assemblyCrate.crate.project.id : null

    // Update and return the modified staging area
    await StagingArea.update(
      { projectId },
      { where: { id: stagingArea.id }, transaction },
    )
    return stagingArea
  }

  // Fetch all assembly crates and staging areas in one go
  const [assemblyCrates, stagingAreas] = await Promise.all([
    AssemblyCrate.findAll({ ...assemblyCrateFindOptions, transaction }),
    StagingArea.findAll({ ...stagingAreaFindOptions, transaction }),
  ])

  // Create a mapping of stagingAreaId -> projectId
  const stagingAreaMap = new Map()
  assemblyCrates.forEach(({ stagingAreaId, crate }) => {
    if (stagingAreaId && crate.project.id) {
      stagingAreaMap.set(stagingAreaId, crate.project.id)
    }
  })

  // Batch update each staging area in parallel
  await Promise.all(
    stagingAreas.map((stagingArea) =>
      StagingArea.update(
        { projectId: stagingAreaMap.get(stagingArea.id) || null },
        { where: { id: stagingArea.id }, transaction },
      ),
    ),
  )

  return stagingAreas.map((stagingArea) => ({
    id: stagingArea.id,
    projectId: stagingAreaMap.get(stagingArea.id) || null,
  }))
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
