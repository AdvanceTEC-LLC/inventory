// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../ATEC UI/Layout'
import ErrorPage from '../ATEC UI/ErrorPage'
import { routes } from './routes'
import { LinkType } from '../../types/link'
import Projects from '../Projects/Projects'

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
      })) ?? []

    return [parentRoute, ...childRoutes]
  })
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ path: '/', element: <Projects /> }, ...generateRoutes(routes)],
  },
])
