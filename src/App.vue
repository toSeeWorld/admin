<template>
  <div id="app">
    <Header />
    <router-view />
    <div class="footer-blogroll">
      <a href="http://beian.miit.gov.cn/" target="_blank">
        琼ICP备2022001150号</a
      >
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import { mapMutations } from "vuex";
import { getToken } from "./utils/auth";
import { getLoginInfo } from "./api";
export default {
  name: "App",
  components: {
    Header,
  },
  async created() {
    if (getToken) {
      const { result } = await getLoginInfo();
      this.setUserName(result.name);
      this.setUserAdmin(result.isAdmin);
    }
  },
  methods: {
    ...mapMutations("user", ["setUserName", "setUserAdmin"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.footer-blogroll {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-top: 16px;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  line-height: 22px;
  color: #495770;
  white-space: nowrap;
}
</style>
