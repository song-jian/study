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
    <el-form
      :model="form"
      ref="form"
      size="small"
      :label-position="labelPosition || 'left'"
      :label-width="labelWidth || '120px'"
      :rules="rules"
    >
      <slot name="first-form-item" />
      <el-row v-for="(row,index) in list" class="search-row" :key="index">
        <el-col :span="cols" v-for="(item,i) in row" :key="i">
          <el-form-item :prop="item.prop" :label="item.name">
            <label v-if="item.type === 'label'" class="content-label">{{form[item.prop]}}</label>

            <el-input
              v-else-if="item.type=='input'"
              @input="onChange(item)"
              class="row-col-input content-col"
              v-model.trim="form[item.prop]"
              :placeholder="item.placeholder"
            />

            <el-switch v-else-if="item.type=='switch'" v-model="form[item.prop]"></el-switch>

            <el-input
              v-else-if="item.type=='textarea'"
              type="textarea"
              @input="onChange(item)"
              class="row-col-input content-col"
              v-model.trim="form[item.prop]"
              :placeholder="item.placeholder"
              :rows="6"
            />
            <el-upload
              v-else-if="item.type=='upload'"
              class="_upload"
              :headers="getToken()"
              :accept="item.accept || accept"
              :action="item.action"
              :show-file-list="false"
              :on-error="onUploadError"
              :before-upload="beforeUpload"
              :on-success="onIconUploadSuccess"
            >
              <img v-if="form[item.prop]" :src="getUploadedImgUrl(form[item.prop])" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-select
              v-else-if="item.type=='select'"
              @change="onChange(item)"
              class="content-col"
              v-model="form[item.prop]"
              :placeholder="item.placeholder"
              :filterable="item.filterable"
              :allow-create="item.allowCreate"
              clearable
            >
              <el-option
                v-for="(option,j) in item.list"
                :key="j"
                :label="option.label"
                :value="option.value"
              />
            </el-select>

            <el-checkbox
              v-else-if="item.type === 'checkbox'"
              v-model="form[item.prop]"
              @change="onChange(item)"
              :class="{ 'checkbox-wrapper-fix': labelPosition==='top' }"
            />
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
const COL_COUNT = 24;

export default {
  props: ["data", "colCount", "labelPosition", "rules", "labelWidth"],

  data() {
    return {
      list: [],
      form: {},
      cols: COL_COUNT / (this.colCount || 3),
      accept: "image/gif, image/jpeg, image/png, image/jpg"
    };
  },

  mounted() {
    this.formatRows(this.data);
  },

  watch: {
    data(newData) {
      this.formatRows(newData);
    },

    colCount(newColCount) {
      this.cols = COL_COUNT / this.newColCount;
    }
  },

  methods: {
    formatRows(newData) {
      let row = [];
      let list = [];
      let newList = newData.list;
      let rowCount = this.colCount || 3;

      _.each(newList, (item, index) => {
        if (index % rowCount === 0) {
          row = [item];
          list.push(row);
        } else {
          row.push(item);
        }
      });

      this.list = list;
      this.form = newData.form;
    },

    onChange(item) {
      this.$emit("change", item);
    },

    getValue() {
      return _.clone(this.form);
    },

    validate() {
      return this.$refs.form.validate();
    },

    clearValidate() {
      return this.$refs.form.clearValidate();
    },
    getToken() {
      return { token: "6e382df8-1cba-4aaa-a15c-f07c41d1563c" };
    },
    beforeUpload(file) {
      if (_.isString(file)) {
        if (/.jpeg|.png|.jpg|.jpeg|.gif/.test(file)) {
          return true;
        } else {
          this.$warning("请上传一张照片");
          return false;
        }
      }

      let isGif = file.type === "image/gif";
      let isJPG = file.type === "image/jpeg";
      let isPNG = file.type === "image/png";
      let isLt500KB = file.size / 1024 < 500;
      if (!(isJPG || isPNG || isGif)) {
        this.$warning("请上传一张照片");
      }

      if (!isLt500KB) {
        this.$warning("最大500kb");
      }

      return (isJPG || isPNG || isGif) && isLt500KB;
    },

    onIconUploadSuccess({ result }) {
      this.form.imgUrl = result.oid;
    },

    onUploadError(error) {
      this.$error(error.msg);
    },
    getUploadedImgUrl(name) {
      name = encodeURIComponent(name);
      return `http://gateway.dev.jwis.io/file/file/downloadByOid?oid=${name}`;
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
  .el-input {
    width: 80%;
  }
  .el-col {
    padding: 0 10px;
  }
  .el-select {
    width: 80%;
    display: block;
  }
  ._upload {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    i{
      font-size: 16px;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
    &:hover {
      border-color: #409EFF;
    }
  }
}
</style>