import { TextField } from '@mui/material'
import {
  useFormContext,
  useController,
  FieldValues,
  Path,
} from 'react-hook-form'

interface StringInputProps<TFieldValues extends FieldValues> {
  label: string
  name?: Path<TFieldValues>
  required?: true
}

const StringInput = <TFieldValues extends FieldValues>({
  label,
  name,
  required,
}: StringInputProps<TFieldValues>) => {
  const { control } = useFormContext<TFieldValues>()

  const resolvedName =
    name ??
    (label
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) =>
        chr.toUpperCase()
      ) as Path<TFieldValues>)

  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name: resolvedName,
    control,
  })

  return (
    <TextField
      required={required ?? false}
      fullWidth
      variant="outlined"
      label={label}
      value={field.value ?? ''}
      onChange={field.onChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}

export default StringInput
