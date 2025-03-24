import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useController, useFormContext } from 'react-hook-form'
import { SentShipmentType } from './types'

const SendDateInput = () => {
  const { control } = useFormContext<SentShipmentType>()

  const {
    field,
    fieldState: { error },
  } = useController<SentShipmentType, 'sendDate'>({
    name: 'sendDate',
    control,
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Send Date"
        value={field.value}
        onChange={(date) => {
          field.onChange(date?.isValid() ? date : null)
        }}
        slotProps={{
          textField: {
            error: !!error,
            helperText: error?.message,
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default SendDateInput
