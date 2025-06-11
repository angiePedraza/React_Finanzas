import axios from 'axios';
import { AuthService } from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});


api.interceptors.request.use(config => {
    const token = AuthService.getToken();
    if(token){
        if(!config.headers){
            config.headers ={};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;