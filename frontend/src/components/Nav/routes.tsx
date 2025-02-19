import { LinkType } from '../../types/link'
import Crates from '../Crates/Crates'

import Stock from '../Stock/Stock'
import Manufacturers from '../Manufacturers/Manufacturers'

import Shipping from '../Shipping/Shipping'
import Assemblies from '../Assemblies/Assemblies'

export const routes: LinkType[] = [
  {
    name: 'Stock',
    path: 'stock',
    element: <Stock />,
  },
  {
    name: 'Shipping',
    path: 'shipping',
    element: <Shipping />,
  },
  {
    name: 'Manufacturers',
    path: 'manufacturers',
    element: <Manufacturers />,
  },
  {
    name: 'Crates',
    path: 'crates',
    element: <Crates />,
  },
  {
    name: 'Assemblies',
    path: 'assemblies',
    element: <Assemblies />,
  },
]
