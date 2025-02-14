import { useEffect } from 'react'
import IncomingCrate from './IncomingCrate'
import { useShipment } from './ShipmentContext'
import { Button, Divider } from '@mui/material'

const IncomingCrateList = () => {
  const { shipment, setShipment } = useShipment()

  useEffect(() => {
    setShipment({
      ...shipment,
      crates: [
        {
          id: 0,
          stock: [{ id: 0 }],
          open: true,
        },
      ],
    })
  }, [shipment?.type])

  const addCrate = () => {
    const id = (shipment?.crates?.length ?? 0) + 1

    const newCrate = {
      id,
      number: '',
      stock: [{ id: 0 }],
      open: true,
    }

    const crates = [...(shipment?.crates ?? []), newCrate]

    setShipment({
      ...shipment,
      crates,
    })
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        {shipment?.crates?.map((crate, index) => (
          <div className="flex flex-col gap-y-4" key={index}>
            <IncomingCrate crate={crate} />
            <Divider />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_3fr]">
        <Button onClick={addCrate}>Add Crate</Button>
      </div>
    </>
  )
}

export default IncomingCrateList
