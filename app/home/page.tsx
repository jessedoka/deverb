
import Link from "next/link"
import Logo from "@/components/logo"
import Sidebar from "@/components/sidebar"

export default function Account() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[400px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] border-b justify-center">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            {/* profile banner */}
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            
          </div>
        </main>
      </div>
    </div>
  )
}