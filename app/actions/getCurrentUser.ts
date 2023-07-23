import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import prisma from '@/app/libs/prismadb'

export async function getSession()
{
    return await getServerSession(authOptions);
}

export default async function getCurrentUser()
{
    try {
        // check session
        const session = await getSession();
        if(!session?.user?.email)
        {
            return null;
        }
        // find unique

        const currentUser = await prisma.user.findUnique({
            where:{
                email: session?.user.email as string
            }
        })

        if(!currentUser)
        {
            return null;
        }
        return currentUser;
    } catch (error) {
        return null
    }
}