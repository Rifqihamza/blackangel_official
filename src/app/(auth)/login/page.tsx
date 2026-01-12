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
        <main className="min-h-screen flex items-center justify-center white">
            <div className="card bg-white rounded-xl shadow-xl w-full max-w-sm">
                <form
                    onSubmit={handleSubmit}
                    className="card-body space-y-6"
                >
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-(--primary) mb-2">
                            Welcome Back...
                        </h1>
                        <p className="text-sm text-(--muted)">Please enter your email and password.</p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-full px-4 py-2 rounded-lg shadow-inner shadow-black/20 focus:shadow-black/30 outline-none transition"
                            required
                        />

                        <div className="relative">
                            <input
                                type={isShow ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-full px-4 py-2 rounded-lg shadow-inner shadow-black/20 focus:shadow-black/30 outline-none transition pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={onShowHide}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-circle btn-sm"
                            >
                                {isShow ? (
                                    <EyeIcon size={16} />
                                ) : (
                                    <EyeOff size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-(--primary) text-white w-full flex flex-row items-center justify-center hover:bg-(--muted) transition cursor-pointer"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <span className="flex flex-row items-center gap-2">
                                Sign In <ArrowRight size={16} />
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </main>
    )
}
