import {configureStore} from '@reduxjs/toolkit'
import StateReducer from './states'

export default configureStore({
    reducer: {
        state: StateReducer 
    }
})