import { TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'
import { CrateType } from './types'

interface CrateNumberInputProps {
  index: number
}

const CrateNumberInput = ({ index }: CrateNumberInputProps) => {
  const { control } = useFormContext<{
    materialCrates: CrateType[]
  }>()

  const {
    field,
    fieldState: { error },
  } = useController({
    name: `materialCrates.${index}.number`,
    control,
    defaultValue: '',
  })

  return (
    <TextField
      variant="standard"
      label="Crate Number"
      value={field.value}
      onChange={field.onChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}

export default CrateNumberInput
