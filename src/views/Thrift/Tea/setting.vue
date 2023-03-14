<template>
  <div style="background-color: #fff">
    <div class="topDIV">
      <div class="leftDIV">
        <el-form
          ref="formAdd"
          label-width="380px"
          style="margin: 10px 30px"
          :model="formAdd"
        >
          <h3>用人单位参数设置</h3>
          <el-form-item
            label="岗位申请开关"
            prop="yrdwSqkg"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-switch
                active-value="1"
                inactive-value="0"
                v-model="formAdd.yrdwSqkg"
                active-color="#005657"
                inactive-color="#e0e0e0"
              >
              </el-switch>
            </div>
          </el-form-item>
          <el-form-item
            label="岗位申请时间"
            prop="yrdwDate"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                :clearable="false"
                value-format="yyyy-MM-dd"
                :disabled="formAdd.yrdwSqkg == 1"
                v-model="formAdd.yrdwDate"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item
            label="用人单位申请岗位时可否更改岗位酬金上限"
            prop="yrdwGggwcjsx"
            :rules="rules.common"
            class="formItemDuty formItemDutybottom"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.yrdwGggwcjsx">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <h3>学生岗位参数设置</h3>
          <el-form-item
            label="学生可获得岗位数"
            class="formItemDuty"
            prop="xsgwKhdgws"
            :rules="rules.common"
          >
            <div class="formItemDutyIn">
              <el-input-number
                v-model="formAdd.xsgwKhdgws"
                controls-position="right"
                :min="0"
                :max="100"
                :precision="0"
                style="width: 25%"
                @keyup.native="checkInt"
              ></el-input-number>
              <span v-html="'\u3000'"></span
              >(学生可获得勤工岗位的上限值，"0"表示无限制)
            </div>
          </el-form-item>
          <el-form-item
            label="学生可申请岗位数"
            class="formItemDuty"
            prop="xsgwKsqgws"
            :rules="rules.common"
          >
            <div class="formItemDutyIn">
              <el-input-number
                v-model="formAdd.xsgwKsqgws"
                controls-position="right"
                :min="0"
                :max="100"
                :precision="0"
                @keyup.native="checkInt"
                style="width: 25%"
              ></el-input-number>
              <span v-html="'\u3000'"></span
              >(学生可提交勤工岗位申请的上限值，"0"表示无限制)
            </div>
          </el-form-item>
          <el-form-item
            label="学生岗位申请开关"
            prop="xsgwSqkg"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-switch
                active-value="1"
                inactive-value="0"
                v-model="formAdd.xsgwSqkg"
                active-color="#005657"
                inactive-color="#e0e0e0"
              >
              </el-switch>
            </div>
          </el-form-item>
          <el-form-item
            label="学生岗位申请起止时间"
            prop="xssqsj"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                :clearable="false"
                :disabled="formAdd.xsgk == 1"
                value-format="yyyy-MM-dd"
                v-model="formAdd.xssqsj"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item
            label="学生岗位申请是否需要通过资格审查"
            prop="xsgwZgsc"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.xsgwZgsc">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
              <span v-html="'\u3000'"></span
              >(此处选‘是’，则只有勤工助学学生库内才可岗位申请)
            </div>
          </el-form-item>
          <el-form-item
            label="是否显示学生课程时间"
            prop="xsgwKcsj"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.xsgwKcsj">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item
            label="审批流程"
            class="formItemDuty formItemDutybottom"
          >
            <div class="formItemDutyIn poin" @click="handleReadImage">
              <i class="scopeIncon lct"></i>
              <span class="handleName">流程图</span>
            </div>
          </el-form-item>
          <h3>酬金发放参数设置</h3>
          <el-form-item
            label="酬金标准"
            class="formItemDuty"
            prop="cjffCjbz"
            :rules="rules.common"
          >
            <div class="formItemDutyIn">
              <el-input-number
                v-model="formAdd.cjffCjbz"
                controls-position="right"
                :min="0"
                :max="1000"
                style="width: 25%"
              ></el-input-number>
              元/小时<span v-html="'\u3000\u3000'"></span>(默认按此标准计算酬金)
            </div>
          </el-form-item>
          <el-form-item
            label="设置上限(工时&酬金)"
            class="formItemDuty"
            prop="cjffSzsxType"
            :rules="rules.common"
          >
            <div class="formItemDutyIn">
              <el-select
                v-model="formAdd.cjffSzsxType"
                placeholder="请选择"
                style="width: 20%"
              >
                <el-option
                  v-for="(item, index) in options"
                  :key="index"
                  :label="item.dm"
                  :value="item.mc"
                >
                </el-option>
              </el-select>
              <span v-html="'\u3000'"></span>
              <el-input-number
                v-model="formAdd.cjffSzsxNum"
                controls-position="right"
                :min="0"
                :max="1000"
                style="width: 25%"
              ></el-input-number>
              <span v-if="formAdd.cjffSzsxType == '酬金'"
                >元
                <span v-html="'\u3000'"></span>(学生每月酬金不得超过该值)</span
              >
              <span v-if="formAdd.cjffSzsxType == '工时'"
                >小时
                <span v-html="'\u3000'"></span>(学生每月工时不得超过该值)</span
              >
            </div>
          </el-form-item>
          <el-form-item
            label="酬金发放月份设定"
            prop="cjyfsd"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-date-picker
                format="yyyy 年 MM 月 "
                :clearable="false"
                value-format="yyyy-MM"
                v-model="formAdd.cjyfsd"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 40%"
              >
              </el-date-picker>
              (输入非区间值时，则只可发放设定月份当月酬金)
            </div>
          </el-form-item>
          <el-form-item
            label="酬金发放开放时间"
            prop="cjffStartDate"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-select
                v-model="formAdd.cjffStartDate"
                placeholder="请选择"
                style="width: 20%"
                @change="infontC"
              >
                <el-option
                  v-for="(item, index) in 31"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              日—
              <el-select
                v-model="formAdd.cjffEndDate"
                placeholder="请选择"
                style="width: 20%"
                @change="behindC"
              >
                <el-option
                  v-for="(item, index) in 31"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              日<span v-html="'\u3000'"></span
              >(只有在酬金发放时间段才能发放酬金)
            </div>
          </el-form-item>
          <el-form-item
            label="是否允许调整酬金金额"
            prop="cjffTzcjje"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.cjffTzcjje">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
              <span v-html="'\u3000'"></span>(酬金发放时允许修改发放金额)
            </div>
          </el-form-item>
          <el-form-item
            label="酬金发放是否受经费划拨约束"
            prop="cjffJfhbys"
            :rules="rules.common"
            class="formItemDuty formItemDutybottom"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.cjffJfhbys">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
              <span v-html="'\u3000'"></span
              >(此处选‘是’，则用户需完成经费划拨后再进行酬金发放)
            </div>
          </el-form-item>
          <!-- <el-form-item
            label="是否设定岗位酬金上限"
            prop="cjffGwcjsx"
            :rules="rules.common"
            class="formItemDuty"
          >
            <div class="formItemDutyIn">
              <el-radio-group v-model="formAdd.cjffGwcjsx">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
              <span v-html="'\u3000'"></span>(每个岗位每人每月酬金上限)
            </div>
          </el-form-item> -->
          <!-- <el-form-item
            label="岗位最高酬金上限"
            prop="cjffGwzgcjsx"
            :rules="rules.common"
            class="formItemDuty formItemDutybottom"
          >
            <div class="formItemDutyIn">
              <el-input-number
                v-model="formAdd.cjffGwzgcjsx"
                controls-position="right"
                :min="0"
                :max="100000"
                style="width: 25%"
              ></el-input-number>
              <span v-html="'\u3000'"></span>(每个岗位每人每月酬金上限)
            </div>
          </el-form-item> -->
          <el-row :gutter="20" style="margin-top: 25px">
            <el-col :span="20">
              <div>
                勤工助学协议书 ：
                <el-upload
                  action="#"
                  multiple
                  class="el-upload"
                  ref="upload"
                  :data="fileData"
                  :on-success="upLoadSuccess"
                  :show-file-list="true"
                  :file-list="SHfileList"
                  :before-remove="beforeRemove"
                  :on-preview="handlePreview"
                  :action="uploadUrl"
                  :headers="fileHeader"
                  accept=".pdf,.jpg"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 流程图 -->
      <el-dialog
        :title="readImage.title"
        :visible.sync="readImage.open"
        width="70%"
        append-to-body
      >
        <flow :xmlData="xmlData"> </flow>
      </el-dialog>
    </div>
    <div class="editBottom">
      <!-- <div class="btn cancel" @click="cancelAdd">取消</div> -->

      <div class="btn confirm" @click="finalSave" v-show="AUTHFLAG">保存</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { queryFlowIdByMk } from "@/api/common/liucheng";
