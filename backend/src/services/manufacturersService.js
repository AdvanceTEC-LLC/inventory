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

export const manufacturersService = {
  findOrCreate,
}
