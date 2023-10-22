import PutAd from '@/components/PutAd'
import PutAdBtn from '@/components/PutAdBtn'
import YourAds from '@/components/YourAds'
import { Inter } from 'next/font/google'
import React from 'react'
import Platform from '@/components/Platform'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [showForm, setShowForm] = React.useState(false);
  const [amAdvertisor, setAmAdvertisor] = React.useState(false);
  return (
    <main
      className={`flex flex-col px-10 ${inter.className} scrollbar-hide`}
    >
      {/* <div className="w-[40px]">
        My Advertisement
      </div> */}
      <div className='flex w-fit mx-auto p-2 '>
        <button className={"bg-primary p-4 rounded-l-lg "
          + (amAdvertisor ? "bg-purple-800" : "bg-primary")}
          onClick={() => setAmAdvertisor(true)}>Awesome Ads</button>
        <button className={'bg-primary p-4 rounded-r-lg '
          + (amAdvertisor ? "bg-primary" : "bg-purple-800")}
          onClick={() => setAmAdvertisor(false)}>Platform Earnings</button>
      </div>
      {amAdvertisor ? <div className='flex flex-col gap-10 p-2 '>

        {showForm ? <PutAd setShowForm={setShowForm} /> : <PutAdBtn setShowForm={setShowForm} />}
        <YourAds />
      </div> :
        <div>
          <Platform />
        </div>}
    </main>
  )
}
