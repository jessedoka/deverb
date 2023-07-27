import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import Navbar from '@/components/navbar'
import RProfile from './rprofile'

export default async function Profile({ params }: { params: { user: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { data: user, error } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('username', params.user)
        .single()
        console.log(user)

    if (error) {
        throw new Error('Error loading user data!')
    }


    return (
        <div>
            <Navbar session={session} />
            <RProfile data={user} />
        </div>
    )
}

