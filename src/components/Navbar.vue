<template>
  <a class="right-menu">
    <span style="margin-right: 10px">{{ name }}</span>
    <el-tooltip
      class="item"
      effect="dark"
      content="退出登录"
      placement="bottom"
    >
      <i class="el-icon-switch-button" />
    </el-tooltip>
  </a>
</template>

<script>
export default {
  name: "navbar",
  props: ["name"],
};
</script>

<style lang="scss" scoped>
.navbar {
  //   height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    color: #409eff;
    font-size: 1.4em;
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    .el-icon-switch-button {
      padding: 3px;
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>