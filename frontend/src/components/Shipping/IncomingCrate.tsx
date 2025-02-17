import { Button, Divider, Stack } from '@mui/material'
import CrateNumberInput from './CrateNumberInput'
import { useShipment } from './ShipmentContext'
import { ReceivedCrateType } from './types'
import IncomingCrateStockList from './IncomingCrateStockList'

interface IncomingCrateProps {
  crate: ReceivedCrateType
}

const IncomingCrate = ({ crate }: IncomingCrateProps) => {
  const { shipment, setShipment } = useShipment()

  const toggleOpen = () => {
    const updatedCrate = { ...crate, open: !crate.open }

    const crates = shipment?.crates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setShipment({
      ...shipment,
      crates,
    })
  }

  const handleRemove = () => {
    const crates = shipment?.crates?.filter((c) => c.id !== crate.id)

    setShipment({
      ...shipment,
      crates,
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
