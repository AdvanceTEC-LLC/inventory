import { SentShipmentProvider } from './SentShipmentContext'
import ConfirmButton from './ConfirmButton'
import { Stack } from '@mui/system'
import TrackingNumberInput from '../TrackingNumberInput'
import OutgoingCratesTable from './OutgoingCratesTable'
import { useProject } from '../../Projects/Projects/ProjectContext'
import { Subtext } from '../../ATEC UI/Text'
import SendDateInput from './SendDateInput'

const OutgoingForm = () => {
  const { project } = useProject()

  if (!project) return <Subtext text="Select a project" />

  return (
    <SentShipmentProvider>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <TrackingNumberInput />
          <SendDateInput />
          <OutgoingCratesTable />
        </Stack>
        <ConfirmButton />
      </Stack>
    </SentShipmentProvider>
  )
}

export default OutgoingForm
