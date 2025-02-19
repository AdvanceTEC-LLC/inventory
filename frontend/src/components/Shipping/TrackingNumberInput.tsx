import { TextField } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { ChangeEvent } from 'react'

const TrackingNumberInput = () => {
  const { shipment, setShipment } = useShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const trackingNumber = value === '' ? undefined : parseInt(value, 10)

    setShipment({
      ...shipment,
      trackingNumber,
    })
  }

  return (
    <TextField
      variant="outlined"
      label="Tracking Number"
      value={shipment?.trackingNumber ?? ''}
      onChange={handleChange}
    />
  )
}

export default TrackingNumberInput
