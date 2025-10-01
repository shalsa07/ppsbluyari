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
import OnOffStateWrapper from '../OnOffStateWrapper';
import ExperienceInfoWrapper from './ExperienceInfoWrapper';
import ExperienceSummaryWrapper from './ExperienceSummaryWrapper';

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
    const cssOnOffBtn=`flex h-full w-8 ${hideLevelStatus ? 'bg-gray-600' : settings.luyariBlue} items-center cursor-pointer justify-center text-xs`

    // console.log('ExperienceUI:',data)

  return (
    <>
        {/* 3D OPTIONS BUTTONS */}
        <div className={`btn-options flex flex-col absolute z-20 mx-auto top-16 w-fit h-fit items-center justify-center text-white`}>
            <div className='flex uppercase rounded-full overflow-hidden items-center justify-center w-fit h-fit'>
                {options?.map((i,index)=>
                    <div 
                        // onClick={()=>handleModeClick(index)} 
                        className={`flex w-fit h-fit items-center justify-center`} 
                        key={index} 
                    >
                        {index==0 ? <OnOffStateWrapper src={settings.btnsImages.btnVR}/> : <OnOffStateWrapper src={settings.btnsImages.btnAR}/>}
                    </div>
                )}
            </div>
            <div className='uppercase select-none text-4xl font-thin'>
                model
            </div>
            <div className='flex items-center h-fit w-fit'>
                <OnOffStateWrapper src={settings.btnsImages.btn360}/>
                <OnOffStateWrapper src={settings.btnsImages.btnModel}/>
                <OnOffStateWrapper src={settings.btnsImages.btnDesign}/>
            </div>
            <span className='flex w-2/3 text-center text-xs flex-wrap'>
                Prees and drag with your mouse or finder to rotate the model
            </span>
        </div>

        {/* RIGHT UI */}
        <div className='btn-options fixed flex z-10 right-0 top-0 h-full w-96 bg-slate-600/75 flex-col text-white'>
            <div className='flex flex-col h-full w-full items-center justify-start pl-4 overflow-y-auto'>
                <h1 className='mt-16 text-3xl uppercase'>
                    {data?.buildingTitle}
                </h1>
                <ExperienceSummaryWrapper data={data} options={options}/>
                <ExperienceInfoWrapper data={data} options={options}/>
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