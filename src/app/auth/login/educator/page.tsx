"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import axios from 'axios'
import { setCookie } from 'cookies-next';

const EducatorLoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
  }

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  }

  const LoginAccount = () => {
    try {
        setIsLoading(() => true);
        if (!email || !password) {
            throw new Error("Invalid Inputs.");
        }
        if (!email?.trim() || !password?.trim()) {
            throw new Error("Invalid Inputs.");
        }
        axios.post("/api/account/educator/login", {
            email: email,
            password: password
        }).then((data) => {
            setCookie('role', "educator");
            console.log(data)
            // eslint-disable-next-line
            setCookie('uid', data.data.uid);
            // eslint-disable-next-line
            setCookie('token', data.data.jwt.token);
            window.location.reload();
        }).catch((
            // eslint-disable-next-line
            e: any
        ) => {
            alert(`error ${e}`);
            setIsLoading(() => false);
        })
    } catch(error) {
        setIsLoading(() => false);
        alert(error);
    }
  }

  return (
    <main className='flex w-full flex-col gap-12 px-8 items-center justify-center mt-12'>
        <div className='flex items-center justify-start gap-2 w-full max-w-[500px]'>
            <Link href="/auth/login" className='flex items-center justify-start gap-2 hover:underline'>
                <ArrowLeft size={15} opacity={0.5}/>
                <p className='text-sm opacity-50 font-medium'>Go Back</p>
            </Link>
        </div>

        <h1 className="text-center text-2xl font-semibold opacity-80 tracking-tight">Educator Login</h1>

        <div className='mt-0 flex flex-col gap-8 w-full max-w-[500px]'>
            <div className='w-full flex flex-col gap-2'>
                <p className='opacity-60'>Enter Email*</p>
                <input className='w-full py-2 border-[1px] border-neutral-200 px-4 rounded-md focus:outline-none focus:border-neutral-300' placeholder='Enter Email' onChange={updateEmail}></input>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <p className='opacity-60'>Enter Password*</p>
                <input type='password' className='w-full py-2 border-[1px] border-neutral-200 px-4 rounded-md focus:outline-none focus:border-neutral-300' placeholder='Enter Password' onChange={updatePassword}></input>
            </div>

            <button className={`w-full py-3 px-5 rounded-md bg-orange-600 text-white flex items-center justify-center font-medium hover:bg-orange-700 ${isLoading && "opacity-50 cursor-auto hover:bg-orange-600"}`} disabled={isLoading} onClick={LoginAccount}> 
                {
                    isLoading
                    ?
                    "Loading..."
                    :
                    "Log In"
                }
            </button>
        </div>
    </main>
  )
}

export default EducatorLoginPage