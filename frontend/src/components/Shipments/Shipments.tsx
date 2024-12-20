import Container from '../Container'
import { Title } from '../Text'
import ShipmentDetails from './ShipmentDetails'
import ShipmentsForm from './ShipmentsForm'
import ShipmentsTable from './ShipmentsTable'

const Shipments = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <ShipmentsForm />

      <Container>
        <Title text="Shipments Log" />
        <ShipmentsTable />
      </Container>

      <Container>
        <Title text="Shipments Details" />
        <ShipmentDetails />
      </Container>
    </div>
  )
}

export default Shipments
