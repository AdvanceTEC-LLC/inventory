import Container from '../../Container'
import { Subtitle, Title } from '../../Text'
import UploadShipment from './Upload Shipment/UploadShipment'

const Receiving = () => {
  return (
    <Container>
      <Title text={'Receiving Shipments'} />
      <Subtitle text="Add new stock to the warehouse inventory" />
      <UploadShipment />
    </Container>
  )
}

export default Receiving
