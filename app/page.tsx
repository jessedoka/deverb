'use client'

import Navbar from "@/components/navbar"
import { Database } from "@/lib/database.types"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<any>('')
  const supabase = createClientComponentClient<Database>()

  return (
    <main> 

      <Navbar />

      
    </main>
  )
}
