import "./header.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName } from "../sing/singSlice";
import { changeSingOrExercise } from "../sing/singSlice";

const Header = () => {
    const userName = useSelector(state=>state.sing.userName)
    console.log(userName)
    const dispatch = useDispatch()

    return (
        <>
        <div className="header__wrapper">
           <div className="header__name">
             {userName}
           </div>
           <Link to="/">
                <div onClick={()=>{dispatch(setName("")); dispatch(changeSingOrExercise("sing"))}} className="header__exit">&#10008;</div>
            </Link>
        </div>
        </>
    )
}

export default Header;