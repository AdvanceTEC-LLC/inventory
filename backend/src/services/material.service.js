import { Manufacturer, Material } from '../models/index.js'
import { trace } from '../util/logger.js'
import ManufacturerService, {
  manufacturerFindOptions,
} from './manufacturer.service.js'
import {
  MissingRequiredError,
  ValidationError,
  UniqueConstraintError,
} from '../util/errors/index.js'
import BaseService from './BaseService.js'

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

const validateName = async (name) => {
  trace()

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

const validateManufacturerId = async (manufacturerId) => {
  trace()

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
  trace()

  if (unit === undefined || unit === null) {
    throw new MissingRequiredError('Material', 'unit', 'is required')
  } else if (typeof unit !== 'string')
    throw new MissingRequiredError('Material', 'unit', 'must be a string')
  else if (unit.trim().length === 0) {
    throw new MissingRequiredError('Material', 'unit', 'must not be empty')
  }
}

class MaterialService extends BaseService {
  constructor() {
    trace()
    super(Material)
  }

  async validate(material) {
    trace()
    await super.validate(material)

    await validateName(material.name)
    await validateManufacturerId(material.manufacturerId)
    await validateUnit(material.unit)
  }

  async createDeep(data, transaction) {
    trace()

    const { manufacturer } = data

    const manufacturerInDb = await new ManufacturerService().create(
      manufacturer,
      transaction,
    )

    const material = await this.create(
      {
        ...data,
        manufacturerId: manufacturerInDb.id,
      },
      transaction,
    )
    return material
  }

  async createBulk(materials, transaction) {
    trace()

    await super.validateArray(materials)

    const materialsInDb = await Material.bulkCreate(materials, {
      transaction,
    })

    return materialsInDb
  }
}

export default MaterialService
