import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { AppDispatch } from '../../../store'
import Button from '../../ATEC UI/Button'
import shipmentsService from '../../../services/shipmentsService'
import { CreateShipmentType } from '../../../types/shipment'

interface ConfirmShipmentButtonProps {
  shipment: CreateShipmentType
}

const ConfirmShipmentButton = ({ shipment }: ConfirmShipmentButtonProps) => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createShipmentMutation = useMutation({
    mutationFn: (shipment: CreateShipmentType) =>
      shipmentsService.create(shipment),
    onMutate: () => {
      dispatch(
        notifyWithTimeout({
          title: 'Processing...',
          message: 'Your shipment is being processed.',
          status: 'info',
        })
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipments'] })
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
