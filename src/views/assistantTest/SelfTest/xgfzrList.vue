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
            <el-option label="工号" value="1" />
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
          <el-col :span="12">
            <span>工作单位：</span>
            <el-select
              v-model="workPlace"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in gzdwOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select v-model="nj" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item, index) in njOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类<span v-html="'\u3000\u3000'"></span>型：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="category"
                @training="handleCheckAllCategoryChange"
                @checkedTraining="handleCheckedCategoryChange"
              />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="3">所辖培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="pyccOps"
                @training="handleCheckAllpyccChange"
                @checkedTraining="handleCheckedpyccChange"
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
          <span class="title">参与自评列表</span>
          <!-- <i class="Updataicon" /> -->
          <div class="yearOption">
            <el-select
              v-model="ndval"
              @change="ndChange"
              style="width: 80px"
              placeholder=""
            >
              <el-option
                v-for="(item, index) in njOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
            ><span>年度</span>
          </div>
        </div>

        <div class="headerRight">
          <div class="btns borderOrange" @click="Setting">
            <i class="icon setIcon"></i><span class="title">设置</span>
          </div>

          <div class="btns borderLight" @click="Delete">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="Join">
            <i class="icon addIcon"></i><span class="title1">加入</span>
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
            label="所辖培养层次"
            min-width="100"
            sortable="custom"
          />
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
    <el-dialog title="设置" :visible.sync="showSet" width="30%">
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
    </el-dialog>
    <!-- 加入对话框 -->
    <el-dialog title="加入" :visible.sync="showJoin" width="60%">
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
            label="所辖培养层次"
            min-width="100"
            sortable="custom"
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
    </el-dialog>
    <!-- 删除确认对话框 -->
    <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="deleteConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CheckboxCom from "../../components/checkboxCom";
