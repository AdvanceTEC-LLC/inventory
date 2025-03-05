import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'
import { useState } from 'react'
import ShipmentHistory from './History/ShipmentHistory'
import OutgoingForm from './Outgoing/OutgoingForm'
import IncomingForm from './Incoming/IncomingForm'
import { useShipment } from './ShipmentContext'

const ShipmentTabs = () => {
  const { shipment, setShipment } = useShipment()

  const [value, setValue] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)

    setShipment({
      ...shipment,
      trackingNumber: undefined,
    })
  }

  return (
    <Stack flex={3} spacing={4}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="project tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="History" />
          <Tab label="Received at Warehouse" />
          <Tab label="Sending to Project" />
        </Tabs>
      </Box>

      {value == 0 && <ShipmentHistory />}
      {value == 1 && <IncomingForm />}
      {value == 2 && <OutgoingForm />}
    </Stack>
  )
}

export default ShipmentTabs
