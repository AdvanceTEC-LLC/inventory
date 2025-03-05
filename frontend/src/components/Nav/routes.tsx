import { LinkType } from '../../types/link'

import Manufacturers from '../Manufacturers/Manufacturers'

import Shipping from '../Shipping/Shipping'
import Projects from '../Projects/Projects'

export const routes: LinkType[] = [
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
    name: 'Projects',
    path: 'projects',
    element: <Projects />,
  },
]
