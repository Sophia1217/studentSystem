<template>
  <div class="parameterStu">
    <div class="formWrap">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="申请开放" prop="sqkg">
          <el-switch
            v-model="form.sqkg"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="申请开放时间" prop="applyDate">
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

        <div class="line"></div>

        <el-form-item label="审核开放" prop="shkg">
          <el-switch
            v-model="form.shkg"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="审核开放时间" prop="auditApplyDate">
          <el-date-picker
            v-model="form.auditApplyDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始年月日"
            end-placeholder="结束年月日"
            value-format="yyyy-MM-dd HH:mm:ss"
            :disabled="this.form.shkg == '0' ? true : false"
            :clearable="false"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            v-show="AUTHFLAG"
            size="small"
            type="primary"
            @click="onSubmit"
            >确认</el-button
          >
          <el-button size="small" @click="handleCel('ruleForm')"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getModeifyTime,
  stuInfoModifyParamService,
} from "@/api/student/fieldSettings";
export default {
  name: "parameterStu",

  data() {
    return {
      AUTHFLAG: false,
      form: {
        sqkg: "",
        applyDate: [], // 申请开放时间
        shkg: "",
        auditApplyDate: [], //审核开放时间
      },
      rules: {
        sqkg: [{ required: true, message: "请选择", trigger: "blur" }],
        shkg: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getParameterStu();
  },

  methods: {
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
.parameterStu {
  background: #fff;
  .formWrap {
    padding: 20px;
    width: 500px;
    margin: 0 auto;
    .line {
      width: 100%;
      height: 1px;
      background: #eaeaea;
    }
  }
}
</style>
