import { Manufacturer } from '../models/index.js'

const find = async (manufacturerId, transaction) => {
  const manufacturerInDb = await Manufacturer.findByPk(manufacturerId, {
    transaction,
  })

  if (!manufacturerInDb) {
    throw new CustomError(
      'NotFoundError',
      `Manufacturer with id ${manufacturerId} not found`,
      404,
    )
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

export const manufacturersService = {
  find,
  findOrCreate,
  bulkCreate,
}
