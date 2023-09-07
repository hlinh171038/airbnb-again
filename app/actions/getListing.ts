import prisma from '@/app/libs/prismadb'


export interface IListingsParams {
    guestCount?:number;
    roomCount?:number;
    bed?:number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    price?:number;
    house?: string
}
export default async function getListing(
    params:IListingsParams
){
    try {
        const { 
            guestCount,
            roomCount,
            bathroomCount,
            bed,
            startDate,
            endDate,
            locationValue,
            category,
            house,
            price
            } =params;

        let query: any = {};

        // if(userId){
        //     query.userId = userId;
        // }

        if(category ){
            query.category = category;
        }
        if(roomCount){
            query.roomCount = {
                // + here mean: you trnsform roomCount(params is tring) --> into number
                gte: +roomCount
            }
        }
        if(guestCount){
            query.guestCount = {
                // + here mean: you trnsform roomCount(params is tring) --> into number
                gte: +guestCount
            }
        }
        if(bed){
            query.bed ={
                gte: +bed
            }
        }
        if(price){
            query.price ={
                gte: +price
            }
        }
        if(house){
            query.house=house;
        }
        if(bathroomCount){
            query.bathroomCount = {
                // + here mean: you trnsform roomCount(params is tring) --> into number
                gte: +bathroomCount
            }
        }

        if(locationValue) {
            query.locationValue = locationValue;
        }

        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte:startDate},
                                startDate: {lte: startDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }
        const listings = await prisma.listing.findMany({

            where:query,
            orderBy: {
                createdAt: 'desc'
            }
        });

       
        // const safeListings = listings.map((listing)=>({
        //     ...listing,
        //     createdAt: listing.createdAt.toISOString(),
        // }))
        return listings;
    } catch (
        error:any
        ) {
        throw new Error(error);
    }
}