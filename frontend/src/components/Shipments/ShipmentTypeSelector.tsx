import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useShipment } from './ShipmentContext'

interface ShipmentType {
  value: string
  label: string
}

const shipmentTypes: ShipmentType[] = [
  { value: 'incoming', label: 'Incoming to Warehouse' },
  { value: 'outgoing', label: 'Outgoing to Project' },
]

const ShipmentTypeSelector = () => {
  const { shipment, setShipment } = useShipment()

  const handleChange = (e: SelectChangeEvent) => {
    setShipment({
      ...shipment,
      type: e.target.value,
    })
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="shipment-type-label">Shipment Type</InputLabel>
      <Select
        labelId="shipment-type-label"
        value={shipment?.type}
        label="Shipment Type"
        onChange={handleChange}
      >
        {shipmentTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ShipmentTypeSelector
