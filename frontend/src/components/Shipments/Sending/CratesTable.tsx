import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Checkbox,
} from '@mui/material'
import CrateRow from './CrateRow'
import { CrateType } from '../../../types/crate'

interface CratesTableProps {
  crates: CrateType[]
  selectedCrates: CrateType[]
  setSelectedCrates: (selectedCrates: CrateType[]) => void
  onSelect: (selectedCrate: CrateType) => void
}

const CratesTable = ({
  crates,
  selectedCrates,
  setSelectedCrates,
  onSelect,
}: CratesTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                selectedCrates.length > 0 &&
                selectedCrates.length < crates.length
              }
              checked={selectedCrates.length === crates.length}
              onChange={() => {
                if (selectedCrates.length === crates.length) {
                  setSelectedCrates([])
                } else {
                  setSelectedCrates(crates)
                }
              }}
            />
          </TableCell>
          <TableCell />
          <TableCell>Number</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Vendor</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {crates.map((crate) => (
          <CrateRow
            isSelected={selectedCrates.includes(crate)}
            onSelect={onSelect}
            crate={crate}
            key={crate.id}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default CratesTable
