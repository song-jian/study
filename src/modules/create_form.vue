<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 13:52:46
 * @LastEditTime: 2019-08-23 15:32:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form_wrapper">
    <BreadCrumb :data="getTitle()"></BreadCrumb>
    <div class="form_box">
      <div class="back">
        <span>创建</span>
        <el-button type="primary" size="small" @click="cancel">返回</el-button>
      </div>
      <div class="form">
        <Form :data="baseConfig" :rules="rules" :colCount="2" ref="control">
          <el-col slot="last-form-item">
            <el-col :span="12">
              <el-form-item label="分类" prop="classify">
                <el-tree
                  ref="mytree"
                  node-key="oid"
                  :expand-on-click-node="false"
                  :data="classifyTree"
                  default-expand-all
                  check-on-click-node
                  show-checkbox
                  :check-strictly="true"
                  :props="defaultProps"
                  @check-change="onCurrentCheckedChangeHandler"
                />
              </el-form-item>
            </el-col>
          </el-col>
        </Form>
      </div>
      <div class="submit">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "../components/bread-crumb";
import Form from "../components/form";
export default {
  props: {
    initData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      baseConfig: {
        list: [
          {
            type: "input",
            name: "名称",
            prop: "name",
            disabled: false
          },
          {
            type: "input",
            name: "编码",
            prop: "code",
            disabled: false
          },
          {
            type: "select",
            name: "类型",
            prop: "type",
            placeholder: "",
            list: [
              { label: "连接", value: "Connection" },
              { label: "计算", value: "Calculation" },
              { label: "应用", value: "Application" }
            ]
          },
          {
            type: "select",
            name: "编程语言",
            prop: "language",
            placeholder: "",
            list: [
              { label: "go", value: "go" },
              { label: "java", value: "java" },
              { label: "js", value: "js" }
            ]
          },
          {
            type: "upload",
            action: "http://gateway.dev.jwis.io/file/file/upload",
            name: "模拟图",
            prop: "imgUrl1"
          },
          {
            type: "upload",
            action: "http://gateway.dev.jwis.io/file/file/upload",
            name: "实物图",
            prop: "imgUrl2"
          }
        ],
        form: {
          name: this.initData.name || "",
          code: this.initData.code || "",
          type: this.initData.type || "",
          // imgUrl:'1164825767313399808' || ''
          imgUrl: this.initData.imgUrl || "",
          classify: this.initData.classify || ""
        }
      },
      rules: {
        name: { required: true, message: "Required" }
      },
      classifyTree: [],
      defaultProps: {}
    };
  },
  components: {
    BreadCrumb,
    Form
  },
  methods: {
    getTitle() {
      return [{ name: "组件管理" }];
    },
    onCurrentCheckedChangeHandler() {},
    submit() {
      this.$refs.control.validate().then(() => {
        let controlValue = this.$refs.control.getValue();
        let $refs = this.$refs;
        let inData = {};

        if ($refs.in) {
          _.extend(inData, {
            inputParamIds: $refs.in.getData()
          });
        }
        // this.$emit(
        //   'submit',
        //   _.extend(controlValue, inData)
        // )
        console.log(_.extend(controlValue, inData));
      });
    },
    cancel() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.form_wrapper {
  background-color: #f2f4f6;
  padding: 20px;
  padding-top: 0;
  height: 100%;
  box-sizing: border-box;
  .form_box {
    background-color: #fff;
    border: 1px solid #d6d7d9;
    border-radius: 4px;
    box-sizing: border-box;
    height: calc(100% - 50px);
    .back {
      padding: 0 20px;
      box-sizing: border-box;
      line-height: 54px;
      display: flex;
      border-bottom: 1px solid #d6d7d9;
      align-items: center;
      justify-content: space-between;
    }
    .submit {
      margin: 0 auto;
      width: 50%;
      display: flex;
      justify-content: space-around;
      .el-button {
        width: 100px;
      }
    }
  }
}
</style>