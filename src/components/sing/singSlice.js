import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";


/* Функция отправки данных при регистрации или при входе в аккаунт */
export const getDataUser = createAsyncThunk(
    "sing/getDataUser",
    (payload)=>{
        const {request} = useHttp();
        return request ("url", "POST", payload)
    }
)

const initialState = {
    singOrExercise:"sing", /* exerciseInput устанавливается при входе в аккаунт */
    userName:""
}

const singSlice = createSlice({
    name: "sing",
    initialState,
    reducers: {
        changeSingOrExercise: (state, action) => {
            state.singOrExercise = action.payload;
        },
        setName: (state, action) => {
            state.userName = action.payload;
        }
    }
})

const {reducer, actions} = singSlice;

export default reducer;
export const {changeSingOrExercise, setName} = actions;