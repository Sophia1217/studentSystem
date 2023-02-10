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
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
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
          <el-col :span="3">培养单位：</el-col>
          <el-col :span="9">
            <el-select
              v-model="queryParams.dwh"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in dwOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">年<span v-html="'\u3000\u3000'"></span>级：</el-col>
          <el-col :span="9">
            <el-select
              v-model="queryParams.nj"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in njOps"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="9">
            <el-select
              v-model="queryParams.pycc"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in pyccOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">认定结果:</el-col>
          <el-col :span="9">
            <div class="checkbox">
              <el-select
                v-model="queryParams.rdjg"
                placeholder="请选择"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in rdjgOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="4">重点保障人群类别:</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="queryParams.zdbzrqlbm"
                placeholder="请选择"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in bzrqlbOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">认定时间:</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                unlink-panels
                type="daterange"
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
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">困难生列表</span>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="xh"
            label="学号"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="xm"
            label="姓名"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="pyccmmc"
            label="培养层次"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="dwhmc"
            label="培养单位"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="nj"
            label="年级"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="zdbzrqlbmc"
            label="重点保障人群类别"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="rdjgmc"
            label="困难认定结果"
            min-width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="rdsj" label="认定时间" min-width="100">
          </el-table-column>
          <el-table-column prop="wrdyy" label="未认定原因" min-width="100">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.wrdyy"
                placeholder="请选择"
                style="width: 150px"
                clearable
                @change="handleUpdata(scope.row)"
                v-show="
                  scope.row.rdjgmc !== '特别困难' &&
                  scope.row.rdjgmc !== '一般困难' &&
                  scope.row.rdjgmc !== '困难'
                "
              >
                <el-option
                  v-for="item in wrdyyOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="fj" label="附件" width="200">
            <template slot-scope="scope">
              <el-upload
                accept=".pdf"
                :auto-upload="true"
                :action="fileUrl"
                :show-file-list="true"
                :file-list="scope.row.fileList"
                :headers="fileHeader"
                :data="fileData"
                :on-success="upLoadSuccess"
                :on-error="upLoadError"
                v-show="
                  scope.row.rdjgmc !== '特别困难' &&
                  scope.row.rdjgmc !== '一般困难' &&
                  scope.row.rdjgmc !== '困难'
                "
              >
                <el-button
                  type="text"
                  size="small"
                  style="color: #005657"
                  @click="scwj(scope.row)"
                  >点击上传</el-button
                >
              </el-upload>
            </template>
          </el-table-column>
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

    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="expBx"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除确认对话框 -->
    <el-dialog :title="title" :visible.sync="showRemove" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleRemove"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import CheckboxCom from "../../../components/checkboxCom";
