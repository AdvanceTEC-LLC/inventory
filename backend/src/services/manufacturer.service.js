import { Manufacturer } from '../models/index.js'
import BaseService from './classes/BaseService.js'
import {
  MissingRequiredError,
  UniqueConstraintError,
} from '../util/errors/index.js'
import { trace } from '../util/logger.js'

const validateName = async (name) => {
  trace()

  if (name === undefined || name === null) {
    throw new MissingRequiredError('Manufacturer', 'name', 'is required')
  } else if (typeof name !== 'string')
    throw new MissingRequiredError('Manufacturer', 'name', 'must be a string')
  else if (name.trim().length === 0) {
    throw new MissingRequiredError('Manufacturer', 'name', 'must not be empty')
  } else if (await Manufacturer.findOne({ where: { name: name } })) {
    throw new UniqueConstraintError('Manufacturer', 'name')
  }
}

class ManufacturerService extends BaseService {
  constructor() {
    trace()
    super(Manufacturer)
  }

  get findOptions() {
    return {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }
  }

  async validate(manufacturer) {
    trace()
    await super.validate(manufacturer)

    await validateName(manufacturer.name)
  }

  async getByName(name) {
    trace()

    const manufacturersInDb = await Manufacturer.find(
      { where: { name: name } },
      manufacturerFindOptions,
    )

    return manufacturersInDb
  }

  async createBulk(manufacturers, transaction) {
    trace()

    await super.validateArray(manufacturers)

    const manufacturersInDb = await Manufacturer.bulkCreate(manufacturers, {
      transaction,
    })

    return manufacturersInDb
  }
}

export default ManufacturerService
