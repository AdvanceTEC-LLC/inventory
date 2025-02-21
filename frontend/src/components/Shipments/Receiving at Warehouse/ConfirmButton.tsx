import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import { AppDispatch } from '../../../store'
import Button from '../../ATEC UI/Button'
import receivedShipmentsService from '../../../services/receivedShipmentsService'
import { NewReceivedShipmentType } from '../../../types/receivedShipment'

interface ConfirmreceivedShipmentButtonProps {
  receivedShipment: NewReceivedShipmentType
}

const ConfirmReceivedShipmentButton = ({
  receivedShipment,
}: ConfirmreceivedShipmentButtonProps) => {
  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createreceivedShipmentMutation = useMutation({
    mutationFn: (receivedShipment: NewReceivedShipmentType) =>
      receivedShipmentsService.deepCreate(receivedShipment),
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
      queryClient.invalidateQueries({ queryKey: ['receivedShipments'] })
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

  const confirmReceivedShipment = async () => {
    if (!receivedShipment) {
      console.error('Error: No shipment to confirm')
      return
    }

    console.log(receivedShipment)
    createreceivedShipmentMutation.mutate(receivedShipment)
  }

  return (
    <Button
      text="Confirm shipment"
      onClick={() => {
        void confirmReceivedShipment()
      }}
    />
  )
}

export default ConfirmReceivedShipmentButton
