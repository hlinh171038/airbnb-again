import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'


export async function POST(request:Request) {
    // take data form
    const body = await request.json();

    const {name,email,password} = body;
     
    // hash password
    const hashedPassword = await bcrypt.hash(password,12);
    // create user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    });
    // return 
    return NextResponse.json(user);
}