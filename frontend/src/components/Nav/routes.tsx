import { LinkType } from '../../types/link'

import Crates from '../Inventory/Crates/Crates'
import MaterialStock from '../Inventory/Materials/Materials'
import AssemblyStock from '../Inventory/Assemblies/Assemblies'

import Projects from '../Other/Projects/Projects'
import Storages from '../Other/Storages/Storages'
import Vendors from '../Other/Vendors/Vendors'

import Prefabricate from '../Prefabrication/Prefabricate/Prefabricate'
import Assemblies from '../Prefabrication/Assemblies/Assemblies'

import History from '../Shipments/History/History'
import Receiving from '../Shipments/Receiving/Receiving'
import Sending from '../Shipments/Sending/Sending'

export const routes: LinkType[] = [
  {
    name: 'Inventory',
    path: 'inventory',
    element: <MaterialStock />,
    dropdown: [
      {
        name: 'Materials',
        path: 'materials',
        element: <MaterialStock />,
      },
      {
        name: 'Assemblies',
        path: 'Assemblies',
        element: <AssemblyStock />,
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
    element: <Prefabricate />,
    dropdown: [
      {
        name: 'Prefabricate',
        path: 'prefabricate',
        element: <Prefabricate />,
      },
      {
        name: 'Assemblies',
        path: 'assemblies',
        element: <Assemblies />,
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
