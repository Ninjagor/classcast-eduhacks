"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCookie, deleteCookie } from 'cookies-next'
import { User, ChevronDown } from 'react-feather'

const DefaultNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string| null>(null);
    useEffect(() => {
        const type = getCookie('role');
        const uid = getCookie('uid');
        const token = getCookie('token');
        if (type && uid && token) {
            setIsLoggedIn(() => true);
            setRole(() => type);
        }
        console.log(type, uid, token)
    }, []);
    const logout = () => {
        deleteCookie('token');
        deleteCookie('role');
        deleteCookie('uid');
        window.location.replace('/auth/login')
    }
  return (
    <div className="w-full sticky px-7 py-8 flex items-center justify-center border-b-[1px] border-neutral-200">
        <nav className='w-full max-w-[1000px] flex items-center justify-between'>
            <Link href="/" className="text-2xl font-semibold tracking-tight">Class<span className='text-orange-600'>Cast</span></Link>
            {
                isLoggedIn
                &&
                <div className='relative group'>
                    <div className='flex items-center justify-center gap-3 group'>
                        <div className='flex items-center justify-center bg-neutral-100 rounded-full p-2'>
                            <User opacity={0.3} strokeWidth={2.5}/>
                        </div>
                        <ChevronDown size={17} opacity={0.3} strokeWidth={3} className='group-hover:mt-2 transition-all duration-400'/>
                    </div>
                    <div className='w-fit pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 absolute top-[90%] right-0 transition-all duration-200 group-hover:top-[100%]'>
                        <div className='w-fit py-3 px-2 bg-white border-[1px] border-neutral-200 rounded-md mt-3'>
                            <p className='px-5 text-sm text-nowrap opacity-40'>{role} account</p>
                            <button onClick={logout} className='w-full bg-orange-600 text-white hover:bg-orange-700 text-sm py-2 font-medium mt-4 rounded-md'>Log Out</button>
                        </div>
                    </div>
                </div>
            }
        </nav>
    </div>
  )
}

export default DefaultNavbar