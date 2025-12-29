import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { logger } from "@/server/logger";

/* =========================
   Base session helper
========================= */
export async function getAuthSession() {
    return getServerSession(authOptions);
}

/* =========================
   Require authenticated user
========================= */
export async function requireAuth() {
    const session = await getAuthSession();

    if (!session) {
        logger.security("Unauthorized access (no session)");
        throw new Error("Unauthorized");
    }

    return session;
}

/* =========================
   Require ADMIN role
========================= */
export async function requireAdmin() {
    const session = await requireAuth();

    if (session.user.role !== "ADMIN") {
        logger.security("Unauthorized admin access", undefined, {
            userId: session.user.id,
            role: session.user.role,
        });

        throw new Error("Forbidden");
    }

    return session;
}

/* =========================
   Role-based guard (flexible)
========================= */
export async function requireRole(
    roles: Array<"ADMIN" | "USER">
) {
    const session = await requireAuth();

    if (!roles.includes(session.user.role)) {
        logger.security("Unauthorized role access", undefined, {
            userId: session.user.id,
            role: session.user.role,
            required: roles,
        });

        throw new Error("Forbidden");
    }

    return session;
}

/* =========================
   Optional helpers
========================= */
export async function isAdmin(): Promise<boolean> {
    const session = await getAuthSession();
    return session?.user.role === "ADMIN";
}

export async function getUserId(): Promise<string | null> {
    const session = await getAuthSession();
    return session?.user.id ?? null;
}
