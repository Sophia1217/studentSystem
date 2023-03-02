<template>
  <div>
    <div class="tableWrap mt15">
      <el-form :model="formEdit" ref="formEdit" size="small" :rules="rules">
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
                  label-width="100px"
                  ><div v-if="isEdit == 1">{{ formEdit.gwMainMc }}</div>
                  <el-input
                    v-model="formEdit.gwMainMc"
                    clearable
                    maxlength="100"
                    v-else
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="岗位性质" prop="gwType" label-width="100px"
                  ><div v-if="isEdit == 1">{{ formEdit.gwTypeMc }}</div>
                  <el-select v-model="formEdit.gwType" clearable v-else>
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
                  {{ formEdit.gwYrbm }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="岗位起止时间"
                  prop="gwTime"
                  label-width="120px"
                  ><div v-if="isEdit == 1">
                    {{ formEdit.gwStartDate }}至{{ formEdit.gwEndDate }}
                  </div>
                  <el-date-picker
                    v-else
                    type="daterange"
                    v-model="formEdit.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="学年" prop="xn" label-width="120px">
                  <div v-if="isEdit == 1">{{ formEdit.xn }}</div>
                  <el-select
                    v-model="formEdit.xn"
                    style="width: 130px; margin: 0 15px 0"
                    v-else
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
          <!-- <div class="headerRight">
            <div class="btns borderLight" @click="showDel">
              <i class="icon lightIcon"></i><span class="btutitle">删除</span>
            </div>
            <div class="btns borderGreen" @click="xinzeng">
              <i class="icon greenIcon"></i><span class="btutitle1">新增</span>
            </div>
          </div> -->
        </div>
        <div class="table">
          <el-table
            :data="formEdit.detailList"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @sort-change="changeTableSort"
            :default-sort="{ prop: 'date', order: 'descending' }"
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
                  <div v-if="isEdit == 1">{{ scope.row.gwDetailMc }}</div>

                  <el-input
                    v-model="scope.row.gwDetailMc"
                    maxlength="100"
                    clearable
                    v-else
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
                  <div v-if="isEdit == 1">{{ scope.row.gwGzdd }}</div>
                  <el-input
                    v-model="scope.row.gwGzdd"
                    maxlength="100"
                    clearable
                    v-else
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="gwYgzl"
              label="月工作量(小时)"
              :min-width="230"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwYgzl'"
                  :rules="rules.gwYgzl"
                >
                  <div v-if="isEdit == 1">{{ scope.row.gwYgzl }}</div>
                  <el-input-number
                    v-else
                    v-model="scope.row.gwYgzl"
                    :min="0"
                    :max="999"
                    controls-position="right"
                    @change="count(scope.row)"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="gwYgzsx"
              label="月工资上限(元)"
              :min-width="230"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'detailList.' + scope.$index + '.gwYgzsx'"
                  :rules="rules.gwYgzsx"
                >
                  <div v-if="sfkgg == 2 || isEdit == 1">
                    {{ scope.row.gwYgzsx }}
                  </div>
                  <el-input-number
                    v-model="scope.row.gwYgzsx"
                    :min="0"
                    :max="9999999"
                    controls-position="right"
                    @change="countNXC(scope.row)"
                    v-else
                  />
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
                  <div v-if="isEdit == 1">{{ scope.row.gwNzxsrs }}</div>
                  <el-input-number
                    v-else
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
                  <div v-if="isEdit == 1">{{ scope.row.gwKnss }}</div>
                  <el-input-number
                    v-else
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
                  <div v-if="isEdit == 1">{{ scope.row.gwZdls }}</div>
                  <el-autocomplete
                    v-else
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
                  <div v-if="isEdit == 1">{{ scope.row.gwLxfs }}</div>
                  <el-input v-model="scope.row.gwLxfs" maxlength="100" v-else />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column type="fixed" label="操作" fixed="right">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index)"
                >
                  <i class="icon jian" />
                </div>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div class="table">
          <el-form-item label="岗位描述" prop="gwMs">
            <el-input
              type="textarea"
              v-model="formEdit.gwMs"
              :rows="5"
              show-word-limit
              maxlength="500"
              :readonly="isEdit == 1"
            />
          </el-form-item>

          <el-form-item label="岗位人员要求" prop="gwRyyq">
            <el-input
              type="textarea"
              v-model="formEdit.gwRyyq"
              :rows="5"
              show-word-limit
              maxlength="500"
              :readonly="isEdit == 1"
            />
          </el-form-item>

          <el-form-item label="备注" prop="gwRemark">
            <el-input
              type="textarea"
              v-model="formEdit.gwRemark"
              :rows="5"
              show-word-limit
              maxlength="500"
              :readonly="isEdit == 1"
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
    <div class="editBottom" v-show="isEdit != 1">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="editClick">保存</div>
    </div>
    <div
      class="editBottom"
      v-show="isEdit == 1 && (status == '08' || status == '01')"
    >
      <div class="btn confirm" @click="bianji">编辑</div>
      <div class="btn cancel" @click="back">返回</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { getXmXgh } from "@/api/assistantWork/homeSchool";
