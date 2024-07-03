"use client";
import { useCallback, useEffect, useState } from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { ModeToggle } from "./ModeToggle";
import { createClient } from '@/utils/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { data } from 'autoprefixer';

export default function Navbar({ user }: { user: any }) {
    const supabase = createClient();

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


    const menu = user ? [
        { title: 'Home', path: '/' },
        { title: 'Explore', path: '/explore' },
        { title: 'Create', path: '/create' },
        {
            title: <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Avatar className='hover:cursor-pointer hover:p-1 duration-300'>
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
                    <DropdownMenuContent align='center' >
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

        <nav>
            <div className="mx-auto p-5">
                <div className="flex md:justify-between justify-center">
                    <div className='flex items-center space-x-4'>
                        <Link href='/' className={`${!username ? 'pointer-events-none opacity-20 duration-100' : ''}`}>
                            <Logo />
                        </Link>
                    </div>

                    {/* add a div here for a middle section */}

                    {/* desktop view */}
                    <div className='hidden md:block'>
                        <div className='flex space-x-4 items-center'>
                            {menu.map((item, index) => (
                                <Link href={item.path ?? ''} key={index}>
                                    {/* check if child is an image */}
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
                    </div>
                </div>
                {/* mobile view */}
                <div className='md:hidden flex justify-center mt-4 space-x-2'>
                    <ModeToggle />
                    <div className='flex space-x-3'>
                        {menu.map((item, index) => (
                            <Link href={item.path ?? ''} key={index}>
                                {/* check if child is an image */}
                                {typeof item.title === 'string' ? (
                                    <span className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 block transition duration-1000 px-3 py-2 rounded-md font-medium border'>
                                        {item.title}
                                    </span>
                                ) : (
                                    <span className=''>
                                        {item.title}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
