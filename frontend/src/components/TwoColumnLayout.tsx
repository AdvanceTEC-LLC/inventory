import { Divider } from '@mui/material'
import { Stack } from '@mui/system'
import Container from './ATEC UI/Container'

interface TwoColumnLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
}

const TwoColumnLayout = ({ left, right }: TwoColumnLayoutProps) => {
  return (
    <Container>
      <Stack spacing={{ xs: 2, md: 8 }} direction={{ xs: 'column', md: 'row' }}>
        {left}
        <Divider orientation="vertical" flexItem />
        {right}
      </Stack>
    </Container>
  )
}

export default TwoColumnLayout
