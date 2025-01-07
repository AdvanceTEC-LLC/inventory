import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
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
