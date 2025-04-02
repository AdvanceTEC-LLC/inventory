import MaterialService from '../services/material.service.js'
import { sequelize } from '../util/db.js'
import { trace } from '../util/logger.js'
import BaseController from './BaseController.js'

const service = new MaterialService()

class MaterialController extends BaseController {
  constructor() {
    trace()
    super(service)

    this.deepCreate = this.deepCreate.bind(this)
    this.bulkCreate = this.bulkCreate.bind(this)
  }

  async deepCreate(req, res, next) {
    trace()
    const transaction = await sequelize.transaction()
    try {
      const material = await service.deepCreate(req.body, transaction)
      await transaction.commit()
      res.status(201).json(material)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }

  async bulkCreate(req, res, next) {
    trace()
    const transaction = await sequelize.transaction()
    try {
      const newMaterials = await service.createBulk(req.body, transaction)
      await transaction.commit()
      res.status(201).json(newMaterials)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }
}

export default MaterialController
