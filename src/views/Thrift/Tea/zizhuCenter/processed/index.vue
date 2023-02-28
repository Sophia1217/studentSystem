<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="岗位名称" value="gwMainMc"></el-option>
            <el-option label="岗位" value="gwDetailMc"></el-option>
            <el-option label="工作地点" value="gwGzdd"></el-option>
            <el-option label="指导教师" value="gwZdls"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.status"
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
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">勤工助学岗位列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="back">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon passIcon"></i><span class="title1">通过</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="gwMainMc"
            label="岗位名称"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwDetailMc"
            label="岗位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwGzdd"
            label="工作地点"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwYrdw"
            label="用人部门"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwYgzl"
            label="月工作量"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwYgzsx"
            label="月工资上限"
            min-width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwNjyxc"
            label="年建议薪酬"
            min-width="110"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwNzxsrs"
            label="拟招学生人数"
            min-width="130"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwKnss"
            label="困难生数"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwZdls"
            label="指导教师"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="gwLxfs"
            label="联系电话"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="statusMc"
            label="审核状态"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="拒绝理由" :visible.sync="jjModal" width="30%">
        <template>
          <el-input placeholder="请输入拒绝理由" v-model="jjly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jjCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="jjConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回选择" :visible.sync="thTableModal" width="20%">
        <template>
          <el-table
            :data="tableInner"
            ref="multipleTable1"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column width="55">
              <template slot-scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="tempRadio"
                  @change.native="getRow(scope.$index, scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="actName" label="节点名称" sortable="custom">
            </el-table-column>
          </el-table>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thTableCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thTableConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
        <template>
          <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
        <template>
          <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
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
import CheckboxCom from "../../../../components/checkboxCom";
import {
  queryDshList,
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  exportDsh,
} from "@/api/thrift/gwAudit";
import lctCom from "../../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
      showExport: false,
      lctModal: false,
      ztStatus: [],
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        status: [], // 学院下拉框
      },
      exportParams: {},
      tableData: [],
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      multipleSelection1: "",
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      detailModal: false,
      tableDetails: [],
      formDetails: {},
      editDetails: [],
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      rules: {
        // shjg: [
        //   { required: true, message: "审核结果不能为空", trigger: "change" },
        // ],
        // shyj: [
        //   { required: true, message: "审核意见不能为空", trigger: "change" },
        // ],
      },
    };
  },

  mounted() {
    this.handleSearch();
    this.getCode1("dmsplcm"); // 培养层次
  },

  methods: {
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "ids", ids);
      exportDsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "勤工助学岗位审核列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    async expor() {
      let data = {
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : null,
        gwDetailMc: this.select == "gwDetailMc" ? this.searchVal : null,
        gwGzdd: this.select == "gwGzdd" ? this.searchVal : null,
        gwZdls: this.select == "gwZdls" ? this.searchVal : null,
        status: this.moreIform.status,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    getCode1(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //通过
    pass() {
      if (this.commonParams.length > 0) {
        var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核通过",
        }));
        tyFlow(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.detailModal = false;
            this.handleSearch();
          } 
        });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    //拒绝
    refuse() {
      if (this.commonParams.length > 0) {
        this.jjModal = true;
        this.jjly = "";
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    jjCancel() {
      this.jjModal = false;
    },
    jjConfirm() {
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.jjly,
      }));
      jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.handleSearch();
        }
      });
      this.jjModal = false;
    },
    async back() {
      if (this.commonParams.length > 0) {
        var processId = { processId: this.commonParams[0].taskId };
        await backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        if (this.detailModal == false) {
          this.thModal = true;
        }
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    thCancel() {
      this.thModal = false;
    },
    thConfirm() {
      this.thModal = false;
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.thly,
        actId: this.multipleSelection1.actId,
        actName: this.multipleSelection1.actName,
      }));
      // var targ = {
      //   czdaFlowNodeRes: this.multipleSelection1,
      //   czdaFlowOpReqList: data,
      // };
      thFinal(data).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
        }
      });
    },
    hadleDetail(row) {
      console.log("row", row);
      this.$router.push({
        path: "/Thrift/post/postAuditDetail",
        query: {
          businesId: row.businesId,
          processId: row.processid,
          status: row.status,
          taskId: row.taskId,
          xh: row.xh,
          editFlag: 2, //1已审核详情，2待审核详情可编辑
        },
      });
    },

    editClick() {
      if (!this.editDetails.shjg) {
        this.$message.error("审核结果不能为空");
      } else {
        var arr = {
          businesId: this.formDetails.businesId,
          processId: this.formDetails.processId,
          status: this.formDetails.status,
          taskId: this.formDetails.taskId,
          xh: this.formDetails.xh,
        };
        let brr = [];
        brr.push(arr);

        console.log("data", data);
        if (this.editDetails.shjg == "01") {
          var data = brr.map((item) => ({
            ...item,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "审核通过",
          }));
          //通过
          tyFlow(data).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("审核已通过");
              this.detailModal = false;
              this.handleSearch();
            }
          });
        } else if (this.editDetails.shjg == "02") {
          var data = brr.map((item) => ({
            ...item,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已拒绝",
          }));
          //拒绝
          jjFlow(data).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("已拒绝");
              this.detailModal = false;
              this.handleSearch();
            }
          });
        } else {
          var data = brr.map((item) => ({
            ...item,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已退回",
            actId: this.multipleSelection1.actId,
            actName: this.multipleSelection1.actName,
          }));
          thFinal(data).then((res) => {
            if (res.errcode == "00") {
              this.detailModal = false;
              this.$message.success("退回成功");
              this.handleSearch();
            }
          });
        }
      }
    },
    emptyDetails() {
      this.$nextTick(() => {
        this.$refs.editDetails.resetFields();
      });
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : null,
        gwDetailMc: this.select == "gwDetailMc" ? this.searchVal : null,
        gwGzdd: this.select == "gwGzdd" ? this.searchVal : null,
        gwZdls: this.select == "gwZdls" ? this.searchVal : null,
        status: this.moreIform.status,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
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
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];
      this.training.isIndeterminate = false;
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processid,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
      }));
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    changeJG(val) {
      if (val & (val == "03")) {
        console.log("this.editDetails.shjg", this.editDetails.shjg);
        var processId = { processId: this.formDetails.taskId };
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      }
      // else if(val & val == "02"){
      //   console.log(22);
      // } else {
      //   console.log(33);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
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
      .elSelect {
        width: 150px;
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
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
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
          .deteIcon {
            background: url("~@/assets/images/yes.png") no-repeat;
          }
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .passIcon {
            margin-top: 10px;
            background: url("~@/assets/images/passWhite.png") no-repeat;
          }
          .refuseIcon {
            margin-top: 10px;
            background: url("~@/assets/images/refuse.png") no-repeat;
          }
          .backIcon {
            margin-top: 10px;
            background: url("~@/assets/images/back.png") no-repeat;
          }
        }
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      // display: flex;
      align-items: flex-start;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  }
  .backDetail {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;

    .formRight {
      width: 100%;
      margin-top: 15px;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 48px;
          background: #e0e0e0;
          text-align: right;
          padding-right: 5px;
          margin: 0 !important;
        }
        .content {
          font-weight: 400;
          font-size: 14px;
          color: #1f1f1f;
          line-height: 22px;
          margin-left: 16px;
        }
      }

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
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
      .greenIcon {
        margin: 15px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
</style>
