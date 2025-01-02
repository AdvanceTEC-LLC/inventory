import { LinkType } from '../../types/link'
import Debug from '../Debug/Debug'

import Inventory from '../Inventory/Inventory/Inventory'
import Materials from '../Inventory/Materials/Materials'
import Crates from '../Inventory/Crates/Crates'

import Requests from '../Requests/Requests'
import Shipments from '../Shipments/Shipments'

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
    element: <Shipments />,
    dropdown: [
      {
        name: 'Receiving at Warehouse',
        path: 'receiving-at-warehouse',
      },
      {
        name: 'Shipping to Site',
        path: 'shipping-to-site',
      },
      {
        name: 'Shipment History',
        path: 'shipment-history',
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
    element: <Debug />,
    dropdown: [
      {
        name: 'Projects',
        path: 'Projects',
      },
      {
        name: 'Vendors',
        path: 'Vendors',
      },
      {
        name: 'Locations',
        path: 'Locations',
      },
    ],
  },
]
