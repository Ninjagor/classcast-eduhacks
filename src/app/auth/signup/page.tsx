"use client";
import React from 'react'
import { User, BookOpen } from 'react-feather'
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  return (
    <main className='flex w-full flex-col gap-12 px-8 items-center justify-center mt-20'>
        <div className='flex flex-col gap-3'>
            <h1 className='text-center text-2xl font-semibold opacity-80 tracking-tight'>Welcome to Class<span className='text-orange-600'>Cast</span></h1>
            <p className='text-center text-md opacity-60'>Let&apos;s get you onboarded. Are you a parent, or an educator?</p>
        </div>
        <div className='flex items-center justify-center gap-7 '>
            <button className='flex flex-col items-center justify-center gap-3  bg-white border-[1px] border-neutral-200 px-11 py-5 rounded-md cursor-pointer group relative hover:border-orange-600 transition-all duration-100' onClick={() => {
                router.push('/auth/signup/parent')
            }}>
                <User size={40} strokeWidth={1.5} className='block transition-all duration-100  group-hover:text-orange-600 group-hover:opacity-100 opacity-50 relative z-[10]'></User>
                <p className='text-md relative z-[10] opacity-50 font-medium group-hover:text-orange-600 group-hover:opacity-100 transition-all duration-100'>I am a parent</p>
                <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-5 transition-all duration-100 rounded-md z-[0]' />
            </button>

            <button className='flex flex-col items-center justify-center gap-3  bg-white border-[1px] border-neutral-200 px-8 py-5 rounded-md cursor-pointer group relative hover:border-orange-600 transition-all duration-100' onClick={() => {
                router.push('/auth/signup/educator')
            }}>
                <BookOpen size={40} strokeWidth={1.5} className='block transition-all duration-100  group-hover:text-orange-600 group-hover:opacity-100 opacity-50 relative z-[10]'></BookOpen>
                <p className='text-md relative z-[10] opacity-50 font-medium group-hover:text-orange-600 group-hover:opacity-100 transition-all duration-100'>I am an educator</p>
                <div className='w-full h-full absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-5 transition-all duration-100 rounded-md z-[0]' />
            </button>
        </div>
    </main>
  )
}

export default SignupPage