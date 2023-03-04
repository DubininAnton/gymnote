import axios from "axios";



export const API_URL = 'http://localhost:5000/api'
export const API_URL_EXERCISE = 'http://localhost:5100'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const apiExercise = axios.create({
    baseURL: API_URL_EXERCISE,
    "Access-Control-Allow-Origin":"http://localhost:3000"

})

/* Интерцептер на запрос: в заголовок добавляем Bearer с refresh токеном хранящимся в localStorage */
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})



export default $api;