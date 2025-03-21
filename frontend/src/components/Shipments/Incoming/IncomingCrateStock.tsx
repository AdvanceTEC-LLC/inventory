import { Box, Button, Stack } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CrateType } from './types'
import MaterialSelector from './MaterialSelector'
import QuantityInput from './QuantityInput'

interface IncomingCrateStockProps {
  crateIndex: number
  stockIndex: number
}

const IncomingCrateStock = ({
  crateIndex,
  stockIndex,
}: IncomingCrateStockProps) => {
  const { control } = useFormContext<{
    materialCrates: CrateType[]
  }>()

  const { remove } = useFieldArray({
    name: `materialCrates.${crateIndex}.stock`,
    control,
  })

  const handleRemove = () => {
    remove(stockIndex)
  }

  return (
    <Stack
      spacing={2}
      sx={{ width: '100%', alignItems: 'center' }}
      direction="row"
    >
      <Stack
        flex={5}
        spacing={2}
        sx={{ width: '100%' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        <Box flex={{ xs: 0, md: 3 }}>
          <MaterialSelector crateIndex={crateIndex} stockIndex={stockIndex} />
        </Box>
        <QuantityInput crateIndex={crateIndex} stockIndex={stockIndex} />
      </Stack>
      <Box>
        <Button onClick={handleRemove}>Remove</Button>
      </Box>
    </Stack>
  )
}

export default IncomingCrateStock
