import StagingAreaSelector from './StagingAreaSelector'
import { SentShipmentProvider } from './SentShipmentContext'
import ConfirmButton from './ConfirmButton'
import { Stack } from '@mui/system'
import TrackingNumberInput from '../TrackingNumberInput'

const OutgoingForm = () => {
  return (
    <SentShipmentProvider>
      <Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
        <Stack spacing={2}>
          <TrackingNumberInput />
          <StagingAreaSelector />
        </Stack>
        <ConfirmButton />
      </Stack>
    </SentShipmentProvider>
  )
}

export default OutgoingForm
