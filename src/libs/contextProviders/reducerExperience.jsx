export const INITIAL_EXPERIENCE_STATE={
    firstPersonView:true,
    _360Mode:true,
    ARMode:false,
    modelMode:false,
    hidelevel:{nameOfObject:'',visible:false},
    snapPoint:''
}

export const ACTIONS_EXPERIENCE={
    FIRST_PERSON_VIEW:'FIRST_PERSON_VIEW',
    _360_VIEW:'_360_VIEW',
    MODEL_VIEW:'MODEL_VIEW',
    AR_VIEW:'AR_VIEW',
    HIDE_LEVEL:'HIDE_LEVEL',
    RESET:'RESET',
    SNAPPOINT:'SNAPPOINT',
}

export const reducerExperienceFunction=(state,action)=>{
      if (!state || !action) {
        console.warn('reducerExperience: Invalid state or action', { state, action });
        return state || INITIAL_EXPERIENCE_STATE;
    }
    switch (action.type) {
        case '_360_VIEW':
            return {
                ...state,
                firstPersonView:true,
                _360Mode:true,
                ARMode: false,
                modelMode:false,
            }
        case 'MODEL_VIEW':
            return {
                ...state,
                firstPersonView:false,
                _360Mode:false,
                ARMode: false,
                modelMode:true,
            }
        case 'AR_VIEW':
            if (state.ARMode) {
                // Exiting AR mode: go back to the default 360 view
                return {
                    ...state,
                    firstPersonView: true,
                    _360Mode: true,
                    ARMode: false,
                    modelMode: false,
                };
            }
            // Entering AR mode
            return {
                ...state,
                firstPersonView:false,
                _360Mode: false,
                ARMode: true,
                modelMode: true,
            }
        case 'HIDE_LEVEL':
            return {
                ...state,
                hidelevel:action.payload,
            }
        case 'RESET':
            return {
                ...state,
                firstPersonView:true,
                _360Mode:true,
                ARMode:false,
                modelMode:false,
            }
        case 'SNAPPOINT':
            return {
                ...state,
                firstPersonView:true,
                snapPoint:action.payload
            }
        default:
            return state;
    }
}
