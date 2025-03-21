import { Autocomplete, TextField } from '@mui/material'
import { useManufacturers } from '../../../hooks/useManufacturersHook'
import { useFormContext, useController } from 'react-hook-form'
import { ReceivedShipmentType } from './types'

const ManufacturerSelector = () => {
  const { data: manufacturers = [] } = useManufacturers()

  const sortedManufacturers = [...manufacturers].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const { control } = useFormContext<ReceivedShipmentType>()

  const {
    field,
    fieldState: { error },
  } = useController<ReceivedShipmentType, 'manufacturer'>({
    name: 'manufacturer',
    control,
    defaultValue: null,
  })

  return (
    <Autocomplete
      options={sortedManufacturers}
      getOptionLabel={(option) => option.name}
      value={field.value ?? null}
      onChange={(_, newValue) => {
        field.onChange(newValue)
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Manufacturer"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}

export default ManufacturerSelector
