import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(request:Request){

    const body = await request.json();
    const {
        userId,
        listingId,
        start,
        description,
        label
    } = body;
    // create comment
    const comments = await prisma.comment.create({
        data:{
            userId,
            listingId,
            start,
            description,
            label
        }
    })
    return NextResponse.json(comments)
}

