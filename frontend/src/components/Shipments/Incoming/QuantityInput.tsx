import { InputAdornment, TextField } from '@mui/material'
import { CrateType } from './types'
import { useFormContext, useController } from 'react-hook-form'

interface QuantityInputProps {
  crateIndex: number
  stockIndex: number
}

const QuantityInput = ({ crateIndex, stockIndex }: QuantityInputProps) => {
  const { control, watch } = useFormContext<{
    materialCrates: CrateType[]
  }>()

  const material = watch(
    `materialCrates.${crateIndex}.stock.${stockIndex}.material`
  )

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `materialCrates.${crateIndex}.stock.${stockIndex}.quantity`,
    control,
    defaultValue: null,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const parsedQuantity = value === '' ? null : parseInt(value, 10)
    field.onChange(parsedQuantity)
  }

  return (
    <TextField
      variant="standard"
      label="Quantity"
      error={!!error}
      helperText={error?.message}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {material?.unit ?? 'ea'}
            </InputAdornment>
          ),
        },
      }}
      value={field.value ?? ''}
      onChange={handleChange}
    />
  )
}

export default QuantityInput
