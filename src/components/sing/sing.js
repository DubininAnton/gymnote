
import { Formik, Form, useField, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import * as Yup from 'yup';
import { russianText } from '../exerciseTable/exerciseTableSlice';
import { englishText } from '../exerciseTable/exerciseTableSlice';
import {changeSingOrExercise, setName} from "./singSlice";
import "./sing.scss";

/* Функция на основе выбранного языка пользователем формирует либо русский либо английский язык интерфейса */
const Sing = () => {
    /* Используется для функции openClosePassword для скрытия или показа пароля*/
    const [openClosePassord, setOpenClosePassord] = useState("password"); 
    /* Используется для переключения между инпутами регистрации (строка sing) и ввода данных по упражнениям (строка exerciseInput) */
    // const [singOrPhysicalManagement, setSingOrPhysicalManagement] = useState("sing") 
    const lang = useSelector(state=> state.language.language); /* Селектор выбранного пользователем языка */
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
        const getDataUser = (values) => {
            dispatch(getDataUser(values))
                .then((responce) => {dispatch(changeSingOrExercise("exerciseInput")); dispatch(setName(responce.data.name))}) /* Если все норм переключаемся на окно ввода упражнений */
                .catch(()=>{})
                .finally(()=>{})
        }

    return (
        <>
        <Formik
            initialValues={{ name: "", email: '', password: '' }}
            validationSchema={Yup.object({
                name: Yup.string().min(2,`${text.nameMin}`),
                email: Yup.string().email(`${text.errorEmail}`).required(`${text.required}`),
                password: Yup.string().min(6, `${text.passwordMin}`).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/, `${text.passwordShema}`)
            })}
            onSubmit={(values, { setSubmitting }) => {
                getDataUser(values)
                setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
        
        }}
        >
        {({ isSubmitting }) => (
            <Form className='singForm'>
                <div className="nameWrapper">
                    <Link to="/"><div className="input__cross"></div></Link>
                    <MyTextField type="text" name="name" classNameInput="input__name" placeholder={`${text.name}`}/>
                </div>
                <ErrorMessage name="name" component="div" />
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