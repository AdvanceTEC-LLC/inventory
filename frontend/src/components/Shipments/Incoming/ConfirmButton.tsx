import { Button } from '@mui/material'
import receivedShipmentsService from '../../../services/receivedShipmentsService'
import { NewCrateType } from '../../../types/crate'
import { NewReceivedShipmentType } from '../../../types/receivedShipment'
import { NewShipmentType } from '../../../types/shipment'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { NewMaterialCrateType } from '../../../types/materialCrate'
import { NewStockType } from '../../../types/stock'
import { useFormContext } from 'react-hook-form'
import { ReceivedShipmentType } from './types'
import { useMutationWithNotifications } from '../../../hooks/useMutationWithNotifications'

const ConfirmButton = () => {
  const { project } = useProject()

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<ReceivedShipmentType>()

  const createReceivedShipmentMutation = useMutationWithNotifications<
    unknown,
    NewReceivedShipmentType
  >({
    mutationFn: receivedShipmentsService.deepCreate,
  })

  const onSubmit = (formData: ReceivedShipmentType) => {
    console.log('Form Data:', formData)

    const materialCrates: NewMaterialCrateType[] = formData.materialCrates
      .filter((crate) => crate.number)
      .map((crate) => {
        const newCrate: NewCrateType = {
          number: crate.number,
          projectId: project!.id,
        }

        const stock: NewStockType[] = crate.stock.map(
          ({ material, quantity }) => {
            return {
              materialId: material!.id,
              projectId: project!.id,
              quantity: quantity!,
            }
          }
        )

        return {
          crate: newCrate,
          stock,
          opened: false,
        }
      })

    console.log('Processed material crates:', materialCrates)

    const newShipment: NewShipmentType = {
      trackingNumber: formData.trackingNumber,
      projectId: project!.id,
    }

    const newReceivedShipment: NewReceivedShipmentType = {
      shipment: newShipment,
      manufacturerId: formData.manufacturer!.id,
      receivedDate: new Date(formData.receivedDate.toISOString()),
      materialCrates,
    }

    console.log('Submitting received shipment:', newReceivedShipment)
    createReceivedShipmentMutation.mutate(newReceivedShipment)
  }

  return (
    <Button
      onClick={handleSubmit(onSubmit)}
      disabled={createReceivedShipmentMutation.isPending || !isValid}
      loading={createReceivedShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
