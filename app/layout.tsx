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



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb App',
  description: 'Airbnb app clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
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
        </ClientOnly>
        <div className='pb-20 pt-28 '>
          {children}
         
        </div>
        <NavMobile />
        </body>
    </html>
  )
}
