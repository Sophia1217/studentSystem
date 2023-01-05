<template>
  <div class="testDetail">
    <div class="testTop">
      <div class="bigtitle">{{ Wjjbxx.wjName }}</div>
      <div class="midtitle">{{ Wjjbxx.wjDy }}</div>
      <div class="smalltitle">
        总题数：{{ Wjjbxx.wjCount }} 合计：{{ Wjjbxx.wjFz }}
      </div>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <div class="item" v-for="(mk, index) in form.fdycpMkTmResList">
        <div class="title">
          <div class="titleRight">模块{{ mk.mk }}</div>
          <div class="titleLeft">题数：{{ mk.yxts }} 合计：{{ mk.hj }}</div>
        </div>
        <div class="content" v-for="(tm, num) in mk.fdycpTmJgResList">
          <div class="question">
            题目：{{ tm.fdycpTm.tmName }}({{ tm.fdycpTm.tmFz }}分)
          </div>
          <div class="answer" v-if="tm.fdycpTm.tmType == '选择题'">
            <el-form-item
              :prop="
                'fdycpMkTmResList[' +
                index +
                '].fdycpTmJgResList[' +
                num +
                '].fdycpTmxxjg.xxPx'
              "
              :rules="rules.xxPx"
            >
              <el-radio-group v-model="tm.fdycpTmxxjg.xxPx">
                <el-radio
                  v-for="xx in tm.fdycpTmxxList"
                  :key="xx.xxPx"
                  :label="xx.xxPx"
                  :disabled="isFinish == '1'"
                  >{{ xx.xxWz }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="answer" v-if="tm.fdycpTm.tmType == '文字题'">
            <el-form-item
              :prop="
                'fdycpMkTmResList[' +
                index +
                '].fdycpTmJgResList[' +
                num +
                '].fdycpTmxxjg.xxWz'
              "
              :rules="rules.xxWz"
            >
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="tm.fdycpTmxxjg.xxWz"
                :readonly="isFinish == '1'"
              />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="editBottom" v-show="isFinish !== '1'">
      <div class="btn confirm" @click="handleUpdata">提交</div>
    </div>
  </div>
</template>
<script>
import { getWjXq, answerWj } from "@/api/test/testDetail";
import { getToken } from "@/utils/auth";
export default {
  name: "testList",

  props: [],
  data() {
    return {
      data: "1111",
      isFinish: this.$route.query.sfwc,
      radio: [],
      Wjjbxx: {},
      form: { fdycpMkTmResList: [] },
      rules: {
        xxWz: [
          {
            required: true,
            message: "作答不能为空",
            trigger: "blur",
          },
        ],
        xxPx: [
          {
            required: true,
            message: "作答不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},

  mounted() {
    this.getXq();
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    getXq() {
      let data = {
        id: this.$route.query.id,
        xghBpcr: this.$route.query.xghBpcr,
        xghDtr: this.$store.getters.userId,
      };
      getWjXq(data).then((res) => {
        this.Wjjbxx = res.data.fdycpWj;
        this.form.fdycpMkTmResList = res.data.fdycpMkTmResList;
        //console.log(this.fdycpMkTmResList);
      });
    },
    handleUpdata() {
      if (!this.checkForm()) {
        this.$message.error("请作答完试卷！");
        return;
      } else {
        let data = {
          wjCount: this.Wjjbxx.wjCount,
          wjFz: this.Wjjbxx.wjFz,
          wjId: this.$route.query.id,
          wjLy: this.Wjjbxx.wjLy,
          xghBpcr: this.$route.query.xghBpcr,
          xghDtr: this.$store.getters.userId,
        };
        this.$set(this.form, "fdycpWjjg", data);
        console.log(this.form);
        answerWj(this.form).then((res) => {
          this.$router.go(-1);
        });
      }
    },
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
