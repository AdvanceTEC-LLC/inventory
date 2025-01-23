import { Router } from 'express'
import {
  Shipment,
  Project,
  ShipmentCrate,
  Crate,
  CrateStock,
  Stock,
  Material,
} from '../models/index.js'
import { projectFindOptions } from './projects.js'
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

shipmentsRouter.post('/', async (request, response, next) => {
  const { direction, sendDate, receivedDate, project, vendor, crates } =
    request.body

  if (!['In', 'Out'].includes(direction)) {
    throw new CustomError(
      'ValidationError',
      `Shipment direction of ${direction} is neither 'In' nor 'Out'.`,
      400,
    )
  }

  // Convert sendDate and receivedDate to Date objects
  info(sendDate)
  const parsedSendDate = new Date(sendDate)
  info(parsedSendDate)

  const parsedReceivedDate = new Date(receivedDate)

  if (sendDate !== null && isNaN(parsedSendDate.getTime())) {
    throw new CustomError('ValidationError', 'Send date is invalid.', 400)
  }

  if (receivedDate && isNaN(parsedReceivedDate.getTime())) {
    throw new CustomError('ValidationError', 'Received date is invalid.', 400)
  }

  if (parsedSendDate > parsedReceivedDate) {
    const formattedSendDate = sendDate.toLocaleDateString()
    const formattedReceivedDate = receivedDate.toLocaleDateString()
    throw new CustomError(
      'ValidationError',
      `Shipment can not be received on ${formattedReceivedDate} if sent on ${formattedSendDate}`,
      400,
    )
  }

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
        direction,
        sendDate: parsedSendDate,
        receivedDate: parsedReceivedDate,
        projectId: projectInDb.id,
        vendorId: vendorInDb.id,
      },
      { transaction },
    )

    // Create crates and stock entries
    for (const crate of crates) {
      let crateInDb = await Crate.findOne({
        where: { number: crate.number },
        transaction,
      })

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
          location: crate.location,
          storageId: null,
          projectId: projectInDb.id,
          vendorId: vendorInDb.id,
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
          where: { partNumber: stock.material.partNumber },
          transaction,
        })

        if (!materialInDb) {
          materialInDb = await Material.create(
            {
              partNumber: stock.material.partNumber,
              description: stock.material.description,
              thickness: stock.material.thickness,
              width: stock.material.width,
              length: stock.material.length,
              topFinish: stock.material.topFinish,
              bottomFinish: stock.material.bottomFinish,
              xDimension: stock.material.xDimension,
              cutout: stock.material.cutout,
              tag: stock.material.tag,
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

    info(sendDate)
    info(parsedSendDate)

    // Send the shipment data back as response
    response.status(201).send(shipment)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
})

shipmentsRouter.post('/outbound/', async (request, response, next) => {
  const { direction, sendDate, project, crates } = request.body

  if ('Out' !== direction) {
    throw new CustomError(
      'ValidationError',
      `Shipment direction of ${direction} is not 'Out'.`,
      400,
    )
  }

  info(sendDate)
  // Convert sendDate and receivedDate to Date objects
  const parsedSendDate = new Date(sendDate)
  info(parsedSendDate)

  if (sendDate !== null && isNaN(parsedSendDate.getTime())) {
    throw new CustomError('ValidationError', 'Send date is invalid.', 400)
  }

  if (parsedSendDate > parsedReceivedDate) {
    const formattedSendDate = sendDate.toLocaleDateString()
    const formattedReceivedDate = receivedDate.toLocaleDateString()
    throw new CustomError(
      'ValidationError',
      `Shipment can not be received on ${formattedReceivedDate} if sent on ${formattedSendDate}`,
      400,
    )
  }

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

    // Create shipment entry
    const shipment = await Shipment.create(
      {
        direction,
        sendDate: parsedSendDate,
        projectId: projectInDb.id,
      },
      { transaction },
    )

    // Create crate relationships
    for (const crate of crates) {
      const crateInDb = await Crate.findOne({
        where: { number: crate.number },
        transaction,
      })

      if (!crateInDb) {
        throw new CustomError(
          'ValidationError',
          `Crate with number ${crate.number} does not exist.`,
          400,
        )
      }

      await ShipmentCrate.create(
        {
          crateId: crateInDb.id,
          shipmentId: shipment.id,
        },
        { transaction },
      )
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
