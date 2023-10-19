import PutAd from '@/components/PutAd'
import RegisterPlatformButton from '@/components/RegisterPlatform'
import YourAds from '@/components/YourAds'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PutAd />
      <YourAds />
    </main>
  )
}
