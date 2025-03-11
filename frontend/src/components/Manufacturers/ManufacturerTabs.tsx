import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'
import { useState } from 'react'
import ManufacturerMaterials from './ManufacturerMaterials'

const ManufacturerTabs = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack flex={3} spacing={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Manufacturer tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Materials" />
        </Tabs>
      </Box>
      {value == 0 && <ManufacturerMaterials />}
    </Stack>
  )
}

export default ManufacturerTabs
