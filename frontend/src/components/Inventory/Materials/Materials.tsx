import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
import MaterialsTable from './Table'

const MaterialStock = () => {
  return (
    <Container>
      <Title text={'Materials'} />
      <Subtitle text="View material stock and filter by project" />
      <MaterialsTable />
    </Container>
  )
}

export default MaterialStock
