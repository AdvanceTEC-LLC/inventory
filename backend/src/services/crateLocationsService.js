import { CrateLocation } from '../models/index.js'
import { info } from '../util/logger.js'

const findMaterialCrateDefault = async (transaction) => {
  info('ENTERING CRATE LOCATION FIND MATERIAL CRATE DEFAULT')

  const defaultLocation = await CrateLocation.findOne({
    where: { materialCrateDefault: true },
    transaction,
  })

  if (!defaultLocation) {
    throw new NotFoundError(
      'Default crate location for material crates not found.',
    )
  }

  return defaultLocation
}

const findAssemblyCrateDefault = async (transaction) => {
  info('ENTERING CRATE LOCATION FIND ASSEMBLY CRATE DEFAULT')

  const defaultLocation = await CrateLocation.findOne({
    where: { assemblyCrateDefault: true },
    transaction,
  })

  if (!defaultLocation) {
    throw new NotFoundError(
      'Default crate location for assembly crates not found.',
    )
  }

  return defaultLocation
}

const findOrCreate = async (crateLocation, transaction) => {
  let crateLocationInDb = await CrateLocation.findOne({
    where: { name: crateLocation.name },
    transaction,
  })

  if (!crateLocationInDb) {
    crateLocationInDb = await CrateLocation.create(crateLocation, {
      transaction,
    })
  }

  return crateLocationInDb
}

const bulkCreate = async (crateLocations, transaction) => {
  const crateLocationsInDb = await CrateLocation.bulkCreate(crateLocations, {
    transaction,
  })

  return crateLocationsInDb
}

export const crateLocationsService = {
  findMaterialCrateDefault,
  findAssemblyCrateDefault,
  findOrCreate,
  bulkCreate,
}
