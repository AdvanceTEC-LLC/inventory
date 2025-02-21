import { Button, Stack } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { ReceivedCrateType } from './types'
import IncomingCrateStock from './IncomingCrateStock'

interface IncomingCrateStockListProps {
  crate: ReceivedCrateType
}

const IncomingCrateStockList = ({ crate }: IncomingCrateStockListProps) => {
  const { shipment, setShipment } = useShipment()

  const addItem = () => {
    const id = (crate?.stock?.length ?? 0) + 1

    const newStock = {
      id,
    }

    const stock = [...(crate?.stock || []), newStock]

    const updatedCrate = {
      ...crate,
      stock,
    }

    const crates = shipment?.crates?.map((c) =>
      c.id === crate?.id ? updatedCrate : c
    )

    setShipment({
      ...shipment,
      crates,
    })
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {crate?.stock?.map((stock, index) => (
        <IncomingCrateStock key={index} crate={crate} stock={stock} />
      ))}
      <Button fullWidth onClick={addItem}>
        Add Item
      </Button>
    </Stack>
  )
}

export default IncomingCrateStockList
