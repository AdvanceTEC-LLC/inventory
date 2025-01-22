import { AssemblyType } from './assembly'
import { CrateType } from './crate'

export interface CrateAssemblyType {
  id: number
  crate: CrateType
  assembly: AssemblyType
}

export interface NewCrateAssemblyType
  extends Omit<CrateAssemblyType, 'id' | 'crate' | 'assembly'> {
  crateId: number
  assemblyId: number
}
