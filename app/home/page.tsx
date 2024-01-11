"use client";
import { useEffect, useState } from "react";    
import Link from 'next/link'
import Logo from '@/components/logo';

import { useProfileData } from '@/hooks/useProfiledata';

export default function Account() {
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    // Use the custom hook here
    const { profileData, loading, error } = useProfileData('');

    useEffect(() => {
        if (profileData) {
            setId(profileData.id);
            setAvatarUrl(profileData.avatar_url);
            setBannerUrl(profileData.banner_url);
            setFullname(profileData.full_name);
            setUsername(profileData.username);
            setWebsite(profileData.website);
        }
    }
    , [profileData]);

    console.log(profileData)

    return (
        <div className='flex p-5'>
            <div className='flex-col'>
                {/* logo */}
                <Link href='/home'>
                    <Logo />
                </Link>
                {/* profile info */}
                <div className='border border-white'>
                    {/* profile picture */}
                    {/* username */}
                    {/* bio */}
                    {/* edit profile */}
                </div>
            </div>
            <hr />
            <div>
                {/* feed */}
                {/* list of projects (div) */}
            </div>
            <hr />
            <div>
                {/* search */}
                {/* last viewed projects. */}
                {/* recommed projects*** */}
            </div>
        </div>
    )

}