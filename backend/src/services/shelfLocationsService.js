import { ShelfLocation } from '../models/index.js'

const findOrCreate = async (shelfLocation, transaction) => {
  let shelfLocationInDb = await ShelfLocation.findOne({
    where: {
      side: shelfLocation.side,
      aisle: shelfLocation.aisle,
      col: shelfLocation.col,
      shelf: shelfLocation.shelf,
    },
    transaction,
  })

  if (!shelfLocationInDb) {
    shelfLocationInDb = await ShelfLocation.create(shelfLocation, {
      transaction,
    })
  }

  return shelfLocationInDb
}

const bulkCreate = async (shelfLocations, transaction) => {
  const shelfLocationsInDb = await ShelfLocation.bulkCreate(shelfLocations, {
    transaction,
  })

  return shelfLocationsInDb
}

export const shelfLocationsService = {
  findOrCreate,
  bulkCreate,
}
