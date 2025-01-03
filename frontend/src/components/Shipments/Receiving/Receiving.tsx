import Container from '../../Container'
import { Title, Subtitle } from '../../Text'
import UploadShipment from './Upload Shipment/UploadShipment'

const Receiving = () => {
  return (
    <Container className="overflow-x-auto">
      <Title text={'Receiving Shipments'} />
      <Subtitle text="View shipment contents and track their status" />
      <UploadShipment />
    </Container>
  )
}

export default Receiving
