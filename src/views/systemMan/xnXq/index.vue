<template>
  <div class="xnXqSet">
    <div class="formWrap">
      <div class="title">当前学年学期设置</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="当前学年" prop="year">
          <el-select
            v-model="form.year"
            placeholder="请选择学年"
            size="small"
            clearable
          >
            <el-option
              v-for="(item, index) in xnOps"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="当前学期" prop="term">
          <el-select
            v-model="form.term"
            placeholder="请选择学期"
            size="small"
            clearable
          >
            <el-option
              v-for="(item, index) in xqOps"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="当前年度" prop="nd">
          <el-select v-model="form.nd" placeholder="" size="small" clearable>
            <el-option
              v-for="(item, index) in ndOps"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            v-show="AUTHFLAG"
            size="small"
            type="primary"
            @click="onSubmit"
            >保存</el-button
          >
          <!-- <el-button size="small" @click="handleCel('ruleForm')"
            >取消</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { insertYearTerm, queryCurrentYearTerm } from "@/api/systemMan/xnXq";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getYears } from "@/api/test/fdySelfTest";
import { getGrade } from "@/api/class/maintenanceClass";
export default {
  name: "xnXqSet",

  data() {
    return {
      AUTHFLAG: false,
      form: {},
      rules: {
        year: [{ required: true, message: "请选择", trigger: "change" }],
        term: [{ required: true, message: "请选择", trigger: "change" }],
        nd: [{ required: true, message: "请选择", trigger: "change" }],
      },
      xqOps: [],
      xnOps: [],
      ndOps: [],
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getCode("dmxqm");
    this.getOps();
    this.getDetail();
  },

  methods: {
    getOps() {
      queryXn().then((res) => {
        this.xnOps = res.data;
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.ndOps = response.data.rows;
        }
      });
    },

    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxqm":
              this.xqOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
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
    onSubmit() {
      let data = {
        nd: this.form.nd,
        term: this.form.term,
        year: this.form.year,
      };
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");

        return;
      } else {
        insertYearTerm(data).then((res) => {
          this.$message.success("保存成功！");
        });
      }
    },
    // handleCel(formName) {
    //   this.$refs[formName].resetFields();
    // },
    getDetail() {
      queryCurrentYearTerm().then((res) => {
        this.form = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.xnXqSet {
  background: #fff;
  .formWrap {
    padding: 20px;
    width: 500px;
    margin: 0 auto;
    .title {
      font-weight: 400;
      font-size: 18px;
      color: #000;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
