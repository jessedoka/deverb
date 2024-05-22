import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"
import Navbar from "@/components/Navbar";
import Projects  from "@/app/home/Projects";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <Navbar session={session} />
      <div className="flex flex-col">
        <main className="flex"> 
            <Projects />
        </main>
      </div>
    </div>
  )
}