<template>
  <div class="container todo-module" ref="todo">
    <div class="layout-main" :style="styleTheme">
      <div class="todo-header">
        <div>
          <div class="todo-day">我的一天</div>
          <div class="todo-current">{{ currentDay }}</div>
        </div>
        <div style="position: relative">
          <div class="dot-container" @click.stop="showSelctor = true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            :class="['backgound-selector', showSelctor ? 'showSelctor' : '']"
          >
            <div>
              <div class="background-theme">主题</div>
              <div class="background-list">
                <ul>
                  <li
                    v-for="(bg, index) in colorList"
                    :key="bg.url"
                    @click.stop="handleChoose(bg)"
                    :style="{ marginRight: index % 2 === 0 ? '10px' : '0px' }"
                  >
                    <img
                      style="width: 100%; height: 100%"
                      :src="bg.url"
                      alt=""
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="todo-list">
        <div class="task-list">
          <ul>
            <li v-for="(task, index) in taskList" :key="task">
              <el-checkbox @change="handleAppend(index)" />
              <div class="text-box">{{ task }}</div>
              <div class="delete-container">
                <i class="el-icon-delete" @click="taskList.splice(index, 1)" />
              </div>
            </li>
          </ul>
        </div>
        <div class="task-list" v-if="finishTask.length > 0">
          <div class="finish">已完成</div>
          <ul>
            <li v-for="(task, index) in finishTask" :key="task">
              <el-checkbox :value="true" @change="handleRemove(index)" />
              <div class="text-box finish-text">{{ task }}</div>
              <div class="delete-container">
                <i
                  class="el-icon-delete"
                  @click="finishTask.splice(index, 1)"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="todo-append">
        <input
          class="input-append-task"
          v-model="task"
          @keyup.enter="handleAppendTask"
          placeholder="输入文本并按回车添加"
        />
      </div>
    </div>
  </div>
</template>
 
<script>
import { colorList } from "./modules";
export default {
  name: "vueName",
  data() {
    return {
      msg: "Welcome to your vueName",
      task: "",
      taskList: [],
      finishTask: [],
      colorList,
      currentBackground: "http://file.ririxue.cn/xiyang.jpeg",
      showSelctor: false,
    };
  },
  computed: {
    styleTheme() {
      return {
        backgroundImage: `url(${this.currentBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      };
    },
    currentDay() {
      const weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      const date = new Date();
      const mon =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const week = date.getDay();
      return `${mon}月${day}日,${weeks[week]}`;
    },
  },
  created() {
    const unfinishTask = localStorage.getItem("unfinishTask");
    const finishTask = localStorage.getItem("finishTask");
    this.taskList = unfinishTask ? JSON.parse(unfinishTask) : [];
    this.finishTask = finishTask ? JSON.parse(finishTask) : [];
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.todo.addEventListener("click", () => {
          console.log('ref');
        this.showSelctor = false;
      });
    });
  },
  watch: {
    taskList: function (val) {
      localStorage.setItem("unfinishTask", JSON.stringify(val));
    },
    finishTask: function (val) {
      localStorage.setItem("finishTask", JSON.stringify(val));
    },
  },
  methods: {
    handleAppendTask() {
      if (!this.task) {
        return;
      }
      this.taskList.push(this.task);
      this.task = "";
    },
    handleChoose(bg) {
        console.log('btn');
      this.currentBackground = bg.url;
    },
    handleAppend(index) {
      const val = this.taskList[index];
      this.taskList.splice(index, 1);
      this.finishTask.unshift(val);
    },
    handleRemove(index) {
      const val = this.finishTask[index];
      this.finishTask.splice(index, 1);
      this.taskList.unshift(val);
    },
  },
};
</script>
 
<style scoped lang="scss">
.todo-module {
  position: relative;
  color: rgb(51, 51, 51);
  overflow: hidden;
  height: 100%;
  .layout-main {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    min-height: 560px;
    width: 70%;
    border-radius: 8px;
    box-shadow: 0px 20px 40px 0px rgb(0 0 0 / 8%);
    padding: 0px 20px 40px;

    .todo-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      //   overflow: hidden;
      margin-top: 20px;
      margin-bottom: 20px;
      .todo-day {
        color: #fff;
        font-size: 28px;
        font-weight: 500;
        text-align: left;
      }
      .todo-current {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
      }
      .dot-container {
        width: 23px;
        height: 23px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-radius: 4px;
        &:hover {
          background: rgba(255, 255, 255, 0.75);
        }
        & > span {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
          // margin-bottom: 2px;
        }
      }
      .showSelctor {
        display: block !important;
      }
      .backgound-selector {
        display: none;
        position: absolute;
        top: 100%;
        right: -10px;
        padding: 10px 12px;
        min-height: 200px;
        width: 200px;
        background: white;
        border-radius: 6px;
        z-index: 1;
        font-size: 16px;
        font-weight: 400;
        .background-theme {
          height: 28px;
          line-height: 28px;
        }
        .background-list {
          ul > li {
            float: left;
            width: 80px;
            height: 80px;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .todo-list {
      flex-grow: 1;
      .task-list {
        ul {
          list-style: none;
          li {
            display: flex;
            flex-direction: flex-start;
            align-items: center;
            font-family: PingFangSC-Regular, "PingFang SC";
            background: #fff;
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 400;
            height: 34px;
            line-height: 34px;
            overflow-wrap: break-word;
            word-break: break-all;
            border-radius: 4px;
            .text-box {
              flex: 1;
              margin-left: 10px;
            }
            cursor: pointer;
            .finish-text {
              text-decoration: line-through;
            }
            &:hover {
              background: rgba(255, 255, 255, 0.85);
              & > .delete-container {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                // background: rgba(0, 0, 0, 0.15);
                &:hover {
                  background: rgba(0, 0, 0, 0.15);
                }
              }
            }

            .delete-container {
              // float: right;
              margin-left: 0;
              display: none;
              width: 18px;
              height: 18px;
              //   background: rgba(0, 0, 0, 0.15);
              border-radius: 4px;
              outline: none;

              span {
                width: 3px;
                height: 3px;
                background: rgb(51, 51, 51);
              }
            }
          }
        }
        .finish {
          position: relative;
          width: 100px;
          height: 30px;
          line-height: 30px;
          background: rgba(255, 255, 255, 0.75);
          border-radius: 4px;
          text-align: center;
          margin-bottom: 8px;
          &::before {
            content: "";
            position: absolute;
            left: 13px;
            top: 9px;
            width: 6px;
            height: 6px;
            border-top: 1px solid #999;
            border-right: 1px solid #999;
            transform: rotate(135deg);
            &:focus {
              transform: rotate(45deg);
            }
          }
          &:hover {
            background: #fff;
          }
          &:focus {
            transform: rotate(45deg);
          }
        }
      }
    }
    .todo-append {
      margin-top: 10px;
      margin-bottom: 0px;
      .input-append-task {
        height: 45px;
        width: 100%;
        border-radius: 8px;
        outline: none;
        border: none;
        padding-left: 20px;
      }
    }
  }
}
</style>