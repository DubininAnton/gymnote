import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    textModalWindow:"",
    showModalWindow: false
}

const modalWindowsSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        textModalWindow: (state, action) => {
            state.textModalWindow = action.payload
        },
        showModalWindow: (state, action) => {
            state.showModalWindow = action.payload
        },
    }
})

const {reducer, actions} = modalWindowsSlice;

export default reducer;
export const {textModalWindow, showModalWindow} = actions;