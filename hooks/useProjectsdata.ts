import { useState, useEffect, useCallback } from 'react';
import { createClient } from "@/utils/supabase/client";

type ProjectsData = {
    id: string;
    name: string | null;
    description: string | null;
    author_id: string | null;
} | null;

export function useProjectsData(id: string) {
    const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const supabase = createClient();

    const getProjects = useCallback(async () => {
        try {
            setLoading(true);

            let query = supabase.from('projects').select(`id, name, description, author_id`);

           if (id) {
                query = query.eq('author_id', id);
            } else {
                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();

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