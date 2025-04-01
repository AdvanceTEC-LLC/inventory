import { Manufacturer } from '../models/index.js'
import {
  MissingRequiredError,
  NotFoundError,
  UniqueConstraintError,
} from '../util/errors/index.js'
import { trace } from '../util/logger.js'

export const manufacturerFindOptions = {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}

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

const getAllManufacturers = async () => {
  trace()

  const manufacturer = await Manufacturer.findAll(manufacturerFindOptions)

  if (!manufacturer) {
    throw new NotFoundError('Manufacturer', id)
  }

  return manufacturer
}

const getManufacturer = async (id) => {
  trace()

  const manufacturer = await Manufacturer.findByPk(id, manufacturerFindOptions)

  if (!manufacturer) {
    throw new NotFoundError('Manufacturer', id)
  }

  return manufacturer
}

const createBulkManufacturers = async (manufacturers, transaction) => {
  trace()

  await Promise.all(
    manufacturers.map(async (manufacturer) => {
      await validateName(manufacturer.name)
    }),
  )

  return await Manufacturer.bulkCreate(manufacturers, {
    transaction,
  })
}

const createManufacturer = async (data, transaction) => {
  trace()

  await validateName(data.name)

  return await Manufacturer.create(data, { transaction })
}

const updateManufacturer = async (id, data, transaction) => {
  trace()

  await validateName(data.name)

  const manufacturer = await getManufacturer(id)

  return await manufacturer.update(data, { transaction })
}

const deleteManufacturer = async (id, transaction) => {
  trace()

  const manufacturer = await getManufacturer(id, transaction)

  return await manufacturer.destroy({ transaction })
}

const deleteAllManufacturers = async (transaction) => {
  trace()

  return await Manufacturer.destroy({ where: {}, transaction })
}

const getManufacturerByName = async (name) => {
  trace()

  const manufacturer = await Manufacturer.findOne({
    where: { name: name },
    ...manufacturerFindOptions,
  })

  if (!manufacturer) {
    throw new NotFoundError('Manufacturer', name)
  }

  return manufacturer
}

export const manufacturerService = {
  getAllManufacturers,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
  deleteAllManufacturers,
  getManufacturer,
  getManufacturerByName,
  createBulkManufacturers,
}
