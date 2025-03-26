import IncomingForm from './Incoming/IncomingForm'
import OutgoingForm from './Outgoing/OutgoingForm'
import ReceivedShipmentsTable from './ReceivedHistory/ReceivedShipmentsTable'
import SentShipmentsTable from './SentHistory/SentShipmentsTable'
import TabSelector from '../TabSelector'

export const ShipmentTabs = () => {
  const shipmentTabs = [
    {
      label: 'Received History',
      component: <ReceivedShipmentsTable />,
    },
    {
      label: 'Receiving Form',
      component: <IncomingForm />,
    },
    {
      label: 'Sent History',
      component: <SentShipmentsTable />,
    },
    {
      label: 'Sending Form',
      component: <OutgoingForm />,
    },
  ]

  return <TabSelector tabs={shipmentTabs} />
}

export default ShipmentTabs
