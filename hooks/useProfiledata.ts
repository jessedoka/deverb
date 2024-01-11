import { useState, useEffect, useCallback } from 'react';
import type { Database } from "@/lib/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ProfileData = {
  id: string;
  full_name: string | null;
  username: string | null;
  description: string | null;
  website: string | null;
  avatar_url: string | null;
  banner_url: string | null;
} | null;

export function useProfileData(username: string) {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const supabase = createClientComponentClient<Database>();

    const getProfile = useCallback(async () => {
        try {
        setLoading(true);

        let query = supabase.from('profiles').select(`id, full_name, username, description, website, avatar_url, banner_url`);

        if (username) {
            query = query.eq('username', username);
        } else {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                throw new Error(error.message);
            }

            if (session) {
                query = query.eq('id', session?.user?.id);
            }
        }

        const { data, error, status } = await query.single();

        if (error && status !== 200) {
            throw new Error(error.message);
        }

        if (data) {
            setProfileData(data);
        }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
  }, [supabase, username]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return { profileData, loading, error };
}