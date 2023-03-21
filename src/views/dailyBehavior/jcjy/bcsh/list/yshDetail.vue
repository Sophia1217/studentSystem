<template>
  <div>
    <div style="margin: 0 20% 0 20%">
      <div class="topHeader">
        <span>基层就业代偿申请表</span>
      </div>
      <div style="text-align: center">
        <span>{{ formAdd.nd }}年度</span>
      </div>
      <el-form
        ref="formAdd"
        style="margin-bottom: 60px"
        :model="formAdd"
        :rules="rules"
        :inline-message="true"
      >
        <div class="mkHeader">学生基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xh }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xm }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xbmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="政治面貌"
                prop="zzmmm"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.zzmmmc }}</span>
                  <!-- <el-select
                      v-model="formAdd.zzmmm"
                      placeholder="请选择"
                      v-if="bjzt == 2"
                    >
                      <el-option
                        v-for="(item, index) in zzmmList"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select> -->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="民族" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.mzmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.sfzh }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="毕业时间"
                class="grayBg"
                label-width="42%"
                prop="bysj"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.bysj }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历及学制" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xlxz }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所学专业" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.zydmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="家庭住址"
                prop="jtzz"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.jtzz }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="联系电话"
                class="grayBg"
                label-width="42%"
                prop="lxdh"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.lxdh }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="QQ"
                prop="qq"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.qq }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="邮箱"
                class="grayBg"
                label-width="21%"
                prop="email"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.email }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">就业单位基本信息</div>

        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="jydwmc"
                :rules="rules.common"
                label="就业单位名称"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.jydwmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="人事部门联系电话"
                prop="rsbmlxdh"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.rsbmlxdh }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="省"
                class="grayBg"
                label-width="42%"
                prop="shengdm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.shengdmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="市"
                class="grayBg"
                label-width="42%"
                prop="shidm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.shidmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="县（区）"
                class="grayBg"
                label-width="42%"
                prop="xiandm"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.xiandmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="乡（街道）" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xiangdmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="是否县政府所在地"
                class="grayBg"
                label-width="21%"
                prop="sfxzfszd"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.sfxzfszd == "1" ? "是" : "否" }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="行业类别"
                class="grayBg"
                label-width="42%"
                prop="hylb"
                :rules="rules.common"
              >
                <div class="sqList">
                  <!-- hylbmc -->
                  <span> {{ formAdd.hylbmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="已签订服务年限"
                prop="yqdfwnx"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.yqdfwnx }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">学费及贷款基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="应缴纳学费金额"
                prop="yjnxfje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.yjnxfje }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="实际缴纳学费金额"
                prop="sjjnxfje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.sjjnxfje }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款本金金额"
                prop="dkbjje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.dkbjje }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="经办银行名称"
                prop="jbyhdm"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.jbyhdmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="贷款合同号"
                class="grayBg"
                label-width="21%"
                prop="dkhtbh"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.dkhtbh }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="贷款起止时间"
                class="grayBg"
                label-width="21%"
                prop="dksjArr"
                :rules="rules.common"
              >
                <div class="sqList">
                  <span> {{ formAdd.dkkssj }}至 {{ formAdd.dkjssj }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">历史贷款信息</div>
        <div v-for="(ele, index) in dkInfo" style="margin-top: 18px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款学年" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ ele.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款总金额（元）"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ ele.dkzje }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款类型" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ ele.dklxmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款银行" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ ele.dkyhmc }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同编号" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ ele.htbh }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款开始时间"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ ele.dkkssj }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">申请补偿金额</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="sqbcje"
                :rules="rules.common"
                label="申请补偿金额"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.sqbcje }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="银行卡号"
                prop="yhkh"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.yhkh }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">备注</div>
        <el-row :gutter="20">
          <el-col :span="23">
            <span> {{ formAdd.bz }}</span>
          </el-col>
        </el-row>
        <span class="redSpan">请务必加入基层就业QQ群，长期关注群消息</span>
      </el-form>
      <div style="height: 80px"></div>
    </div>

    <div class="editBottom">
      <div class="btns borderBlack" @click="fanh">
        <span class="title">返 回</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getEditdDetails } from "@/api/jccy/index";
export default {
  data() {
    return {
      dkInfo: [], //贷款信息
      formAdd: {
        //基本信息
        xh: "",
        xm: "",
        xbmc: "",
        zzmmm: "",
        zzmmmc: "",
        mzmc: "",
        sfzh: "",
        bysj: "",
        xlxz: "",
        zydmc: "",
        jtzz: "",
        lxdh: "",
        qq: "",
        email: "",
        //就业单位基本信息
        jydwmc: "",
        rsbmlxdh: "",
        shengdm: "",
        shidm: "",
        xiandm: "",
        xiangdm: "",
        sfxzfszd: "",
        hylb: "",
        yqdfwnx: "",
        //学费及贷款基本信息
        yjnxfje: "",
        sjjnxfje: "",
        dkbjje: "",
        jbyhdm: "",
        dkhtbh: "",
        dksjArr: [],
        dkkssj: "",
        dkjssj: "",
        // 申请补偿金额
        sqbcje: "",
        yhkh: "",
        bz: "",
      },
      lgnsn: "",
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.lgnsn = this.$route.query.state;
    this.showDetail();
  },

  methods: {
    fanh() {
      this.$router.push({
        path: "/dailyBehavior/jcjy/jcjyTeaList",
      });
    },
    showDetail() {
      getEditdDetails({
        id: this.lgnsn,
      }).then((res) => {
        this.dkInfo = res.data.rcswLsdkjlRes;
        this.formAdd = { ...res.data, ...res.data.rcswjbxxRes };
        this.formAdd.xlxz = this.formAdd.xz
          ? `${this.formAdd.xz}年${this.formAdd.pyccmc}`
          : `${this.formAdd.xz}${this.formAdd.pyccmc}`;
        this.formAdd.dksjArr = [this.formAdd.dkkssj, this.formAdd.dkjssj];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.borderBlack {
  border: 1px solid grey;
  color: Black;
  background: #fff;
}

.topHeader {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #005657;
}
.mkHeader {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f1f;
  margin: 15px 0 15px 3px;
}
.redSpan {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #ff0000;
}
::v-deep .grayBg .el-form-item__label {
  background-color: #f0f0f0;
  padding: 5px 10px 5px 0px;
}
.grayBg {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}
.sqList {
  padding: 5px 0px 5px 10px;
  width: 85%;
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
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
  .btns {
    margin-right: 15px;
    padding: 0px 10px;
    cursor: pointer;
    border-radius: 4px;
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      // vertical-align: middle;
    }
  }
}
</style>
