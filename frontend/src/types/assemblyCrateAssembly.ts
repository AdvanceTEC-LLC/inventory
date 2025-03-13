import { AssemblyType } from './assembly'
import { AssemblyCrateType } from './assemblyCrate'

export interface AssemblyCrateAssemblyType {
  id: number
  assemblyCrate: AssemblyCrateType
  assembly: AssemblyType
}

export interface NewAssemblyCrateAssemblyType
  extends Omit<AssemblyCrateAssemblyType, 'id' | 'assemblyCrate' | 'assembly'> {
  assemblyCrateId: number
  assemblyId: number
}
