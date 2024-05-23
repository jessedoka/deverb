import { createClient } from '@/utils/supabase/server'
import ProfileForm from './ProfileForm'
import Navbar from '@/components/Navbar'

export default async function Profile({params}: {params: {user: string}}) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div className='flex flex-col h-screen'>
            <Navbar user={user}/>
            <ProfileForm user={user} params={params}/>
        </div>
    )
}