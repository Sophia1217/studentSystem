<template>
  <div>
    <div class="tableWrap mt15">
      <el-form :model="formAdd" ref="formAdd" size="small" :rules="rules">
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">岗位信息</span>
          </div>
        </div>
        <div class="table">
          <el-table
            :data="formAdd.detailList"
            ref="multipleTable"
            style="width: 100%"
          >
            <el-table-column prop="xn" label="学年" :min-width="110">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.xn'"
                  :rules="rules.xn"
                >
                  <el-select
                    v-model="scope.row.xn"
                    placeholder="请选择"
                    @change="changeXn"
                  >
                    <el-option
                      v-for="(item, index) in xnOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwYrbmMc" label="用人部门" :min-width="130">
            </el-table-column>
            <el-table-column prop="zgzt" label="在岗状态" :min-width="110">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.zgzt'"
                  :rules="rules.zgzt"
                >
                  <el-select
                    v-model="scope.row.zgzt"
                    placeholder="请选择"
                    @change="changeGW"
                  >
                    <el-option
                      v-for="(item, index) in zgztOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="ffny" label="发放年月" :min-width="110">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.ffny'"
                  :rules="rules.ffny"
                >
                  <el-date-picker
                    v-model="scope.row.ffny"
                    @change="changeGW"
                    type="month"
                    format="yyyy 年 MM 月"
                    value-format="yyyy-MM"
                    placeholder="选择年月"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwId" label="岗位" :min-width="120">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwId'"
                  :rules="rules.gwId"
                >
                  <el-select
                    v-model="scope.row.gwId"
                    placeholder="请选择"
                    @change="changeGW"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in gwOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="cjbz" label="酬金标准" :min-width="100">
            </el-table-column>
          </el-table>
        </div>
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">学生列表</span>
          </div>
          <div class="headerRight">
            <div class="btns borderBlue" @click="mbDown">
              <i class="icon downIcon"></i
              ><span class="btutitle">模板下载</span>
            </div>
            <div class="btns borderBlue">
              <el-upload
                accept=".xlsx,.xls"
                :auto-upload="true"
                :action="uploadUrl"
                :show-file-list="false"
                :data="fileData"
                :headers="fileHeader"
                :on-success="upLoadSuccess"
                :on-error="upLoadError"
              >
                <i class="icon blueIcon"></i><span class="btutitle">导入</span>
              </el-upload>
            </div>
            <!-- <div class="btns borderOrange" @click="expor">
              <i class="icon orangeIcon"></i><span class="btutitle">导出</span>
            </div> -->
          </div>
        </div>
        <div class="table">
          <el-table
            :data="formAdd.stuList"
            ref="multipleTable"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="xh" label="学号" min-width="110">
            </el-table-column>
            <el-table-column prop="xm" label="姓名" min-width="110">
            </el-table-column>
            <el-table-column prop="gwmc" label="岗位名称" min-width="110">
            </el-table-column>
            <el-table-column prop="gw" label="岗位" min-width="110">
            </el-table-column>
            <el-table-column prop="cjsx" label="岗位薪酬上限" min-width="110">
            </el-table-column>
            <el-table-column prop="zgName" label="在岗状态" min-width="110">
            </el-table-column>
            <el-table-column prop="sgsj	" label="上岗时间" min-width="110">
            </el-table-column>
            <el-table-column prop="gs" label="工时" min-width="150">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'stuList.' + scope.$index + '.gs'"
                  :rules="rules.gs"
                >
                  <el-input-number
                    v-model="scope.row.gs"
                    :max="9999"
                    controls-position="right"
                    @change="count(scope.row)"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="je" label="金额（元）" min-width="150">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'stuList.' + scope.$index + '.je'"
                  :rules="rules.je"
                >
                  <el-input-number
                    v-model="scope.row.je"
                    :max="99999"
                    controls-position="right"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="bz" label="备注" min-width="200">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'stuList.' + scope.$index + '.bz'"
                  :rules="rules.bz"
                >
                  <el-input v-model="scope.row.bz" maxlength="500" />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="addClick">保存</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getXmXgh } from "@/api/assistantWork/homeSchool";
