import { Button, Divider, Stack } from '@mui/material'
import CrateNumberInput from './CrateNumberInput'
import IncomingCrateStockList from './IncomingCrateStockList'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CrateType } from './types'

interface IncomingCrateProps {
  index: number
}

const IncomingCrate = ({ index }: IncomingCrateProps) => {
  const { watch } = useFormContext<{
    materialCrates: CrateType[]
  }>()
  const { remove, update } = useFieldArray({
    name: 'materialCrates',
  })

  const crate = watch(`materialCrates.${index}`)

  const toggleOpen = () => {
    update(index, {
      ...crate,
      open: !crate.open,
    })
  }

  const handleRemove = () => {
    remove(index)
  }

  return (
    <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
      <Stack spacing={2} flex={1}>
        <CrateNumberInput index={index} />

        <Stack spacing={2} direction="row">
          <Button fullWidth onClick={handleRemove}>
            Remove
          </Button>
          <Button fullWidth onClick={toggleOpen}>
            {crate.open ? 'close' : 'open'}
          </Button>
        </Stack>
      </Stack>

      <Divider orientation="vertical" flexItem />
      {crate.open && <IncomingCrateStockList index={index} />}
    </Stack>
  )
}

export default IncomingCrate
