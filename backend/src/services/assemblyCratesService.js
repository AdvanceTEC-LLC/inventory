import { AssemblyCrate } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { assembliesService } from './assembliesService.js'
import { assemblyCrateAssembliesService } from './assemblyCratesAssembliesService.js'
import { crateLocationsService } from './crateLocationsService.js'
import { cratesService } from './cratesService.js'
import { stagingAreasService } from './stagingAreasService.js'

const find = async (assemblyCrateId, transaction) => {
  info('ENTERING ASSEMBLY CRATE FIND')

  const assemblyCrateInDb = await AssemblyCrate.findByPk(assemblyCrateId, {
    transaction,
  })

  if (!assemblyCrateInDb) {
    throw new CustomError(
      'NotFoundError',
      `AssemblyCrate with id ${assemblyCrateId} not found.`,
      404,
    )
  }

  return assemblyCrateInDb
}

const create = async (assemblyCrate, transaction) => {
  info('ENTERING ASSEMBLY CRATE CREATE')

  const assemblyCrateInDb = await AssemblyCrate.create(assemblyCrate, {
    transaction,
  })

  return assemblyCrateInDb
}

const update = async (assemblyCrate, transaction) => {
  info('ENTERING ASSEMBLY CRATE UPDATE')

  const { stagingArea, crate } = assemblyCrate

  let stagingAreaId = null
  if (stagingArea) {
    stagingAreaId = stagingArea.id

    if (stagingArea.project && crate.project.id !== stagingArea.project.id) {
      throw new CustomError(
        'ValidationError',
        'Cannot move crates from different projects into the same staging area',
        400,
      )
    }
  }

  const updatedAssemblyCrate = {
    id: assemblyCrate.id,
    crate: assemblyCrate.crate,
    stagingAreaId,
  }

  const updatedAssemblyCrateInDb = await AssemblyCrate.update(
    updatedAssemblyCrate,
    {
      where: { id: assemblyCrate.id },
      transaction,
    },
  )

  await cratesService.update(assemblyCrate.crate, transaction)

  if (stagingArea) await stagingAreasService.update(stagingArea, transaction)

  return updatedAssemblyCrateInDb
}

const deepCreate = async (assemblyCrate, transaction) => {
  info('ENTERING ASSEMBLY CRATE DEEP CREATE')

  const { crate, assemblies } = assemblyCrate

  const crateInDb = await cratesService.create(crate, transaction)

  const assemblyCrateInDb = await create({ crateId: crateInDb.id }, transaction)

  await Promise.all(
    assemblies.map(async (assembly) => {
      const assemblyInDb = await assembliesService.create(assembly, transaction)

      await assemblyCrateAssembliesService.create(
        {
          assemblyCrateId: assemblyCrateInDb.id,
          assemblyId: assemblyInDb.id,
        },
        transaction,
      )
    }),
  )

  return assemblyCrateInDb
}

const bulkUpdate = async (assemblyCrates, transaction) => {
  info('ENTERING ASSEMBLY CRATE BULK UPDATE')

  const updatedCrates = await Promise.all(
    assemblyCrates.map(async (assemblyCrate) => {
      await update(assemblyCrate, transaction)
    }),
  )
  return updatedCrates
}

export const assemblyCratesService = {
  find,
  create,
  deepCreate,
  bulkUpdate,
}
