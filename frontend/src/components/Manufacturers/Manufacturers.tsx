import TwoColumnLayout from '../TwoColumnLayout'
import ManufacturersColumn from './ManufacturersColumn'
import { ManufacturerProvider } from './ManufacturerContext'
import ManufacturerTabs from './ManufacturerTabs'

const Manufacturers = () => {
  return (
    <ManufacturerProvider>
      <TwoColumnLayout
        left={<ManufacturersColumn />}
        right={<ManufacturerTabs />}
      />
    </ManufacturerProvider>
  )
}

export default Manufacturers
