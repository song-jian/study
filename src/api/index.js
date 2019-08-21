import axios from 'axios';

const server = (url,method,params,data,accesstoken,appName)=>{
    return new Promise((resolve,reject)=>{
        axios({
            url,
            method,
            headers:{
                accesstoken,
                appName,
                'Content-Type': 'application/json',
            },
            params,
            data
        }).then(res => {
            resolve(res.data.result);
        }).catch(err =>{
            reject(err.data)        
        })    
    })
}
export default {server}