import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbars/Navbar'
import ClientOnly from './components/ClientOnly'
import Modals from './components/modals/Modals'
import RegisterModal from './components/modals/RegisterModal'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'


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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Navbar session={session}/>
         <RegisterModal />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
