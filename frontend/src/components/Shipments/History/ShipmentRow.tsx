import { TableRow, TableCell, IconButton, Collapse } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'
import { ShipmentType } from '../../../types/shipment'
import TotalStock from './TotalStock'
import CrateBreakdown from './CrateBreakdown'
import ShipmentDetailsRow from './ShipmentDetailsRow'
import TabSwitcher from '../TabSwitcher'

interface ShipmentRowProps {
  shipment: ShipmentType
}

const tabs = ['Total Stock', 'Crate Breakdown']

const ShipmentRow = ({ shipment }: ShipmentRowProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>(tabs[0])

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <ShipmentDetailsRow shipment={shipment} />
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex flex-col gap-y-8 ml-16 my-8">
              <TabSwitcher
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {activeTab === tabs[0] && <TotalStock shipment={shipment} />}
              {activeTab === tabs[1] && (
                <CrateBreakdown crates={shipment.crates} />
              )}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default ShipmentRow
