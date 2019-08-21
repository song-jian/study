import Vue from 'vue'
// 注册正则表达式
const utils = {
    emailReg : /^[a-z0-9A-Z]+([-|_|\.]+[a-z0-9A-Z]+)*@([a-z0-9A-Z]+[-|\.])+[a-zA-Z]{2,5}$/,
    idCardReg : /^(([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|(X|x))))$/,
    phoneReg : /^1[34578]\d{9}$/,

}
//存储localStroge
const setStore = (name,content) =>{
    if(!name) return;
    if(typeof content != 'string'){
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name,content)
}

//获取localhost
const getStore = name =>{
    if(!name) return;
    var value = window.localStorage.getItem(name);
    if(value !== null){
        try{
            value = JSON.parse(value)
        }catch(e){
            value = value
        }
    }
    return value;
}
//删除localStroge
const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 *  标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 *  类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
const formatDate = (date, type) =>{
    var year = date.getFullYear();//年
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;//月
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//日
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//时
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
    var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else if(type == 2){
        return year+""+month+""+day+""+hour+""+minutes+""+seconds;
    }else if(type == 3){
        return year + "-" + month + "-" + day;
    }else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}
/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
const parseToDate = (timeValue) => {
    var result = "";
    var year = timeValue.substr(0, 4);
    var month = timeValue.substr(4, 2);
    var date = timeValue.substr(6, 2);
    var hour = timeValue.substr(8, 2);
    var minute = timeValue.substr(10, 2);
    var second = timeValue.substr(12, 2);
    result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return result;
}
export default {
    utils,
    setStore,
    getStore,
    removeStore,
    formatDate,
    parseToDate,
   
}