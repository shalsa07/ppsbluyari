'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import RollOverStateWrapper from './RollOverStateWrapper'
import { settings } from '@/libs/settings'
import { usePathname } from 'next/navigation'
import { useExperienceContext } from '@/libs/contextProviders/experienceContext'
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

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
    <nav className='flex text-white absolute top-2 mx-auto z-20 justify-between w-full h-hit items-start'>
      <Link className='flex flex-1 items-center h-fit z-50' href={'/'}>
        <img className='ml-2 md:w-auto w-[120px] h-full' src="/assets/ppsb_luyari_logo.png" alt="" />
      </Link>

      <div className='md:flex hidden h-full mt-4 items-center justify-center text-xs flex-2 gap-5'>
        {links?.map((link) =>
          <Link key={link} className={`hover:border-b-4 ${settings.luyariBlueBorder} h-5 uppercase`} href={link === 'home' ? '/' : `/${createSlug(link)}`}>{link}</Link>
        )}
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nabar-popup fixed z-50 top-0 left-0 w-full text-white h-svh bg-black/90 shadow-sm py-6 md:hidden">
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

      <div className={`flex-1 flex justify-end`}></div>

      <div className={`left-wrapper md:flex hidden flex-1 absolute right-0 z-50`}>
        <div className='flex w-fit h-fit relative'>
          {closeBtnState && <div 
            onClick={()=>setCloseBtnState(!closeBtnState)}
            className={`flex my-auto w-full h-fit duration-500 ease-linear ${closeBtnState ? 'mr-[72px]' : 'mr-0'}`}
          >
            <RollOverStateWrapper src={settings.btnsImages.btnOpen}/>
          </div>}
          <div className='absolute my-auto top-0 bottom-0 right-0 min-w-fit'>
            <RollOverStateWrapper src={settings.btnsImages.signin_2}/>
          </div>
        </div>
      </div>

      <div className='absolute md:hidden flex items-center justify-center top-0 right-0 min-w-fit z-50'>
        {!mobileMenuOpen 
          ? <IoIosMenu 
              className='md:hidden text-4xl mr-2 cursor-pointer' 
              onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
            /> 
          : <IoIosClose 
              className='md:hidden text-5xl mr-1 cursor-pointer' 
              onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
            />
        }
        <div className='w-fit h-fit'>

        <RollOverStateWrapper src={settings.btnsImages.signin_2}/>
        </div>
      </div>
    </nav>
  )
}
