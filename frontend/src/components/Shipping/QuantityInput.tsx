import { InputAdornment, TextField } from '@mui/material'
import { ReceivedCrateType, StockType } from './types'
import { useShipment } from './ShipmentContext'
import { ChangeEvent } from 'react'

interface QuantityInputProps {
  crate: ReceivedCrateType
  stock: StockType
}

const QuantityInput = ({ crate, stock }: QuantityInputProps) => {
  const { shipment, setShipment } = useShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const quantity = value === '' ? undefined : parseInt(value, 10)

    const updatedStock = { ...stock, quantity }

    const updatedCrate = {
      ...crate,
      stock: crate.stock?.map((s) => (s.id === stock.id ? updatedStock : s)),
    }

    const crates = shipment?.crates?.map((c) =>
      c.id === crate.id ? updatedCrate : c
    )

    setShipment({
      ...shipment,
      crates,
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
                {stock?.material?.unit ?? 'ea'}
              </InputAdornment>
            ),
          },
        }}
        value={stock?.quantity ?? ''}
        onChange={handleChange}
      />
    </>
  )
}

export default QuantityInput
