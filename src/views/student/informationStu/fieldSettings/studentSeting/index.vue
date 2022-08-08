<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item,index) in dtailsList" :key="index">
          <div class="list" :class="index==current?'active':''" @click="handleList(index)">
            <div>{{item}}</div>
            <i :class="index==current?'el-icon-arrow-right':''"></i>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">学生信息修改字段设置</p>
          <div class="saveBtn"> <i class="icon"></i> 保存</div>
        </div>
        <!-- 基本信息 -->
        <div class="headline">
          <div>基本信息</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.readOnly1" >全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.writeOnly1">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked1_1">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked2">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked_2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音姓</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked3">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked3_3">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 联系方式 -->
        <div class="headline">
          <div>联系方式</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.readOnly">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.writeOnly">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 家庭成员信息 -->
        <div class="headline">
          <div>家庭成员信息</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.readOnly">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.writeOnly">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 学习经历 -->
        <div class="headline">
          <div>学习经历</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.readOnly">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.writeOnly">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 工作经历 -->
        <div class="headline">
          <div>工作经历</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.readOnly">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.writeOnly">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    <el-checkbox v-model="basicCheckBox.checked1">只读</el-checkbox>
                    <el-checkbox v-model="basicCheckBox.checked2">必填</el-checkbox>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'studentSeting',

  data() {
    return {
      dtailsList: ['基本信息', '联系方式', '家庭成员信息', '学习经历', '工作经历'],
      current: 0,
      basicCheckBox: {
        readOnly: false,
        writeOnly: false,
        checked1:false,
        checked2:false,
      }
    };
  },
  created() {
  },
  mounted() {
    
  },

  methods: {
    // 左侧list
    handleList(index) {
      this.current = index
    },
    // 打开退回弹窗
    handleBack() {
      this.dialogVisible = true
      this.textarea = ''
    },
    // 退回取消
    handleClose() {
      this.dialogVisible = false
      this.textarea = ''
    },
    // 退回确认
    handleConfirm() {
      this.dialogVisible = false
      this.textarea = ''
    },
    // 通过确定
    handleConThrou() {
      this.throughDialogV = false
      this.$router.push({
        path:'/student/informationStu/auditStu'
      })
    },
    // 通过弹窗
    handleThrough() {
      this.throughDialogV = true
      
    }
  },
};
</script>

<style lang="scss" scoped>
.detail{
  padding:20px 0;
  box-sizing: border-box;
  .wrap{
    display: flex;
    flex-direction: row;
    // overflow: hidden;
    .detail_left{
      flex:0 0 198px;
      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding:20px;
      box-sizing: border-box;
      .list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #1F1F1F;
        cursor: pointer;
        padding:0 10px;
        box-sizing: border-box;
      }
      .item {
        ::v-deep.el-badge__content.is-fixed{
          top: 20px;
          right: -16px;
        }
      }
      .active{
        background: #F0F0F0;
        border-radius: 2px;
      }
    }
    .detail_right{
      flex:1;
      background: #fff;
      .right_top{
        position: relative;
        border-bottom: 1px solid #D8D8D8;
        .title{
          text-align: center;
          font-weight: 500;
          font-size: 24px;
          color: #005657;
          line-height: 24px
        }
        .saveBtn{
          position: absolute;
          top:0;
          right: 20px;
          width: 84px;
          line-height: 36px;
          text-align: center;
          background: #005657;
          border-radius: 2px;
          color:#fff;
          cursor: pointer;
        }
        .icon{
          display: inline-block;
          width:20px;
          height: 20px;
          background: url('~@/assets/images/saveIcon.png');
          vertical-align: middle;
        }
      }
      .information{
          padding:0 20px;
          margin-top: 15px;
          .rowStyle{
            padding:0 !important;
            margin:0;
            border-bottom:1px solid #cccccc;
          }
          .wrap{
            display: flex;
            align-items: center;
            .title{
              flex: 0 0 160px;
              line-height: 48px;
              background: #E0E0E0;
              text-align: right;
              padding-right: 5px;
            }
            .content{
              font-weight: 400;
              font-size: 14px;
              color: #1F1F1F;
              line-height: 22px;
              margin-left: 16px;
            }
          }
        }
      .headline{
        margin-top: 20px;
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #1F1F1F;
        line-height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .boxSelect{
          padding-right: 20px;
        }
      }
    }
  }
}
</style>