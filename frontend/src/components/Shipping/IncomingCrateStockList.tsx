import { Button } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { CrateType } from './types'
import IncomingCrateStock from './IncomingCrateStock'

interface IncomingCrateStockListProps {
  crate: CrateType
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
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-2">
        {crate?.stock?.map((stock, index) => (
          <IncomingCrateStock key={index} crate={crate} stock={stock} />
        ))}
      </div>
      <Button onClick={addItem}>Add Item</Button>
    </div>
  )
}

export default IncomingCrateStockList
