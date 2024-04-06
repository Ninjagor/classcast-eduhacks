"use client"
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import LoadUpdates from './LoadUpdates';
import ImageUpload from './ImageLoader';

interface UpdatesInterface {
    classId: string;
}

const Updates: React.FC<UpdatesInterface> = ({ classId }) => {
  const [isEducator, setIsEducator] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageBlob, setImageBlob] = useState(null);
  useEffect(() => {
    const role = getCookie("role");
    if (!role) {
        window.location.replace("/");
    }
    if (role == "educator") {
        setIsEducator(() => true); 
    }
  }, []);
  const createUpdate = () => {
    setIsLoading(() => true);
    try {
        if (!content || !title || !content.trim() || !title.trim()) {
            throw new Error("Incomplete Inputs");
        }
        axios.post("/api/update/create", {
            contents: content,
            title: title,
            classId: classId,
            image: imageBlob
        }).then((data) => {
            console.log(data);
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
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(() => e.target.value);
  }
  const updateContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(() => e.target.value);
  }

  return (
    <>

    <div className='w-full'>
        <div className='w-full flex items-center justify-between gap-3'>
            <h1 className='text-2xl font-semibold tracking-tight'>Updates</h1>
            {
                isEducator
                &&
                <button className='bg-orange-600 text-white px-3 py-1.5 cursor-pointer hover:bg-orange-700 font-medium text-sm rounded-md' onClick={() => {
                    setIsModalActive(() => true);
                }}>New Update</button> 
            }
        </div>
        <LoadUpdates classId={classId} />
    </div>

    { 
        isModalActive
        &&
        <div className='w-full h-full fixed top-0 left-0 flex items-center justify-center z-[100]'>
            <div className='absolute w-full h-full  bg-black/20 backdrop-blur-sm' onClick={() => setIsModalActive(() => false)}>
            </div>
            <div className='relative z-[100] flex flex-col items-center justify-center gap-3 min-w-[500px] bg-white px-10 py-10 rounded-md border-[1px] border-neutral-200'>
                <h1 className='text-2xl font-semibold tracking-tight'>Create Update</h1>
                <input placeholder='Enter Update Title' className='w-full border-[1px] border-neutral-200 focus:outline-none rounded-md px-5 py-2 mt-3' onChange={updateTitle}></input>
                <textarea placeholder='Enter Update Content' className='w-full border-[1px] border-neutral-200 max-h-[400px] h-[150px] focus:outline-none rounded-md px-5 py-2 mt-3' onChange={updateContent}></textarea>
                <ImageUpload 
                //eslint-disable-next-line
                imageBlob={imageBlob as any}
                setImageBlob={setImageBlob}
                />
                <button className={`w-full bg-orange-600 py-2 rounded-md text-white font-medium hover:bg-orange-700 ${isLoading && "cursor-auto opacity-50 hover:!bg-orange-600"}`} disabled={isLoading} onClick={createUpdate}>
                    {
                        isLoading 
                        ?
                        "Loading..."
                        :
                        "Create Update"
                    }
                </button>
            </div>
        </div>
        }
    </>
  )
}

export default Updates