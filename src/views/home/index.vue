<template>
  <el-card class="container" shadow="never">
    <el-form
      ref="formFilter"
      size="mini"
      :model="queryKeys"
      inline
      label-position="left"
      label-width="100px"
      style="margin-bottom: 20px"
    >
      <el-row>
        <el-col :xl="6" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="queryKeys.name" />
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="6" :md="8" :sm="6" :xs="12">
          <el-button type="primary" @click="handleSearch" size="mini">
            搜索<i class="el-icon-search" style="margin-left: 8px" />
          </el-button>
          <el-button size="mini" @click="handleReset"> 重置 </el-button>
        </el-col>
        <el-col :xl="6" :lg="6" :md="8" :sm="6" :xs="12">
          <el-button
            type="primary"
            class="upload-button"
            @click="handleUpload"
            size="mini"
          >
            上传
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="resouceList" border>
      <!-- <el-table-column label="ID" prop="id"> </el-table-column> -->
      <el-table-column label="资源名称" prop="name"> </el-table-column>
      <el-table-column label="学科" prop="subject"> </el-table-column>
      <el-table-column label="专业" prop="major"> </el-table-column>
      <el-table-column label="年份" prop="year"> </el-table-column>
      <el-table-column label="上传时间" prop="create_time"> </el-table-column>
      <el-table-column label="贡献者" prop="contributor"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handlePreview(scope.row)" size="mini">
            预览
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <FileUpload :visible.sync="showUploadDialog" @refresh="handleSearch" />
    <!-- <FilePreivew  :visible.sync="showPreviewDialog" /> -->
  </el-card>
</template>
 
<script>
import FileUpload from "./components/FileUpload";
import FilePreivew from "./components/FilePreview";
import { getResouceList } from "@/api/index";
export default {
  name: "vueName",
  components: {
    FileUpload,
    FilePreivew,
  },
  data() {
    return {
      resouceList: [],
      showUploadDialog: false,
      showPreviewDialog: false,
      queryKeys: {
        name: "",
      },
      pageConfig: {
        page: 1,
        pageSize: 20,
      },
      total: 0,
    };
  },
  created() {
    this.handleSearch();
  },
  methods: {
    async handleSearch() {
      const { content, code, total } = await getResouceList({
        ...this.queryKeys,
        ...this.pageConfig,
      });
      if (code === 200) {
        this.resouceList = content;
        this.total = total;
      }
    },
    handleUpload() {
      this.showUploadDialog = true;
    },
    handlePreview({ content }) {
      // console.log(row);
      this.$router.push({ path: "/preview", query: { content } });
    },
    handleReset() {
      this.$refs.formFilter.resetFields();
    },
    handleCurrentChange(page) {
      this.pageConfig.page = page;
      this.handleSearch();
    },
  },
};
</script>
 
<style lang="scss">
.upload-button {
  float: right;
}
.pagination {
  // margin-right: 0;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  // float: right;
}
</style>