import { Stack } from '@mui/material'
import { Subtext } from '../../ATEC UI/Text'
import { useProject } from '../../Projects/Projects/ProjectContext'
import TrackingNumberInput from './SentTrackingNumberInput'
import OutgoingCratesTable from './OutgoingCratesTable'
import SendDateInput from './SendDateInput'
import ConfirmButton from './ConfirmButton'
import { FormProvider, useForm } from 'react-hook-form'
import { SentShipmentType } from './types'
import { outgoingShipmentValidationSchema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

const OutgoingForm = () => {
  const { project } = useProject()

  const methods = useForm<SentShipmentType>({
    resolver: yupResolver(outgoingShipmentValidationSchema),
    mode: 'onTouched',
    defaultValues: {
      trackingNumber: '',
      sendDate: dayjs(),
      assemblyCrates: [],
    },
  })

  if (!project) return <Subtext text="Select a project" />

  return (
    <FormProvider {...methods}>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <TrackingNumberInput />
          <SendDateInput />
          <OutgoingCratesTable />
        </Stack>
        <ConfirmButton />
      </Stack>
    </FormProvider>
  )
}

export default OutgoingForm
