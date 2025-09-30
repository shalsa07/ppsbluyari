import { settings } from '@/libs/settings'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex absolute text-white bottom-0 right-0 mx-auto z-50 justify-between w-full h-hit items-center'>
      <div className='flex items-end absolute bottom-0 text-xs right-0 flex-1 gap-2 p-4'>
        powered by
        <img className='md:w-14 w-14 h-auto' src={settings.btnsImages.logoHome.default} alt="" />
        {/* <img className='w-7 h-fit' src={settings.btnsImages.logoFooter.default} alt="" /> */}
      </div>
    </div>
  )
}
