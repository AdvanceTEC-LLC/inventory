/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button } from '@mui/material'
import receivedShipmentsService from '../../../services/receivedShipmentsService'
import { NewCrateType } from '../../../types/crate'
import { NewReceivedShipmentType } from '../../../types/receivedShipment'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { NewMaterialCrateType } from '../../../types/materialCrate'
import { NewStockType } from '../../../types/stock'
import { useFormContext } from 'react-hook-form'
import { ReceivedShipmentType } from './types'
import { useMutationWithNotifications } from '../../../hooks/useMutationWithNotifications'

const ConfirmButton = () => {
  const { project } = useProject()

  const { handleSubmit, reset } = useFormContext<ReceivedShipmentType>()

  const createReceivedShipmentMutation = useMutationWithNotifications<
    unknown,
    NewReceivedShipmentType
  >({
    mutationFn: receivedShipmentsService.deepCreate,
    onSuccess: () => {
      reset()
    },
  })

  const onSubmit = (formData: ReceivedShipmentType) => {
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

    const newReceivedShipment: NewReceivedShipmentType = {
      projectId: project!.id,
      trackingNumber: formData.trackingNumber,
      purchaseOrder: formData.purchaseOrder,
      salesOrder: formData.salesOrder,
      orderAcknowledgement: formData.orderAcknowledgement,
      manufacturerId: formData.manufacturer!.id,
      receivedDate: new Date(formData.receivedDate.toISOString()),
      materialCrates,
    }

    createReceivedShipmentMutation.mutate(newReceivedShipment)
  }

  return (
    <Button
      onClick={handleSubmit(onSubmit)}
      disabled={createReceivedShipmentMutation.isPending}
      loading={createReceivedShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
