import { Button } from '@mui/material'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../../reducers/notificationsReducer'
import receivedShipmentsService from '../../services/receivedShipmentsService'
import { AppDispatch } from '../../store'
import { NewCrateType } from '../../types/crate'
import { NewReceivedShipmentType } from '../../types/receivedShipment'
import { NewShipmentType } from '../../types/shipment'
import IncomingCrateList from './IncomingCrateList'
import ManufacturerSelector from './ManufacturerSelector'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { useShipment } from './ShipmentContext'
import ProjectSelector from './ProjectSelector'

const IncomingForm = () => {
  const { shipment } = useShipment()
  const { receivedShipment } = useReceivedShipment()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createReceivedShipmentMutation = useMutation({
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

  const submitReceivedShipment = () => {
    if (
      !shipment?.trackingNumber ||
      !shipment?.project ||
      !shipment?.crates?.length
    )
      return

    const newCrates: NewCrateType[] = shipment.crates
      .filter((crate) => crate.number)
      .map(({ number, stock }) => ({
        number: number!,
        project: shipment.project!,
        stock: stock!
          .filter(({ material, quantity }) => material && quantity)
          .map(({ material, quantity }) => ({
            material: material!,
            project: shipment.project!,
            quantity: quantity!,
          })),
        opened: false,
      }))

    const newShipment: NewShipmentType = {
      trackingNumber: shipment.trackingNumber,
      project: shipment.project,
      crates: newCrates,
    }

    const newReceivedShipment: NewReceivedShipmentType = {
      shipment: newShipment,
      manufacturer: receivedShipment?.manufacturer!,
      receivedDate: new Date(),
    }

    createReceivedShipmentMutation.mutate(newReceivedShipment)
  }

  return (
    <>
      <ProjectSelector />
      <ManufacturerSelector />
      <IncomingCrateList />
      <Button variant="contained" onClick={submitReceivedShipment}>
        Confirm Shipment
      </Button>
    </>
  )
}

export default IncomingForm
