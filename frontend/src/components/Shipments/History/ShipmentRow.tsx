import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableHead,
  TableBody,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import React from 'react'
import { ShipmentType } from '../../../types/shipment'
import CrateRow from './CrateRow'
import TotalStock from './TotalStock'
import { Header, Subtext } from '../../ATEC UI/Text'

interface ShipmentRowProps {
  shipment: ShipmentType
}

const ShipmentRow = ({ shipment }: ShipmentRowProps) => {
  const [open, setOpen] = React.useState(false)

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
          <div className="text-text-secondary">
            {shipment.project.number} {shipment.project.name}
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
              <TotalStock shipment={shipment} />
              <div className="flex flex-col gap-y-2">
                <Header text="Crates" />
                {shipment.crates.length ? (
                  <Table>
                    <TableHead className="bg-gray-50">
                      <TableRow>
                        <TableCell />
                        <TableCell>Number</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Storage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shipment.crates.map((crate) => (
                        <CrateRow crate={crate} key={crate.id} />
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Subtext text="This shipment has no crates" />
                )}
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default ShipmentRow
