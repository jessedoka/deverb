
import Link from "next/link"
import Logo from "@/components/logo"
import Sidebar from "@/components/sidebar"

export default function Home() {

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
        </header>
        <main className="flex">
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Feed</h1>
            </div>
            <div className="">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">Post 1</h2>
                    <p className="text-sm">This is a post</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">Post 2</h2>
                    <p className="text-sm">This is a post</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-lg">Post 3</h2>
                  <p className="text-sm">This is a post</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-lg">Post 4</h2>
                  <p className="text-sm">This is a post</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-lg">Post 5</h2>
                  <p className="text-sm">This is a post</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-lg">Post 6</h2>
                  <p className="text-sm">This is a post</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}