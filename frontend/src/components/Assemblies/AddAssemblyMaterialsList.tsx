import { Button, Stack } from '@mui/material'
import AddAssemblyMaterial from './AddAssemblyMaterial'
import { Dispatch, SetStateAction } from 'react'
import { BillOfMaterialType } from './types'

interface AddAssemblyMaterialsListProps {
  billOfMaterials: BillOfMaterialType[]
  setBillOfMaterials: Dispatch<SetStateAction<BillOfMaterialType[]>>
}

const AddAssemblyMaterialsList = ({
  billOfMaterials,
  setBillOfMaterials,
}: AddAssemblyMaterialsListProps) => {
  const addItem = () => {
    const id = billOfMaterials.length + 1

    const newBill = {
      id,
    }

    setBillOfMaterials([...billOfMaterials, newBill])
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {billOfMaterials.map((bill, index) => (
        <AddAssemblyMaterial
          key={index}
          billOfMaterials={billOfMaterials}
          setBillOfMaterials={setBillOfMaterials}
          bill={bill}
        />
      ))}
      <Button fullWidth onClick={addItem}>
        Add Item
      </Button>
    </Stack>
  )
}

export default AddAssemblyMaterialsList
