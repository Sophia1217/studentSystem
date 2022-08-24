<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input v-model="searchVal" placeholder="可输入多个查询条件，以半角空格区分" class="inputSelect">
          <el-select slot="prepend" v-model="select" class="elSelect" placeholder="查询条件">
            <el-option label="工号" value="gh" />
            <el-option label="姓名" value="xm" />
            <!-- <el-option label="身份证号" value="sfzh" />
            <el-option label="籍贯" value="jg" />
            <el-option label="家庭住址" value="jtzz" />
            <el-option label="毕业院校" value="byyx" />
            <el-option label="家庭背景" value="jtbj" /> -->
          </el-select>
          <el-button slot="append" class="searchButton" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-input>
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多选择 -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">工作单位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="workPlace" @training="handleCheckAllWorkPlaceChange" @checkedTraining="handleCheckedWorkPlaceChange" />
            </div>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="3">类 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="category" @training="handleCheckAllCategoryChange" @checkedTraining="handleCheckedCategoryChange" />
            </div>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">性 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="sex" @training="handleCheckAllSexChange" @checkedTraining="handleCheckedSexChange" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">状 态：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="status" @training="handleCheckAllStatusChange" @checkedTraining="handleCheckedStatusChange" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft"><span class="title">在岗班主任列表</span> <i class="Updataicon" /></div>
        <div class="headerRight">
          <div class="btns fullGreen" @click="handleRemove"><i class="icon removeButton" /><span class="title">批量免去</span></div>
          <div class="btns borderGreen" @click="handleImport"><i class="icon greenIcon" /><span class="title">导入</span></div>
          <div class="btns borderGreen" @click="handleExport"><i class="icon greenIcon" /><span class="title">导出</span></div>
        </div>
      </div>
      <div class="mt15">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" @sort-change="changeTableSort">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <el-table-column prop="lb" label="类别" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.lb == 0">专职</span>
              <span v-else>兼职</span>
            </template>
          </el-table-column>
          <el-table-column prop="xb" label="性别" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.xb == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="工作单位" sortable />
          <el-table-column prop="dbzt" label="带班状态" sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.dbzt == 1">
                <span class="greenDot">●</span><span>是</span>
              </div>
              <!-- <span v-if="scope.row.dbzt == 1">是</span> -->
              <div v-else>
                <span class="redDot">●</span><span>否</span>
              </div>
              <!-- <span v-else>否</span> -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="hadleDetail(scope.row,1)">
                <i class="scopeIncon handledie" /> <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- 详情对话框 -->
    <el-dialog :visible.sync="open" width="1200px" append-to-body>
      <el-table ref="multipleTable" :data="tableDataDetail" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column label="在岗日期" width="180">
          <template slot-scope="scope">
            <div v-if="tableDataDetail[0].cxsj != null">
              <span>{{ tableDataDetail[0].rmsj }} 至 {{ tableDataDetail[0].cxsj }}</span>
            </div>
            <div v-if="tableDataDetail[0].cxsj == null && tableDataDetail[0].rmsj != null">
              <span>{{ tableDataDetail[0].rmsj }} 至今</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="bjbh" label="班级编号" sortable />
        <el-table-column prop="bjmc" label="班级名称" sortable />
        <el-table-column prop="pycc" label="培养层次" sortable />
        <!-- <el-table-column prop="pydw" label="培养单位" sortable /> -->
        <el-table-column prop="nj" label="年级" sortable />
        <el-table-column prop="sfqy" label="任职状态" sortable>
          <template slot-scope="scope">
            <div v-if="scope.row.sfqy == 1">
              <span class="greenDot">●</span><span>在岗</span>
            </div>
            <!-- <span v-if="scope.row.dbzt == 1">是</span> -->
            <div v-else>
              <span class="redDot">●</span><span>离岗</span>
            </div>
            <!-- <span v-else>否</span> -->
          </template>
        </el-table-column>
        <!-- <el-table-column prop="rmztm" label="任职状态" sortable /> -->
        <el-table-column prop="rmrxm" label="任命人" sortable />
        <el-table-column prop="rmsj" label="任命时间" sortable />
        <el-table-column prop="cxrxm" label="免去人" sortable />
        <el-table-column prop="cxsj" label="撤任时间" sortable />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="closeButton" @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 批量免去对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="showRemove"
      width="30%"
      :before-close="handleClose"
    >
      <template v-for="item in multipleSelection">
        <div :key="item.xh">
          <span>确认免去【{{ item.gh }}】【{{ item.xm }}】班主任身份？</span>
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleRemove">取 消</el-button>
        <el-button
          type="primary"
          class="confirm"
          @click="confirmRemove"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入对话框 -->
    <el-dialog
      :visible.sync="showImport"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-position="left" label-width="100px" :model="importForm">
        <el-form-item label="学工号" prop="gh">
          <el-input v-model="importForm.gh" />
        </el-form-item>
        <el-form-item label="姓名" prop="xm">
          <el-input v-model="importForm.xm" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelImport">取 消</el-button>
        <el-button
          type="primary"
          class="confirm"
          @click="submitImport"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入确认对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="showConfirmImport"
      width="30%"
      :before-close="handleClose"
    >
      <span>确认任命【{{ importForm.gh }}】【{{ importForm.xm }}】班主任身份？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfirmImport">取 消</el-button>
        <el-button
          type="primary"
          class="confirm"
          @click="confirmImport"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { getTeacherDetailList, getTeacherDetail, addTeacher, removeTeacher, exportTeacher } from '@/api/politicalWork/teacherappoint'
