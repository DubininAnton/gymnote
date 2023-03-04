import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    singOrExercise:"sing", /* exerciseInput устанавливается при входе в аккаунт */
    signInOrSignUp: true,
    user:""
}

const singSlice = createSlice({
    name: "sing",
    initialState,
    reducers: {
        changeSingOrExercise: (state, action) => {
            state.singOrExercise = action.payload;
        },
        user: (state, action) => {
            state.user = action.payload
        },
        
        changeSignInOrSignUp: (state, action) => {
            state.signInOrSignUp = action.payload
        }
    }

})

const {reducer, actions} = singSlice;

export default reducer;
export const {changeSingOrExercise, user, changeSignInOrSignUp} = actions;