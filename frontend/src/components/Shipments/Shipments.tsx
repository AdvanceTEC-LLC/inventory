import Container from '../Container'
import { Title } from '../Text'
import ShipmentsForm from './ShipmentsForm'
import ShipmentDetailsTable from './ShipmentDetails/ShipmentDetailsTable'

const Shipments = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Container>
        <ShipmentsForm />
      </Container>

      {/*
      <Container>
        <Title text="Shipments Log" />
        <ShipmentsTable />
      </Container>
      */}

      <Container>
        <Title text="Shipments" />
        <ShipmentDetailsTable />
      </Container>
    </div>
  )
}

export default Shipments
