import BaseService from './classes/BaseService.js'
import { Manufacturer, Material } from '../models/index.js'
import materialSchema from './validation/material.validation.js'
import { trace } from '../util/logger.js'

class MaterialService extends BaseService {
  constructor(manufacturerService) {
    trace()
    super(Material)

    this.manufacturerService = manufacturerService

    this.createDeep = this.createDeep.bind(this)
  }

  get findOptions() {
    return {
      attributes: {
        exclude: ['manufacturerId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Manufacturer,
          as: 'manufacturer',
          ...this.manufacturerService.findOptions,
        },
      ],
    }
  }

  async validate(material) {
    trace()
    await super.validate(materialSchema, material)
  }

  async createDeep(data, transaction) {
    trace()

    const { manufacturer } = data

    const manufacturerInDb = await this.manufacturerService.create(
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
