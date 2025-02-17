import { List, ListItemButton, ListItemText } from '@mui/material'
import { ManufacturerType } from '../../types/manufacturer'

const ManufacturersList = ({
  manufacturers,
  selectedManufacturer,
  onSelectManufacturer,
}: {
  manufacturers: ManufacturerType[]
  selectedManufacturer: ManufacturerType | null
  onSelectManufacturer: (manufacturer: ManufacturerType) => void
}) => {
  const sortedManufacturers = [...manufacturers].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <List component="nav" className="h-48 md:h-96 overflow-y-auto">
      {sortedManufacturers.map((manufacturer) => (
        <ListItemButton
          key={manufacturer.id}
          selected={selectedManufacturer?.id === manufacturer.id}
          onClick={() => onSelectManufacturer(manufacturer)}
        >
          <ListItemText primary={manufacturer.name} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default ManufacturersList
