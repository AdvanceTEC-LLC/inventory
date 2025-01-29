import { StagingArea } from '../models/index.js'

const findOrCreate = async (stagingArea, transaction) => {
  let stagingAreaInDb = await StagingArea.findOne({
    where: { name: stagingArea.name },
    transaction,
  })

  if (!stagingAreaInDb) {
    stagingAreaInDb = await StagingArea.create(stagingArea, {
      transaction,
    })
  }

  return stagingAreaInDb
}

export const stagingAreasService = {
  findOrCreate,
}
