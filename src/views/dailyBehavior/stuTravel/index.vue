<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="请输入..."
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            @change="selectChange"
            placeholder="查询条件"
          >
            <el-option label="乘车站点" value="1" />
            <el-option label="家庭地址" value="2" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="searchClick"
            >查询</el-button
          >
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
          <el-col :span="20">
            <span>申请时间：</span>
              <el-date-picker 
                type="daterange" 
                placeholder="选择日期" 
                v-model="datePicker" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width= 60px;"
              ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>审核状态：</span>
            <el-select
              v-model="status"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in ztStatus"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">火车乘车区间填写列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderRed" @click="handleDelete">
            <i class="icon lightIcon" /><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="handleSubmit">
            <i class="icon orangeIcon" /><span class="title">提交</span>
          </div>
          <div class="btns fullGreen" @click="handleNew">
            <i class="icon greenIcon" /><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="xh" label="学号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="jtdz" label="家庭地址" sortable="custom" />
          <el-table-column prop="chqj" label="乘车区间" sortable="custom" />
          <el-table-column prop="sqsj" label="申请时间" sortable="custom" />
          <el-table-column prop="status" label="审核状态" sortable="custom">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in ztStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <el-dialog title="新增申请" :visible.sync="addModal" width="40%" :close-on-click-modal="false">
        <el-form ref="formAdd" :model="formAdd" :rules="rules" label-width="100px">
          <el-row :gutter="20">  
            <el-col :span="20">           
            <el-form-item label="家庭地址" 
              
              prop="jtdz"
              :rules="rules.jtdz"
            >
              <el-input v-model="formAdd.jtdz"/>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20"> 
            <el-col :span="12"> 
            <el-form-item label="乘车区间" 
              
              prop="chqjsid"
              :rules="rules.chqjsid"
            >
              <el-select
                v-model="formAdd.chqjsid"
                placeholder="请输入车站"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in zdOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="1">
              <div><span>-</span></div>
            </el-col>
            <el-col :span="7"> 
              <el-select
                v-model="formAdd.chqjeid"
                placeholder="请输入车站"
                collapse-tags
              >
                <el-option
                  v-for="(item, index) in zdOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
            </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">  
            <el-col :span="20"> 
            <el-form-item label="申报时间" 
              
              prop="sqsj"
              :rules="rules.sqsj"
            >
              <el-date-picker
                v-model="formAdd.sqsj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">  
            <el-col :span="20"> 
            <el-form-item label="申请备注" 
              
              prop="sqbz"
              :rules="rules.sqbz"
            >
              <el-input 
                v-model="formAdd.sqbz" 
                type="textarea"
                maxlength="1000"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    <!-- 导出确认对话框 -->
    <!-- <el-dialog :title="title" :visible.sync="submitModal" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 批量删除对话框 -->
    <el-dialog :title="title" :visible.sync="showDelete" width="30%">
      <template v-for="item in multipleSelection">
        <div :key="item.createXh">
          <span>确认删除【{{ item.createXm }}】记录的【{{ item.hdzt }}】活动记录？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmRecord"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
 import { 
  edit,
  del,
  query,
  tj,
  queryAllZd,
  queryDetail,
 } from "@/api/dailyBehavior/stuTravel";
 import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
