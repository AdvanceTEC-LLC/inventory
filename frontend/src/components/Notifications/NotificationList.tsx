import React from 'react'
// Notification Redux state
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { NotificationType } from '../../types/notification'
import Notification from './Notification'

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications as NotificationType[]
  )

  if (notifications.length > 0)
    return (
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-y-8">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    )
}

export default NotificationList
