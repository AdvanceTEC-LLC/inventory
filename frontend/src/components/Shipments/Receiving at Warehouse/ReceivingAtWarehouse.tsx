import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
import UploadShipment from './UploadShipment'

const ReceivingAtWarehouse = () => {
  return (
    <Container>
      <Title text={'Receiving Shipments at Warehouse'} />
      <Subtitle text="Add new stock to the warehouse inventory" />
      <UploadShipment />
    </Container>
  )
}

export default ReceivingAtWarehouse
