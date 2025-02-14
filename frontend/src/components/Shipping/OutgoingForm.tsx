import { useState } from 'react'
import OutgoingCrate from './OutgoingCrate'

const OutgoingForm = () => {
  const [crates, setCrates] = useState<
    { number: string | undefined; items: [] }[]
  >([{ number: undefined, items: [] }])

  const addCrate = () => {
    setCrates([...crates, { number: undefined, items: [] }])
  }

  return (
    <>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Crate Number</th>
          </tr>
        </thead>
        <tbody>
          {crates.map((crate, index) => (
            <OutgoingCrate
              editable={false}
              index={index}
              crate={crate}
              crates={crates}
              setCrates={setCrates}
              key={index}
            />
          ))}
        </tbody>
      </table>
      <button onClick={addCrate}>Add Crate</button>
    </>
  )
}

export default OutgoingForm
