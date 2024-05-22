"use client";
import { useEffect, useState } from "react";
import Link from 'next/link'
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';
import { BellRing, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import { useProfileData } from '@/hooks/useProfiledata';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CardProps = React.ComponentProps<typeof Card>

export default function Sidebar({ className, ...props }: CardProps) {
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    const supabase = createClientComponentClient<Database>();

    // Use the custom hook here
    const { profileData } = useProfileData('');

    useEffect(() => {
        if (profileData) {
            setId(profileData.id);
            setAvatarUrl(profileData.avatar_url);
            setFullname(profileData.full_name);
            setUsername(profileData.username);
            setBannerUrl(profileData.banner_url);
        }
    },[profileData]);


    const signOut = () => {
        supabase.auth.signOut().then(() => {
            window.location.href = '/';
        });
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="aspect-[3/1] w-full object-cover">
                <Banner
                    uid=""
                    url={banner_url}
                    size={120}
                    onUpload={(url) => {
                        setBannerUrl(url);
                    }}
                    upload={false}
                    className='absolute z-0 w-full h-full object-cover'
                />
                {username && (
                    <span className='md:right-10 md:bottom-20 absolute text-9xl font-semibold text-white'>@{username}</span>
                )}
            </div>
            <Card className="relative -mt-12 w-full rounded-none">
                <CardContent className="grid gap-6 p-6">
                    <div className="flex items-center gap-4">
                        <Avatar uid='' url={avatar_url} size={80} onUpload={(url) => {
                            setAvatarUrl(url);
                            }} upload={false} className="rounded-full ring-8 ring-white dark:ring-slate-950"
                        />
                        <div className="grid gap-1">
                            <div className="text-lg font-medium">Jared Palmer</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">@shadcn</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-2xl font-medium">1.2K</div>
                            <div className="text-gray-500 dark:text-gray-400">Posts</div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-2xl font-medium">12.4K</div>
                            <div className="text-gray-500 dark:text-gray-400">Followers</div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-2xl font-medium">1.1K</div>
                            <div className="text-gray-500 dark:text-gray-400">Following</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

