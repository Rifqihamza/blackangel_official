import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null

                const admin = await prisma.users.findUnique({
                    where: { email: credentials.email },
                })

                if (!admin) return null

                const isValid = await bcrypt.compare(
                    credentials.password,
                    admin.password
                )

                if (!isValid) return null

                return {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            return baseUrl
        },
    },
    pages: { signIn: "/login" }
}
