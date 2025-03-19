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
import { useProject } from '../../Projects/Projects/ProjectContext'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'

const ConfirmButton = () => {
  const { project } = useProject()
  const { shipment } = useShipment()
  const { sentShipment } = useSentShipment()

  const { data: crateLocations = [] } = useCrateLocations()
  const shippedLocation = crateLocations.find((crateLocation) =>
    crateLocation.name.includes('Shipped')
  )

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createSentShipmentMutation = useMutation({
    mutationFn: (sentShipment: NewSentShipmentType) =>
      sentShipmentsService.deepCreate(sentShipment),
    onSuccess: async () => {
      await queryClient.invalidateQueries()
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
      !project ||
      !sentShipment?.assemblyCrates?.length ||
      !shippedLocation
    )
      return

    const newShipment: NewShipmentType = {
      trackingNumber: shipment.trackingNumber,
      projectId: project.id,
    }

    const updatedCrates = sentShipment.assemblyCrates.map((assemblyCrate) => {
      return {
        ...assemblyCrate,
        crate: {
          ...assemblyCrate.crate,
          crateLocation: shippedLocation,
        },
        stagingArea: undefined,
      }
    })

    const newSentShipment: NewSentShipmentType = {
      shipment: newShipment,
      sendDate: sentShipment.sendDate ?? new Date(),
      delivered: false,
      assemblyCrates: updatedCrates,
    }

    createSentShipmentMutation.mutate(newSentShipment)
  }

  return (
    <Button
      onClick={submitSentShipment}
      disabled={
        !sentShipment?.assemblyCrates?.length || !shipment?.trackingNumber
      }
      loading={createSentShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
