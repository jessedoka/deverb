import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import ProfileForm from './ProfileForm'
import Navbar from '@/components/Navbar'

export default async function Profile({params}: {params: {user: string}}) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return (
        <div className='flex flex-col h-screen'>
            <Navbar session={session}/>
            <ProfileForm session={session} params={params}/>
        </div>
    )
}