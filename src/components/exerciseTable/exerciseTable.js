import { Formik, Form, useField } from 'formik';
import {useGetInformationApiQuery, usePostInformationsMutation} from "../../api/apiSlice";
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { russianText } from './exerciseTableSlice';
import { englishText } from './exerciseTableSlice';
import { v4 as uuidv4 } from 'uuid';
// import * as Yup from 'yup';
import "./exerciseTable.scss";



const ExerciseTable = () => {
    const lang = useRef(useSelector(state=> state.language.language)).current; /* Селектор выбранного пользователем языка */
    const { data } = useGetInformationApiQuery(); /* Получаем информацию из базы данных */
    const [postInformations]=usePostInformationsMutation(); /* Запись в базу данных вновь введенную информацию */
    /* Состояние хранит информацию о уже выполняемых ранее упражнениях, подходах и их количестве */
    const [layoutItem, setLayoutItem] = useState() 

    /* Состояние хранит информацию о количестве начальных ячеек инпутов веса и количества повторений  */
    const [initialInput, setInintaiInput] = useState([
        {weight: 1,
        repetitions:1,
        id:uuidv4()},
        {weight: 2,
        repetitions:2,
        id:uuidv4()},
        {weight: 3,
        repetitions:3,
        id:uuidv4()
        }
    ])

    /* Переменная хранит информацию о подписях ячеек на выбранном языке */
    let text={};        
    if(lang === "Russian") {
        text = russianText
        } else if (lang === "English") {
        text = englishText
        }
          
  
    /* Функция срабатывает при анфокусе инпута по вводу упражнения, ищет в заранее загруженной базе упражнений из выполняемых ранее
    и выводит на экран результат */
    const getExersice = (e) => {
        const target = e.target.value /* Выбранное упражнение */
        let arr = data.filter(item =>item.exercise === target)
        let summItem = [];
        if(arr.length !== 0) {
            arr.forEach(item => {
                summItem.push(item)
            })
            setLayoutItem(summItem)
        } else if(arr.length === 0){
            setLayoutItem()
        }
    }
    /* Функция вывода начального количества пустых ячеек для записи веса и количества повторений */
    const cellInput = (initialInput) => {
        return initialInput.map((item)=>{
            return (
                <div className='input__block'>
                    <MyTextField type="text" name={`weight${item.weight}`} classNameInput="input__weight" placeholder={`${text.weight}`}/> 
                    <MyTextField type="text" name={`repetitions${item.repetitions}`} classNameInput="input__repetitions" placeholder={`${text.repetitions}`}/>
                </div>
            )
        }) 
    }
   
    const myCellInput = cellInput(initialInput)

    /* Функция добавления дополнительных ячеек веса и подхода срабатывает при нажатии на кнопку добавления подхода */
    const plusBlockInput = ()=> {
        let initialInputLength = initialInput.length+1
        setInintaiInput(initialInput.concat([{weight:initialInputLength, repetitions:initialInputLength}]))
    }
    /* Функция удаления дополнительных ячеек веса и подхода срабатывает при нажатии на кнопку удаления подхода */
    const minesBlockInput = (e) => {
        let minesInitialInput = initialInput.splice(0,initialInput.length-1)
        setInintaiInput(minesInitialInput)

    }
    /* Функция устанавливает начальное количество пустых инпутов веса и количества повторений при нажатии кнопки удаления упражнения, а также
    сбрасывает значение из инпута упражнения. Срабатывает при нажатии на кнопку Удаление упражнения и после отправки формы.
    Сброс инпутов из Formik осуществляется с помощью функции resetForm встроенной в Formik */
    const deleteInput = ()=>{
        setInintaiInput([
            {weight: 1,
                repetitions:1,
                id:uuidv4()},
            {weight: 2,
                repetitions:2,
                id:uuidv4()},
            {weight: 3,
                repetitions:3,
                id:uuidv4()}
        ])
        setLayoutItem()
    }

    /* Функция формирует объект для записи его в базу данных из собранных данных из инпутов. 
    В функции убираются инпуты которые удалены с помощью кнопки "Удалить подход" */
    const submitInput =(values) => {
        let sortValues={
            "id":uuidv4(),
            "date":"",
            "exercise":"",
            "weight":[],
            "repetitions":[]

        };
        const initialInputLength = initialInput.length;
        for(let [key, value] of Object.entries(values)) {
            if(key === "date") {
                sortValues.date = (`${value}`)
            } 
            if(key === "exercise") {
                sortValues.exercise = (`${value}`)
            }
            for(let i=1; i<=initialInputLength; i++ ){
                if(key === `weight${i}`) {
                    sortValues.weight.push(`${value}`)
                }
            }
            for(let i=1; i<=initialInputLength; i++ ){
                if(key === `repetitions${i}`) {
                    sortValues.repetitions.push(`${value}`)
                }
            }
        }
        postInformations(sortValues).unwrap()
    }

    return (
        <>
            <div className="beforePhysicalManagement">
                {layoutItem ? 
                    layoutItem.reverse().map(item=>
                            <>
                            <div className="beforePhysicalManagement__row">
                                    {<div className="beforePhysicalManagement__date">{item.date}</div>}
                                <div className="beforePhysicalManagement__info">
                                    {item.weight.map(item=>
                                    <div className="beforePhysicalManagement__approach">{item}</div> )}
                                </div>
                            </div>
                            <div className="beforePhysicalManagement__row">
                                <div className="emptyCell"></div>
                                <div className="beforePhysicalManagement__info">
                                    {item.repetitions.map(item=>
                                    <div className="beforePhysicalManagement__weight">{item}</div> )}
                                </div>
                            </div>
                            </>
                    ) : null}
            </div>
        <Formik
                initialValues={{date:"",
                                exercise:"", 
                                weight1:"",
                                weight2:"",
                                weight3:"",
                                repetitions1:"",
                                repetitions2:"",
                                repetitions3:""}}
                // validationSchema={Yup.object({
                //     approach: Yup.number(),
                //     weight: Yup.number()
                // })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    submitInput(values)
                    
                    setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    deleteInput()
                    resetForm()
                    setSubmitting(false)
                   
                    }, 400);
                    
            }}
            
            >
            {({ isSubmitting, resetForm }) => (
                <Form>
                    <div className="wrapperInputBlock">
                        <div className="wrapper">
                            <div className="input__all">
                                <div className="input__wrapper">
                                <MyTextField type="date" name="date" classNameInput="input__date"/> 
                                <MyTextField onBlur={(e)=>getExersice(e)} type="textArea" name="exercise" classNameInput="input__exercise" placeholder={`${text.exercise}`}/> 
                                </div>
                                <div className="input__row">    
                                    <div className="input__physicalManagement">
                                        {myCellInput}
                                    </div>                        
                                </div>
                            </div> 
                            
                            <button className="input__btn" type="submit" disabled={isSubmitting}>
                                {`${text.buttonTwo}`}
                            </button> 
                        </div>
                        <div className="input__blockButton">
                                <button type="reset" onClick={()=>{resetForm(); deleteInput()}} className="input__deleteExercise">{text.deleteExercise}</button>
                                <div onClick={()=>plusBlockInput()} className="input__plusApproach">{text.plusApproach}</div>  
                                <div onClick={()=>minesBlockInput()} className="input__deleteApproach">{text.deleteApproach}</div>  
                            </div> 
                    </div>                     
                </Form>
            )}
            </Formik>
        </>
    )
}

/* Компонент формирует основную таблицу */
const MyTextField = (props) => {

    const [field, meta] = useField(props);
    return (
        <>
        <div>
                <input
                    {...field}
                    onBlur={props.onBlur}
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

export default ExerciseTable;