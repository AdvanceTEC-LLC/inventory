import ErrorPage from './components/ErrorPage'
import Layout from './components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Shipments from './components/Shipments/Shipments'
import Requests from './components/Requests/Requests'
import Inventory from './components/Inventory/Inventory'
import Debug from './components/Debug/Debug'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/debug', element: <Debug /> },
      { path: '/inventory', element: <Inventory /> },
      { path: '/requests', element: <Requests /> },
      { path: '/shipments', element: <Shipments /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
