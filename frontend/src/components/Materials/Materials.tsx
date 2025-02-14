import Container from '../ATEC UI/Container'
import { Title } from '../ATEC UI/Text'
import MaterialsTable from './MaterialsTable'

const MaterialStock = () => {
  return (
    <Container>
      <Title text={'Materials'} />
      <MaterialsTable />
    </Container>
  )
}

export default MaterialStock
