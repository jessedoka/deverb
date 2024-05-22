'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';

import { useProfileData } from '@/hooks/useProfiledata';

export default function ProfileForm({ session, params}: { session: any, params: { user: string }}) {
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const session_id = session?.user?.id;

    // Use the custom hook here
    const { profileData, loading, error } = useProfileData(params.user);

    // Update state when profileData changes
    useEffect(() => {
        if (profileData) {
            setId(profileData.id);
            setAvatarUrl(profileData.avatar_url);
            setBannerUrl(profileData.banner_url);
            setFullname(profileData.full_name);
            setUsername(profileData.username);
        }
    }, [profileData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    

    return (
        <div className={`ml-4 md:ml-[4.5rem] flex-grow`}>
            <div className='relative'>
                <div className='h-48 bg-gray-200 dark:bg-gray-800 z-0 w-full'>
                    <Banner
                        uid={params.user}
                        url={banner_url}
                        size={120}
                        onUpload={(url) => {
                            setBannerUrl(url);
                        }}
                        upload={false}
                        className='absolute z-0 w-full h-full object-cover' 
                    />
                    {username && (
                        <span className='right-2 md:right-10 bottom-5 md:bottom-20 absolute text-2xl md:text-9xl font-semibold text-white'>@{username}</span>
                    )}
                </div>
                <div>
                    <div className='px-2 md:px-8 my-10 item-center ml-3 md:ml-12'>
                        <Avatar
                            uid={params.user}
                            url={avatar_url}
                            size={160}
                            onUpload={(url) => {
                                setAvatarUrl(url);
                            }}
                            upload={false}
                            className='absolute z-10 my-[-3rem] rounded-full ring-8 ring-white dark:ring-slate-950 bottom-0' />
                    </div>
                </div>
            </div>
            
           <div className='flex-col space-y-5'>
                <div className="max-w-[87rem] mx-auto p-5">
                    <div className="flex flex-col md:flex-row md:justify-between items-center ml-5 md:ml-20">

                        {
                            fullname && (
                                <span className='text-4xl font-semibold'>{fullname}</span>
                            )
                        }

                        <div className="flex space-x-5 ">
                            <button className='border rounded-lg p-2 space-x-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 duration-500'>
                                {
                                    session_id === id ? (
                                        <Link href='/settings/profile'>
                                            <span>Settings</span>
                                        </Link>
                                    ) : (
                                        <span>Follow</span>
                                    )
                                }
                            </button>
                            <button>
                                <label>Following</label>
                                <div>0</div>
                            </button>
                            <div className="border-r-2 border-gray-300 dark:border-gray-700">
                            </div>
                            <button>
                                <label>Followers</label>
                                <div>0</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


