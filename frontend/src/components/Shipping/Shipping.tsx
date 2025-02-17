import Container from '../ATEC UI/Container'
import ShipmentTypeSelector from './ShipmentTypeSelector'
import ShipmentForm from './ShipmentForm'
import { ShipmentProvider } from './ShipmentContext'
import { Title } from '../ATEC UI/Text'

const Shipping = () => {
  return (
    <ShipmentProvider>
      <Container>
        <Title text="Details" />
        <ShipmentTypeSelector />
        <ShipmentForm />
      </Container>
    </ShipmentProvider>
  )
}

export default Shipping
