import { Stack } from '@mui/system'
import AddMaterial from './AddMaterial'
import MaterialsTable from './MaterialsTable'

const ManufacturerMaterials = () => {
  return (
    <Stack flex={3} spacing={4} justifyContent="space-between" height={'100%'}>
      <MaterialsTable />
      <AddMaterial />
    </Stack>
  )
}

export default ManufacturerMaterials
