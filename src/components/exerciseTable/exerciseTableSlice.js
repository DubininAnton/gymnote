import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    date: "",
}

const exerciseTableSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        changeDate: (state, action) => {
            state.date = action.payload;
        }
    }
})

const {reducer, actions} = exerciseTableSlice;

export default reducer;
export const {changeDate} = actions;

/* Переменные хранят информацио о подписях на русском и английских языках */
export const russianText = {
    "name": "Введите Ваше имя",
    "email": "Введите электронную почту",
    "password": "Введите пароль",
    "button": "Отправить",
    "nameMin": "Минимум 2 буквы",
    "errorEmail": "Неправильный формат почты",
    "required": "Обязательное поле",
    "passwordMin": "Минимум 6 символов",
    "passwordShema": "Пароль должен содержать как минимум одну букву в верхнем регистре, одну букву в нижнем регистре и одну цифру",
    "exercise": "Упражнение",
    "repetitions": "Повторений",
    "weight": "Вес, кг",
    "buttonTwo": "Сохранить",
    "approachError": "Только цифры",
    "plusExercise": "Добавить упражнение",
    "plusApproach": "Добавить подход",
    "deleteExercise": "Удалить упражнение",
    "deleteApproach": "Удалить подход"
  }
   export const englishText = {
    "name": "Enter your name",
    "email": "Enter your email",
    "password": "Enter your password",
    "button": "Submit",
    "nameMin": "Min 2 words",
    "errorEmail": "incorrect email format",
    "required": "Required field",
    "passwordMin": "Min 6 simbol",
    "passwordShema": "The password must contain at least one uppercase letter, one lowercase letter and one digit",
    "exercise": "Exercise",
    "repetitions": "Repetitions",
    "weight": "Weight, kg",
    "buttonTwo": "Save",
    "plusExercise": "Add an exercise",
    "plusApproach": "Add an approach",
    "deleteExercise": "Delete an exercise",
    "deleteApproach": "Delete an approach"
  }