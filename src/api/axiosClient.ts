import axios from  'axios';

const conexionDb= axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        'Content-Type':'application/json',
    },
    timeout: 5000,
})

conexionDb.interceptors.request.use(
    (config)=>{
        const token= localStorage.getItem('authToken');

        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default conexionDb;