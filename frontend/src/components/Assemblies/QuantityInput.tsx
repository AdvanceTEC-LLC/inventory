import { InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { BillOfMaterialType } from './types'

interface QuantityInputProps {
  bill: BillOfMaterialType
  billOfMaterials: BillOfMaterialType[]
  setBillOfMaterials: Dispatch<SetStateAction<BillOfMaterialType[]>>
}

const QuantityInput = ({
  bill,
  billOfMaterials,
  setBillOfMaterials,
}: QuantityInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const quantity = value === '' ? undefined : parseInt(value, 10)

    const updatedBill = { ...bill, quantity }

    const updatedBillOfMaterials = billOfMaterials.map((b) =>
      b.id === bill.id ? updatedBill : b
    )

    setBillOfMaterials(updatedBillOfMaterials)
  }

  return (
    <>
      <TextField
        variant="standard"
        label="Quanitity"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {bill.material?.unit ?? 'ea'}
              </InputAdornment>
            ),
          },
        }}
        value={bill.quantity ?? ''}
        onChange={handleChange}
      />
    </>
  )
}

export default QuantityInput
