import { Manufacturer, Material } from '../models/index.js'
import { info } from '../util/logger.js'
import {
  manufacturerFindOptions,
  manufacturerService,
} from './manufacturer.service.js'
import {
  MissingRequiredError,
  ValidationError,
  NotFoundError,
  UniqueConstraintError,
} from '../util/errors/index.js'

export const materialFindOptions = {
  attributes: {
    exclude: ['manufacturerId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerFindOptions,
    },
  ],
}

const validateMaterials = async (materials) => {
  if (!Array.isArray(materials) || materials.length === 0) {
    throw new ValidationError('Materials must be a non-empty array')
  }
  await Promise.all(
    materials.map(async (material) => {
      await validateName(material.name)
      await validateMaterial(material.materialId)
      await validateUnit(material.unit)
    }),
  )
}

const validateMaterial = async (material) => {
  info('ENTERING MATERIAL VALIDATE')
  if (material === undefined || material === null) {
    throw new MissingRequiredError('Material', 'material', 'is required')
  } else if (typeof material !== 'object')
    throw new MissingRequiredError('Material', 'material', 'must be an object')
  else if (Array.isArray(material))
    throw new MissingRequiredError(
      'Material',
      'material',
      'must not be an array',
    )
  else if (Object.keys(material).length === 0)
    throw new MissingRequiredError('Material', 'material', 'must not be empty')

  await validateName(material.name)
  await validateManufacturer(material.manufacturerId)
  await validateUnit(material.unit)
}

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
      'Manufacturer manufacturerId must be a positive number',
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

const getAllMaterials = async () => {
  const material = await Material.findAll(materialFindOptions)

  if (!material) {
    throw new NotFoundError('Material', id)
  }

  return material
}

const getMaterial = async (id) => {
  const material = await Material.findByPk(id, materialFindOptions)

  if (!material) {
    throw new NotFoundError('Material', id)
  }

  return material
}

const createMaterial = async (data, transaction) => {
  info('ENTERING MATERIAL CREATE')
  await validateMaterial(data)

  const material = await Material.create(data, {
    transaction,
  })

  return material
}

const createDeepMaterial = async (data, transaction) => {
  const manufacturerInDb = await manufacturerService.create(data, transaction)

  const material = await createMaterial(
    {
      ...data,
      manufacturerId: manufacturerInDb.id,
    },
    transaction,
  )
  return material
}

const createBulkMaterials = async (data, transaction) => {
  info('ENTERING MATERIAL BULK CREATE')
  await validateMaterials(data)

  const materials = await Material.bulkCreate(data, {
    transaction,
  })

  return materials
}

const updateMaterial = async (id, data, transaction) => {
  await validateName(data.name)

  const material = await getMaterial(id)

  return await material.update(data, { transaction })
}

const deleteMaterial = async (id, transaction) => {
  const material = await getMaterial(id, transaction)

  return await material.destroy({ transaction })
}

const deleteAllMaterials = async (transaction) => {
  return await Material.destroy({ where: {}, transaction })
}

export const materialService = {
  getAllMaterials,
  getMaterial,
  createMaterial,
  createDeepMaterial,
  createBulkMaterials,
  updateMaterial,
  deleteMaterial,
  deleteAllMaterials,
}
