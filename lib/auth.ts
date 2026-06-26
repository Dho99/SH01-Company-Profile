import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter: PrismaAdapter(prisma as any),
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.passwordHash) return null;

                const valid = await bcrypt.compare(password, user.passwordHash);
                if (!valid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && "role" in user) {
                token.role = (user as { role: string }).role;
                token.id = (user as { id: string }).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as unknown as Record<string, unknown>).role =
                    token.role;
                (session.user as unknown as Record<string, unknown>).id =
                    token.id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/") return baseUrl + "/admin";
            return url;
        },
    },
});
