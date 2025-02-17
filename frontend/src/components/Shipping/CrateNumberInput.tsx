import { TextField } from '@mui/material'
import { ReceivedCrateType } from './types'
import { useShipment } from './ShipmentContext'
import { ChangeEvent } from 'react'

interface CrateNumberInputProps {
  crate: ReceivedCrateType
}

const CrateNumberInput = ({ crate }: CrateNumberInputProps) => {
  const { shipment, setShipment } = useShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCrate = { ...crate, number: event.target.value }

    setShipment({
      ...shipment,
      crates: shipment?.crates?.map((c) =>
        c.id === crate.id ? updatedCrate : c
      ),
    })
  }

  return (
    <TextField
      variant="standard"
      label="Crate Number"
      value={crate?.number ?? ''}
      onChange={handleChange}
    />
  )
}

export default CrateNumberInput
