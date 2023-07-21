import Image from 'next/image'
import ClientOnly from './components/ClientOnly'

export default function Home() {
  return (
   <ClientOnly>
      Home
   </ClientOnly>
  )
}
