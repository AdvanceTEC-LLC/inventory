import { Divider, Stack } from '@mui/material'
import { useManufacturers } from '../../hooks/useManufacturersHook'
import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import { ManufacturerType } from '../../types/manufacturer'
import { useState } from 'react'
import AddManufacturer from './AddManufactuer'
import ManufacturersList from './ManufacturersList'
import ManufacturerMaterials from './ManufacturerMaterials'
import AddMaterial from './AddMaterial'

const Manufacturers = () => {
  const { data: manufacturers = [] } = useManufacturers()
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<ManufacturerType | null>(null)

  return (
    <Container>
      <Stack spacing={8} direction={{ xs: 'column', md: 'row' }}>
        {/* Left Side: Manufacturer List & Add */}
        <Stack spacing={4} flex={1}>
          <Title text="Manufacturers" />
          <ManufacturersList
            manufacturers={manufacturers}
            onSelectManufacturer={setSelectedManufacturer}
            selectedManufacturer={selectedManufacturer}
          />
          <Divider />
          <AddManufacturer />
        </Stack>

        <Divider orientation="vertical" flexItem />

        {/* Right Side: Manufacturer Materials */}
        <Stack flex={3} spacing={4} justifyContent="space-between">
          <Stack spacing={4}>
            <Title
              text={`${
                selectedManufacturer ? selectedManufacturer.name + ' ' : ''
              }Materials`}
            />
            <ManufacturerMaterials
              selectedManufacturer={selectedManufacturer}
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            {/*<DeleteManufacturer manufacturer={selectedManufacturer} />*/}
            <AddMaterial manufacturer={selectedManufacturer} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Manufacturers
