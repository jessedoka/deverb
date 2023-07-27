"use client"

export default async function RProfile(
    {data} : 
    {
        data: {
            full_name: string | null, 
            username: string | null, 
            website: string | null, 
            avatar_url: string | null
        }
    }) {


    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h3>{data.full_name}</h3>
                <h3>{data.username}</h3>
                <h3>{data.website}</h3>
            </div>
        </div>
    )
}

