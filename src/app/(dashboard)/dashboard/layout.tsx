import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import AdminHeader from '@/components/AdminComponent/AdminHeader'
import AdminSideBar from '@/components/AdminComponent/AdminSidebar'
import DashboardClientProvider from '@/components/AdminComponent/AdminSessionProvider'

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
            <AdminSideBar />
            <div className="ml-64 flex flex-col w-full">
                <AdminHeader />
                <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
                    {/* wrap children dengan client-side SessionProvider */}
                    <DashboardClientProvider>{children}</DashboardClientProvider>
                </main>
            </div>
        </div>
    )
}
