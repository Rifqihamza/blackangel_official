'use client'

import { createContext, useContext, useState, ReactNode, useRef } from 'react'

interface Notification {
    id: string
    type: 'success' | 'error' | 'info'
    message: string
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (type: Notification['type'], message: string) => void
    removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const idCounter = useRef(0)

    const addNotification = (type: Notification['type'], message: string) => {
        const newId = (++idCounter.current).toString()
        const notification: Notification = { id: newId, type, message }
        setNotifications(current => [...current, notification])

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(newId)
        }, 5000)
    }

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}
