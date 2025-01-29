import { Division } from '../models/index.js'

const findOrCreate = async (division, transaction) => {
  let divisionInDb = await Division.findOne({
    where: { number: division.number },
    transaction,
  })

  if (!divisionInDb) {
    divisionInDb = await Division.create(division, { transaction })
  }

  return divisionInDb
}

export const divisionsService = {
  findOrCreate,
}
