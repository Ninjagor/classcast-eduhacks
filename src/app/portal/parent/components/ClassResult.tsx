import React from 'react'

interface ClassResultInterface {
    name: string;
    id: string;
}

const ClassResult: React.FC<ClassResultInterface> = ({ name }) => {
  return (
    <div className='w-full flex items-center justify-center py-4 px-5 border-[1px] border-neutral-200 rounded-md relative'>
        <h1 className='text-xl font-semibold trackig-tight'>{name}</h1>
        {/* <p className='text-sm opacity-50 mt-3'>Share this code to parents!</p>
        <div className='mt-2 w-full py-2 px-3 bg-neutral-100 border-[1px] z-[50] relative border-neutral-200 rounded-md cursor-auto'>
            <p className='opacity-50'>{id}</p>
        </div> */}
        <div className='w-full z-[0] h-full absolute top-0 left-0 rounded-md cursor-pointer' />
    </div>
  )
}

export default ClassResult