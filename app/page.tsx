import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'
import { getListing } from './actions/getListing'
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import getCurrentUser from './actions/getCurrentUser'
import ListingCard from './components/listings/ListingCard'


export default async function Home() {
  //const listing = await getListing();
  const currentUser = await getCurrentUser()

  // if(listing.length === 0)
  // {
  //   return (
  //     <ClientOnly>
  //       <EmptyState showReset />
  //     </ClientOnly>
  //   )
  // }
  
  return (
   <ClientOnly>
      <Container >
       <div
        className='
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
       >
        {/* {listing && listing.map((item:any)=>{
            return (
              <ListingCard
                currentUser = {currentUser}
                key={item.id}
                data ={item}
              />
            )
          })} */}
       </div>
        
      </Container>
   
   </ClientOnly>
  )
}
