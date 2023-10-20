import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request:Request){
    const body = await request.json();
    const {start, description, id} = body;

    const update = await prisma.comment.update({
        where:{
            id:id
        },
        data:{
            start,
            description
        }
    })
    return NextResponse.json(update);
}