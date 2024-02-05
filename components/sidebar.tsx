"use client";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import { useProfileData } from '@/hooks/useProfiledata';
import { useRouter } from "next/navigation"

export default function Sidebar() {
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    // Use the custom hook here
    const { profileData } = useProfileData('');

    useEffect(() => {
        if (profileData) {
            setId(profileData.id);
            setAvatarUrl(profileData.avatar_url);
            setBannerUrl(profileData.banner_url);
            setFullname(profileData.full_name);
            setUsername(profileData.username);
        }
    }
    ,[profileData]);

    console.log(profileData)

    const signOut = () => {
        supabase.auth.signOut().then(() => {
            window.location.href = '/';
        });
    };

    if (!profileData) {
        // go to /settings/profile to create a profile
       router.push('/settings/profile');
    }

    return (
        <div className="w-[20rem] border rounded-md relative mt-5">
            <div className="border-b  h-24 z-[-1] w-full">
                <Banner uid={""} url={banner_url} size={100} onUpload={(url) => {
                    setBannerUrl(url)
                }} upload={false} className="absolute z-[-1] w-full h-24 object-cover rounded-t-lg"
                /> 
            </div>   
            <div className="flex items-center justify-center my-16">
                <Avatar uid='' url={avatar_url} size={80} onUpload={(url) => {
                    setAvatarUrl(url);
                }} upload={false} className="absolute z-10 rounded-full ring-8 ring-white dark:ring-slate-950 inset-0 mx-auto my-16 object-cover"
                />  
                <h2 className="text-xl font-semibold">{fullname}</h2>
            </div> 

            <div className="flex flex-col items-center gap-4 mb-3">
                <Link href={`/${username}`} className="">
                    Profile
                </Link>
                <button onClick={signOut}>Sign Out</button>
            </div>

        </div>
    );
}

