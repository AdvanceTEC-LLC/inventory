import { TableCell } from '@mui/material'
import { Header } from '../ATEC UI/Text'

interface TabSwitcherProps {
  tabs: string[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabSwitcher = ({ tabs, activeTab, setActiveTab }: TabSwitcherProps) => (
  <div className="w-full grid grid-cols-2 gap-x-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`border-b-2 ${
          activeTab === tab ? 'border-atec-light' : ''
        } hover:bg-blue-50`}
        onClick={() => setActiveTab(tab)}
      >
        <Header
          className={`p-4 ${activeTab === tab ? 'text-atec-light' : ''}`}
          text={tab}
        />
      </button>
    ))}
  </div>
)

export default TabSwitcher
