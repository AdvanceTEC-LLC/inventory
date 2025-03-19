import { TextField } from '@mui/material'
import { useShipment } from './ShipmentContext'
import { ChangeEvent } from 'react'

const TrackingNumberInput = () => {
  const { shipment, setShipment } = useShipment()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const trackingNumber = event.target.value

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
