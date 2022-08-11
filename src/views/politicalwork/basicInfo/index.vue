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
          <el-button slot="append" class="searchButton" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-input>
        <!-- 更多分类按钮 -->
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多分类下拉checkbox -->
      <div v-if="isMore" class="moreSelect">
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
          <el-col :span="3">工作单位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom :obj-prop="workPlace" @training="handleCheckAllWorkPlaceChange" @checkedTraining="handleCheckedWorkPlaceChange" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft"><span class="title">政工干部列表</span> <i class="Updataicon" /></div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleImport"><i class="icon greenIcon" /><span class="title">导入</span></div>
          <div class="btns borderGreen" @click="handleExport"><i class="icon greenIcon" /><span class="title">导出</span></div>
        </div>
      </div>
      <div class="mt15">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <!-- <el-table-column prop="xbm" label="性别" sortable /> -->
          <el-table-column prop="xbm" label="性别" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.xbm == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="yddh" label="联系方式" sortable />
          <el-table-column prop="dwh" label="工作单位" sortable />
          <el-table-column prop="zgxlm" label="最高学历" sortable />
          <el-table-column prop="byxxjdw" label="最高学历毕业学校" sortable />
          <el-table-column prop="xklbm" label="专业背景" sortable />
          <el-table-column prop="roleid" label="职务" sortable />
          <el-table-column prop="cjgzrq" label="参加工作时间" sortable />
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
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>

  <!-- 导入导出按钮 -->
  <!-- <div class="downloadButton">
      <el-col :span="2.5">
        <el-button
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
        >导入</el-button>
      </el-col>
      <el-col :span="2.5">
        <el-button
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </div></el-row> -->

</template>
<script>
import { getPoliticalWorkList, getFilterPoliticalWorkList } from '@/api/politicalWork/basicInfo'
import CheckboxCom from '../../components/checkboxCom'

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
      // open: false,
      // // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        phone: undefined,
        status: undefined,
        deptId: undefined
      },

      searchVal: '',
      select: '',
      isMore: false,
      moreIform: {
        value1: ''
      },
      category: { // 类别
        checkAll: false,
        choose: [],
        checkBox: [{ label: '辅导员', val: '辅导员' }, { label: '导师', val: '导师' }, { label: '班主任', val: '班主任' }],
        isIndeterminate: true
      },
      sex: { // 性别
        checkAll: false,
        choose: [],
        checkBox: [{ label: '男', val: 21 }, { label: '女', val: 22 }],
        isIndeterminate: true
      },
      workPlace: { // 单位
        checkAll: false,
        choose: [],
        checkBox: [{ label: '软件学院', val: '软件学院' }, { label: '设计学院', val: '设计学院' }, { label: '文学院', val: '文学院' }, { label: '理学院', val: '理学院' }],
        isIndeterminate: true
      },
      selectedCheckbox: [],
      selectedCategory: [],
      tableData: [],
      multipleSelection: [],
      showExport: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
    // this.getTest()
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
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
      this.category.isIndeterminate = false
