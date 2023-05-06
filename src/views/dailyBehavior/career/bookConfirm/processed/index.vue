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
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="地点" value="yydd"></el-option>
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
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.pydwmList"
              multiple
              collapse-tags
              @change="changeXY"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allDwh"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.zydmList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in zyOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="6">
            <span>状态：</span>
            <el-select
              v-model="moreIform.qrztList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in ztStatus"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col> -->
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>预约日期：</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePicker"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>预约时间：</span>
            <el-time-picker
              is-range
              v-model="timePicker"
              format="HH:mm"
              value-format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
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
          <span class="title">学生列表</span>
          <div style="margin-left: 10px">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div> -->
          <div class="btns borderRed" @click="jj">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="queren">
            <i class="icon passIcon"></i><span class="title1">确认</span>
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
            prop="xh"
            label="学号"
            min-width="110px"
            sortable="custom"
          />
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="pydw"
            label="培养单位"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="zymc"
            label="专业"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="yyrq"
            label="预约日期"
            min-width="100px"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.yyrq"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 135px"
                :clearable="false"
                @change="changeSJ(scope.row, 1)"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="yysj"
            label="预约时间"
            min-width="130px"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-time-picker
                is-range
                v-model="scope.row.updateTime"
                format="HH:mm"
                value-format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :clearable="false"
                style="width: 240px"
                @blur="changeSJ(scope.row,2)"
              >
              </el-time-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="yydd"
            label="地点"
            min-width="120px"
            sortable="custom"
          >
          </el-table-column>
          <!-- <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column> -->

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
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
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="拒绝" :visible.sync="jjModal" width="20%">
      <span>确认拒绝？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jjCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="jjConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="确认" :visible.sync="querenModal" width="20%">
      <span>确认同意预约？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qrCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="qrConfirm()"
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
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import {
  updateSjZxsj,
  lsPass,
  queryDshList,
  lsRefuse,
} from "@/api/career/bookTea";
import { getBJ, getZY } from "@/api/student/index";
import { getCollege } from "@/api/class/maintenanceClass";
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
      status: [],
      datePicker: [],
      timePicker: null,
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        pydwmList: [], // 学院下拉框
        zydmList: [],
        // qrztList: [],
      },
      exportParams: {},
      tableData: [],
      allDwh: [],
      zyOps: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        total: 0,
        xn: "",
        xqm: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      formDetails: {},
      basicInfo: {},
      jjModal: false,
      querenModal: false,
      delArr: [],
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.getXnxq();
    this.getAllCollege();
    this.getCode1("dmcfdjm"); // 处分等级
    this.getCode1("dmsplcm");
  },

  methods: {
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }
        this.queryParams.xn = this.dqXnxq[0];
        this.queryParams.xqm = this.dqXnxq[1];
        this.handleSearch();
      });
    },
    handleChangeXnxq() {
      this.queryParams.xn = " ";
      this.queryParams.xqm = "";
      if (this.dqXnxq[0]) {
        this.queryParams.xn = this.dqXnxq[0];
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqm = this.dqXnxq[1];
      }
      this.handleSearch();
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydmList = []; // 班级
      }
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
    // 时间期限赋值
    insertDate() {
      if (this.tableData.length > 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].yysj !== null) {
            this.tableData[i].updateTime = [];
            this.tableData[i].updateTime.push(
              this.tableData[i].yysj.slice(0, 5)
            );
            this.tableData[i].updateTime.push(
              this.tableData[i].yysj.slice(6, 11)
            );
          }
        }
      }
    },
    editCfqx(row) {
      this.changeSJ(row, 2);
    },
    changeSJ(row, flag) {
      if (flag == 1) {
        //改日期
        var data = {
          yyid: row.yyid,
          yyrq: row.yyrq,
          yysjks: row.updateTime[0],
          yysjjs: row.updateTime[1],
        };
      } else if (flag == 2) {
        //改时间
        var data = {
          yyid: row.yyid,
          yysjks: row.updateTime[0],
          yysjjs: row.updateTime[1],
          yyrq: row.yyrq,
        };
      } else {
        var data = {
          id: row.id,
          cfwh: row.cfwh,
        };
      }
      updateSjZxsj(data)
        .then((res) => {
          this.$message.success("修改成功");
          this.handleSearch();
        })
        .catch((err) => {
          this.handleSearch();
        });
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      queryDshList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "违纪处分已处理列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
      this.showExport = false;
    },
    expor() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        yydd: this.select == "yydd" ? this.searchVal : null,
        pydwmList: this.moreIform.pydwmList,
        zydmList: this.moreIform.zydmList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
        yyrqks:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        yyrqjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        // pyccm: this.training.choose || [],

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
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },

    hadleDetail(row) {
      // console.log("row", row);
      this.$router.push({
        path: "/dailyBehavior/career/bookConfirmDetail",
        query: {
          // mtfs: glag, //1线上，2线下
          id: row.id,
          xh:row.xh,
        },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        yydd: this.select == "yydd" ? this.searchVal : null,
        pydwmList: this.moreIform.pydwmList,
        zydmList: this.moreIform.zydmList,
        cfdjmList: this.moreIform.cfdjmList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
        yyrqks:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        yyrqjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        yysjks:
          this.timePicker && this.timePicker.length > 0
            ? this.timePicker[0]
            : "",
        yysjjs:
          this.timePicker && this.timePicker.length > 0
            ? this.timePicker[1]
            : "",
        // pyccm: this.training.choose || [],

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
          this.insertDate();
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
      this.delArr = val.map((item) => item.id);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    jj() {
      if (this.delArr && this.delArr.length > 0) {
        this.jjModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    jjConfirm() {
      lsRefuse({ ids: this.delArr }).then((res) => {
        this.handleSearch();
        this.jjModal = false;
        this.$message.success("拒绝成功");
      });
    },
    jjCancel() {
      this.jjModal = false;
    },
    queren() {
      if (this.delArr && this.delArr.length > 0) {
        this.querenModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    qrConfirm() {
      lsPass({ ids: this.delArr }).then((res) => {
        this.handleSearch();
        this.querenModal = false;
        this.$message.success("确认成功");
      });
    },
    qrCancel() {
      this.querenModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.footerFlex {
  display: flex;
  justify-content: flex-end;
}

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
        display: flex;
        flex-direction: row;
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
