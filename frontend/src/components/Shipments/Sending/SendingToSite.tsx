import Container from '../../ATEC UI/Container'
import { Title, Subtitle } from '../../ATEC UI/Text'
import SendingShipmentForm from './SendingShipmentForm'
import StageCrates from './StageCrates'

const SendingToSite = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Container>
        <Title text={'Sending to Site'} />
        <Subtitle text="Confirm an outbound shipment" />
        <SendingShipmentForm />
      </Container>
      <Container>
        <Title text={'Stage Crates'} />
        <Subtitle text="Select crates to relocate to a staging area" />
        <StageCrates />
      </Container>
    </div>
  )
}

export default SendingToSite
