import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = (data: User) => {
    return prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            settings: {
                firstDayOfWeek: 1,
                language: 'en',
                modifyDaysPast: true,
                modifyDaysFuture: true
            }
        },
    });
};

export const authOption: AuthOptions = {
    adapter: prismaAdapter,
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
            }

            return session
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }