import { Button, Stack } from '@mui/material'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { ReceivedMaterialCrateType } from '../types'
import IncomingCrateStock from './IncomingCrateStock'

interface IncomingCrateStockListProps {
  crate: ReceivedMaterialCrateType
}

const IncomingCrateStockList = ({ crate }: IncomingCrateStockListProps) => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const addItem = () => {
    const id = (crate.stock?.length ?? 0) + 1

    const newStock = {
      id,
    }

    const stock = [...(crate.stock ?? []), newStock]

    const updatedCrate = {
      ...crate,
      stock,
    }

    const materialCrates = receivedShipment?.materialCrates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {crate.stock?.map((stock, index) => (
        <IncomingCrateStock key={index} crate={crate} stock={stock} />
      ))}
      <Button fullWidth onClick={addItem}>
        Add Item
      </Button>
    </Stack>
  )
}

export default IncomingCrateStockList
