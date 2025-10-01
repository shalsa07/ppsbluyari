'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import RollOverStateWrapper from './RollOverStateWrapper'
import { settings } from '@/libs/settings'
import { usePathname } from 'next/navigation'
import { useExperienceContext } from '@/libs/contextProviders/experienceContext'

export default function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname=usePathname()
  const {closeBtnState,setCloseBtnState}=useExperienceContext()
  // I've removed the empty item from the array to prevent rendering issues.
  const links=['home','about us','projects','services','contacts']

  // console.log('Navbar:',pathname)

  // Helper function to create URL-friendly slugs
  const createSlug = (text) => text.replace(/\s+/g, '-').toLowerCase();

  return (
    <nav className='flex text-white absolute top-2 mx-auto z-50 justify-between w-full h-hit items-start'>
      <Link className='flex flex-1 items-center h-fit' href={'/'}>
        <img className='ml-2' src="/assets/ppsb_luyari_logo.png" alt="" />
      </Link>

      <div className='md:flex hidden h-full mt-4 items-center justify-center text-xs flex-2 gap-5'>
        {links?.map((link) =>
          <Link key={link} className={`hover:border-b-4 ${settings.luyariBlueBorder} h-5 uppercase`} href={link === 'home' ? '/' : `/${createSlug(link)}`}>{link}</Link>
        )}
      </div>

      <div className={`flex-1 relative z-50 flex justify-end`}>
        {closeBtnState && <div className='flex absolute right-16'><RollOverStateWrapper src={settings.btnsImages.btnOpen}/></div>}
        <div className='z-20'>
          <RollOverStateWrapper src={settings.btnsImages.signin_2}/>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nabar-popup absolute z-40 top-0 left-0 w-full text-white h-svh bg-black/90 shadow-sm py-6 md:hidden">
          <div className="flex flex-col items-center mt-20 gap-5">
            {links.map((link, index) => (
              <Link
                key={index}
                className={`hover:border-b-4 h-11 ${settings.luyariBlueBorder} text-sm cursor-pointer uppercase py-2`}
                href={link === 'home' ? '/' : `/${createSlug(link)}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  // handlePageClick(link,index)
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
