import { Header, Text } from '../../../Text'
import { ReceivedShipment } from './types'

interface ShipmentDetailsProps {
  shipment: ReceivedShipment
}

const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Header text="Upload Details" />

      <div className="grid grid-cols-[1fr_1fr] gap-x-4">
        <Text text="Project" />
        <Text text={`${shipment.project.number} ${shipment.project.name}`} />

        <Text text="Vendor" />
        <Text text={shipment.vendor.name} />

        <Text text="Send Date" />
        <Text text={shipment.sendDate} />

        <Text text="Received Date" />
        <Text text={shipment.receivedDate} />

        <Text text="Number of Crates" />
        <Text text={shipment.crates.length.toString()} />
      </div>
    </div>
  )
}

export default ShipmentDetails
