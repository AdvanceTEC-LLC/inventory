import { InputAdornment, TextField } from '@mui/material'
import { ReceivedMaterialCrateType, StockType } from '../types'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { ChangeEvent } from 'react'

interface QuantityInputProps {
  crate: ReceivedMaterialCrateType
  stock: StockType
}

const QuantityInput = ({ crate, stock }: QuantityInputProps) => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const quantity = value === '' ? undefined : parseInt(value, 10)

    const updatedStock = { ...stock, quantity }

    const updatedCrate = {
      ...crate,
      stock: crate.stock?.map((s) => (s.id === stock.id ? updatedStock : s)),
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
    <>
      <TextField
        variant="standard"
        label="Quanitity"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {stock.material?.unit ?? 'ea'}
              </InputAdornment>
            ),
          },
        }}
        value={stock.quantity ?? ''}
        onChange={handleChange}
      />
    </>
  )
}

export default QuantityInput
