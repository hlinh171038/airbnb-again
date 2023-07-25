import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth,{AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'

export const authOptions:AuthOptions =  ({
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: {label: "Email", type: 'text', placeholder: 'jsmith'},
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // check to see if email and password is there
            if(!credentials?.email || !credentials?.password) {
              throw new Error ('Invalid credentials')
            }

            //if have user and password from form
              // find user (prisma ) coresspond with user (form)
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email
                }
              });


              // check user exist or not
              if(!user || !user?.hashedPassword) {
                throw new Error("Invalid credentials")
              }

              //check password between them
              const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
              )

              // check 
              if(!isCorrectPassword){
                throw new Error('Invalid password')
              }

              return user
          }
        })
      ],
      
      secret: process.env.SECRET,
      session: {
        strategy: 'jwt'
      },
      debug: process.env.NODE_ENV ==='development',
      
     
})

const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}