import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
    <div>
      <Image src="/banner.jpg" width={900} height={1000} alt='image'
        className='object-cover h-screen w-full'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        <SignIn />
      </div>
    </div>
    </>
  )
}