<template>
  <div class="difficultSetting">
    <div class="formWrap">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="认定周期" prop="applyDate">
              <el-select
                v-model="form.pjzqXn"
                collapse-tags
                @change="changeXY"
                placeholder="请选择学年"
                size="small"
              >
                <el-option
                  v-for="item in allDwh"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
              
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-select
                v-model="form.pjzqXq"
                collapse-tags
                placeholder="请选择学期"
                size="small"
              >
                <el-option
                  v-for="item in allDwh"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
          </el-col>
        </el-row>
        <el-form-item label="申请时间" prop="applyDate">
          <el-date-picker
            v-model="form.applyDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始年月日"
            end-placeholder="结束年月日"
            value-format="yyyy-MM-dd HH:mm:ss"
            :disabled="this.form.sqkg == '0' ? true : false"
            :clearable="false"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请流程">
          <el-button type="text" size="small" @click="lctClick">
            <i class="scopeIncon lct"></i>
            <span class="handleName">流程图</span>
          </el-button>
        </el-form-item>
        <el-form-item label="档次维护" prop="applyDate">
          <el-select
              v-model="form.dc"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allDwh"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请开关" prop="sqkg">
          <el-switch
            v-model="form.sqkg"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="handleCel('ruleForm')"
            >取消</el-button
          >
          <el-button
            v-show="AUTHFLAG"
            size="small"
            type="primary"
            @click="onSubmit"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>

<script>
import {
  getModeifyTime,
  stuInfoModifyParamService,
} from "@/api/student/fieldSettings";
import { getCollege } from "@/api/class/maintenanceClass";
import { getZY } from "@/api/student/index";
import lctCom from "../../../components/lct";
export default {
  name: "difficultSetting",
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      form: {
        sqkg: "",
        applyDate: [], // 申请开放时间
        shkg: "",
        auditApplyDate: [], //审核开放时间
      },
      allDwh:[],
      lctModal: false,
      rules: {
        sqkg: [{ required: true, message: "请选择", trigger: "blur" }],
        shkg: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getParameterStu();
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.form.pjzqXq = []; // 学期
      }
      this.getZY(val);
    },
    // 学院找专业
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
      //流程
    lctClick() {
      // if (!!row.processid) {
      //   this.$refs.child.inner(row.processid);
      //   this.lctModal = true;
      // } else {
      //   this.$message.warning("此项经历为管理员新增，暂无流程数据");
      // }
    },
    //学生信息修改参数开放查询
    getParameterStu() {
      getModeifyTime().then((res) => {
        this.form.sqkg = res.sqkg;
        var b = res.sqkfsj;
        var a = res.sqjssj;
        var arr = [];
        arr.push(b);
        arr.push(a);
        this.$set(this.form, "applyDate", arr);
        this.form.shkg = res.shkg;
        var c = res.shkfsj;
        var d = res.shjssj;
        var brr = [];
        brr.push(c);
        brr.push(d);
        this.$set(this.form, "auditApplyDate", brr);
        console.log("时间", this.form.auditApplyDate);
      });
    },
    //学生信息修改参数申请开放
    onSubmit() {
      let sqkfsj = "";
      let sqjssj = "";
      let shkfsj = "";
      let shjssj = "";

      let flag = false;
      if (this.form.sqkg == 1 || this.form.shkg == 1) {
        console.log("11");
        if (this.form.sqkg == 1 && this.form.shkg == 1) {
          //判时间
          if (
            this.form.applyDate[0] != "" &&
            this.form.applyDate.length > 0 &&
            this.form.auditApplyDate[0] != "" &&
            this.form.auditApplyDate.length > 0
          ) {
            sqkfsj = this.form.applyDate[0];
            sqjssj = this.form.applyDate[1];
            shkfsj = this.form.auditApplyDate[0];
            shjssj = this.form.auditApplyDate[1];

            let start = this.form.applyDate[1];
            let end = this.form.auditApplyDate[1];
            if (start > end) {
              this.$message.error("审核开放结束时间需要晚于申请开放结束时间！");
              return;
            } else {
              flag = true;
            }
          } else {
            this.$message({
              message: "请选择开放时间!",
              type: "warning",
            });
          }
        } else if (this.form.sqkg == 1) {
          if (this.form.applyDate[0] != "" && this.form.applyDate.length > 0) {
            sqkfsj = this.form.applyDate[0];
            sqjssj = this.form.applyDate[1];
            flag = true;
          } else {
            this.$message({
              message: "请选择申请开放时间!",
              type: "warning",
            });
          }
        } else {
          if (
            this.form.auditApplyDate[0] != "" &&
            this.form.auditApplyDate.length > 0
          ) {
            shkfsj = this.form.auditApplyDate[0];
            shjssj = this.form.auditApplyDate[1];
            flag = true;
          } else {
            this.$message({
              message: "请选择审核开放时间!",
              type: "warning",
            });
          }
        }
      } else {
        flag = true;
        // this.$message({
        //   message: "请选择开放时间!",
        //   type: "warning",
        // });
      }
      if (flag == true) {
        console.log(flag);
        let data = {
          shkg: this.form.shkg,
          shkfsj: shkfsj,
          shjssj: shjssj,
          sqkg: this.form.sqkg,
          sqkfsj: sqkfsj,
          sqjssj: sqjssj,
        };
        //创建
        stuInfoModifyParamService(data)
          .then((res) => {
            if (res.errcode == "00") {
              this.$message({
                message: res.errmsg,
                type: "success",
              });
              this.handleCel("ruleForm");
              this.getParameterStu();
            }
          })
          .catch((err) => {});
      }
    },
    handleCel(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.difficultSetting {
  background: #fff;
  .formWrap {
    padding: 20px;
    width: 500px;
    margin: 0 auto;
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}
</style>
