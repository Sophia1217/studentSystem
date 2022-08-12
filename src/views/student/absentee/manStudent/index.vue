<template>
  <div class="manStudent">
    <div class="searchWrap">
      <div class="search">
        <el-input placeholder="请输入" v-model="searchVal" class="inputSelect" clearable>
          <el-select v-model="select" @change="changeSelect" class="elSelect" slot="prepend" placeholder="查询条件">
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="身份证号" value="sfzjh"></el-option>
            <el-option label="手机号" value="yddh"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" class="searchBtn" @click="handleSearch">查询</el-button>
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{!isMore?"更多分类":"收起分类"}}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20">
          <el-col :span="8">
            <span>学 院：</span>
            <el-select v-model="moreIform.manageReg" placeholder="请选择" size="small">
              <el-option v-for="(item,index) in manageRegOps" :key="index" :label="item.dwmc" :value="item.ssdwdm"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>专 业：</span>
            <el-select v-model="moreIform.stuInfo" placeholder="请选择" size="small">
              <el-option v-for="(item,index) in manageRegOps" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>班 级：</span>
            <el-select v-model="moreIform.pread" multiple collapse-tags placeholder="请选择" size="small">
              <el-option v-for="(item,index) in manageRegOps" :key="index" :label="item.bjmc" :value="item.bjdm"></el-option>
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
        <div class="headerRight">
          <div class="btns borderBlue"><i class="icon blueIcon"></i><span class="title">毕业生登记表</span></div>
          <div class="btns borderOrange"><i class="icon orangeIcon"></i><span class="title">学生登记表</span></div>
          <div class="btns borderLight"><i class="icon lightIcon"></i><span class="title">学生卡片</span></div>
          <div class="btns borderGreen" @click="handleExport"><i class="icon greenIcon"></i><span class="title">导出</span></div>
        </div>
      </div>
      <div class="mt15">
        <el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="xh" label="学号" sortable> </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
          <el-table-column prop="zzmm" label="政治面貌" sortable> </el-table-column>
          <el-table-column prop="mzm" label="民族" sortable> </el-table-column>
          <el-table-column prop="dwh" label="学院" sortable> </el-table-column>
          <el-table-column prop="zydm" label="专业" sortable> </el-table-column>
          <el-table-column prop="nj" label="年级" sortable> </el-table-column>
          <el-table-column prop="pyccm" label="培养层次" sortable> </el-table-column>
          <el-table-column prop="xz" label="学制" sortable> </el-table-column>
          <el-table-column prop="xjzt" label="学籍状态" sortable> </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="hadleDetail(scope.row,1)">
                <i class="scopeIncon handledie"></i> <span class="handleName">详情</span>
              </el-button>
              <el-button type="text" size="small" @click="hadleDetail(scope.row,2)">
                <i class="scopeIncon handleEdit"></i> <span class="handleName">编辑</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <exportView v-if="showExport" :showExport="showExport" @handleCancel="handleCancel" @handleConfirm="handleConfirm"></exportView>
    <pagination
      v-show="queryParams.total>0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handleSearch"
    />
  </div>
</template>

