import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(request:Request){
     const body = await request.json();
     const {id} = body
   
    //deleted
    const deleted = await prisma.listing.delete({
        where:{
            id:id
        }
    });
    return NextResponse.json(deleted);
}