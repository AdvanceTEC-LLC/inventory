import Container from '../ATEC UI/Container'
import { Subtitle, Title } from '../ATEC UI/Text'
import MaterialsTable from './Table'

const MaterialStock = () => {
  return (
    <Container>
      <Title text={'Stock'} />
      <Subtitle text="Materials available for each project" />
      <MaterialsTable />
    </Container>
  )
}

export default MaterialStock
