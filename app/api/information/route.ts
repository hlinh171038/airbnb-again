import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json()
    const {name,email,phone,address,emerency} = body;
    // create information
    const informations = await prisma.information.create({
        data:{
            name,
            email,
            phone,
            address,
            emerency,
            userId: currentUser.id
        }
    })

    return NextResponse.json(informations)
}