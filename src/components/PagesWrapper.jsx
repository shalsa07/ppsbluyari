import React from 'react'

export default function PagesWrapper({children}) {
  return (
    <div className='flex w-full h-screen flex-grow items-center justify-center'>
      <div className='flex h-[calc(100%-88px)] mt-4 w-full items-center justify-center overflow-hidden'>
        {children}
      </div>
    </div>
  )
}
