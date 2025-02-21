import { TableRow, TableCell, IconButton, Collapse } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React, { useState } from 'react'
import { ShipmentType } from '../../../types/shipment'
import TotalStock from './TotalStock'
import CrateBreakdown from '../History/CrateBreakdown'
import TabSwitcher from '../TabSwitcher'

interface ShipmentRowProps {
  shipment: ShipmentType
}

const tabs = ['Total Stock', 'Crate Breakdown']

const ShipmentRow = ({ shipment }: ShipmentRowProps) => {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = useState<string>(tabs[0])

  return (
    <React.Fragment>
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
        <TableCell>
          <div className="text-text-secondary">{shipment.direction}</div>
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">
            {new Date(shipment.sendDate).toLocaleDateString()}
          </div>
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">
            {new Date(shipment.receivedDate).toLocaleDateString()}
          </div>
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">{shipment.vendor.name}</div>
        </TableCell>
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
    </React.Fragment>
  )
}

export default ShipmentRow
