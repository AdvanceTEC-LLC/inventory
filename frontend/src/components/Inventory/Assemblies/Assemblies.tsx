import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
import AssembliesTable from './Table'

const AssemblyStock = () => {
  return (
    <Container>
      <Title text={'Assemblies'} />
      <Subtitle text="View the list of assemblies for each project" />
      <AssembliesTable />
    </Container>
  )
}

export default AssemblyStock
