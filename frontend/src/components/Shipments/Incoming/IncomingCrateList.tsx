import { useEffect } from 'react'
import IncomingCrate from './IncomingCrate'
import { Button, Divider, Stack } from '@mui/material'
import { useFormContext, useFieldArray } from 'react-hook-form'

const IncomingCrateList = () => {
  const { control } = useFormContext()

  const { fields, append } = useFieldArray({
    control,
    name: 'materialCrates',
  })

  useEffect(() => {
    // Initialize with first crate if none exists
    if (fields.length === 0) {
      addCrate()
    }
  }, [append, fields.length])

  const addCrate = () => {
    append({
      number: '',
      stock: [{ material: null, quantity: null }],
      open: true,
    })
  }

  return (
    <>
      <Stack spacing={4}>
        {fields.map((field, index) => (
          <Stack key={field.id} spacing={2}>
            <Divider flexItem>Crate {index + 1}</Divider>
            <IncomingCrate index={index} />
          </Stack>
        ))}
        <Button variant="outlined" onClick={addCrate}>
          Add Crate
        </Button>
      </Stack>
    </>
  )
}

export default IncomingCrateList
