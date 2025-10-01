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
import { GoChevronLeft } from "react-icons/go";

const LeftUIWrapper = ({children}) => {
  return(
    <div className='flex flex-col gap-1 h-full w-48 overflow-y-auto'>
        <div className='flex flex-col h-fit gap-1 overflow-y-auto'>
            <div className='flex flex-col h-fit gap-1 overflow-y-auto'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default function ExperienceUI({
    data,options,styleTopCss,styleCss,styleBtnCss,setExpandContainer,expandContainer,activeBtnIndex,handleHideLevelClick,handleSnapPoint,handleModeClick,handleARModeClick,activate,style360BtnCss,arSupported,virtaulizationState,
}) {
    const {experienceState,experienceDispatch,closeBtnState,setCloseBtnState}=useExperienceContext()

    if (experienceState.ARMode) {
        return null
    }

    const router=useRouter()
    const [objectHiddenState,setObjectHiddenState]=useState(false)
    const [levelList,setLevelList]=useState(data?.hideLevel || [])
    const [levelListUpdate,setLevelListUpdate]=useState([])
    const [hideLevelStatus,setHideLevelStatus]=useState(false)
    // const [leftUiClose,setLeftUiClose]=useState(false)
    const cssOnOffBtn=`flex h-full w-8 ${hideLevelStatus ? 'bg-gray-600' : settings.luyariBlue} items-center cursor-pointer justify-center text-xs`

    // console.log('ExperienceUI:',data)

  return (
    <>
        {/* 3D OPTIONS BUTTONS */}
        <div className={`middle-btn-ui flex flex-col absolute z-10 mx-auto top-12 left-0 right-0 w-fit h-fit items-center justify-center text-white`}>
            <div className='flex uppercase rounded-full overflow-hidden items-center justify-center w-fit h-fit'>
                {options?.map((i,index)=>
                    <div 
                        // onClick={()=>handleModeClick(index)} 
                        className={`flex w-fit h-fit items-center justify-center`} 
                        key={index} 
                    >
                        {index==0 
                            ?   <OnOffStateWrapper 
                                    state={(experienceState?.modelMode || experienceState?._360Mode)}
                                    src={settings.btnsImages.btnVR}
                                /> 
                            :   <OnOffStateWrapper 
                                    state={experienceState?.ARMode}
                                    src={settings.btnsImages.btnAR}
                                />
                        }
                    </div>
                )}
            </div>
            <div className='uppercase select-none text-4xl font-light'>
                model
            </div>
            <div className='flex items-center h-fit w-fit'>
                <div 
                    onClick={()=>experienceDispatch({type:ACTIONS_EXPERIENCE._360_VIEW})}
                >
                    <OnOffStateWrapper 
                        state={experienceState?._360Mode}
                        src={settings.btnsImages.btn360}
                    />
                </div>
                <div 
                    onClick={()=>experienceDispatch({type:ACTIONS_EXPERIENCE.MODEL_VIEW})}
                >
                    <OnOffStateWrapper 
                        state={experienceState?.modelMode}
                        src={settings.btnsImages.btnModel}
                    />
                </div>
                <div 
                    onClick={()=>experienceDispatch({type:ACTIONS_EXPERIENCE.MODEL_VIEW})}
                >
                    <OnOffStateWrapper 
                        src={settings.btnsImages.btnDesign}
                        state={experienceState?.popupMode}
                    />
                </div>
            </div>
            <span className='flex w-2/3 text-center text-xs flex-wrap'>
                Prees and drag with your mouse or finder to rotate the model
            </span>
        </div>

        {/* RIGHT UI */}
        <div className={`right-btn-ui fixed ease-linear duration-200 flex z-30 right-0 top-0 h-full ${closeBtnState ? 'w-0' : 'md:w-96 w:full'} bg-slate-600/75 flex-col text-white`}>
            <div className={`flex mt-2 z-50 justify-start`}>
                {!closeBtnState && <RollOverStateWrapper src={settings.btnsImages.btnClose} ftn={()=>setCloseBtnState(!closeBtnState)}/>}
            </div>
            <div className='flex flex-col h-full w-full items-center justify-start pl-4 overflow-y-auto'>
                <h1 className='mt-4 text-3xl uppercase'>
                    {data?.buildingTitle}
                </h1>
                <ExperienceSummaryWrapper data={data} options={options}/>
                <ExperienceInfoWrapper data={data} options={options}/>
            </div>
        </div>

        {/* LEFT UI */}
        {<div className={`left-btn-ui flex flex-col gap-1 absolute z-40 top-1/3 left-0 items-end h-fit w-32 duration-300 ease-linear`}>
            <div className='flex font-bold relative gap-1 flex-col w-full h-full'>
                <div className='flex text-gray-500 h-16 items-center justify-end w-full'>
                    <div onClick={()=>router.back()} className='flex items-center justify-center w-16 h-full cursor-pointer bg-white p-[1.25px]'>
                        <div className='flex items-center justify-center w-20 h-full border-[1.5px] border-gray-500 '>
                            <GoChevronLeft className='text-4xl'/>
                        </div>
                    </div>
                </div>

                {/* left menu ui */}
                {data?.renders?.[0]?.url?.length>0 &&<div className='flex relative w-full h-20 items-center justify-center'>
                    <Image src={data?.renders?.[0]?.url} alt='' fill/>
                </div>}

                {experienceState?._360Mode 
                    ?   <div className='flex flex-col gap-1 relative text-gray-500 items-center justify-center w-full h-fit uppercase text-xs'>
                            {/* LEVEL 360 BUTTONS */}
                            {data?._360sImages?.length>0 && 
                                data?._360sImages?.map((i,index)=>
                                <div onClick={()=>handle(i?.name)} className='flex py-1 gap-2 cursor-pointer w-full items-center justify-start text-gray-500 pl-2 h-14 relative bg-white' key={index}>
                                    <div className='flex items-center justify-center w-14 relative overflow-hidden rounded-xl bg-black h-full'>
                                        <Image fill src={i?.url} alt="" />
                                    </div>
                                    <span className={`text-center text-sm border-b-4 ${index==0 ? settings.luyariBlueBorder :'border-gray-400'}`}>360</span>
                                    <span className='text-center mt-1'>{index}</span>
                                </div>
                            )}
                        </div>
                    :   <LeftUIWrapper>
                            {/* LEVEL HIDE BUTTONS */}
                            <div className='flex overflow-y-auto flex-col gap-1 w-full h-fit'>
                                {data?.hideLevel?.map((i,index)=>
                                    <div key={index} className='flex relative text-gray-500 items-center w-fit float-start h-7 uppercase text-xs'>
                                        <div 
                                            className='flex pl-4 min-w-32 items-center bg-white h-full'
                                        >
                                            {i?.name}
                                        </div>
                                        <div 
                                            onClick={()=>handleHideLevelClick(i?.name)}
                                            className='flex h-full w-full items-center justify-center text-xs'
                                        >
                                            <OnOffStateWrapper src={settings.btnsImages.btnOn}/>
                                            <OnOffStateWrapper src={settings.btnsImages.btnOff}/>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* VIEWS BUTTONS */}
                            {data?.roomSnaps?.length>0 && <div className='flex flex-col gap-1 relative text-gray-500 items-center justify-center w-32 h-fit uppercase text-xs'>
                                <div onClick={()=>handleSnapPoint('reset')} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white'>
                                    <div className={`border-b-3 w-full text-[#] ${settings.luyariBlueBorder} ${settings.luyariTextBlue}`}>home</div>
                                </div>
                                {data?.roomSnaps?.map((i,index)=>
                                    <div onClick={()=>handleSnapPoint(i?.name)} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white' key={index}>
                                        <span className='text-center'>{i?.name}</span>
                                    </div>
                                )}
                            </div>}

                            {/* COLORS BUTTONS */}
                            {/* {data?.roomSnaps?.length>0 && <div className='flex flex-col gap-1 relative text-gray-500 items-center justify-center w-full h-fit uppercase text-xs'>
                                <div onClick={()=>handleSnapPoint('reset')} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white'>
                                    <div className={`border-b-3 w-full text-[#] ${settings.luyariBlueBorder} ${settings.luyariTextBlue}`}>home</div>
                                </div>
                                {data?.roomSnaps?.map((i,index)=>
                                    <div onClick={()=>handleSnapPoint(i?.name)} className='flex cursor-pointer w-full items-center justify-start pl-4 h-7 bg-white' key={index}>
                                        <span className='text-center'>{i?.name}</span>
                                    </div>
                                )}
                            </div>} */}
                    </LeftUIWrapper>
                }
            </div>
        </div>}

        {/* sing-in UI */}
        {!closeBtnState && <div className={`left-wrapper top-2 absolute right-0 z-50`}>
            <RollOverStateWrapper src={settings.btnsImages.signin_2}/>
        </div>}
    </>
  )
}