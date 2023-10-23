import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbars/Navbar'
import ClientOnly from './components/ClientOnly'
import Modals from './components/modals/Modals'
import RegisterModal from './components/modals/RegisterModal'

import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import ToasterProvider from './providers/toasterProvider'
import RentModal from './components/modals/RentModal'
import NavMobile from './components/navbars/NavMobile'
import BodyContainer from './components/BodyContainer'
import getListingById from './actions/getListingById'
import getListing, { IListingsParams } from './actions/getListing'
import SearchModal from './components/modals/SearchModal'
import FilterModal from './components/modals/FilterModal'


const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Airbnb App',
  description: 'Airbnb app clone',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
    const session = await getCurrentUser()
  return (

    <html lang="en">
      <body className={inter.className} > 
        <ClientOnly>
          <ToasterProvider />
          <Navbar session={session}/>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <FilterModal />
          <SearchModal />
        </ClientOnly>
        <div className=' pt-19 '>
          {children}
        </div>
        <NavMobile session={session}/>
        </body>
    </html>
  )
}
