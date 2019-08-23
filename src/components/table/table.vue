
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
      @cell-dblclick="onCellDblclick"
    >
      <el-table-column v-if="isRowIndex" type="index" width="50"></el-table-column>
      <el-table-column v-if="isSelection" :selectable="isSelectable" type="selection" width="50"></el-table-column>

      <template v-for="(item,i) in header">
        <el-table-column
          v-if="item.filters"
          :key="i"
          :prop="item.prop"
          :label="item.display"
          :sortable="item.sortable"
          :formatter="formatter(item)"
          :filters="item.filters"
          :filter-method="onFilterMethod"
          :filter-placement="item.filterPlacement"
          :width="item.width || 'auto'"
        ></el-table-column>

        <el-table-column
          v-else
          :key="i"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.display"
          :sortable="item.sortable"
          :formatter="formatter(item)"
          :width="item.width || 'auto'"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="ifPage"
      :page-sizes="pageSizeList"
      :layout="defLayout"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="currentPage"
      @current-change="onTablePageChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
// import util from 'jw_common/util'
import ColumnPopover from "./column-popover";

const PAGE_SIZE_LIST = [15, 25, 35, 45];

export default {
  props: [
    "data",//表格数据
    "header",//表头
    "isSelection",//是否显示checkbox  Boolean
    "showPagination",//是否展示分页 Boolean
    "stripe",
    "highlightCurrentRow",//是否要高亮当前行 Boolean
    "pageSize",//分页size
    "totalCount",//数据总数
    "currentPage",//当前页数
    "isRowCheckBox",//
    "height",//高度
    "isPermissionCheck",
    "opsList",
    "defaultSort",
    "border",
    "rowClassName",//行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    "disabledCheckFiled",//为每行设置一个代表是否禁选的属性
    "foldList",
    "treeTable",
    "isRowIndex",//是否要索引 Boolean
    "ifPage",//是否分页 Boolean
    "rowContCheckBox"//是否 点击行与checkbox的关联性 Boolean
  ],

  data() {
    return {
      defLayout: "total, sizes, prev, pager, next, jumper",
      pageSizeList: PAGE_SIZE_LIST
    };
  },

  components: {
    ColumnPopover
  },

  updated() {
    this.updateSelection();
  },

  methods: {
    //返回值決定這一行是否可以勾選
    // disabledCheckFiled:代表傳遞過來的每一項的數據帶一個是否可以選的屬性
    isSelectable(row) {
      return !row[this.disabledCheckFiled];
    },

    onSortChange() {
      let argus = Array.prototype.slice(arguments, 1);

      this.$emit("sort-change", argus);
    },

    onSortBy() {
      let argus = Array.prototype.slice(arguments, 1);

      this.$emit("sort-by", argus);
    },

    getEmptyMessage() {
      return "暂无数据";
    },

    onMenuOperateHandler(menuItem, row) {
      this.$emit("on-operate-click", menuItem, row);
    },

    getTableHeight() {
      if (_.isUndefined(this.height) || _.isNull(this.height)) {
        return "null";
      }

      if (this.height === "auto") {
        return null;
      }

      return this.height || 0;
    },

    hasDefLayout() {
      return this.ifPage;
    },

    //重置checkbox的选择状态
    updateSelection() {
      let sourceTable = this.$refs.sourceTable;
      sourceTable.clearSelection(); //清楚所有的选中状态
      if (this.isSelection) {
        _.each(this.data, row => {
          row.checked && sourceTable.toggleRowSelection(row, true); //默认选中
        });
      }
    },
    toggleRowSelection(row, isChecked) {
      row.checked = isChecked;
      this.$refs.sourceTable.toggleRowSelection(row, isChecked);
    },

    selectionChange(row) {
      if (this.isSelection && this.getRowCheckBoxState()) {
        row.checked = !row.checked;
        this.toggleRowSelection(row, row.checked);
        this.$emit("on-selection-change", row, this);
      }
    },
    // 当用户点击全选，为row赋值一个checked属性true or false
    onSelectAll(selection) {
      if (selection.length !== 0) {
        _.each(this.data, s => {
          s.checked = true;
        });
      } else {
        _.each(this.data, s => {
          s.checked = false;
        });
      }
    },

    //当用户手动勾选数据行的 Checkbox 时触发的事件
    onSelect(selection, row) {
      console.log(row);
      row.checked = !row.checked; //本来没有checked这个属性 自定义赋值一个checked属性默认没有就是undefined 取反！undefined 就是true
      this.$emit("on-selection-change", row, this);
    },

    //当点击某一行触发的事件
    onRowClick(row, event, column) {
      let contxt = this.$refs.sourceTable;
      this.isSelection ? this.rowSelected(row) : "";
      if (!column.property === this.disabledCheckFiled) {
        this.selectionChange(row);
      }
      this.$emit("on-row-click", row, event, contxt, column);
    },

    // 选中当前行时 切换当前行的中状态
    rowSelected(row) {
      if (this.rowContCheckBox) {
        row.checked = !row.checked;
        this.$refs.sourceTable.toggleRowSelection(row);
      } else {
      }
    },

    getRowCheckBoxState() {
      if (this.isRowCheckBox === true) {
        return true;
      }

      return false;
    },

    //获取选中的checkebox
    getSelection() {
      let selections = [];
      _.each(this.data, row => {
        if (row.checked) {
          selections.push(_.clone(row));
        }
      });
      return selections;
    },

    onTablePageChange(pageCount) {
      this.$emit("on-page-change", pageCount);
    },
    handleSizeChange(val) {
      this.$emit("size-change", val);
    },
    onFilterMethod(value, row, column) {
      this.$emit("on-filter-method", value, row, column);
      return row[column.property] == value;
    },

    formatter(item) {
      var innerElement = null;
      var formatterFun = item.formatter;
      if (_.isFunction(formatterFun)) {
        return (row, col, value) => {
          if (_.isFunction(formatterFun)) {
            innerElement = formatterFun.call(this, row, col, value);
          }
          return innerElement;
        };
      }
      return null;
    },

    onCellDblclick(cell) {
      this.$emit("on-dblclick", cell);
    },

    toggleDisplayTr({ row, index }) {
      let item = null;

      if (this.treeTable) {
        for (let i = 0; i < this.foldList.length; i++) {
          item = this.foldList[i];
          // 如果foldList中元素存在于 row.__family中，则该行隐藏。  如果该行的自身标识等于隐藏元素，
          //则代表该元素就是折叠点
          if (_.includes(row.__family, item) && row.__identity !== item) {
            return "display:none;";
          }
        }
      }

      return "";
    }
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
    height: calc(~"100% - 20px");
  }
  .body-hasDefLayout {
    height: calc(~"100% - 59px");
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
    tr:nth-of-type(2n) {
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