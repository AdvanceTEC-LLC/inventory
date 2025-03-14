import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useReceivedShipment } from './ReceivedShipmentContext'
import { Dayjs } from 'dayjs'

const ReceivedDateInput = () => {
  const { receivedShipment, setReceivedShipment } = useReceivedShipment()

  const handleChange = (date: Dayjs | null) => {
    setReceivedShipment({
      ...receivedShipment,
      receivedDate: date ?? undefined,
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Received Date"
        value={receivedShipment?.receivedDate}
        onChange={handleChange}
      />
    </LocalizationProvider>
  )
}

export default ReceivedDateInput
