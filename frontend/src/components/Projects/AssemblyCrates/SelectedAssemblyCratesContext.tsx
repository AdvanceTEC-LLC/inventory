import { createContext, useContext, useState, ReactNode } from 'react'
import { AssemblyCrateType } from '../../../types/assemblyCrate'

interface SelectedAssemblyCratesContextType {
  selectedAssemblyCrates: AssemblyCrateType[]
  setSelectedAssemblyCrates: (crates: AssemblyCrateType[]) => void
}

const SelectedAssemblyCratesContext = createContext<
  SelectedAssemblyCratesContextType | undefined
>(undefined)

export const SelectedAssemblyCratesProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedAssemblyCrates, setSelectedAssemblyCrates] = useState<
    AssemblyCrateType[]
  >([])

  return (
    <SelectedAssemblyCratesContext.Provider
      value={{ selectedAssemblyCrates, setSelectedAssemblyCrates }}
    >
      {children}
    </SelectedAssemblyCratesContext.Provider>
  )
}

export const useSelectedAssemblyCrates = () => {
  const context = useContext(SelectedAssemblyCratesContext)
  if (!context) {
    throw new Error(
      'useSelectedAssemblyCrates must be used within a SelectedAssemblyCratesProvider'
    )
  }
  return context
}
