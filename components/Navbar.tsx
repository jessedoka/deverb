"use client";
import { useCallback, useEffect, useState } from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { ModeToggle } from "./ModeToggle";
import { Session } from '@supabase/auth-helpers-nextjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Navbar({ session }: { session: Session | null; }) {
    const supabase = createClientComponentClient<Database>();
    const user = session?.user;

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const fetchPP = useCallback(async () => {
        try {
            let { data, error, status } = await supabase
                .from('users')
                .select(`avatar_url, username`)
                .eq('id', user?.id as string)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data?.avatar_url) {
                const path = data.avatar_url;
                try {
                    const { data, error } = await supabase.storage.from('avatars').download(path);
                    if (error) {
                        throw error;
                    }

                    const url = URL.createObjectURL(data);
                    setAvatarUrl(url);
                } catch (error) {
                    console.log('Error downloading image: ', error);
                }

            }

            if (data?.username) {
                setUsername(data.username);
            }
        } catch (error) {
            alert('Error loading user data!');
        }
    }, [user, supabase]);

    useEffect(() => {
        if (user) fetchPP();
    }, [fetchPP, user, username]);

    // signout function that redirects to homepage '/'
    const signOut = () => {
        supabase.auth.signOut().then(() => {
            window.location.href = '/';
        });
    };


    const menu = session ? [
        {
            title: <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='hover:cursor-pointer hover:p-1 hover:bg-neutral-800  duration-300'>
                            {avatarUrl ? (
                                <AvatarImage src={avatarUrl} className='rounded-full' />
                            ) : (
                                <AvatarFallback>
                                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    {/* appear vertically on the right side */}
                    <DropdownMenuContent side='right' className='ml-5'>
                        <DropdownMenuItem>
                            {/* disable if username is null */}
                            <Link href={`/${username}`} className={`${!username ? 'pointer-events-none opacity-20' : ''}`}>
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={signOut}>
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>,
            path: null, // no path for dropdown menu
        },
    ] : [
        { title: 'Login', path: '/login', classname: '' },
    ];

    return (

        <aside className="h-screen fixed left-0 top-0 overflow-auto flex flex-col justify-between p-4 border-r">
            <Link href='/' className={`${!username ? 'pointer-events-none opacity-20 duration-100' : ''}`}>
                <Logo className="hover:p-1 duration-500"/>
            </Link>

            <div className='flex flex-col space-y-4'>
                {menu.map((item, index) => (
                    <Link href={item.path ?? ''} key={index}>
                        {typeof item.title === 'string' ? (
                            <span className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 block transition duration-1000 px-3 py-2 rounded-md font-medium'>
                                {item.title}
                            </span>
                        ) : (
                            <span className=''>
                                {item.title}
                            </span>
                        )}
                    </Link>
                ))}

                <ModeToggle />
            </div>
        </aside>
    );
}
