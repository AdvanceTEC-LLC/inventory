import { Stack } from '@mui/material'
import { Subtext } from '../../ATEC UI/Text'
import { useProject } from '../../Projects/Projects/ProjectContext'
import ManufacturerSelector from './ManufacturerSelector'
import IncomingCrateList from './IncomingCrateList'
import ConfirmButton from './ConfirmButton'
import { FormProvider, useForm } from 'react-hook-form'
import { ReceivedShipmentType } from './types'
import { receivedShipmentValidationSchema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import TrackingInputs from './TrackingOptions'
import DateInput from '../../Inputs/DateInput'

const IncomingForm = () => {
  const { project } = useProject()

  const methods = useForm<ReceivedShipmentType>({
    resolver: yupResolver(receivedShipmentValidationSchema),
    mode: 'onTouched',
    defaultValues: {
      trackingNumber: '',
      purchaseOrder: '',
      orderAcknowledgement: '',
      salesOrder: '',
      manufacturer: null,
      receivedDate: dayjs(),
      materialCrates: [
        {
          number: '',
          stock: [{ material: null, quantity: null }],
          open: true,
        },
      ],
    },
  })

  if (!project) return <Subtext text="Select a project" />

  return (
    <FormProvider {...methods}>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <TrackingInputs />
          <ManufacturerSelector />
          <DateInput label="Received Date" required />
          <IncomingCrateList />
        </Stack>
        <ConfirmButton />
      </Stack>
    </FormProvider>
  )
}

export default IncomingForm
