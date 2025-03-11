import { AssemblyCrate, SentShipment, Shipment } from '../models/index.js'
import { shipmentFindOptions } from './shipments.js'
import { assemblyCrateFindOptions } from './assemblyCrates.js'
import createGenericRouter from '../util/genericRouter.js'
import { sentShipmentsService } from '../services/sentShipmentsService.js'

export const sentShipmentFindOptions = {
  attributes: { exclude: ['createdAt', 'updatedAt'] },
  include: [
    {
      model: Shipment,
      as: 'shipment',
      ...shipmentFindOptions,
    },
    {
      model: AssemblyCrate,
      as: 'assemblyCrates',
      through: { attributes: [] },
      ...assemblyCrateFindOptions,
    },
  ],
}

const sentShipmentsRouter = createGenericRouter({
  model: SentShipment,
  service: sentShipmentsService,
  findOptions: sentShipmentFindOptions,
})

export default sentShipmentsRouter
