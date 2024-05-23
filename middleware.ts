
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    


    // update user's auth session
    return await updateSession(request)
}

export const config = {
    matcher: [
        '/settings/profile', 
        '/home', '/login', '/register', 
        '/',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}



