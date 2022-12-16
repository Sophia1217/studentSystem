<template>
  <div class="testList">
    <div class="item">
      <div class="title">
        <div class="titleRight">研究生2022测评问卷</div>
        <div class="titleLeft">
          <div
            class="btns borderGreen"
            @click="doTest"
            v-show="isFinish == '1'"
          >
            <span class="title1">填写问卷</span>
          </div>
          <div class="btns borderWhite" v-show="isFinish == '2'">
            <span class="title2">已填写</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="contentRight">
          适用年度：{{ data }} 适用培养层次：{{ data }} 面向年级：{{
            data
          }}
          评测辅导员：{{ data }}
        </div>
        <div class="contentLeft">问卷起始时间：{{ data }}至{{ data }}</div>
      </div>
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
    doTest() {
      this.$router.push({
        path: "/fdyTestDetail",
        // query: {
        //   id: row.id,
        //   xzdmOld: row.xzdm,
        // },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.testList {
  padding: 30px;
  background: #f5f5f5;
  .item {
    background: #ffffff;
    height: 150px;
    padding: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 30px 10px;
      .titleRight {
        font-size: 26px;
        font-weight: 600;
      }
      .titleLeft {
        .btns {
          cursor: pointer;
          border-radius: 4px;
          .title2 {
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            padding: 5px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            padding: 5px;
            // vertical-align: middle;
          }
        }
        .borderGreen {
          border: 1px solid grey;
          background: #005657;
          display: flex;
          align-items: center;
        }
        .borderWhite {
          background: #fff;
          border: 1px solid grey;
          display: flex;
          align-items: center;
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 10px 10px;
      .contentRight {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
}
</style>
