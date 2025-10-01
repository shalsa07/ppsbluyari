'use client'
import { useExperienceContext } from '@/libs/contextProviders/experienceContext'
import { ACTIONS_EXPERIENCE } from '@/libs/contextProviders/reducerExperience'
import { settings } from '@/libs/settings';
import React, { useState } from 'react'
import { FaAngleLeft } from "react-icons/fa6";
import Image from 'next/image';
import OnOffStateWrapper from '../OnOffStateWrapper';
import ExperienceInfoWrapper from './ExperienceInfoWrapper';
import ExperienceSummaryWrapper from './ExperienceSummaryWrapper';
import { useRouter } from 'next/navigation';
import RollOverStateWrapper from '../RollOverStateWrapper';

export default function ExperienceUI({
    data,options,styleTopCss,styleCss,styleBtnCss,setExpandContainer,expandContainer,activeBtnIndex,handleHideLevelClick,handleSnapPoint,handleModeClick,handleARModeClick,activate,style360BtnCss,arSupported,virtaulizationState,
}) {
    const {experienceState,experienceDispatch}=useExperienceContext()

    if (experienceState.ARMode) {
        return null
    }

    const router=useRouter()
    const [objectHiddenState,setObjectHiddenState]=useState(false)
    const [levelList,setLevelList]=useState(data?.hideLevel || [])
    const [levelListUpdate,setLevelListUpdate]=useState([])
    const [hideLevelStatus,setHideLevelStatus]=useState(false)
    const cssOnOffBtn=`flex h-full w-8 ${hideLevelStatus ? 'bg-gray-600' : settings.luyariBlue} items-center cursor-pointer justify-center text-xs`

    // console.log('ExperienceUI:',data)

  return (
    <>
        {/* 3D OPTIONS BUTTONS */}
        <div className={`btn-options flex flex-col absolute z-10 mx-auto top-16 w-fit h-fit items-center justify-center text-white`}>
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
        <div className='btn-options fixed flex z-30 right-0 top-0 h-full w-96 bg-slate-600/75 flex-col text-white'>
            <div className={`flex mt-2 justify-start`}>
                {true && <RollOverStateWrapper src={settings.btnsImages.btnClose}/>}
            </div>
            <div className='flex flex-col h-full w-full items-center justify-start pl-4 overflow-y-auto'>
                <h1 className='mt-16 text-3xl uppercase'>
                    {data?.buildingTitle}
                </h1>
                <ExperienceSummaryWrapper data={data} options={options}/>
                <ExperienceInfoWrapper data={data} options={options}/>
            </div>
        </div>

        {/* LEFT UI */}
        {<div className={`btns-left-container flex flex-col gap-1 absolute z-20 top-1/3 left-0 items-end h-fit w-32 duration-300 ease-linear`}>
            {/* EXPAND TOGGLE BUTTON */}
            <div onClick={()=>router.back()} className='flex bg-white items-center justify-center my-auto top-0 bottom-0 -right-5 w-12 h-12  p-[1px] text-gray-500/75 cursor-pointer'>
                <div className='flex flex-col h-full w-full justify-center items-center border-1 border-gray-600'>
                    <FaAngleLeft className='text-4xl'/>
                </div>
                {/* {expandContainer ? <FaAngleLeft/> : <FaAngleRight/>} */}
            </div>
            <div className='flex font-bold relative gap-1 flex-col w-full h-full'>
                {data?.renders?.[0]?.url?.length>0 &&<div className='flex relative w-full h-20 items-center justify-center'>
                    <Image src={data?.renders?.[0]?.url} alt='' fill/>
                </div>}

                {/* LEVEL HIDE BUTTONS */}
                {data?.hideLevel?.map((i,index)=>
                    <div key={index} className='flex relative text-gray-500 items-center justify-center w-fit h-7 uppercase text-xs'>
                        <div key={index} className='flex relative text-gray-500 bg-white items-center justify-center w-fit h-7 pl-8 uppercase text-xs'>
                            <div 
                                // onClick={()=>handleHideLevelClick(i?.name)}
                                className='flex pl-4 min-w-32 items-center h-full'
                            >
                                {i?.name}
                            </div>
                            <div className='flex h-full min-w-fit items-center justify-center text-xs'>
                                <OnOffStateWrapper src={settings.btnsImages.btnOn}/>
                                <OnOffStateWrapper src={settings.btnsImages.btnOff}/>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEWS BUTTONS */}
                {data?.roomSnaps?.length>0 && <div className='flex flex-col gap-1 relative text-gray-500 items-center justify-center w-full h-fit uppercase text-xs'>
                    <div onClick={()=>handleSnapPoint('reset')} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white'>
                        <div className={`border-b-3 w-full text-[#] ${settings.luyariBlueBorder} ${settings.luyariTextBlue}`}>home</div>
                    </div>
                    {data?.roomSnaps?.map((i,index)=>
                        <div onClick={()=>handleSnapPoint(i?.name)} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white' key={index}>
                            <span className='text-center'>{i?.name}</span>
                        </div>
                    )}
                </div>}
            </div>
        </div>}
    </>
  )
}