'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function useAdminLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!res?.ok || res.error) {
                setError("Email atau password salah");
                return false;
            }

            // Wait a bit for session to be established, then check role
            await new Promise(resolve => setTimeout(resolve, 500));

            // Get session to verify admin role
            const sessionRes = await fetch("/api/auth/session");
            const session = await sessionRes.json();

            if (session?.user?.role === "ADMIN") {
                router.replace("/dashboard");
                return true;
            }

            // If not admin, sign out and show error
            await signIn("credentials", { email: "", password: "" }); // This effectively logs out
            setError("Anda bukan admin");
            return false;

        } catch {
            setError("Terjadi kesalahan saat login");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}
