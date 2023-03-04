import "./header.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { russianText } from '../exerciseTable/exerciseTableSlice';
import { englishText } from '../exerciseTable/exerciseTableSlice';
import { changeSingOrExercise } from "../sing/singSlice";
import { textModalWindow } from '../modalWindows/modalWindowsSlice';
import { exitAccount } from '../exerciseTable/exerciseTableSlice';
import { logout } from "../service/AuthServise.ts";
import {setExercisesOrAchievements} from "../exerciseTable/exerciseTableSlice";
import {setNotAchievements} from "../exerciseTable/exerciseTableSlice";
import { setInputExercise } from '..//exerciseTable/exerciseTableSlice';
import {user} from "../sing/singSlice"

const Header = () => {
    // const userName = useSelector(state=>state.sing.userName)
    const lang = useSelector(state=> state.language.language); /* Селектор выбранного пользователем языка */
    const exercisesOrAchievements = useSelector(state=> state.exercise.exercisesOrAchievements)
    const dispatch = useDispatch()


    let text={};
    if(lang === "Russian") {
        text = russianText;
    } else if (lang === "English") {
        text = englishText
    }

    const exit =()=> {
        dispatch(changeSingOrExercise("sing"))
        dispatch(textModalWindow(""))
        dispatch(user(""))
        dispatch(exitAccount())
        logout()
            .then (() => {
                try {
                    localStorage.removeItem('token');

                } catch (e) {
                   console.log(e.response?.data?.message); 
                }
            })
    }

    return (
        <>
        <div className="header__wrapper">
           <div className="header__name">
             {}
           </div>
           {exercisesOrAchievements ? 
                <>
                <Link to="/achievements">
                    <div onClick={()=>{dispatch(setExercisesOrAchievements(false)); dispatch(setNotAchievements(false)); dispatch(setInputExercise(""))}} className="header__achievements"> <div>{text.achievements}</div> </div>
                </Link>
                <Link to="/">
                    <div onClick={()=>{exit(); dispatch(setExercisesOrAchievements(true)); dispatch(setNotAchievements(false))}} className="header__exit"> <div>{text.exitAccount}</div> </div>
                </Link>
                </> 
            : 
            <>
            <Link to="/singUp">
                <div onClick={()=>{dispatch(setExercisesOrAchievements(true)); dispatch(setNotAchievements(false))}} className="header__achievements"> <div>{text.exercises}</div> </div>
            </Link>
            <Link to="/">
                <div onClick={()=>{exit(); dispatch(setExercisesOrAchievements(true)); dispatch(setNotAchievements(false))}} className="header__exit"> <div>{text.exitAccount}</div> </div>
            </Link>
            </>
            }
            
           
        </div>
        </>
    )
}

export default Header;