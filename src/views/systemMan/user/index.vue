<template>
  <div class="manUser">
    <div class="searchWrap">
      <div class="search">
        <el-input placeholder="请输入" v-model="searchVal" class="inputSelect">
          <el-select v-model="select" class="elSelect" slot="prepend" placeholder="查询条件">
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="身份证号" value="3"></el-option>
            <el-option label="手机号" value="4"></el-option>
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
        <el-row :gutter="20" class="mt15">
          <el-col :span="2">单 位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="learnHe" @training="learnHeAll" @checkedTraining="learnHeCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="2">角 色：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="studentStatus" @training="studentStatusAll" @checkedTraining="studentStatusCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="2">性 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :objProp="ethnic" @training="ethnicAll" @checkedTraining="ethnicCheck"></checkboxCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft"><span class="title">用户列表</span> <i class="Updataicon"></i></div>
        <div class="headerRight">
          <div class="btns borderBlue"><i class="icon blueIcon"></i><span class="title">导入用户</span></div>
          <div class="btns borderOrange"><i class="icon orangeIcon"></i><span class="title">数据权限</span></div>
          <el-dropdown split-button type="primary" @command="handleCommand">
            <span class="el-dropdown-link"> 用户状态控制 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="open">批量启用</el-dropdown-item>
              <el-dropdown-item command="close">批量关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="mt15">
        <el-table :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="date" label="用户ID" sortable> </el-table-column>
          <el-table-column prop="name" label="学工号" sortable> </el-table-column>
          <el-table-column prop="address" label="姓名" sortable> </el-table-column>
          <el-table-column prop="address" label="单位" sortable> </el-table-column>
          <el-table-column prop="address" label="IP" sortable> </el-table-column>
          <el-table-column prop="address" label="邮箱" sortable> </el-table-column>
          <el-table-column prop="address" label="角色" sortable> </el-table-column>
          <el-table-column prop="address" label="用户状态" sortable>
            <template slot-scope="scope">
              <div>
                <el-switch v-model="scope.row.address" active-color="#23AD6F" inactive-color="#E0E0E0"></el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleOpenEdit(scope.row)">
                <i class="scopeIncon handledie"></i> <span class="handleName">编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="handlePermiss(scope.row)">
                <i class="scopeIncon handleEdit"></i> <span class="handleName">数据权限</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <div>
        <el-row :gutter="20">
          <el-col :span="3" :offset="3">用 户 名</el-col>
          <el-col :span="10">
            <el-input v-model="editForm.name" :disabled="true" size="small" placeholder="请输入"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3" :offset="3">学 工 号</el-col>
          <el-col :span="10">
            <el-input v-model="editForm.name" :disabled="true" size="small" placeholder="请输入"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3" :offset="3" class="greentColor">当前角色：</el-col>
          <el-col :span="10">
            <div class="greentColor">勤工助学负责人、培养单位本研学生工作负责人</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3" :offset="3">用户角色:</el-col>
          <el-col :span="10">
            <div class="checkboxItem">
              <el-checkbox-group v-model="editForm.checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用"></el-checkbox>
                <el-checkbox label="选中且禁用"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from '../../components/checkboxCom'
