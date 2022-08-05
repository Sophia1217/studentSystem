<template>
  <div class="parameterStu">
    <div class="formWrap">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="申请开放" prop="apply">
          <el-switch v-model="form.apply" active-color="#23AD6F" inactive-color="#E0E0E0"></el-switch>
        </el-form-item>
        <el-form-item label="申请开放时间">
          <el-date-picker 
            v-model="form.applyDate" 
            type="daterange" 
            range-separator="至" 
            start-placeholder="起始年月日" 
            end-placeholder="结束年月日" 
            value-format="yyyy-MM-dd" 
            :clearable="false">
          </el-date-picker>
        </el-form-item>

        <div class="line"></div>

        <el-form-item label="审核开放" prop="audit">
          <el-switch v-model="form.audit" active-color="#23AD6F" inactive-color="#E0E0E0"></el-switch>
        </el-form-item>
        <el-form-item label="审核开放时间">
          <el-date-picker 
            v-model="form.auditApplyDate" 
            type="daterange" 
            range-separator="至" 
            start-placeholder="起始年月日" 
            end-placeholder="结束年月日" 
            value-format="yyyy-MM-dd" 
            :clearable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parameterStu',

  data() {
    return {
      form: {
        apply: true,
        applyDate: [],
        audit: false,
        auditApplyDate:[]
      },
      rules: {
        apply: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        audit: [
          { required: true, message: '请选择', trigger: 'blur' },
        ]
      }
    }
  },

  mounted() {
    
  },

  methods: {
    onSubmit() {
      let start = this.form.applyDate&&this.form.applyDate[1]?this.form.applyDate[1]:''
      let end = this.form.auditApplyDate && this.form.auditApplyDate[1] ? this.form.auditApplyDate[1] : ''
      console.log(start, end)
      if (start > end) {
        this.$message.error('审核开放结束时间需要晚于申请开放结束时间！');
        return
      }
      
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