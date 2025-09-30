import LinkCard from '@/components/LinkCard'
import PagesWrapper from '@/components/PagesWrapper'
import { buildingDB } from '@/libs/blgDB'
import React from 'react'

export default function page() {
  const filteredBuildings=buildingDB
  console.log('page:',filteredBuildings)
  return (
    <PagesWrapper>
      <div className='flex h-full w-full px-10 flex-wrap overflow-y-auto'>
        {filteredBuildings?.map((project, index) =>
          <div 
            className='p-2 h-[460px] w-full md:w-1/3 lg:w-1/4'
            key={index} 
          >
            <LinkCard 
              project={project} 
              index={index} 
            />
          </div>
        )}
        {filteredBuildings?.map((project, index) =>
          <div 
            className='p-2 h-[460px] w-full md:w-1/3 lg:w-1/4'
            key={index} 
          >
            <LinkCard 
              project={project} 
              index={index} 
            />
          </div>
        )}
      </div>
    </PagesWrapper>
  )
}
