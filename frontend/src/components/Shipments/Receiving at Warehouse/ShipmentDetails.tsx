import { NewReceivedShipmentType } from '../../../types/receivedShipment'
import { Header, Text } from '../../ATEC UI/Text'

interface ShipmentDetailsProps {
  receivedShipment: NewReceivedShipmentType
}

const ShipmentDetails = ({ receivedShipment }: ShipmentDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Header text="Upload Details" />

      <div className="grid grid-cols-[1fr_1fr] gap-x-4">
        <Text text="Project" />
        <Text
          text={`${receivedShipment.shipment.project.number} ${receivedShipment.shipment.project.name}`}
        />

        <Text text="Manufacturer" />
        <Text text={receivedShipment.manufacturer.name} />

        <Text text="Received Date" />
        <Text
          text={receivedShipment.receivedDate?.toLocaleDateString() ?? ''}
        />

        <Text text="Number of Crates" />
        <Text
          text={receivedShipment.shipment.crates?.length.toString() ?? '0'}
        />
      </div>
    </div>
  )
}

export default ShipmentDetails
