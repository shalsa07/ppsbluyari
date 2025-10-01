'use client'
import React, { useEffect, useRef, useState } from 'react'
import ExperienceGLTFLoader from './ExperienceGLTFLoader'
import { useThree } from '@react-three/fiber'
import GUI from 'lil-gui'
import { useExperienceContext } from '@/libs/contextProviders/experienceContext'

export default function ExperienceModel({data}) {
    const {experienceState}=useExperienceContext()
    const {scene}=useThree()
    const [updateHideLevelState, setUpdateHideLevelState]=useState(false)
    const [updatedObjectsList, setUpdateObjectList]=useState(data?.hideLevel || [])
    const ref = useRef()

    useEffect(() => {
        const gui = new GUI()
        gui.add(ref.current.position, 'x', -100,100)
        gui.add(ref.current.position, 'y', -100,100)
        gui.add(ref.current.position, 'z', -100,100)
        
        return () => {
            gui.destroy()
        }
    }, [])

    useEffect(() => {
        if (data?.position && experienceState?.modelMode) {
            const [x, y, z] = data.position.split(',').map(Number)
            ref.current.position.set(x, y, z)
        }else if(data?.arPosition && experienceState?.ARMode){
            const [x, y, z] = data.arPosition.split(',').map(Number)
            ref.current.position.set(x, y, z)
        }   
    }, [data?.position,data?.arPosition,experienceState?.modelMode,experienceState?.ARMode])

    useEffect(() => {
        experienceState?.hidelevel?.reset && data?.hideLevel?.map(i=>{
            scene.getObjectByName(i.name).visible=true
        })
        handleHideLevel()
    }, [experienceState?.hidelevel])

    const handleHideLevel = () => {
        if(!experienceState?.hidelevel?.nameOfObject) return
        experienceState?.hideleve?.reset && data?.hideLevel?.map(i=>{
            scene.getObjectByName(i.name).visible=true
        })
        const objectMatch=scene?.getObjectByName(experienceState?.hidelevel?.nameOfObject)
        if(objectMatch && objectMatch?.visible){
            setUpdateHideLevelState(true)
            objectMatch.visible=experienceState?.hidelevel?.visible
        }
        else{
            console.log('object not found')
        }
    }
    
    // console.log('ExperienceModel:',updatedObjectsList)
  return (
    <group 
        ref={ref}
    >
        {data?.supportFiles?.map((i,index)=>
            <group key={index} name={i?.name}>
                <ExperienceGLTFLoader path={i}/>
            </group>
        )}
        {data?.hideLevel?.map((i,index)=>
            <group key={index} name={i?.name}>
                <ExperienceGLTFLoader path={i}/>
            </group>
        )}
        {data?.modelsFiles?.map((i,index)=>
            <group key={index}  name={i?.name}>
                <ExperienceGLTFLoader path={i}/>
            </group>
        )}
        <group name={'snapPoints'}>
            {data?.roomSnaps?.map((i,index)=>
                <ExperienceGLTFLoader key={index} path={i} name={i?.name}/>
            )}
        </group>
    </group>
  )
}
