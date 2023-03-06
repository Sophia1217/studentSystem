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
                  ><div>{{ formEdit.gwMainMc }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="岗位性质" prop="gwType" label-width="100px"
                  ><div>{{ formEdit.gwTypeMc }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="用人部门"
                  prop="gwYrbmc"
                  label-width="100px"
                >
                  {{ formEdit.gwYrbmc }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="岗位起止时间"
                  prop="gwTime"
                  label-width="120px"
                  ><div>
                    {{ formEdit.gwStartDate }} 至 {{ formEdit.gwEndDate }}
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学年" prop="xn" label-width="100px">
                  <div>{{ formEdit.xn }}</div>
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
            </el-table-column>
            <el-table-column prop="gwGzdd" label="工作地点" :min-width="200">
            </el-table-column>
            <el-table-column
              prop="gwYgzl"
              label="月工作量(小时)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwYgzsx"
              label="月工资上限(元)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwNjyxc"
              label="年建议薪酬(元)"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column
              prop="gwNzxsrs"
              label="拟招学生人数"
              :min-width="230"
            >
            </el-table-column>
            <el-table-column prop="gwKnss" label="困难生数" :min-width="230">
            </el-table-column>
            <el-table-column prop="gwZdls" label="指导老师" :min-width="200">
            </el-table-column>
            <el-table-column prop="gwLxfs" label="联系方式" :min-width="200">
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
              :readonly="true"
            />
          </el-form-item>

          <el-form-item label="岗位人员要求" prop="gwRyyq">
            <el-input
              type="textarea"
              v-model="formEdit.gwRyyq"
              :rows="5"
              show-word-limit
              maxlength="500"
              :readonly="true"
            />
          </el-form-item>

          <el-form-item label="备注" prop="gwRemark">
            <el-input
              type="textarea"
              v-model="formEdit.gwRemark"
              :rows="5"
              show-word-limit
              maxlength="500"
              :readonly="true"
            />
          </el-form-item>
        </div>
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">岗位人员管理</span>
          </div>
        </div>
      </el-form>
    </div>
    <div class="talk">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="在岗学生信息" name="first">
          <span slot="label">在岗学生信息</span>
        </el-tab-pane>
        <el-tab-pane label="退岗学生信息" name="second">
          <span slot="label">退岗学生信息</span>
        </el-tab-pane>
      </el-tabs>
      <zgstu v-if="activeName == 'first'"></zgstu>
      <tgstu v-if="activeName == 'second'"></tgstu>
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
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryQgzxGwById } from "@/api/dailyBehavior/thriftbumen";
import tgstu from "./tgstu/index.vue";
import zgstu from "./zgstu/index.vue";
export default {
  components: { zgstu, tgstu },
  data() {
    return {
      activeName: "first",
      status: this.$route.query.status,
      formEdit: {},
      detailList: [],
      gwId: "",
      rules: {
        gwMainMc: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" },
        ],
        gwType: [
          { required: true, message: "岗位性质不能为空", trigger: "change" },
        ],
      },
      delModal: false,
    };
  },
  mounted() {
    this.gwId = this.$route.query.gwId;
    this.getDetail();
    this.$bus.$emit("index", this.$route.query.gwId);
  },
  // destroyed() {
  //   this.$bus.$off("index"); //重复调用bus问题  ***
  // },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
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
    getDetail() {
      queryQgzxGwById({ id: this.$route.query.id }).then((res) => {
        // console.log(res);
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
.talk {
  padding: 0 20px;
  background: #fff;
  .tabs {
    background: #fff;
    padding-left: 20px;
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    .tabsicon_ke {
      background: url("~@/assets/images/icon_warning.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
    }
    .tabsicon_quan {
      background: url("~@/assets/images/icon_confirm.png");
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: middle;
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
