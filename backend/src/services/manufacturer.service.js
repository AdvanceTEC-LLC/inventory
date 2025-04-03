import BaseService from './classes/BaseService.js'
import { Manufacturer } from '../models/index.js'
import manufacturerSchema from './validation/manufacturer.validation.js'
import { trace } from '../util/logger.js'

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
    await super.validate(manufacturerSchema, manufacturer)
  }

  async getByName(name) {
    trace()

    const manufacturersInDb = await Manufacturer.find(
      { where: { name: name } },
      this.findOptions,
    )

    return manufacturersInDb
  }

  async bulkCreate(manufacturers, transaction) {
    trace()

    await super.validateArray(manufacturers)

    const manufacturersInDb = await Manufacturer.bulkCreate(manufacturers, {
      transaction,
    })

    return manufacturersInDb
  }
}

export default ManufacturerService
