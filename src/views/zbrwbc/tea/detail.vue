<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle" v-if="sqlxm == 2">应征入伍学费补偿申请表</p>
        <p class="toptitle" v-if="sqlxm == 1">退役士兵学费补偿申请表</p>
      </div>

      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <div class="imgWrap">
          <div class="photo">
            <img
              :src="
                detailInfoData
                  ? 'data:image/png;base64,' + detailInfoData.byzp
                  : ''
              "
              alt="照片"
            />
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ xsjbxx.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ xsjbxx.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ xsjbxx.xbmc }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ xsjbxx.zzmmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ xsjbxx.csrq }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">身份证号</div>
                <div class="content">
                  {{ xsjbxx.sfzh }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">院系</div>
                <div class="content">
                  {{ xsjbxx.pydwmc }}
                </div>
              </div>
            </el-col>

            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ xsjbxx.zydmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">班级</div>
                <div class="content">
                  {{ xsjbxx.bjdmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">现住址</div>
                <div class="content">
                  {{ xsjbxx.xzz }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ xsjbxx.lxdh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">就读高校</div>
                <div class="content">
                  {{ xsjbxx.jdgx }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">高校隶属关系</div>
                <div class="content">
                  <el-radio-group v-model="xsjbxx.gxlsgx" disabled>
                    <el-radio label="1" size="large">中央</el-radio>
                    <el-radio label="2" size="large">地方</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 申请类型 -->
      <div class="headline" v-if="sqlxm == 1">
        <div>申请类型</div>
      </div>

      <div class="tableStyle" v-if="sqlxm == 1">
        <div class="inputArea" style="margin-bottom: 20px">
          <el-radio-group v-model="detailInfoData.sfdq" disabled>
            <el-radio label="1" size="large">退役复学</el-radio>
            <el-radio label="2" size="large">退役入学</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 申请补偿或代偿 -->
      <div class="headline" v-if="sqlxm == 2">
        <div>申请补偿或代偿</div>
      </div>

      <div class="tableStyle" v-if="sqlxm == 2">
        <div class="inputArea" style="margin-bottom: 20px">
          <el-radio-group v-model="detailInfoData.jtsqlxm" disabled>
            <el-radio label="1" size="large">学费补偿</el-radio>
            <el-radio label="2" size="large">国家助学贷款代偿</el-radio>
          </el-radio-group>
        </div>
        <div class="information" v-show="detailInfoData.jtsqlxm == 1">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">应缴纳学费金额总计（元）</div>
                <div class="content">
                  {{ detailInfoData.yjnxfjezj }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="information" v-show="detailInfoData.jtsqlxm == 2">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">高校国家助学贷款本金（元）</div>
                <div class="content">
                  {{ detailInfoData.gxgjzxdkbj }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">生源地信用助学贷款本金（元）</div>
                <div class="content">
                  {{ detailInfoData.sydxyzxdkbj }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 就学和服役情况 -->
      <div class="headline" v-if="sqlxm == 1">就学和服役情况</div>
      <div class="tableStyle" v-if="sqlxm == 1">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">考入本校年月</div>
                <div class="content">
                  {{ detailInfoData.krbxny }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">参加何种考试考入</div>
                <div class="content">
                  {{ detailInfoData.cjhzkskrm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">服役前最高学历</div>
                <div class="content">
                  {{ detailInfoData.fyqzgxlm }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">入伍时间</div>

                <div class="content">
                  {{ detailInfoData.rwsj }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">退役时间</div>
                <div class="content">
                  {{ detailInfoData.twsj }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">复学时间</div>
                <div class="content">
                  {{ detailInfoData.fxsj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">退役身份</div>
                <div class="content">
                  {{ detailInfoData.tysf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">现阶段就读学历层次</div>
                <div class="content">
                  {{ detailInfoData.xjdjdxlccm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">是否自主就业</div>
                <div class="content">
                  <el-radio-group v-model="detailInfoData.sfzzjym" disabled>
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">考入本校前是否享受过本政策资助</div>
                <div class="content">
                  <el-radio-group v-model="detailInfoData.sfxszzm" disabled>
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 申请学费减免情况 -->
      <div class="headline" v-if="sqlxm == 1">申请学费减免情况</div>
      <div class="tableStyle" v-if="sqlxm == 1">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学制年限</div>
                <div class="content">{{ xsjbxx.xz }}年</div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">剩余就读年限</div>
                <div class="content">{{ detailInfoData.syjdnx }}年</div>
              </div>
            </el-col>

            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">申请减免总计（元）</div>
                <div class="content">{{ detailInfoData.sqjezj }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第一学年</div>
                <div class="content">
                  <!-- <el-form-item prop="xnxfbzList[0].xn" :rules="rules.common"> -->
                  {{ detailInfoData.xnxfbzList[0].xn }}

                  <!-- </el-form-item> -->
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[0].xf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[0].bz }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第二学年</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[1].xn }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[1].xf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[1].bz }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第三学年</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[2].xn }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[2].xf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[2].bz }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第四学年</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[3].xn }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[3].xf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[3].bz }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第五学年</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[4].xn }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[4].zf }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  {{ detailInfoData.xnxfbzList[4].bz }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 历史缴纳学费信息 -->
      <div class="headline" v-if="sqlxm == 2">历史缴纳学费信息</div>
      <div class="tableStyle" v-if="sqlxm == 2">
        <div class="information" v-for="(item, index) in xfxxList" :key="index">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">{{ item.xn }}</div>
                <div class="content">{{ item.je }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 历史贷款信息 -->
      <div class="headline" v-if="sqlxm == 2">历史贷款信息</div>
      <div class="tableStyle" v-if="sqlxm == 2">
        <div class="information" v-for="(item, index) in dkxxList" :key="index">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款学年</div>
                <div class="content">{{ item.xn }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款总金额（元）</div>
                <div class="content">{{ item.dkzje }}</div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款类型</div>
                <div class="content">{{ item.dklxmc }}</div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款银行</div>
                <div class="content">{{ item.dkyh }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">合同编号</div>
                <div class="content">{{ item.htbh }}</div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款开始时间</div>
                <div class="content">{{ item.dkkssj }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="information" v-show="dkxxList.length == 0">暂无</div>
      </div>
      <div class="headline">审核信息</div>
      <div class="tableStyle" style="margin-bottom: 20px">
        <el-form :model="editDetails" ref="editDetails">
          <div class="information" style="margin-bottom: 20px">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item
                  label="审核结果"
                  label-width="120px"
                  prop="shjg"
                  :rules="rules.shjg"
                >
                  <el-select
                    v-model="editDetails.shjg"
                    @change="changeJG(editDetails.shjg)"
                    placeholder="请选择"
                    :disabled="isEdit == 2"
                  >
                    <el-option
                      v-for="item in shjgOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="jeFlag == '02'">
                <el-form-item label="审批金额" label-width="120px" prop="pzje">
                  <el-input-number
                    v-model="editDetails.spje"
                    controls-position="right"
                    :min="0"
                    :max="9999999"
                    :disabled="isEdit == 2"
                  >
                  </el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="审核意见" label-width="120px" prop="shyj">
                  <el-input
                    v-model="editDetails.shyj"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    maxlength="500"
                    :readonly="isEdit == 2"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="lctClick">审核记录</div>
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" v-show="isEdit == 1" @click="handlUpdata">
        确定
      </div>
    </div>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      :title="conformText"
      :visible.sync="conformModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span>确认{{ conformType }}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="finalCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="finalConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getZbrwXsjbxx,
  getZbrwDteail,
  insert,
  queryZbrwXn,
  getXsXfDkxx,
  jjFlow,
  tyFlow,
  htFlow,
} from "@/api/zbrw/zbrw";

import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  data() {
    return {
      isEdit: this.$route.query.isEdit,

      xh: this.$route.query.xh,
      lctModal: false,

      xsjbxx: {},
      detailInfoData: {
        xnxfbzList: [
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
          { xn: "", xf: "", bz: "" },
        ],
      },
      editDetails: {
        shyj: "",
        shjg: "",
        pzje: "",
      },
      conformModal: false,
      conformType: "",
      conformText: "",
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      jeFlag: "01",
      kslxOps: [],
      zgxlOps: [],
      jdxlOps: [],
      tysfOps: [],
      sqlbOps: [],
      xnOptions: [],
      dkxxList: [],
      xfxxList: [],
      rules: {
        shjg: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
      },
      sqlxm: this.$route.query.sqlxm,
    };
  },
  created() {},
  mounted() {
    this.getCode("dmzbrwkslxm");
    this.getCode("dmzbrwzgxlm");
    this.getCode("dmzbrwxlccm");
    this.getCode("dmzbrwtysfm");
    this.getDetail();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmzbrwkslxm":
            this.kslxOps = res.data;
            break;
          case "dmzbrwzgxlm":
            this.zgxlOps = res.data;
            break;
          case "dmzbrwxlccm":
            this.jdxlOps = res.data;
            break;
          case "dmzbrwtysfm":
            this.tysfOps = res.data;
            break;
        }
      });
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick() {
      if (!!this.$route.query.processid) {
        this.$refs.child.inner(this.$route.query.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    editButtonClick() {
      this.isEdit = 1;
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.editDetails.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    getDetail() {
      queryZbrwXn().then((res) => {
        this.xnOptions = res.data;
      });
      getZbrwXsjbxx({ xh: this.xh }).then((res) => {
        this.xsjbxx = res.data;
      });
      if (this.$route.query.id) {
        getZbrwDteail({ id: this.$route.query.id, sqlxm: this.sqlxm }).then(
          (res) => {
            this.detailInfoData = res.data;
          }
        );
      }
      if (this.sqlxm == 2) {
        getXsXfDkxx({ xh: this.xh }).then((res) => {
          this.dkxxList = res.data.dkxx;
          this.xfxxList = res.data.xfxx;
        });
      }
    },

    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.$router.go(-1);
    },
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
    handlUpdata() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
      } else {
        this.detailModal = true;
      }
    },
    changeJG(val) {
      if (val && val == "03") {
        this.jeFlag = "01";
        var processid = { processId: this.tableDetail.taskId };
        this.conformType = "退回";
        this.conformText = "退回确认";
        backFlow(processid).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else if (val && val == "02") {
        this.jeFlag = "01";
        this.conformType = "拒绝";
        this.conformText = "拒绝确认";
      } else {
        this.conformType = "同意";
        this.conformText = "同意确认";
        this.jeFlag = "02";
      }
    },
    finalCancel() {
      this.conformModal = false;
    },
    finalConfirm() {
      var data = {
        businesId: this.tableDetail.id,
        processId: this.tableDetail.processid,
        taskId: this.tableDetail.taskId,
        // xh: this.tableDetail.xh,
        opMsg: this.editDetails.shyj ? this.editDetails.shyj : "",
        // spje: this.formDetails1.spje ? this.formDetails1.spje : "",
        // actId: "",
        // actName: "",
      };
      if (this.conformType == "退回") {
        data.actId = this.multipleSelection1.actId;
        data.actName = this.multipleSelection1.actName;
        htFlow(data).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已退回");
        });
      } else if (this.conformType == "拒绝") {
        jjFlow(data).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已拒绝");
        });
      } else {
        data.spje = this.formDetails1.spje ? this.formDetails1.spje : "";
        data.opMsg = this.editDetails.shyj
          ? `审批金额为${this.formDetails1.spje},审批意见：${this.editDetails.shyj}`
          : "";
        tyFlow(data).then((res) => {
          this.conformModal = false;
          this.$router.go(-1);
          this.$message.success("已成功通过");
        });
      }
      this.detailModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  .detail_right {
    flex: 1;
    background: #fff;
    padding: 30px;
    .right_top {
      .toptitle {
        text-align: center;
        font-weight: 500;
        font-size: 24px;
        color: #005657;
        line-height: 24px;
      }
      .timeWrap {
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        color: #383838;
        line-height: 28px;
        .updataTime {
          margin-left: 20px;
        }
      }
    }
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #000;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/arrowDown.png") no-repeat;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }
    }

    .tableStyle {
      position: relative;
      padding: 20px;
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
      .information {
        padding: 0 20px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 200px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            color: #1f1f1f;
            margin: 0 !important;
          }
          .titlesmall {
            flex: 0 0 200px;
            line-height: 24px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            margin: 0 !important;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
          }
          .jia {
            margin-top: 9px;
            background: url("~@/assets/images/jia.png") no-repeat;
          }

          .jian {
            margin-top: 9px;
            background: url("~@/assets/images/jian.png") no-repeat;
          }
        }
      }
      .pieceName {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .inputArea {
        display: flex;
        flex-direction: column;
        //align-items: center;
        .title {
          font-weight: 400;
          font-size: 16px;
          color: #1f1f1f;
          line-height: 22px;
          margin: 16px;
          text-align: left;
        }
        .content {
          .cishu {
            margin-bottom: 10px;
          }
        }
      }
      .tableArea {
        padding-right: 20px;
        padding-left: 20px;
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
    .cancel {
      color: #005657;
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
  ::v-deep .el-form .el-form-item__error {
    top: 21%;
    right: unset;
    left: 68% !important;
  }
  ::v-deep .el-form .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
