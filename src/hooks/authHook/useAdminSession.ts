'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ExtendedUser {
    id: string;
    email: string;
    name: string | null;
    role: "USER" | "ADMIN";
}

export default function useAdminSession() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const isLoading = status === "loading";
    const isAdmin = (session?.user as ExtendedUser)?.role === "ADMIN";

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            router.replace("/dashboard/login");
        }
    }, [isLoading, isAdmin, router]);

    return { session, isLoading, isAdmin };
}
