import { useState, useEffect, useCallback } from 'react';
import { createClient } from "@/utils/supabase/client";

type ProfileData = {
  id: string;
  full_name: string | null;
  username: string | null;
  description: string | null;   
  avatar_url: string | null;
  banner_url: string | null;
} | null;

export function useProfileData(username: string) {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const supabase = createClient();

    const getProfile = useCallback(async () => {
        try {
        setLoading(true);

        let query = supabase.from('users').select(`id, full_name, username, description, avatar_url, banner_url`);

        if (username) {
            query = query.eq('username', username);
        } else {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser()

            if (error) {
                throw new Error(error.message);
            }

            if (user) {
                query = query.eq('id', user?.id);
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