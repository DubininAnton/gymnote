import $api from "../../hooks/instanceAxios";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
// import { apiExercise } from '../../hooks/instanceAxios';
// import { ExerciseModel } from "../models/ExerciseModel";
// import axios from "axios";

/* Функция для логирования */
export const login = async (email: string, password: string): Promise <AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>('/login', {email, password})      
}

/* Функция регистрации пользователя */
export const registration = async (email: string, password: string): Promise <AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>('/registration', {email, password})      
}

/* Функция выхода пользователя из аккаунта */
export const logout = async (): Promise <void> => {
    return $api.post('/logout')      
}

/* Функция добавления в раздел базы данных Exercise массива зарегестированного пользователя в который в последствии будут записываться его данные */

// export const exercise = async (email: string) => {
//     return apiExercise.post('/exercise', {email})
// }

// export const addNewExercise = async (data: ExerciseModel) => {
//     return apiExercise.put('/addNewExercise', {data})
// }

