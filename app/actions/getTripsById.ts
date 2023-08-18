import prisma from '@/app/libs/prismadb'

interface IParams {
    tripsId?: string
}

export default async function getTripsById(params:IParams){
    const {tripsId} = params;
    try {
        const trips = await prisma.listing.findUnique({
            where: {
                id: tripsId
            },
            include: {
                user: true
            }

        });
        if(!trips)
        {
            return null;
        }

        return {
            ...trips,
            createdAt: trips.createdAt.toISOString(),
            user: {
                ...trips.user,
                createdAt: trips.user.createdAt.toISOString(),
                updatedAt: trips.user.updatedAt.toISOString(),
                emailVerified: trips.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error:any) {
        throw new Error(error)
    }
}