'use client'
import Image from 'next/image';
import React, { useState } from 'react'

export default function RollOverStateWrapper({src,ftn}) {
    const [isHovered, setIsHovered] = useState(false);
    // console.log('RollOverStateWrapper:',src)
  return (
    <div 
      onClick={ftn}
      className='flex w-auto h-full items-center justify-center cursor-pointer relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className='w-auto h-full' src={isHovered ? src?.hover : src?.default} alt=""/>
    </div>
  )
}