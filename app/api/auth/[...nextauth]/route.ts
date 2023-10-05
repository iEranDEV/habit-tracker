import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = (data: User) => {
    return prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            userSettings: {
                create: {
                    firstDayOfWeek: 1,
                    language: 'en',
                    modifyDaysPast: true,
                    modifyDaysFuture: true,
                }
            }
        },
    });
};

export const authOption: AuthOptions = {
    pages: {
        'signIn': '/auth/login'
    },
    debug: true,
    adapter: prismaAdapter,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'test' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user) {
                    console.log('user not found')
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials!.password, user.password!);
                if (!passwordMatch) {
                    console.log('password doesnt match')
                    return null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24,
    }, callbacks: {
        async jwt({ token, user, account }) {

            if (account) {
                token.accessToken = account.access_token;
                token.id = user?.id;
            }

            return token
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id;
            }

            return session
        }
    }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }