import { Header, Text } from '../../../Text'
import { ReceivedShipment } from './types'

interface ShipmentDetailsProps {
  shipment: ReceivedShipment
}

const ShipmentDetails = ({ shipment }: ShipmentDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:grid md:grid-cols-[1fr_1fr] md:gap-x-4">
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 md:flex md:items-center">
        <Header text="Project" /> <Text text={shipment.details.project.name} />
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 md:flex md:items-center">
        <Header text="Vendor" /> <Text text={shipment.details.vendor} />
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 md:flex md:items-center">
        <Header text="Ship Date" /> <Text text={shipment.details.shipDate} />
      </div>
      <div className="grid grid-cols-[1fr_1fr] gap-x-4 md:flex md:items-center">
        <Header text="Received Date" />
        <Text text={shipment.details.receivedDate} />
      </div>
    </div>
  )
}

export default ShipmentDetails
