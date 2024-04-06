"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';

interface LoadUpdatesInterface {
    classId: string;
}

interface DataDTO {
  updateTitle: string;
  updateDescription: string;
}

interface PrimaryDataDTO {
  update: DataDTO;
  // eslint-disable-next-line
  image: any[]
}


const Update: React.FC<PrimaryDataDTO> = ({ update, image }) => {
  return (
    <div className='w-full  border-[1px] px-10 py-5 rounded-md border-neutral-200'>
      <h1 className='text-xl font-semibold tracking-tight'>{update.updateTitle}</h1>
      <p className='whitespace-pre-line mt-7 opacity-70 w-full bg-neutral-50 rounded-md p-4'>{update.updateDescription}</p>
      {
        image
        &&
        <>
          <p className='opacity-50 text-sm mt-5 mb-3'>Image:</p>
          <div className='px-4 py-3 w-full min-h-[200px] max-w-[400px] relative flex items-center justify-start'>
          <Image alt="img" layout="fill" className="object-contain rounded-md bg-neutral-100"
          //eslint-disable-next-line
          // @ts-expect-error
          //eslint-disable-next-line
          src={image.image_url}/>
          </div>
         
        </>
      }
    </div>
  )
}

const LoadUpdates: React.FC<LoadUpdatesInterface> = ({ classId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<PrimaryDataDTO[] | null>(null);
  useEffect(() => {
    axios.post("/api/update/findmany", {
        classId: classId
    }).then((data) => {
        // eslint-disable-next-line
        const dt = data.data.data.reverse() as PrimaryDataDTO[]
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
                    <Update update={update.update} image={update.image} key={index} />
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