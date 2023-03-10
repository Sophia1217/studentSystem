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
            <el-option label="岗位名称" value="gwMainMc"></el-option>
            <el-option label="岗位" value="gwDetailMc"></el-option>
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
        <!-- <el-row :gutter="20" class="mt15">
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
        </el-row> -->
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">勤工助学岗位列表</span>
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
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderOrange" @click="copy" v-show="AUTHFLAG">
            <i class="icon copyIcon"></i><span class="title2">复制岗位</span>
          </div>
          <div class="btns borderLight" @click="showDel" v-show="AUTHFLAG">
            <i class="icon lightIcon"></i><span class="title">删除岗位</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng" v-show="AUTHFLAG">
            <i class="icon greenIcon"></i><span class="title1">新增岗位</span>
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
            prop="gwYrbmc"
            label="用人部门"
            sortable="custom"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="gwMainMc"
            label="岗位名称"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="gwDetailMc"
            label="岗位"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="gwTypeMc" label="岗位性质" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwNzxsrs" label="需求人数" sortable="custom">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.gwNzxsrs"
                maxlength="9"
                oninput="this.value=this.value.replace(/[^\d]/g,'')"
                placeholder="请输入数字"
                controls-position="right"
                @change="changeRS(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="zgrs" label="在岗人数" sortable="custom">
          </el-table-column>
          <el-table-column prop="tgrs" label="退岗人数" sortable="custom">
          </el-table-column>
          <el-table-column prop="qzsj" label="岗位起止时间" sortable="custom">
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
    <el-dialog
      title="复制"
      :visible.sync="copyModal"
      width="30%"
      @close="empty()"
    >
      <template>
        <el-form :model="fzform" ref="fzform" size="small" :rules="rules">
          <div>
            <span>已选择{{ len }}条记录</span>
            <el-form-item prop="fzxn" label="复制后应用学年">
              <el-select
                v-model="fzform.fzxn"
                style="width: 130px; margin: 0 15px 0"
              >
                <el-option
                  v-for="(item, index) in xnOptions"
                  :key="index"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位起止时间" prop="gwTime" label-width="120px"
              ><el-date-picker
                type="daterange"
                v-model="fzform.gwTime"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </div>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="copyCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="copyConfirm"
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
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { deleteQgzxGw, copyQgzxGw } from "@/api/dailyBehavior/thriftbumen";
import {
  queryQgzxGwList,
  updateNzxsrs,
  exportGwwhList,
} from "@/api/thrift/gwMaintain";
export default {
  components: { lctCom },
  data() {
    return {
      AUTHFLAG: false,
      len: 0,
      delModal: false,
      copyModal: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      xnOptions: [],
      fzform: {
        fzxn: "",
        gwTime: [],
      },
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        status: [], // 学院下拉框
      },
      showExport: false,
      rules: {
        gwTime: [
          { required: true, message: "起止时间不能为空", trigger: "blur" },
        ],
        fzxn: [
          { required: true, message: "复制学年不能为空", trigger: "blur" },
        ],
      },
      xn: "",
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getSchoolYears();
    this.getCode("dmsplcm"); //状态
  },

  methods: {
    empty() {
      this.$nextTick(() => {
        this.$refs.fzform.resetFields();
      });
    },
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
      this.$router.push({
        path: "/Thrift/post/postMaintainDetail",
        query: { id: row.id, status: row.status, gwId: row.id },
      });
    },
    copy() {
      if (this.multipleSelection.length > 0) {
        this.len = this.multipleSelection.length || "";
        this.copyModal = true;
      } else {
        this.$message.error("请先勾选数据！");
      }
    },
    changeXn() {
      this.query();
    },
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.fzform.validate((valid) => {
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
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      deleteQgzxGw({ ids: this.delArr, ymLy: "1" }).then((res) => {
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
      this.tjArr = val.map((item) => item.id);
    },
    copyCancel() {
      this.copyModal = false;
    },
    copyConfirm() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          ymLy: "1",
          ids: this.delArr,
          xn: this.fzform.fzxn,
          gwStartDate: this.fzform.gwTime[0] || "",
          gwEndDate: this.fzform.gwTime[1] || "",
        };
        console.log(this.delArr);
        copyQgzxGw(data).then((res) => {
          this.$message.success("复制成功！");
          this.query();
          this.copyModal = false;
        });
      }
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    query() {
      var data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
        // status: this.moreIform.status,
        xn: this.xn,
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : null,
        gwDetailMc: this.select == "gwDetailMc" ? this.searchVal : null,
      };
      queryQgzxGwList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.$router.push({
        path: "/Thrift/post/postApplyAdd",
        query: {
          ymLy: "1", //岗位维护新增
        },
      });
    },
    changeRS(row) {
      updateNzxsrs({ id: row.id, gwNzxsrs: row.gwNzxsrs }).then((res) => {
        this.$message.success("操作成功");
        this.query();
      });
    },
    expor() {
      this.showExport = true;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let data = {
        xn: this.xn,
        ids: this.delArr,

        pageNum: 0,
        pageSize: 0,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      exportGwwhList(data)
        .then((res) => {
          this.downloadFn(res, "勤工助学岗位维护列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
          this.showExport = false;
        })
        .catch((err) => {});
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
        background: url("../../../../assets/images/updata.png") no-repeat;
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
        .copyIcon {
          margin-top: 10px;
          background: url("~@/assets/images/copy.png") no-repeat;
        }
      }
    }
  }
}
</style>
