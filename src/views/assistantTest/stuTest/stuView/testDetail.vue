<template>
  <div class="testDetail">
    <div class="testTop">
      <div class="bigtitle">问卷题目{{ data }}</div>
      <div class="midtitle">问卷导语{{ data }}</div>
      <div class="smalltitle">总题数：{{ data }} 合计：{{ data }}</div>
    </div>
    <div class="item">
      <div class="title">
        <div class="titleRight">模块</div>
        <div class="titleLeft">题数：{{ data }} 合计：{{ data }}</div>
      </div>
      <div class="content">
        <div class="question">题目：{{ data }}</div>
        <div class="answer">
          <el-radio-group v-model="radio">
            <el-radio label="1">Option 1</el-radio>
            <el-radio label="2">Option 2</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="editBottom">
      <div class="btn confirm" @click="handleUpdata">提交</div>
    </div>
  </div>
</template>
<script>
import { addUser, updateUser } from "@/api/system/user";
import { getToken } from "@/utils/auth";
export default {
  name: "testList",

  props: [],
  data() {
    return {
      data: "1111",
      isFinish: "1",
      radio: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    handleUpdata() {},
  },
};
</script>

<style lang="scss" scoped>
.testDetail {
  padding: 30px;
  .testTop {
    display: flex;
    flex-direction: column;
    .bigtitle {
      font-size: 26px;
      text-align: center;
      line-height: 32px;
      padding: 5px;
    }
    .midtitle {
      font-size: 20px;
      text-align: center;
      line-height: 32px;
      padding: 5px;
    }
    .smalltitle {
      font-size: 16px;
      text-align: center;
      line-height: 32px;
      padding: 5px;
    }
  }

  //background: #f5f5f5;
  .item {
    background: #ffffff;
    height: 150px;
    padding: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 15px 0px;
      .titleRight {
        font-size: 20px;
        font-weight: 600;
      }
      .titleLeft {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      margin: 10px 10px 10px 0px;
      .question {
        font-size: 18px;
        font-weight: 500;
        margin: 10px 10px 10px 0px;
      }
      .answer {
        flex-direction: row;
      }
    }
  }
  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
}
</style>
