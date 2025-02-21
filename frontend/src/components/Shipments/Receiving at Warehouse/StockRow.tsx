import { TableRow, TableCell } from '@mui/material'
import { NewStockType } from '../../../types/stock'

interface StockRowProps {
  stock: NewStockType
}

const StockRow = ({ stock }: StockRowProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <div className="text-text-secondary">{stock.material.name}</div>
      </TableCell>
      <TableCell>
        <div className="text-text-secondary">{stock.quantity}</div>
      </TableCell>
    </TableRow>
  )
}

export default StockRow
