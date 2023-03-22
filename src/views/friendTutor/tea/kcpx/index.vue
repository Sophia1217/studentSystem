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
            <el-option label="课程主题" value="kczt"></el-option>
            <el-option label="朋辈导师学号" value="dsh"></el-option>
            <el-option label="朋辈导师姓名" value="dsm"></el-option>
            <el-option label="开课地点" value="kkdd"></el-option>
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
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwh"
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
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >类别:</el-col
          >
          <el-col :span="6">
            <el-select
              v-model="queryParams.lb"
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in moreIform.lbLsit"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >课程次数:</el-col
          >
          <el-col :span="6">
            <el-input-number
              v-model="queryParams.kkcs"
              :min="1"
              :controls="false"
              placeholder="请输入内容"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >可接纳人数:
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="queryParams.kjnrs"
              :min="1"
              :controls="false"
              placeholder="请输入内容"
            ></el-input-number>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">课程排课列表</span>
          <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            placeholder="请选择"
            @change="handleSearch"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allnd"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <span>年度</span>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :data="fileData"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
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
          <el-table-column prop="kczt" label="课程主题" width="100">
          </el-table-column>
          <el-table-column prop="lb" label="类别" width="85"> </el-table-column>
          <el-table-column
            prop="ds"
            label="朋辈导师"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="kkrq"
            label="开课日期"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="kksj" label="开课时间"> </el-table-column>
          >
          <el-table-column prop="kkcs" label="次数"> </el-table-column>
          >
          <el-table-column prop="kksc" label="课程时长（分钟）">
            <template slot-scope="scope">
              <el-input-number
                :min="1"
                controls-position="right"
                style="width: 120px"
                v-model="scope.row.kksc"
                @change="alterjxwh(scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          >
          <el-table-column prop="kjnrs" label="可接纳人数）"> </el-table-column>
          >
          <el-table-column prop="kkdd" label="开课地点"> </el-table-column>
          >
          <el-table-column prop="kkdd" label="课程开关" fixed="right">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.kckg"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                active-value="0"
                inactive-value="1"
                @change="alterjxwh(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          >
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
            </template>
          </el-table-column>
          >
        </el-table>
      </div>
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
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
  kcpkList,
  kcpkMbDown,
  kcpkExport,
  delList,
  upList,
} from "@/api/kcpk/index";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getCollege } from "@/api/class/maintenanceClass";
import { getToken } from "@/utils/auth";
export default {
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
    fileData: {
      get() {
        return {
          kkxn: this.moreIform.xn,
        };
      },
    },
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswPbfdKcb/importPkjh",
      lctModal: false,
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        lbLsit: [
          {
            dm: "0",
            mc: "院级",
          },
          { dm: "1", mc: "校级" },
        ],
        dwh: [], // 学院下拉框
        bjm: [],
        xn: "",
        zydm: [],
      },
      exportParams: {},
      tableData: [],
      allDwh: [],
      bjOps: [], // 班级下拉
      allnd: [], //学年下拉
      commonParams: [],
      queryParams: {
        lb: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
        // 金额
        orderZd: "",
        orderPx: "",
        kjnrs: "",
        kkcs: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      AUTHFLAG: false,
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getAllCollege();
    this.getSchoolYears();
  },

  methods: {
    hadleDetail2() {
      this.$router.push({
        path: "/friendTutor/kcpkDeatil",
      });
    },
    alterjxwh(row) {
      // kckg 课程开关 0打开，1关闭
      // kksc
      var data = {
        id: row.id,
        kckg: row.kckg,
        kksc: row.kksc,
      };
      upList(data).then((res) => {
        this.$message.success("更新成功");
      });
      this.handleSearch();
    },
    //拒绝
    delList() {
      var delArr = this.multipleSelection.map((item) => item.id);
      if (delArr.length > 0) {
        this.$confirm("即将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delList(delArr).then((res) => {
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
    mbDown() {
      kcpkMbDown().then((res) => {
        this.downloadFn(res, "课程安排模板下载", "xlsx");
        this.$message.success("操作成功");
      });
    },
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.handleSearch();
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          console.log("res", res);
          this.allXn = res.data;
          this.moreIform.xn = res.data[0].mc;
          this.handleSearch();
        })
        .catch((err) => {});
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let idList = [];
      for (let item_row of this.multipleSelection) {
        idList.push(item_row.id);
      }
      this.$set(this.exportParams, "idList", idList);
      kcpkExport(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "课程排课列表导出.xlsx", "xlsx");
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
        kkxn: this.moreIform.xn,
        kczt: this.select == "kczt" ? this.searchVal : null,
        dsh: this.select == "dsh" ? this.searchVal : null,
        dsm: this.select == "dsm" ? this.searchVal : null,
        kkdd: this.select == "kkdd" ? this.searchVal : null,
        ...this.queryParams,
      };
      this.exportParams = data;
      this.showExport = true;
    },

    add() {
      this.$router.push({
        path: "/friendTutor/kcpkAdd",
        query: {
          xn: this.moreIform.xn,
        },
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
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        kkxn: this.moreIform.xn,
        kczt: this.select == "kczt" ? this.searchVal : null,
        dsh: this.select == "dsh" ? this.searchVal : null,
        dsm: this.select == "dsm" ? this.searchVal : null,
        kkdd: this.select == "kkdd" ? this.searchVal : null,
        ...this.queryParams,
      };
      kcpkList(data)
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
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
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
