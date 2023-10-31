import { Amplify } from 'aws-amplify'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import config from '@/amplifyconfiguration'

const inter = Inter({ subsets: ['latin'] })

Amplify.configure(config as any)

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={`flex flex-col min-h-screen max-w-6xl mx-auto py-4 text-base ${inter.className}`}>
        <nav className='flex justify-between py-1 px-2 bg-orange-400 text-black'>
          <div className="flex gap-2 items-center">
            <Link className="border-black border-2" href="/">
              <h1 className="px-2">orange site</h1>
            </Link>
            <Link className="hover:underline" href="/post/new">
              new post
            </Link>
          </div>
          <div className="flex gap-2 items-center">
          </div>
        </nav>
        <div className='flex flex-col gap-4 py-4 px-2 bg-stone-50'>
          <Component {...pageProps} />
        </div>
      </div>
  )
}