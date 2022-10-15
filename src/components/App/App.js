import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import LanguagePage from "../pages/languagePage";
import SingPage from "../pages/singPage";
import ExercisePage from "../pages/exercisePage";

function App() {
  const exerciseInput = useSelector(state => state.sing.singOrExercise) /* state устанавливается в зависимости от условия зарегестрирован ли пользователь или нет */
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LanguagePage />}/>
          <Route path='singUp' element ={exerciseInput === "exerciseInput" ? <ExercisePage/> : <SingPage/> }/>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
