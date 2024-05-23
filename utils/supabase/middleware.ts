import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from "@/lib/database.types"

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // non-authenticated users are redirected to the login page

    if (!user) {
        if (request.nextUrl.pathname !== '/login'
            && request.nextUrl.pathname !== '/register'
            && request.nextUrl.pathname !== '/') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // authenticated users are redirected to the home page

    if (user) {
        if (request.nextUrl.pathname === '/login'
            || request.nextUrl.pathname === '/register'
            || request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/home', request.url))
        }

    }

    return NextResponse.next()
}