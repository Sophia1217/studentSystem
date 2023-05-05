<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">我的预约</span>
        </div>
        <!-- <div class="headerRight">
          <div class="btns borderLight" @click="qxyy()">
            <i class="icon tjIcon"></i><span class="title2">矫正教育</span>
          </div>
        </div> -->
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="zxs" label="咨询师" />
          <el-table-column prop="yyrq" label="预约日期"> </el-table-column>
          <el-table-column prop="yysj" label="预约时间"> </el-table-column>
          <el-table-column prop="yydd" label="地点"> </el-table-column>
          <el-table-column prop="lxfs" label="联系方式"> </el-table-column>
          <el-table-column prop="mtfs" label="面谈方式"> </el-table-column>
          <el-table-column prop="xszt" label="状态"> </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="180"
          >
            <template slot-scope="scope">
              <div style="display: flex; justify-content: space-between">
                <el-button
                  type="text"
                  size="small"
                  @click="qxyy(scope.row)"
                  :disabled="
                    scope.row.xszt == '预约中' || scope.row.xszt == '待咨询'
                      ? false
                      : true
                  "
                >
                  <span
                    :class="
                      scope.row.xszt == '预约中' || scope.row.xszt == '待咨询'
                        ? 'handleName'
                        : 'handleNone'
                    "
                    >取消预约</span
                  >
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="pingjia(scope.row)"
                  :disabled="
                    scope.row.sfpj == 0 && scope.row.xszt == '已咨询'
                      ? false
                      : true
                  "
                >
                  <span
                    :class="
                      scope.row.sfpj == 0 && scope.row.xszt == '已咨询'
                        ? 'handleName'
                        : 'handleNone'
                    "
                    >评价</span
                  >
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="取消预约" :visible.sync="qxyyModal" width="20%">
      <span>确认取消预约？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qxyyCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="qxyyConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="评价" :visible.sync="pingjiaModal" width="50%">
      <div style="padding: 10px">
        <span style="font-weight: 600">评分 </span>
        <el-radio-group v-model="pf">
          <el-radio label="1" size="large">1分</el-radio>
          <el-radio label="2" size="large">2分</el-radio>
          <el-radio label="3" size="large">3分</el-radio>
          <el-radio label="4" size="large">4分</el-radio>
          <el-radio label="5" size="large">5分</el-radio>
          <el-radio label="6" size="large">6分</el-radio>
          <el-radio label="7" size="large">7分</el-radio>
          <el-radio label="8" size="large">8分</el-radio>
          <el-radio label="9" size="large">9分</el-radio>
          <el-radio label="10" size="large">10分</el-radio>
        </el-radio-group>
      </div>
      <div style="padding: 10px">
        <div style="font-weight: 600; margin-bottom: 10px">评价意见</div>
        <el-input v-model="pjyj" type="textarea" :rows="3" maxlength="500" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pjCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="pjConfirm"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import {
  queryXsBookList,
  xsCancelBook,
  xsEvaluate,
} from "@/api/career/bookStu";
export default {
  data() {
    return {
      qxyyModal: false,
      pingjiaModal: false,
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      ztStatus: [],
      val: [],
      basicInfo: {},
      xh: "",
      pf: "",
      pjyj: "",
      yyid: "",
    };
  },
  mounted() {
    this.xh = this.$store.getters.userId;
    this.query();
  },

  methods: {
    pingjia(row) {
      this.pingjiaModal = true;
      this.yyid = row.id;
    },
    //提交评价
    pjConfirm() {
      let data = {
        pf: this.pf,
        pjyj: this.pjyj,
        yyid: this.yyid,
      };
      if (!this.pf) {
        this.$message.error("请选择评分分数！");
      } else {
        xsEvaluate(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("评价成功");
            this.query();
            this.pingjiaModal = false;
          } else {
            this.$message.error("评价失败");
          }
        });
      }
    },
    pjCancel() {
      this.pingjiaModal = false;
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
    qxyyCancel() {
      this.qxyyModal = false;
    },
    qxyyConfirm() {
      xsCancelBook({ id: this.yyid }).then((res) => {
        this.$message.success("取消预约成功");
        this.query();
        this.qxyyModal = false;
      });
    },
    qxyy(row) {
      this.qxyyModal = true;
      this.yyid = row.id;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val;
    },
    query() {
      queryXsBookList({ xh: this.xh }).then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
.handleName {
  font-weight: 400;
  font-size: 14px;
  color: #005657;
  line-height: 28px;
}
.handleNone {
  font-weight: 400;
  font-size: 14px;
  color: #cce0e1ff;
  line-height: 28px;
}
</style>
