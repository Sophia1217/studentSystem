<template>
  <div class="process">
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">临时困难经费执行进度</span>
          <div class="yearOption">
            <el-select
              v-model="nd"
              @change="ndChange"
              style="width: 80px"
              placeholder=""
            >
              <el-option
                v-for="(item, index) in ndOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
            ><span>年度</span>
          </div>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown" v-show="AUTHFLAG">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue" v-show="AUTHFLAG">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon blueIcon"></i><span class="title">导入</span>
            </el-upload>
          </div>
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderLight" @click="handleDelete" v-show="AUTHFLAG">
            <i class="icon lightIcon" /><span class="title">删除</span>
          </div>
          <div class="btns fullGreen" @click="handleNew" v-show="AUTHFLAG">
            <i class="icon greenIcon" /><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          max-height="800"
          @sort-change="changeTableSort"
          show-summary
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="dwmc"
            label="培养单位"
            width="100"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column label="本科生">
            <el-table-column
              prop="bksjhed"
              label="计划额度（元）"
              min-width="100"
              sortable="custom"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.bksjhed"
                  maxlength="9"
                  oninput="this.value=this.value.replace(/[^\d]/g,'')"
                  placeholder="请输入数字"
                  style="width: 100px"
                  @keyup.enter.native="handleUpdata(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="bkssyed"
              label="使用额度"
              min-width="100"
              sortable="custom"
            >
            </el-table-column>
            <el-table-column
              prop="bksRatio"
              label="执行进度"
              min-width="70"
              sortable="custom"
            >
            </el-table-column>
          </el-table-column>
          <el-table-column label="研究生">
            <el-table-column
              prop="yjsjhed"
              label="计划额度（元）"
              min-width="100"
              sortable="custom"
              ><template slot-scope="scope">
                <el-input
                  v-model="scope.row.yjsjhed"
                  maxlength="10"
                  oninput="this.value=this.value.replace(/[^\d]/g,'')"
                  placeholder="请输入数字"
                  style="width: 100px"
                  @keyup.enter.native="handleUpdata(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="yjssyed"
              label="使用额度"
              min-width="100"
              sortable="custom"
            >
            </el-table-column>
            <el-table-column
              prop="yjsRatio"
              label="执行进度"
              min-width="70"
              sortable="custom"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <!-- <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      /> -->
    </div>

    <el-dialog title="导出确认" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="expTalk"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="showAdd"
      width="60%"
      @close="closeAdd"
    >
      <el-form
        ref="formAdd"
        :model="formAdd"
        :rules="rules"
        label-width="120px"
      >
        <el-table :data="formAdd.addList">
          <el-table-column
            label="培养单位"
            width="250"
            align="center"
            prop="dwh"
          >
            <template slot-scope="scope">
              <el-form-item
                label-width="0"
                style="margin-bottom: 15px"
                :prop="`addList.${scope.$index}.dwh`"
                :rules="rules.dwh"
              >
                <el-select
                  v-model="scope.row.dwh"
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
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="本科生计划额度（元）"
            align="center"
            prop="bksjhed"
            :min-width="200"
          >
            <template slot-scope="scope">
              <el-form-item
                label-width="0"
                style="margin-bottom: 15px"
                :prop="`addList.${scope.$index}.bksjhed`"
                :rules="rules.bksjhed"
              >
                <el-input-number
                  :min="0"
                  v-model="scope.row.bksjhed"
                  placeholder="请输入"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            label="研究生计划额度（元）"
            align="center"
            prop="yjsjhed"
            :min-width="200"
          >
            <template slot-scope="scope">
              <el-form-item
                label-width="0"
                style="margin-bottom: 15px"
                :prop="`addList.${scope.$index}.yjsjhed`"
                :rules="rules.xxFz"
              >
                <el-input-number
                  :min="0"
                  v-model="scope.row.yjsjhed"
                  placeholder="请输入"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="年度" align="center" prop="nd">
            <template slot-scope="scope">
              {{ nd }}
            </template>
          </el-table-column>
          <el-table-column label="添加选项" align="center">
            <template slot-scope="scope">
              <div style="margin-bottom: 20px">
                <i class="icon jia" @click="jia(scope.row, scope.$index)"></i>
                <i class="icon jian" @click="jian(scope.row, scope.$index)"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <div>
        <span>确认删除</span>
      </div>

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
import {
  downLoadMb,
  zxjdExp,
  zxjdImport,
  queryZxjdList,
  updateLsknEd,
  deleteList,
  insert,
  queryAnalyze,
} from "@/api/dailyBehavior/lskn";
import { getToken } from "@/utils/auth";
import { getXmXgh } from "@/api/assistantWork/sizheng";
import { getGrade, getCollege } from "@/api/class/maintenanceClass"; //待定
export default {
  name: "jindu",
  components: {},
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
  },
  data() {
    return {
      showExport: false,
      showDelete: false,
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswLsknEd/import",
      showAdd: false,
      ndOptions: [],
      nd: "",
      tableData: [],
      queryParams: {
        pageNum: 0,
        pageSize: 999,
        orderZd: "",
        orderPx: "",
        total: 0,
      },
      multipleSelection: [],
      addParams: {},
      allDwh: [],
      formAdd: {
        addList: [],
      },
      rules: {
        dwh: [
          {
            required: true,
            message: "培养单位不能为空",
            trigger: "blur",
          },
        ],
        bksjhed: [
          {
            required: true,
            message: "计划额度不能为空",
            trigger: "blur",
          },
        ],
        yjsjhed: [
          {
            required: true,
            message: "计划额度不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    // this.handleSearch();
    this.getAllGrade();
  },

  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    jia(row, index) {
      var obj = { dwh: "", bksjhed: "", yjsjhed: "", nd: this.nd };
      this.formAdd.addList.push(obj);
    },
    jian(row, index) {
      if (this.formAdd.addList.length > 1) {
        this.formAdd.addList.splice(index, 1);
      } else {
        this.$message.error("至少保留一个题目");
      }
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });

      if (!validForm) {
        return false;
      }
      return true;
    },
    handleDelete() {
      this.showDelete = true;
    },
    closeAdd() {
      this.$set(this.formAdd, "addList", [
        { dwh: "", bksjhed: "", yjsjhed: "", nd: this.nd },
      ]);
    },
    dialogCancel() {
      this.showDelete = false;
    },
    rmRecord() {
      this.showDelete = false;
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      deleteList(ids)
        .then((res) => {
          this.$message({
            message: res.errmsg,
            type: "success",
          });
          this.handleSearch();
        })
        .catch((err) => {});
    },
    handleNew() {
      this.showAdd = true;
      // var obj = { dwh: "", bksjhed: "", yjsjhed: "", nd: this.nd };
      // this.formAdd.addList.push(obj);
    },
    addConfirm() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单信息！");
      } else {
        console.log(this.checkFormAdd);
        insert(this.formAdd.addList).then((res) => {
          this.showAdd = false;
          this.handleSearch();
        });
      }
    },
    cancelAdd() {
      this.showAdd = false;
    },
    //更新
    handleUpdata(row) {
      let data = {
        nd: this.nd,
        bksjhed: row.bksjhed,
        bkssyed: row.bkssyed,
        dwh: row.dwh,
        id: row.id,
        yjsjhed: row.yjsjhed,
        yjssyed: row.yjssyed,
      };
      updateLsknEd(data).then((res) => {
        this.$message.success("更新成功");
      });
    },
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.ndOptions = res.data.rows;
          this.nd = res.data.rows[0];
          this.$set(this.formAdd, "addList", [
            { dwh: "", bksjhed: "", yjsjhed: "", nd: this.nd },
          ]);
          this.handleSearch();
        })
        .catch((err) => {});
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    ndChange() {
      this.handleSearch();
    },
    expTalk() {
      this.showExport = false;
      var idList = [];
      this.multipleSelection.map((item) => idList.push(item.id));
      var data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.multipleSelection.length > 0) {
        zxjdExp({ idList: idList }).then((res) => {
          this.downloadFn(res, "临时困难执行进度列表下载", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        });
      } else {
        zxjdExp(data).then((res) => {
          this.downloadFn(res, "临时困难执行进度列表下载", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        });
      }
    },
    handleExport() {
      this.showExport = true;
    },
    handleCancel() {
      this.showExport = false;
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

    // 查询
    handleSearch() {
      let data = {
        nd: this.nd,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryZxjdList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    querySum() {
      queryAnalyze(this.nd).then((res) => {
        // console.log(res);
      });
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
      //console.log(1);
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    mbDown() {
      downLoadMb().then((res) => {
        this.downloadFn(res, "临时困难执行进度模板下载", "xlsx");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.process {
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
        display: flex;
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
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
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .jia {
            margin-top: 9px;
            background: url("~@/assets/images/jia.png") no-repeat;
          }

          .jian {
            margin-top: 9px;
            background: url("~@/assets/images/jian.png") no-repeat;
          }
        }
      }
    }
  }
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: top;
    margin-right: 5px;
  }

  .jia {
    margin-top: 9px;
    background: url("~@/assets/images/jia.png") no-repeat;
  }

  .jian {
    margin-top: 9px;
    background: url("~@/assets/images/jian.png") no-repeat;
  }
}
</style>
