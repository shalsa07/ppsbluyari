import React from 'react'

export default function PagesWrapper({children}) {
  return (
    <div className='flex w-full h-screen flex-grow items-center justify-center'>
      <div className='flex md:h-[calc(100%-88px)] h-[calc(100%-108px)] md:mt-4 mt-8 w-full items-center justify-center overflow-hidden'>
        {children}
      </div>
    </div>
  )
}
