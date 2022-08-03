<template>
  <div class="manStudent">
    <div class="searchWrap">
      <div class="search">
        <el-input placeholder="请输入" v-model="searchVal" class="inputSelect">
          <el-select v-model="select" class="elSelect" slot="prepend" placeholder="查询条件">
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-input>
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>学 院：</span>
            <el-select v-model="moreIform.value1" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>专 业：</span>
            <el-select v-model="moreIform.value2" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>班 级：</span>
            <el-select v-model="moreIform.value3" multiple collapse-tags placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="training" @training="handleCheckAllChangeTraining" @checkedTraining="handleCheckedCitiesChangeTraining"></checkboxCom>
              <!-- <el-checkbox class="elcheckbox" :indeterminate="training.isIndeterminate" 
                v-model="training.checkAll" @change="handleCheckAllChangeTraining">全选</el-checkbox>
              <el-checkbox-group v-model="training.choose" @change="handleCheckedCitiesChangeTraining">
                <el-checkbox v-for="item in training.checkBox" :label="item.val" :key="item.val">{{item.label}}</el-checkbox>
              </el-checkbox-group> -->
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">学 制：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="learnHe" @training="learnHeAll" @checkedTraining="learnHeCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">学 籍：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="studentStatus" @training="studentStatusAll" @checkedTraining="studentStatusCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">名族：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="ethnic" @training="ethnicAll" @checkedTraining="ethnicCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">政治面貌：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="politica" @training="politicaAll" @checkedTraining="politicaCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft"><span class="title">学生信息列表</span> <i class="Updataicon"></i></div>
      </div>
      <div class="mt15">
        <el-table :data="tableData" ref="multipleTable" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="date" label="学号" sortable> </el-table-column>
          <el-table-column prop="name" label="姓名" sortable> </el-table-column>
          <el-table-column prop="address" label="学院" sortable> </el-table-column>
          <el-table-column prop="address" label="专业" sortable> </el-table-column>
          <el-table-column prop="address" label="年级" sortable> </el-table-column>
          <el-table-column prop="address" label="培养层次" sortable> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxCom from '../../../components/checkboxCom'
