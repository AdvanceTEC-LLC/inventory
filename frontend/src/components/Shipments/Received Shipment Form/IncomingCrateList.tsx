import { useEffect } from 'react'
import IncomingCrate from './IncomingCrate'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { Button, Divider, Stack } from '@mui/material'

const IncomingCrateList = () => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  useEffect(() => {
    setReceivedShipment({
      ...receivedShipment,
      materialCrates: [
        {
          id: 0,
          stock: [{ id: 0 }],
          open: true,
        },
      ],
    })
  }, [])

  const addCrate = () => {
    const id = (receivedShipment?.materialCrates?.length ?? 0) + 1

    const newCrate = {
      id,
      number: '',
      stock: [{ id: 0 }],
      open: true,
    }

    const materialCrates = [
      ...(receivedShipment?.materialCrates ?? []),
      newCrate,
    ]

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  return (
    <>
      <Stack spacing={4}>
        {receivedShipment?.materialCrates?.map((crate, index) => (
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
