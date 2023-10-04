export {default} from 'next-auth/middleware'

export const config = {
    matcher:[
        "/trips",
        "/benefits",
        "/contact",
        "/favorites",
        "/informations",
        "/profiles"
    ]
}