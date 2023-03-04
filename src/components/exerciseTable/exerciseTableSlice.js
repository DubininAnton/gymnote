import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { getExercises } from '../service/ExerciseService.ts';

const initialState = {
    date: "",
    inputExercise:"",
    exercises: [],
    stateLoading:"",
    error:"",
    exercisesOrAchievements: true,
    notAchievements: false
}

export const getExercise = createAsyncThunk(
    'exercise/getExercise',
    async (email)=> {
        const data = await getExercises(email)
        return data.data
    }
)

const exerciseTableSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        changeDate: (state, action) => {
            state.date = action.payload;
        },
        exitAccount:(state, action) => {
            state.exercises = [];
            state.stateLoading = "";
            state.error = ""
        },
        deleteExercise: (state, action) => {
            state.exercises = []
        },
        setInputExercise: (state, action) => {
            state.inputExercise = action.payload
        },
        setExercisesOrAchievements: (state, action) => {
            state.exercisesOrAchievements = action.payload 
        },
        setNotAchievements:(state, action) => {
            state.notAchievements = action.payload 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getExercise.pending, (state) => {
            state.stateLoading = true 
        })
        builder.addCase(getExercise.fulfilled, (state, action) => {
            state.exercises = action.payload
            state.stateLoading = null
        })
        builder.addCase(getExercise.rejected, (state) => {
            state.error = true
        })
    }
})

const {reducer, actions} = exerciseTableSlice;

export default reducer;
export const {changeDate, exitAccount, deleteExercise, setInputExercise, setExercisesOrAchievements, setNotAchievements} = actions;






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
    "deleteApproach": "Удалить подход",
    "signIn": "Войти",
    "signUp": "Зарегистрироваться",
    "exitAccount": "Выйти из аккаунта",
    "enterAccount": "Привет. Хорошей тренировки.", 
    "registrationAccount": "Вы зарегистрированы. Удачной тренировки.",
    "errorExercise": "Мы не нашли в базе данного упражнения. Еслы вы ранее уже вполняли данное упражнение проверьте его написание. В базе есть такие упражнения:",
    "achievements":"Достижения",
    "exercises": "Ввод данных",
    "achievementsSelect": "Выберите упражнение",
    "achievementsDateSelect": "Выберите дату",
    "notAchievements": "В нашей базе пока нет достижений, но мы в вас верим. У вас все получится.",
    "achievementsDeleteExercise":"Удалить"
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
    "deleteApproach": "Delete an approach",
    "signIn": "signIn",
    "signUp": "signUp",
    "exitAccount": "Exit accaunt",
    "enterAccount": "Hi. Have a good workout.",
    "registrationAccount": "You are registered. Have a good workout.",
    "errorExercise": "We didn't find this exercise in the database. If you have already completed this exercise before, check its spelling. There are such exercises in the database:",
    "achievements": "Achievements",
    "exercises": "Data enter",
    "achievementsSelect": "Choose exercise",
    "achievementsDateSelect": "Choose date",
    "notAchievements": "There are no achievements in our database yet, but we believe in you. You will succeed.",
    "achievementsDeleteExercise":"Delete"
  }