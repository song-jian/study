import _ from 'underscore'
import api from '../api'
export default {
  install(Vue){
    _.extend(Vue.prototype,{
      _ : _ ,
      $http(url,method,params,data,accesstoken,appName){
       return api.server(url,method,params,data,accesstoken,appName);
      },
      $error(message){
        this.$message.error(message || '');
      },
      $success(message){
        this.$message.success(message || '');
      },
      $warning(message) {
        this.$message.warning(message || '')
      },
      $alert(message,title,opts){
        return this.$msgbox.alert(message || '', title || 'Warning', _.extend({
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        },opts||{}))
      }
    })
  }
}