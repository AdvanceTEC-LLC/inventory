import { Autocomplete, TextField } from '@mui/material'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { useManufacturers } from '../../hooks/useManufacturersHook'
import { ManufacturerType } from '../../types/manufacturer'
import { SyntheticEvent } from 'react'

const ManufacturerSelector = () => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()
  const { data: manufacturers = [] } = useManufacturers()

  const sortedManufacturers = [...manufacturers].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const handleChange = (_: SyntheticEvent, value: ManufacturerType | null) => {
    setReceivedShipment({
      ...receivedShipment,
      manufacturer: value ?? undefined,
    })
  }

  return (
    <Autocomplete
      options={sortedManufacturers}
      getOptionLabel={(option) => option.name}
      value={receivedShipment?.manufacturer ?? null}
      onChange={(event, value) => {
        handleChange(event, value)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Manufacturer" />}
    />
  )
}

export default ManufacturerSelector
