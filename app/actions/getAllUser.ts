import prisma from '@/app/libs/prismadb'

export async function getAllUser()
{
        try {
            const allUser = await prisma.user.findMany({
                orderBy:{
                    createdAt: 'desc'
                }
            });
            return allUser
        } catch (error:any) {
            throw new Error(error)
        }
}