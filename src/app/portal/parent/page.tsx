import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ParentPortal = () => {
    const cookieStore = cookies();
    if (cookieStore.get('role')?.value != "parent") {
        redirect("/portal")
    }
  return (
    <div>ParentPortal</div>
  )
}

export default ParentPortal;