'use client'

import { useState } from "react";
import { useAdminLogin } from "@/hooks/dashboard/useAdminLogin";
import { ArrowRight, EyeIcon, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const { login, loading, error } = useAdminLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShow, setIsShow] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login({ email, password })
    }

    const onShowHide = () => {
        setIsShow((prev) => !prev)
    }

    return (
        <main className="bg-(--primary) min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white py-8 px-7 rounded-xl shadow w-full max-w-xl space-y-6"
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
                <div className="px-3 space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg outline-none border-2 border-(--primary) focus:border-(--accent) focus:ring-4 focus:ring-(--primary)/60 transition"
                        required
                    />
                    <div className="relative">
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 rounded-lg outline-none border-2 border-(--primary) focus:border-(--accent) focus:ring-4 focus:ring-(--primary)/60 transition"
                            required
                        />

                        <button
                            type="button"
                            onClick={onShowHide}
                            className="absolute top-0 right-0 translate-y-2 -translate-x-3"
                        >
                            {isShow ? (
                                <EyeIcon size={24} />
                            ) : (
                                <EyeOff size={24} />
                            )}
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="disable:opacity-50 w-full px-4 py-2 bg-(--primary) text-white hover:bg-(--secondary) transition rounded-lg cursor-pointer flex items-center justify-center"
                    >
                        {loading ? "Loading..." : <span className="flex flex-row items-center gap-1">Sign In <ArrowRight size={15} /></span>}
                    </button>
                </div>
            </form>
        </main>
    )
}
