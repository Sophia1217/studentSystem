<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input v-model="searchVal" placeholder="可输入多个查询条件，以半角空格区分" class="inputSelect">
          <el-select slot="prepend" v-model="select" class="elSelect" placeholder="查询条件">
            <el-option label="工号" value="1" />
            <el-option label="姓名" value="2" />
            <el-option label="身份证号" value="3" />
            <el-option label="手机号" value="4" />
          </el-select>
          <el-button slot="append" class="searchButton" icon="el-icon-search" @click="searchClick">查询</el-button>
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
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="category" @training="handleCheckAllCategoryChange" @checkedTraining="handleCheckedCategoryChange" />
            </div>
          </el-col>
        </el-row>
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
        <div class="headerLeft"><span class="title">在岗辅导员列表</span> <i class="Updataicon" /></div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleExport"><i class="icon greenIcon" /><span class="title">导出</span></div>
        </div>
      </div>
      <div class="mt15">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="workId" label="工号" sortable />
          <el-table-column prop="name" label="姓名" sortable />
          <el-table-column prop="name" label="类别" sortable />
          <el-table-column prop="sex" label="性别" sortable />
          <el-table-column prop="sex" label="工作单位" sortable />
          <el-table-column prop="number" label="任职班级" sortable />
          <el-table-column prop="workPlace" label="在岗日期" sortable />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="hadleDetail(scope.row,1)">
                <i class="scopeIncon handledie" /> <span class="handleName">详情</span>
              </el-button>
              <!-- <el-button type="text" size="small" @click="hadleDetail(scope.row,2)">
                <i class="scopeIncon handleEdit" /> <span class="handleName">编辑</span>
              </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <el-dialog :visible.sync="open" width="1200px" append-to-body>
      <el-table ref="multipleTable" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="在岗日期" width="50" />
        <el-table-column prop="workId" label="班级编号" sortable />
        <el-table-column prop="name" label="班级名称" sortable />
        <el-table-column prop="sex" label="培养层次" sortable />
        <el-table-column prop="number" label="培养单位" sortable />
        <el-table-column prop="workPlace" label="年级" sortable />
        <el-table-column prop="workPlace" label="任职状态" sortable />
        <el-table-column prop="workPlace" label="任命人" sortable />
        <el-table-column prop="workPlace" label="任命时间" sortable />
        <el-table-column prop="workPlace" label="免去人" sortable />
        <el-table-column prop="workPlace" label="撤任时间" sortable />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="closeButton" @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>


</template>
<script>
import { listPost, getPost, getList, delPost, addPost, updatePost } from '@/api/system/post'
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus } from '@/api/system/user'
import { getToken } from '@/utils/auth'
import CheckboxCom from '../../../components/checkboxCom'
import EditTable from '../../../tool/gen/editTable.vue'
import EditTable1 from '../../../tool/gen/editTable.vue'
// todo checkbox选项
// const categoryOptions = ['辅导员', '导师', '班主任']
// const sexOptions = ['男', '女']
// const workPlaceOptions = ['教育学院', '计算机学院', '社会学院', '心理学院', '数学与统计学院', '人工智能教育学部']

