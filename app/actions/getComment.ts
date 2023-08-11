import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string
}

export async function getComment(){
    try {

        const comments = await prisma.comment.findMany({
            include: {
                listing: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        const safeComments = comments.map(
            (comment)=>({
                ...comment,
                createdAt: comment.createdAt.toISOString(),
                listing:{
                    ...comment.listing,
                    createdAt:comment.listing.createdAt.toISOString()
                }
            })
        )
        return safeComments
        
    } catch (error:any) {
       throw new Error(error) 
    }
}