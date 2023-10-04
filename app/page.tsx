
import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'
import getListing, { IListingsParams } from './actions/getListing'
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import getCurrentUser from './actions/getCurrentUser'
import ListingCard from './components/listings/ListingCard'
import Header from './components/Header'
import getReservation from './actions/getReservations'
import { getComment } from './actions/getComment'

interface HomeProps {
  searchParams : IListingsParams
}
export const dynamic = 'force-dynamic'
const Home = async ({searchParams}:HomeProps)=> {
  const listing = await getListing(searchParams);
  const currentUser = await getCurrentUser();
  const comment = await getComment()

  if(listing.length === 0)
  {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  //  throw new Error('Something went wrong');
  return (
   <ClientOnly>
      <Container >
       <div
        className='
          pt-[10rem]
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        '
       >
        {listing && listing.map((item:any)=>{
            return (
              <ListingCard
                currentUser = {currentUser}
                key={item.id}
                data ={item}
                comment ={comment}
              />
            )
          })}
       </div>
        
      </Container>
   
   </ClientOnly>
  )
}

export default Home
