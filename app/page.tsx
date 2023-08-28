import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'
import { getListing } from './actions/getListing'
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import getCurrentUser from './actions/getCurrentUser'
import ListingCard from './components/listings/ListingCard'
import Header from './components/Header'
import getReservation from './actions/getReservations'
import { getComment } from './actions/getComment'


export default async function Home() {
  const listing = await getListing();
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
  
  return (
   <ClientOnly>
    {/* <div className="w-full h-auto relative mt-16">
           <div className="w-full h-[300px] absolute top-0 left-0 bg-neutral-950/60 flex items-center justify-center">
              <Header
                  title="Trung tâm trợ giúp"
                  subtitle="Liên hệ chúng tôi bất cứ khi nào bạn cần"
                  big
                  center
                  white
              />
          </div>
          <Image
               src="/title-02.webp"
               width={1000}
               height={1000}
               alt="trips"
               objectPosition="top"
               className="w-full h-[300px] object-cover "
          />
      </div> */}
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