//调用接口
      getFilterPoliticalWorkList(this.selectedCheckbox).then(response => {
        
      })
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length
      this.category.checkAll = checkedCount === this.category.checkBox.length
      this.category.isIndeterminate = checkedCount > 0 && checkedCount < this.category.checkBox.length
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
    },
    // 性别全选
    handleCheckAllSexChange(val) {
      const allCheck = []
      for (const i in this.sex.checkBox) {
        allCheck.push(this.sex.checkBox[i].val)
      }
      this.sex.choose = val ? allCheck : []
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
      this.sex.isIndeterminate = false
    },
    // 性别单选
    handleCheckedSexChange(value) {
      const checkedCount = value.length
      this.sex.checkAll = checkedCount === this.sex.checkBox.length
      this.sex.isIndeterminate = checkedCount > 0 && checkedCount < this.sex.checkBox.length
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
    },
    // 类别全选
    handleCheckAllWorkPlaceChange(val) {
      const allCheck = []
      for (const i in this.workPlace.checkBox) {
        allCheck.push(this.workPlace.checkBox[i].val)
      }
      this.workPlace.choose = val ? allCheck : []
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
      this.workPlace.isIndeterminate = false
    },
    // 类别单选
    handleCheckedWorkPlaceChange(value) {
      const checkedCount = value.length
      this.workPlace.checkAll = checkedCount === this.workPlace.checkBox.length
      this.workPlace.isIndeterminate = checkedCount > 0 && checkedCount < this.workPlace.checkBox.length
      this.selectedCheckbox = this.category.choose.concat(this.sex.choose).concat(this.workPlace.choose)
      console.log(this.selectedCheckbox, '所有勾选集合数组')
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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
      this.$router.push({
        path: '/politicalwork/detailInfo',
        query: {
          gh: row.gh,
          id: row.date,
          show: flag
        }
      })
      console.log(this.query.gh)
    },
    // ///////////////////////////////////////////////////////////////
    /** 查询岗位列表 */
    getList() {
      // this.loading = true
      // this.basicInfoList = this.basicInfoExample
      // getPoliticalWorkList().then((response) => {
      //   console.log(response);

      //   this.noticeList = response.zgjbxxList // 根据状态码接收数据
      //    this.total = response.total;

      getPoliticalWorkList().then(response => {
        this.tableData = response.zgjbxxList
        this.total = 11
        this.queryParams = {
          pageNum: response.zgjbxxList[0].pageNum,
          pageSize: response.zgjbxxList[0].pageSize
        }
        // this.total = response.zgjbxxList[0].totalCount
        console.log(response, 'response')
        console.log(response.zgjbxxList[0].pageNum, 'pagenum')
        // this.total = response.total;
      })
      //  this.loading = false;
      // })
      // this.axios.get('/data.json')
      //   .then((res) => {
      //     dataTemp = res.data
      //     for (var i in dataTemp.workId){

      //     }
      //     dataTemp.workId = dataTemp.gh
      //     tableData: [{ workId: 1, name: 'abc', sex: '男' }, { workId: 2, name: 'def', sex: '女' }],
      //     tableData =dataTemp
      //     console.log(res.data.flag)
      //   })

      // var url = '/name.json'
      // this.axios.get(url).then(response => (this.res = response))
      //   .catch(function(error) {
      //     console.log(error)
      //   })
      // // get查询
      // console.log(this.axios, 'resresres')
      // axios.get(url).then(ret => {
      //   console.log(ret.data)
      // })
      // // get传参
      // axios.get('abc?id=5').then(ret => {
      //   // data属性名称是固定的,用于获取后台响应的数据
      //   console.log(ret.data)
      // })
      // axios.get('abc', {
      //   params: {
      //     id: 123
      //   }
      // }).then(ret => {
      //   console.log(ret.data)
      // })

      // // post 添加数据
      // axios.post('abc', {
      //   id: 5,
      //   name: 'zhangsan'
      // }).then(ret => {
      //   console.log(ret.data)
      // })
      // var param = new URLSearchParams()
      // param.append(key1, value1)
      // param.append(key2, value2)
      // axios.post('/abc', param).then(ret => {
      // })
      // // put: 修改数据
      // axios.put('abc', {
      //   id: 5,
      //   name: 'zhangsan'
      // }).then(ret => {
      //   console.log(ret.data)
      // })
      // // delete:删除数据
      // axios.delete('abc?id=5').then(ret => {
      //   console.log(ret.data)
      // })
      // axios.delete('abc', {
      //   params: {
      //     id: 123
      //   }
      // }).then(ret => {
      //   console.log(ret.data)
      // })
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
    // handleUpdate(row) {
    //   this.reset()
    //   this.open = true
    //   const name = row.name || this.ids
    //   this.form = row
    //   this.title = '修改政工干部基本信息'
    //   getUser(name)
      // getUser(postId).then(response => {
      //   this.form = response.data
      //   this.open = true
      //   this.title = '修改岗位'
      // })
    // },
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
.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center
}
</style>

