export interface NotificationType {
  id: number
  title?: string
  message?: string | string[]
  status?: NotificationStatus
  symbol?: boolean
  border?: boolean
  closable?: boolean
}

export type NotificationStatus =
  | 'success'
  | 'error'
  | 'warn'
  | 'ready'
  | 'info'
  | 'default'
