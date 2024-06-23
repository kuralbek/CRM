import axios from "axios";


const api = axios.create({
    baseURL: 'https://localhost:7019/api',
    headers:{
        'Content-Type': 'application/json'
    },
});
/*const api = axios.create(
    {
        baseURL: 'http://' +  address ,
        headers:{
            'Content-Type': 'application/json'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    }
)*/
/*instance.get('/longRequest', {
  timeout: 5000
});*/

export default api
