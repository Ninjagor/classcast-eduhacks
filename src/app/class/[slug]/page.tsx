"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import Updates from './components/Updates'
import Members from './components/Members'

export default function CLassPage({ params }: { params: { slug: string } }) {
    useEffect(() => {
        const uid = getCookie("uid");
        if (!uid) {
            window.location.replace("/portal")
        }
        axios.post("/api/class/checkvalidity", {
            id: params.slug,
            uid: uid
            }).then((data) => {
                console.log(data)
            }).catch(() => {
                window.location.replace("/portal")
            })
    }, [])
    return (
        <>
            <div className='flex items-center justify-start gap-2 w-full max-w-[500px]'>
                <Link href="/portal" className='flex items-center justify-start gap-2 hover:underline'>
                    <ArrowLeft size={15} opacity={0.5}/>
                    <p className='text-sm opacity-50 font-medium'>Back to Portal</p>
                </Link>
            </div>
            <div className='mt-12 flex items-start justify-between gap-12'>
                <Updates classId={params.slug}/>
                <Members classId={params.slug} />
            </div>
        </>
    )
}
