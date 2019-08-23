<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 14:14:16
 * @LastEditTime: 2019-08-23 15:22:27
 * @LastEditors: Please set LastEditors
 * params:
    list ===> Array
    form ===> Array
    labelPosition : 'left' 'right'
    colCount:Number "2"
 -->
<template>
<div class="jw-search-control-wrapper">
  <el-form :model="form" ref="form" size="small" :label-position="labelPosition || 'left'"
  :label-width="labelWidth || '120px'" :rules="rules">
    <slot name="first-form-item" />
    <el-row v-for="(row,index) in list" class="search-row" :key="index">
      <el-col :span="cols" v-for="(item,i) in row" :key="i">
        <el-form-item :prop="item.prop" :label="item.name">
          <label v-if="item.type === 'label'" class="content-label">{{form[item.prop]}}</label>

          <el-input v-else-if="item.type=='input'" @input="onChange(item)" class="row-col-input content-col" 
          v-model.trim="form[item.prop]" :placeholder="item.placeholder" />

          <el-switch v-else-if="item.type=='switch'" v-model="form[item.prop]"></el-switch>

          <el-input v-else-if="item.type=='textarea'" type="textarea" @input="onChange(item)" class="row-col-input content-col" 
          v-model.trim="form[item.prop]" :placeholder="item.placeholder" :rows="6" />

          <el-select v-else-if="item.type=='select'" @change="onChange(item)" class="content-col"
          v-model="form[item.prop]" :placeholder="item.placeholder" :filterable="item.filterable"
          :allow-create="item.allowCreate" clearable>
            <el-option v-for="(option,j) in item.list" :key="j" :label="option.label" :value="option.value" />
          </el-select>

          <el-checkbox v-else-if="item.type === 'checkbox'" v-model="form[item.prop]" @change="onChange(item)" 
          :class="{ 'checkbox-wrapper-fix': labelPosition==='top' }" />
          <el-date-picker
            v-else-if="item.type === 'date'"
            clearable
            class="content-col"
            @change="onChange(item)" 
            v-model="form[item.prop]"
            :type="item.dateType || 'daterange'"
            :value-format="item.dateFormat || 'yyyy-MM-dd'"
            range-separator="-" 
            :start-placeholder="$root.langs['platform.datePicker.beginDate']"
            :end-placeholder="$root.langs['platform.datePicker.endDate']" 
          />
        </el-form-item>
      </el-col>
    </el-row>
    <slot name="last-form-item" />
  </el-form>
  <slot name="after" />  
</div>  
</template>

<script>
const COL_COUNT = 24

export default {

  props: [ 'data', 'colCount', 'labelPosition', 'rules' , 'labelWidth' ],

  data() {

    return {
      list: [],
      form: {},
      cols: COL_COUNT/(this.colCount || 3)
    }
  },
 
  mounted() {
    this.formatRows(this.data)
  },

  watch: {
    data(newData) {
      this.formatRows(newData)
    },

    colCount(newColCount) {
      this.cols = COL_COUNT/this.newColCount
    }
  },

  methods: {

    formatRows(newData) {
      let row = []
      let list = []
      let newList = newData.list
      let rowCount = this.colCount || 3

      _.each(newList,(item,index)=>{
        
        if(index%rowCount === 0) {
          row = [ item ]
          list.push(row)
        }else{
          row.push(item)
        }
      })

      this.list = list
      this.form = newData.form
    },

    onChange(item) {

      this.$emit('change',item)
    },

    getValue() {

      return _.clone(this.form)
    },

    validate() {
      
      return this.$refs.form.validate()
    },

    clearValidate() {
      return this.$refs.form.clearValidate()
    }
  }
};
</script>
<style lang="less" scoped>
.jw-search-control-wrapper {
  padding: 15px 10px;
  box-sizing: border-box;
  .checkbox-wrapper-fix {
    margin-top: 32px;
  }
  .el-input{
      width: 80%;
  }
  .el-col {
    padding: 0 10px;
  }
  .el-select{
    width: 80%;
    display: block;
  }
}
</style>