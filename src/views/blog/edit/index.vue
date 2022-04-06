<template>
  <div class="editor-blog">
    <header class="header-title clear">
      <input class="title-input" v-model="title" />
      <el-button
        class="save-btn"
        @click="handleSaveArticle"
        type="primary"
        size="small"
        >保存文章</el-button
      >
    </header>
    <div class="editor-container">
      <quill-editor
        class="editor"
        ref="myTextEditor"
        :value="content"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
      <!-- <div class="output code">
      <code class="hljs" v-html="contentCode"></code>
    </div> -->
      <div class="output ql-snow">
        <div class="ql-editor" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import dedent from "dedent";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";
// highlight.js style
import "highlight.js/styles/tomorrow.css";
// import theme style
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { addArticle } from "../../../api";
export default {
  name: "quill-example-snow",
  title: "Theme: snow",
  components: {
    quillEditor,
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            //   [{ 'font': [] }],
            //   [{ 'color': [] }, { 'background': [] }],
            //   [{ 'align': [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      content: "",
      title: "",
    };
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.content = value.html;
    }, 466),
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    async handleSaveArticle() {
      const { title, content } = this;
      const { code } = await addArticle({ title, content });
      if(+code ===0){
          this.$message.success("保存文章成功！")
          this.$router.push("/blog")
      }
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },
  mounted() {
    console.log("this is Quill instance:", this.editor);
  },
};
</script>

<style lang="scss" scoped>
.editor-blog {
    background: #fff;
  .header-title {
    // overflow: hidden;
    .title-input {
      float: left;
      width: calc(100% - 80px);
      height: 32px;
      outline: none;
      text-indent: 10px;
      font-size: 16px;
      border-radius: 4px;
      border: 1px solid #ccc;
      //   margin-bottom: 1px;
    }
    .save-btn {
      float: right;
      //   padding-left: 20px;
    }
  }
  .clear {
    &::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  .editor-container {
    display: flex;
    height: 30rem;
    overflow: hidden;

    .editor,
    .output {
      width: 50%;
    }

    $toolbar-height: 41px;

    .editor {
      border-bottom: 1px solid #ccc;
      padding-bottom: $toolbar-height;

      .ql-custom-button {
        width: 100px;
      }
    }

    .output {
      border: 1px solid #ccc;
      border-left: none;

      .title {
        height: $toolbar-height;
        line-height: $toolbar-height;
        padding-left: 10px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>