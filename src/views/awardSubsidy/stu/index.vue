<template>
  <div>
    <div class="tableWrap mt15">
      <topTitle :routeTitle="routeTitle"></topTitle>
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">申请列表</span>
        </div>
        <div class="headerRight">
          <!-- <div>
            <div class="btns borderBlue" @click="xnxjDaochu">
              <i class="icon orangeIcon"></i
              ><span class="title2">认定表导出</span>
            </div>
          </div> -->
          <div style="margin-right: 15px">
            <el-dropdown split-button @command="xnxjDaochu">
              <span class="el-dropdown-link">申请表导出</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">PDF下载</el-dropdown-item>
                <el-dropdown-item command="2">Word下载</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderBlue" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderBlue" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
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
            prop="zzxmmc"
            label="资助项目名称"
            min-width="130"
            sortable="custom"
          >
          </el-table-column
          ><el-table-column
            prop="jzlb"
            label="资助类别"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="sqdj" label="申请等级" sortable="custom" min-width="100">
          </el-table-column>
          <el-table-column prop="sqsj" label="申请时间" sortable="custom"  min-width="100">
          </el-table-column>
          <el-table-column prop="hjdj" label="获奖等级" sortable="custom" min-width="100">
          </el-table-column>
          <el-table-column prop="hjje" label="获奖金额（元）" sortable="custom" min-width="135">
          </el-table-column>
          <el-table-column prop="shsj" label="审批时间" sortable="custom" min-width="100">
          </el-table-column>
          <el-table-column prop="statusChinese" label="审核状态" sortable="custom" min-width="100">
            <!-- <template slot-scope="scope">
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
            </template> -->
          </el-table-column>
          <el-table-column
            prop="jg"
            label="审核进度"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流转记录</span>
              </el-button>
            </template>
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
    <el-dialog title="撤回" :visible.sync="chehuiModal" width="20%">
      <span>确认撤回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="ch()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj">确 定</el-button>
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <el-dialog
      title="导出确认"
      :visible.sync="xnxjModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="xnxjModalCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="xnxjModaldaochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import lctCom from "../../components/lct";
import topTitle from "../../components/topTitle";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import {
  queryKnssqxsjbxx,
  exportJz,
} from "@/api/familyDifficulties/stu";
import {
  queryList,
  tjJzsqById,
  cxById,
  deletebyId,
} from "@/api/awardSubsidy/stu";
export default {
  components: { lctCom, topTitle },
  data() {
    return {
      xnxjModal: false,
      formAdd: { xn: "", zwxj: "" },
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      delModal: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      routeTitle: "",
      chehuiModal: false,
      basicInfo: {},
      rules: {
        sqdj: [
          {
            required: true,
            message: "申请等级不能为空",
            trigger: "blur",
          },
        ],
        sqly: [
          {
            required: true,
            message: "申请理由不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmkndjm"); //状态
    // this.getBASIC(); //获取基本信息
    this.routeTitle = this.$route.meta.title;
  },

  methods: {
    BackHomepage() {
      this.$router.push({
        path: "/studentHomePage",
      });
    },
    showDetail(row) {
      this.$router.push({
        path: "/awardSubsidyTable",
        query:{
          businesId: row.businesId,
          status: row.status,
        },
      });
    },
    xnxjModalCancel() {
      this.xnxjModal = false;
    },
    xnxjModaldaochu() {
      var data = [];
      for (var x = 0; x < this.multipleSelection.length; x++) {
        data.push({
          exType: this.Type,
          businesId: this.multipleSelection[x].businesId,
          processid: this.multipleSelection[x].processid,
          sqlx: this.multipleSelection[x].pyccm,
          xh: this.multipleSelection[x].xh,
        });
      }
      exportJz(data).then((res) => {
        this.downloadFn(res, "困难认定表导出下载", "zip");
        this.xnxjModal = false;
      });
    },
    xnxjDaochu(ins) {
      this.Type = ins == "1" ? "pdf" : "docx";
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.xnxjModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },

    tjModal() {
      var falg = 1;
      //判断是否是草稿数据
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }

      if (falg == 1) {
        if (this.tjArr && this.tjArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tj() {
      var data = this.val;
      tjJzsqById(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
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
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      var data = this.val;
      cxById(data).then((res) => {
        this.$message.success("撤回成功");
        this.query();
        this.chehuiModal = false;
      });
    },
    chModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.chehuiModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    del() {
      deletebyId({idList: this.delArr}).then((res) => {
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
      this.delArr = val.map((item) => item.businesId);
      this.tjArr = val.map((item) => item.businesId);
    },
    query() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryList().then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    getBASIC() {
      queryKnssqxsjbxx({ xh: this.$store.getters.userId }).then((res) => {
        // console.log(res);
        this.basicInfo = res.data;
      });
    },
    xinzeng() {
      this.$router.push({
        path: "/awardSubsidyTable",
        query:{
          businesId: "",
          status: "",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
  padding-left: 40px;
  padding-top: 14px;
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
      }
    }
  }
  .headline {
    padding: 15px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableStyle {
    padding: 0 20px;
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
        ::v-deep .el-input {
          width: 200px;
        }
      }
    }
  }
}
</style>