import { getToken } from "@/utils/auth";
import {
  maintainQuery,
  maintainExp,
  mbDown1,
} from "@/api/assistantWork/baoxian";
import {
  deleteData,
  downLoad,
  excelExport,
  importData,
  queryList,
  update,
} from "@/api/familyDifficulties/ListMainten.js";
export default {
  components: { CheckboxCom },
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
    fileData: {
      get() {
        return {
          pageType: "jtkn",
          roleType: "rcsw",
          businesId: this.businesId,
        };
      },
    },
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswJtknXjmd/import",
      fileUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",

      delArr: [],
      searchVal: "",
      select: "",
      isMore: false,
      showExport: false,
      showRemove: false,
      title: "",
      dateArray: [],
      datePicker: [],
      njOps: [],
      dwOps: [],
      pyccOps: [],
      rdjgOps: [],
      bzrqlbOps: [],
      wrdyyOps: [],
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dwh: [],
        pycc: [],
        nj: [],
        rdjg: "",
        zdbzrqlbm: "",
      },
      businesId: "",
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmkndjm"); //
    this.getCode("dmtsknlbm"); //
    this.getCode("dmwrdyy");
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.dwOps = res.data.rows;
        })
        .catch((err) => {});
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOps = response.data.rows;
        }
      });
    },
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.pyccOps = res.data;
              break;
            case "dmkndjm": //认定结果
              this.rdjgOps = res.data;
              break;
            case "dmtsknlbm":
              this.bzrqlbOps = res.data;
              break;
            case "dmwrdyy":
              this.wrdyyOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    scwj(row) {
      this.businesId = row.id;
      console.log(row);
      console.log(this.fileData);
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
    mbDown() {
      downLoad().then((res) => {
        this.downloadFn(res, "困难生认定模板下载", "xlsx");
      });
    },
    handleExport() {
      this.showExport = true;
      this.title = "导出";
    },
    handleCancel() {
      this.showExport = false;
    },
    handleDel() {
      this.showRemove = true;
    },
    handleRemove() {
      if (this.multipleSelection.length > 0) {
        let idlist = this.multipleSelection.map((item) => item.id);
        deleteData(idlist).then((res) => {
          this.$message.success("删除成功");
          this.showRemove = false;
          this.handleSearch();
        });
      } else {
        this.$message.error("请至少选择一条数据！");
      }
    },
    removeCancel() {
      this.showRemove = false;
    },
    expBx() {
      let data = {
        xh: this.select == "1" ? this.searchVal : null,
        xm: this.select == "2" ? this.searchVal : null,
        dwhList: this.queryParams.dwh,
        endRdsj: this.datePicker ? this.datePicker[1] : null,
        startRdsj: this.datePicker ? this.datePicker[0] : null,
        njList: this.queryParams.nj,
        pyccmList: this.queryParams.pycc,
        rdjg: this.queryParams.rdjg,
        wrdyy: "",
        zdbzrqlbm: this.queryParams.zdbzrqlbm,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        idList: this.delArr,
      };
      excelExport(data).then((res) => {
        this.downloadFn(res, "困难生认定列表下载", "xlsx");
        if (this.$store.getters.excelcount > 0) {
          this.$message.success(
            `已成功导出${this.$store.getters.excelcount}条数据`
          );
        }
        this.handleSearch();
      });

      this.showExport = false;
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xh: this.select == "1" ? this.searchVal : null,
        xm: this.select == "2" ? this.searchVal : null,
        dwhList: this.queryParams.dwh,
        endRdsj: this.datePicker ? this.datePicker[1] : null,
        startRdsj: this.datePicker ? this.datePicker[0] : null,
        njList: this.queryParams.nj,
        pyccmList: this.queryParams.pycc,
        rdjg: this.queryParams.rdjg,
        wrdyy: "",
        zdbzrqlbm: this.queryParams.zdbzrqlbm,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryList(data)
        .then((res) => {
          this.tableData = res.data;
          for (let val of this.tableData) {
            val.fileList = val.fileList.map((ele) => {
              return {
                name: ele.fileName,
                ...ele,
              };
            });
          }
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    //更新
    handleUpdata(row) {
      console.log(row);
      update(row).then((res) => {
        this.$message.success("更新成功！");
        this.handleSearch();
      });
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    //记录状态：全选
    ztjlAll(val) {
      let allCheck = [];
      for (let i in this.ztjl.checkBox) {
        allCheck.push(this.ztjl.checkBox[i].dm);
      }
      this.ztjl.choose = val ? allCheck : [];

      this.ztjl.isIndeterminate = false;
    },
    // 是否在校：单选
    ztjlCheck(value) {
      let checkedCount = value.length;
      this.ztjl.checkAll = checkedCount === this.ztjl.checkBox.length;
      this.ztjl.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ztjl.checkBox.length;
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = this.multipleSelection.map((item) => item.id);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handleEdit {
    background: url("~@/assets/images/edit.png");
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }

  .scopeIncon1 {
    display: inline-block;
    width: 20px;
    height: 16px;
    vertical-align: middle;
  }
  .ywc {
    background: url("~@/assets/assistantPng/blue.png") no-repeat;
  }
  .djl {
    background: url("~@/assets/assistantPng/red.png") no-repeat;
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
          background: url("../../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../../assets/images/chevronUp.png") no-repeat;
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
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }

          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
        }
      }
    }
  }
}
</style>
