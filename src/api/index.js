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
            if(isSuccess(res)){
                resolve(res.data.result);
            }else{
                reject(res.data)
            }
        }).catch(err =>{
            reject(err.data)        
        })    
    })
}

const isSuccess = (res)=>{
    return res && res.data && res.data.code === 0
}
export default {server}