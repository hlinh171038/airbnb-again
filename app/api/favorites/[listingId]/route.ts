import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { SafeUser } from "@/app/types";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    listingId:string;
}

export async function POST(
    request:Request,
    {params} :{params:IParams}
) {
    // check currentUser
    const currentUser = await getCurrentUser();
    if(!currentUser)
    {
        return NextResponse.error();
    }

    // retrive params
    const {listingId} = params;

    if(!listingId || typeof listingId !=='string')
    {
        throw new Error("Invalid ID")
    }
    //favorited
    let favorited =[...(currentUser.favoriteIds || [])];
    favorited.push(listingId);

    //update to mongodb
    const user = await prisma.user.update({
        where: {
            id:currentUser.id
        },
        data:{
            favoriteIds:favorited
        }
    });

    return NextResponse.json(user);
}

//delete 
export async function DELETE(
    request:Request,
    {params} :{params:IParams}
) {
    //check currentUser
    const currentUser = await getCurrentUser();
    if(!currentUser)
    {
        return NextResponse.error();
    }
    //take params
    
    const {listingId} = params;
    // check params
    if(!listingId || typeof listingId !== 'string')
    {
        throw new Error("Invalid ID");
    }
    // create favorited
    let favorited = [...(currentUser.favoriteIds || [])];

    favorited = favorited.filter((id)=>id !== listingId);
    // update to mongodb
    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data: {
            favoriteIds: favorited
        }
    });

    return NextResponse.json(user);
}