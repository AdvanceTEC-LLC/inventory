import { LinkType } from '../../types/link'

import Inventory from '../Inventory/Stock/Stock'
import Crates from '../Inventory/Crates/Crates'

import Receiving from '../Shipments/Receiving/Receiving'
import History from '../Shipments/History/History'

import Projects from '../Other/Projects/Projects'
import Storages from '../Other/Storages/Storages'
import Vendors from '../Other/Vendors/Vendors'
import Sending from '../Shipments/Sending/Sending'

export const routes: LinkType[] = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <Inventory />,
    dropdown: [
      {
        name: 'Materials',
        path: 'materials',
        element: <Inventory />,
      },
      {
        name: 'Prefabrications',
        path: 'prefabrications',
      },
      {
        name: 'Crates',
        path: 'crates',
        element: <Crates />,
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
        name: 'Sending to Site',
        path: 'sending-to-site',
        element: <Sending />,
      },
      {
        name: 'Receiving at Site',
        path: 'receiving-at-site',
        //element: <ReceivingAtSite />,
      },
      {
        name: 'History',
        path: '',
        element: <History />,
      },
    ],
  },
  {
    name: 'Prefabrication',
    path: 'prefabrication',
    //element: <Prefabrication />,
    dropdown: [
      {
        name: 'Prefabricate',
        path: 'prefabricate',
        //element: <Prefabricate />,
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
        path: 'projects',
        element: <Projects />,
      },
      {
        name: 'Vendors',
        path: 'vendors',
        element: <Vendors />,
      },
      {
        name: 'Storages',
        path: 'storages',
        element: <Storages />,
      },
    ],
  },
]
