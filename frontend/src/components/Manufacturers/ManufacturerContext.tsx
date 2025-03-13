import { createContext, useContext, useState, ReactNode } from 'react'
import { ManufacturerType } from '../../types/manufacturer'

interface ManufacturerContextType {
  manufacturer: ManufacturerType | null
  setManufacturer: (manufacturer: ManufacturerType) => void
}

const ManufacturerContext = createContext<ManufacturerContextType | undefined>(
  undefined
)

export const ManufacturerProvider = ({ children }: { children: ReactNode }) => {
  const [manufacturer, setManufacturer] = useState<ManufacturerType | null>(
    null
  )

  return (
    <ManufacturerContext.Provider
      value={{ manufacturer: manufacturer, setManufacturer }}
    >
      {children}
    </ManufacturerContext.Provider>
  )
}

export const useManufacturer = () => {
  const context = useContext(ManufacturerContext)
  if (!context) {
    throw new Error(
      'useManufacturer must be used within a ManufacturerProvider'
    )
  }
  return context
}
