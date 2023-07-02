'use client'

import ThreeScene from "@/components/threeScene"
import { supabase } from '@/util/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const putEmail = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase
      .from('emails')
      .insert([{ email }])
    if (error) {
      // flash error
      console.log(error)
    } else {
      console.log(data)
    }
    setLoading(false)
  }

  const handleEmail = async (e:any) => {
    e.preventDefault()
    setEmail(e.target.value)
    await putEmail(e)
  }

  return (
    <main className="flex flex-col h-screen items-center justify-between p-8">
      <title>Prodfy</title> 
      <div className='hover:bg-[#000000] hover:text-white block px-3 py-2 rounded-md text-base ease-in-out duration-300'>
        <h1 className="text-4xl font-bold text-center">
          Prodfy
        </h1>
      </div>

      {/* hide on mobile */}
      <div className="hidden md:block">
        <ThreeScene />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="sm:text-9xl text-6xl font-bold text-center">One Place.</h1>
        <h1 className="sm:text-9xl text-6xl font-bold text-center">Your Production.</h1>
      </div>

      {/* show on mobile */}
      <div className="sm:hidden block">
        <ThreeScene />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full z-1">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold text-center mb-4">Get notified when we launch</h1>
          <input className="sm:w-1/2 h-12 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Email" />
          <button
          onClick={handleEmail}
          className="w-1/2 h-12 px-6 py-2 mt-4 text-base font-semibold text-white transition duration-200 ease-in-out bg-black rounded-lg shadow-md hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2">Notify Me</button>
        </div>
      </div>
    </main>
  )
}
