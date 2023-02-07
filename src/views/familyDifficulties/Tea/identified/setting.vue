<template>
  <div class="difficultSetting">
    <div class="formWrap">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="认定周期" prop="rdxn">
              <el-select
                v-model="form.rdxn"
                collapse-tags
                placeholder="请选择学年"
                size="small"
              >
                <el-option
                  v-for="(item,index) in allXn"
                  :key="index"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-select
                v-model="form.rdxqm"
                collapse-tags
                placeholder="请选择学期"
                size="small"
              >
                <el-option
                  v-for="item in xqOps"
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
            type="daterange"
            range-separator="至"
            start-placeholder="起始年月日"
            end-placeholder="结束年月日"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
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
        <el-form-item label="档次维护">
          <el-table :data="dengjiData">
            <el-table-column
              fixed="left"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="mc" label="档次" width="130"/>
          </el-table>
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
            >确定</el-button
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
import {
  sqszDetail,
  insertJtknSqsz,
} from "@/api/familyDifficulties/setting";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  name: "difficultSetting",
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      form: {
        sqkg: "",
        rdxn: "",
        rdxqm: "",

        applyDate: [], // 申请开放时间
        shkg: "",
        auditApplyDate: [], //审核开放时间
      },
      lctModal: false,
      dengjiData:[],
      xqOps:[],
      allXn:[],
      rules: {
        sqkg: [{ required: true, message: "请选择", trigger: "blur" }],
        shkg: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.handleSearch();
    this.getCode("dmxqm");//学期
    this.getSchoolYears();
  },

  methods: {
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
        })
        .catch((err) => {});
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmxqm":
            this.xqOps = res.data;
            break;
        }
      });
    },
    handleSearch(){
      //查询
      sqszDetail().then((res) => {
        this.form.sqkg = res.data.sqkg || "";
        this.form.rdxn = res.data.rdxn|| "";
        this.form.rdxqm = res.data.rdxqm ||"";
        // this.form = res.data;
        this.dengjiData = res.data.kndjList;
        var b = res.data.sqsjstart;
        var a = res.data.sqsjend;
        var arr = [];
        arr.push(b);
        arr.push(a);
        this.$set(this.form, "applyDate", arr);
        console.log("arr",this.form.applyDate);
      })
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
    onSubmit(){
      let sqsjstart = "";
      let sqsjend = "";
      if (this.form.sqkg == 1) {
          if (this.form.applyDate && this.form.applyDate.length > 0) {
            sqsjstart = this.form.applyDate[0];
            sqsjend = this.form.applyDate[1];
          } else {
            this.$message({
              message: "请选择申请时间!",
              type: "warning",
            });
          }
      };
      let data ={
        sqsjstart: sqsjstart,
        sqsjend: sqsjend,
        rdxn: this.form.rdxn,
        rdxqm: this.form.rdxqm,
        sqkg: this.form.sqkg,
      };
      insertJtknSqsz(data).then((res) =>{
        this.$message.success("操作成功");
        this.handleSearch();
      });
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
