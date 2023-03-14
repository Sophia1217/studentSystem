<template>
  <div class="testList">
    <div class="item" v-for="(item, index) in detailData">
      <div class="title">
        <div class="titleRight">{{ item.wjName }}</div>
        <div class="titleLeft">
          <div
            class="btns borderGreen"
            @click="doTest(item)"
            v-show="item.sfwc == '0'"
          >
            <span class="title1">填写问卷</span>
          </div>
          <div
            class="btns borderWhite"
            v-show="item.sfwc == '1'"
            @click="doTest(item)"
          >
            <span class="title2">已填写</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="contentRight">
          适用年度：{{ item.wjYear }} 适用培养层次：{{
            item.wjPycc
          }}
          面向年级：{{ item.wjNj }} 评测辅导员：{{ item.pcFdyXm }}
        </div>
        <div class="contentLeft">
          问卷起始时间：{{ item.wjStartDate }}至{{ item.wjEndDate }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryList } from "@/api/test/stuTest";
import { getToken } from "@/utils/auth";
export default {
  name: "testList",

  props: [],
  data() {
    return {
      data: "1111",
      isFinish: "1",
      detailData: [],
    };
  },
  computed: {},
  watch: {},
  created() {},

  created() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  mounted() {
    this.getList();
  },
  methods: {
    doTest(item) {
      this.$router.push({
        path: "/fdyTestDetail",
        query: {
          id: item.id,
          xghBpcr: item.pcFdyGh,
          sfwc: item.sfwc,
        },
      });
    },
    getList() {
      let data = {
        xh: this.$store.getters.userId,
        orderPx: "",
        orderZd: "",
      };
      queryList(data).then((res) => {
        //console.log(res);
        this.detailData = res.data;
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
    margin-top: 10px;
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
