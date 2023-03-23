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
            <el-option label="学号" value="1" />
            <el-option label="姓名" value="2" />
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
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjm"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in bjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>专<span v-html="'\u3000\u3000'"></span>业：</span>
            <el-select
              v-model="moreIform.zydmList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in zyOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5">学业预警类型：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.yjlx"
                multiple
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in yjlxOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">挂科列表</span>
          <!-- <i class="Updataicon" /> -->
          <div class="yearOption">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon outIcon"></i><span class="title">导出</span>
          </div>
          <!-- <div class="btns borderOrange" @click="Setting" v-show="AUTHFLAG">
            <i class="icon setIcon"></i><span class="title">设置</span>
          </div>

          <div class="btns borderLight" @click="Delete" v-show="AUTHFLAG">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="Join" v-show="AUTHFLAG">
            <i class="icon addIcon"></i><span class="title1">加入</span>
          </div> -->
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
          <el-table-column prop="xh" label="学号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />

          <el-table-column
            prop="ssdwdmmc"
            label="培养单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column
            prop="zydmmc"
            label="专业"
            :min-width="120"
            :show-overflow-tooltip="true"
            sortable="custom"
          />
          <el-table-column
            prop="bjdmmc"
            label="班级"
            min-width="100"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="xbmmc" label="性别" sortable="custom" />
          <el-table-column prop="needxf" label="应修学分" sortable="custom" />
          <el-table-column prop="getxf" label="实得学分" sortable="custom" />
          <el-table-column prop="gks" label="挂科数量" sortable="custom" />
          <el-table-column prop="yjdj" label="学籍处理类型" sortable="custom" />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
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

    <!-- 设置对话框 -->
    <!-- <el-dialog title="设置" :visible.sync="showSet" width="30%">
      <div class="form">
        <el-form label-width="100px">
          <el-form-item label="开放时间">
            <el-date-picker
              v-model="sqkfsj"
              type="datetimerange"
              range-separator="至"
              start-placeholder="起始年月日"
              end-placeholder="结束年月日"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              :disabled="sfyx == '0' ? false : true"
              :clearable="false"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开关">
            <el-switch
              v-model="sfyx"
              active-color="#23AD6F"
              inactive-color="#E0E0E0"
              active-value="0"
              inactive-value="1"
            ></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="setConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 加入对话框 -->
    <!-- <el-dialog title="加入" :visible.sync="showJoin" width="60%">
      <div class="searchName">
        <el-form>
          <el-form-item label="姓名">
            <el-input
              v-model="queryParams2.xm"
              placeholder="请输入..."
              class="inputSelect"
            >
              <el-button
                slot="append"
                class="searchButton"
                icon="el-icon-search"
                @click="getNotList"
                >查询</el-button
              >
            </el-input>
          </el-form-item></el-form
        >
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList2"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange2"
          @sort-change="changeTableSort2"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="lx" label="类型" sortable="custom" />

          <el-table-column
            prop="dwmc"
            label="工作单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column prop="ssnj" label="年级" sortable="custom" />
          <el-table-column
            prop="pycc"
            label="所带培养层次"
            min-width="100"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <pagination
          v-show="total2 > 0"
          class="pagination2"
          :total="total2"
          :page.sync="queryParams2.pageNum"
          :limit.sync="queryParams2.pageSize"
          @pagination="getNotList"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="joinConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 删除确认对话框 -->
    <!-- <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="deleteConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <el-dialog title="导出确认" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="daochu()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { excelExportGkyjList, queryRcxwyjGkyjList } from "@/api/studyWarn/gk";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ, getZY } from "@/api/student/index";
