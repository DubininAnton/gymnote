import { language } from "./languageSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import "./language.scss"

const Language = () => {
    const dispatch = useDispatch();
    
    const onChoose = (e) => {
        const title = document.querySelector(".myLanguage__title");
        const russian = document.querySelector(".myLanguage__russian");
        const english = document.querySelector(".myLanguage__english");
        if(e.target.className === title.className) {
            title.classList.toggle('myLanguage__title_active')
            russian.classList.toggle("myLanguage__russian_open")
            english.classList.toggle("myLanguage__english_open")
        }
    }
    
    return (
        <div className="container">
            <div onClick={(e)=>onChoose(e)} className="myLanguage">
                <div className="myLanguage__title">Выберите язык (Choose language)</div>
                <Link to="/singUp">
                    {/* Не забыть установить dispatch(changeSingOrExercise("Sing")) для того чтобы был переход на страницу регистрации */}
                    <div onClick={()=>dispatch(language("Russian"))} className="myLanguage__russian">Russian</div>
                    <div onClick={()=>dispatch(language("English"))} className="myLanguage__english">English</div>
                </Link>
            </div>
        </div>
    )
}

export default Language;