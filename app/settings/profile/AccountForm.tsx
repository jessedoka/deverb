'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';


export default function AccountForm({ user }: { user: any }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [banner_url, setBannerUrl] = useState<string | null>(null);
    const [error, setError] = useState(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from('users')
                .select(`full_name, username, description,  avatar_url, banner_url`)
                .eq('id', user?.id as string)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setDescription(data.description);
                setAvatarUrl(data.avatar_url);
                setBannerUrl(data.banner_url);
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({
        username, avatar_url, banner_url, description
    }: {
        username: string | null;
        fullname: string | null;
        avatar_url: string | null;
        banner_url: string | null;
        description: string | null;
    }) {
        try {
            setLoading(true);

            let { error } = await supabase.from('users')
                .upsert(
                    {
                        id: user?.id as string,
                        username,
                        full_name: fullname,
                        avatar_url,
                        banner_url,
                        description
                    }
                )
            if (error) throw error;
            setError(null);

            // reload page
            window.location.reload();
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className='bg-gray-50 dark:bg-zinc-900 p-5'>
            {/* check if an account exists for the user */}
            {!user && (
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold'>You must be signed in to edit your profile</h1>
                </div>
            )}

            {error && (
                <div className="text-red-500 text-sm text-center">
                    {error}
                </div>
            )}
            <div className="flex-col items-center justify-center mx-auto max-w-4xl">
                <div className="border-b border-zinc-900/10 dark:border-zinc-400 pb-12 mb-5">
                    <h2 className="text-base font-semibold leading-7 text-zinc-900 dark:text-white">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-400 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">deverb.com/</span>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white
                                        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="username"
                                        value={username || ''}
                                        onChange={(e) => setUsername(e.target.value)}
                                        
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md bg-white border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                                    defaultValue={description || ''}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <div>
                                    <Avatar
                                        uid={user?.id as string}
                                        url={avatar_url}
                                        size={120}
                                        onUpload={(url) => {
                                            setAvatarUrl(url);
                                            updateProfile({
                                                username,
                                                fullname,
                                           
                                                avatar_url: url,
                                                banner_url,
                                                description
                                            });
                                        }}
                                        
                                        className="rounded-full ring-8 ring-white dark:ring-slate-950"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white mb-4">
                                Cover photo
                            </label>
                            <Banner
                                uid={user?.id as string}
                                url={banner_url}
                                size={500}
                                onUpload={(url) => {
                                    setBannerUrl(url);
                                    updateProfile({
                                        username,
                                        fullname,
                                        avatar_url,
                                        banner_url: url,
                                        description
                                    });
                                }}
                                className="rounded-md ring-8 ring-white dark:ring-slate-950"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 dark:border-gray-400  pb-12 mb-5">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Fullname
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md 
                                    bg-white dark:bg-zinc-900 border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
                                    value={fullname || ''}
                                    onChange={(e) => setFullname(e.target.value)}

                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md 
                                    bg-white text-gray-900 dark:text-white 
                                    border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6 dark:bg-zinc-900"
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="button block bg-red-500 text-white hover:bg-red-600 rounded-md p-2">
                            Sign out
                        </button>
                    </form>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        onClick={() => {
                            updateProfile({
                                username,
                                fullname,
                                avatar_url,
                                banner_url,
                                description
                            });
                        }}
                        disabled={loading}
                    > 
                        {loading ? 'Loading...' : 'Save'}  
                    </button>
                </div>
            </div>
        </main>
    );
}
