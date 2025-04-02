import SentShipment from '../models/sentShipment.js'
import { info } from '../util/logger.js'
import { assemblyCratesService } from './assemblyCratesService.js'
import { projectService } from './index.js'
import { sentShipmentAssemblyCratesService } from './sentShipmentAssemblyCratesService.js'
import { NotFoundError, ValidationError } from '../util/errors/index.js'

const parseSendDate = (sendDate) => {
  info('ENTERING SENT SHIPMENT PARSE SEND DATE')
  const parsedSendDate = new Date(sendDate)

  if (sendDate !== null && isNaN(parsedSendDate.getTime())) {
    throw new ValidationError('Sent date is invalid')
  }

  return parsedSendDate
}

const find = async (sentShipmentId, transaction) => {
  info('ENTERING SENT SHIPMENT FIND')

  const sentShipmentInDb = await SentShipment.findByPk(sentShipmentId, {
    transaction,
  })

  if (!sentShipmentInDb) {
    throw new NotFoundError('Sent shipment', sentShipmentId)
  }

  return sentShipmentInDb
}

const create = async (sentShipment, transaction) => {
  info('ENTERING SENT SHIPMENT CREATE')

  const { transmittal, projectId, sendDate } = sentShipment

  const parsedSendDate = parseSendDate(sendDate)

  await projectService.find(projectId, transaction)

  const sentShipmentInDb = await SentShipment.create(
    {
      transmittal,
      projectId,
      sendDate: parsedSendDate,
    },
    { transaction },
  )

  return sentShipmentInDb
}

const deepCreate = async (sentShipment, transaction) => {
  info('ENTERING SENT SHIPMENT DEEP CREATE')
  const { assemblyCrates } = sentShipment

  const sentShipmentInDb = await create(sentShipment, transaction)

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
