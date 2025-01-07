import Nav from '../Nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Body from './Body'
import NotificationList from '../Notifications/NotificationList'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Body>
        <Outlet />
      </Body>
      <NotificationList />
      <Footer />
    </div>
  )
}

export default Layout
