import { TextField } from '@mui/material'
import { useFormContext, useController } from 'react-hook-form'
import { ReceivedShipmentType } from './types'

const ReceivedTrackingNumberInput = () => {
  const { control } = useFormContext<ReceivedShipmentType>()

  const {
    field,
    fieldState: { error },
  } = useController<ReceivedShipmentType, 'trackingNumber'>({
    name: 'trackingNumber',
    control,
    defaultValue: '',
  })

  return (
    <TextField
      variant="outlined"
      label="Tracking Number"
      value={field.value}
      onChange={field.onChange}
      error={!!error}
      helperText={error?.message}
    />
  )
}

export default ReceivedTrackingNumberInput
