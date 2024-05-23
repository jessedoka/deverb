import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Projects  from "@/app/home/Projects";

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>
      <Navbar user={user} />
      <div className="flex flex-col">
        <main className="flex"> 
            <Projects />
        </main>
      </div>
    </div>
  )
}