import { TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'
import { ReceivedShipmentType } from './types'

const TrackingInputs = () => {
  return (
    <>
      <StringInput label="Order Acknowledgement" />
      <StringInput label="Purchase Order" />
      <StringInput label="Sales Order" />
      <StringInput label="Tracking Number" />
    </>
  )
}

export default TrackingInputs

interface StringInputProps {
  label: string
}

const StringInput = ({ label }: StringInputProps) => {
  const { control } = useFormContext<ReceivedShipmentType>()

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) =>
        chr.toUpperCase()
      )
  }

  const name = toCamelCase(label) as keyof ReceivedShipmentType

  const {
    field,
    fieldState: { error },
  } = useController<ReceivedShipmentType, typeof name>({
    name,
    control,
  })

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      value={field.value}
      onChange={field.onChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}
