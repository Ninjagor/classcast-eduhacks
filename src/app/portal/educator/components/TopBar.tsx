"use client";
import React, { useState } from 'react'
import { getCookie } from 'cookies-next';
import axios from "axios";

const TopBar = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [className, setClassName] = useState<string | null>(null);

  const updateClassName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassName(() => e.target.value);
  }

  const createClass = () => {
    try {
        setIsLoading(() => true);
        if (!className?.trim() || !className) {
            throw new Error("Invalid Classname")
        }
        const uid = getCookie('uid');
        if (!uid) {
            throw new Error("Malformed UID. Please logout and sign back in.")
        }
        axios.post("/api/class/create", {
            name: className,
            educatorId: uid
        }).then(() => {
            window.location.reload();
        }).catch((error) => {
            alert(error);
            setIsLoading(() => false);
        })
    } catch(error) {
        alert(error);
        setIsLoading(() => false);
    }
  }

  return (
    <>
        <div className='flex items-center justify-between gap-3'>
            <h1 className='text-2xl opacity-80 font-semibold tracking-tight'>Educator Portal</h1>
            <button className='bg-orange-600 text-white px-3 py-1.5 cursor-pointer hover:bg-orange-700 font-medium text-sm rounded-md' onClick={() => {
                setIsModalActive(() => true);
            }}>New Class</button> 
        </div>
        { 
        isModalActive
        &&
        <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center z-[100]'>
            <div className='absolute w-full h-full  bg-black/20 backdrop-blur-sm' onClick={() => setIsModalActive(() => false)}>
            </div>
            <div className='relative z-[100] flex flex-col items-center justify-center gap-3 min-w-[300px] bg-white px-20 py-10 rounded-md border-[1px] border-neutral-200'>
                <h1 className='text-2xl font-semibold tracking-tight'>Create Class</h1>
                <input placeholder='Enter Class Name' className='w-full border-[1px] border-neutral-200 focus:outline-none rounded-md px-5 py-2 mt-3' onChange={updateClassName}></input>
                <button onClick={createClass} className={`w-full bg-orange-600 py-2 rounded-md text-white font-medium hover:bg-orange-700 ${isLoading && "cursor-auto opacity-50 hover:!bg-orange-600"}`} disabled={isLoading}>
                    {
                        isLoading 
                        ?
                        "Loading..."
                        :
                        "Create Class"
                    }
                </button>
            </div>
        </div>
        }
    </>
  )
}

export default TopBar