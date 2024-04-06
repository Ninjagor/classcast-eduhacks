import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const EducatorPortal = () => {
  const cookieStore = cookies();
  if (cookieStore.get('role')?.value != "educator") {
    redirect("/portal")
  }
  return (
    <div>EducatorPortal</div>
  )
}

export default EducatorPortal