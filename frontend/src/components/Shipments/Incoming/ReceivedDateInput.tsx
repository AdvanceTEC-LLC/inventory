import { useReceivedShipment } from './ReceivedShipmentContext'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const ReceivedDateInput = () => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const handleChange = (date: Dayjs | null) => {
    const receivedDate = date?.isValid()
      ? new Date(date.toISOString())
      : undefined

    setReceivedShipment({
      ...receivedShipment,
      receivedDate,
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={'Received Date'}
        value={
          receivedShipment?.receivedDate
            ? dayjs(receivedShipment.receivedDate)
            : null
        }
        onChange={handleChange}
        slotProps={{
          textField: {
            error: false, // Prevents red border
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default ReceivedDateInput
