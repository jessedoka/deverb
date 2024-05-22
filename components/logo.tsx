import Image from "next/image";

export default function Logo({force, className}: {force?: boolean, className?: string}) {
    return (
        // <div>
        //     {
        //         force ? (
        //             <Image src='/deverbl.svg' width={140} height={1} alt="deverb logo light" />
        //         ) : (
        //             <div>
        //                     <div className='dark:hidden'>
        //                         <Image src='/deverbd.svg' width={140} height={1} alt="deverb logo dark" />
        //                     </div>

        //                     {/* show on light mode */}
        //                     <div className='hidden dark:block'>
        //                         <Image src='/deverbl.svg' width={140} height={1} alt="deverb logo light" />
        //                     </div> 
        //             </div>
        //         )
        //     }
        // </div>

        <div>
            <Image src='/delogo.svg' width={40} height={1} alt="deverb logo" className={className}/>
        </div>
    )
}