import { queryD } from "@/api/gwsz/gwsz";
import { queryZgJbxxDwh } from "@/api/dailyBehavior/thriftbumen";
import {
  queryStuDffList,
  insertXscj,
  gwList,
  exportStu,
  importStuInsert,
  mbDown,
} from "@/api/thrift/paymentApply";
import { getToken } from "@/utils/auth";
export default {
  computed: {
    fileData: {
      get() {
        return {
          xn: this.formAdd.detailList[0].xn,
          ffny: this.formAdd.detailList[0].ffny,
          gwYrbm: this.formAdd.detailList[0].gwYrbm,
          gwId: this.formAdd.detailList[0].gwId || "",
          zgzt: this.formAdd.detailList[0].zgzt || "1",
        };
      },
    },
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
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/qgzxCjff/importStuCjffForInsert",
      formAdd: {
        gssx: "",
        detailList: [
          {
            xn: "",
            zgzt: "1",
            ffny: "",
            gwYrbmMc: "",
            gwYrbm: "",
            gwId: "",
            cjbz: "",
          },
        ],
        stuList: [{ gs: undefined, je: undefined }],
      },
      gwxzOptions: [],
      xmOptions: [],
      sfkgg: "", //1是2否
      xnOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      gwOps: [],
      showExport: false,
      zgztOps: [
        { dm: "1", mc: "在岗" },
        { dm: "2", mc: "全部" },
      ],
      rules: {
        ffny: [
          { required: true, message: "发放年月不能为空", trigger: "blur" },
        ],

        xn: [{ required: true, message: "学年不能为空", trigger: "change" }],
      },
    };
  },
  mounted() {
    // this.getCode("dmsplcm"); //状态
    // this.formAdd.detailList[0] = { ffny: this.formatDate(new Date()) };
    this.getSchoolYears();
    // this.getYrbm();
  },

  methods: {
    //岗位下拉
    gwList() {
      gwList({ xn: this.formAdd.detailList[0].xn })
        .then((res) => {
          this.gwOps = res.data;
        })
        .catch((err) => {});
    },
    // 表单校验
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

    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.xnOptions = res.data;
          this.formAdd.detailList[0].xn = res.data[0].mc;
          for (let i = 0; i < this.formAdd.stuList.length; i++) {
            this.formAdd.stuList[i].gs = undefined;
          }
          this.gwList();
          queryZgJbxxDwh()
            .then((res) => {
              this.formAdd.detailList[0].gwYrbmMc = res.data.mc;
              this.formAdd.detailList[0].gwYrbm = res.data.dm || "";
              this.queryStuList();
            })
            .catch((err) => {});
        })
        .catch((err) => {});

      queryD().then((res) => {
        this.formAdd.detailList[0].cjbz = res.data.cjffCjbz; //酬金标准
        this.formAdd.gssx = res.data.cjbzcjffSzsxNum || "9999"; //工时上限
      });
    },
    getYrbm() {
      queryZgJbxxDwh()
        .then((res) => {
          this.formAdd.detailList[0].gwYrbmMc = res.data.mc;
          this.formAdd.detailList[0].gwYrbm = res.data.dm || "";
          this.queryStuList();
        })
        .catch((err) => {});
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
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
    },
    handleCancle() {
      this.$refs.formAdd.clearValidate();
      this.$router.go(-1);
    },
    count(row) {
      var arr = row.gs * this.formAdd.detailList[0].cjbz;
      this.$set(row, "je", arr);
    },

    queryStuList() {
      let data = {
        ffny: this.formAdd.detailList[0].ffny || "",
        gwYrbm: this.formAdd.detailList[0].gwYrbm || "",
        gwId: this.formAdd.detailList[0].gwId || "",
        zgzt: this.formAdd.detailList[0].zgzt || "1",
        xn: this.formAdd.detailList[0].xn,
      };
      queryStuDffList(data)
        .then((res) => {
          this.formAdd.stuList = res.data;
          for (let i = 0; i < this.formAdd.stuList.length; i++) {
            this.formAdd.stuList[i].gs = undefined;
            this.formAdd.stuList[i].je = undefined;
          }
        })
        .catch((err) => {});
    },
    addClick() {
      if (!this.formAdd.detailList[0].ffny) {
        this.$message.error("请选择发放年月！");
        return;
      } else {
        let data = {
          ffny: this.formAdd.detailList[0].ffny || "",
          gwYrbm: this.formAdd.detailList[0].gwYrbm || "",
          gwId: this.formAdd.detailList[0].gwId || "",
          // status: this.formAdd.detailList[0].zgzt || "",
          xn: this.formAdd.detailList[0].xn,
          qgzxCjffBaseReqList: this.formAdd.stuList || [],
        };
        insertXscj(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.$router.go(-1);
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    changeGW(val) {
      this.queryStuList();
    },
    changeXn() {
      this.gwOps = [];
      this.$set(this.formAdd.detailList[0], "gwId", "");
      this.gwList();
      this.queryStuList();
    },
    //导入失败
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
    //模板下载
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "酬金发放模板下载", "xlsx");
        this.$message.success("操作成功");
      });
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      exportStu(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "学生列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    async expor() {
      let data = {
        ffny: this.formAdd.detailList[0].ffny || "",
        gwYrbm: this.formAdd.detailList[0].gwYrbm || "",
        gwId: this.formAdd.detailList[0].gwId || "",
        zgzt: this.formAdd.detailList[0].zgzt || "1",
        xn: this.formAdd.detailList[0].xn,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
  },
};
</script>
<style lang="scss" scoped>
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
.tableWrap {
  background: #fff;
  padding: 20px;
  .table {
    margin: 0px 20px 20px 20px;
  }
  .headerTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
    .headerLeft {
      width: 70%;
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
        .btutitle {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          // vertical-align: middle;
        }
        .btutitle1 {
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
        .downIcon {
          margin-top: 10px;
          background: url("~@/assets/images/down.png") no-repeat;
        }
      }
    }
  }
}
.editBottom {
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn {
    width: 84px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #005657;
    border-radius: 2px;
    margin-right: 20px;
  }
  .cancel {
    color: #005657;
  }
  .confirm {
    background: #005657;
    color: #fff;
  }
  .editIcon {
    background: #005657;
    color: #fff;
    // background: url('~@/assets/images/icon_edit_white.png');
  }
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
</style>
