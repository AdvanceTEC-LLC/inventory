import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { CrateType } from '../../../types/crate'
import { Subtext } from '../../ATEC UI/Text'
import CrateRow from './CrateRow'

interface CrateBreakdownProps {
  crates: CrateType[]
}

const CrateBreakdown = ({ crates }: CrateBreakdownProps) => {
  if (!crates.length) return <Subtext text="This shipment has no crates" />

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Number</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Storage</TableCell>
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

export default CrateBreakdown
