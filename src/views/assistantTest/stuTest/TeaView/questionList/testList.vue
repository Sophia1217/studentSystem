<template>
  <div class="testList">
    <div class="header">
      <div class="headerRight">问卷列表</div>
      <div class="headerLeft">
        <div class="btns borderGreen" @click="createTest">
          <span class="title1">创建问卷</span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">
        <div class="titleRight">问卷名称</div>
        <div class="titleLeft">
          <div class="btns borderWhite" @click="downTest">
            <span class="title2">分析&amp;下载</span>
          </div>
          <div class="btns borderWhite">
            <span class="title2">预览</span>
          </div>
          <div class="btns borderWhite">
            <span class="title2">复制</span>
          </div>
          <div class="btns borderWhite">
            <span class="title2">删除</span>
          </div>
          <div class="btns borderGreen">
            <span class="title1">编辑</span>
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
        <div class="contentLeft">
          <span>问卷起始时间:</span>

          <el-date-picker
            v-model="sqkfsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始年月日"
            end-placeholder="结束年月日"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="timeChange()"
            :disabled="kgzt == '0' ? false : true"
            :clearable="false"
          >
          </el-date-picker>

          <el-switch
            v-model="kgzt"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
            active-value="0"
            inactive-value="1"
            @change="kgChange()"
          ></el-switch>
        </div>
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
      kgzt: "1",
      sqkfsj: [],
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
    createTest() {
      //   this.$router.push({
      //     path: "/fdyTestDetail",
      //     // query: {}
      //   });
    },
    downTest(){//应该有row
      this.$router.push({
        path: "/assistantTest/stuTest/stuDownTest",
        // query: {
        //   id: row.id,
        // },
      });
    },
    kgChange() {},
    timeChange() {},
  },
};
</script>

<style lang="scss" scoped>
.testList {
  padding: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    // margin: 10px 10px 10px 10px;
    margin-bottom: 5px;
    .headerRight {
      font-size: 22px;
      font-weight: 600;
    }
    .headerLeft {
      .btns {
        cursor: pointer;
        border-radius: 4px;
        .title1 {
          font-size: 16px;
          text-align: center;
          line-height: 32px;
          color: #fff;
          padding: 3px;
          // vertical-align: middle;
        }
      }
      .borderGreen {
        border: 1px solid grey;
        background: #005657;
        display: flex;
        align-items: center;
      }
    }
  }
  .item {
    background: #ffffff;
    height: 120px;
    padding: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 20px 10px;
      .titleRight {
        font-size: 20px;
        font-weight: 500;
      }
      .titleLeft {
        display: flex;
        flex-direction: row;
        align-items: center;
        .btns {
          cursor: pointer;
          border-radius: 2px;
          .title2 {
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            padding: 3px 15px 3px 15px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 16px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            padding: 3px 15px 3px 15px;
            // vertical-align: middle;
          }
        }
        .borderGreen {
          border: 1px solid grey;
          background: #005657;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .borderWhite {
          background: #fff;
          border: 1px solid grey;
          display: flex;
          align-items: center;
          margin-right: 10px;
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
      .contentLeft {
      }
    }
  }
}
</style>
