import { Autocomplete, TextField } from '@mui/material'
import { useMaterials } from '../../hooks/useMaterialsHook'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { MaterialType } from '../../types/material'
import { BillOfMaterialType } from './types'

interface MaterialSelectorProps {
  bill: BillOfMaterialType
  billOfMaterials: BillOfMaterialType[]
  setBillOfMaterials: Dispatch<SetStateAction<BillOfMaterialType[]>>
}

const MaterialSelector = ({
  bill,
  billOfMaterials,
  setBillOfMaterials,
}: MaterialSelectorProps) => {
  const { data: materials = [] } = useMaterials()

  const sortedMaterials = materials.sort((a, b) => a.name.localeCompare(b.name))

  const handleChange = (_: SyntheticEvent, value: MaterialType | null) => {
    const updatedBill = {
      ...bill,
      material: value ?? undefined,
    }

    const updatedBillOfMaterials = billOfMaterials.map((b) =>
      b.id === bill.id ? updatedBill : b
    )

    setBillOfMaterials(updatedBillOfMaterials)
  }

  const materialValue = bill?.material ?? null

  return (
    <Autocomplete
      options={sortedMaterials}
      getOptionLabel={(option) => option.name}
      value={materialValue}
      onChange={(event, value) => handleChange(event, value)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label="Material" />}
    />
  )
}

export default MaterialSelector
