<template>
  <div class="basicInfo">
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
            placeholder="请选择查询条件"
          >
            <el-option label="家访学生" value="1" />
            <el-option label="学号" value="2" />
            <el-option label="家访人" value="3" />
            <el-option label="工号" value="4" />
            <el-option label="共同参与人" value="5" />
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
          <el-col :span="20">
            <span>家访形式:</span>
            <el-select
              v-model="homeModel"
              multiple
              placeholder="请选择"
              collapse-tags
              @change="homeModelChange"
            >
              <el-option
                v-for="item in jfxsOps"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>家访时间:</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePicker"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">家校联系</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon orangeIcon" /><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="handleDelete" v-show="AUTHFLAG">
            <i class="icon lightIcon" /><span class="title">删除</span>
          </div>
          <div class="btns fullGreen" @click="handleNew" v-show="AUTHFLAG">
            <i class="icon greenIcon" /><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'data', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="xh" label="学号" 
            min-width="100" 
            :show-overflow-tooltip="true"
            sortable />
          <el-table-column
            prop="xm"
            label="家访学生"
            min-width="100"
            :show-overflow-tooltip="true"
            sortable="custom"
          />
          <el-table-column
            prop="sbrxm"
            label="家访人"
            width="85"
            sortable="custom"
          />
          <el-table-column
            prop="sbrdw"
            label="工作单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="gtcyrxm"
            label="共同参与"
            min-width="100"
            :show-overflow-tooltip="true"
            sortable="custom"
          />
          <el-table-column
            prop="jfxs"
            label="家访形式"
            width="100"
            sortable="custom"
          />
          <el-table-column
            prop="jfdd"
            label="家访地点"
            min-width="120"
            sortable="custom"
          />
          <el-table-column
            prop="jfsj"
            label="家访时间"
            width="100"
            sortable="custom"
          />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">联系详情</span>
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
    <!-- 批量删除对话框 -->
    <el-dialog :title="title" :visible.sync="showDelete" width="30%">
      <template v-for="item in multipleSelection">
        <div :key="item.gh">
          <span>确认删除【{{ item.xh }}】【{{ item.xm }}】的家访记录？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmRecord"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addUser, updateUser } from "@/api/system/user";
