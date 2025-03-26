import { Button } from '@mui/material'
import sentShipmentsService from '../../../services/sentShipmentsService'
import { NewSentShipmentType } from '../../../types/sentShipment'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { useCrateLocations } from '../../../hooks/useCrateLocationsHook'
import { useFormContext } from 'react-hook-form'
import { SentShipmentType } from './types'
import { useMutationWithNotifications } from '../../../hooks/useMutationWithNotifications'

const ConfirmButton = () => {
  const { project } = useProject()
  const { handleSubmit, reset } = useFormContext<SentShipmentType>()

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

    const newSentShipment: NewSentShipmentType = {
      transmittal: data.transmittal,
      projectId: project.id,
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
