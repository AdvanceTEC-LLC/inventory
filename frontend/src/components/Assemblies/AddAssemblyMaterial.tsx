import { Stack, Box, Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import MaterialSelector from './MaterialSelector'
import QuantityInput from './QuantityInput'
import { BillOfMaterialType } from './types'

interface AddAssemblyMaterialProps {
  billOfMaterials: BillOfMaterialType[]
  setBillOfMaterials: Dispatch<SetStateAction<BillOfMaterialType[]>>
  bill: BillOfMaterialType
}

const AddAssemblyMaterial = ({
  billOfMaterials,
  setBillOfMaterials,
  bill,
}: AddAssemblyMaterialProps) => {
  const handleRemove = () => {
    const updatedBillOfMaterials = billOfMaterials.filter(
      (b) => b.id !== bill.id
    )

    setBillOfMaterials(updatedBillOfMaterials)
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
          <MaterialSelector
            bill={bill}
            setBillOfMaterials={setBillOfMaterials}
            billOfMaterials={billOfMaterials}
          />
        </Box>
        <QuantityInput
          bill={bill}
          setBillOfMaterials={setBillOfMaterials}
          billOfMaterials={billOfMaterials}
        />
      </Stack>
      <Box>
        <Button onClick={handleRemove}>Remove</Button>
      </Box>
    </Stack>
  )
}

export default AddAssemblyMaterial
