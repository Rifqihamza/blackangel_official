import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import bcrypt from "bcrypt";
import { withRateLimit, authRateLimitOptions } from "@/server/rateLimit";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    const user = await prisma.users.findUnique({
                        where: { email: credentials.email },
                    });

                    if (!user) return null;

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isValid) return null;

                    // 🔒 normalize Prisma nullable field
                    return {
                        id: String(user.id),
                        email: user.email,
                        name: user.name ?? "",
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/dashboard/login",
        error: "/dashboard/login",
    },
};

const handler = NextAuth(authOptions);

// ✅ RATE LIMITED AUTH ENDPOINTS
export const GET = withRateLimit(handler, authRateLimitOptions);
export const POST = withRateLimit(handler, authRateLimitOptions);
