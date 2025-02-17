import IncomingForm from './IncomingForm'
import OutgoingForm from './OutgoingForm'
import { SentShipmentProvider } from './SentShipmentContext'
import { ReceivedShipmentProvider } from './ReceivedShipmentContext'
import { useShipment } from './ShipmentContext'

const ShipmentForm = () => {
  const { shipment } = useShipment()

  if (shipment?.type === 'incoming') {
    return (
      <ReceivedShipmentProvider>
        <IncomingForm />
      </ReceivedShipmentProvider>
    )
  }

  if (shipment?.type === 'outgoing') {
    return (
      <SentShipmentProvider>
        <OutgoingForm />
      </SentShipmentProvider>
    )
  }

  return null // Don't render anything if no shipment type is selected
}

export default ShipmentForm
