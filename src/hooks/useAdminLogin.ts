'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAdminLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (!res || res.error) {
            setError("Email atau password salah");
            return false;
        }

        // redirect jika role ADMIN
        const tokenRes = await fetch("/api/auth/session");
        const session = await tokenRes.json();
        if (session?.user?.role === "ADMIN") {
            router.replace("/dashboard");
            return true;
        }

        setError("Anda bukan admin");
        return false;
    };

    return { login, loading, error };
}
