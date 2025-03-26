import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from 'react-hook-form'
import { Dayjs } from 'dayjs'

interface DateInputProps<TFieldValues extends FieldValues> {
  label: string
  name?: Path<TFieldValues>
  required?: true
}

const DateInput = <TFieldValues extends FieldValues>({
  label,
  name,
  required,
}: DateInputProps<TFieldValues>) => {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={field.value}
        onChange={(date: Dayjs | null) => {
          field.onChange(date?.isValid() ? date : null)
        }}
        slotProps={{
          textField: {
            required: required ?? false,
            error: !!error,
            helperText: error?.message,
          },
        }}
      />
    </LocalizationProvider>
  )
}

export default DateInput
