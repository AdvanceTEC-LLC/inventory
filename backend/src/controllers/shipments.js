import { Router } from 'express'
import {
  Shipment,
  Project,
  Vendor,
  ShipmentCrate,
  Crate,
  CrateStock,
  Stock,
  Material,
} from '../models/index.js'
import { projectFindOptions } from './projects.js'
import { vendorFindOptions } from './vendors.js'
import { crateFindOptions } from './crates.js'
import { sequelize } from '../util/db.js'
import { CustomError } from '../util/errors/CustomError.js'
const shipmentsRouter = Router()

export const shipmentFindOptions = {
  attributes: {
    exclude: ['projectId', 'vendorId', 'createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Project,
      as: 'project',
      ...projectFindOptions,
    },
    {
      model: Vendor,
      as: 'vendor',
      ...vendorFindOptions,
    },
    {
      model: Crate,
      as: 'crates',
      through: { attributes: [] },
      ...crateFindOptions,
    },
  ],
}

const shipmentFinder = async (request, _response, next) => {
  const { id } = request.params
  const shipment = await Shipment.findByPk(id, shipmentFindOptions)

  if (!shipment) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${id} not found`,
      404,
    )
  }

  const shipmentCrates = await ShipmentCrate.findAll({
    attributes: { where: { shipmentId: request.shipment.id } },
  })

  const findCrate = async (crateId) => {
    return await Crate.findByPk(crateId, crateFindOptions)
  }

  const crates = shipmentCrates.map((shipmentCrate) =>
    findCrate(shipmentCrate.crateId),
  )

  request.shipment = { ...request.shipment, crates }

  next()
}

shipmentsRouter.get('/', async (_request, response) => {
  const shipments = await Shipment.findAll(shipmentFindOptions)
  response.status(200).send(shipments)
})

shipmentsRouter.get('/:id', shipmentFinder, async (request, response) => {
  response.status(200).send(request.shipment)
})

shipmentsRouter.post('/', async (request, response) => {
  const { type, status, projectId, vendorId } = request.body

  const projectExists = await Project.findByPk(projectId)

  if (!projectExists) {
    return response
      .status(404)
      .send({ error: `No matching project with id ${projectId}` })
  }

  const vendorExists = await Vendor.findByPk(vendorId)

  if (!vendorExists) {
    return response
      .status(404)
      .send({ error: `No matching vendor with id ${vendorId}` })
  }

  try {
    const shipment = await Shipment.create({
      type,
      status,
      projectId,
      vendorId,
    })
    response.status(201).send(shipment)
  } catch (error) {
    return response.status(400).send({ error: error })
  }
})

shipmentsRouter.post('/received/', async (request, response, next) => {
  const { project, vendor, crates } = request.body

  const transaction = await sequelize.transaction()

  try {
    // Check if project and vendor exist in the database
    let projectInDb = await Project.findOne({
      where: { number: project.number },
      transaction,
    })

    if (!projectInDb) {
      projectInDb = await Project.create(project, { transaction })
    }

    let vendorInDb = await Vendor.findOne({
      where: { name: vendor.name },
      transaction,
    })

    if (!vendorInDb) {
      vendorInDb = await Vendor.create(vendor, { transaction })
    }

    // Create shipment entry
    const shipment = await Shipment.create(
      {
        type: 'Vendor to Warehouse',
        status: 'Received',
        projectId: projectInDb.id,
        vendorId: vendorInDb.id,
      },
      { transaction },
    )

    // Create crates and stock entries
    for (const crate of crates) {
      let crateInDb = await Crate.findOne(
        { attributes: { where: { number: crate.number } } },
        { transaction },
      )

      if (crateInDb) {
        throw new CustomError(
          'ValidationError',
          `Crate with number ${crate.number} already exists.`,
          400,
        )
      }

      crateInDb = await Crate.create(
        {
          number: crate.number,
          locationId: null,
          projectId: projectInDb.id,
        },
        { transaction },
      )

      await ShipmentCrate.create(
        {
          crateId: crateInDb.id,
          shipmentId: shipment.id,
        },
        { transaction },
      )

      // Create stock entries for each crate
      for (const stock of crate.stock) {
        let materialInDb = await Material.findOne({
          where: { partNumber: stock.material.number },
          transaction,
        })

        if (!materialInDb) {
          materialInDb = await Material.create(
            {
              partNumber: stock.material.number,
              description: stock.material.description,
              thicknessInches: stock.material.thickness,
              widthInches: stock.material.width,
              lengthInches: stock.material.length,
              color: `${stock.material.topColor} ${stock.material.bottomColor}`,
              tag: `${stock.material.tag}${stock.material.additionalTagInformation}`,
              vendorId: vendorInDb.id,
            },
            { transaction },
          )
        }

        const stockInDb = await Stock.create(
          {
            materialId: materialInDb.id,
            quantity: stock.quantity,
          },
          { transaction },
        )

        await CrateStock.create(
          {
            stockId: stockInDb.id,
            crateId: crateInDb.id,
          },
          { transaction },
        )
      }
    }

    await transaction.commit()

    // Send the shipment data back as response
    response.status(201).send(shipment)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

shipmentsRouter.delete('/:id', shipmentFinder, async (request, response) => {
  await request.shipment.destroy()
  response.status(204).json({ message: 'Shipment entry deleted successfully' })
})

shipmentsRouter.delete('/', async (request, response) => {
  await Shipment.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response.status(204).json({ message: 'All shipments deleted successfully' })
})

export default shipmentsRouter
