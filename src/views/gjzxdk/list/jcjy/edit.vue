<template>
  <div>
    <div style="margin-top: 15px">
      <topTitle :routeTitle="routeTitle"></topTitle>
    </div>
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
                  <span v-if="bjzt == 1"> {{ formAdd.zzmmmc }}</span>
                  <el-select
                    v-model="formAdd.zzmmm"
                    placeholder="请选择"
                    v-else
                  >
                    <el-option
                      v-for="(item, index) in zzmmList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1"> {{ formAdd.bysj }}</span>
                  <el-date-picker
                    v-else
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd "
                    v-model="formAdd.bysj"
                  ></el-date-picker>
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
                  <span v-if="bjzt == 1"> {{ formAdd.jtzz }}</span>
                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.jtzz"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.lxdh }}</span>

                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.lxdh"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.qq }}</span>

                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.qq"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.email }}</span>
                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.email"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.jydwmc }}</span>
                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.jydwmc"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.rsbmlxdh }}</span>

                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.rsbmlxdh"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1"> {{ formAdd.shengdmmc }}</span>
                  <el-select
                    v-else
                    v-model="formAdd.shengdm"
                    placeholder="请选择"
                    @change="change1"
                  >
                    <el-option
                      v-for="(item, index) in provinceList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1"> {{ formAdd.shidmmc }}</span>
                  <el-select
                    v-else
                    v-model="formAdd.shidm"
                    :placeholder="formAdd.shidmmc || ''"
                    @change="change2"
                  >
                    <el-option
                      v-for="(item, index) in cityList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1"> {{ formAdd.xiandmmc }}</span>
                  <el-select
                    v-else
                    v-model="formAdd.xiandm"
                    :placeholder="formAdd.xiandmmc || ''"
                    @change="change3"
                  >
                    <el-option
                      v-for="(item, index) in zonetList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="乡（街道）" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span v-if="bjzt == 1"> {{ formAdd.xiangdmmc }}</span>
                  <el-select
                    v-else
                    v-model="formAdd.xiangdm"
                    :placeholder="formAdd.xiangdmmc || ''"
                  >
                    <el-option
                      v-for="(item, index) in streetList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1">
                    {{ formAdd.sfxzfszd == "1" ? "是" : "否" }}</span
                  >
                  <el-radio
                    v-model="formAdd.sfxzfszd"
                    label="1"
                    v-if="bjzt == 2"
                    >是</el-radio
                  >
                  <el-radio
                    v-model="formAdd.sfxzfszd"
                    label="2"
                    v-if="bjzt == 2"
                    >否</el-radio
                  >
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
                  <span v-if="bjzt == 1"> {{ formAdd.hylbmc }}</span>
                  <el-select v-model="formAdd.hylb" placeholder="请选择" v-else>
                    <el-option
                      v-for="(item, index) in hyTypeList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1"> {{ formAdd.yqdfwnx }}</span>
                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    controls-position="right"
                    v-model="formAdd.yqdfwnx"
                    placeholder="请输入内容"
                  ></el-input-number>
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
                  <span v-if="bjzt == 1"> {{ formAdd.yjnxfje }}</span>

                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.yjnxfje"
                    placeholder="请输入内容"
                  ></el-input-number>
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
                  <span v-if="bjzt == 1"> {{ formAdd.sjjnxfje }}</span>

                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.sjjnxfje"
                    placeholder="请输入内容"
                  ></el-input-number>
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
                  <span v-if="bjzt == 1"> {{ formAdd.dkbjje }}</span>
                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkbjje"
                    placeholder="请输入内容"
                  ></el-input-number>
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
                  <span v-if="bjzt == 1"> {{ formAdd.jbyhdmmc }}</span>
                  <el-select
                    v-model="formAdd.jbyhdm"
                    placeholder="请选择"
                    v-else
                  >
                    <el-option
                      v-for="(item, index) in yhmcList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
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
                  <span v-if="bjzt == 1"> {{ formAdd.dkhtbh }}</span>

                  <el-input
                    v-else
                    style="width: 216px"
                    v-model="formAdd.dkhtbh"
                    placeholder="请输入内容"
                  ></el-input>
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
                  <span v-if="bjzt == 1">
                    {{ formAdd.dkkssj }}至 {{ formAdd.dkjssj }}</span
                  >
                  <el-date-picker
                    v-else
                    type="daterange"
                    placeholder="选择日期"
                    v-model="formAdd.dksjArr"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width= 60px;"
                  ></el-date-picker>
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
                  <span v-if="bjzt == 1"> {{ formAdd.sqbcje }}</span>
                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.sqbcje"
                    placeholder="请输入内容"
                  ></el-input-number>
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
                  <span v-if="bjzt == 1"> {{ formAdd.yhkh }}</span>
                  <el-input-number
                    v-else
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.yhkh"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">备注</div>
        <el-row :gutter="20">
          <el-col :span="23">
            <span v-if="bjzt == 1"> {{ formAdd.bz }}</span>
            <el-input
              v-else
              v-model="formAdd.bz"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              placeholder="请输入内容"
              maxlength="500"
            ></el-input>
          </el-col>
        </el-row>
        <span class="redSpan">请务必加入基层就业QQ群，长期关注群消息</span>
      </el-form>
      <div style="height: 80px"></div>
    </div>
    <div class="editBottom">
      <div class="btn confirm" @click="binaji" v-if="bjzt == 1 && flag == '3'">
        编辑
      </div>
      <div class="btn confirm" @click="binaji1" v-if="bjzt == 2">取消</div>
      <div class="btn cancel" @click="addClick" v-if="bjzt == 2">保存</div>
    </div>
  </div>
</template>
<script>
import topTitle from "@/components/topTitleStu";
import lctCom from "@/components/lct";
import { edit, getEditdDetails } from "@/api/jccy/index";
import myMixins from "./myMixins";
export default {
  mixins: [myMixins],
  components: {
    topTitle,
    lctCom,
  },
  watch: {
    "formAdd.dksjArr": {
      handler(newName, old) {
        this.formAdd.dkkssj = newName ? newName[0] : "";
        this.formAdd.dkjssj = newName ? newName[1] : "";
      },
    },
  },
  data() {
    return {
      routeTitle: "",
      bjzt: 1,
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
      flag: "",
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
    this.routeTitle = this.$route.meta.title;
    this.lgnsn = this.$route.query.state;
    this.flag = this.$route.query.flag;
    this.showDetail();
    this.getCode("dmgjzxdk"); //国家助学贷款码
    this.getCode("dmzudkyhm"); //国家助学贷款银行码
    this.getCode("dmzzmmm"); // 政治面貌
    this.getCode("dmhylbm"); // 行业类别
    this.getCity();
  },

  methods: {
    binaji() {
      this.bjzt = 2;
      this.formAdd.shidm = "";
      this.formAdd.xiandm = "";
      this.formAdd.xiangdm = "";
    },
    binaji1() {
      this.bjzt = 1;
    },
    change1(val) {
      this.getCity1(val);
      //把市区置空
    },
    change2(val) {
      this.getCity2(val);
      //把区置空
    },
    change3(val) {
      this.getCity3(val);
      //把区置空
    },
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
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
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = { ...this.formAdd, id: this.lgnsn };
        edit(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.$router.push({
              path: "/gjzxdk",
              query: {
                state: 1,
              },
            });
          } else {
            this.$message.error("编辑失败");
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
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
  .cancel {
    color: #005657;
  }
  .confirm {
    background: #005657;
    color: #fff;
  }
}
</style>
