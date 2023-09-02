'use client'

import ThreeScene from "@/components/threeScene"
import { Database } from "@/lib/database.types"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  // message: "message", 0
  const [message, setMessage] = useState<any>('')
  const supabase = createClientComponentClient<Database>()

  const handleEmail = async () => {
    try {

      // email regex should except gmail, icloud, hotmail and yahoo

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g


      // email validation
      if (!emailRegex.test(email)) {
        setMessage(['Please enter a valid email address', 0])
        return
      }

      setLoading(true)
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }])
        .single()
      if (error) throw error
      setMessage(['You have been added to the list!'])
    } catch (error: any) {
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col h-screen items-center justify-between p-8"> 

      {/* flash message */}
      <div>
         {/* theme indep */}
        {message && (
          <div className={`flex items-center justify-center w-full h-12 px-6 py-2 text-base text-white transition duration-200 ease-in-out rounded-lg ${message[1] === 0 ? 'bg-red-500' : 'bg-green-500'}`}>
            <p>{message[0]}</p>
          </div>
        )}
      </div>
      <div className='dark:text-white mt-4 flex gap-4 px-3 py-2 rounded-md text-base ease-in-out duration-300'>
        {/* dark: deverbl light:deverbd */}
        {/* show on dark mode */}
        <div className='dark:hidden'>
          <Image src='/deverbd.svg' width={200} height={1} alt="deverb logo dark"/>
        </div>

        {/* show on light mode */}
        <div className='hidden dark:block'>
          <Image src='/deverbl.svg' width={200} height={1} alt="deverb logo light"/>
        </div>

        <ModeToggle/>
      </div>

      {/* hide on mobile */}
      <div className="hidden md:block">
        <ThreeScene x={1} />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="sm:text-9xl text-6xl font-bold text-center">One Place.</h1>
        <h1 className="sm:text-9xl text-6xl font-bold text-center">Your <span className="text-orange-500">Production.</span></h1>
      </div>

      {/* show on mobile */}
      <div className="sm:hidden block">
        <ThreeScene x={2}/>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full z-1">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold text-center mb-4">Get notified when we launch</h1>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <input type="email" required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="sm:w-1/2 h-12 px-6 py-2 bg-[#ffffff] text-base border rounded-lg focus:shadow-outline text-black placeholder:text-black" placeholder="Email"
              />
              <button
                onClick={handleEmail}
                className="w-1/2 h-12 px-6 py-2 mt-4 text-base font-semibold text-white dark:text-black hover:text-orange-500 transition duration-200 ease-in-out rounded-lg shadow-md dark:bg-white bg-slate-700">
                  {loading ? 'Loading...' : 'Notify Me'}
              </button>
            </div>
        </div>
      </div>
    </main>
  )
}
