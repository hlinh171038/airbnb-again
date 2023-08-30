import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getInformation(){
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return null
    }
    try {
        const information = await prisma.information.findFirst({
            where:{
                userId:currentUser?.id 
            }
           
        });
        if(!information)
        {
            return null
        }
        return information
    } catch (error:any) {
        return null
    }
}