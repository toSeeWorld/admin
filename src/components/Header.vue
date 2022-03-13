<template>
  <header class="navbar navbar-default navbar-static-top" id="top">
    <div class="container-fluid">
      <div class="navbar-header clearfix">
        <button class="toggle-button"></button>
      </div>
      <nav id="navbar" class="navbar-collapse collapse clearfix">
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/home">首页</router-link></li>
          <li><router-link to="/todo">待办</router-link></li>
          <li><router-link to="/blog">博客</router-link></li>
          <li><router-link to="/visitor">访客记录</router-link></li>
          <li><router-link to="/comment">评论区</router-link></li>
          <li>
            <Navbar v-if="name" :name="name" />
            <router-link v-else to="/login" class="login"
              >登录/注册</router-link
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
 
<script>
import { mapState } from "vuex";
import Navbar from "./Navbar.vue";
export default {
  name: "navbar",
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      name: (state) => state.user.name,
    }),
  },
};
</script>
 
<style lang="scss">
.navbar-default {
  border-color: #e6e9f0;
  //   background-color: #fff;
}
.navbar {
  min-height: auto;
  margin-bottom: 0;
  color: #5e6166;
  border-bottom: 1px solid rgba(204, 204, 204, 0.16);
  box-shadow: 0 3px 4px 0 rgb(0 0 0 / 4%);
  z-index: 1;
  flex: 0;
  .navbar-header {
    .toggle-button {
      position: relative;
      float: right;
      padding: 9px 10px;
      margin-top: 8px;
      margin-right: 15px;
      margin-bottom: 8px;
      background-color: transparent;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
    }
  }

  .navbar-collapse {
    &:after {
      clear: both;
    }
  }
  .navbar-nav {
    .nav {
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
    }
    & > li {
      display: block;
      position: relative;
      & > a {
        position: relative;
        display: block;
        color: #7a8599;
        font-size: 14px;
        line-height: 22px;
      }
      .login {
        margin-left: 16px;
        padding: 19px 16px;
        color: #fff;
        border: none;
        border-radius: 0;
        font-size: 14px;
        line-height: 22px;
        background-color: #07beff;
      }
    }
  }
  .collapse {
    display: none;
  }
  @media (min-width: 768px) {
    .navbar-collapse {
      display: block !important;
      height: auto !important;
      padding-bottom: 0;
      overflow: visible !important;
    }
    .navbar-nav > li {
      float: left;
      & > a {
        padding: 17px 18px;
      }
    }
    .navbar-right {
      float: right;
    }
  }
}
</style>