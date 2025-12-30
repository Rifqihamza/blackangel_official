import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdminSideBar from "@/components/AdminComponent/AdminComponent"
import AdminHeader from "@/components/AdminComponent/AdminComponent"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/dashboard/login")
    }

    return (
        <div className="min-h-screen">
            <AdminSideBar />

            <div className="ml-64 flex flex-col">
                <AdminHeader />
                <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    )
}
