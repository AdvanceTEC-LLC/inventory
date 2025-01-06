import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
import SendingShipmentForm from './Form'

const Sending = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Sending to Site'} />
      <Subtitle text="Create a new outbound shipment" />
      <SendingShipmentForm />
    </Container>
  )
}

export default Sending
