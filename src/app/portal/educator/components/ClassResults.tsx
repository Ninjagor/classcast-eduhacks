"use client"
import React, { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next';
import axios from 'axios';
import ClassResult from './ClassResult';

export interface EducatorClassDTO {
    educatorId: string;
    id: string;
    name: string;
}

const ClassResults = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // eslint-disable-next-line
  const [data, setData] = useState<EducatorClassDTO[] | null>(null);
  const [noData, setNoData] = useState<boolean>(false);

  useEffect(() => {
    const uid = getCookie("uid");
    if (!uid) {
        alert("Malformed UID. Please log out and sign back in.");
        return;
    }
    axios.post("/api/class/findmany/educator", {
        id: uid
    }).then((data) => {
        // eslint-disable-next-line
        console.log(data.data.data)
        // eslint-disable-next-line
        setData(() => data.data.data);
        // eslint-disable-next-line
        if (data.data.data.length == 0) {
            setNoData(() => true);
        }
        setIsLoading(() => false);
    }).catch((
        //eslint-disable-next-line
        error: any
    ) => {
        //
        alert(error);
        console.error(error)
    })
  }, [])

  return (
    <>
    <h3 className='mt-12 mb-5 text-xl font-medium tracking-tight'>Classes:</h3>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-7 justify-center items-center gap-y-16'>
        {
            isLoading
            &&
            <p>Loading...</p>
        }
        {
            noData
            &&
            <p>No Classes Found.</p>
        }
        {
            data?.map((classItem, index) => (
                <ClassResult key={index} name={classItem.name} id={classItem.id}/>
            ))
        }
    </div>
    </>
  )
}

export default ClassResults