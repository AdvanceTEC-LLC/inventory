import { Division, Manufacturer, Material } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { divisionsService } from './divisionsService.js'
import { manufacturersService } from './manufacturersService.js'

const findOrCreate = async (material, transaction) => {
  let materialInDb = await Material.findOne({
    where: { name: material.name },
    transaction,
  })

  if (!materialInDb) {
    const manufacturerInDb = await Manufacturer.findByPk(
      material.manufacturerId,
      { transaction },
    )

    if (!manufacturerInDb) {
      throw new CustomError(
        'NotFoundError',
        `Manufacturer with id ${material.manufacturerId} not found`,
        404,
      )
    }

    const divisionInDb = await Division.findByPk(material.divisionId, {
      transaction,
    })

    if (!divisionInDb) {
      throw new CustomError(
        'NotFoundError',
        `Division with id ${material.divisionId} not found`,
        404,
      )
    }

    materialInDb = await Material.create(material, {
      transaction,
    })
  }

  return materialInDb
}

const deepCreate = async (material, transaction) => {
  const { manufacturer, division } = material

  const manufacturerInDb = await manufacturersService.findOrCreate(
    manufacturer,
    transaction,
  )

  const divisionInDb = await divisionsService.findOrCreate(
    division,
    transaction,
  )

  const materialInDb = await findOrCreate(
    {
      ...material,
      manufacturerId: manufacturerInDb.id,
      divisionId: divisionInDb.id,
    },
    transaction,
  )
  return materialInDb
}

export const materialsService = {
  deepCreate,
}
