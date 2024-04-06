import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import TopBar from './components/TopBar';
import ClassResults from './components/ClassResults';

const EducatorPortal = () => {
  const cookieStore = cookies();
  if (cookieStore.get('role')?.value != "educator") {
    redirect("/portal")
  }
  return (
    <>
      <TopBar />
      <ClassResults />
    </>
  )
}

export default EducatorPortal