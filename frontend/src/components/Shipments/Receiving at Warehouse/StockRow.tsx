import { TableRow, TableCell } from '@mui/material'
import { CreateStockType } from '../../../types/stock'

interface StockRowProps {
  stock: CreateStockType
}

const StockRow = ({ stock }: StockRowProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <div className="text-text-secondary">{stock.material.partNumber}</div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className="text-text-secondary">{stock.material.description}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{stock.quantity}</div>
      </TableCell>
    </TableRow>
  )
}

export default StockRow
