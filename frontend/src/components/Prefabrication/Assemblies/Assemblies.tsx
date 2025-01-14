import Container from '../../ATEC UI/Container'
import { Subtitle, Title } from '../../ATEC UI/Text'
import UploadAssemblies from './UploadAssemblies'

const Assemblies = () => {
  return (
    <Container>
      <Title text={'Assemblies'} />
      <Subtitle text="Upload project assemblies with bill of materials" />
      <UploadAssemblies />
    </Container>
  )
}

export default Assemblies
