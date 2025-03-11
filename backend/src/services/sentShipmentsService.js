import SentShipment from '../models/sentShipment.js'
import { CustomError } from '../util/errors/CustomError.js'
import { info } from '../util/logger.js'
import { assemblyCratesService } from './assemblyCratesService.js'
import { sentShipmentAssemblyCratesService } from './sentShipmentAssemblyCratesService.js'
import { shipmentsService } from './shipmentsService.js'

const parseSendDate = (sendDate) => {
  info('ENTERING SENT SHIPMENT PARSE SEND DATE')
  const parsedSendDate = new Date(sendDate)

  if (sendDate !== null && isNaN(parsedSendDate.getTime())) {
    throw new CustomError('ValidationError', 'Sent date is invalid.', 400)
  }

  return parsedSendDate
}

const find = async (sentShipmentId, transaction) => {
  info('ENTERING SENT SHIPMENT FIND')

  const sentShipmentInDb = await SentShipment.findByPk(sentShipmentId, {
    transaction,
  })

  if (!sentShipmentInDb) {
    throw new CustomError(
      'NotFoundError',
      `Sent shipment with id ${sentShipmentId} not found.`,
      404,
    )
  }

  return sentShipmentInDb
}

const create = async (sentShipment, transaction) => {
  info('ENTERING SENT SHIPMENT CREATE')

  const { shipmentId, sendDate } = sentShipment

  const parsedSendDate = parseSendDate(sendDate)

  await shipmentsService.find(shipmentId, transaction)

  const sentShipmentInDb = await SentShipment.create(
    {
      shipmentId,
      sendDate: parsedSendDate,
    },
    { transaction },
  )

  return sentShipmentInDb
}

const deepCreate = async (sentShipment, transaction) => {
  info('ENTERING SENT SHIPMENT DEEP CREATE')
  const { shipment, assemblyCrates } = sentShipment

  const shipmentInDb = await shipmentsService.create(shipment, transaction)

  const sentShipmentInDb = await create(
    { ...sentShipment, shipmentId: shipmentInDb.id },
    transaction,
  )

  await Promise.all(
    assemblyCrates.map(async (assemblyCrate) => {
      await assemblyCratesService.update(assemblyCrate, transaction)

      await sentShipmentAssemblyCratesService.create(
        {
          sentShipmentId: sentShipmentInDb.id,
          assemblyCrateId: assemblyCrate.id,
        },
        transaction,
      )
    }),
  )

  return sentShipmentInDb
}

export const sentShipmentsService = {
  find,
  create,
  deepCreate,
}
