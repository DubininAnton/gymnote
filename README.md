# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Проект тренировочного дневника спортсмена (бодибилдера). Запускается совместно с репозиториями myDataBase-for-gymnote и registration-for-gymnote.
Для проекта необходима устанока MongoDB локально на компьютер. 
В проекте реализованы следующие функции:
1) Выбор языка интерфейса (русский и английский языки)
2) Регистрация и вход ранее зарегестрированного пользователя (репозиторий registration-for-gymnote (запуск npm run dev), реализация не моя. Для работы необходима установка локально MongoDB.) P.S. Подтверждение по email отключено.  
1) Запись введенных упражнения и его параметров (вес и количество повторений) в базу данных (репозиторий myDataBase-for-gymnote (запуск npm start), реализация моя. Для работы необходима установка локально MongoDB).
2) При повторном вводе в поле input ранее введенного упражнения и записанного в базу данных при анфокусе отображается информация из базы данных, что позволяет отслеживать прогресс).
3) При вводе упражнения отсутствующего в базе данных отображается соотвествующее сообщение и показываюся упражнения ранее записанные в базу. 
4) При переключении на вкладку "Достижения" возможна сортировка и просмотр ранее введенной и записанной в базе данных упражнений и их характеристик, а также их удаление.
