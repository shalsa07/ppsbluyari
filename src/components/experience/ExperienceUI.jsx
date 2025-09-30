'use client'
import { useExperienceContext } from '@/libs/contextProviders/experienceContext'
import { ACTIONS_EXPERIENCE } from '@/libs/contextProviders/reducerExperience'
import { settings } from '@/libs/settings';
import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import RollOverStateWrapper from '../RollOverStateWrapper';
import { IoMdClose } from "react-icons/io";
import { IoCarOutline } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { SiLevelsdotfyi } from "react-icons/si";
import { LuBath } from "react-icons/lu";
import { TbArrowAutofitWidth } from "react-icons/tb";
import { MdClose } from 'react-icons/md';
import { HiDownload, HiEye, HiX } from 'react-icons/hi';
import Image from 'next/image';

export default function ExperienceUI({
    data,options,styleTopCss,styleCss,styleBtnCss,setExpandContainer,expandContainer,activeBtnIndex,handleHideLevelClick,handleSnapPoint,handleModeClick,handleARModeClick,activate,style360BtnCss,arSupported,virtaulizationState,
}) {
    const {experienceState,experienceDispatch}=useExperienceContext()

    if (experienceState.ARMode) {
        return null
    }

    const [objectHiddenState,setObjectHiddenState]=useState(false)
    const [levelList,setLevelList]=useState(data?.hideLevel || [])
    const [levelListUpdate,setLevelListUpdate]=useState([])
    const [hideLevelStatus,setHideLevelStatus]=useState(false)
    const icons='w-5 h-5'
    const cssOnOffBtn=`flex h-full w-8 ${hideLevelStatus ? 'bg-gray-600' : settings.luyariBlue} items-center cursor-pointer justify-center text-xs`
    const summary=[
        {name:'length',icon:<TbArrowAutofitWidth className={icons} />},
        {name:'width',icon:<TbArrowAutofitHeight className={icons} />},
        {name:'baths',icon:<IoBedOutline className={icons}/>},
        {name:'levels',icon:<SiLevelsdotfyi className={icons}/>}, 
        {name:'cars',icon:<LuBath className={icons}/>}, 
        {name:'beds',icon:<IoCarOutline className={icons}/>}
    ]
    const btnStyles='flex items-center justify-center h-10 w-fit'

    // console.log('ExperienceUI:',data)

  return (
    <>
        {/* 3D OPTIONS BUTTONS */}
        <div className={`btn-options flex flex-col absolute z-20 mx-auto top-16 w-fit h-fit items-center justify-center text-white`}>
            <div className='flex uppercase rounded-full overflow-hidden items-center justify-center w-28 h-10'>
                {options?.map((i,index)=>
                    <div 
                        onClick={()=>handleModeClick(index)} 
                        className={`flex w-1/2 h-full text-center font-bold items-center text-gray-500 justify-center text-nowrap`} 
                        key={index} 
                    >
                        <div className={` flex items-center justify-center w-full h-full cursor-pointer ${!index==activeBtnIndex ? 'bg-gray-300' : 'bg-white'} ${index==0 ? 'pl-1' : 'pr-1'}`}>{i}</div>
                    </div>
                )}
            </div>
            <div className='uppercase select-none text-4xl font-thin'>
                model
            </div>
            <div className='flex items-center h-10 w-fit'>
                <div className={`${settings.luyariBlue} cursor-pointer ${btnStyles}`}>
                    <span className='flex text-sm px-2 items-center'>360</span>
                </div>
                <div className={`bg-gray-400 px-3 cursor-pointer ${btnStyles}`}>
                    <HiOutlineHome/>
                </div>
                <div className={`bg-gray-500 px-3 cursor-pointer ${btnStyles}`}>
                    <IoDocumentTextOutline/>
                </div>
            </div>
            <span className='flex w-2/3 text-center text-xs flex-wrap'>
                Prees and drag with your mouse or finder to rotate the model
            </span>
        </div>

        {/* RIGHT UI */}
        <div className='btn-options fixed flex z-10 right-0 top-0 h-full w-96 bg-black/75 flex-col text-white'>
            <div className='flex w-full h-[52px] items-center justify-end'>
                <div className='flex flex-col text-4xl cursor-pointer mr-2 h-fit w-fit items-center justify-center'>
                    <IoMdClose />
                </div>    
                <div className={`z-50 h-fit`}>
                    <RollOverStateWrapper src={settings.btnsImages.signin_2}/>
                </div>
            </div>
            <div className='h-full w-full flex'>
                <div className='flex flex-col h-[calc(100%-32px)] w-full items-center justify-start pl-4'>
                    <div className='flex flex-col h-fit text-xs w-full p-2 overflow-y-auto gap-2 mb-4'>
                        <h1 className='text-3xl uppercase'>
                            {data?.buildingTitle}
                        </h1>
                        <div className='flex min-w-72 min-h-40 mt-1 overflow-hidden'>
                            <div className='flex flex-wrap w-2/3 h-full'>   
                                {summary?.map((i,index)=>
                                    <div key={index} className='flex flex-col items-center justify-center h-1/2 w-1/3 p-1'>
                                        <div className='bg-white text-xs w-full h-full text-gray-500 flex items-center border-1 border-gray-500 justify-center flex-col'>
                                            <span className='uppercase text-xs'>{i?.name}</span>
                                            <span className='text-xs'>{data?.buildingSummary?.[i] ? data?.buildingSummary?.[i]:'N/A'}</span>
                                            {i?.icon}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={`flex w-1/3 flex-col justify-center h-full p-1`}>
                                <div className={`uppercase flex h-1/2 items-center text-xs text-center justify-center ${settings.luyariBlue}`}>
                                    from | P2 200 000
                                </div>
                                <div className={`uppercase h-1/2 text-gray-500 text-center text-xs flex items-center justify-center bg-white`}>
                                    enquire
                                </div>
                            </div>
                        </div>
                        <p className='uppercase underline'>
                            {data?.buildingType}
                        </p>
                        <p className='text-sm'>{data?.desc}</p>
                        <p className='text-xs'>{data?.features}</p>
                        <div className='flex flex-col w-full gap-1 px-5 py-1'>
                            {data?.buildingHighlights?.map((i,index)=>
                                <div key={index}>
                                    <h1 className='uppercase underline text-sm'>{i?.title}</h1>
                                    <p className='text-xs'>{i?.desc}</p>
                                </div>
                            )}
                        </div>
                        <p className='text-xs mb-5'>{data?.outroSection}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* LEFT UI */}
        {<div className={`btns-left-container flex flex-col gap-1 absolute z-20 top-1/3 left-0 items-end h-fit ${expandContainer ? 'w-44' : 'w-32'} duration-300 ease-linear`}>
            {/* EXPAND TOGGLE BUTTON */}
            <div onClick={()=>setExpandContainer(!expandContainer)} className='flex bg-white items-center justify-center my-auto top-0 bottom-0 -right-5 w-12 h-12  p-[1px] text-gray-500/75 cursor-pointer'>
                <div className='flex flex-col h-full w-full justify-center items-center border-1 border-gray-600'>
                    <FaAngleLeft className='text-4xl'/>
                </div>
                {/* {expandContainer ? <FaAngleLeft/> : <FaAngleRight/>} */}
            </div>
            <div className='flex font-bold relative gap-1 flex-col w-full h-full'>
                {data?.renders?.[0]?.url?.length>0 &&<div className='flex relative w-full h-20 items-center justify-center'>
                    <Image src={data?.renders?.[0]?.url} alt='' fill/>
                </div>}

                {/* 360s BUTTONS */}
                {/* {data?._360sImages?.length>0 && experienceState?._360Mode && <div className={styleCss}>
                    {data?._360sImages?.map((i,index)=>
                        <div onClick={()=>handleHideLevelClick(i?.name)} className={style360BtnCss} key={index}>
                            {!expandContainer ? <div className='h-full w-full overflow-hidden'>
                                <span className='truncate absolute z-10 m-auto text-xs text-nowrap overflow-hidden'>{i?.name}</span>
                                <img className='w-full h-full' src={i?.url} alt="" />
                            </div> : <div className='h-full w-full overflow-hidden'>
                                <img className='w-full h-full' src={i?.url} alt="" />
                                <span className='absolute z-10 m-auto text-xs text-center'>
                                    {i?.name}
                                </span>
                            </div>}
                        </div>
                    )}
                </div>} */}

                {/* LEVEL HIDE BUTTONS */}
                {data?.hideLevel?.map((i,index)=>
                    <div key={index} className='flex relative text-gray-500 items-center justify-center w-full h-7 uppercase text-xs'>
                        <div 
                            onClick={()=>handleHideLevelClick(i?.name)}
                            className='flex w-full items-center justify-start pl-4 h-full bg-white'
                        >
                            {i?.name}
                        </div>
                        <div className='flex absolute left-[132px] h-fullw-fit gap-1 h-full items-center justify-center text-xs'>
                            <div className={cssOnOffBtn}>on</div>
                            <div className={cssOnOffBtn}>off</div>
                        </div>
                    </div>
                )}

                {/* VIEWS BUTTONS */}
                {data?.roomSnaps?.length>0 && <div className='flex flex-col gap-1 relative text-gray-500 items-center justify-center w-full h-fit uppercase text-xs'>
                    <div onClick={()=>handleSnapPoint('reset')} className='flex cursor-pointer w-full items-center justify-start pl-2 h-7 bg-white'>
                        <div className={`border-b-3 w-full text-[#] ${settings.luyariBlueBorder} ${settings.luyariTextBlue}`}>home</div>
                    </div>
                    {data?.roomSnaps?.map((i,index)=>
                        <div onClick={()=>handleSnapPoint(i?.name)} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white' key={index}>
                            <span className='text-center'>{i?.name}</span>
                        </div>
                    )}
                </div>}

                {/* COLOR BUTTONS */}
                {/* {data?.color?.length>0 &&<div className={styleCss}>
                    {data?.color?.map((i,index)=>
                        <div className={styleBtnCss} key={index}>
                            {!expandContainer ? <span className='truncate text-nowrap overflow-hidden'>{i?.name}</span> : <span className='text-center'>{i?.name}</span>}
                        </div>
                    )}
                </div>} */}
            </div>
        </div>}
    </>
  )
}