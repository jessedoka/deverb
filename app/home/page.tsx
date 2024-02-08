"use client"; 
import Link from "next/link"
import Logo from "@/components/logo"
import Sidebar from "@/components/sidebar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"
import { useEffect, useState } from "react"
import { get } from "http";

export default function Home() {
  const supabase = createClientComponentClient<Database>();
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
        console.log(projectsWithProfile);
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
    <div className="grid min-h-screen w-full lg:grid-cols-[400px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] border-b justify-center">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Logo />
            </Link>
          </div>
          <div className="flex justify-center">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex items-center gap-4">

          </div>
        </header>
        <main className="flex">
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Feed</h1>
            </div>
            <div className="flex flex-col gap-4">
              {loading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {projects.map((project: any) => (
                <div key={project.id} className="flex flex-col gap-2 border rounded-md w-[32rem] p-4">
                  <h2 className="font-semibold text-lg">{project.name}</h2>
                  <p>{project.description}</p>
                  <p>{project.profile.username}</p> {/* assuming profile has a property name */}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}