import CheckboxCom from "../../components/checkboxCom";
import {
  queryJxlxList,
  excelExport,
  deleteJxlx,
} from "@/api/assistantWork/homeSchool";
import {
  removeMoreAssistant,
  outAssistant,
  getGzdw,
} from "@/api/politicalWork/assistantappoint";
import { read } from "fs";
export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      // 批量删除确定框弹出
      showDelete: false,
      // 详情框显示
      open: false,
      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      homeModel: [],
      rules: {
        ghContent: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
      },
      detailGh: "",
      basicInfoList: [],
      multipleSelection: [],
      showExport: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        jfsj: "",
        jfxsList: [], //家访形式
        hdksrqEnd: "",
        hdksrqStrat: "",
        orderZd: "",
        orderPx: "",
        xm: "",
        xh: "",
        sbrxm: "",
        sbrgh: "",
        gtcyrxm: "",
      },
      list: [],
      datePicker: [], //日期
      jfxsOps: [{ label: "线下走访" }, { label: "线上视频" }],
      exportParams: {}, //导出数据
    };
  },
  computed: {},
  watch: {},
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  mounted() {
    this.getList(this.queryParams);
    // this.getCode("dmxbm");
    // this.getCode("dmpyccm");
    this.getOption();
  },

  methods: {
    //家访形式
    homeModelChange() {
      this.queryParams.jfxsList = this.homeModel;
      // this.getList(this.queryParams);
    },
    //查询条件
    selectChange() {
      this.searchVal = "";
    },
    getOption() {
      this.gzdwOptions = [];
      getGzdw()
        .then((res) => {
          if (res.errcode == "00") {
            this.gzdwOptions = res.data.rows;
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //获取数据列表
    getList() {
      this.queryParams.xm = this.select == 1 ? this.searchVal : "";
      this.queryParams.xh = this.select == 2 ? this.searchVal : "";
      this.queryParams.sbrxm = this.select == 3 ? this.searchVal : "";
      this.queryParams.sbrgh = this.select == 4 ? this.searchVal : "";
      this.queryParams.gtcyrxm = this.select == 5 ? this.searchVal : "";
      queryJxlxList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
          // this.exportParams = this.queryParams;
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    //批量免去对话框关闭
    dialogCancel() {
      this.showDelete = false;
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 列表多选
    handleSelectionChange(val) {
      // console.log("val", val);
      this.multipleSelection = val;
      this.list = [...val]; // 存储已被勾选的数据
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
      let data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        jfsj: this.queryParams.jfsj,
        jfxsList: this.queryParams.jfxsList,
        hdksrqEnd: this.queryParams.hdksrqEnd,
        hdksrqStrat: this.queryParams.hdksrqStrat,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        xm: this.queryParams.xm,
        xh: this.queryParams.xh,
        sbrxm: this.queryParams.sbrxm,
        sbrgh: this.queryParams.sbrgh,
        gtcyrxm: this.queryParams.gtcyrxm,
        ids: arr,
      };
      // let exportParams = this.queryParams;
      // console.log(this.queryParams);
      // this.$set(this.exportParams,"ids",arr)

      excelExport(data)
        .then((res) => {
          // this.excelcount = this.$store.getters.excelcount;
          // if (this.$store.getters.excelcount == 0) {
          //   this.$message.error("baocuo");
          // }
          this.downloadFn(res, "家校联系记录导出", "xlsx");
          if(this.$store.getters.excelcount > 0){
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
    },
    //批量移除
    rmRecord() {
      this.showDelete = false;
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      let data = {
        ids: ids,
      };
      deleteJxlx(data)
        .then((res) => {
          this.$message({
            message: res.errmsg,
            type: "success",
          });
          this.getList();
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
    },
    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantWork/detailHomeSchool",
        query: {
          id: row.id,
        },
      });
    },

    /**批量删除按钮*/
    handleDelete() {
      if (this.multipleSelection.length > 0) {
        this.showDelete = true;
        this.title = "删除";
      } else {
        this.$message({
          message: "请至少选择一名家访学生！",
          type: "warning",
        });
      }
    },
    //新增
    handleNew() {
      this.$router.push({
        path: "/assistantWork/addHomeSchool",
      });
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },

    // 搜索查询按钮
    searchClick() {
      // let name, xuehao, sbrname,sbrgh,gtcy;
      // if (this.select == "1") {
      //   name = this.searchVal;
      //   xuehao = "";
      //   sbrname = "",
      //   sbrgh = "",
      //   gtcy = ""
      // } else if (this.select == "2") {
      //   name = "";
      //   xuehao = this.searchVal;
      //   sbrname = "",
      //   sbrgh = "",
      //   gtcy = ""
      // } else if (this.select == "3") {
      //   name = "";
      //   xuehao = "";
      //   sbrname = this.searchVal
      //   sbrgh = "",
      //   gtcy = ""
      // } else if (this.select == "4") {
      //   name = "";
      //   xuehao = "";
      //   sbrname = "",
      //   sbrgh = this.searchVal
      //   gtcy = ""
      // } else {
      //   name = "";
      //   xuehao = "";
      //   sbrname = "",
      //   sbrgh = "",
      //   gtcy = this.searchVal
      // }
      this.queryParams.pageNum = 1;
      this.queryParams.jfxsList = this.homeModel;
      let rqs,
        rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      this.queryParams.hdksrqStrat = rqs;
      this.queryParams.hdksrqEnd = rqe;

      // this.queryParams.xm = name;
      // this.queryParams.xh = xuehao;
      // this.queryParams.sbrxm = sbrname;
      // this.queryParams.sbrgh = sbrgh;
      // this.queryParams.gtcyrxm = gtcy;
      this.getList(this.queryParams);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
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
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
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
