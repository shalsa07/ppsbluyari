'use client'

import React, { createContext, useContext, useReducer } from 'react'
import { INITIAL_EXPERIENCE_STATE, reducerExperienceFunction } from './reducerExperience'

export const ExperienceContext=createContext()  

export default function ExperienceContextProvider({children}) {
    const [experienceState,experienceDispatch]=useReducer(reducerExperienceFunction,INITIAL_EXPERIENCE_STATE)
  return (
    <ExperienceContext.Provider
        value={{
          experienceState,experienceDispatch,
        }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}

export const useExperienceContext=()=>{
    const context = useContext(ExperienceContext)
    if (!context) {
        throw new Error('useExperienceContext must be used within an ExperienceContextProvider')
    }
    return context
}
