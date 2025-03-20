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
import { useProject } from '../../Projects/Projects/ProjectContext'
import { NewMaterialCrateType } from '../../../types/materialCrate'
import { NewStockType } from '../../../types/stock'
import { useFormContext } from 'react-hook-form'
import { ReceivedShipmentType } from './types'

const ConfirmButton = () => {
  const { receivedShipment } = useReceivedShipment()
  const { project } = useProject()

  const { handleSubmit } = useFormContext<ReceivedShipmentType>()

  const queryClient = useQueryClient()
  const dispatch: AppDispatch = useDispatch()

  const createReceivedShipmentMutation = useMutation({
    mutationFn: (receivedShipment: NewReceivedShipmentType) =>
      receivedShipmentsService.deepCreate(receivedShipment),
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

  const onSubmit = (formData: ReceivedShipmentType) => {
    if (!project || !receivedShipment?.materialCrates?.length) return

    const materialCrates: NewMaterialCrateType[] =
      receivedShipment.materialCrates
        .filter((materialCrate) => materialCrate.number)
        .map((materialCrate) => {
          const crate: NewCrateType = {
            number: materialCrate.number!,
            projectId: project.id,
          }

          const stock: NewStockType[] = materialCrate
            .stock!.filter(({ material, quantity }) => material && quantity)
            .map(({ material, quantity }) => ({
              materialId: material!.id,
              projectId: project.id,
              quantity: quantity!,
            }))

          return {
            crate,
            stock,
            opened: false,
          }
        })

    const newShipment: NewShipmentType = {
      trackingNumber: formData.trackingNumber,
      projectId: project.id,
    }

    const newReceivedShipment: NewReceivedShipmentType = {
      shipment: newShipment,
      manufacturerId: formData.manufacturer.id,
      receivedDate: new Date(formData.receivedDate.toISOString()),
      materialCrates,
    }

    createReceivedShipmentMutation.mutate(newReceivedShipment)
  }

  return (
    <Button
      onClick={() => {
        void handleSubmit(onSubmit)
      }}
      loading={createReceivedShipmentMutation.isPending ? true : null}
    >
      Confirm Shipment
    </Button>
  )
}

export default ConfirmButton
