import { FormControl, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { ChangeEvent } from 'react'
import { useAssemblyCrate } from './AssemblyCrateContext'

const AssemblyCrateForm = () => {
  const { assemblyCrate, setAssemblyCrate } = useAssemblyCrate()

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value.trim()

    if (!assemblyCrate) return

    setAssemblyCrate({
      ...assemblyCrate,
      crate: {
        ...assemblyCrate.crate,
        number,
      },
    })
  }

  return (
    <Stack spacing={4}>
      <FormControl fullWidth>
        <TextField
          id="assembly-name"
          label="Assembly Crate Number"
          variant="standard"
          fullWidth
          value={assemblyCrate?.crate.number ?? ''}
          onChange={handleNumberChange}
        />
      </FormControl>
    </Stack>
  )
}

export default AssemblyCrateForm
