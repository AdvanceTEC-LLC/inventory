import { LinkType } from '../../types/link'
import Crates from '../Crates/Crates'

import MaterialStock from '../Materials/Materials'
import Manufacturers from '../Manufacturers/Manufacturers'

import Shipping from '../Shipping/Shipping'

export const routes: LinkType[] = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <MaterialStock />,
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
]
