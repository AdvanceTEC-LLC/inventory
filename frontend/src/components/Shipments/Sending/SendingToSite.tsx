import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import SendingShipmentForm from './SendingShipmentForm'

const SendingToSite = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Sending to Site'} />
      <Subtitle text="Create a new outbound shipment" />
      <SendingShipmentForm />
    </Container>
  )
}

export default SendingToSite