//  import lctCom from "../../../components/lct";
export default {
  name: "BasicInfo",
  // components: { lctCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 批量删除确定框弹出
      showDelete: false,
      // 详情框显示
      open: false,

      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      lctModal: false,
      zdOps: [],
      status: [],
      basicInfoList: [],
      multipleSelection: [],
      submitModal: false,
      queryParams: {
        cczd: "",//乘车站点
        jtdz: "",//家庭地址
        sqsjEnd:"",
        sqsjStart:"",
        statusList: [],

        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xh: this.$store.getters.userId,
      },
      list: [],
      datePicker: [],
      exportParams: {},
      addModal: false,
      editModal: false,
      formAdd: { 
        jtdz: "" ,
        chqjsid: "" ,
        chqjeid: "" ,
        sqsj: "" ,
        sqbz: "" ,
      },
      formEdit: { 
        jtdz: "" ,
        chqjsid: "" ,
        chqjeid: "" ,
        sqsj: "" ,
        sqbz: "" ,

      },
      rules: {
        jtdz: [
          { required: true, message: "家庭地址不能为空", trigger: "blur" },
        ],
        chqjsid: [
          { required: true, message: "出发站点不能为空", trigger: "change" },
        ],
        chqjeid: [
          { required: true, message: "到达站点不能为空", trigger: "change" },
        ],
        sqsj: [
          { required: true, message: "家庭地址不能为空", trigger: "blur" },
        ],
        sqbz: [
          { required: true, message: "家庭地址不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList(this.queryParams);

    this.getAllZd();
    this.getCode("dmsplcm"); //状态
  },

  methods: {
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    //流程
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
         this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        this.ztStatus = res.data;
      });
    },
    selectChange() {
      this.searchVal = "";
    },
    getAllZd() {
      this.zdOps = [];
      queryAllZd()
        .then((res) => {
          if (res.errcode == "00") {
            this.zdOps = res.data.rows;
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //获取数据列表
    getList() {
      this.queryParams.cczd = this.select == 1 ? this.searchVal : "";
      this.queryParams.jtdz = this.select == 2 ? this.searchVal : "";
      query(this.queryParams)
        .then((response) => {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
            this.formAdd.jtdz = response.data[0].jtdz;
        })
        .catch((err) => {});
    },
    //批量删除对话框关闭
    dialogCancel() {
      this.showDelete = false;
    },

    // 详情对话框关闭按钮
    cancel() {
      this.open = false;
    },
   
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 列表多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.subArr = val.map((item) => item.id);
      this.list = [...val]; // 存储已被勾选的数据
    },
    //提交
    handleSubmit() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.subArr && this.subArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    submitConfirm() {
      var data = this.val;
      tj(data).then((res) => {
        console.log(111);
        this.$message.success("提交成功");
        this.getList();
        this.submitModal = false;
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    //批量删除
    rmRecord() {
      this.showDelete = false;
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      let data = {
        ids: ids
      }
      del(data)
        .then((res) => {
          this.$message({
            message: res.errmsg,
            type: "success",
          })
          this.getList();
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantWork/detailClassEvent",
        query: {
          id: row.id,
        },
      });
    },
    /**批量删除按钮*/
    handleDelete() {
      if (this.multipleSelection.length > 0) {
        this.showDelete = true;
        this.title = "删除";
      } else {
        this.$message({
          message: "请至少选择一名家访学生！",
          type: "warning",
        });
      }
    },
    //新增
    handleNew(){
      this.formAdd = {}; 
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        // var data = this.formAdd.addData[0];
        var params = {
          jtdz: this.formAdd.jtdz,
          chqjsid: this.formAdd.chqjsid,
          chqjeid: this.formAdd.chqjeid,
          sqsj: this.formAdd.sqsj,
          sqbz: this.formAdd.sqbz,

          xh: this.$store.getters.userId,
        };
        edit(params).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.getList();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    // 搜索查询按钮
    searchClick() {
      this.queryParams.pageNum = 1;
      //日期
      let rqs,rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      this.queryParams.sqsjStart = rqs;
      this.queryParams.sqsjEnd = rqe;
      this.queryParams.statusList = this.status;
      this.getList(this.queryParams);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }
  .searchWrap {
    background: #fff;
    padding: 20px;
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #fff;
      .elSelect {
        width: 110px;
      }
      .inputSelect {
        width: 50%;
      }
      .more {
        flex: 0 0 100px;
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #005657;
        cursor: pointer;
        .moreIcon {
          display: block;
          width: 20px;
          height: 20px;
        }
        .chevronDown {
          background: url("~@/assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("~@/assets/images/chevronUp.png") no-repeat;
        }
      }
    }
    .moreSelect {
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
    }
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .headerLeft {
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed{
          border: 1px solid grey;
          color: red;
          background: #fff;

        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 0px 10px;
          cursor: pointer;
          border-radius: 4px;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
