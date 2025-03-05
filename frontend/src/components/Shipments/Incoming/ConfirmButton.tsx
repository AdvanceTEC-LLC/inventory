/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@mui/material'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../../reducers/notificationsReducer'
import receivedShipmentsService from '../../../services/receivedShipmentsService'
import { AppDispatch } from '../../../store'
import { NewCrateType } from '../../../types/crate'
import { NewReceivedShipmentType } from '../../../types/receivedShipment'
import { NewShipmentType } from '../../../types/shipment'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { useShipment } from '../ShipmentContext'
import { useProject } from '../../Projects/Projects/ProjectContext'

const ConfirmButton = () => {
  const { shipment } = useShipment()
  const { receivedShipment } = useReceivedShipment()
  const { project } = useProject()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createReceivedShipmentMutation = useMutation({
    mutationFn: (receivedShipment: NewReceivedShipmentType) =>
      receivedShipmentsService.deepCreate(receivedShipment),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['receivedShipments'] })
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

  const submitReceivedShipment = () => {
    if (!shipment?.trackingNumber || !project || !shipment.crates?.length)
      return

    const newCrates: NewCrateType[] = shipment.crates
      .filter((crate) => crate.number)
      .map(({ number, stock }) => ({
        number: number!,
        project,
        stock: stock!
          .filter(({ material, quantity }) => material && quantity)
          .map(({ material, quantity }) => ({
            material: material!,
            project,
            quantity: quantity!,
          })),
        opened: false,
      }))

    const newShipment: NewShipmentType = {
      trackingNumber: shipment.trackingNumber,
      project,
      crates: newCrates,
    }

    const newReceivedShipment: NewReceivedShipmentType = {
      shipment: newShipment,
      manufacturer: receivedShipment!.manufacturer!,
      receivedDate: new Date(),
    }

    createReceivedShipmentMutation.mutate(newReceivedShipment)
  }

  return (
    <Button
      variant="contained"
      onClick={submitReceivedShipment}
      loading={createReceivedShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
