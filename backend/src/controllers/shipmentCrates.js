import { Router } from 'express'
import { ShipmentCrate, Crate, Shipment } from '../models/index.js'
import { CustomError } from '../util/errors/CustomError.js'
import { shipmentFindOptions } from './shipments.js'

const shipmentCratesRouter = Router()

const shipmentCrateFindOptions = {
  attributes: { exclude: ['shipmentId', 'crateId', 'createdAt', 'updatedAt'] },
  include: [
    {
      model: Shipment,
      as: 'shipment',
      ...shipmentFindOptions,
    },
    {
      model: Crate,
      as: 'crate',
      //...crateFindOptions,
    },
  ],
}

const shipmentCrateFinder = async (request, _response, next) => {
  const { id } = request.params
  const shipmentCrate = await ShipmentCrate.findByPk(
    id,
    shipmentCrateFindOptions,
  )

  if (!shipmentCrate) {
    throw new CustomError(
      'NotFoundError',
      `Shipment Crate with id ${id} not found`,
      404,
    )
  }
  request.shipmentCrate = shipmentCrate
  next()
}

shipmentCratesRouter.get('/', async (_request, response) => {
  const crate = await ShipmentCrate.findAll(shipmentCrateFindOptions)

  response.status(200).send(crate)
})

shipmentCratesRouter.get(
  '/:id',
  shipmentCrateFinder,
  async (request, response) => {
    response.status(200).send(request.shipmentCrate)
  },
)

shipmentCratesRouter.post('/', async (request, response) => {
  const { crateId, shipmentId } = request.body

  const crateExists = await Crate.findByPk(crateId)

  if (!crateExists) {
    throw new CustomError(
      'NotFoundError',
      `Crate with id ${crateId} not found.`,
      404,
    )
  }

  const shipmentExists = await Shipment.findByPk(shipmentId)

  if (!shipmentExists) {
    throw new CustomError(
      'NotFoundError',
      `Shipment with id ${shipmentId} not found.`,
      404,
    )
  }

  const shipmentCrate = await ShipmentCrate.create({
    crateId,
    shipmentId,
  })

  response.status(201).send(shipmentCrate)
})

shipmentCratesRouter.delete(
  '/:id',
  shipmentCrateFinder,
  async (request, response) => {
    await request.shipmentCrate.destroy()
    response
      .status(204)
      .json({ message: 'Shipment crate entry deleted successfully' })
  },
)

shipmentCratesRouter.delete('/', async (request, response) => {
  await ShipmentCrate.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })
  response
    .status(204)
    .json({ message: 'All shipment crates deleted successfully' })
})

export default shipmentCratesRouter
