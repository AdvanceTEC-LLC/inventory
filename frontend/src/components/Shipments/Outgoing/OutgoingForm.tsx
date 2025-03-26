import { Stack } from '@mui/material'
import { Subtext } from '../../ATEC UI/Text'
import { useProject } from '../../Projects/Projects/ProjectContext'
import OutgoingCratesTable from './OutgoingCratesTable'
import ConfirmButton from './ConfirmButton'
import { FormProvider, useForm } from 'react-hook-form'
import { SentShipmentType } from './types'
import { outgoingShipmentValidationSchema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import StringInput from '../../Inputs/StringInput'
import DateInput from '../../Inputs/DateInput'

const OutgoingForm = () => {
  const { project } = useProject()

  const methods = useForm<SentShipmentType>({
    resolver: yupResolver(outgoingShipmentValidationSchema),
    mode: 'onTouched',
    defaultValues: {
      transmittal: '',
      sendDate: dayjs(),
      assemblyCrates: [],
    },
  })

  if (!project) return <Subtext text="Select a project" />

  return (
    <FormProvider {...methods}>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <StringInput label="Transmittal" required />
          <DateInput label="Send Date" required />
          <OutgoingCratesTable />
        </Stack>
        <ConfirmButton />
      </Stack>
    </FormProvider>
  )
}

export default OutgoingForm
