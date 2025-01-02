// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout'
import ErrorPage from '../ErrorPage'
import Debug from '../Debug/Debug'
import { links } from './links'
import { LinkType } from '../../types/link'
import Inventory from '../Inventory/Inventory'

const generateRoutes = (links: LinkType[]) => {
  return links.flatMap((parentLink) => {
    const parentRoute = {
      path: `/${parentLink.path}`,
      element: parentLink.element,
    }

    const childRoutes =
      parentLink.dropdown?.map((dropdownLink) => ({
        path: `/${parentLink.path}/${dropdownLink.path}`,
        element: dropdownLink.element ?? parentLink.element,
      })) || []

    return [parentRoute, ...childRoutes]
  })
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Inventory /> },
      { path: '/debug', element: <Debug /> },
      ...generateRoutes(links),
    ],
  },
])
