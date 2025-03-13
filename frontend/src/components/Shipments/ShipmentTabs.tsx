import { Tabs, Tab } from '@mui/material'
import { Stack, Box } from '@mui/system'
import { useState } from 'react'
import OutgoingForm from './Outgoing/OutgoingForm'
import IncomingForm from './Incoming/IncomingForm'
import { useShipment } from './ShipmentContext'
import ReceivedShipmentsTable from './ReceivedHistory/ReceivedShipmentsTable'
import SentShipmentsTable from './SentHistory/SentShipmentsTable'

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
          <Tab label="Received History" />
          <Tab label="Receiving Form" />
          <Tab label="Sent History" />
          <Tab label="Sending Form" />
        </Tabs>
      </Box>

      {value == 0 && <ReceivedShipmentsTable />}
      {value == 1 && <IncomingForm />}
      {value == 2 && <SentShipmentsTable />}
      {value == 3 && <OutgoingForm />}
    </Stack>
  )
}

export default ShipmentTabs
