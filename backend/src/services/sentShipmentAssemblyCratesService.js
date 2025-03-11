import { SentShipmentAssemblyCrate } from '../models/index.js'
import { assemblyCratesService } from './assemblyCratesService.js'
import { sentShipmentsService } from './sentShipmentsService.js'

const create = async (sentShipmentAssemblyCrate, transaction) => {
  const { assemblyCrateId, sentShipmentId } = sentShipmentAssemblyCrate

  await assemblyCratesService.find(assemblyCrateId, transaction)

  await sentShipmentsService.find(sentShipmentId, transaction)

  const sentShipmentAssemblyCrateInDb = await SentShipmentAssemblyCrate.create(
    sentShipmentAssemblyCrate,
    {
      transaction,
    },
  )

  return sentShipmentAssemblyCrateInDb
}

export const sentShipmentAssemblyCratesService = {
  create,
}