<script>
import CheckboxCom from '../../../components/checkboxCom'
import exportView from './exportView/index.vue'
import { getManageRegStuInfoSearchSpread, getManageRegStuInfoPageList, getRegStuInfoDetailPage } from "@/api/student/index"
export default {
  name: 'absentee',
  components:{ CheckboxCom, exportView },
  data() {
    return {
      searchVal: '',
      select: '',
      isMore: false,
      moreIform: {
        manageReg:'', // 学院
        stuInfo:'', // 专业
        pread:'', // 班级
      },
      manageRegOps:[], // 学院下拉框
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
        checkBox: [
          { label: '有学籍', val: 1 },
          { label: '无学籍', val: 2 }
        ],
        isIndeterminate: true
      },
      ethnic:{  // 名族
        checkAll: false,
        choose: [],
        checkBox: [
          {
	          label: "汉族",
	          val: 1,
	        },
	        {
	          label: "壮族",
	          val: 2,
	        },
	        {
	          label: "满族",
	          val: 3,
	        },
	        {
	          label: "回族",
	          val: 4,
	        },
	        {
	          label: "苗族",
	          val: 5,
	        },
	        {
	          label: "维吾尔族",
	          val: 6,
	        },
	        {
	          label: "土家族",
	          val: 7,
	        },
	        {
	          label: "彝族",
	          val: 8,
	        },
	        {
	          label: "蒙古族",
	          val: 9,
	        },
	        {
	          label: "藏族",
	          val: 10,
	        },
	        {
	          label: "布依族",
	          val: 11,
	        },
	        {
	          label: "侗族",
	          val: 12,
	        },
	        {
	          label: "瑶族",
	          val: 13,
	        },
	        {
	          label: "朝鲜族",
	          val: 14,
	        },
	        {
	          label: "白族",
	          val: 15,
	        },
	        {
	          label: "哈尼族",
	          val: 16,
	        },
	        {
	          label: "哈萨克族",
	          val: 17,
	        },
	        {
	          label: "黎族",
	          val: 18,
	        },
	        {
	          label: "傣族",
	          val: 19,
	        },
	        {
	          label: "畲族",
	          val: 20,
	        },
	        {
	          label: "傈僳族",
	          val: 21,
	        },
	        {
	          label: "仡佬族",
	          val: 22,
	        },
	        {
	          label: "东乡族",
	          val: 23,
	        },
	        {
	          label: "高山族",
	          val: 24,
	        },
	        {
	          label: "拉祜族",
	          val: 25,
	        },
	        {
	          label: "水族",
	          val: 26,
	        },
	        {
	          label: "佤族",
	          val: 27,
	        },
	        {
	          label: "纳西族",
	          val: 28,
	        },
	        {
	          label: "羌族",
	          val: 29,
	        },
	        {
	          label: "土族",
	          val: 30,
	        },
	        {
	          label: "仫佬族",
	          val: 31,
	        },
	        {
	          label: "锡伯族",
	          val: 32,
	        },
	        {
	          label: "柯尔克孜族",
	          val: 33,
	        },
	        {
	          label: "达斡尔族",
	          val: 34,
	        },
	        {
	          label: "景颇族",
	          val: 35,
	        },
	        {
	          label: "毛南族",
	          val: 36,
	        },
	        {
	          label: "撒拉族",
	          val: 37,
	        },
	        {
	          label: "布朗族",
	          val: 38,
	        },
	        {
	          label: "塔吉克族",
	          val: 39,
	        },
	        {
	          label: "阿昌族",
	          val: 40,
	        },
	        {
	          label: "普米族",
	          val: 41,
	        },
	        {
	          label: "鄂温克族",
	          val: 42,
	        },
	        {
	          label: "怒族",
	          val: 43,
	        },
	        {
	          label: "京族",
	          val: 44,
	        },
	        {
	          label: "基诺族",
	          val: 45,
	        },
	        {
	          label: "德昂族",
	          val: 46,
	        },
	        {
	          label: "保安族",
	          val: 47,
	        },
	        {
	          label: "俄罗斯族",
	          val: 48,
	        },
	        {
	          label: "裕固族",
	          val: 49,
	        },
	        {
	          label: "乌孜别克族",
	          val: 50,
	        },
	        {
	          label: "门巴族",
	          val: 51,
	        },
	        {
	          label: "鄂伦春族",
	          val: 52,
	        },
	        {
	          label: "独龙族",
	          val: 53,
	        },
	        {
	          label: "塔塔尔族",
	          val: 54,
	        },
	        {
	          label: "赫哲族",
	          val: 55,
	        },
	        {
	          label: "珞巴族",
	          val: 56,
	        },
	      ],
        isIndeterminate: true
      },
      politica:{  // 政治面貌：
        checkAll: false,
        choose: [],
        checkBox: [{label:'中共党员',val:1},{label: '中共预备',val:2},{label:'共青团员',val:3}],
        isIndeterminate: true
      },
      tableData: [{ date: 1 }],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  watch: {
    
  },

  mounted() {
    this.getSpread()
    this.handleSearch()
  },
  activated() {
    // this.handleSearch()
  },

  methods: {
    // 获取学院专业班级
    getSpread() {
      getManageRegStuInfoSearchSpread().then(res => {
        this.manageRegOps = res.data.dwhbj
      }).catch(err=>{})
    },
    changeSelect(val) {
      this.searchVal = ''
    },
    // 查询
    handleSearch() { 
      let data = {
        xh:this.select == 'xh'?this.searchVal:'',
        xm:this.select == 'xm'?this.searchVal:'',
        sfzjh:this.select == 'sfzjh'?this.searchVal:'',
        yddh:this.select == 'yddh'?this.searchVal:'',
        pyccm:"",
        xz:"",
        xjzt:"",
        zzmmm:"",
        mzm:"",
        bjm:"",
        dwh:"",
        zydm:"",
        pageNum:this.queryParams.pageNum,
        pageSize:this.queryParams.pageSize,
        limitSql:""
      }
      getManageRegStuInfoPageList(data).then(res => {
        this.tableData = res.data.data
        this.queryParams.total = res.data.total
      }).catch(err=>{})
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
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true
    },
    // 导出取消
    handleCancel() {
      this.showExport = false
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false
    },
    hadleDetail(row, flag) {
      let schooling = '' // 3 4 5 是本科
      if (row.pyccm == 1 || row.pyccm == 2) { // 1 2 是研究生
        schooling = 2
      } else {
        schooling = 1
      }
      this.$router.push({
        path: '/student/studetails',
        query: {
          xh: row.xh,
          show: flag,  // 1是详情，2是编辑
          schooling: schooling  
        }
      })
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
      background: #fff;
      .searchBtn{}
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
      .headerRight{
        display: flex;
        .borderBlue{
          border:1px solid #0D84E0;
          color:#0D84E0;
          background: #ebfafd;
        }
        .borderOrange{
          border:1px solid #CC3014;
          color:#CC3014;
          background: #fdf6f3;
        }
        .borderLight{
          border:1px solid #0090A1;
          color:#0090A1;
          background: #e7fcfc;
        }
        .borderGreen{
          border:1px solid #005657;
          color:#005657;
          background: #fff;
        }
        .btns{
          margin-right: 15px;
          padding:5px 10px;
          cursor:pointer;
          .title{
            font-size: 14px;
            text-align: center;
            line-height: 22px;
            // vertical-align: middle;
          }
          .icon{
            display: inline-block;
            width:20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .blueIcon{
            background: url('../../../../assets/images/icon_1.png') no-repeat;
          }
          .orangeIcon{
            background: url('../../../../assets/images/icon_2.png') no-repeat;
          }
          .lightIcon{
            background: url('../../../../assets/images/icon_3.png') no-repeat;
          }
          .greenIcon{
            background: url('../../../../assets/images/export.png');
          }
        }
      }
    }
    .scopeIncon{
      display: inline-block;
      width:20px;
      height: 20px; 
      vertical-align: middle;
    }
    .handleName{
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie{
      background: url('../../../../assets/images/details.png');
    }
    .handleEdit{
      background: url('../../../../assets/images/edit.png');
    }
  }
}
</style>