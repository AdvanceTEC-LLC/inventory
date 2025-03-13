import { TextField } from '@mui/material'
import { ReceivedMaterialCrateType } from '../types'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { ChangeEvent } from 'react'

interface CrateNumberInputProps {
  crate: ReceivedMaterialCrateType
}

const CrateNumberInput = ({ crate }: CrateNumberInputProps) => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedCrate = { ...crate, number: event.target.value }

    const materialCrates = receivedShipment?.materialCrates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setReceivedShipment({
      ...receivedShipment,
      materialCrates,
    })
  }

  return (
    <TextField
      variant="standard"
      label="Crate Number"
      value={crate.number ?? ''}
      onChange={handleChange}
    />
  )
}

export default CrateNumberInput
