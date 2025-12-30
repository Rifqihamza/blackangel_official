import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import ProviderWrapper from "@/components/SessionProvider/SessionProvider"
import NavigationDashboard from "@/components/DashboardComponent/NavigationDashboard"

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
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <NavigationDashboard />

                {/* Main content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white [box-shadow:2px_1px_0px_1px_#eaeaea] h-16 flex items-center justify-end px-6 sticky top-0 z-10">
                        <h2 className="text-2xl font-semibold">Hello, {session?.user.name}👋🏻</h2>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-auto p-6 bg-gray-50">
                        {children}
                    </main>
                </div>
            </div>
        </ProviderWrapper>
    )
}
