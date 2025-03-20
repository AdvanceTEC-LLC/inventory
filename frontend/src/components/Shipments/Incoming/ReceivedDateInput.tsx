import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useController, useFormContext } from 'react-hook-form'
import { ReceivedShipmentType } from './types'

const ReceivedDateInput = () => {
  const { control } = useFormContext<ReceivedShipmentType>()

  const {
    field,
    fieldState: { error },
  } = useController<ReceivedShipmentType, 'receivedDate'>({
    name: 'receivedDate',
    control,
    defaultValue: dayjs(),
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Received Date"
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

export default ReceivedDateInput
