import { Crate, CrateLocation } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { projectsService } from './projectsService.js'
import { shelfLocationsService } from './shelfLocationsService.js'
import { stockService } from './stockService.js'
import { crateLocationsService } from './crateLocationsService.js'
import { materialCratesService } from './materialCratesService.js'
import { info } from '../util/logger.js'

const validateCrateNumber = async (number, transaction) => {
  info('ENTERING VALIDATE CRATE NUMBER')

  const crateInDb = await Crate.findOne({
    where: { number },
    transaction,
  })

  if (crateInDb) {
    throw new CustomError(
      'ValidationError',
      `Crate with number ${number} already exists.`,
      400,
    )
  }
}

const find = async (crateId, transaction) => {
  info('ENTERING CRATE FIND')

  const crateInDb = await Crate.findByPk(crateId, {
    transaction,
  })

  if (!crateInDb) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found.`,
      404,
    )
  }

  return crateInDb
}

const create = async (crate, transaction) => {
  info('ENTERING CRATE CREATE')

  await validateCrateNumber(crate.number)

  const crateInDb = await Crate.create(crate, { transaction })

  return crateInDb
}

const update = async (crate, transaction) => {
  info('ENTERING CRATE UPDATE')

  let crateLocationId = null
  if (crate.crateLocation) crateLocationId = crate.crateLocation.id

  let shelfLocationId = null
  if (crate.shelfLocation) shelfLocationId = crate.shelfLocation.id

  let projectId = null
  if (crate.project) projectId = crate.project.id

  const updatedCrate = {
    id: crate.id,
    number: crate.number,
    crateLocationId,
    shelfLocationId,
    projectId,
  }

  const updatedCrateInDb = await Crate.update(updatedCrate, {
    where: { id: updatedCrate.id },
    transaction,
  })

  return updatedCrateInDb
}

const deepCreate = async (crate, transaction) => {
  let crateLocationInDb
  if (crate.crateLocation) {
    crateLocationInDb = await crateLocationsService.findOrCreate(
      crate.crateLocation,
      transaction,
    )
  }

  const defaultCrateLocation = await crateLocationsService.findOrCreate(
    { name: 'Shipping Bay', isMaterialCrateDefault: true },
    transaction,
  )

  const crateLocationId = crateLocationInDb
    ? crateLocationInDb.id
    : defaultCrateLocation.id

  let shelfLocationInDb
  if (crate.shelfLocation) {
    shelfLocationInDb = await shelfLocationsService.findOrCreate(
      crate.shelfLocation,
      transaction,
    )
  }
  const shelfLocationId = shelfLocationInDb ? shelfLocationInDb.id : null

  const projectInDb = await projectsService.findOrCreate(
    crate.project,
    transaction,
  )

  const crateInDb = await create(
    {
      ...crate,
      crateLocationId,
      shelfLocationId,
      stagingAreaId,
      projectId: projectInDb.id,
    },
    transaction,
  )

  if (Array.isArray(crate.stock)) {
    await materialCratesService.deepCreate(crate)
  }

  return crateInDb
}

const bulkUpdate = async (crates, transaction) => {
  info('ENTERING CRATES BULK UPDATE')

  const updatedCrates = await Promise.all(
    crates.map(async (crate) => {
      await update(crate, transaction)
    }),
  )
  return updatedCrates
}

export const cratesService = {
  find,
  create,
  update,
  deepCreate,
  bulkUpdate,
}
