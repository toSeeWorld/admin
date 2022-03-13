<template>
  <el-dialog
    class="file-uploader"
    :visible="visible"
    :before-close="close"
    title="文件上传"
    width="40%"
  >
    <el-form
      label-width="140px"
      :model="form"
      label-position="right"
      size="small"
      ref="form"
    >
      <el-form-item
        label="文件"
        prop="content"
        :rules="[{ required: true, message: '请上传文件' }]"
        ><el-upload
          class="upload-demo"
          action="http://ririxue.cn:6998/upload"
          :on-remove="handleRemove"
          multiple
          :limit="1"
          :on-success="handleSuccess"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            <!-- 只能上传jpg/png文件，且不超过500kb -->
            一次只能上传一个文件
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item
        prop="name"
        :rules="[{ required: true, message: '请输入文件名称' }]"
        label="文件名称"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="year" label="年份">
        <el-select v-model="form.year">
          <el-option v-for="i in years" :key="i" :label="i" :value="i" />
          <el-option label="2022" :value="2022" />
        </el-select>
      </el-form-item>
      <el-form-item prop="major" label="专业">
        <el-input v-model="form.major" />
      </el-form-item>
      <el-form-item
        prop="subject"
        label="学科名称"
        :rules="[{ required: true, message: '请输入学科名称' }]"
      >
        <el-input v-model="form.subject" />
      </el-form-item>
      <el-form-item prop="contributor" label="您的名字">
        <el-input v-model="form.contributor" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" size="mini"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
 
<script>
import { addResource } from "../../../api/index";
import { Message } from "element-ui";
import { parseUrlName } from "../../../utils/format";
export default {
  name: "vueName",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      msg: "Welcome to your vueName",
      fileList: [],
      years:[],
      form: {
        name: "",
        contributor: "",
        year: new Date().getFullYear()-1,
        major: "",
        subject: "",
        content: [],
      },
    };
  },
  watch:{
    fileList:function(val){
       this.form.content =  val.map((it) => it.url)
    }
  },
  created(){
    this.getYear()
  },
  methods: {
    getYear(){
      let val = []
      for(let i=2021;i>=1990;i--){
        val.push(i)
      }
      this.years = val
    },
    close() {
      this.$emit("update:visible", false);
    },
    handleSuccess(file) {
      const fileName = decodeURIComponent(parseUrlName(file.url));
      this.fileList.push({
        ...file,
        name: fileName,
        index: this.fileList.length,
      });
      this.form.name = fileName;
    },
    handlePreview() {},
    handleRemove({ index }) {
      this.fileList.splice(index, 1);
    },
    async handleSubmit() {
      try {
        this.$refs.form.validate((valid) => {
          // console.log('vali',valid);
          if (!valid) {
            throw new Error("表单校验失败");
          }
        });
        const { code, msg } = await addResource({
          ...this.form,
          content: this.fileList.map((it) => it.url),
        });
        if (code === 0) {
          Message.success(msg);
          this.$emit("refresh");
          this.close();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style lang="scss" >
.file-uploader {
  .el-dialog__header {
    text-align: left;
  }
  .el-input {
    width: 300px;
  }
}
</style>