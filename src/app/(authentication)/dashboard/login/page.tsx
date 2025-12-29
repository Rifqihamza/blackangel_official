'use client'

import { useState } from "react";
import { useAdminLogin } from "@/features/dashboard/useAdminLogin";
import { ArrowRight } from "lucide-react";
export default function AdminLoginPage() {
    const { login, loading, error } = useAdminLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="py-8 px-7 rounded-xl w-full max-w-2xl space-y-6"
            >
                <div className="mb-6 text-(--primary)">
                    <h1 className="text-3xl font-bold font-serif ">
                        Welcome Back...
                    </h1>
                    <p className="text-md">Please enter your email and password.</p>

                </div>
                {error && (
                    <p className="mb-4 text-sm text-red-500">
                        {error}
                    </p>
                )}
                <div className="px-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 px-4 py-2 border border-(--primary) text-(--primary) outline-none rounded-lg"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-3 px-4 py-2 border border-(--primary) text-(--primary) outline-none rounded-lg"
                        required
                    />
                </div>
                <p className="text-xs text-(--secondary)">By login you agree with our <span className="text-(--muted) underline">Terms & Conditions</span></p>
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full bg-(--primary) text-white flex items-center justify-center hover:text-(--primary) hover:bg-(--accent) shadow duration-300 py-2 rounded-lg disabled:opacity-50"
                    >
                        {loading ? <span className="loading"></span> : <span className="flex flex-row items-center gap-1">Sign In <ArrowRight size={15} /></span>}
                    </button>
                </div>
            </form>
        </main>
    )
}
