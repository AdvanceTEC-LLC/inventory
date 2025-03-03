import { Button } from '@mui/material'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import sentShipmentsService from '../../services/sentShipmentsService'
import { AppDispatch } from '../../store'
import { NewSentShipmentType } from '../../types/sentShipment'
import { NewShipmentType } from '../../types/shipment'
import { useShipment } from './ShipmentContext'
import StagingAreaSelector from './StagingAreaSelector'
import { useSentShipment } from './SentShipmentContext'

const OutgoingForm = () => {
  const { shipment } = useShipment()
  const { sentShipment } = useSentShipment()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createSentShipmentMutation = useMutation({
    mutationFn: (sentShipment: NewSentShipmentType) =>
      sentShipmentsService.create(sentShipment),
    onMutate: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Processing...',
          message: 'Your shipment is being processed.',
          status: 'info',
        })
      )
    },
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
    if (!shipment?.project || !sentShipment?.crates?.length) return

    const newShipment: NewShipmentType = {
      trackingNumber: 0,
      project: shipment.project,
      crates: sentShipment.crates,
    }

    const newSentShipment: NewSentShipmentType = {
      shipment: newShipment,
      sendDate: new Date(),
      delivered: false,
    }

    console.log(newSentShipment)

    createSentShipmentMutation.mutate(newSentShipment)
  }

  return (
    <>
      <StagingAreaSelector />
      <Button onClick={submitSentShipment}>Confirm Shipment</Button>
    </>
  )
}

export default OutgoingForm
