import axios from  'axios';

const conexionDb= axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials: true,
    timeout:5000,
})
export const conexionDb1= axios.create({
    baseURL:"http://localhost:3001",
    headers:{
        'Content-Type':'application/json',
    },
    withCredentials: true,
    timeout:5000,
})

conexionDb.interceptors.request.use(
    (config)=>{
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default conexionDb;
