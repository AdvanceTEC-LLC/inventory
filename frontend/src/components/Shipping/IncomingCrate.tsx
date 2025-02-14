import { Button } from '@mui/material'
import CrateNumberInput from './CrateNumberInput'
import { useShipment } from './ShipmentContext'
import { CrateType } from './types'
import IncomingCrateStockList from './IncomingCrateStockList'

interface IncomingCrateProps {
  crate: CrateType
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
    <div className="grid grid-cols-[1fr_3fr] gap-x-4">
      <div className="flex flex-col gap-y-2">
        <CrateNumberInput crate={crate} />
        <div className="flex gap-x-4">
          <Button onClick={toggleOpen}>{crate.open ? 'close' : 'open'}</Button>
          <Button onClick={handleRemove}>Remove</Button>
        </div>
      </div>
      {crate.open && <IncomingCrateStockList crate={crate} />}
    </div>
  )
}

export default IncomingCrate
