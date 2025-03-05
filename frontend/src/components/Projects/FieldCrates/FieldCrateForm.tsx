import { FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useState, ChangeEvent } from 'react'

const FieldCrateForm = () => {
  const [number, setNumber] = useState<string>('')

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value.trim()

    setNumber(number)
  }

  return (
    <Stack spacing={4}>
      <FormControl fullWidth>
        <TextField
          id="assembly-name"
          label="Field Crate Number"
          variant="standard"
          fullWidth
          value={number}
          onChange={handleNumberChange}
        />
      </FormControl>
    </Stack>
  )
}

export default FieldCrateForm
