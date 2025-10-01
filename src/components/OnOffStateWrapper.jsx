'use client'
import Image from 'next/image';
import React, { useState } from 'react'

export default function OnOffStateWrapper({src,ftn}) {
    const [isOn, setIsOn] = useState(false);

    // console.log('RollOverStateWrapper:',src)
  return (
    <div 
      onClick={() => setIsOn(!isOn)}
      className='flex w-auto h-full items-center justify-center cursor-pointer relative'
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <img className='w-auto h-full' src={isOn ? src?.hover : src?.default} alt=""/>
    </div>
  )
}