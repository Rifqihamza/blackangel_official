import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { adminLoginSchema } from "@/schemas/auth.schema"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },

    providers: [
        Credentials({
            name: "Admin Credentials",
            credentials: {},
            async authorize(credentials) {
                const parsed = adminLoginSchema.safeParse(credentials)
                if (!parsed.success) return null

                const { email, password } = parsed.data

                const user = await prisma.users.findUnique({ where: { email } })
                if (!user) return null
                if (user.role !== "ADMIN") return null

                const valid = await bcrypt.compare(password, user.password)
                if (!valid) return null

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            },
        }),
    ],

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            session.user.role = token.role as "ADMIN" | "USER"
            return session
        },
    },
}
