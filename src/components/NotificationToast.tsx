'use client'

import { useNotifications } from '@/lib/notificationContext'
import { X, CheckCircle, XCircle, Info } from 'lucide-react'

export default function NotificationToast() {
    const { notifications, removeNotification } = useNotifications()

    if (notifications.length === 0) return null

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification, idx) => (
                <div
                    key={idx}
                    className={`alert shadow-lg max-w-sm ${notification.type === 'success'
                        ? 'alert-success'
                        : notification.type === 'error'
                            ? 'alert-error'
                            : 'alert-info'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        {notification.type === 'success' && <CheckCircle size={20} />}
                        {notification.type === 'error' && <XCircle size={20} />}
                        {notification.type === 'info' && <Info size={20} />}
                        <span className="text-sm">{notification.message}</span>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    )
}