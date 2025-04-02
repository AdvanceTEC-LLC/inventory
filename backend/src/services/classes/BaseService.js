import { NotFoundError, ValidationError } from '../../util/errors/index.js'
import { trace } from '../../util/logger.js'

class BaseService {
  constructor(Model) {
    trace()
    if (!Model) {
      throw new Error('Model is required for BaseService')
    }
    this.Model = Model

    this.getAll = this.getAll.bind(this)
    this.get = this.get.bind(this)
  }

  async getAll() {
    trace()
    return await this.Model.findAll(this.findOptions)
  }

  async get(id) {
    trace()
    const record = await this.Model.findByPk(id, this.findOptions)

    if (!record) {
      throw new NotFoundError(this.Model.name, id)
    }

    return record
  }

  async create(data, transaction) {
    trace()
    await this.validate(data)
    return await this.Model.create(data, { transaction })
  }

  async update(id, data, transaction) {
    trace()
    await this.validate(data)
    const record = await this.get(id)
    return await record.update(data, { transaction })
  }

  async deleteRecord(id, transaction) {
    trace()
    const record = await this.get(id)
    return await record.destroy({ transaction })
  }

  async deleteAll(transaction) {
    trace()
    return await this.Model.destroy({ where: {}, transaction })
  }

  async validate(data) {
    trace()

    if (data === undefined || data === null) {
      throw new ValidationError(`${this.Model.name} is required`)
    } else if (typeof data !== 'object')
      throw new ValidationError(`${this.Model.name} must be an object`)
    else if (Array.isArray(data))
      throw new ValidationError(`${this.Model.name} must not be an array`)
    else if (Object.keys(data).length === 0)
      throw new ValidationError(`${this.Model.name} must not be empty`)
  }

  async validateArray(array) {
    trace()

    if (!Array.isArray(array) || array.length === 0) {
      throw new ValidationError(`${this.Model.name} must be a non-empty array`)
    }

    await Promise.all(
      array.map(async (data) => {
        await this.validate(data)
      }),
    )
  }
}

export default BaseService
