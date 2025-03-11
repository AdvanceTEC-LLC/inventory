import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import { Title } from '../ATEC UI/Text'
import AddManufacturer from './AddManufactuer'
import ManufacturersList from './ManufacturersList'
import { useManufacturer } from './ManufacturerContext'
import { useManufacturers } from '../../hooks/useManufacturersHook'

const ManufacturersColumn = () => {
  const { data: manufacturers = [] } = useManufacturers()

  const { manufacturer, setManufacturer } = useManufacturer()

  return (
    <Stack spacing={4} flex={1}>
      <Title text="Manufacturers" />
      <ManufacturersList
        manufacturers={manufacturers}
        onSelectManufacturer={setManufacturer}
        selectedManufacturer={manufacturer}
      />
      <Divider />
      <AddManufacturer />
    </Stack>
  )
}

export default ManufacturersColumn
