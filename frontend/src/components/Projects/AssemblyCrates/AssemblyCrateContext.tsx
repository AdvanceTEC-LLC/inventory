import { createContext, useContext, useState, ReactNode } from 'react'
import { NewAssemblyCrateType } from '../../../types/assemblyCrate'

interface AssemblyCrateContextType {
  assemblyCrate: NewAssemblyCrateType | undefined
  setAssemblyCrate: (assemblyCrate: NewAssemblyCrateType) => void
}

const AssemblyCrateContext = createContext<
  AssemblyCrateContextType | undefined
>(undefined)

export const AssemblyCrateProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [assemblyCrate, setAssemblyCrate] = useState<NewAssemblyCrateType>()

  return (
    <AssemblyCrateContext.Provider
      value={{ assemblyCrate: assemblyCrate, setAssemblyCrate }}
    >
      {children}
    </AssemblyCrateContext.Provider>
  )
}

export const useAssemblyCrate = () => {
  const context = useContext(AssemblyCrateContext)
  if (!context) {
    throw new Error(
      'useAssemblyCrate must be used within a AssemblyCrateProvider'
    )
  }
  return context
}
