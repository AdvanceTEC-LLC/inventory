import Container from '../ATEC UI/Container'
import ShipmentTypeSelector from './ShipmentTypeSelector'
import ShipmentForm from './ShipmentForm'
import { ShipmentProvider } from './ShipmentContext'
import { Title } from '../ATEC UI/Text'
import TrackingNumberInput from './TrackingNumberInput'

const Shipping = () => {
  return (
    <ShipmentProvider>
      <Container>
        <Title text="Details" />
        <ShipmentTypeSelector />
        <TrackingNumberInput />
        <ShipmentForm />
      </Container>
    </ShipmentProvider>
  )
}

export default Shipping
