import { Stack } from '@mui/material'
import TrackingNumberInput from '../TrackingNumberInput'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { Subtext } from '../../ATEC UI/Text'
import IncomingCrateList from './IncomingCrateList'
import ManufacturerSelector from './ManufacturerSelector'
import { ReceivedShipmentProvider } from './ReceivedShipmentContext'
import ConfirmButton from './ConfirmButton'

const IncomingForm = () => {
  const { project } = useProject()

  if (!project) return <Subtext text="Select a project" />

  return (
    <ReceivedShipmentProvider>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <TrackingNumberInput />
          <ManufacturerSelector />
          <IncomingCrateList />
        </Stack>
        <ConfirmButton />
      </Stack>
    </ReceivedShipmentProvider>
  )
}

export default IncomingForm
