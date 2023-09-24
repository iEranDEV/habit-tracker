import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

const prismaAdapter = PrismaAdapter(prisma);

export const authOption: AuthOptions = {
    adapter: prismaAdapter,
    pages: {
        signIn: '/auth/login'
    },
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

                console.log(credentials);

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

                console.log(user);

                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    }, /*
        callbacks: {
            async jwt({ token, user, account }) {
                if (account) {
                    token.accessToken = account.access_token
                    token.id = user?.id
                }
                return token
            },
            async session({ session, user }) {

                if (session.user) {
                    session.user.id = user.id;
                }

                return session
            }
        }
    */
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }