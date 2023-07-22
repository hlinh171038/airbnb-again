import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]/route'


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
   <ClientOnly>
      Home
      <h1>{JSON.stringify(session)}</h1>
   </ClientOnly>
  )
}
