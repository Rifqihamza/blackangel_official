import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import ProviderWrapper from "@/components/SessionProvider/SessionProvider"
import NavigationDashboard from "@/components/DashboardComponent/NavigationDashboard"
import { NotificationProvider } from "@/lib/notificationContext"
import NotificationToast from "@/components/NotificationToast"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <ProviderWrapper>
            <NotificationProvider>
                <div className="flex min-h-screen bg-base-100">
                    {/* Sidebar */}
                    <NavigationDashboard />

                    {/* Main content */}
                    <div className="flex-1 flex flex-col">
                        {/* Header */}
                        <header className="navbar bg-white h-16 sticky top-0 z-10">
                            <div className="navbar-end flex-1">
                                <div className="flex flex-row items-center justify-center px-4 py-1 bg-(--primary)/30 rounded-3xl">
                                    <h2 className="text-md font-semibold text-(--primary)">
                                        {session?.user.name}
                                    </h2>
                                    <div className="avatar placeholder translate-x-3">
                                        <div className="bg-(--primary) flex items-center justify-center rounded-full w-8">
                                            <p className="text-sm text-white">{session?.user.name?.charAt(0).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Page content */}
                        <main className="flex-1 overflow-auto p-6 bg-base-200">
                            {children}
                        </main>
                    </div>
                </div>
                <NotificationToast />
            </NotificationProvider>
        </ProviderWrapper>
    )
}
