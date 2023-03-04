
import { Formik, Form, useField, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from 'yup';
import { russianText } from '../exerciseTable/exerciseTableSlice';
import { englishText } from '../exerciseTable/exerciseTableSlice';
import {changeSignInOrSignUp, user, changeSingOrExercise } from "../sing/singSlice";
import {textModalWindow, showModalWindow} from "../modalWindows/modalWindowsSlice"
import {registration} from "../service/AuthServise.ts";
import { login } from "../service/AuthServise.ts";
import { exercise} from '../service/ExerciseService.ts';

// import {changeSingOrExercise, setName} from "./singSlice";
import "./sing.scss";

/* Функция на основе выбранного языка пользователем формирует либо русский либо английский язык интерфейса */
const Sing = () => {
    /* Используется для функции openClosePassword для скрытия или показа пароля*/
    const [openClosePassord, setOpenClosePassord] = useState("password"); 
    const lang = useSelector(state=> state.language.language); /* Селектор выбранного пользователем языка */
    const signInOrSignUp = useSelector(state => state.sing.signInOrSignUp) /* Селектор выбора регистрации или входа в аккаунт */
    const dispatch = useDispatch();
    
    let text={};
    if(lang === "Russian") {
        text = russianText;
    } else if (lang === "English") {
        text = englishText
    }
        
    /* Функция меняет иконку в input password с открытого на закрытый и обратно и показывает или не показывает введенный пароль.  */
        const openClosePassword = () => {
            if(openClosePassord === "password") {
                setOpenClosePassord("text")
                const eye = document.querySelector(".passord__eye")
                eye.classList.add('passord__eye_open')
            } else {
                setOpenClosePassord("password")
                const eye = document.querySelector(".passord__eye")
                eye.classList.remove('passord__eye_open')
            }
        }
    /* Функция отправки данных пользователя при регистрации или при входе в аккаунт */
        const getDataUser = (payload) => {
            switch (signInOrSignUp) {
                case true:
                        try {
                           registration(payload.email, payload.password)
                                .then(response => {
                                    if(response.status === 200) {
                                        dispatch(textModalWindow(text.registrationAccount))
                                        dispatch(showModalWindow(true))
                                        dispatch(changeSingOrExercise("exerciseInput"))
                                        dispatch(user(response.data.user))
                                        localStorage.setItem('token', response.data.accessToken)
                                        exercise(response.data.user.email)
                                    }
                                })
                                .catch(error => {
                                    dispatch(textModalWindow(error.response?.data?.message))
                                    dispatch(showModalWindow(true))
                                    console.log(error.response?.data?.message)
                                })
                        } catch (error) {
                            console.log(error.response?.data?.message)
                        }
                    
                        
                break;
                case false:
                    try {
                        login(payload.email, payload.password)
                            .then(response => {
                                if(response.status === 200) {
                                    dispatch(textModalWindow(text.enterAccount))
                                    dispatch(showModalWindow(true))
                                    dispatch(changeSingOrExercise("exerciseInput"))
                                    dispatch(user(response.data.user))
                                    localStorage.setItem('token', response.data.accessToken)
                                } else {
                                    console.log(response.data.message)
                                }
                            })
                            .catch(error => {
                                dispatch(textModalWindow(error.response?.data?.message))
                                dispatch(showModalWindow(true))
                                console.log(error.response?.data?.message)
                            })
                            
                    } catch (error) {
                        console.log(error.response?.data?.message)
                        console.log(error)
                    }
                
                    
                break;
            
                default:
                    break;
            }
        }

        /* Функция переключения регистрации или входа в аккаунт */
        const change = () => {
            if(signInOrSignUp) {
                dispatch(changeSignInOrSignUp(false))
            } 
            if(signInOrSignUp === false) {
                dispatch(changeSignInOrSignUp(true))
            }
            
        }

    return (
        <>
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                name: Yup.string().min(2,`${text.nameMin}`),
                email: Yup.string().email(`${text.errorEmail}`).required(`${text.required}`),
                password: Yup.string().min(6, `${text.passwordMin}`).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/, `${text.passwordShema}`)
            })}
            onSubmit={(values, { setSubmitting }) => {
                getDataUser(values)
                setTimeout(() => {
                setSubmitting(false);
                }, 400);
        
        }}
        >
        {({ isSubmitting }) => (
            <Form className='singForm'>
                <div className="nameWrapper">
                    <Link to="/"><div className="input__cross"></div></Link>
                    <div onClick={()=>change()} className="changeSignUpOrSignIn">{signInOrSignUp ? `${text.signUp}` : `${text.signIn}`}</div>
                </div>
                <MyTextField type="email" name="email" classNameInput="input__email" placeholder={`${text.email}`}/>
                <ErrorMessage name="email" component="div" />
                <div className="input__passwordWrapper">
                    <MyTextField type={`${openClosePassord}`} 
                                name="password"  
                                classNameInput="input__password" 
                                placeholder={`${text.password}`} />
                    <div onClick={()=>openClosePassword()} className="passord__eye"></div> {/* Функция меняет иконку в input password с открытого на закрытый и обратно и показывает или не показывает введенный пароль */}
                </div>
                <ErrorMessage name="password" component="div"/>
                <button className="input__btn_small" type="submit" disabled={isSubmitting}>
                    {`${text.button}`}
                </button>
            </Form>
        )}
    </Formik>
        </>
    )
}

/* Компонент формирует панель формы регистрации или входа в программу */
const MyTextField = (props) => {
    const [field, meta] = useField(props);
    return (
        <>
        <div>
                <input
                    {...field}
                    required
                    type={props.type} 
                    name={props.name} 
                    className={props.classNameInput} 
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete}/>
            
        </div>
        {meta.touched && meta.error ? (
          <div className="error"></div>
        ) : null}
      </>
    )
}

export default Sing;