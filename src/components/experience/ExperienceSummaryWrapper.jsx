'use client'
import React from 'react'
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { settings } from '@/libs/settings'
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import { SiLevelsdotfyi } from "react-icons/si";

export default function ExperienceSummaryWrapper({data,options}) {
    const icons='w-5 h-5'
    const summary=[
        {img:{on:'/assets/360_btn_on.png',off:'/assets/360_btn_off.png'},name:'length',icon:<TbArrowAutofitWidth className={icons} />},
        {img:{on:'/assets/360_btn_off.png',off:'/assets/360_btn_off.png'},name:'width',icon:<TbArrowAutofitHeight className={icons} />},
        {img:{on:'/assets/360_btn_off.png',off:'/assets/360_btn_off.png'},name:'baths',icon:<IoBedOutline className={icons}/>},
        {img:{on:'/assets/360_btn_off.png',off:'/assets/360_btn_off.png'},name:'levels',icon:<SiLevelsdotfyi className={icons}/>}, 
        {img:{on:'/assets/360_btn_off.png',off:'/assets/360_btn_off.png'},name:'cars',icon:<LuBath className={icons}/>}, 
        {img:{on:'/assets/360_btn_off.png',off:'/assets/360_btn_off.png'},name:'beds',icon:<IoCarOutline className={icons}/>}
    ]
  return (
    <div className='flex flex-col h-fit text-xs w-full p-2 gap-2'>
        <div className='flex min-w-72 min-h-40 mt-1 gap-[2px] overflow-hidden'>
            <div className='flex flex-wrap w-2/3 h-full'>   
                {summary?.map((i,index)=>
                    <div key={index} className='flex flex-col items-center justify-center h-1/2 w-1/3 P-2'>
                        <div 
                            className=' text-xs w-full h-full text-gray-500 flex items-center border-[1.5px] border-gray-500 justify-center flex-col bg-white p-[1.25px]'
                        >
                            <div 
                                className=' text-xs w-full h-full text-gray-500 flex items-center border-[1.5px] border-gray-500 justify-center flex-col'
                            >
                                <span className='uppercase text-xs'>{i?.name}</span>
                                <span className='text-xs'>
                                    {data?.buildingSummary?.[i] ? data?.buildingSummary?.[i]:'N/A'}
                                </span>
                                {i?.icon}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={`flex w-1/3 flex-col justify-center h-full`}>
                <div className={`uppercase flex h-1/2 items-center text-xs text-center justify-center ${settings.luyariBlue}`}>
                    from | P2 200 000
                </div>
                <div className={`uppercase h-1/2 text-gray-500 text-center text-xs flex items-center justify-center bg-white`}>
                    enquire
                </div>
            </div>
        </div>
    </div>
  )
}
