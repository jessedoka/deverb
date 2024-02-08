import { useState, useEffect, useCallback } from 'react';
import type { Database } from "@/lib/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ProjectsData = {
    id: string;
    name: string | null;
    description: string | null;
    profile_id: string | null;
} | null;

export function useProjectsData(id: string) {
    const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const supabase = createClientComponentClient<Database>();

    const getProjects = useCallback(async () => {
        try {
            setLoading(true);

            let query = supabase.from('projects').select(`id, name, description, profile_id`);

           if (id) {
                query = query.eq('profile_id', id);
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
                setProjectsData(data);
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [supabase, id]);

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return { projectsData, loading, error };
}