import IncomingForm from './IncomingForm'
import OutgoingForm from './OutgoingForm'
import { SentShipmentProvider } from './SentShipmentContext'
import { ReceivedShipmentProvider } from './ReceivedShipmentContext'
import { useShipment } from './ShipmentContext'
import { Button } from '@mui/material'

const ShipmentForm = () => {
  const { shipment } = useShipment()

  const handleConfirm = () => {
    console.log(shipment)
  }

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
        <Button onClick={handleConfirm}>Confirm Shipment</Button>
      </SentShipmentProvider>
    )
  }

  return null // Don't render anything if no shipment type is selected
}

export default ShipmentForm
