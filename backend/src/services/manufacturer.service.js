import { Manufacturer } from '../models/index.js'
import UniqueConstraintError from '../util/errors/UniqueConstraintError.js'
import MissingRequiredError from '../util/errors/MissingRequiredError.js'
import NotFoundError from '../util/errors/NotFoundError.js'
import { info } from '../util/logger.js'

export const manufacturerFindOptions = {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
}

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

const getAllManufacturers = async () => {
  const manufacturer = await Manufacturer.findAll(manufacturerFindOptions)

  if (!manufacturer) {
    throw new NotFoundError('Manufacturer', id)
  }

  return manufacturer
}

const getManufacturer = async (id) => {
  const manufacturer = await Manufacturer.findByPk(id, manufacturerFindOptions)

  if (!manufacturer) {
    throw new NotFoundError('Manufacturer', id)
  }

  return manufacturer
}

const createBulkManufacturers = async (manufacturers, transaction) => {
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
  await validateName(data.name)

  return await Manufacturer.create(data, { transaction })
}

const updateManufacturer = async (id, data, transaction) => {
  await validateName(data.name)

  const manufacturer = await getManufacturer(id)

  return await manufacturer.update(data, { transaction })
}

const deleteManufacturer = async (id, transaction) => {
  const manufacturer = await getManufacturer(id, transaction)

  return await manufacturer.destroy({ transaction })
}

const deleteAllManufacturers = async (transaction) => {
  return await Manufacturer.destroy({ where: {}, transaction })
}

const getManufacturerByName = async (name) => {
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
