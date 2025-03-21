import { Stack } from '@mui/material'
import { Subtext } from '../../ATEC UI/Text'

import { useProject } from '../../Projects/Projects/ProjectContext'

import ReceivedTrackingNumberInput from './ReceivedTrackingNumberInput'
import ManufacturerSelector from './ManufacturerSelector'
import ReceivedDateInput from './ReceivedDateInput'
import IncomingCrateList from './IncomingCrateList'
import ConfirmButton from './ConfirmButton'

import { FormProvider, useForm } from 'react-hook-form'
import { ReceivedShipmentType } from './types'
import { receivedShipmentValidationSchema } from './validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'

const IncomingForm = () => {
  const { project } = useProject()

  const methods = useForm<ReceivedShipmentType>({
    resolver: yupResolver(receivedShipmentValidationSchema),
    mode: 'onChange',
  })

  if (!project) return <Subtext text="Select a project" />

  return (
    <FormProvider {...methods}>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <ReceivedTrackingNumberInput />
          <ManufacturerSelector />
          <ReceivedDateInput />
          <IncomingCrateList />
        </Stack>
        <ConfirmButton />
      </Stack>
    </FormProvider>
  )
}

export default IncomingForm
