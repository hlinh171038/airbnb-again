import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export async function getListing() {
    // check current user
    try {

        const listing = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return listing;
    } catch (error:any) {
        throw new Error(error);
    }
}