<template>
  <div class="talkRec">
    <div class="searchWrap"></div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            @change="changeXn"
            placeholder="请选择"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allXn"
              :key="index"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
          <span>学年度</span>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="培养单位" sortable>
            <!-- <el-table-column prop="xh" label="班级" sortable> -->
          </el-table-column>
          <el-table-column prop="xm" label="年级" sortable> </el-table-column>
          <el-table-column
            prop="pyccmc"
            label="应提交"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column prop="dwhmc" label="已提交" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="zydmmc"
            label="班主任审核"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="学院已审核"
            min-width="100"
            sortable
          >
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
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出{{ leng }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  tyFlow,
  jjFlow,
  backFlow,
  thFinal,
  queryDshDetail,
  updateZssqFlow,
} from "@/api/dailyBehavior/dormTea";
import { queryDshList, exportDsh } from "@/api/dailyBehavior/yearSum";

import { queryFj, queryLd } from "@/api/dailyBehavior/dormStu";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getZY, getBJ } from "@/api/student/index";
import { lctTable } from "@/api/stuDangan/detailList/xiaoneiwai";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
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
        dwhList: [], // 学院下拉框
        zydmList: [],
        bjList: [],
        xn: "",
        zslxmList: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
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
    };
  },

  mounted() {
    // this.handleSearch();
    this.getAllCollege();
    this.getSchoolYears();
    this.getCode("dmpyccm"); // 培养层次dmxbm
    this.getCode("dmxbm"); // 性别
    this.getCode1("dmsplcm");
  },

  methods: {
    changeXn() {
      this.handleSearch();
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let idList = [];
      for (let item_row of this.multipleSelection) {
        idList.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", idList);
      //this.$set(this.exportParams, "status", "1");
      exportDsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "住宿申请待审核列表导出.xlsx", "xlsx");
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
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        // bjmList: this.moreIform.bjList,
        xn: this.moreIform.xn,
        // zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      if (this.multipleSelection.length > 0) {
        this.leng = this.multipleSelection.length;
      } else {
        await queryDshList(data)
          .then((res) => {
            this.leng = res.totalCount;
          })
          .catch((err) => {});
      }
      console.log(this.leng);
      if (this.leng > 0) {
        this.showExport = true;
      } else {
        this.$message.warning("当前无数据导出");
      }
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
      console.log(row);
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
      }));
      var targ = {
        czdaFlowNodeRes: this.multipleSelection1,
        czdaFlowOpReqList: data,
      };
      thFinal(targ).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
        }
      });
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
    },
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
          this.moreIform.xn = res.data[0].dm;
          this.handleSearch();
        })
        .catch((err) => {});
    },
    async hadleDetail(row) {
      console.log("row", row);
      this.getAllld();
      this.detailModal = true;
      this.editparams = row;
      var data = {
        xh: row.xh,
        roleId: this.$store.getters.roleId,
        businesId: row.businesId,
      };
      await queryDshDetail(data).then((res) => {
        this.formDetails = res.data;
        this.jzflag = res.data.zslxm;
      });
      var processInstanceId = row.processId;
      lctTable({ processInstanceId }).then((res) => {
        this.formDetails.nodeName = res.data[0].nodeName;
        console.log("this.formDetails.nodeName", this.formDetails.nodeName);
        //到最后一个流程节点
        if (this.formDetails.nodeName == "学院副书记审核") {
          this.updateLdFlag = 2;
        }
      });
    },
    editClick() {
      if (!this.editDetails.shjg) {
        this.$message.error("审核结果不能为空");
      } else {
        if (this.editDetails.shjg == "01") {
          var params = {
            //修改楼栋
            id: this.editparams.businesId,
            xh: this.editparams.xh,
            status: this.editparams.status,
            sqldid: this.formDetails.sqldid,
            sqfjid: this.formDetails.sqfjid,
            nodeName: this.formDetails.nodeName || "",
          };

          //申请住宿地点修改,到最后一个流程节点可修改楼栋
          if (this.jzflag == 1 && this.updateLdFlag == 2) {
            updateZssqFlow(params).then((res) => {
              if (res.errcode == "00") {
                // this.$message.success("申请住宿地点修改成功");
                var data = {
                  //通过
                  businesId: this.editparams.businesId,
                  processId: this.editparams.processId,
                  status: this.editparams.status,
                  taskId: this.editparams.taskId,
                  xh: this.editparams.xh,
                  opMsg: this.editDetails.shyj
                    ? this.editDetails.shyj
                    : "审核通过",
                };
                //通过
                tyFlow(data).then((res) => {
                  if (res.errcode == "00") {
                    this.$message.success("申请住宿地点修改成功，审核已通过");
                    this.detailModal = false;
                    this.handleSearch();
                  }
                });
              } else {
                this.$message.err("申请住宿地点修改失败");
              }
            });
          } else {
            var data = {
              //通过
              businesId: this.editparams.businesId,
              processId: this.editparams.processId,
              status: this.editparams.status,
              taskId: this.editparams.taskId,
              xh: this.editparams.xh,
              opMsg: this.editDetails.shyj ? this.editDetails.shyj : "审核通过",
            };
            //通过
            tyFlow(data).then((res) => {
              if (res.errcode == "00") {
                this.$message.success("审核已通过");
                this.detailModal = false;
                this.handleSearch();
              }
            });
          }
        } else if (this.editDetails.shjg == "02") {
          var data = {
            businesId: this.editparams.businesId,
            processId: this.editparams.processId,
            status: this.editparams.status,
            taskId: this.editparams.taskId,
            xh: this.editparams.xh,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已拒绝",
          };
          //拒绝
          jjFlow(data).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("已拒绝");
              this.detailModal = false;
              this.handleSearch();
            }
          });
        } else {
          var data = {
            businesId: this.editparams.businesId,
            processId: this.editparams.processId,
            status: this.editparams.status,
            taskId: this.editparams.taskId,
            xh: this.editparams.xh,
            opMsg: this.editDetails.shyj ? this.editDetails.shyj : "已退回",
            actId: this.multipleSelection1.actId,
            actName: this.multipleSelection1.actName,
          };
          //退回
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
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwhList: this.moreIform.dwhList,
        zydmList: this.moreIform.zydmList,
        // bjList: this.moreIform.bjList,
        xn: this.moreIform.xn,
        // zslxmList: this.moreIform.zslxmList,
        pyccmList: this.training.choose || [],
        loginId: this.$store.getters.userId,
        sqsjStart: rqs || "",
        sqsjEnd: rqe || "",
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
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
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
            // case "dmxbm":
            //   this.$set(this.dmxbmOPs, "checkBox", res.data);
            //   this.xbOps = res.data;
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
        processId: v.processId,
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
      if (val && val == "03") {
        console.log("this.editDetails.shjg", this.editDetails.shjg);
        var processId = { processId: this.editparams.taskId };
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      }
      // else if(val && val == "02"){
      //   console.log(22);
      // } else {
      //   console.log(33);
      // }
    },
    getAllld() {
      queryLd()
        .then((res) => {
          if (res.errcode == "00") {
            this.ldOps = res.data;
          }
        })
        .catch((err) => {});
    },
    changeLD(flag) {
      queryFj({ dm: flag }).then((res) => {
        if (res.errcode == "00") {
          this.fjOps = res.data;
        } else {
          this.$message.error("获取房间号失败");
        }
      });
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
      display: flex;
      align-items: center;
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
