import { StagingAreaType } from './stagingArea'
import { CrateType, NewCrateType } from './crate'
import { AssemblyType, NewAssemblyType } from './assembly'

export interface AssemblyCrateType {
  id: number
  crate: CrateType
  stagingArea?: StagingAreaType
  assemblies: AssemblyType[]
}

export interface NewAssemblyCrateType
  extends Omit<
    AssemblyCrateType,
    'id' | 'crate' | 'stagingArea' | 'assemblies'
  > {
  crate: NewCrateType
  stagingAreaId?: number
  assemblies: NewAssemblyType[]
}
