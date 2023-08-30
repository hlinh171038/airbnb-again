import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export  async function POST(request:Request){
    const body = await request.json();
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return null;
    }
    const {
        name,
        email,
        phone,
        address,
        emerency,
        id
    }= body;
    // update 
    const information = await prisma.information.update({
        where:{
            id:id
        },
        data:{
             name,
             email,
             phone,
             address,
             emerency
        }
    });

    return NextResponse.json(information)
}