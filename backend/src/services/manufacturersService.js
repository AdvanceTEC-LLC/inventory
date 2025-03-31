import { Manufacturer } from '../models/index.js'
import { UniqueConstraintError as SequelizeUniqueConstraintError } from 'sequelize'
import UniqueConstraintError from '../util/errors/UniqueConstraintError.js'
import MissingRequiredError from '../util/errors/MissingRequiredError.js'
import NotFoundError from '../util/errors/NotFoundError.js'
import { info } from '../util/logger.js'

const validateName = async (name) => {
  info('ENTERING MANUFACTURER VALIDATE NAME')
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

const find = async (manufacturerId, transaction) => {
  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId, {
    transaction,
  })

  if (!manufacturerInDb) {
    throw new NotFoundError('Manufacturer', manufacturerId)
  }

  return manufacturerInDb
}

const findOrCreate = async (manufacturer, transaction) => {
  let manufacturerInDb = await Manufacturer.findOne({
    where: { name: manufacturer.name },
    transaction,
  })

  if (!manufacturerInDb) {
    manufacturerInDb = await Manufacturer.create(manufacturer, { transaction })
  }

  return manufacturerInDb
}

const bulkCreate = async (manufacturers, transaction) => {
  const manufacturersInDb = await Manufacturer.bulkCreate(manufacturers, {
    transaction,
  })

  return manufacturersInDb
}

const create = async (manufacturer, transaction) => {
  info('ENTERING MANUFACTURER CREATE')
  const { name } = manufacturer

  await validateName(name)

  return await Manufacturer.create(manufacturer, { transaction })
}

const update = async (manufacturerId, data, transaction) => {
  info('ENTERING MANUFACTURER UPDATE')
  const { name } = data

  await validateName(name)

  const manufacturer = await find(manufacturerId, transaction)

  await manufacturer.update(data, { transaction })
  return manufacturer
}

export const manufacturersService = {
  find,
  findOrCreate,
  bulkCreate,
  create,
  update,
}
