'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avatar({
    uid,
    url,
    size,
    onUpload,
    upload = true,
    className = '',
    children,
}: {
    uid: string
    url: Profiles['avatar_url']
    size: number
    onUpload: (url: string) => void
    upload?: boolean
    className?: string
    children?: React.ReactNode
}) {
    const supabase = createClientComponentClient<Database>()
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(path)
                if (error) {
                    throw error
                }

                const url = URL.createObjectURL(data)
                setAvatarUrl(url)
            } catch (error) {
                console.log('Error downloading image: ', error)
            }
        }

        if (url) downloadImage(url)
    }, [url, supabase])

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error: any) {
            // alert('Error uploading avatar!')
            alert('Error uploading avatar: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className='flex items-center space-x-5 pt-5'>
            {avatarUrl ? (
                <Image
                    width={size}
                    height={size}
                    src={
                        avatarUrl
                    }
                    alt="Avatar"
                    className={`avatar ${className}`}
                    style={{ height: size, width: size }}
                />
            ) : (
                    <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <UserCircleIcon className="w-full h-full text-gray-300" />
                    </div>
            )}
            {
                upload && (
                    <div>
                        <input
                            type="file"
                            id="avatar"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            accept="image/*"
                            onChange={uploadAvatar}
                            disabled={uploading}
                        />
                    </div>
                )
            }
        </div>
    )
}