import { sequelize } from '../util/db.js'
import { info, trace } from '../util/logger.js'

class BaseController {
  constructor(service) {
    trace()
    if (!service) {
      throw new Error('Service is required for BaseController')
    }
    this.service = service

    this.getAll = this.getAll.bind(this)
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
  }

  async getAll(_req, res) {
    trace()

    const allRecords = await this.service.getAll()
    res.json(allRecords)
  }

  async get(req, res) {
    const { id } = req.params

    const record = await this.service.get(id)
    res.status(200).json(record)
  }

  async create(req, res, next) {
    const transaction = await sequelize.transaction()
    try {
      const newRecord = await this.service.create(req.body, transaction)
      await transaction.commit()
      res.status(201).json(newRecord)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }

  async update(req, res, next) {
    const { id } = req.params
    const transaction = await sequelize.transaction()
    try {
      const updatedRecord = await this.service.update(id, req.body, transaction)
      await transaction.commit()
      res.status(200).json(updatedRecord)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }

  async deleteRecord(req, res, next) {
    const { id } = req.params
    const transaction = await sequelize.transaction()
    try {
      const deletedRecord = await this.service.deleteRecord(id, transaction)
      await transaction.commit()
      res.status(204).json(deletedRecord)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }

  async deleteAll(_req, res, next) {
    const transaction = await sequelize.transaction()
    try {
      const deletedRecords = await this.service.deleteAll(transaction)
      await transaction.commit()
      res.status(204).json(deletedRecords)
    } catch (error) {
      await transaction.rollback()
      next(error)
    }
  }
}

export default BaseController