export default {
  name: 'manUser',
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
      learnHe: {  //单位：：
        checkAll: false,
        choose: [],
        checkBox: [
          { label: '软件学院', val: 1 },
          { label: '设计学院', val: 2 },
          { label: '文学院', val: 3 },
          { label: '理学院', val: 4 },
          { label: '工业设计', val: 5 },
          { label: '通信工程', val: 6 },
          { label: '电子信息', val: 7 },
          { label: '建筑工程', val: 8 },
          { label: '统计学', val: 9 },
          { label: '工业设计', val: 10 },
          { label: '统计学', val: 11 },
        ],
        isIndeterminate: true
      },
      studentStatus: { // 角色：
        checkAll: false,
        choose: [],
        checkBox: [
          { label: '校级领导用户', val: 1 },
          { label: '业务部门人员', val: 2 },
          { label: '培养单位负责人', val: 3 },
          { label: '培养单位本研学生工作负责人', val: 4 },
          { label: '辅导员', val: 5 },
        ],
        isIndeterminate: true
      },
      ethnic:{  // 姓别
        checkAll: false,
        choose: [],
        checkBox: [{label:'男',val:1},{label: '女',val:2}],
        isIndeterminate: true
      },
      
      tableData: [{ date: 1 }],
      dialogFormVisible: false,
      editForm: {
        name: '123',
        checkList:[]
      },
      multipleSelection: [],
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
    // 单 位：全选
    learnHeAll(val) {
      let allCheck = []
      for (let i in this.learnHe.checkBox) {
        allCheck.push(this.learnHe.checkBox[i].val)
      }
      this.learnHe.choose = val ? allCheck : [];
      console.log(this.learnHe.choose,'全选')
      this.learnHe.isIndeterminate = false;
    },
    // 单 位：单选
    learnHeCheck(value) {
      let checkedCount = value.length;
      this.learnHe.checkAll = checkedCount === this.learnHe.checkBox.length;
      this.learnHe.isIndeterminate = checkedCount > 0 && checkedCount < this.learnHe.checkBox.length;
      console.log(this.learnHe.choose,'单选')
    },
    // 角 色全选
    studentStatusAll(val) {
      let allCheck = []
      for (let i in this.studentStatus.checkBox) {
        allCheck.push(this.studentStatus.checkBox[i].val)
      }
      this.studentStatus.choose = val ? allCheck : [];
      console.log(this.studentStatus.choose,'全选')
      this.studentStatus.isIndeterminate = false;
    },
    // 角 色单选
    studentStatusCheck(value) {
      let checkedCount = value.length;
      this.studentStatus.checkAll = checkedCount === this.studentStatus.checkBox.length;
      this.studentStatus.isIndeterminate = checkedCount > 0 && checkedCount < this.studentStatus.checkBox.length;
      console.log(this.studentStatus.choose,'单选')
    },
    // 性 别全选
    ethnicAll(val) {
      let allCheck = []
      for (let i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].val)
      }
      this.ethnic.choose = val ? allCheck : [];
      console.log(this.ethnic.choose,'全选')
      this.ethnic.isIndeterminate = false;
    },
    // 性 别单选
    ethnicCheck(value) {
      let checkedCount = value.length;
      this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
      this.ethnic.isIndeterminate = checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
      console.log(this.ethnic.choose,'单选')
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
   
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    handlePermiss(row) {
      this.$router.push({
        path: '/systems/dataPermis',
        query: {
          id: row.date
        }
      })
    },
    handleOpenEdit() { 
      this.dialogFormVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
.manUser{
  .mt15{
    margin-top: 15px;
  }
  .greentColor{
    color:#005657;
  }
  .searchWrap{
    background: #fff;
    padding:20px;
    .search{
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #fff;
      .searchBtn{
      }
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
          background: url('~@/assets/images/chevronDown.png') no-repeat;
        }
        .chevronUp{
          background: url('~@/assets/images/chevronUp.png') no-repeat;
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
          background: url('~@/assets/images/updata.png') no-repeat;
        }
      }
      .headerRight{
        display: flex;
        .borderBlue{
          border:1px solid #005657;
          color:#fff;
          background: #005657;
        }
        .borderOrange{
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
            background: url('~@/assets/images/export2.png') no-repeat;
          }
          .orangeIcon{
            background: url('~@/assets/images/dataN.png') no-repeat;
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
      background: url('~@/assets/images/details.png');
    }
    .handleEdit{
      background: url('~@/assets/images/edit.png');
    }
  }
  .checkboxItem{
    ::v-deep .el-checkbox{
      display: block !important;
    }
  }
}
</style>