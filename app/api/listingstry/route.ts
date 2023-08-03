import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request:Request){
    const currentUser = await getCurrentUser();
    
    
    if(!currentUser ){
        return NextResponse.error();
    }
   // take body
    const body = await request.json();
    const {
        category,
        location ,
        guestCount,
        roomCount,
        bed,
        house,
        who,
        utilities,
        bathroomCount,
        imageSrc,
        type,
        price,
        title,
        description,
    } = body;
    //create listing
    const listings = await prisma.listing.create({
        data:{
            category,
            locationValue:location.value,
            guestCount,
            bed,
            house,
            who,
            utilities,
            roomCount,
            bathroomCount,
            imageSrc,
            type,
            price:parseInt(price,10),
            title,
            description,
            userId: currentUser.id
        }
    });
    return NextResponse.json(listings);
}