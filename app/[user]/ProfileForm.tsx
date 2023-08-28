'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Database } from "@/lib/database.types";
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Avatar from '@/components/avatar';


export default function ProfileForm({ session, params }: { session: Session | null; params: { user: string; }; }) {
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const session_id = session?.user?.id;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`id, full_name, username, website, avatar_url`)
                .eq('username', params.user)
                .single();

            if (error && status === 406) {
                throw new Error(error.message);
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setId(data.id);
            }
        } catch (error) {
            throw new Error("Error getting profile");
        } finally {
            setLoading(false);
        }
    }, [params.user, supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <div>
            <div className='relative'>
                <div className='h-48 bg-gray-200 dark:bg-gray-800 z-0'>
                    {username && (
                        <span className='right-10 bottom-24 absolute text-7xl font-semibold'>@{username}</span>
                    )}
                </div>
                <div>
                    <div className='px-32 py-5 item-center'>
                        <Avatar
                            uid={params.user}
                            url={avatar_url}
                            size={140}
                            onUpload={(url) => {
                                setAvatarUrl(url);
                            }}
                            upload={false}
                            className='absolute z-10 rounded-full ring-8 ring-white dark:ring-slate-950 bottom-0' />
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-x-5">
                <div className="flex">
                    {fullname && (
                        <span className='text-5xl font-semibold px-32 py-10'>{fullname}</span>
                    )}
                </div>
            </div>



        </div>
    );
}
