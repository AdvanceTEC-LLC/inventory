import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { useManufacturers } from '../../hooks/useManufacturersHook'
import { ManufacturerType } from './types'

const ManufacturerSelector = () => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()
  const { data: manufacturers = [] } = useManufacturers()

  const handleChange = (e: SelectChangeEvent<string>) => {
    const selectedManufacturer = manufacturers.find(
      (manufacturer: ManufacturerType) => manufacturer.name === e.target.value
    )

    setReceivedShipment({
      ...receivedShipment,
      manufacturer: selectedManufacturer,
    })
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="manufactuer-label">Manufacturer</InputLabel>
      <Select
        labelId="manufactuer-label"
        label="Manufacturer"
        value={receivedShipment?.manufacturer?.name ?? ''}
        onChange={handleChange}
      >
        {manufacturers.map((manufacturer) => (
          <MenuItem key={manufacturer.id} value={manufacturer.name}>
            {manufacturer.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ManufacturerSelector
