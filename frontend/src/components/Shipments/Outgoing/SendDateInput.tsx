import { useSentShipment } from './SentShipmentContext'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const SendDateInput = () => {
  const { sentShipment, setSentShipment } = useSentShipment()

  const handleChange = (date: Dayjs | null) => {
    const sendDate = date?.isValid() ? new Date(date.toISOString()) : undefined

    setSentShipment({
      ...sentShipment,
      sendDate,
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={'Send Date'}
        value={sentShipment?.sendDate ? dayjs(sentShipment.sendDate) : null}
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

export default SendDateInput
