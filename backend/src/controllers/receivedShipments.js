import {
  Manufacturer,
  ReceivedShipment,
  Shipment,
  MaterialCrate,
} from '../models/index.js'
import { receivedShipmentsService } from '../services/receivedShipmentsService.js'
import createGenericRouter from '../util/genericRouter.js'
import { manufacturerService } from '../services/index.js'
import { materialCrateFindOptions } from './materialCrates.js'
import { shipmentFindOptions } from './shipments.js'

export const receivedShipmentFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [
    {
      model: Shipment,
      as: 'shipment',
      ...shipmentFindOptions,
    },
    {
      model: Manufacturer,
      as: 'manufacturer',
      ...manufacturerService.findOptions,
    },
    {
      model: MaterialCrate,
      as: 'materialCrates',
      through: { attributes: [] },
      ...materialCrateFindOptions,
    },
  ],
}

const receivedShipmentsRouter = createGenericRouter({
  model: ReceivedShipment,
  service: receivedShipmentsService,
  findOptions: receivedShipmentFindOptions,
})

export default receivedShipmentsRouter
