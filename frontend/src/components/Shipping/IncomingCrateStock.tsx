import { Button } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { CrateType, StockType } from './types'
import MaterialSelector from './MaterialSelector'
import QuantityInput from './QuantityInput'

interface IncomingCrateStockProps {
  crate: CrateType
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
    <div className="grid grid-cols-[3fr_1fr_1fr] gap-x-4">
      <MaterialSelector crate={crate} stock={stock} />
      <QuantityInput crate={crate} stock={stock} />
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  )
}

export default IncomingCrateStock
