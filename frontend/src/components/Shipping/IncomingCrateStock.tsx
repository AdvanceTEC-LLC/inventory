import { Box, Button, Stack } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { ReceivedCrateType, StockType } from './types'
import MaterialSelector from './MaterialSelector'
import QuantityInput from './QuantityInput'

interface IncomingCrateStockProps {
  crate: ReceivedCrateType
  stock: StockType
}

const IncomingCrateStock = ({ crate, stock }: IncomingCrateStockProps) => {
  const { shipment, setShipment } = useShipment()

  const handleRemove = () => {
    const updatedStock = crate.stock?.filter((s) => s.id !== stock.id)

    const updatedCrate = {
      ...crate,
      stock: updatedStock,
    }

    setShipment({
      ...shipment,
      crates: shipment?.crates?.map((c) =>
        c.id === crate.id ? updatedCrate : c
      ),
    })
  }

  return (
    <Stack
      spacing={2}
      sx={{ width: '100%', alignItems: 'center' }}
      direction="row"
    >
      <Stack
        flex={5}
        spacing={2}
        sx={{ width: '100%' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Box flex={{ xs: 0, md: 3 }}>
          <MaterialSelector crate={crate} stock={stock} />
        </Box>
        <QuantityInput crate={crate} stock={stock} />
      </Stack>
      <Box>
        <Button onClick={handleRemove}>Remove</Button>
      </Box>
    </Stack>
  )
}

export default IncomingCrateStock
