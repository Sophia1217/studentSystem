<template>
  <div class="themework">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="请输入..."
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            @change="selectChange"
            placeholder="查询条件"
          >
            <el-option label="教育主题" value="1" />
            <el-option label="关键词" value="2" />
            <el-option label="教育对象" value="3" />
            <el-option label="记录人" value="4" />
            <el-option label="工号" value="5" />
            <el-option label="开展地点" value="6" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="searchClick"
            >查询</el-button
          >
        </el-input>

        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多选择 -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">学院 ：</el-col>
          <el-col :span="20">
            <el-select
              v-model="workPlace"
              placeholder="请选择"
              collapse-tags
              multiple
              @change="workPlaceChange"
            >
              <el-option
                v-for="(item, index) in gzdwOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">活动时间 ：</el-col>

          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                type="daterange"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">专兼职类型：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="status"
                @training="handleCheckAllStatusChange"
                @checkedTraining="handleCheckedStatusChange"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">主题教育列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div
            class="btns borderLight"
            @click="handleRemoveDialog"
            v-if="
              this.$store.getters.roleId == '06' ||
              this.$store.getters.roleId == '01'
            "
          >
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div
            class="btns borderGreen"
            v-if="
              this.$store.getters.roleId == '06' ||
              this.$store.getters.roleId == '01'
            "
            @click="handleAdd"
          >
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="basicInfoList"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="jyzt" label="教育主题" sortable />
          <el-table-column prop="gjc" label="关键词" sortable="custom" />
          <el-table-column prop="jydx" label="教育对象" sortable="custom" />
          <el-table-column prop="ssdwmc" label="学院" sortable="custom" />
          <el-table-column prop="hdksrq" label="活动时间" sortable="custom" />
          <el-table-column prop="hddd" label="开展地点" sortable="custom" />
          <el-table-column prop="jlrxm" label="记录人" sortable="custom" />
          <el-table-column prop="jlrgh" label="工号" sortable="custom" />
          <el-table-column prop="jlrlx" label="类型" sortable="custom" />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">教育详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>

    <!-- 导出确认对话框 -->
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除确认对话框 -->
    <el-dialog :title="title" :visible.sync="showRemove" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel2">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleRemove"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getThemeEduList,
  seeDetail,
  delDetail,
  outThemeEdu,
} from "@/api/assistantWork/themeEdu";
import CheckboxCom from "../../components/checkboxCom";
import { getGzdw } from "@/api/politicalWork/assistantappoint";
import { getCollege } from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口
export default {
  name: "themework",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 批量免去确定框弹出
      showRemove: false,
      // 详情框显示
      showExport: false,

      // // 查询参数
      datePicker: "",
      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      nameOptions: [],
      workPlace: [],
      status: {
        // 专兼职
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: "1" },
          { mc: "专职", dm: "0" },
        ],
        isIndeterminate: true,
      },

      basicInfoList: [],
      tableData: [],
      gzdwOptions: [],
      multipleSelection: [],

      queryParams: {
        pageNum: 1,
        pageSize: 10,
        gjc: "",
        hddd: "",
        hdksrq: "",
        jlrgh: "",
        jlrlxList: [],
        jlrxm: "",
        jydx: "",
        jyzt: "",
        orderPx: "",
        orderZd: "",
        ssdwdmList: [],
        ssdwmc: "",
        hdksrq: "",
        hdsjEnd: "",
        hdsjStsrt: "",
        ids: [],
      },
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList();

    this.getOption();
  },
  activated() {
    this.getList();
  },

  methods: {
    //获取数据列表
    getList() {
      // console.log(this.select, "select");

      getThemeEduList(this.queryParams)
        .then((response) => {
          if (response.errcode == "00") {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    // 搜索查询按钮
    searchClick() {
      let csrqs,
        csrqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        csrqs = this.datePicker[0];
        csrqe = this.datePicker[1];
      }
      this.queryParams.pageNum = 1;
      this.queryParams.jyzt = this.select == "1" ? this.searchVal : "";
      this.queryParams.gjc = this.select == "2" ? this.searchVal : "";
      this.queryParams.jydx = this.select == "3" ? this.searchVal : "";
      this.queryParams.jlrxm = this.select == "4" ? this.searchVal : "";
      this.queryParams.jlrgh = this.select == "5" ? this.searchVal : "";
      this.queryParams.hddd = this.select == "6" ? this.searchVal : "";
      this.queryParams.jlrlxList = this.status.choose;
      this.queryParams.hdsjStsrt = csrqs;
      this.queryParams.hdsjEnd = csrqe;
      this.queryParams.ssdwdmList = this.workPlace;

      this.getList(this.queryParams);
    },
    //删除记录
    handleRemove() {
      this.showRemove = false;
      let idlist = [];

      if (this.multipleSelection.length > 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idlist.push(this.multipleSelection[i].id);
        }
        //console.log(idlist);
        let data = {
          ids: idlist,
        };
        delDetail(data)
          .then((res) => {
            // console.log(res);
            if (res.errcode == "00") {
              this.getList();
            }
          })
          .catch((err) => {
            // this.$message.error(err.errmsg);
          });
      } else {
        this.$message.error("请至少选择一条记录");
      }
    },

    selectChange(val) {
      this.searchVal = "";
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 多选
    handleSelectionChange(val) {
      //console.log("val", val);
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
    },
    //状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;
    },
    //工作单位
    getOption() {
      this.gzdwOptions = [];
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.gzdwOptions = response.data.rows;
        }
      });
    },
    //点击详情
    hadleDetail(row, flag) {
      this.$router.push({
        path: "/assistantWork/detailThemeEdu",
        query: {
          id: row.id,
        },
      });
    },
    //新增按钮
    handleAdd() {
      this.$router.push({
        path: "/assistantWork/addThemeEdu",
        query: {},
      });
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    //
    //
    ///
    ///
    ////
    workPlaceChange() {
      this.queryParams.ssdwdmList = this.workPlace;
    },
    //删除对话框关闭

    dialogCancel2() {
      this.showRemove = false;
    },
    //删除对话框打开
    handleRemoveDialog() {
      this.showRemove = true;
      this.title = "删除";
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;

      var arr = this.list.length > 0 ? this.list.map((item) => item.id) : [];

      let exportParams = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        gjc: this.queryParams.gjc,
        hddd: this.queryParams.hddd,
        hdksrq: this.queryParams.hdksrq,
        jlrgh: this.queryParams.jlrgh,
        jlrlxList: this.queryParams.jlrlxList,
        jlrxm: this.queryParams.jlrxm,
        jydx: this.queryParams.jydx,
        jyzt: this.queryParams.jyzt,
        orderPx: this.queryParams.orderPx,
        orderZd: this.queryParams.orderZd,
        ssdwdmList: this.queryParams.ssdwdmList,
        ssdwmc: this.queryParams.ssdwmc,

        hdsjEnd: this.queryParams.hdsjEnd,
        hdsjStsrt: this.queryParams.hdsjStsrt,
        ids: arr,
      };

      outThemeEdu(exportParams)
        .then((res) => this.downloadFn(res, "主题教育列表导出", "xlsx"))
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.themework {
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
      background: #fff;
      .elSelect {
        width: 110px;
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
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
