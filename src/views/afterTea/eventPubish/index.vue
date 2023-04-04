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
            <el-option label="主题" value="hdzt"></el-option>
            <el-option label="参与人" value="cyrmc"></el-option>
            <el-option label="地点" value="hddd"></el-option>
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
            <span>组织单位：</span>
            <el-select
              v-model="queryParams.zzdw"
              multiple
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
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >类别:</el-col
          >
          <el-col :span="6">
            <el-select
              v-model="queryParams.hdlb"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in lbLsit"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">活动列表</span>
          <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="pj">
            <i class="icon orangeIcon"></i><span class="title">发起评价</span>
          </div>
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="delList">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns fullGreen" @click="add">
            <i class="icon passIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="hdzt"
            label="主题"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="zzdwmc"
            label="组织单位"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="cyrmc"
            label="参与人"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="hdsj"
            label="时间"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="hddd"
            label="地点"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="hdlb" label="类别"> </el-table-column>
          <el-table-column prop="dgjsktgrs" label="可通过人数">
          </el-table-column>
          <el-table-column label="申请开关" fixed="right">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.sqkg"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                active-value="1"
                inactive-value="2"
                @change="alterjxwh(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="mx(scope.row)"
                v-if="scope.row.pjkg == '1'"
              >
                <span class="handleName" style="margin-left: 10px"
                  >已评价明细</span
                >
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="mx(scope.row)"
                v-if="scope.row.pjkg == '2'"
              >
                <span class="handleName" style="margin-left: 10px"
                  >未评价明细</span
                >
              </el-button>
            </template>
          </el-table-column>
          >
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
    <el-dialog
      title="导出提示"
      :visible.sync="showExport"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="评价"
      :visible.sync="pjModal"
      width="50%"
      :close-on-click-modal="false"
    >
      <template>
        <el-table :data="pjDate" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column prop="xm" label="姓名" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="hdpf"
            label="评分"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="hdpjnr"
            label="评价"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams1.total > 0"
          :total="queryParams1.total"
          :page.sync="queryParams1.pageNum"
          :limit.sync="queryParams1.pageSize"
          @pagination="mx"
        />
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePJ">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryList,
  delList,
  sqkg,
  fqpj,
  pjmxList,
  exp,
} from "@/api/teacherTea/index";
import myMixins from "./mixin";
import { getToken } from "@/utils/auth";
export default {
  mixins: [myMixins],
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
          kkxn: this.moreIform.xn,
        };
      },
    },
  },
  data() {
    return {
      pjModal: false,
      pjDate: [],
      checkedArr: [],
      lctModal: false,
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      exportParams: {},
      tableData: [],
      allXn: [], //学年下拉
      commonParams: [],
      id: "",
      queryParams: {
        zzdw: [],
        hdlb: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      queryParams1: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      multipleSelection: [],
      AUTHFLAG: false,
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getAllCollege();
    this.handleSearch();
  },

  methods: {
    //拒绝
    delList() {
      if (this.checkedArr.length > 0) {
        this.$confirm("即将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            var data = {
              ids: this.checkedArr,
            };
            delList(data).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.handleSearch();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    pj() {
      if (this.checkedArr.length > 0) {
        this.$confirm("即将评价, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        })
          .then(() => {
            var data = {
              ids: this.checkedArr,
              pjkg: 1,
            };
            fqpj(data).then((res) => {
              this.$message({
                type: "success",
                message: "评价成功!",
              });
              this.handleSearch();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消评价",
            });
          });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    alterjxwh(row) {
      // 开关 1打开，2关闭
      var data = {
        id: row.id,
        sqkg: row.sqkg,
      };
      sqkg(data).then((res) => {
        this.$message.success("更新成功");
      });
      this.handleSearch();
    },
    mx(row) {
      if (this.id == "") {
        this.id = row.id;
      }
      var data = {
        hdId: row.id || this.id,
        ...this.queryParams1,
      };
      pjmxList(data).then((res) => {
        this.pjDate = res.data;
        this.pjModal = true;
        this.queryParams1.total = res.totalCount;
      });
    },
    closePJ() {
      this.pjModal = !this.pjModal;
    },
    hadleDetail2(row) {
      this.$router.push({
        path: "/afterTea/eventPubishDetail",
        query: {
          allInfo: row,
          lgnSn: row.id,
        },
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
      this.$set(this.exportParams, "ids", ids);
      exp(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "活动列表导出.xlsx", "xlsx");
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
      var data = {};
      data = {
        hdzt: this.select == "hdzt" ? this.searchVal : null,
        dsh: this.select == "cyrmc" ? this.searchVal : null,
        dsm: this.select == "hddd" ? this.searchVal : null,
        ...this.queryParams,
      };
      this.exportParams = data;
      this.showExport = true;
    },

    add() {
      this.$router.push({
        path: "/afterTeaTeacher/eventPubishAdd",
      });
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

    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        hdzt: this.select == "hdzt" ? this.searchVal : null,
        cyrmc: this.select == "cyrmc" ? this.searchVal : null,
        hddd: this.select == "hddd" ? this.searchVal : null,
        ...this.queryParams,
      };
      queryList(data)
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.checkedArr = this.multipleSelection.map((item) => item.id);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.footerFlex {
  display: flex;
  justify-content: flex-end;
}
.talkRec {
  ::v-deep .grayBg .el-form-item__label {
    background-color: #f0f0f0;
    padding: 5px 10px 5px 0px;
  }
  .grayBg {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0;
  }
  .sqList {
    padding: 5px 0px 5px 10px;
    width: 85%;
  }
  .lct {
    background: url("~@/assets/dangan/lct.png");
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
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
          .passIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
        }
      }
    }
  }
  .borderRed {
    border: 1px solid #e8e8e8;
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
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
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
</style>
