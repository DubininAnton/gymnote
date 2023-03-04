import { apiExercise } from '../../hooks/instanceAxios';
import { ExerciseModel } from "../models/ExerciseModel";


/* Функция добавления в раздел базы данных Exercise массива зарегестированного пользователя в который в последствии будут записываться его данные */

export const exercise = async (email: string) => {
    return apiExercise.post('/exercise', {email})
}

/* Функция добавления нового упражнения в ранее созданную коллекцию */
export const addNewExercise = async (data: ExerciseModel) => {
    return apiExercise.put('/addNewExercise', {data})
}

/* Функция получения значений подходов и количества повторений из базы данных после ввода его названия в input */
export const getExercises = async (email: string) => {
    return apiExercise.post('/getExercises', {email} )
}

/* Функция удаления упражнения из базы данных */
export const deleteExercise = async (email: string, idExercise: string) => {
    return apiExercise.put('/deleteExercise', {email, idExercise} )
}