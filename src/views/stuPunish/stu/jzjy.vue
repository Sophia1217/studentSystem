<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">矫正教育</span>
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderLight" @click="jzjy()">
            <i class="icon tjIcon"></i><span class="title2">矫正教育</span>
          </div> -->
          <!-- <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">解除</span>
          </div>

          <div class="btns borderLight" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">申诉</span>
          </div> -->
          <!-- <div class="btns borderLight" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">确认</span>
          </div> -->
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
            prop="wjssmsXgbfzr"
            label="违纪事实描述"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="cfdjmmc"
            label="处分等级"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="cfqxStart" label="指派岗位"> </el-table-column>
          <el-table-column prop="cfqxEnd" label="已修/应修时长">
          </el-table-column>
          <el-table-column prop="jzjyztmc" label="已读/应谈话次数">
          </el-table-column>

          <el-table-column prop="cfztmmc" label="最早可结束时间" />
          <el-table-column prop="zt" label="状态"> </el-table-column>

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
              <el-button type="text" size="small" @click="showJD(scope.row)">
                <i class="scopeIncon Edit"></i>
                <span style="margin-left: 5px">鉴定</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams.totalCount > 0"
          :total="queryParams.totalCount"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="query"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { wjcfDetail } from "@/api/stuPunish/nichufen";
import { queryJdList } from "@/api/stuPunish/stu";
export default {
  data() {
    return {
      AUTHFLAG: false,
      len: 0,
      jzjyModal: false,
      submitModal: false,
      detailModal: false,
      delModal: false,

      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      tableDataDetail: [],
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      formDetails: {},
      basicInfo: {},
      xnOptions: [],
      fzform: {
        fzxn: "",
        gwTime: [],
      },

      xh: this.$store.getters.userId,
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;

    this.query();
  },

  methods: {
    showDetail(row) {},
    showJD(row) {
      this.$router.push({
        path: "/stuPunishdetail",
      });
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
      this.tjArr = val.map((item) => item.id);
    },

    query() {
      queryJdList(this.queryParams).then((res) => {
        this.tableDate = res.data;
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
</style>
