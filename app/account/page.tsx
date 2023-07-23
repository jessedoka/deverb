import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import AccountForm from './account-form'
import Navbar from '@/components/navbar'

export default async function Account() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <div>
            <Navbar session={session} />
            <AccountForm session={session} />
        </div>    
    )
}