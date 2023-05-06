<template>
  <div>
    <div style="margin: 0 20% 0 20%">
      <div class="topHeader">
        <span>详情</span>
      </div>
      <el-form
        ref="formAdd"
        style="margin-bottom: 60px"
        :model="formAdd"
        :rules="rules"
        :inline-message="true"
      >
        <div class="mkHeader">朋辈导师基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>{{ formAdd.dsm }}</span>
                  <el-button
                    style="margin-left: 50%; background: #005657; color: #fff"
                    @click="showExport = true"
                    >选择</el-button
                  >
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>{{ formAdd.xbmmc }} </span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="培养单位" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>{{ formAdd.dwhmc }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>{{ formAdd.zydmmc }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系电话" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.yddh }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="QQ" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span>
                    {{ formAdd.qqhm }}
                  </span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">课程信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                prop="kczt"
                :rules="rules.common"
                label="课程主题"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kczt"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="类别"
                prop="lb"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <span> {{ formAdd.lb }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="开课地点"
                class="grayBg"
                label-width="42%"
                prop="kkdd"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kkdd"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="可接纳人数"
                class="grayBg"
                label-width="42%"
                prop="kjnrs"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kjnrs"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="起止时间"
                class="grayBg"
                label-width="42%"
                prop="qzsjArr"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-date-picker
                    type="daterange"
                    placeholder="选择日期"
                    v-model="formAdd.qzsjArr"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 100%"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="开课时间"
                class="grayBg"
                label-width="42%"
                prop="kksj"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-date-picker
                    v-model="formAdd.kksj"
                    type="date"
                    placeholder="选择开课时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="课程次数"
                class="grayBg"
                label-width="42%"
                prop="kkcs"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kkcs"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="课程时长"
                class="grayBg"
                label-width="42%"
                prop="kksc"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    v-model="formAdd.kksc"
                    placeholder="请输入内容"
                    style="width: 70%"
                  ></el-input
                  ><span v-html="'\u3000'"></span>分钟
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">课程计划及预期效果</div>
        <div>
          <el-row>
            <el-col :span="24">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="formAdd.kcjh"
                maxlength="1000"
                show-word-limit
                rows="12"
              >
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div style="height: 80px"></div>
    </div>
    <div class="editBottom">
      <div class="btns borderRed" @click="cancel">
        <span class="title">取消</span>
      </div>
      <div class="btns fullGreen" @click="save">
        <span class="title">保存</span>
      </div>
    </div>
    <el-dialog
      title="导师选择"
      :visible.sync="showExport"
      width="50%"
      :close-on-click-modal="false"
    >
      <template>
        <div class="mt15">
          <el-table
            :data="tableData"
            style="width: 100%"
            @sort-change="changeTableSort"
          >
            <el-table-column width="55">
              <template slot-scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="tempRadio"
                  @change.native="getRow(scope.$index, scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="xh" label="学号" width="100" sortable>
            </el-table-column>
            <el-table-column prop="xm" label="姓名" width="85" sortable>
            </el-table-column>
            <el-table-column
              prop="dwhmc"
              label="培养单位"
              min-width="100"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="zydmmc"
              label="专业"
              min-width="100"
              sortable
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="yddh"
              label="联系电话"
              min-width="100"
              sortable
            />
          </el-table>
        </div>
        <pagination
          v-show="queryParams.total > 0"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleSearch"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="showExport = false">取 消</el-button>
          <el-button type="primary" class="confirm" @click="showsure"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { kcpkAdd } from "@/api/kcpk/index";
import { queryPbsqDskList } from "@/api/friendTutor/teacherKu";
export default {
  data() {
    return {
      showExport: false,
      tableData: [],
      bjzt: 2,
      dkInfo: [], //贷款信息
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      formAdd: {
        dsm: "",
        dsh: "",
        xbmmc: "",
        dwhmc: "",
        zydmmc: "",
        yddh: "",
        qqhm: "",
        kczt: "",
        lb: "",
        kkdd: "",
        kjnrs: "",
        qzsjArr: [],
        kkrqks: "",
        kkrqjs: "",
        kksj: "",
        kkcs: "",
        kcjh: "",
        kkxn: "",
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      lgnsn: "",
      commonParams: {},
      multipleSelection1: {},
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    "formAdd.qzsjArr": {
      handler(newName, old) {
        this.formAdd.kkrqks = newName ? newName[0] : "";
        this.formAdd.kkrqjs = newName ? newName[1] : "";
      },
    },
  },
  mounted() {
    this.formAdd.kkxn = this.$route.query.xn;
    this.handleSearch();
  },

  methods: {
    showsure() {
      this.formAdd.dsm = this.multipleSelection1.xm;
      this.formAdd.dsh = this.multipleSelection1.xh;
      this.formAdd.xbmmc = this.multipleSelection1.xbmmc;
      this.formAdd.dwhmc = this.multipleSelection1.dwhmc;
      this.formAdd.zydmmc = this.multipleSelection1.zydmmc;
      this.formAdd.yddh = this.multipleSelection1.yddh;
      this.formAdd.qqhm = this.multipleSelection1.qqhm;
      this.formAdd.lb = this.multipleSelection1.lb;
      this.showExport = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    handleSearch() {
      let data = {
        xm: null,
        xh: null,
        yddh: null,
        shrxm: null,
        dwhList: [],
        zydmList: [],
        fwfxDmList: [],
        kcscList: [],
        xn: "",
        xqm: "",
        zgzt: "0",
        shsjStart: "",
        shsjEnd: "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryPbsqDskList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
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
    cancel() {
      this.$router.push({
        path: "/friendTutor/kcpk",
      });
    },
    save() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.formAdd.lb = this.formAdd.lb = "校级"
          ? "1"
          : (this.multipleSelection1.lb = "院级" ? "0" : "");
        kcpkAdd(this.formAdd).then((res) => {
          this.$message.success("新增成功");
          this.$router.push({
            path: "/friendTutor/kcpk",
          });
        });
      }
    },
    //确认
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
  },
};
</script>
<style lang="scss" scoped>
.borderRed {
  border: 1px solid grey;
  background: #fff;
}
.fullGreen {
  // border:1px solid #005657;
  color: #fff;
  background: #005657;
}
.topHeader {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #005657;
}
.mkHeader {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f1f;
  margin: 15px 0 15px 3px;
}
.redSpan {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #ff0000;
}
::v-deep .grayBg .el-form-item__label {
  background-color: #f0f0f0;
  padding: 5px 10px 5px 0px;
}
.grayBg {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}
.sqList {
  padding: 5px 0px 5px 10px;
  width: 85%;
}
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
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
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
    }
    .passIcon {
      margin-top: 10px;
      background: url("~@/assets/images/passWhite.png") no-repeat;
    }
    .refuseIcon {
      margin-top: 10px;
      background: url("~@/assets/images/refuse.png") no-repeat;
    }
    .backIcon {
      margin-top: 10px;
      background: url("~@/assets/images/back.png") no-repeat;
    }
  }
}
</style>
