import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'

interface TabContentItem {
  label: string
  component: React.ReactNode
}

interface TabSelectorProps {
  tabs: TabContentItem[]
  initialTab?: number
  variant?: 'standard' | 'scrollable'
}

const TabSelector = ({
  tabs,
  initialTab = 0,
  variant = 'scrollable',
}: TabSelectorProps) => {
  const [value, setValue] = useState(initialTab)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack flex={3} spacing={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="dynamic tabs"
          variant={variant}
          scrollButtons={'auto'}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      {tabs[value]?.component}
    </Stack>
  )
}

export default TabSelector