export default {
  name: 'manStudent',
  components:{ CheckboxCom },
  data() {
    return {
      searchVal: '',
      select: '',
      isMore: false,
      moreIform: {
        value1:''
      },
      options: [{ value: '选项2', label: '双皮奶' }, { value: '选项3', label: '蚵仔煎' }],
      training: {  // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [{label:'大学本科',val:1},{label: '硕士研究生',val:2},{label: '博士研究生',val:3}],
        isIndeterminate: true
      },
      learnHe: {  //学 制：
        checkAll: false,
        choose: [],
        checkBox: [{label:'2年',val:1},{label: '3年',val:2},{label: '3年',val:3}],
        isIndeterminate: true
      },
      studentStatus: { // 学籍
        checkAll: false,
        choose: [],
        checkBox: [{label:'有学籍',val:1},{label: '无学籍',val:2}],
        isIndeterminate: true
      },
      ethnic:{  // 名族
        checkAll: false,
        choose: [],
        checkBox: [{label:'汉族',val:1},{label: '蒙古族',val:2},{label:'藏族',val:3}],
        isIndeterminate: true
      },
      politica:{  // 政治面貌：
        checkAll: false,
        choose: [],
        checkBox: [{label:'中共党员',val:1},{label: '中共预备',val:2},{label:'共青团员',val:3}],
        isIndeterminate: true
      },
      tableData: [{ date: 1 }]
    };
  },

  mounted() {},

  methods: {
    // 查询
    handleSearch(){ 
      console.log(this.searchVal,this.select)
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = []
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].val)
      }
      this.training.choose = val ? allCheck : [];
      console.log(this.training.choose,'全选')
      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate = checkedCount > 0 && checkedCount < this.training.checkBox.length;
      console.log(this.training.choose,'单选')
    },
    // 学制全选
    learnHeAll(val) {
      let allCheck = []
      for (let i in this.learnHe.checkBox) {
        allCheck.push(this.learnHe.checkBox[i].val)
      }
      this.learnHe.choose = val ? allCheck : [];
      console.log(this.learnHe.choose,'全选')
      this.learnHe.isIndeterminate = false;
    },
    // 学制单选
    learnHeCheck(value) {
      let checkedCount = value.length;
      this.learnHe.checkAll = checkedCount === this.learnHe.checkBox.length;
      this.learnHe.isIndeterminate = checkedCount > 0 && checkedCount < this.learnHe.checkBox.length;
      console.log(this.learnHe.choose,'单选')
    },
    // 学籍全选
    studentStatusAll(val) {
      let allCheck = []
      for (let i in this.studentStatus.checkBox) {
        allCheck.push(this.studentStatus.checkBox[i].val)
      }
      this.studentStatus.choose = val ? allCheck : [];
      console.log(this.studentStatus.choose,'全选')
      this.studentStatus.isIndeterminate = false;
    },
    // 学籍单选
    studentStatusCheck(value) {
      let checkedCount = value.length;
      this.studentStatus.checkAll = checkedCount === this.studentStatus.checkBox.length;
      this.studentStatus.isIndeterminate = checkedCount > 0 && checkedCount < this.studentStatus.checkBox.length;
      console.log(this.studentStatus.choose,'单选')
    },
    // 名族全选
    ethnicAll(val) {
      let allCheck = []
      for (let i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].val)
      }
      this.ethnic.choose = val ? allCheck : [];
      console.log(this.ethnic.choose,'全选')
      this.ethnic.isIndeterminate = false;
    },
    // 名族单选
    ethnicCheck(value) {
      let checkedCount = value.length;
      this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
      this.ethnic.isIndeterminate = checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
      console.log(this.ethnic.choose,'单选')
    },
    // 政治面貌：全选
    politicaAll(val) {
      let allCheck = []
      for (let i in this.politica.checkBox) {
        allCheck.push(this.politica.checkBox[i].val)
      }
      this.politica.choose = val ? allCheck : [];
      console.log(this.politica.choose,'全选')
      this.politica.isIndeterminate = false;
    },
    // 政治面貌：单选
    politicaCheck(value) {
      let checkedCount = value.length;
      this.politica.checkAll = checkedCount === this.politica.checkBox.length;
      this.politica.isIndeterminate = checkedCount > 0 && checkedCount < this.politica.checkBox.length;
      console.log(this.politica.choose,'单选')
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    }
  },
};
</script>

<style lang="scss" scoped>
.manStudent{
  .mt15{
    margin-top: 15px;
  }
  .searchWrap{
    background: #fff;
    padding:20px;
    .search{
      display: flex;
      flex-direction: row;
      align-items: center;
      .elSelect{
        width:110px;
      }
      .inputSelect{
        width:50%;
      }
      .more{
        flex: 0 0 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #005657;
        cursor:pointer;
        .moreIcon{
          display: block;
          width:20px;
          height: 20px;
        }
        .chevronDown{
          background: url('../../../../assets/images/chevronDown.png') no-repeat;
        }
        .chevronUp{
          background: url('../../../../assets/images/chevronUp.png') no-repeat;
        }
      }
    }
    .moreSelect{
      margin-top: 20px;
      padding:20px;
      background: #FAFAFA;
    }
  }
  .tableWrap{
    background: #fff;
    padding:20px;
    .headerTop{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .headerLeft{
        .title{
          font-weight: 600;
          font-size: 20px;
          color: #1F1F1F;
          line-height: 28px;
        }
        .Updataicon{
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width:20px;
          height: 20px;
          background: url('../../../../assets/images/updata.png') no-repeat;
        }
      }
    }
  }
}
</style>