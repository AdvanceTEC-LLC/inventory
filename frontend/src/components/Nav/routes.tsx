import { LinkType } from '../../types/link'

import Inventory from '../Inventory/Inventory/Inventory'
import Materials from '../Inventory/Materials/Materials'
import Crates from '../Inventory/Crates/Crates'

import Receiving from '../Shipments/Receiving/Receiving'
import History from '../Shipments/History/History'

import Requests from '../Requests/Requests'

import Projects from '../Other/Projects/Projects'
import Locations from '../Other/Locations/Locations'
import Vendors from '../Other/Vendors/Vendors'

export const routes: LinkType[] = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <Inventory />,
    dropdown: [
      {
        name: 'View Stock',
        path: '',
        element: <Inventory />,
      },
      {
        name: 'Crates',
        path: 'crates',
        element: <Crates />,
      },
      {
        name: 'Materials',
        path: 'materials',
        element: <Materials />,
      },
    ],
  },
  {
    name: 'Shipments',
    path: 'shipments',
    element: <History />,
    dropdown: [
      {
        name: 'Receiving at Warehouse',
        path: 'receiving-at-warehouse',
        element: <Receiving />,
      },
      {
        name: 'Shipping to Site',
        path: 'shipping-to-site',
      },
      {
        name: 'History',
        path: 'history',
        element: <History />,
      },
    ],
  },
  {
    name: 'Requests',
    path: 'requests',
    element: <Requests />,
    dropdown: [
      {
        name: 'Request to Site',
        path: 'request-to-site',
      },
      {
        name: 'Outstanding Requests',
        path: 'outstanding-requests',
      },
      {
        name: 'Request History',
        path: 'request-history',
      },
    ],
  },
  {
    name: 'Other',
    path: 'other',
    element: <Projects />,
    dropdown: [
      {
        name: 'Projects',
        path: 'Projects',
        element: <Projects />,
      },
      {
        name: 'Vendors',
        path: 'Vendors',
        element: <Vendors />,
      },
      {
        name: 'Locations',
        path: 'Locations',
        element: <Locations />,
      },
    ],
  },
]
