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
            <el-table-column prop="gwYrbm" label="用人部门" :min-width="130">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwYrbm'"
                  :rules="rules.gwYrbm"
                >
                  <el-select
                    v-model="scope.row.gwYrbm"
                    @change="changeYrbm"
                    collapse-tags
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
            <el-table-column prop="gs" label="工时" min-width="150">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gs'"
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
                  :prop="'detailList.' + scope.$index + '.je'"
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
            <el-table-column
              prop="cjbz"
              label="酬金上限（元）"
              :min-width="100"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
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
import { getXy } from "@/api/assistantWork/themeEdu";
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
      },
      xnOptions: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      gwOps: [],
      allDwh: [], // 学院下拉框
      rules: {
        ffny: [
          { required: true, message: "发放年月不能为空", trigger: "blur" },
        ],

        xn: [{ required: true, message: "学年不能为空", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.getSchoolYears();
    this.getAllXy();
  },

  methods: {
    //岗位下拉
    gwList() {
      gwList({
        xn: this.formAdd.detailList[0].xn,
        gwYrbm: this.formAdd.detailList[0].gwYrbm,
      })
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
        })
        .catch((err) => {});

      queryD().then((res) => {
        this.formAdd.detailList[0].cjbz = res.data.cjffCjbz; //酬金标准
        this.formAdd.gssx = res.data.cjbzcjffSzsxNum || "9999"; //工时上限
      });
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
    changeGW(val) {},
    changeXn() {
      if (this.formAdd.detailList[0].gwYrbm !== "") {
        this.gwOps = [];
        this.$set(this.formAdd.detailList[0], "gwId", "");
        this.gwList();
      }
    },
    changeYrbm() {
      this.gwOps = [];
      this.$set(this.formAdd.detailList[0], "gwId", "");
      this.gwList();
    },
    //学院部门，权限
    getAllXy() {
      getXy()
        .then((res) => {
          this.allDwh = res.data;
        })
        .catch((err) => {});
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
