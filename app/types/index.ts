import {Comment, Reservation, User} from "@prisma/client"
import { Listing } from "@prisma/client";


export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt:string;
}

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null
}

export type SafeComment = Omit<
Comment,
"createdAt"
>& {
    createdAt:string;
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing
};

export type safeTrips = Omit<
    Listing,
    "createdAt" | "user"
>& {
    createdAt: string;
    user: SafeUser
}