import { delFile, downloadFile, queryFile } from "@/api/common/file";
import { getToken } from "@/utils/auth";
import { saveD, queryD } from "@/api/gwsz/gwsz";
import { readXml } from "@/api/flowable/definition";
import flow from "@/views/flowable/task/record/flow";
export default {
  components: { flow },
  // watch: {
  //   formAdd: {
  //     handler(newVal, oldVal) {
  //       console.log("formAddwaawd", this.formAdd);
  //       console.log("[newVal.yrdwStartDate, newVal.yrdwEndDate]", [
  //         newVal.yrdwStartDate,
  //         newVal.yrdwEndDate,
  //       ]);
  //       this.formAdd.yrdwDate = [newVal.yrdwStartDate, newVal.yrdwEndDate];
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  computed: {
    fileData: {
      get() {
        return {
          pageType: "gwsz",
          roleType: "qgzx",
          businesId: this.formAdd.id,
        };
      },
    },
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
    yrdwStartDate: {
      // 岗位申请时间
      get: function () {
        return this.formAdd.yrdwDate && this.formAdd.yrdwDate.length > 0
          ? this.formAdd.yrdwDate[0]
          : "";
      },
    },
    yrdwEndDate: {
      get: function () {
        return this.formAdd.yrdwDate && this.formAdd.yrdwDate.length > 0
          ? this.formAdd.yrdwDate[1]
          : "";
      },
    },
    xsgwStartDate: {
      //是否显示学生课程时间
      get: function () {
        return this.formAdd.xssqsj && this.formAdd.xssqsj.length > 0
          ? this.formAdd.xssqsj[0]
          : "";
      },
    },
    xsgwEndDate: {
      //是否显示学生课程时间
      get: function () {
        return this.formAdd.xssqsj && this.formAdd.xssqsj.length > 0
          ? this.formAdd.xssqsj[1]
          : "";
      },
    },
    cjffMonthStart: {
      //月份
      get: function () {
        return this.formAdd.cjyfsd && this.formAdd.cjyfsd.length > 0
          ? this.formAdd.cjyfsd[0]
          : "";
      },
    },
    cjffMonthEnd: {
      get: function () {
        return this.formAdd.cjyfsd && this.formAdd.cjyfsd.length > 0
          ? this.formAdd.cjyfsd[1]
          : "";
      },
    },
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
      flowId: "",
      readImage: {
        open: false,
        src: "",
      },
      // xml
      xmlData: "",
      rules: {
        common: [
          {
            required: true,
            message: "请完善内容，再提交",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          dm: "工时",
          mc: "工时",
        },
        {
          dm: "酬金",
          mc: "酬金",
        },
      ],
      AUTHFLAG: false,
      SHfileList: [],
      formAdd: {
        //////用人单位参数设置
        yrdwSqkg: false, //岗位申请开关
        yrdwDate: [], // 岗位申请时间  yrdwStartDate  yrdwEndDate
        yrdwGggwcjsx: 1, //用人单位酬金上限
        //////学生岗位参数设置
        xsgwKhdgws: 0, //学生可获得岗位数
        xsgwKsqgws: 0, //学生可申请岗位数
        xsgwSqkg: false, //学生岗位申请开关
        xssqsj: [], //学生岗位申请起止时间  xsgwStartDate xsgwEndDate
        xsgwZgsc: 1, //学生岗位申请是否需要通过资格审查
        xsgwKcsj: 1, //是否显示学生课程时间
        //////酬金发放参数设置
        cjffCjbz: 0, //酬金标准
        cjffSzsxType: "", //设置上限(工时&酬金)类型
        cjffSzsxNum: 0, //设置上限(工时&酬金)
        cjyfsd: [], //酬金发放月份设定  cjffMonthStart cjffMonthEnd
        cjffStartDate: "", // 酬金发放开放时间
        cjffEndDate: "", // 酬金发放开放时间
        cjffTzcjje: 1, //是否允许调整酬金金额
        cjffJfhbys: 1, //酬金发放是否受经费划拨约束
        cjffGwcjsx: 1, // 是否设定岗位酬金上限
        cjffGwzgcjsx: 0, //  岗位最高酬金上限
        id: "",
      },
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getCode("dmpyccm"); //培养层次1
    this.getDetail();
    this.queryFlow();
  },
  methods: {
    handlePreview(file) {
      downloadFile({ id: file.id }).then((res) => {
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        //成功后调用一遍查询接口，免得下次删除只是前端物理删除，没有请求接口
        this.queryFile();
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    beforeRemove(file, fileList) {
      // let uid = file.uid;
      // let idx = fileList.findIndex((item) => item.uid === uid);
      // fileList.splice(idx, 0);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delFile({ id: file.id.toString() }).then();
      }
    },
    async queryFile() {
      await queryFile({ businesId: this.formAdd.id }).then((res) => {
        this.SHfileList = res.data;
        this.SHfileList = this.SHfileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    checkInt() {
      //这里可以写正则
      // this.formAdd.xsgwKhdgws = this.formAdd.xsgwKhdgws.replace(/[^\d]/g, "");
      // this.formAdd.xsgwKsqgws = this.formAdd.xsgwKsqgws.replace(/[^\d]/g, "");
    },
    queryFlow() {
      queryFlowIdByMk({ mk: "勤工助学_岗位设置" }).then((res) => {
        this.flowId = res.data.flowId;
      });
    },
    /** 流程图查看 */
    handleReadImage() {
      if (!!this.flowId) {
        this.readImage.title = "流程图";
        this.readImage.open = true;
        // this.readImage.src = process.env.VUE_APP_BASE_API + "/flowable/definition/readImage/" + flowId;
        // 发送请求，获取xml
        readXml(this.flowId).then((res) => {
          this.xmlData = res.data;
        });
      } else {
        this.$message.error("暂无流程图");
      }
    },
    infontC(e) {
      if (Number(e) > Number(this.formAdd.cjffEndDate)) {
        this.$message.error("开始时间不得大于结束时间");
        this.formAdd.cjffStartDate = "";
      }
    },
    behindC(e) {
      if (Number(e) < Number(this.formAdd.cjffStartDate)) {
        this.$message.error("结束时间不得小于开始时间");
        this.formAdd.cjffEndDate = "";
      }
    },
    async getDetail() {
      await queryD().then((res) => {
        this.formAdd = { ...this.formAdd, ...res.data };
        this.formAdd.yrdwDate = [
          this.formAdd.yrdwStartDate,
          this.formAdd.yrdwEndDate,
        ];
        this.formAdd.xssqsj = [
          this.formAdd.xsgwStartDate,
          this.formAdd.xsgwEndDate,
        ];
        this.formAdd.cjyfsd = [
          this.formAdd.cjffMonthStart,
          this.formAdd.cjffMonthEnd,
        ];
      });
      this.queryFile();
    },

    quxiao() {
      if (!this.checkFormInner()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.mxdxModal = false;
      }
    },
    quxiao1() {
      if (!this.checkFormInner()) {
        this.$message.error("请完善表单相关信息！");
        this.mxdxModal = true;
      } else {
      }
    },
    cancelAdd() {},
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
    finalSave() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          ...this.formAdd,
          yrdwStartDate: this.yrdwStartDate, // 岗位申请时间
          yrdwEndDate: this.yrdwEndDate,
          xsgwStartDate: this.xsgwStartDate, //学生岗位申请起止时间
          xsgwEndDate: this.xsgwEndDate,
          cjffMonthStart: this.cjffMonthStart, //酬金发放月份设定
          cjffMonthEnd: this.cjffMonthEnd,
        };
        saveD(data).then((res) => {});
      }
    },
    checkFormInner() {
      let validForm1 = false;
      this.$refs.formInner.validate((valid) => {
        validForm1 = valid;
      });
      if (!validForm1) {
        return false;
      }
      return true;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmpyccm": //培养层次
            this.pyccOption = res.data;
            break;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  line-height: 65px;
}
.formItemDuty {
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  margin-top: 10px;
  margin: 0;
}
.formItemDutyIn {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  padding: 15px 0 15px 15px;
}
.poin {
  cursor: pointer;
}
.formItemDutybottom {
  border-bottom: 1px solid #e0e0e0;
}
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handleName {
  font-weight: 400;
  font-size: 14px;
  color: #005657;
  line-height: 28px;
}
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.topDIV {
  display: flex;

  .leftDIV {
    width: 100%;
    padding: 20px 15%;
  }
}
.editBottom {
  width: 100%;
  height: 40px;
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
.leftStyle {
  float: left;
  font-weight: 600;
  font-size: 16px;
  font-family: "PingFang SC";
  font-style: normal;
  line-height: 24px;
  margin-bottom: 10px;
  color: #1f1f1f;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.btns {
  margin-right: 15px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}
.span1 {
  display: inline-block;
  margin-top: 4px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}
.borderGreen {
  border: 1px solid grey;
  background: #005657;
}

.leftDIV .el-form-item__error {
}
</style>
