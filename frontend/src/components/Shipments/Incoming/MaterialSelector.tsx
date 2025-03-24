import { Autocomplete, TextField } from '@mui/material'
import { useMaterials } from '../../../hooks/useMaterialsHook'
import { CrateType } from './types'
import { useFormContext, useController } from 'react-hook-form'
import { MaterialType } from '../../../types/material'
import { ManufacturerType } from '../../../types/manufacturer'

interface MaterialSelectorProps {
  crateIndex: number
  stockIndex: number
}

const MaterialSelector = ({
  crateIndex,
  stockIndex,
}: MaterialSelectorProps) => {
  const { control, watch } = useFormContext<{
    materialCrates: CrateType[]
    manufacturer: ManufacturerType | null
  }>()

  const { data: materials = [] } = useMaterials()

  const manufacturer = watch('manufacturer')

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `materialCrates.${crateIndex}.stock.${stockIndex}.material`,
    control,
    defaultValue: null,
  })

  const filteredMaterials = manufacturer
    ? materials.filter(
        (material) => material.manufacturer.id === manufacturer.id
      )
    : []

  const sortedMaterials = [...filteredMaterials].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <Autocomplete
      options={sortedMaterials}
      getOptionLabel={(option) => option.name}
      value={field.value}
      onChange={(_, value) => field.onChange(value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Material"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
}

export default MaterialSelector
