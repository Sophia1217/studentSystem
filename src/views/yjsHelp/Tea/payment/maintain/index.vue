<template>
  <div>
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
            <el-option label="学生" value="xm"></el-option>
            <el-option label="岗位名称" value="gwmc"></el-option>
            <el-option label="岗位" value="gw"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="query"
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
            <span>用人部门：</span>
            <el-select
              v-model="moreIform.gwYrbmList"
              multiple
              clearable
              collapse-tags
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
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>发放年月：</span>
            <el-date-picker
              type="monthrange"
              placeholder="选择年月"
              v-model="datePicker"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              range-separator="至"
              start-placeholder="开始年月"
              end-placeholder="结束年月"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>金额：</span>
            <el-date-picker
              type="monthrange"
              placeholder="选择年月"
              v-model="datePicker"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              range-separator="至"
              start-placeholder="开始年月"
              end-placeholder="结束年月"
            ></el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">酬金发放结果列表</span>
          <el-select
            v-model="xn"
            @change="changeXn"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in xnOptions"
              :key="index"
              :label="item.mc"
              :value="item.mc"
            ></el-option>
          </el-select>
          <span>学年</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="mbDownSchool">
            <i class="icon downIcon"></i><span class="title2">模板下载</span>
          </div>
          <div class="btns borderBlue">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :data="fileData"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title2">导入</span>
            </el-upload>
          </div>
          <div class="btns borderLight" @click="expor" v-show="AUTHFLAG">
            <i class="icon orangeIcon"></i><span class="title2">导出</span>
          </div>
          <div class="btns borderLight" @click="showDel" v-show="AUTHFLAG">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng" v-show="AUTHFLAG">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDate"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="xm"
            label="学生"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="gwYrbmc" label="用人部门" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwmc" label="岗位名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="gw" label="岗位" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="ffny"
            label="发放年月"
            min-width="120px"
            sortable="custom"
          >
          </el-table-column>
          <!-- <el-table-column prop="gs" label="工时（小时）" sortable="custom">
          </el-table-column> -->
          <el-table-column prop="je" label="金额（元）" sortable="custom">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
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
import lctCom from "../../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getGzdw } from "@/api/politicalWork/assistantappoint";
import { getToken } from "@/utils/auth";
import {
  queryCjwhList,
  deleteBySchool,
  exportStuBySchool,
  mbDownSchool,
} from "@/api/thrift/paymentApplyYjs";
export default {
  components: { lctCom },
  computed: {
    fileData: {
      get() {
        return {
          xn: this.xn,
        };
      },
    },
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  data() {
    return {
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/qgzxCjffYjssz/importStuCjffBySchool",
      AUTHFLAG: false,
      len: 0,
      xnxjModal: false,
      lctModal: false,
      delModal: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      basicInfo: {},
      xnOptions: [],
      fzxn: "",
      xn: "",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        moneyStart: "",
        moneyEnd: "",
        gwYrbmList: [], // 学院下拉框
      },
      allDwh: [], // 学院下拉框
      datePicker: [],
      showExport: false,
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getSchoolYears();
    this.getAllXy();
    // this.getCode("dmsplcm"); //状态
  },

  methods: {
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.xnOptions = res.data;
          this.xn = res.data[0].mc;
          this.query();
        })
        .catch((err) => {});
    },
    showDetail(row) {
      console.log(row),
        this.$router.push({
          path: "/yjsHelp/payment/paymentMaintainDetail",
          query: {
            id: row.id,
            xh: row.xh,
            gwYrbm: row.gwYrbm,
            gwYrbmc: row.gwYrbmc,
            ffny: row.ffny,
            xn: row.xn,
            gwId: row.gwId,
            gw: row.gw,
            gs: row.gs,
            je: row.je,
            bz: row.bz,
            cjsx: row.cjsx,
          },
        });
    },
    changeXn() {
      this.query();
    },
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
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    showDel() {
      if (this.val && this.val.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      deleteBySchool(this.delArr).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val;
      this.delArr = val.map((item) => item.id);
      // this.tjArr = val.map((item) => item.id);
    },

    query() {
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        gwmc: this.select == "gwmc" ? this.searchVal : null,
        gw: this.select == "gw" ? this.searchVal : null,
        xn: this.xn,
        gwYrbmList: this.moreIform.gwYrbmList,
        moneyStart: this.moreIform.moneyStart,
        moneyEnd: this.moreIform.moneyEnd,
        ffnyStart: rqs || "",
        ffnyEnd: rqe || "",

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryCjwhList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },

    xinzeng() {
      this.$router.push({
        path: "/yjsHelp/payment/paymentMaintainAdd",
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    //学院部门，权限
    getAllXy() {
      getGzdw()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "idList", this.delArr);
      exportStuBySchool(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "研究生三助酬金结果列表导出.xlsx", "xlsx");
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
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        gwmc: this.select == "gwmc" ? this.searchVal : null,
        gw: this.select == "gw" ? this.searchVal : null,
        xn: this.xn,
        gwYrbmList: this.moreIform.gwYrbmList,
        moneyStart: this.moreIform.moneyStart,
        moneyEnd: this.moreIform.moneyEnd,
        ffnyStart: rqs || "",
        ffnyEnd: rqe || "",

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    //导入失败
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.router.go(-1);
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    //模板下载
    mbDownSchool() {
      mbDownSchool().then((res) => {
        this.downloadFn(res, "研究生三助酬金发放模板下载", "xlsx");
        this.$message.success("操作成功");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.spcHs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 7px;
}
.jbxx {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
}
.yiny {
  border: 1px solid grey;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: inset 0px -1px 0px #e0e0e0;
  height: 50px;
  border-left: none;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 14px;
}
.bs {
  padding-left: 20px;
  display: inline-block;
  position: relative;
  top: 80%;
  transform: translateY(-50%);
}

.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
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
        background: url("../../../../../assets/images/updata.png") no-repeat;
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
      .borderLight {
        border: 1px solid grey;
        color: red;
        background: #fff;
      }
      .borderGreen {
        border: 1px solid grey;
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
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          color: #000;
          // vertical-align: middle;
        }

        // dialog标题下加一条线

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
        .chIcon {
          margin-top: 10px;
          background: url("~@/assets/dangan/chIcon.png") no-repeat;
        }
        .orangeIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
        .blueIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/in.png") no-repeat;
        }
        .lightIcon {
          margin-top: 9px;
          background: url("~@/assets/assistantPng/delete.png") no-repeat;
        }
        .greenIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/add.png") no-repeat;
        }
        .tjIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
        .downIcon {
          margin-top: 10px;
          background: url("~@/assets/images/down.png") no-repeat;
        }
      }
    }
  }
}
</style>
