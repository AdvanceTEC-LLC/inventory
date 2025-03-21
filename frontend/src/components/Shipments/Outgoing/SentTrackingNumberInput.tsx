import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { SentShipmentType } from './types'

const SentTrackingNumberInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SentShipmentType>()

  return (
    <TextField
      variant="outlined"
      label="Tracking Number"
      {...register('trackingNumber')}
      error={!!errors.trackingNumber}
      helperText={errors.trackingNumber?.message}
    />
  )
}

export default SentTrackingNumberInput
