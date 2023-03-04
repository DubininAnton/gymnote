import {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { getExercise } from '../exerciseTable/exerciseTableSlice';
import {setNotAchievements} from "../exerciseTable/exerciseTableSlice";
import { useRef } from 'react';
import { russianText } from '../exerciseTable/exerciseTableSlice';
import { englishText } from '../exerciseTable/exerciseTableSlice';
import { v4 as uuidv4 } from 'uuid';
import { deleteExercise } from "../service/ExerciseService.ts";


import "./achievements.scss"

const Achievements = () => {
    const userEmail = useSelector(state=>state.sing.user.email) /* Эл.адрес пользователя */
    const exercisesFromDataBase = useSelector(state=>state.exercise.exercises); /* Упражнения загруженные из базы данных */
    const lang = useRef(useSelector(state=> state.language.language)).current; /* Селектор выбранного пользователем языка */
    const notAchievements = useSelector(state=>state.exercise.notAchievements)

    const chooseExrciseRef = useRef('') /* Сохраняю выбранное в поле select упражнение */
    const chooseDateRef = useRef('') /* Сохраняю выбранную в поле select дату*/

    
    const dispatch = useDispatch()

    /* Записываю полученный из базы данных массив данных с упражнениями и далее работаю с ним */
    const [arrayExercises, setArrayExercises] = useState([])
    /* Первоначальная установка select упражнений и дат и после выбора в select*/
    const [notRepetitiveExercises, setNotRepetitiveExercises] = useState([])
    const [notRepetitiveDate, setNotRepetitiveDate] = useState([])

    /* Устанавливаю упражнения и дату при выборе в select */
    const [selectExrcises, setSelectExrcises] = useState('')
    const [selectDates, setSelectDates] = useState('')

    /* Массив данных для отображения на экране по выбранным данным */
    const [viewDataArray, setViewDataArray] = useState([])


    /* Функция по выбранным упражнению и дате показывает результат отбора в базе данных */
    useEffect(()=>{
        if(Boolean(selectExrcises) === true && Boolean(selectDates) === false) {
            try {
                const newArray = arrayExercises.filter((item) => item.exercise === selectExrcises) /* Формируется массив по выбранному упражнению */
                const newDate = [...new Set(newArray.map(item => item.date))]
            
                setViewDataArray(newArray) /* Записываю данный массив в переменную для показа результата */
                
                setNotRepetitiveDate(newDate) /* Записываю в state новые даты относящиеся только к выбранному упражнению для размещения в select */

                chooseExrciseRef.current = newArray[0].exercise
            } catch (error) {
                
            }
        }
        if(Boolean(selectExrcises) === false  && Boolean(selectDates) === true) {
            try {
                const newArray = arrayExercises.filter((item) => item.date === selectDates) /* Формируется массив по выбранной дате */
                const newExercisesArray = [...new Set(newArray.map(item => item.exercise))]
                setViewDataArray(newArray) /* Записываю данный массив в переменную для показа результата */
                
                setNotRepetitiveExercises(newExercisesArray) /* Записываю в state новые упражнения относящиеся только к выбранной дате для размещения в select */
                chooseDateRef.current = newArray[0].date
                
                // console.log(viewDataArray)
            } catch (error) {
                
            }
        }
        if(Boolean(selectExrcises) === false && Boolean(selectDates) === false) {
            try {
                initialInstallation(exercisesFromDataBase)
                setViewDataArray([])
                chooseExrciseRef.current = ""
                chooseDateRef.current = ""
            // console.log(viewDataArray)
            } catch (error) {
                
            }
        }
        /* Поиск по базе данных при выбранном упражнении в select по всем датам в которые оно выполнялось проводится на основе сначала 
        сравнения выбранного упражнения в select и записанного в Ref и если они совпадают, а оба select заполнены то сначала из всей базы 
        выбирается массив с упражнением, которое введено в поле select, а потом из полученного массива производится формирование массива 
        по выбранной дате и наоборот, если оба select заполнены и дата в selectDates  совпадает с chooseDateRef (кстате, Ref первоначально заполняется 
        в условиях выше) то сначала производится выборка из всего полученного массива данных с выбранной датой, а затем из полученного массива
        производится формирование массива с выбранным упражнением.*/
        if (Boolean(selectExrcises) === true && Boolean(selectDates) === true) {
            if(selectExrcises === chooseExrciseRef.current) {
                chooseDateRef.current = selectDates
                const newArrayExercises = arrayExercises.filter((item) => item.exercise === selectExrcises)
                const newArray = newArrayExercises.filter(item => item.date === selectDates)
                setViewDataArray(newArray)
            }
            if(selectDates === chooseDateRef.current) {
                chooseExrciseRef.current = selectExrcises
                const newArrayDates = arrayExercises.filter((item) => item.date === selectDates)
                const newArray = newArrayDates.filter(item => item.exercise === selectExrcises)
                setViewDataArray(newArray)
            }
        }

    },[selectExrcises,selectDates])


    const initialInstallation = (exercises)=>{
       try {
        if (exercises.length !== 0) {
            /* Массив выполняемых упражнений (упражнения не повторяются) */
          const exerciseArray = exercises.map(item=>item.exercise)
          const notRepetitiveExercises = [...new Set(exerciseArray)]
          setNotRepetitiveExercises(notRepetitiveExercises)
  
          /* Массив дат (даты не повторяются) */
          const dateArray = exercises.map(item=>item.date)
          const notRepetitiveDate = [...new Set(dateArray)]
          setNotRepetitiveDate(notRepetitiveDate) 
  
          dispatch(setNotAchievements(false))
          }
          if (exercises.length === 0) {
              dispatch(setNotAchievements(true))
          }
       } catch (error) {
        console.log(error)
       }
        
    }

    /* Переменная хранит информацию о подписях ячеек на выбранном языке */
    let text={};        
    if(lang === "Russian") {
        text = russianText
        } else if (lang === "English") {
        text = englishText
        }

    /* Получаю данные по упражнениям пользователя из базы данных и записываю в локальное хранилище */
    useEffect(()=>{
        dispatch(getExercise(userEmail))
            .then((exercises)=>{setArrayExercises(exercises.payload); initialInstallation(exercises.payload) })
    },[userEmail, dispatch])

    /* Функция удаления упражнения из базы данных */
    useEffect(()=> {
        document.querySelector(".achievements__myAchievements").addEventListener("click", (e)=>{
            if(e.target.getAttribute("class") === "emptyCell") {
                deleteExercise(userEmail, (e.target).getAttribute("data-key"))
                    .then(()=>
                        dispatch(getExercise(userEmail))
                            .then((exercises)=>{ setArrayExercises(exercises.payload); initialInstallation(exercises.payload)}))
                            .then(()=>{setSelectExrcises("")
                                        setSelectDates("")
                                        chooseExrciseRef.current = ""
                                        chooseDateRef.current = ""
                                        setViewDataArray([])
                                        }
                                    )       
            }
            
        })
    },[selectExrcises,selectDates])
    

    return (
        <>
            <div className="achievements__wrapper">
                <div className="achievements__exercises">
                    <select value = {selectExrcises} onChange= {(e)=>setSelectExrcises(e.target.value)} className="achievements__exercisesList">
                        <option value="" className="achievements__exercise">{text.achievementsSelect}</option>
                        {notRepetitiveExercises.map(item=>{
                            return (
                                <>
                                    <option id ={uuidv4()} value={item} className="achievements__exercise">{item}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                <div className="achievements__dates">
                    <select value = {selectDates} onChange= {(e)=>setSelectDates(e.target.value)} className="achievements__dateList">
                        <option value="" className="achievements__date">{text.achievementsDateSelect}</option>
                        {notRepetitiveDate.map(item=>{
                            return (
                                <>
                                    <option id ={uuidv4()} value={item} className="achievements__exercise">{item}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
                <div className="achievements__myAchievements">
                { 
                    viewDataArray.map(item=>{
                        return (
                            <>
                                <div className="achievements__box" key={item._id}>
                                    <div className="beforePhysicalManagement__row">
                                            {<div className="beforePhysicalManagement__date">{item.date}</div>}
                                        <div className="beforePhysicalManagement__info">
                                            {item.weight.map(item=>
                                            <div className="beforePhysicalManagement__approach">{item}</div> )}
                                        </div>
                                    </div>
                                    <div className="beforePhysicalManagement__row">
                                        <div data-key={item._id} className="emptyCell">{text.achievementsDeleteExercise}</div>
                                        <div className="beforePhysicalManagement__info">
                                            {item.repetitions.map(item=>
                                            <div className="beforePhysicalManagement__weight">{item}</div> )}
                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                        }
                    )
                    
                }
                </div>




                {notAchievements ? <div className="achievements__noresults">
                    {text.notAchievements}    
                </div>: null}
                
            </div>
        </>
    )
}

export default Achievements;