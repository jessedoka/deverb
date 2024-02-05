import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    try {
        if (code) await supabase.auth.exchangeCodeForSession(code)        
    } catch (error) {
        console.error('Error exchanging code for session:', error)
    }

    return NextResponse.redirect(new URL('/settings/profile', req.url))
}