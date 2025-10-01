// import ExperienceModel from '@/components/experience/ExperienceModel'
import PagesWrapper from '@/components/PagesWrapper'
import { buildingDB } from '@/libs/blgDB'
import dynamic from 'next/dynamic'
import React from 'react'

const ExperienceWorld = dynamic(() => import('@/components/experience/ExperienceWorld'))

const getData =async (id) => {
  console.log('getData',id)
  return buildingDB.filter(i=>i._id==id)
}

export default async function page({params}) {
  const {id}=await params
  const dataFetched=await getData(id)
  const data=dataFetched[0]
  // console.log('projects page:',id)
  // console.log('projects page:',data)
  return (
    <PagesWrapper>
      <div className='fixed top-0 left-0 w-full h-full flex-grow'>
        <ExperienceWorld data={data}/>
      </div>
    </PagesWrapper>
  )
}
