import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import SidebarDashboard from '@/components/DashboardComponent/SidebarDashboard'
import HeaderDashboard from '@/components/DashboardComponent/HeaderDashboard'
import SessionDashboard from '@/components/DashboardComponent/SessionDashboard'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/dashboard/login')
    }

    return (
        <div className="min-h-screen flex">
            <SidebarDashboard />
            <div className="ml-64 flex flex-col w-full">
                <HeaderDashboard />
                <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
                    {/* wrap children dengan client-side SessionProvider */}
                    <SessionDashboard>{children}</SessionDashboard>
                </main>
            </div>
        </div>
    )
}
