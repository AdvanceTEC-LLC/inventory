import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../../reducers/notificationReducer'
import { AppDispatch } from '../../../../store'
import Button from '../../../Button'
import { ReceivedShipment } from './types'
import shipmentsService from '../../../../services/shipmentsService'

interface ConfirmShipmentButtonProps {
  shipment: ReceivedShipment
}

const ConfirmShipmentButton = ({ shipment }: ConfirmShipmentButtonProps) => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createShipmentMutation = useMutation({
    mutationFn: (shipment: ReceivedShipment) =>
      shipmentsService.createReceived(shipment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
      dispatch(
        notifyWithTimeout({
          title: 'Success',
          status: 'success',
        })
      )
    },
    onError: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Error',
          message: 'Failed to confirm shipment',
          status: 'error',
        })
      )
    },
  })

  const confirmShipment = async () => {
    if (!shipment) {
      console.error('Error: No shipment to confirm')
      return
    }

    createShipmentMutation.mutate(shipment)
  }

  return (
    <Button
      text="Confirm Shipment"
      onClick={() => {
        void confirmShipment()
      }}
    />
  )
}

export default ConfirmShipmentButton
