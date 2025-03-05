import { createContext, useContext, useState, ReactNode } from 'react'
import { FieldCrateType } from '../../../types/fieldCrate'

interface FieldCrateContextType {
  fieldCrate: FieldCrateType | undefined
  setFieldCrate: (fieldCrate: FieldCrateType) => void
}

const FieldCrateContext = createContext<FieldCrateContextType | undefined>(
  undefined
)

export const FieldCrateProvider = ({ children }: { children: ReactNode }) => {
  const [fieldCrate, setFieldCrate] = useState<FieldCrateType>()

  return (
    <FieldCrateContext.Provider
      value={{ fieldCrate: fieldCrate, setFieldCrate }}
    >
      {children}
    </FieldCrateContext.Provider>
  )
}

export const useFieldCrate = () => {
  const context = useContext(FieldCrateContext)
  if (!context) {
    throw new Error('useFieldCrate must be used within a FieldCrateProvider')
  }
  return context
}
