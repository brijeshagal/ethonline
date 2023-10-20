import PutAd from '@/components/PutAd'
import PutAdBtn from '@/components/PutAdBtn'
import RegisterPlatformButton from '@/components/RegisterPlatform'
import YourAds from '@/components/YourAds'
import { Inter } from 'next/font/google'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showForm, setShowForm] = React.useState(false);
  const [amAdvertisor, setAmAdvertisor] = React.useState(true);
  return (
    <main
      className={`flex flex-col px-10 ${inter.className} scrollbar-hide`}
    >
      <div className='flex w-fit mx-auto p-2 '>
        <button className={"bg-purple-600 p-4 rounded-l-lg "
          + (amAdvertisor ? "bg-purple-800" : "bg-purple-600")}
          onClick={() => setAmAdvertisor(true)}>Ads</button>
        <button className={'bg-purple-600 p-4 rounded-r-lg '
          + (amAdvertisor ? "bg-purple-600" : "bg-purple-800")}
          onClick={() => setAmAdvertisor(false)}>Platform Earnings</button>
      </div>
      {amAdvertisor ? <div>

        {showForm ? <PutAd setShowForm={setShowForm} /> : <PutAdBtn setShowForm={setShowForm} />}
        <YourAds />
      </div> :
        <div>
          <RegisterPlatformButton />
        </div>}
    </main>
  )
}
