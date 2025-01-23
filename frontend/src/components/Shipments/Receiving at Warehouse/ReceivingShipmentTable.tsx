import { useState } from 'react'
import { CreateShipmentType } from '../../../types/shipment'
import CrateBreakdown from './CrateBreakdown'
import TabSwitcher from '../TabSwitcher'
import TotalStock from './TotalStock'

interface ReceivingShipmentTableProps {
  shipment: CreateShipmentType
}

const tabs = ['Total Stock', 'Crate Breakdown']

const ReceivingShipmentTable = ({ shipment }: ReceivingShipmentTableProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])

  return (
    <div className="flex flex-col gap-y-8">
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === tabs[0] && <TotalStock shipment={shipment} />}
      {activeTab === tabs[1] && <CrateBreakdown crates={shipment.crates} />}
    </div>
  )
}

export default ReceivingShipmentTable
