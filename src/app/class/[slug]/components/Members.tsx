"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { User } from 'react-feather';

interface MembersInterface {
    classId: string;
}

interface DataDTO {
    educator: {
        email: string;
        id: string;
        name: string;
    };
    parents: {
        email: string;
        id: string;
        name: string;
    }[];
}

interface MemberInterface {
    email: string;
    id: string;
    name: string;
}

const Member: React.FC<MemberInterface> = ({ email, name }) => {
    return (
        <div className='flex items-center justify-start gap-3'>
            <div className='p-2 bg-neutral-100 rounded-full'>
                <User size={23} strokeWidth={2.5} opacity={0.4} />
            </div>
            <div className='flex flex-col items-start justify-center gap-1'>
                <p className='opacity-70'>{name}</p>
                <p className='text-sm font-medium opacity-50'>{email}</p>
            </div>
        </div>
    )
}

const Members: React.FC<MembersInterface> = ({ classId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line
  const [data, setData] = useState<DataDTO | null>(null);
  useEffect(() => {
    axios.post("/api/class/getmembers", {
        classId: classId
    }).then((data) => {
        console.log(data)
        setData(() => data.data as DataDTO);
        setIsLoading(() => false);
    }).catch((error) => {
        console.error(error);
    })
  }, [])
  return (
    <div className='min-w-[300px] max-w-[300px] flex flex-col items-start gap-3 justify-start  border-l-[1px] pl-8  border-neutral-200'>
        <h1 className='text-2xl font-semibold tracking-tight'>Members</h1>
        {
            isLoading
            ?
            <p className='opacity-50 text-sm'>Loading...</p>
            :
            <>
            <p className='text-sm opacity-50 mt-3'>Educator (1)</p>
            <div className='w-full h-[1px] bg-neutral-200'></div>
            <Member email={data!.educator.email} name={data!.educator.name} id={data!.educator.id}  />
            {/* <div className='w-full h-[1px] bg-neutral-200'></div> */}

            {
                data!.parents.length > 0
                &&
                <>
                <p className='text-sm opacity-50 mt-3'>Parents ({data!.parents.length})</p>
                <div className='w-full h-[1px] bg-neutral-200'></div>
                {
                    data!.parents.map((parent, index) => (
                        <Member email={parent.email} name={parent.name} id={parent.id} key={index} />
                    ))
                }
                </>
            }

            </>
        }
    </div>
  )
}

export default Members