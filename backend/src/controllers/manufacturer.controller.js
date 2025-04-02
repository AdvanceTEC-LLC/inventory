import ManufacturerService from '../services/manufacturer.service.js'
import { sequelize } from '../util/db.js'
import { trace } from '../util/logger.js'
import BaseController from './classes/BaseController.js'

const service = new ManufacturerService()

class ManufacturerController extends BaseController {
  constructor() {
    trace()
    super(service)

    this.getByName = this.getByName.bind(this)
    this.bulkCreate = this.bulkCreate.bind(this)
  }

  async getByName(req, res) {
    trace()

    const manufacturer = await service.getByName(req.body)
    res.status(201).json(manufacturer)
  }

  async bulkCreate(req, res, next) {
    trace()
    const transaction = await sequelize.transaction()
    try {
      const newManufacturers = await service.createBulk(req.body, transaction)
      await transaction.commit()
      res.status(201).json(newManufacturers)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }
}

export default ManufacturerController
