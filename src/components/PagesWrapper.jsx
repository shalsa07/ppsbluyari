import React from 'react'

export default function PagesWrapper({children}) {
  return (
    <div className='flex w-full h-screen flex-grow'>
      {children}
    </div>
  )
}
