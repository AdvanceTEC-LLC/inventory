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
import { CrateType } from '../../../types/crate'
import StockRow from '../../Inventory/Crates/StockRow'
import { Header, Subtext } from '../../ATEC UI/Text'

interface CrateRowProps {
  crate: CrateType
}

const CrateRow = ({ crate }: CrateRowProps) => {
  const [open, setOpen] = React.useState(false)

  const formatStorage = (crate: CrateType) => {
    if (!crate.storage) return 'Not on shelves'

    return `Aisle ${crate.storage.aisle} ${crate.storage.col}x${crate.storage.shelf}`
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {crate.stock.length ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <Subtext text="This crate is empty" className="ml-2" />
          )}
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">{crate.number}</div>
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">{crate.location}</div>
        </TableCell>
        <TableCell>
          <div className="text-text-secondary">{formatStorage(crate)}</div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex flex-col gap-y-2 ml-16 my-8">
              <Header text="Stock" />

              {crate.stock.length ? (
                <Table>
                  <TableHead className="bg-gray-50">
                    <TableRow>
                      <TableCell>Part Number</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {crate.stock.map((stock) => (
                      <StockRow stock={stock} key={stock.id} />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Subtext text="This crate has no stock" />
              )}
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default CrateRow
