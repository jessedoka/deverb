"use client";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Logo from '@/components/logo';
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';
import { CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useProfileData } from '@/hooks/useProfiledata';

export default function Sidebar() {
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
        <div className="w-[18rem] bg-white dark:bg-gray-900 p-4">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Logo />
                <Card>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center">
                            <Avatar
                                uid=''
                                url={avatar_url}
                                size={48}
                                onUpload={(url) => {
                                    setAvatarUrl(url);
                                }}
                                upload={false}
                                className='z-0 w-full h-full object-cover rounded-full'
                            />
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-lg font-semibold">{fullname}</h2>
                                <h3 className="text-sm font-semibold">@{username}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

