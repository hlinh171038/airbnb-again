import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


 export  async function POST(request:Request){
    const currentUser = await getCurrentUser();

    if(!currentUser ){
        return NextResponse.error();
    }
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
        night,
        description,
    } = body;
    // create listing 
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
            night,
            userId: currentUser.id
        }
    });
    return NextResponse.json(listings)

 }