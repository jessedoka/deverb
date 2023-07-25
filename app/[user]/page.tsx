import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import Navbar from '@/components/navbar'
import { redirect } from 'next/navigation'

export default async function Profile({ params }: { params: { user: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // const supabase = createServerComponentClient<Database>({ cookies })

    const { data: user, error } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('username', params.user)
        .single()

    if (error) {
        throw new Error('Error loading user data!')
    }


    return (
        <div>
            <Navbar session={session} />
            <div className="container mx-auto">
                user found 
                {user?.username}
            </div>
            <div>
                user full name
                {user?.full_name}
            </div>
        </div>
    )
}

