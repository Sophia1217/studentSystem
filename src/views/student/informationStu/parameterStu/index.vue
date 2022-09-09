<template>
  <div class="parameterStu">
    <div class="formWrap">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="申请开放" prop="sqkg">
          <el-switch v-model="form.sqkg" active-color="#23AD6F" inactive-color="#E0E0E0"
           active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="申请开放时间" prop="applyDate">
          <el-date-picker 
            v-model="form.applyDate" 
            type="datetimerange" 
            range-separator="至" 
            start-placeholder="起始年月日" 
            end-placeholder="结束年月日" 
            value-format="yyyy-MM-dd HH:mm:ss" 
            :clearable="false">
          </el-date-picker>
        </el-form-item>

        <div class="line"></div>

        <el-form-item label="审核开放" prop="shkg">
          <el-switch v-model="form.shkg" active-color="#23AD6F" inactive-color="#E0E0E0"
           active-value="1" inactive-value="0"
           :disabled = "true"
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
            :disabled = "true"
            :clearable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
          <el-button size="small" @click="handleCel('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getModeifyTime, stuInfoModifyParamService } from '@/api/student/fieldSettings' 
export default {
  name: 'parameterStu',

  data() {
    return {
      form: {
        sqkg: '',
        applyDate: [], // 申请开放时间
        shkg: '0',
        auditApplyDate:[] //审核开放时间
      },
      rules: {
        sqkg: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        shkg: [
          { required: true, message: '请选择', trigger: 'blur' },
        ]
      }
    }
  },

  mounted() {
    this.getParameterStu()
  },

  methods: {
    //学生信息修改参数开放查询
    getParameterStu(){
      getModeifyTime().then((res)=>{
        this.form.sqkg = res.sqkg
        console.log("dd",this.res)
        var b = res.sqkfsj
        var a= res.sqjssj       
        var arr =[]
        arr.push(b)
        arr.push(a)
        this.$set(this.form,"applyDate", arr)
      })
    },
    //学生信息修改参数申请开放
    onSubmit() {
      let sqkfsj=''
      let sqjssj=''
      let shkfsj=''
      let shjssj =''
      // let start = this.form.applyDate&&this.form.applyDate[1]?this.form.applyDate[1]:''
      // let end = this.form.auditApplyDate && this.form.auditApplyDate[1] ? this.form.auditApplyDate[1] : ''
      // if (start > end) {
      //   this.$message.error('审核开放结束时间需要晚于申请开放结束时间！');
      //   return
      // }
      
      
      // 申请开放时间
      if (this.form.applyDate && this.form.applyDate.length>0) {
        sqkfsj = this.form.applyDate[0]
        sqjssj = this.form.applyDate[1]

        let data = {
        shkg:this.form.shkg,
        shkfsj:shkfsj,
        shjssj:shjssj,
        sqkg:this.form.sqkg,
        sqkfsj:sqkfsj,
        sqjssj:sqjssj
        }
      //申请开放创建
      stuInfoModifyParamService(data).then(res => {
        if (res.errcode == '00') {
          this.$message({
            message: res.errmsg,
            type: 'success'
          })
          this.handleCel('ruleForm')
          this.getParameterStu()
        }      
        
      }).catch(err=>{})
      }
      else{
        this.$message({
          message: "请选择申请开放时间!",
          type: "warning",
        });
        }
        
      //审核开放时间
      // if (this.form.auditApplyDate && this.form.auditApplyDate.length > 0) {
      //   shkfsj = this.form.auditApplyDate[0]
      //   shjssj = this.form.auditApplyDate[1]
      // }

      
    },
    handleCel(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style lang="scss" scoped>
.parameterStu{
  background:#fff;
  .formWrap{
    padding:20px;
    width:500px;
    margin:0 auto;
    .line{
      width:100%;
      height:1px;
      background: #EAEAEA;
    }
  }
}
</style>