import CheckboxCom from '@/views/components/checkboxCom'

export default {
  name: 'Teacherappoint',
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      // // 用户导入参数
      showImport: false,
      importForm: {
        'gh': '',
        'xm': ''
      },
      // 确认导入弹出
      showConfirmImport: false,
      // 显示导出
      showExport: false,
      // // 总条数
      total: 0,
      // 免任弹出
      showRemove: false,

      // // 详情弹出层
      open: false,
      // // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwmcList: [],
        genderList: [],
        lbList: [],
        sfdbList: [],
        gh: '',
        xm: ''
      },
      expordParams: {
        pageNum: 1,
        pageSize: 10,
        dwmcList: [],
        genderList: [],
        lbList: [],
        sfdbList: [],
        gh: '',
        xm: ''

      },
      searchVal: '',
      select: '',
      isMore: false,
      moreIform: {
        value1: ''
      },
      // category: { // 类别
      //   checkAll: false,
      //   choose: [],
      //   checkBox: [{ label: '专职', val: 0 }, { label: '兼职', val: 1 }],
      //   isIndeterminate: true
      // },
      status: { // 状态
        checkAll: false,
        choose: [],
        checkBox: [{ label: '是', val: 1 }, { label: '否', val: 0 }],
        isIndeterminate: true
      },
      sex: { // 性别
        checkAll: false,
        choose: [],
        checkBox: [{ label: '男', val: 1 }, { label: '女', val: 2 }],
        isIndeterminate: true
      },
      workPlace: { // 单位
        checkAll: false,
        choose: [],
        checkBox: [{ label: '软件学院', val: '软件学院' }, { label: '设计学院', val: '设计学院' }, { label: '文学院', val: '文学院' }, { label: '理学院', val: '理学院' }, { label: '工业设计', val: '工业设计' }, { label: '通信工程', val: '通信工程' }, { label: '电子信息', val: '电子信息' }, { label: '建筑工程', val: '建筑工程' }, { label: '统计学', val: '统计学' }],
        isIndeterminate: true
      },
      tableData: [],
      tableDataDetail: [],
      multipleSelection: [],
      removeGh: {
        ghList: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
    // this.getConfigKey('sys.user.initPassword').then(response => {
    //   this.initPassword = response.msg
    // })
  },
  mounted() {},
  methods: {
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop
      this.queryParams.orderPx = column.order === 'descending' ? 1 : 0 // 0是asc升序，1是desc降序
      this.handleSearch()
    },
    // 查询
    handleSearch() {
      console.log(this.queryParams.keyword)
      if (this.select == 'xm') {
        this.queryParams.xm = this.searchVal
      } else if (this.select == 'gh') {
        this.queryParams.gh = this.searchVal
      }
      this.getList()
      this.queryParams.xm = ''
      this.queryParams.gh = ''
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore
    },
    // // 类别全选
    // handleCheckAllCategoryChange(val) {
    //   const allCheck = []
    //   for (const i in this.category.checkBox) {
    //     allCheck.push(this.category.checkBox[i].val)
    //   }
    //   this.category.choose = val ? allCheck : []
    //   console.log(this.category.choose, '全选')
    //   this.category.isIndeterminate = false
    //   this.queryParams.dwmcList = this.workPlace.choose
    //   this.queryParams.genderList = this.sex.choose
    //   this.queryParams.lbList = this.category.choose
    //   // 调用接口
    //   this.getList()
    // },
    // // 类别单选
    // handleCheckedCategoryChange(value) {
    //   const checkedCount = value.length
    //   this.category.checkAll = checkedCount === this.category.checkBox.length
    //   this.category.isIndeterminate = checkedCount > 0 && checkedCount < this.category.checkBox.length
    //   console.log(this.category.choose, '单选')
    //   this.queryParams.dwmcList = this.workPlace.choose
    //   this.queryParams.genderList = this.sex.choose
    //   this.queryParams.lbList = this.category.choose
    //   // 调用接口
    //   this.getList()
    // },
    // 状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = []
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].val)
      }
      this.status.choose = val ? allCheck : []
      console.log(this.status.choose, '全选')
      this.status.isIndeterminate = false
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length
      this.status.checkAll = checkedCount === this.status.checkBox.length
      this.status.isIndeterminate = checkedCount > 0 && checkedCount < this.status.checkBox.length
      console.log(this.status.choose, '单选')
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 性别全选
    handleCheckAllSexChange(val) {
      const allCheck = []
      for (const i in this.sex.checkBox) {
        allCheck.push(this.sex.checkBox[i].val)
      }
      this.sex.choose = val ? allCheck : []
      console.log(this.sex.choose, '全选')
      this.sex.isIndeterminate = false
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 性别单选
    handleCheckedSexChange(value) {
      const checkedCount = value.length
      this.sex.checkAll = checkedCount === this.sex.checkBox.length
      this.sex.isIndeterminate = checkedCount > 0 && checkedCount < this.sex.checkBox.length
      console.log(this.sex.choose, '单选')
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 工作单位全选
    handleCheckAllWorkPlaceChange(val) {
      const allCheck = []
      for (const i in this.workPlace.checkBox) {
        allCheck.push(this.workPlace.checkBox[i].val)
      }
      this.workPlace.choose = val ? allCheck : []
      console.log(this.workPlace.choose, '全选')
      this.workPlace.isIndeterminate = false
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 工作单位单选
    handleCheckedWorkPlaceChange(value) {
      const checkedCount = value.length
      this.workPlace.checkAll = checkedCount === this.workPlace.checkBox.length
      this.workPlace.isIndeterminate = checkedCount > 0 && checkedCount < this.workPlace.checkBox.length
      console.log(this.workPlace.choose, '单选')
      this.queryParams.dwmcList = this.workPlace.choose
      this.queryParams.genderList = this.sex.choose
      this.queryParams.sfdbList = this.status.choose
      // 调用接口
      this.getList()
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // TODO 打开导出弹窗
    handleExport() {
      // this.showExport = true
      this.queryParams.pageNum = 0
      exportTeacher(this.queryParams)
        .then((res) => {
          this.downloadFn(res, '班主任任命表.xlsx', 'xlsx')
        })
        .catch((err) => {})
    },
    // 导出取消
    handleCancel() {
      this.showExport = false
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false
    },
    // 点击详情
    hadleDetail(row, flag) {
      // getTeacherDetail()
      var data = { 'gh': row.gh }
      getTeacherDetail(data).then(response => {
        this.tableDataDetail = response.teacherDetailRes
        console.log(response, 'response')
      })

      console.log(this.tableDataDetail.rmsj, 'this.tableDataDetail.rmsj')

      this.open = true
    },
    // ///////////////////////////////////////////////////////////////
    /** 查询岗位列表 */
    getList() {
      getTeacherDetailList(this.queryParams).then(response => {
        this.tableData = response.resList
        this.total = response.count
      }).catch(err => {})
    },

    /** 导入按钮操作 */
    handleImport() {
      this.showImport = true
    },

    // /** 导入提交按钮 */
    submitImport: function() {
      // todo
      this.showImport = false
      this.showConfirmImport = true
    },
    // 取消导入提交按钮
    cancelImport() {
      this.showImport = false
    },

    // 确认导入按钮
    confirmImport() {
      this.showConfirmImport = false
      addTeacher({ 'ghList': [this.importForm.gh] }).then(res => {
        console.log(res.flag)
        this.getList()
      })
    },
    // 取消导入按钮
    cancelConfirmImport() {
      this.showConfirmImport = false
    },
    // 点击批量免去
    handleRemove() {
      this.showRemove = true
      console.log(this.multipleSelection)
    },
    // 确认批量免去
    confirmRemove() {
      for (var i in this.multipleSelection) {
        this.removeGh.ghList.push(this.multipleSelection[i].gh)
        console.log(this.removeGh, 'removeGh')
      }
      removeTeacher(this.removeGh).then(res => {
        this.getList()
        console.log(res.flag)
      })
      this.showRemove = false
    },
    // 取消免任
    cancleRemove() {
      this.showRemove = false
    },

    // 详情取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: '0',
        remark: undefined,
        postIds: [],
        roleIds: []
      }
      this.resetForm('form')
    }
    /** 详细信息查询 */
    // handleGet(row) {
    //   const name = row.name || ''
    //   this.$router.push({ path: '/basicInfo/detailInfo/index', query: { name: name }})
    // }
  }
}

</script>

<style lang="scss" scoped>
.basicInfo{
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
        .fullGreen{
          // border:1px solid #005657;
          color:#fff;
          background: #005657;
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
            background: url('~@/assets/images/icon_1.png') no-repeat;
          }
          .orangeIcon{
            background: url('~@/assets/images/icon_2.png') no-repeat;
          }
          .lightIcon{
            background: url('~@/assets/images/icon_3.png') no-repeat;
          }
          .greenIcon{
            background: url('~@/assets/images/export.png');
          }
          .removeButton{
            background: url('~@/assets/images/icon_remove.png');
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
  .searchButton{
    background: #005657;
    color: white;
  }
}
.closeButton{
    background: #005657;
    color: white;
  }

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center
}
.greenDot{
  width: 8px;
height: 8px;
color: #23AD6F;
}
.redDot{
  width: 8px;
height: 8px;
color: #ED5234;
}
</style>
