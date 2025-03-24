import IncomingCrate from './IncomingCrate'
import { Button, Stack } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'

const IncomingCrateList = () => {
  const { control } = useFormContext()

  const { fields, append } = useFieldArray({
    control,
    name: 'materialCrates',
  })

  const addCrate = () => {
    append({
      number: '',
      stock: [{ material: null, quantity: null }],
      open: true,
    })
  }

  return (
    <Stack spacing={4}>
      {fields.map((field, index) => (
        <IncomingCrate key={field.id} index={index} />
      ))}
      <Button variant="outlined" onClick={addCrate}>
        Add Crate
      </Button>
    </Stack>
  )
}

export default IncomingCrateList
