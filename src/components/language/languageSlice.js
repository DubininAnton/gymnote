import { createSlice } from '@reduxjs/toolkit';


const initialState = { 
    language:""
}

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        language: (state, action) => {
            state.language = action.payload;
        }
    }

})

const {reducer, actions} = languageSlice;

export default reducer;
export const {language} = actions;