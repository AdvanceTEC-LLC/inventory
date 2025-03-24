import { Button, Stack } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CrateType } from './types'
import IncomingCrateStock from './IncomingCrateStock'

interface IncomingCrateStockListProps {
  index: number
}

const IncomingCrateStockList = ({ index }: IncomingCrateStockListProps) => {
  const { control } = useFormContext<{
    materialCrates: CrateType[]
  }>()

  const { fields, append } = useFieldArray({
    name: `materialCrates.${index}.stock`,
    control,
  })

  const addItem = () => {
    append({
      material: null,
      quantity: null,
    })
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {fields.map((field, stockIndex) => (
        <IncomingCrateStock
          key={field.id}
          crateIndex={index}
          stockIndex={stockIndex}
        />
      ))}
      <Button fullWidth onClick={addItem}>
        Add Item
      </Button>
    </Stack>
  )
}

export default IncomingCrateStockList
