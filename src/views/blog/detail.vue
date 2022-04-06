<template>
  <div class="article-detail">
    <h2>{{ detail.title }}</h2>
       <div class="box-item-info">
              <span><i class="el-icon-time" /> {{ detail.createdAt }}</span>
              <span> <i class="el-icon-collection-tag" /> js </span>
              <span><i class="el-icon-view" /> {{ detail.hot }}</span>
            </div>
    <div class="output ql-snow">
      <div class="ql-editor" v-html="detail.content"></div>
    </div>
    <!-- </article> -->
  </div>
</template>
 
<script>
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";
// highlight.js style
import "highlight.js/styles/tomorrow.css";
// import theme style
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { getArticleDetail } from "../../api";
export default {
  name: "article-detail",
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    async getList() {
      const { id } = this.$route.params;
      const { result, code } = await getArticleDetail({ id });
      if (+code === 0) {
        this.detail = result;
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>
 
<style lang="scss">
.article-detail {
  margin: 20px auto;
  background: #fff;
  width: 75%;
  padding: 10px 20px;
  h2 {
      padding-left: 16px;
      height: 32px;
      line-height: 32px;
      text-align: center;
  }
//   border: 1px solid red;
}
</style>