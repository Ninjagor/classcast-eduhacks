"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface LoadUpdatesInterface {
    classId: string;
}

interface DataDTO {
  updateTitle: string;
  updateDescription: string;
}


const Update: React.FC<DataDTO> = ({ updateDescription, updateTitle }) => {
  return (
    <div className='w-full  border-[1px] px-10 py-5 rounded-md border-neutral-200'>
      <h1 className='text-xl font-semibold tracking-tight'>{updateTitle}</h1>
      <p className='whitespace-pre-line mt-7 opacity-70 w-full bg-neutral-50 rounded-md p-4'>{updateDescription}</p>
    </div>
  )
}

const LoadUpdates: React.FC<LoadUpdatesInterface> = ({ classId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataDTO[] | null>(null);
  useEffect(() => {
    axios.post("/api/update/findmany", {
        classId: classId
    }).then((data) => {
        // eslint-disable-next-line
        const dt = data.data.data.reverse() as DataDTO[]
        setData(() => dt);
        setIsLoading(() => false);
    }).catch((error) => {
        console.error(error);
    })
  }, [])
  return (
    <div className='mt-8'>
        {
            isLoading
            ?
            <p className='opacity-50 text-sm'>Loading...</p>
            :
            <>
            <div className='flex flex-col gap-4 mb-10'>
              {
                data!.map((update, index) => (
                    <Update updateDescription={update.updateDescription} updateTitle={update.updateTitle} key={index} />
                ))
              }
              {
                data!.length == 0
                &&
                <p className='opacity-50 text-md'>No updates have been posted yet.</p>
              }
            </div>
            </>
        }
    </div>
  )
}

export default LoadUpdates