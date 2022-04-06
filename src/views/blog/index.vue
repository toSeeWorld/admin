<template>
  <div class="container clearfix">
    <div class="left-box blog-box">
      <ul class="article-box-item" v-for="item in list" :key="item.id">
        <li>
          <a :href="`#/detail-blog/${item.id}`">
            <h2>{{ item.title }}</h2>
            <div class="box-item-info">
              <span><i class="el-icon-time" /> {{ item.createdAt }}</span>
              <span> <i class="el-icon-collection-tag" /> js </span>
              <span><i class="el-icon-view" /> {{ item.hot }}</span>
            </div>
            <div class="short-article" v-html="item.content"></div
          ></a>
        </li>
      </ul>
    </div>
    <div class="right-box blog-box">
      <el-button type="primary" size="small" @click="handleAddBlog">
        去写文章<i class="el-icon-arrow-right" />
      </el-button>
    </div>
  </div>
</template>
 
<script>
import { getArticleList } from "../../api";
export default {
  name: "vueName",
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getList() {
      const { result, code } = await getArticleList();
      if (+code === 0) {
        this.list = result.list;
      }
    },
    handleViewDetail({ id }) {
      // console.log('id',row);
      this.$router.push({ path: `/detail-blog/${id}` });
    },
    handleAddBlog(){
      this.$router.push({ path: `/edit-blog` });

    }
  },
  created() {
    this.getList();
  },
};
</script>
 
<style scoped lang="scss">
.container {
  margin: 0px auto;
  width: 80%;
  .left-box {
    width: 75%;
  }
  .right-box {
    margin-left: 16px;
    // width: 25%;
    // text-align: center;
  }
  .blog-box {
    float: left;
    .article-box-item {
      padding: 20px;
      margin-bottom: 16px;
      background: #fff;
      transition: all 0.2s linear;
      &:hover {
        box-shadow: 0px 5px 10px 2px #cac8c8;
        transform: translateY(-2px);
      }
      .box-item-info {
        margin: 8px 0px;
        span {
          padding-right: 10px;
        }
      }
      .short-article {
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        color: #7f7676;
      }
    }
  }
}
.blank {
  font-size: 14px;
  text-align: center;
}
</style>