'use client'

import ThreeScene from "@/components/threeScene"
import { Database } from "@/lib/database.types"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

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
      <title>Prodfy</title> 

      {/* flash message */}
      <div>
        {message && (
          <div className={`flex items-center justify-center w-full h-12 px-6 py-2 text-base text-white transition duration-200 ease-in-out rounded-lg ${message[1] === 0 ? 'bg-red-500' : 'bg-green-500'}`}>
            <p>{message[0]}</p>
          </div>
        )}
      </div>
      <div className='hover:bg-[#000000] hover:text-white mt-4 block px-3 py-2 rounded-md text-base ease-in-out duration-300'>
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
        <h1 className="sm:text-9xl text-6xl font-bold text-center">Your <span className="text-orange-500">Production.</span></h1>
      </div>

      {/* show on mobile */}
      <div className="sm:hidden block">
        <ThreeScene />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full z-1">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-bold text-center mb-4">Get notified when we launch</h1>
          <input type="email" required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="sm:w-1/2 h-12 px-6 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="Email" 
          />
          <button
          onClick={handleEmail}
            className="w-1/2 h-12 px-6 py-2 mt-4 text-base font-semibold text-white transition duration-200 ease-in-out bg-black rounded-lg shadow-md hover:text-orange-500 hover:bg-gray-100">Notify Me</button>
        </div>
      </div>
    </main>
  )
}
