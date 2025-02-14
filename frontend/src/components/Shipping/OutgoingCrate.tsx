import { useState } from 'react'
import CrateItems from './IncomingCrateStockList'
import { useCrates } from '../../hooks/useCratesHook'

interface OutgoingCrateProps {
  editable: boolean
  index: number
  crate: { number: string | undefined; items: [] }
  crates: { number: string | undefined; items: [] }[]
  setCrates: React.Dispatch<
    React.SetStateAction<
      {
        number: string | undefined
        items: []
      }[]
    >
  >
}

const OutgoingCrate = ({
  editable,
  index,
  crate,
  crates,
  setCrates,
}: OutgoingCrateProps) => {
  const [open, setOpen] = useState<boolean>(true)

  const { data: cratesInDatabase = [] } = useCrates()

  const updateCrate = (
    index: number,
    field: 'number' | 'items',
    value: string | number
  ) => {
    const updatedCrates = [...crates]
    updatedCrates[index] = { ...updatedCrates[index], [field]: value }
    setCrates(updatedCrates)
  }

  return (
    <>
      <tr>
        <td>
          <select
            value={crate.number || ''}
            onChange={(e) => updateCrate(index, 'number', e.target.value)}
          >
            <option value="">Select Crate</option>
            {cratesInDatabase.map((crate) => (
              <option key={crate.id} value={crate.number}>
                {crate.number}
              </option>
            ))}
          </select>
        </td>
        {editable && (
          <td>
            <button
              onClick={() => setCrates(crates.filter((_, i) => i !== index))}
            >
              Remove
            </button>
            <button onClick={() => setOpen(!open)}>
              {open ? 'Close' : 'Open'}
            </button>
          </td>
        )}
      </tr>
      {/*<tr>
        <td>{open && <CrateItems />}</td>
      </tr>*/}
    </>
  )
}

export default OutgoingCrate
