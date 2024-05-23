'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData | null, captchaToken: string) {
    const supabase = createClient()

    if (!formData) {
        redirect('/error')
    }

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            captchaToken: captchaToken,
        }
    }

    console.log(data)

    const { error } = await supabase.auth.signInWithPassword(data)
    console.log(error)
    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}