import { saveD, queryD } from "@/api/gwsz/gwsz";
import {
  countYN,
  insertQgzxGw,
  queryZgJbxxDwh,
  queryQgzxGwById,
  updateQgzxGw,
} from "@/api/dailyBehavior/thriftbumen";
export default {
  data() {
    return {
      status: this.$route.query.status,
      isEdit: 1,
      formEdit: {},
      gwxzOptions: [],
      xmOptions: [],
      detailList: [],
      xnOptions: [],
      sfkgg: "", //1是2否
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
        gwYgzsx: [
          { required: true, message: "月工资上限不能为空", trigger: "change" },
        ],
      },
      delModal: false,
      yrbmdm: "",
    };
  },
  mounted() {
    this.getCode("dmsplcm"); //状态
    this.getCode("dmqgzxgwxz");
    this.getSchoolYears();
    this.getYrbm();
    this.getDetail();
  },

  methods: {
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.xnOptions = res.data;
        })
        .catch((err) => {});
      queryD().then((res) => {
        this.sfkgg = res.data.yrdwGggwcjsx;
      });
    },
    getYrbm() {
      queryZgJbxxDwh()
        .then((res) => {
          this.formEdit.gwYrbm = res.data.mc;
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
          case "dmqgzxgwxz": //审批结果
            this.gwxzOptions = res.data;
            break;
        }
      });
    },
    bianji() {
      this.isEdit = 2;
    },
    back() {
      this.$router.go(-1);
    },
    getDetail() {
      queryQgzxGwById({ id: this.$route.query.id }).then((res) => {
        console.log(res);
        // this.detailList = res.data.detailList;
        this.formEdit = res.data;
        this.$set(this.formEdit, "gwTime", [
          res.data.gwStartDate,
          res.data.gwEndDate,
        ]);
      });
    },
    delCancel() {
      this.delModal = false;
    },
    deleteWorkBrifeData(row, index) {
      this.detailList.splice(index, 1);
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
      this.isEdit = 1;
      this.$refs.formEdit.clearValidate();
    },
    count(row) {
      console.log(row.gwYgzl);
      countYN({ ygzl: row.gwYgzl || "0" }).then((res) => {
        this.$set(row, "gwNjyxc", res.data.gwNjyxc);
        this.$set(row, "gwYgzsx", res.data.gwYgzsx);
      });
    },
    countNXC(row) {
      this.$set(row, "gwNjyxc", row.gwYgzsx * 10);
    },
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          detailList: this.formEdit.detailList,
          gwEndDate: this.formEdit.gwTime[1] || "",
          gwMainMc: this.formEdit.gwMainMc,
          gwMs: this.formEdit.gwMs,
          gwRemark: this.formEdit.gwRemark,
          gwRyyq: this.formEdit.gwRyyq,
          gwStartDate: this.formEdit.gwTime[0] || "",
          gwType: this.formEdit.gwType,
          gwYrbm: this.yrbmdm,
          xn: this.formEdit.xn,
        };
        updateQgzxGw(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.isEdit = 1;
          } else {
            this.$message.error("编辑失败");
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
