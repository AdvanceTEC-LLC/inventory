import { Header, Text } from '../../../Text'
import { ReceivedShipment } from './types'

interface ShipmentDetailsProps {
  shipment: ReceivedShipment
}

const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-4 items-center">
        <Header text="Project" />
        <Text text={shipment.details.project.name} />
      </div>
      <div className="flex gap-x-4 items-center">
        <Header text="Vendor" /> <Text text={shipment.details.vendor} />
      </div>

      <div className="flex gap-x-4 items-center">
        <Header text="Ship Date" /> <Text text={shipment.details.shipDate} />
      </div>
      <div className="flex gap-x-4 items-center">
        <Header text="Received Date" />
        <Text text={shipment.details.receivedDate} />
      </div>

      <div className="flex gap-x-4 items-center">
        <Header text="Number of Crates" />
        <Text text={shipment.crates.length.toString()} />
      </div>
    </div>
  )
}

export default ShipmentDetails
