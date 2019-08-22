
<template>
  <div class="my-table">
    <el-table
      ref="sourceTable"
      :row-style="toggleDisplayTr"
      :data="data"
      :stripe="stripe"
      :border="border"
      :height="getTableHeight()"
      :default-sort="defaultSort"
      :row-class-name="rowClassName"
      :empty-text="getEmptyMessage()"
      :highlight-current-row="highlightCurrentRow"
      class="body-full-height"
      :class="{'body-hasDefLayout': hasDefLayout()}"
      @select="onSelect"
      @sort-by="onSortBy"
      @row-click="onRowClick"
      @select-all="onSelectAll"
      @sort-change="onSortChange"
      @cell-dblclick="onCellDblclick">
      
       <el-table-column v-if="isRowIndex" type="index" width="50"></el-table-column>
      <el-table-column v-if="true" :selectable="isSelectable" type="selection" width="50"></el-table-column>

      <template v-for="(item,i) in header">
        <el-table-column v-if="item.filters"
          :key="i"
          :prop="item.prop"
          :label="item.display"
          :sortable="item.sortable"
          :formatter="formatter(item)"
          :filters="item.filters"
          :filter-method="onFilterMethod"
          :filter-placement="item.filterPlacement"
          :width="item.width || 'auto'">
        </el-table-column>

        <el-table-column v-else
          :key="i"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.display"
          :sortable="item.sortable"
          :formatter="formatter(item)"
          :width="item.width || 'auto'">
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if = "ifPage"
      :page-sizes="pageSizeList"
      :layout="defLayout"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="currentPage"
      @current-change="onTablePageChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
// import util from 'jw_common/util'
import ColumnPopover from './column-popover'

const PAGE_SIZE_LIST = [15, 25, 35, 45]
     
export default {
  props: [
    'data', 'header','isSelection',
    'showPagination','stripe','highlightCurrentRow',
    'pageSize','totalCount','currentPage','isRowCheckBox','height','isPermissionCheck',
    'opsList','defaultSort','border','rowClassName','disabledCheckFiled','foldList','treeTable','isRowIndex','ifPage'
  ],

  data() {

    return {
      defLayout: "total, sizes, prev, pager, next, jumper",
      pageSizeList: PAGE_SIZE_LIST
    }
  },

  components: {
    ColumnPopover
  },

  updated() {

    this.updateSelection()
  },

  methods: {

    isSelectable(item){
      return !item[this.disabledCheckFiled];
    },

    onSortChange() {
      let argus = Array.prototype.slice(arguments,1)

      this.$emit('sort-change',argus)
    },

    onSortBy() {
      let argus = Array.prototype.slice(arguments,1)

      this.$emit('sort-by',argus)
    },

    getEmptyMessage() {

      return '暂无数据'
    },

    onMenuOperateHandler(menuItem, row) {

      this.$emit('on-operate-click',menuItem,row)
    },

    getTableHeight() {

      if(_.isUndefined(this.height) || _.isNull(this.height)) {
        return 'null'
      }

      if(this.height === 'auto') {
        return null
      }

      return this.height || 0
    },

    hasDefLayout() {

      return this.ifPage
    },

    updateSelection() {
      let sourceTable = this.$refs.sourceTable

      sourceTable.clearSelection()
      if(this.isSelection) {
        _.each(this.data,(row)=>{
          row.checked && sourceTable.toggleRowSelection(row,true)
        })
      }
    },

    toggleRowSelection(row,isChecked) {

      row.checked = isChecked
      this.$refs.sourceTable.toggleRowSelection(row,isChecked)
    },

    onTablePageChange(pageCount) {

      this.$emit('on-page-change',pageCount)
    },
    handleSizeChange(val) {
      
      this.$emit('size-change', val)
    },
    selectionChange(row) {

      if(this.isSelection && this.getRowCheckBoxState()) {
        row.checked = !row.checked
        this.toggleRowSelection(row,row.checked)
        this.$emit('on-selection-change',row,this)
      }
    },
   
    onSelectAll(selection) {

      if(selection.length !== 0) {
        _.each(this.data,(s)=>{
          s.checked = true
        })
      } else {
        _.each(this.data,(s)=>{
          s.checked = false
        })
      }
    },

    onSelect(selection,row) {

      row.checked = !row.checked
      this.$emit('on-selection-change',row,this)
    },

    onRowClick(row,event,column) {
      let contxt = this.$refs.sourceTable
      
      this.isSelection ? this.rowSelected(row) : ''; 
      if(!column.property===this.disabledCheckFiled){
        this.selectionChange(row)
      }

      this.$emit('on-row-click',row,event,contxt,column)
    },

    // 选中当前行时勾选复选框
    rowSelected(row) {
      row.checked = !row.checked;
      this.$refs.sourceTable.toggleRowSelection(row);
    },

    getRowCheckBoxState() {

      if(this.isRowCheckBox===true) {
        return true
      }

      return false
    },

    onFilterMethod (value, row, column) {
      this.$emit('on-filter-method', value, row, column)
      return row[column.property] == value;
    },

    formatter(item) {
      var innerElement = null
      var formatterFun = item.formatter
      if(_.isFunction(formatterFun)) {
        return (row,col,value)=>{
          if(_.isFunction(formatterFun)) {
            innerElement = formatterFun.call(this,row,col,value)
          }
          return innerElement
        }
      }
      return null
    },

    getSelection() {
      let selections = []

      _.each(this.data,(row)=>{
        if(row.checked) {
          selections.push(_.clone(row))
        }
      })

      return selections
    },

    

    onCellDblclick(cell) {
    
      this.$emit("on-dblclick", cell);
    },

    toggleDisplayTr ({row, index}) {
      let item = null

      if(this.treeTable) {
        for (let i = 0; i < this.foldList.length; i++) {
          
          item = this.foldList[i]
          // 如果foldList中元素存在于 row.__family中，则该行隐藏。  如果该行的自身标识等于隐藏元素，
          //则代表该元素就是折叠点
          if (_.includes(row.__family, item) && row.__identity !== item) {
            
            return 'display:none;'
          }
        }
      }
      
      return ""
    },
  }
};
</script>

<style lang="less">
  .my-table {
    height: 100%;
    .body-full-height {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(~'100% - 20px');
    }
    .body-hasDefLayout{
      height: calc(~'100% - 59px');
    }
    .el-table {
      th {
        background-color: transparent;
      }

      tr {
        background-color: transparent;
      }
    }
     .el-table__body-wrapper {
      overflow-x: hidden;
      tr:nth-of-type(2n){
        background-color: #f9f9f9;
      }
      
    }
    .el-popover__reference {
      vertical-align: middle;
    }

    .el-table::before {
      height: 0;
    }
    
    .el-pagination {
      text-align: center;
      border-top: 1px solid #c4c6cc;
      padding-top: 20px;
    }

    .drag-item {
      cursor: pointer;
    }
  }
</style>