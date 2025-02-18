// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../ATEC UI/Layout'
import ErrorPage from '../ATEC UI/ErrorPage'
import Debug from '../Debug/Debug'
import { routes } from './routes'
import { LinkType } from '../../types/link'
import Inventory from '../Materials/Materials'

const generateRoutes = (routes: LinkType[]) => {
  return routes.flatMap((parentLink) => {
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
      ...generateRoutes(routes),
    ],
  },
])
