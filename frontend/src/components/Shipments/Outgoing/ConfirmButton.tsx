import { Button } from '@mui/material'
import sentShipmentsService from '../../../services/sentShipmentsService'
import { NewSentShipmentType } from '../../../types/sentShipment'
import { NewShipmentType } from '../../../types/shipment'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'
import { useFormContext } from 'react-hook-form'
import { SentShipmentType } from './types'
import { useMutationWithNotifications } from '../../../hooks/useMutationWithNotifications'

const ConfirmButton = () => {
  const { project } = useProject()
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = useFormContext<SentShipmentType>()

  const { data: crateLocations = [] } = useCrateLocations()
  const shippedLocation = crateLocations.find((crateLocation) =>
    crateLocation.name.includes('Shipped')
  )

  const { mutate, isPending } = useMutationWithNotifications<
    unknown,
    NewSentShipmentType
  >({
    mutationFn: sentShipmentsService.deepCreate,
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = (data: SentShipmentType) => {
    if (!project || !shippedLocation) {
      return
    }

    const newShipment: NewShipmentType = {
      trackingNumber: data.trackingNumber,
      projectId: project.id,
    }

    const newSentShipment: NewSentShipmentType = {
      shipment: newShipment,
      sendDate: new Date(data.sendDate.toISOString()),
      delivered: false,
      assemblyCrates: data.assemblyCrates.map((assemblyCrate) => ({
        ...assemblyCrate,
        crate: {
          ...assemblyCrate.crate,
          crateLocation: shippedLocation,
        },
        stagingArea: undefined,
      })),
    }

    mutate(newSentShipment)
  }

  return (
    <Button
      onClick={handleSubmit(onSubmit)}
      disabled={isPending}
      loading={isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
