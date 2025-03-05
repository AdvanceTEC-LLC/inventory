import { Button } from '@mui/material'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import sentShipmentsService from '../../../services/sentShipmentsService'
import { AppDispatch } from '../../../store'
import { NewSentShipmentType } from '../../../types/sentShipment'
import { NewShipmentType } from '../../../types/shipment'
import { useShipment } from '../ShipmentContext'
import { useSentShipment } from './SentShipmentContext'

const ConfirmButton = () => {
  const { shipment } = useShipment()
  const { sentShipment } = useSentShipment()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createSentShipmentMutation = useMutation({
    mutationFn: (sentShipment: NewSentShipmentType) =>
      sentShipmentsService.create(sentShipment),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentShipments'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: (error) => {
      const { name, message } = error
      dispatch(
        notifyWithTimeout({
          title: name,
          message: message,
          status: 'error',
        })
      )
    },
  })

  const submitSentShipment = () => {
    if (
      !shipment?.trackingNumber ||
      !shipment.project ||
      !sentShipment?.crates?.length
    )
      return

    const newShipment: NewShipmentType = {
      trackingNumber: shipment.trackingNumber,
      project: shipment.project,
      crates: sentShipment.crates,
    }

    const newSentShipment: NewSentShipmentType = {
      shipment: newShipment,
      sendDate: new Date(),
      delivered: false,
    }

    createSentShipmentMutation.mutate(newSentShipment)
  }

  return (
    <Button
      variant={'contained'}
      onClick={submitSentShipment}
      loading={createSentShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
