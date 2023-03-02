<template>
  <div>
    <div class="tableWrap mt15">
      <el-form :model="formAdd" ref="formAdd" size="small" :rules="rules">
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">岗位信息</span>
          </div>
        </div>
        <div class="headerTop">
          <div class="headerLeft">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="岗位名称"
                  prop="gwMainMc"
                  maxlength="100"
                  label-width="100px"
                >
                  <el-input v-model="formAdd.gwMainMc" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="岗位性质"
                  prop="gwType"
                  label-width="100px"
                >
                  <el-select v-model="formAdd.gwType" @change="changeXZ">
                    <el-option
                      v-for="(item, index) in gwxzOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="用人部门"
                  prop="gwYrbm"
                  label-width="100px"
                >
                  {{ formAdd.gwYrbm }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="岗位起止时间"
                  prop="gwTime"
                  label-width="120px"
                  ><el-date-picker
                    type="daterange"
                    v-model="formAdd.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学年" prop="xn" label-width="120px">
                  <el-select
                    v-model="formAdd.xn"
                    style="width: 130px; margin: 0 15px 0"
                  >
                    <el-option
                      v-for="(item, index) in xnOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="headerRight">
            <!-- <div class="btns borderLight" @click="showDel">
              <i class="icon lightIcon"></i><span class="btutitle">删除</span>
            </div> -->
            <div class="btns borderGreen" @click="xinzeng">
              <i class="icon greenIcon"></i><span class="btutitle1">新增</span>
            </div>
          </div>
        </div>
        <div class="table">
          <el-table
            :data="formAdd.detailList"
            ref="multipleTable"
            style="width: 100%"
          >
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="gwDetailMc" label="岗位" :min-width="200">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwDetailMc'"
                  :rules="rules.gwDetailMc"
                >
                  <el-input
                    v-model="scope.row.gwDetailMc"
                    clearable
                    maxlength="100"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwGzdd" label="工作地点" :min-width="200">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwGzdd'"
                  :rules="rules.gwGzdd"
                >
                  <el-input
                    v-model="scope.row.gwGzdd"
                    clearable
                    maxlength="100"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="gwYgzl"
              label="月工作量(小时)"
              :min-width="230"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwYgzl'"
                  :rules="rules.gwYgzl"
                >
                  <el-input-number
                    v-model="scope.row.gwYgzl"
                    :min="0"
                    :max="999"
                    controls-position="right"
                    @change="count(scope.row)"
                  />
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="gwYcjbz"
              label="月酬金标准(元)"
              :min-width="230"
            >
              <template slot-scope="scope">
                <el-form-item :prop="'detailList.' + scope.$index + '.gwYcjbz'">
                  <div>{{ scope.row.gwYcjbz }}</div>
                  <!-- <el-input-number
                    v-model="scope.row.gwYgzsx"
                    :min="0"
                    controls-position="right"
                    @change="countNXC(scope.row)"
                    v-else
                  /> -->
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="gwNjyxc"
              label="年建议薪酬(元)"
              :min-width="230"
            >
              <template slot-scope="scope">
                {{ scope.row.gwNjyxc }}
              </template>
            </el-table-column>
            <el-table-column
              prop="gwNzxsrs"
              label="拟招学生人数"
              :min-width="230"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwNzxsrs'"
                  :rules="rules.gwNzxsrs"
                >
                  <el-input-number
                    v-model="scope.row.gwNzxsrs"
                    :min="0"
                    :max="9999999"
                    controls-position="right"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwKnss" label="困难生数" :min-width="230">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwKnss'"
                  :rules="rules.gwKnss"
                >
                  <el-input-number
                    v-model="scope.row.gwKnss"
                    :min="0"
                    :max="scope.row.gwNzxsrs"
                    controls-position="right"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwZdls" label="指导老师" :min-width="200">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwZdls'"
                  :rules="rules.gwZdls"
                >
                  <el-autocomplete
                    v-model="scope.row.gwZdls"
                    :fetch-suggestions="querySearchPart"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    size="small"
                  ></el-autocomplete>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="gwLxfs" label="联系方式" :min-width="200">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwLxfs'"
                  :rules="rules.gwLxfs"
                >
                  <el-input v-model="scope.row.gwLxfs" maxlength="100" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column type="fixed" label="操作" fixed="right">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index)"
                >
                  <i class="icon jian" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table">
          <el-form-item label="岗位描述" prop="gwMs">
            <el-input
              type="textarea"
              v-model="formAdd.gwMs"
              :rows="5"
              show-word-limit
              maxlength="500"
            />
          </el-form-item>

          <el-form-item label="岗位人员要求" prop="gwRyyq">
            <el-input
              type="textarea"
              v-model="formAdd.gwRyyq"
              :rows="5"
              show-word-limit
              maxlength="500"
            />
          </el-form-item>

          <el-form-item label="备注" prop="gwRemark">
            <el-input
              type="textarea"
              v-model="formAdd.gwRemark"
              :rows="5"
              show-word-limit
              maxlength="500"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
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
import { saveD, queryD } from "@/api/gwsz/gwsz";
import {
  queryYsjGwszType,
  insertQgzxGwYjs,
  queryZgJbxxDwh,
} from "@/api/thrift/qgzxgwYjs";
export default {
  data() {
    return {
      formAdd: { detailList: [] },
      gwxzOptions: [],
      xmOptions: [],
      sfkgg: "", //1是2否
      xnOptions: [],
      je: 0,

      rules: {
        gwMainMc: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" },
        ],
        gwMs: [
          { required: true, message: "岗位描述不能为空", trigger: "blur" },
        ],
        gwType: [
          { required: true, message: "岗位性质不能为空", trigger: "change" },
        ],
        gwRyyq: [
          { required: true, message: "岗位人员要求不能为空", trigger: "blur" },
        ],

        xn: [{ required: true, message: "学年不能为空", trigger: "blur" }],
        gwTime: [
          {
            required: true,
            message: "岗位起止时间不能为空",
            trigger: "change",
          },
        ],
        gwDetailMc: [
          { required: true, message: "岗位不能为空", trigger: "blur" },
        ],
        gwGzdd: [
          { required: true, message: "工作地点不能为空", trigger: "blur" },
        ],
        gwYgzl: [
          { required: true, message: "月工作量不能为空", trigger: "change" },
        ],
        gwYgzsx: [
          { required: true, message: "月工资上限不能为空", trigger: "change" },
        ],
        gwNzxsrs: [
          { required: true, message: "拟招人数不能为空", trigger: "change" },
        ],
        gwKnss: [
          { required: true, message: "困难生数不能为空", trigger: "change" },
        ],
        gwZdls: [
          { required: true, message: "指导老师不能为空", trigger: "blur" },
        ],
        gwLxfs: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
        ],
      },
      delModal: false,
      yrbmdm: "",
    };
  },
  mounted() {
    this.getCode("dmsplcm"); //状态

    this.getSchoolYears();
    this.getYrbm();
  },

  methods: {
    changeXZ(val) {
      for (let item of this.gwxzOptions) {
        if (item.dm == val) {
          this.je = item.je;
        }
      }
      // for(var i=0;i<detailList.length;i++){

      // }
      this.formAdd.detailList.map((item) => {
        this.$set(item, "gwYcjbz", this.je);
        this.$set(item, "gwNjyxc", this.je * 10);
      });
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
        })
        .catch((err) => {});
      queryD().then((res) => {
        this.sfkgg = res.data.yrdwGggwcjsx;
      });
      queryYsjGwszType().then((res) => {
        this.gwxzOptions = res.data;
      });
    },
    getYrbm() {
      queryZgJbxxDwh()
        .then((res) => {
          this.formAdd.gwYrbm = res.data.mc;
          this.yrbmdm = res.data.dm;
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

    delCancel() {
      this.delModal = false;
    },
    deleteWorkBrifeData(row, index) {
      this.formAdd.detailList.splice(index, 1);
    },
    xmChange() {},
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
    xinzeng() {
      if (this.formAdd.gwType) {
        this.formAdd.detailList.push({
          gwYcjbz: this.je,
          gwNjyxc: 10 * this.je,
        });
      } else {
        this.formAdd.detailList.push({});
      }
    },
    handleCancle() {
      this.$refs.formAdd.clearValidate();
      this.$router.go(-1);
    },
    count(row) {
      countYN({ ygzl: row.gwYgzl || "0" }).then((res) => {
        this.$set(row, "gwNjyxc", res.data.gwNjyxc);
        this.$set(row, "gwYgzsx", res.data.gwYgzsx);
      });
    },
    countNXC(row) {
      this.$set(row, "gwNjyxc", row.gwYgzsx * 10);
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          detailList: this.formAdd.detailList,
          gwEndDate: this.formAdd.gwTime[1] || "",
          gwMainMc: this.formAdd.gwMainMc,
          gwMs: this.formAdd.gwMs,
          gwRemark: this.formAdd.gwRemark,
          gwRyyq: this.formAdd.gwRyyq,
          gwStartDate: this.formAdd.gwTime[0] || "",
          gwType: this.formAdd.gwType,
          gwYrbm: this.yrbmdm,
          xn: this.formAdd.xn,
        };
        insertQgzxGwYjs(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.$router.go(-1);
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    //共同参与人
    querySearchPart(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(Xm).then((res) => {
          // console.log("res",res.data);
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
        .chIcon {
          margin-top: 10px;
          background: url("~@/assets/dangan/chIcon.png") no-repeat;
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
        .tjIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
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
