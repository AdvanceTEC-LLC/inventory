import { Manufacturer, Material } from '../models/index.js'
import MissingRequiredError from '../util/errors/MissingRequiredError.js'
import ValidationError from '../util/errors/ValidationError.js'
import { info } from '../util/logger.js'
import { manufacturersService } from './manufacturer.service.js'
import NotFoundError from '../util/errors/NotFoundError.js'
import UniqueConstraintError from '../util/errors/UniqueConstraintError.js'

const validateName = async (name) => {
  info('ENTERING MATERIAL VALIDATE NAME')
  if (name === undefined || name === null) {
    throw new MissingRequiredError('Material', 'name', 'is required')
  } else if (typeof name !== 'string')
    throw new MissingRequiredError('Material', 'name', 'must be a string')
  else if (name.trim().length === 0) {
    throw new MissingRequiredError('Material', 'name', 'must not be empty')
  } else if (await Material.findOne({ where: { name: name } })) {
    throw new UniqueConstraintError('Material', 'name')
  }
}

const validateManufacturer = async (manufacturerId) => {
  info('ENTERING MATERIAL VALIDATE MANUFACTURER')
  if (manufacturerId === undefined || manufacturerId === null) {
    throw new MissingRequiredError('Material', 'manufacturerId', 'is required')
  }
  if (typeof manufacturerId !== 'number')
    throw new ValidationError('Material manufacturerId must be a number')
  if (manufacturerId <= 0)
    throw new ValidationError(
      'Material manufacturerId must be a positive number',
    )
  if (manufacturerId % 1 !== 0)
    throw new ValidationError('Material manufacturerId must be an integer')
  if (manufacturerId > Number.MAX_SAFE_INTEGER)
    throw new ValidationError('Material manufacturerId must be a safe integer')
  // Check if the manufacturer exists in the database
  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId)
  if (!manufacturerInDb) {
    throw new ValidationError(
      `Manufacturer with id ${manufacturerId} does not exist`,
    )
  }
}

const validateUnit = async (unit) => {
  info('ENTERING MATERIAL VALIDATE UNIT')
  if (unit === undefined || unit === null) {
    throw new MissingRequiredError('Material', 'unit', 'is required')
  } else if (typeof unit !== 'string')
    throw new MissingRequiredError('Material', 'unit', 'must be a string')
  else if (unit.trim().length === 0) {
    throw new MissingRequiredError('Material', 'unit', 'must not be empty')
  }
}

const find = async (materialId, transaction) => {
  info('ENTERING MATERIAL FIND')

  const materialInDb = await Material.findByPk(materialId, { transaction })

  if (!materialInDb) {
    throw new NotFoundError('Material', materialId)
  }

  return materialInDb
}

const create = async (material, transaction) => {
  info('ENTERING MATERIAL CREATE')
  await validateName(material.name)
  await validateManufacturer(material.manufacturerId)
  await validateUnit(material.unit)

  const materialInDb = await Material.create(material, {
    transaction,
  })

  return materialInDb
}

const findOrCreate = async (material, transaction) => {
  const { name } = material

  let materialInDb = await Material.findOne({
    where: { name },
    transaction,
  })

  if (!materialInDb) {
    materialInDb = await create(material, transaction)
  }

  return materialInDb
}

const bulkCreate = async (materials, transaction) => {
  info('ENTERING MATERIAL BULK CREATE')
  if (!Array.isArray(materials) || materials.length === 0) {
    throw new ValidationError('Materials must be a non-empty array')
  }
  await Promise.all(
    materials.map(async (material) => {
      await validateName(material.name)
      await validateManufacturer(material.manufacturerId)
      await validateUnit(material.unit)
    }),
  )

  const materialInDb = await Material.bulkCreate(materials, {
    transaction,
  })

  return materialInDb
}

const deepCreate = async (material, transaction) => {
  const { manufacturer } = material

  const manufacturerInDb = await manufacturersService.findOrCreate(
    manufacturer,
    transaction,
  )

  const materialInDb = await findOrCreate(
    {
      ...material,
      manufacturerId: manufacturerInDb.id,
    },
    transaction,
  )
  return materialInDb
}

export const materialsService = {
  find,
  create,
  findOrCreate,
  bulkCreate,
  deepCreate,
}
