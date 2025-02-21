import { Manufacturer } from '../models/index.js'

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
  findOrCreate,
  bulkCreate,
}
