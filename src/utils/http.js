import axios from 'axios'

var instance = axios.create({
    // baseURL: 'http://192.168.1.107:8031/japi/',
    baseURL: 'http://'+ location.hostname +':4000',
    timeout: 20000
});
instance.interceptors.response.use(function(response){
    if(response.status === 200){
        return response.data;
    }else {
    	return response.data;
    }
}, function(error){
    console.error('http请求失败', error);
    return error;
    // return Promise.reject(error);
});
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;
