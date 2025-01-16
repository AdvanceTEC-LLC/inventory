import { TableRow, TableCell, Table, TableHead, TableBody } from '@mui/material'
import CrateRow from '../../Inventory/Crates/CrateRow'
import { CrateType } from '../../../types/crate'

interface CratesTableProps {
  crates: CrateType[]
}

const CratesTable = ({ crates }: CratesTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Number</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Storage</TableCell>
          <TableCell>Project</TableCell>
          <TableCell>Vendor</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {crates.map((crate) => (
          <CrateRow crate={crate} key={crate.id} />
        ))}
      </TableBody>
    </Table>
  )
}

export default CratesTable
