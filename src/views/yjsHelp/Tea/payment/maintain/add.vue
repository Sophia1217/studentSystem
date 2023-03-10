<template>
  <div>
    <div class="tableStyle">
      <el-row :gutter="20">
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">学号</div>
            <el-autocomplete
              v-model="formAdd.xh"
              :fetch-suggestions="querySearchByXh"
              placeholder="请输入学生学号"
              :trigger-on-focus="false"
              @select="handleSelectXh"
            ></el-autocomplete>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">姓名</div>
            <!-- <div class="content">{{ formDetails.xm }}</div> -->
            <el-autocomplete
              v-model="formAdd.xm"
              :fetch-suggestions="querySearch"
              placeholder="请输入学生姓名"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">性别</div>
            <div class="content">{{ basicInfo.xbmmc }}</div>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">年级</div>
            <div class="content">{{ basicInfo.ssnj }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">学院</div>
            <div class="content">{{ basicInfo.ssdwdmmc }}</div>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">专业</div>
            <div class="content">{{ basicInfo.zydmmc }}</div>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">班级</div>
            <div class="content">{{ basicInfo.bjmc }}</div>
          </div>
        </el-col>
        <el-col :span="6" class="rowStyle">
          <div class="wrap">
            <div class="title">政治面貌</div>
            <div class="content">{{ basicInfo.bjmc }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
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
            <!-- <el-table-column prop="gs" label="工时" min-width="150">
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
            </el-table-column> -->
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
        <div class="table">
          <el-form-item label="备注" prop="bz">
            <el-input
              type="textarea"
              v-model="formAdd.bz"
              :rows="5"
              show-word-limit
              maxlength="500"
            />
          </el-form-item>
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
import { queryDNew } from "@/api/gwsz/gwsz";
import { getGzdw } from "@/api/politicalWork/assistantappoint";
import { insertXscjBySchool, gwList } from "@/api/thrift/paymentApplyYjs";
import { queryStuList } from "@/api/familyDifficulties/difficultTea";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
export default {
  computed: {},
  data() {
    return {
      basicInfo: {},
      formAdd: {
        xh: "",
        xm: "",
        gssx: "",
        bz: "",
        detailList: [
          {
            xn: "",
            ffny: "",
            gwYrbm: "",
            gwId: "",
            cjbz: "",
            // gs: "",
            je: "",
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
        gwYrbm: [
          { required: true, message: "用人部门不能为空", trigger: "change" },
        ],
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

      queryDNew().then((res) => {
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
    // count(row) {
    //   var arr = row.gs * this.formAdd.detailList[0].cjbz;
    //   this.$set(row, "je", arr);
    // },
    addClick() {
      if (
        !this.formAdd.detailList[0].ffny ||
        !this.formAdd.detailList[0].gwYrbm
      ) {
        this.$message.error("发放年月、用人部门必填！");
        return;
      } else {
        let data = {
          ffny: this.formAdd.detailList[0].ffny || "",
          gwYrbm: this.formAdd.detailList[0].gwYrbm || "",
          gwId: this.formAdd.detailList[0].gwId || "",
          xn: this.formAdd.detailList[0].xn,
          // gs: this.formAdd.detailList[0].gs,
          je: this.formAdd.detailList[0].je,
          xh: this.formAdd.xh,
          xm: this.formAdd.xm,
        };
        insertXscjBySchool(data).then((res) => {
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
      getGzdw()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    //学生
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xm).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelect(item) {
      this.formAdd.xh = item.gh;
      this.formAdd.xm = item.xm;
      queryKnssqxsjbxx({ xh: this.formAdd.xh }).then((res) => {
        this.basicInfo = res.data;
      });
    },
    //通过学号查姓名信息
    querySearchByXh(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xh = { xh: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xh).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelectXh(item) {
      this.formAdd.xh = item.gh;
      this.formAdd.xm = item.xm;
      queryKnssqxsjbxx({ xh: this.formAdd.xh }).then((res) => {
        this.basicInfo = res.data;
      });
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
.tableStyle {
  padding: 0 20px;
  .rowStyle {
    padding: 0 !important;
    margin: 0;
    border-bottom: 1px solid #cccccc;
  }
  .wrap {
    display: flex;
    align-items: center;
    .title {
      flex: 0 0 160px;
      line-height: 48px;
      background: #e0e0e0;
      text-align: right;
      padding-right: 5px;
      margin: 0 !important;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 22px;
      margin-left: 16px;
      ::v-deep .el-input {
        width: 200px;
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
.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
</style>