import { lookDetail, getGzdw } from "@/api/politicalWork/assistantappoint";
import {
  queryList,
  queryFdySelfEvaListNew,
  checkFdyList,
  deleteFdyList,
  updateKgsz,
  getKgsz,
  insertKgsz,
} from "@/api/test/fdySelfTest";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege } from "@/api/class/maintenanceClass";
import { getGrade } from "@/api/assistantWork/listen";
export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      title: "",
      // // 总条数
      total: 0,
      total2: 0,
      showSet: false,
      showDelete: false,
      showJoin: false,
      sqkfsj: [],
      sfyx: "0",
      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      njOptions: [],
      category: {
        // 类别
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: "1" },
          { mc: "专职", dm: "0" },
        ],
        isIndeterminate: true,
      },
      pyccOps: {
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      workPlace: [],
      nj: [],
      ndval: "2022",
      status: {
        // 状态
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "否", dm: 0 },
          { mc: "是", dm: 1 },
        ],
        isIndeterminate: true,
      },

      Sxpycc: [],
      detailGh: "",
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
        xm: "",
        gh: "",
        nd: "",
        dwhs: [],
        lxs: [],
        njs: [],
        pyccms: [],
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
        nd: "",
        dwhs: [],
        lxs: [],
        njs: [],
        pyccms: [],
      },

      list: [],
      list2: [],
      sqkfsj: [],
      sfyx: "",
      len: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOption();

    this.getCode("dmxbm");
    this.getCode("dmpyccm");
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    Setting() {
      this.showSet = true;
      getKgsz({ nd: this.ndval }).then((res) => {
        this.sfyx = res.data.kgzt;
        this.sqkfsj = [res.data.kfqjks, res.data.kfsjjs];
      });
    },
    setCancel() {
      this.showSet = false;
      this.sqkfsj = [];
      this.sfyx = "1";
    },
    setConfirm() {
      let data = {
        kfqjks: this.sqkfsj[0] ? this.sqkfsj[0] : "",
        kfsjjs: this.sqkfsj[1] ? this.sqkfsj[1] : "",
        kgzt: this.sfyx,

        nd: this.ndval,
      };
      if (data.kfqjks == "") {
        this.$message.error("请选择时间!");
      } else {
        updateKgsz(data).then((res) => {
          this.showSet = false;
          this.sqkfsj = [];
          this.sfyx = "1";
        });
      }
    },
    Delete() {
      this.showDelete = true;
    },
    deleteCancel() {
      this.showDelete = false;
    },
    deleteConfirm() {
      this.showDelete = false;
      let ghlist = [];
      if (this.multipleSelection.length > 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ghlist.push(this.multipleSelection[i].gh);
        }
        let data = {
          ghList: ghlist,
          nd: this.ndval,
        };
        deleteFdyList(data).then((res) => {
          this.getList();
        });
      } else {
        this.$message.error("请至少选择一条记录");
      }
    },
    getNotList() {
      this.queryParams2.nd = this.ndval;
      queryList(this.queryParams2)
        .then((response) => {
          //console.log(response);
          if (response.errcode == "00") {
            this.basicInfoList2 = response.data; // 根据状态码接收数据
            this.total2 = response.totalCount; //总条数
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    Join() {
      this.showJoin = true;
      this.getNotList();
    },
    joinCancel() {
      this.showJoin = false;
      this.queryParams2.xm = "";
    },
    joinConfirm() {
      let ghlist = [];
      if (this.multipleSelection2.length > 0) {
        for (let i = 0; i < this.multipleSelection2.length; i++) {
          ghlist.push(this.multipleSelection2[i].gh);
        }
        let data = {
          ghList: ghlist,
          nd: this.ndval,
        };
        checkFdyList(data).then((res) => {
          this.getList();
          this.showJoin = false;
          this.queryParams2.xm = "";
          this.multipleSelection2 = [];
        });
      } else {
        this.$message.error("请至少选择一条记录");
      }
    },
    ndChange() {
      this.getList();
    },
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
    async getOption() {
      this.gzdwOptions = [];
      this.ssxyOptions = [];
      getGzdw()
        .then((res) => {
          if (res.errcode == "00") {
            this.gzdwOptions = res.data.rows;
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
      await getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOptions = response.data.rows;
          this.ndval = this.njOptions[0];
          insertKgsz({ nd: this.ndval }).then((res) => {});
        }
      });

      this.getList();

      // getCollege().then((response) => {
      //   // 获取培养单位列表数据
      //   if (response.errcode == "00") {
      //     this.ssxyOptions = response.data.rows;
      //   }
      // });
    },
    //获取数据列表
    getList() {
      // console.log(this.select, "select");
      this.queryParams.gh = this.select == 1 ? this.searchVal : "";
      this.queryParams.xm = this.select == 2 ? this.searchVal : "";
      this.queryParams.nd = this.ndval;
      queryFdySelfEvaListNew(this.queryParams)
        .then((response) => {
          //console.log(response);
          if (response.errcode == "00") {
            this.basicInfoList = response.data; // 根据状态码接收数据
            this.total = response.totalCount; //总条数
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },

    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 类别全选
    handleCheckAllCategoryChange(val) {
      const allCheck = [];
      for (const i in this.category.checkBox) {
        allCheck.push(this.category.checkBox[i].dm);
      }
      this.category.choose = val ? allCheck : [];
      this.queryParams.lbList = this.category.choose;
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length;
      this.category.checkAll = checkedCount === this.category.checkBox.length;
      this.category.isIndeterminate =
        checkedCount > 0 && checkedCount < this.category.checkBox.length;
      this.queryParams.lxs = this.category.choose;
    },
    // 性别全选
    handleCheckAllpyccChange(val) {
      const allCheck = [];
      for (const i in this.pyccOps.checkBox) {
        allCheck.push(this.pyccOps.checkBox[i].dm);
      }
      this.pyccOps.choose = val ? allCheck : [];

      this.pyccOps.isIndeterminate = false;

      this.queryParams.pyccms = this.pyccOps.choose;
    },
    // 性别单选
    handleCheckedpyccChange(value) {
      const checkedCount = value.length;
      this.pyccOps.checkAll = checkedCount === this.pyccOps.checkBox.length;
      this.pyccOps.isIndeterminate =
        checkedCount > 0 && checkedCount < this.pyccOps.checkBox.length;

      this.queryParams.pyccms = this.pyccOps.choose;
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
    //状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;

      this.queryParams.sfdbList = this.status.choose;
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;

      this.queryParams.sfdbList = this.status.choose;
    },

    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantTest/fdyselfTest",
        query: {
          gh: row.gh,
          nd: this.ndval,
          isEdit: 0,
        },
      });
    },

    // 搜索查询按钮
    searchClick() {
      this.queryParams.pageNum = 1;
      this.queryParams.dwhs = this.workPlace;
      this.queryParams.lxs = this.category.choose;
      this.queryParams.pyccms = this.pyccOps.choose;
      this.queryParams.sfdbList = this.status.choose;
      this.queryParams.njs = this.nj;
      this.getList(this.queryParams);
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
    // // 打开导出弹窗
    // async handleExport() {
    //   if (this.multipleSelection.length > 0) {
    //     this.len = this.multipleSelection.length;
    //   } else {
    //     let data = {
    //       gh: this.select == 1 ? this.searchVal : "",
    //       xm: this.select == 2 ? this.searchVal : "",
    //       dwmcList: this.workPlace,
    //       genderList: this.pyccOps.choose,
    //       sfdbList: this.status.choose,
    //       lbList: this.category.choose,
    //     };
    //     this.exportParams = data;
    //     await fdyList(data)
    //       .then((res) => {
    //         this.len = res.count;
    //       })
    //       .catch((err) => {});
    //   }
    //   if (this.len > 0) {
    //     this.showExport = true;
    //   } else {
    //     this.$message.warning("当前无数据导出");
    //   }

    //   this.title = "导出";
    // },
    // // 导出取消
    // handleCancel() {
    //   this.showExport = false;
    // },
    // // 导出确认
    // handleConfirm() {
    //   var arr = this.list.length > 0 ? this.list.map((item) => item.gh) : [];

    //   var exportParams = this.queryParams;
    //   exportParams.pageSize = 0;
    //   this.$set(exportParams, "ghList", arr);

    //   outAssistant(exportParams)
    //     .then((res) => this.downloadFn(res, "辅导员任命导出", "xlsx"))
    //     .catch((err) => {});

    //   this.showExport = false;
    // },
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
