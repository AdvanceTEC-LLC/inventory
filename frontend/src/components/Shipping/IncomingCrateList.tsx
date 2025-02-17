import { useEffect } from 'react'
import IncomingCrate from './IncomingCrate'
import { useShipment } from './ShipmentContext'
import { Button, Divider, Stack } from '@mui/material'

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
      <Stack spacing={4}>
        {shipment?.crates?.map((crate, index) => (
          <Stack key={index} spacing={2}>
            <Divider flexItem>Crate {index + 1}</Divider>
            <IncomingCrate crate={crate} />
          </Stack>
        ))}
        <Button variant="outlined" onClick={addCrate}>
          Add Crate
        </Button>
      </Stack>
    </>
  )
}

export default IncomingCrateList
