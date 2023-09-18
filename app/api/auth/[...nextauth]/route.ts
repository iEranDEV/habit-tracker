import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

export const authOption: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, user }) {

            if (session.user) {
                session.user.id = user.id;
                delete session.user.image;
            }

            return session
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }