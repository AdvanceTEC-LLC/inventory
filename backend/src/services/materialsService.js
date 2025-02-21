import { Manufacturer, Material } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { manufacturersService } from './manufacturersService.js'

const create = async (material, transaction) => {
  const materialInDb = await Material.create(material, {
    transaction,
  })

  return materialInDb
}

const findOrCreate = async (material, transaction) => {
  const { name, unit, manufacturerId } = material

  let materialInDb = await Material.findOne({
    where: { name },
    transaction,
  })

  if (!materialInDb) {
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

    materialInDb = await Material.create(material, {
      transaction,
    })
  }

  return materialInDb
}

const bulkCreate = async (materials, transaction) => {
  await Promise.all(
    materials.map(async (material) => {
      const manufacturer = await Manufacturer.findByPk(
        material.manufacturerId,
        { transaction },
      )
      if (!manufacturer) {
        throw new CustomError(
          'NotFoundError',
          `Manufacturer with id ${material.manufacturerId} not found`,
          404,
        )
      }
    }),
  )

  const materialInDb = await Material.bulkCreate(materials, {
    transaction,
  })

  return materialInDb
}

const deepCreate = async (material, transaction) => {
  const { manufacturer } = material

  const manufacturerInDb = await manufacturersService.findOrCreate(
    manufacturer,
    transaction,
  )

  const materialInDb = await findOrCreate(
    {
      ...material,
      manufacturerId: manufacturerInDb.id,
    },
    transaction,
  )
  return materialInDb
}

export const materialsService = {
  create,
  findOrCreate,
  bulkCreate,
  deepCreate,
}