// const basicInfoListExample = [
//   { 'name': 'a', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'a', 'workInfo': 'female' },
//   { 'name': 'b', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'b', 'workInfo': 'female' },
//   { 'name': 'c', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'c', 'workInfo': 'female' },
//   { 'name': 'd', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'd', 'workInfo': 'female' },
//   { 'name': 'e', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'e', 'workInfo': 'female' },
//   { 'name': 'f', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'f', 'workInfo': 'female' },
//   { 'name': 'g', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'g', 'workInfo': 'female' },
//   { 'name': 'h', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'h', 'workInfo': 'female' },
//   { 'name': 'i', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'i', 'workInfo': 'female' },
//   { 'name': 'j', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'j', 'workInfo': 'female' },
//   { 'name': 'k', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'l', 'workInfo': 'female' },
//   { 'name': 'l', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'k', 'workInfo': 'female' },
//   { 'name': 'm', 'sex': 'female', 'phone': 'female', 'workPlace': 'female', 'university': 'female', 'major': 'female', 'class': 'm', 'workInfo': 'female' }]
export default {
  name: 'BasicInfo',
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      // dicts: ['sys_normal_disable'],
      // // 遮罩层
      // // loading: true,
      // // 用户导入参数
      // upload: {
      //   // 是否显示弹出层（用户导入）
      //   open: false,
      //   // 弹出层标题（用户导入）
      //   title: '',
      //   // 是否禁用上传
      //   isUploading: false,
      //   // 是否更新已经存在的用户数据
      //   updateSupport: 0,
      //   // 设置上传的请求头部
      //   headers: { Authorization: 'Bearer ' + getToken() },
      //   // 上传的地址
      //   url: process.env.VUE_APP_BASE_API + '/system/user/importData'
      // },
      // // 显示搜索条件
      // showSearch: true,
      // // 总条数
      // total: 1,
      // // TODO: 测试数据
      // // 岗位表格数据
      // // basicInfoList: [],
      // basicInfoList: basicInfoListExample,

      // // 弹出层标题
      // title: '',
      // // 是否显示弹出层
      open: false,
      // // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        phone: undefined,
        status: undefined,
        deptId: undefined
      },
      // // 表单参数
      // form: {},
      // idSearch: '',
      // // category 全选
      // checkAllCategory: false,
      // checkedCategory: [],
      // categories: categoryOptions,
      // isIndeterminateCategory: true,
      // // sex 全选
      // checkAllSex: false,
      // checkedSex: [],
      // sexes: sexOptions,
      // isIndeterminateSex: true,
      // // workPlace 全选
      // checkAllWorkPlace: false,
      // checkedWorkPlace: [],
      // workPlaces: workPlaceOptions,
      // isIndeterminateWorkPlace: true

      searchVal: '',
      select: '',
      isMore: false,
      moreIform: {
        value1: ''
      },
      category: { // 类别
        checkAll: false,
        choose: [],
        checkBox: [{ label: '教职工', val: 1 }, { label: '学生', val: 2 }],
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
        checkBox: [{ label: '软件学院', val: 1 }, { label: '设计学院', val: 2 }, { label: '文学院', val: 3 }, { label: '理学院', val: 4 }, { label: '工业设计', val: 5 }, { label: '通信工程', val: 6 }, { label: '电子信息', val: 7 }, { label: '建筑工程', val: 8 }, { label: '统计学', val: 9 }],
        isIndeterminate: true
      },
      status: { // 状态
        checkAll: false,
        choose: [],
        checkBox: [{ label: '在岗', val: 1 }, { label: '不在岗', val: 2 }],
        isIndeterminate: true
      },
      tableData: [{ workId: 1, name: 'abc', sex: '男' }, { workId: 2, name: 'def', sex: '女' }],
      multipleSelection: [],
      showExport: false
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
    // 查询
    handleSearch() {
      console.log(this.searchVal, this.select)
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore
    },
    // 类别全选
    handleCheckAllCategoryChange(val) {
      const allCheck = []
      for (const i in this.category.checkBox) {
        allCheck.push(this.category.checkBox[i].val)
      }
      this.category.choose = val ? allCheck : []
      console.log(this.category.choose, '全选')
      this.category.isIndeterminate = false
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length
      this.category.checkAll = checkedCount === this.category.checkBox.length
      this.category.isIndeterminate = checkedCount > 0 && checkedCount < this.category.checkBox.length
      console.log(this.category.choose, '单选')
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
    },
    // 性别单选
    handleCheckedSexChange(value) {
      const checkedCount = value.length
      this.sex.checkAll = checkedCount === this.sex.checkBox.length
      this.sex.isIndeterminate = checkedCount > 0 && checkedCount < this.sex.checkBox.length
      console.log(this.sex.choose, '单选')
    },
    // 类别全选
    handleCheckAllWorkPlaceChange(val) {
      const allCheck = []
      for (const i in this.workPlace.checkBox) {
        allCheck.push(this.workPlace.checkBox[i].val)
      }
      this.workPlace.choose = val ? allCheck : []
      console.log(this.workPlace.choose, '全选')
      this.workPlace.isIndeterminate = false
    },
    // 类别单选
    handleCheckedWorkPlaceChange(value) {
      const checkedCount = value.length
      this.workPlace.checkAll = checkedCount === this.workPlace.checkBox.length
      this.workPlace.isIndeterminate = checkedCount > 0 && checkedCount < this.workPlace.checkBox.length
      console.log(this.workPlace.choose, '单选')
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = []
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].val)
      }
      this.status.choose = val ? allCheck : []
      console.log(this.status.choose, '全选')
      this.status.isIndeterminate = false
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length
      this.status.checkAll = checkedCount === this.status.checkBox.length
      this.status.isIndeterminate = checkedCount > 0 && checkedCount < this.status.checkBox.length
      console.log(this.status.choose, '单选')
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
      this.open = true
    },
    // ///////////////////////////////////////////////////////////////
    /** 查询岗位列表 */
    getList() {
      this.loading = true
      this.basicInfoList = this.basicInfoExample
      this.total = 11

      // listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
      //     this.userList = response.rows;
      //     this.total = response.total;
      //     this.loading = false;
      //   }
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download('system/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '用户导入'
      this.upload.open = true
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/user/importTemplate', {
      }, `user_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + '</div>', '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.open = true
      const name = row.name || this.ids
      this.form = row
      this.title = '修改政工干部基本信息'
      getUser(name)
      // getUser(postId).then(response => {
      //   this.form = response.data
      //   this.open = true
      //   this.title = '修改岗位'
      // })
    },
    /** 提交按钮 */
    submitForm: function() {
      // todo
      this.open = false
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addUser(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 取消按钮
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
    },
    // id搜索查询按钮
    idSearchClick() {
      alert(this.idSearch)
      getList()
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
  .searchButton{
    background: #005657;
    color: white;
  }
}
.closeButton{
    background: #005657;
    color: white;
  }
</style>

