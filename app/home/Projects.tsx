"use client";
import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

const Projects = () => {
    const supabase = createClientComponentClient<Database>()

    // get all projects from projects table
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // get user from profile id
    const getProfile = async (id: string) => {
        try {
            const { data, error, status } = await supabase.from('users').select('*').eq('id', id).single();
            if (error && status !== 406) {
                throw new Error(error.message);
            }
            if (data) {
                return data;
            }
        } catch (error) {
            setError(error as Error);
        }
    }

    const getProjects = async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase.from('projects').select('*');
            if (error && status !== 406) {
                throw new Error(error.message);
            }
            if (data) {
                const projectsWithProfile = await Promise.all(data.map(async (project: any) => {
                    const profile = await getProfile(project.author_id); // assuming project has a property profileId
                    return { ...project, profile };
                }));
                setProjects(projectsWithProfile);
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 items-center">
            <div className="flex flex-col gap-4">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                {projects.map((project: any) => (
                    <div key={project.id} className="flex flex-col gap-2 border rounded-md w-[32rem] p-4">
                        {/* <p>{project.profile.username}</p> 
                        <h2 className="font-semibold text-lg">{project.name}</h2>
                        <p>{project.description}</p> */}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Projects;

