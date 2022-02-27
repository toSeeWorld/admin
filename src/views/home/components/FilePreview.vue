<template>
  <div style="height:100vh">
    <iframe :src="filePath"  width="100%" height="100%" frameborder="0">
    </iframe>
  </div>
</template>
 
<script>
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
    };
  },
  computed:{
    filePath(){
      return this.$route.query.content
    }
  },
  methods: {
  
  },
};
</script>
 
<style lang="scss">
.file-preview {
  // height: 100vh;
}
</style>