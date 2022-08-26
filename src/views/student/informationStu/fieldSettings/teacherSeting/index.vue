<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item,index) in dtailsList" :key="index">
          <div class="list" :class="index==current?'active':''" @click="handleList(index,'tag')">
            <div>{{item}}</div>
            <i :class="index==current?'el-icon-arrow-right':''"></i>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">学生信息修改字段设置</p>
          <div class="saveBtn" @click="getUpdateStuColumns"> <i class="icon"></i> 保存</div>
        </div>
        <!-- 基本信息 -->
        <div class="headline" id="tag_0">
          <div>基本信息</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.jbxxzd" @change="(val) => {xsjbxxReader(val,1,columns.xs_jbxx,1)}">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.jbxxbt" @change="(val) => {xsjbxxReader(val,2,columns.xs_jbxx,1)}">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle" v-for="item in columns.xs_jbxx" :key="item.id">
                <div class="wrap">
                  <div class="title">{{item.dicCloumnChinese}}</div>
                  <div class="content">  <!--- 0 必填 1可写 2可读--->
                    <el-radio v-model="item.approveColumnAuth" label="2">只读</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="0">必填</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="1">可写</el-radio>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 联系方式 -->
        <div class="headline" id="tag_1">
          <div>联系方式</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.lxfsreader" @change="(val) => {xsjbxxReader(val,1,columns.xs_txxx,2)}">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.lxfsbt" @change="(val) => {xsjbxxReader(val,2,columns.xs_txxx,2)}">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle" v-for="item in columns.xs_txxx" :key="item.id">
                <div class="wrap">
                  <div class="title">{{item.dicCloumnChinese}}</div>
                  <div class="content">
                    <el-radio v-model="item.approveColumnAuth" label="2">只读</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="0">必填</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="1">可写</el-radio>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 家庭成员信息 -->
        <div class="headline" id="tag_2">
          <div>家庭成员信息</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.jtcyxxReader" @change="(val) => {xsjbxxReader(val,1,columns.xs_jtcyxx,3)}">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.jtcyxxBt" @change="(val) => {xsjbxxReader(val,2,columns.xs_jtcyxx,3)}">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle" v-for="item in  columns.xs_jtcyxx" :key="item.id">
                <div class="wrap">
                  <div class="title">{{item.dicCloumnChinese}}</div>
                  <div class="content">
                    <el-radio v-model="item.approveColumnAuth" label="2">只读</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="0">必填</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="1">可写</el-radio>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 学习经历 -->
        <div class="headline" id="tag_3">
          <div>学习经历</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.xxjlReader" @change="(val) => {xsjbxxReader(val,1,columns.xs_xxjl,4)}">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.xxjlBt" @change="(val) => {xsjbxxReader(val,2,columns.xs_xxjl,4)}">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle" v-for="item in  columns.xs_xxjl" :key="item.id">
                <div class="wrap">
                  <div class="title">{{item.dicCloumnChinese}}</div>
                  <div class="content">
                    <el-radio v-model="item.approveColumnAuth" label="2">只读</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="0">必填</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="1">可写</el-radio>
                  </div>
                </div>
              </el-col>
          </el-row>
        </div>
        <!-- 工作经历 -->
        <div class="headline" id="tag_4">
          <div>工作经历</div>
          <div class="boxSelect">
             <el-checkbox v-model="basicCheckBox.gzjlReader" @change="(val) => {xsjbxxReader(val,1,columns.xs_gzjl,5)}">全部只读</el-checkbox>
             <el-checkbox v-model="basicCheckBox.gzjlBt" @change="(val) => {xsjbxxReader(val,2,columns.xs_gzjl,5)}">全部必填</el-checkbox>
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
              <el-col :span="8" class="rowStyle" v-for="item in  columns.xs_gzjl" :key="item.id">
                <div class="wrap">
                  <div class="title">{{item.dicCloumnChinese}}</div>
                  <div class="content">
                    <el-radio v-model="item.approveColumnAuth" label="2">只读</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="0">必填</el-radio>
                    <el-radio v-model="item.approveColumnAuth" label="1">可写</el-radio>
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
import { loadStuColumns, updateStuColumns } from '@/api/student/fieldSettings' 
export default {
  name: 'studentSeting',

  data() {
    return {
      dtailsList: ['基本信息', '联系方式', '家庭成员信息', '学习经历', '工作经历'],
      current: 0,
      basicCheckBox: {},
      columns: {
        xs_jtcyxx:[],
        xs_txxx:[],
        xs_xxjl:[],
        xs_gzjl:[],
        xs_jbxx:[],
      }
    };
  },
  created() {
  },
  mounted() {
    this.getloadStuColumns()
  },

  methods: {
    // 左侧list
    handleList(index,tag) {
      this.current = index
      var id = "#" + tag + '_' + index;
      // console.log(id)
      document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
      });
    },
    getloadStuColumns() {
      let data = {}
      loadStuColumns(data).then(res => {
        let data = res.data
        let columns = {
          xs_jbxx:[],
          xs_jtcyxx:[],
          xs_txxx:[],
          xs_xxjl:[],
          xs_gzjl:[],
        }
        for (let x = 0; x < data.length; x++){
          if (data[x].dicEnglish == 'xs_jbxx') {
            columns.xs_jbxx.push(data[x])
          } else if (data[x].dicEnglish == 'xs_jtcyxx') {
            columns.xs_jtcyxx.push(data[x])
          } else if (data[x].dicEnglish == 'xs_txxx') {
            columns.xs_txxx.push(data[x])
          } else if (data[x].dicEnglish == 'xs_xxjl') {
            columns.xs_xxjl.push(data[x])
          } else if (data[x].dicEnglish == 'xs_gzjl') {
            columns.xs_gzjl.push(data[x])
          }
        }
        this.columns = columns
      
      }).catch(err=>{})
    },
    // 基本信息全部只读
    xsjbxxReader(val, index, data, xm) { // val 选中 ，index 0必填 1可写 2可读
      // console.log(val, index, data,xm)
      let jbxxData = data
      if (!val) {
        for (let x = 0; x < jbxxData.length; x++){
          jbxxData[x].approveColumnAuth = '1'
        }
      }
      if (index == 1) {
        if (val) {
          for (let x = 0; x < jbxxData.length; x++){
            jbxxData[x].approveColumnAuth = '2'
          }
        }
        switch(xm)
        {
          case 1:
            this.basicCheckBox.jbxxbt = false
            break;
          case 2:
            this.basicCheckBox.lxfsbt = false
          break;
            case 3:
            this.basicCheckBox.jtcyxxBt = false
          break;
            case 4:
            this.basicCheckBox.xxjlBt = false
          break;
            case 5:
            this.basicCheckBox.gzjlBt = false
          break;
        }
      } else {
        if (val) {
          for (let x = 0; x < jbxxData.length; x++){
            jbxxData[x].approveColumnAuth = '0'
          }
        }
        switch(xm)
        {
          case 1:
            this.basicCheckBox.jbxxzd = false
            break;
          case 2:
            this.basicCheckBox.lxfsreader = false
          break;
            case 3:
            this.basicCheckBox.jtcyxxReader = false
          break;
            case 4:
            this.basicCheckBox.xxjlReader = false
          break;
            case 5:
            this.basicCheckBox.gzjlReader = false
          break;
        }
      }
    },
    getUpdateStuColumns() {
      let newData = []
      newData = newData.concat(this.columns.xs_gzjl,this.columns.xs_jbxx,this.columns.xs_jtcyxx,this.columns.xs_txxx,this.columns.xs_xxjl)
      updateStuColumns(JSON.stringify(newData)).then(res => {
        if (res.errcode == '00') {
          this.$message({
            message: res.errmsg,
            type: 'success'
          })
        }
      }).catch(err=>{})
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