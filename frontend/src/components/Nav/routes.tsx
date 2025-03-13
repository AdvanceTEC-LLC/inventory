import { LinkType } from '../../types/link'

import Manufacturers from '../Manufacturers/Manufacturers'

import Shipments from '../Shipments/Shipments'
import Projects from '../Projects/Projects'

export const routes: LinkType[] = [
  {
    name: 'Shipments',
    path: 'shipments',
    element: <Shipments />,
  },
  {
    name: 'Manufacturers',
    path: 'manufacturers',
    element: <Manufacturers />,
  },
  {
    name: 'Projects',
    path: 'projects',
    element: <Projects />,
  },
]
