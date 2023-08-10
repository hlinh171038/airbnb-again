import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(request:Request){
    const body = await request.json();
    const {
        listingId,
        startDate,
        userId,
        endDate,
        totalPrice,
        pet,
        child,
        adult
    } = body;
    // create reservations
    const reservations = await prisma.reservation.create({
        data:{
            listingId,
            startDate,
            endDate,
            userId,
            totalPrice,
            pet,
            child,
            adult
        }
    })
    return NextResponse.json(reservations)
}