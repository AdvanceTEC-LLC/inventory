import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
} from '@mui/material'
import { Crate, Stock } from './types'
import { useState } from 'react'
import { Header } from '../../../ATEC UI/Text'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

interface ContentsTableProps {
  crates: Crate[]
}

const ContentsTable = ({ crates }: ContentsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead className="bg-gray-50">
          <TableRow>
            <TableCell />
            <TableCell>Crate Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crates.map((crate, index) => (
            <CrateRow crate={crate} key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ContentsTable

interface CrateRowProps {
  crate: Crate
}

const CrateRow = ({ crate }: CrateRowProps) => {
  const [open, setOpen] = useState(false)

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
        <TableCell>
          <div className="text-text-secondary">{crate.number}</div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex flex-col gap-y-2 ml-16 my-8">
              <Header text="Stock" />

              <Table>
                <TableHead className="bg-gray-50">
                  <TableRow>
                    <TableCell>Part Number</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Dimensions</TableCell>
                    <TableCell>Square Feet</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crate.stock.map((stock, index) => (
                    <StockRow stock={stock} key={index} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

interface StockRowProps {
  stock: Stock
}

const StockRow = ({ stock }: StockRowProps) => {
  const formatDimensions = (stock: Stock) => {
    const dimensions = []

    if (stock.material.thickness)
      dimensions.push(`${stock.material.thickness}"T`)

    if (stock.material.width) dimensions.push(`${stock.material.width}"W`)

    if (stock.material.length) dimensions.push(`${stock.material.length}"L`)

    return dimensions.join(' x ')
  }

  const formatSquareFeet = (stock: Stock) => {
    if (stock.material.squareFeet) {
      const roundedSquareFeet = Math.ceil(stock.material.squareFeet)
      return `${roundedSquareFeet}`
    }
  }

  const formatColor = (stock: Stock) => {
    let color = ''

    if (stock.material.topColor) color.concat(stock.material.topColor)
    if (stock.material.bottomColor) color.concat(stock.material.bottomColor)
    return color
  }

  const formatTag = (stock: Stock) => {
    if (stock.material.tag && stock.material.additionalTagInformation)
      return `${stock.material.tag}${stock.material.additionalTagInformation}`
  }

  return (
    <TableRow>
      <TableCell>
        <div className="text-text-secondary">{stock.material.number}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{stock.material.description}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{formatDimensions(stock)}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{formatSquareFeet(stock)}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{formatColor(stock)}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{formatTag(stock)}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{stock.quantity}</div>
      </TableCell>
    </TableRow>
  )
}
