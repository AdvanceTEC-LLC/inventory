import { Button, Divider, Stack } from '@mui/material'
import CrateNumberInput from './CrateNumberInput'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { ReceivedMaterialCrateType } from '../types'
import IncomingCrateStockList from './IncomingCrateStockList'

interface IncomingCrateProps {
  crate: ReceivedMaterialCrateType
}

const IncomingCrate = ({ crate }: IncomingCrateProps) => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const toggleOpen = () => {
    const updatedCrate = { ...crate, open: !crate.open }

    const materialCrates = receivedShipment?.materialCrates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  const handleRemove = () => {
    const materialCrates = receivedShipment?.materialCrates?.filter(
      (c) => c.id !== crate.id
    )

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  return (
    <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
      <Stack spacing={2} flex={1}>
        <CrateNumberInput crate={crate} />

        <Stack spacing={2} direction="row">
          <Button fullWidth onClick={handleRemove}>
            Remove
          </Button>
          <Button fullWidth onClick={toggleOpen}>
            {crate.open ? 'close' : 'open'}
          </Button>
        </Stack>
      </Stack>

      <Divider orientation="vertical" flexItem />
      {crate.open && <IncomingCrateStockList crate={crate} />}
    </Stack>
  )
}

export default IncomingCrate
