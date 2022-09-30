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
            <el-option label="走访主题" value="1" />
            <el-option label="走访人" value="2" />
            <el-option label="工号" value="3" />
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
          <el-col :span="3">走访宿舍 ：</el-col>
          <el-col :span="20">
            <el-select
              v-model="dormitory"
              multiple
              placeholder="请选择"
              collapse-tags
              @change="dormitoryChange"
            >
              <el-option
                v-for="(item, index) in zfssOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">工作单位 ：</el-col>
          <el-col :span="20">
            <el-select
              v-model="workPlace"
              multiple
              placeholder="请选择"
              collapse-tags
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
          <el-col :span="3">走访时间 ：</el-col>

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
          <span class="title">走访记录</span> <i class="Updataicon" />
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderLight" @click="handleRemoveDialog">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="handleAdd">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="zfss" label="走访宿舍" sortable />
          <el-table-column prop="zfzt" label="走访主题" sortable="custom" />
          <el-table-column prop="xm" label="走访人" sortable="custom" />
          <el-table-column prop="gh" label="工号" sortable="custom" />
          <el-table-column prop="dwmc" label="工作单位" sortable="custom" />
          <el-table-column prop="fdylx" label="类型" sortable="custom" />
          <el-table-column prop="zfrq" label="走访日期" sortable="custom" />

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">走访详情</span>
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
  getDormitoryVisitList,
  delDetail,
  seeDetail,
  outDormitory,
  queryRelatedLd,
} from "@/api/assistantWork/dormitory";
import CheckboxCom from "../../components/checkboxCom";

import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  name: "dormitory",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 删除确定框弹出
      showRemove: false,
      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      zfssOptions: [],
      datePicker: "",
      workPlace: [],
      dormitory: [],
      status: {
        // 状态
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
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dwhList: [],
        dwmcList: [],
        fdylxList: [],
        idList: [],
        roleId: this.$store.getters.roleId,
        userId: this.$store.getters.userId,
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
        zflyList: [],
        zfzt: "",
        zfrq: "",
        zfrqEnd: "",
        zfrqStart: "",
      },
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList();
    // this.getCode("dmxbm");
    // this.getCode("dmpyccm");
    this.getOption();
  },
  activated() {
    this.getList();
  },

  methods: {
    //点击详情
    hadleDetail(row, flag) {
      this.$router.push({
        path: "/assistantWork/detailDormitory",
        query: { id: row.id },
      });
    },

    //删除记录
    handleRemove() {
      this.showRemove = false;

      let idlist = [];
      if (this.multipleSelection.length > 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idlist.push(this.multipleSelection[i].id);
        }
        let data = {
          idList: idlist,
        };
        delDetail(data).then((res) => {
          this.getList();
        });

        // console.log(res);
      } else {
        this.$message.error("请至少选择一条记录");
      }
    },
    //工作地点勾选
    workPlaceChange() {
      this.queryParams.dwhList = this.workPlace;
    },
    selectChange(val) {
      this.searchVal = "";
    },
    getOption() {
      this.gzdwOptions = [];
      this.zfssOptions = [];
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.gzdwOptions = response.data.rows;
        }
      });
      queryRelatedLd().then((response) => {
        // 获取走访宿舍列表数据
        if (response.errcode == "00") {
          this.zfssOptions = response.data;
        }
      });
    },
    //新增按钮
    handleAdd() {
      this.$router.push({
        path: "/assistantWork/addDormitory",
        query: {},
      });
    },
    //获取数据列表
    getList() {
      // console.log(this.select, "select");

      getDormitoryVisitList(this.queryParams)
        .then((response) => {
          //console.log(response);

          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    //查询
    searchClick() {
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      this.queryParams.zfzt = this.select == 1 ? this.searchVal : "";
      this.queryParams.xm = this.select == 2 ? this.searchVal : "";
      this.queryParams.gh = this.select == 3 ? this.searchVal : "";
      this.queryParams.pageNum = 1;
      this.queryParams.fdylxList = this.status.choose;
      this.queryParams.zfrqStart = rqs;
      this.queryParams.zfrqEnd = rqe;
      this.queryParams.dwhList = this.workPlace;
      this.queryParams.zflyList = this.dormitory;
      this.getList(this.queryParams);
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 多选
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
    },
    //类型全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;
    },
    // 类型单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    //
    //
    //
    //
    ///

    dormitoryChange() {
      this.queryParams.zflyList = this.dormitory;
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

        orderPx: this.queryParams.orderPx,
        orderZd: this.queryParams.orderZd,
        dwmcList: this.queryParams.dwmcList,
        fdylxList: this.queryParams.fdylxList,
        idList: arr,
        roleId: this.$store.getters.roleId,
        userId: this.$store.getters.userId,
        xm: this.queryParams.xm,
        gh: this.queryParams.gh,
        zfss: this.queryParams.zfss,
        zfzt: this.queryParams.zfzt,
        zfrq: this.queryParams.zfrq,
      };

      outDormitory(exportParams)
        .then((res) => this.downloadFn(res, "寝室走访列表导出", "xlsx"))
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