export default {
  name: "BasicInfo",

  props: [],
  data() {
    return {
      AUTHFLAG: false,
      title: "",
      // // 总条数
      total: 0,
      total2: 0,
      showSet: false,
      showDelete: false,
      showJoin: false,
      showExport: false,
      sqkfsj: [],
      zyOps: [],
      bjOps: [],
      allDwh: [],
      options: [],
      sfyx: "0",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        zydmList: [],
        yjlx: [],
      },
      yjlxOps: [
        { dm: "黄色预警", mc: "黄色预警" },
        { dm: "橙色预警", mc: "橙色预警" },
        { dm: "红色预警", mc: "红色预警" },
      ],
      basicInfoList: [],
      basicInfoList2: [],
      tableData: [],
      multipleSelection: [],
      multipleSelection2: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",

        xnList: [],
        xqmList: [],
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xm: "",
        xh: "",

        dwhs: [],
        lxs: [],
        njs: [],
        pyccms: "",
      },

      list: [],
      list2: [],
      sqkfsj: [],
      sfyx: "",
      len: 0,
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  mounted() {
    this.getAllCollege();
    this.getXnxq();
  },

  methods: {
    // Setting() {
    //   this.showSet = true;
    //   getKgsz({ nd: this.ndval }).then((res) => {
    //     this.sfyx = res.data.kgzt;
    //     this.sqkfsj = [res.data.kfqjks, res.data.kfsjjs];
    //   });
    // },
    // setCancel() {
    //   this.showSet = false;
    //   this.sqkfsj = [];
    //   this.sfyx = "1";
    // },
    // setConfirm() {
    //   let data = {
    //     kfqjks: this.sqkfsj[0] ? this.sqkfsj[0] : "",
    //     kfsjjs: this.sqkfsj[1] ? this.sqkfsj[1] : "",
    //     kgzt: this.sfyx,

    //     nd: this.ndval,
    //   };
    //   if (data.kfqjks == "") {
    //     this.$message.error("请选择时间!");
    //   } else {
    //     updateKgsz(data).then((res) => {
    //       this.showSet = false;
    //       this.sqkfsj = [];
    //       this.sfyx = "1";
    //     });
    //   }
    // },
    // Delete() {
    //   this.showDelete = true;
    // },
    // deleteCancel() {
    //   this.showDelete = false;
    // },
    // deleteConfirm() {
    //   this.showDelete = false;
    //   let ghlist = [];
    //   if (this.multipleSelection.length > 0) {
    //     for (let i = 0; i < this.multipleSelection.length; i++) {
    //       ghlist.push(this.multipleSelection[i].gh);
    //     }
    //     let data = {
    //       ghList: ghlist,
    //       nd: this.ndval,
    //     };
    //     deleteFdyList(data).then((res) => {
    //       this.getList();
    //     });
    //   } else {
    //     this.$message.error("请至少选择一条记录");
    //   }
    // },
    // getNotList() {
    //   this.queryParams2.nd = this.ndval;
    //   queryList(this.queryParams2)
    //     .then((response) => {
    //       //console.log(response);
    //       if (response.errcode == "00") {
    //         this.basicInfoList2 = response.data; // 根据状态码接收数据
    //         this.total2 = response.totalCount; //总条数
    //       }
    //     })
    //     .catch((err) => {
    //       // this.$message.error(err.errmsg);
    //     });
    // },
    // Join() {
    //   this.showJoin = true;
    //   this.getNotList();
    // },
    // joinCancel() {
    //   this.showJoin = false;
    //   this.queryParams2.xm = "";
    // },
    // joinConfirm() {
    //   let ghlist = [];
    //   if (this.multipleSelection2.length > 0) {
    //     for (let i = 0; i < this.multipleSelection2.length; i++) {
    //       ghlist.push(this.multipleSelection2[i].gh);
    //     }
    //     let data = {
    //       ghList: ghlist,
    //       nd: this.ndval,
    //     };
    //     checkFdyList(data).then((res) => {
    //       this.getList();
    //       this.showJoin = false;
    //       this.queryParams2.xm = "";
    //       this.multipleSelection2 = [];
    //     });
    //   } else {
    //     this.$message.error("请至少选择一条记录");
    //   }
    // },
    selectChange(val) {
      this.searchVal = "";
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.Sxpycc = res.data;
              this.$set(this.pyccOps, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getBJ(val);
      this.getZY(val);
    },
    // 学院找专业
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
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
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.list2 = [...val]; // 存储已被勾选的数据
    },

    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantTest/fdyselfTest",
        query: {},
      });
    },
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }

        this.queryParams.xm = this.select == "2" ? this.searchVal : "";
        this.queryParams.xh = this.select == "1" ? this.searchVal : "";

        this.queryParams.xnList.push(this.dqXnxq[0]);

        this.queryParams.xqmList.push(this.dqXnxq[1]);
        queryRcxwyjGkyjList(this.queryParams)
          .then((response) => {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
          })
          .catch((err) => {});
      });
    },
    handleChangeXnxq() {
      this.queryParams.xnList = [];
      this.queryParams.xqmList = [];
      if (this.dqXnxq[0]) {
        this.queryParams.xnList.push(this.dqXnxq[0]);
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqmList.push(this.dqXnxq[1]);
      }
      this.searchClick();
    },
    getList() {
      let data = {
        xm: this.select == "2" ? this.searchVal : "",
        xh: this.select == "1" ? this.searchVal : "",
        yjdj: this.moreIform.yjlx,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        xbm: [],
        xnList: this.queryParams.xnList,
        xqmList: this.queryParams.xqmList,
        zydm: this.moreIform.zydmList,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
      };

      queryRcxwyjGkyjList(data)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {});
    },

    // 搜索查询按钮
    searchClick() {
      this.getList();
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.searchClick();
    },
    changeTableSort2(column) {
      this.queryParams2.orderZd = column.prop;
      this.queryParams2.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.getNotList();
    },
    // 打开导出弹窗
    handleExport() {
      var data = {};
      data = {
        xm: this.select == "2" ? this.searchVal : "",
        xh: this.select == "1" ? this.searchVal : "",
        yjdj: this.moreIform.yjlx,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        xbm: [],
        xnList: this.queryParams.xnList,
        xqmList: this.queryParams.xqmList,
        zydm: this.moreIform.zydmList,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        pageSize: this.queryParams.pageSize,
        pageNum: this.queryParams.pageNum,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    daochu() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      this.$set(this.exportParams, "ids", ids);
      excelExportGkyjList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "挂科预警列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
      this.showExport = false;
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
        display: flex;
        flex-direction: row;
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        // .Updataicon {
        //   display: inline-block;
        //   vertical-align: middle;
        //   margin-left: 10px;
        //   width: 20px;
        //   height: 20px;
        //   background: url("~@/assets/images/updata.png") no-repeat;
        // }
        .yearOption {
          margin-left: 10px;
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

          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .addIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .setIcon {
            margin-top: 10px;
            background: url("~@/assets/images/set.png") no-repeat;
          }
          .outIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
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
.pagination2 {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.searchName {
  .inputSelect {
    width: 50%;
  }
}
</style>
