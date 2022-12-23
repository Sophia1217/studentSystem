<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <div class="search">
        <span>题目查询<span v-html="'\u3000\u3000'"></span> </span>
        <el-input
          placeholder="请输入查询内容"
          v-model.trim="tmName"
          class="inputSelect"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>
      <el-row>
        <el-col :span="2" style="margin-top: 25px">
          <span>模块筛选<span v-html="'\u3000\u3000'"></span> </span
        ></el-col>
        <el-col :span="15">
          <div style="margin-top: 25px">
            <checkboxCom
              :objProp="training"
              @training="handleCheckAllChangeTraining"
              @checkedTraining="handleCheckedCitiesChangeTraining"
            ></checkboxCom>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">题库列表</span> <i class="Updataicon"></i>
        </div>

        <div class="headerRight">
          <!-- <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导入</span>
          </div> -->
          <div class="btns borderLight" @click="delModal">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="addTest">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :default-sort="{ prop: 'xh', order: 'ascending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            fixed="left"
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column fixed="left" prop="tmMk" label="模块" width="150">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.tmMk"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in options"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                >
                  ></el-option
                >
              </el-select>
            </template></el-table-column
          >
          <div v-for="(item, index) in tableHeader" :key="index">
            <el-table-column
              :prop="item.dm"
              :label="item.mc"
              min-width="100"
              :width="item.width"
              :show-overflow-tooltip="true"
              sortable="custom"
            ></el-table-column>
          </div>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
              </el-button>
              <el-button type="text" size="small" @click="hadleEdit(scope.row)">
                <i class="scopeIncon handledie"></i>
                <span class="handleName">编辑</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="删除确认"
      :visible.sync="delConfirm"
      width="30%"
      :close-on-click-modal="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="delTest"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="题目详情"
      :visible.sync="detailModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <h3 style="margin-left: 25px; font-weight: 700">
          {{ detailALL.tmName }}? ({{ detailALL.tmFz }}分)
        </h3>
        <div v-if="detailALL.tmType == '选择题'">
          <span
            v-for="(item, index) in detailALL.tmxxList"
            style="margin-right: 30px"
            >{{ item.xxPx }}.{{ item.xxWz }} <span v-html="'\u3000'"></span>({{
              item.xxFz
            }}分)</span
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailCancel">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="题目编辑"
      :visible.sync="EditModal"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form ref="detailALL" :model="detailALL" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="模块：" prop="tmMk" :rules="rules.tmMk">
              <el-select
                v-model="detailALL.tmMk"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="题目：" prop="tmName" :rules="rules.tmName">
              <el-input
                v-model="detailALL.tmName"
                style="width: 80%"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <div style="font-size: 16px; margin-top: 5px">
              类型：{{ detailALL.tmType }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="分值：" prop="tmFz" :rules="rules.tmFz">
              <el-input-number
                v-model="detailALL.tmFz"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="面向培养层次："
              prop="tmPyccname"
              :rules="rules.tmPyccname"
            >
              <el-select
                v-model="detailALL.tmPyccList"
                multiple
                ref="selectLabel"
                @change="
                  (item) => {
                    changePycc(item);
                  }
                "
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="适用年度："
              prop="tmYear"
              :rules="rules.tmYear"
            >
              <el-select v-model="detailALL.tmYear" placeholder="请选择">
                <el-option
                  v-for="(ele, index) in options2"
                  :key="index"
                  :label="ele"
                  :value="ele"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="detailALL.tmxxList"
          v-if="detailALL.tmType == '选择题'"
        >
          <el-table-column label="选项文字" width="750" align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom: 15px"
                :prop="`tmxxList.${scope.$index}.xxWz`"
                :rules="rules.xxWz"
              >
                <el-input
                  v-model="scope.row.xxWz"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="选项分值" align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom: 15px"
                :prop="`tmxxList.${scope.$index}.xxFz`"
                :rules="rules.xxFz"
              >
                <el-input
                  v-model="scope.row.xxFz"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
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
        <el-button @click="save">保 存</el-button>
        <el-button @click="editCancel">取消</el-button>
      </span>
    </el-dialog>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="handleSearch"
    />
  </div>
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { queryList, delTest, getDetail, add } from "@/api/test/testSetting";
import { getGrade } from "@/api/class/maintenanceClass";
export default {
  components: { CheckboxCom },
  data() {
    return {
      options: [],
      options1: [],
      options2: [],
      detailModal: false,
      detailALL: {},
      EditModal: false,
      delArr: [],
      delConfirm: false,
      tmName: "",
      rules: {
        xxWz: [
          {
            required: true,
            message: "选项文字不能为空",
            trigger: "blur",
          },
        ],
        xxFz: [
          {
            required: true,
            message: "选项分值不能为空",
            trigger: "blur",
          },
        ],
        tmName: [
          {
            required: true,
            message: "题目不能为空",
            trigger: "blur",
          },
        ],
        tmFz: [
          {
            required: true,
            message: "分值不能为空",
            trigger: "blur",
          },
        ],
        tmPyccname: [
          {
            required: true,
            message: "培养层次不能为空",
            trigger: "blur",
          },
        ],
        tmMk: [
          {
            required: true,
            message: "模块不能为空",
            trigger: "blur",
          },
        ],
        tmYear: [
          {
            required: true,
            message: "适应年度不能为空",
            trigger: "blur",
          },
        ],
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      dynamicModal: false,
      tableHeader: [
        { dm: "tmName", mc: "题目", width: "520" },
        { dm: "tmPyccname", mc: "培养层次" },
        { dm: "tmYear", mc: "适用年度" },
        { dm: "tmFz", mc: "分值" },
      ],
      tableData: [],
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.getCode("dmtmszmk");
    this.getAllGrade(); //年级
    this.getCode("dmpyccm");
    this.handleSearch();
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  activated() {
    this.handleSearch();
  },
  methods: {
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.detailALL.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    changePycc(item) {
      var newArray = []; //新数组
      var j = 0;
      //查找符合条件值并存入新数组
      for (let i in this.options1) {
        for (var x = 0; x < item.length; x++) {
          if (this.options1[i].dm == item[x]) {
            newArray[j++] = this.options1[i].mc;
          }
        }
      }
      this.detailALL.tmPyccname = newArray;
    },
    editCancel() {
      this.EditModal = false;
    },
    async save() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var arr = [];
        var arr1 = [];
        this.detailALL.tmPycc = this.detailALL.tmPyccList;
        arr.push(this.detailALL.id);
        arr1.push(this.detailALL);
        await delTest({ ids: arr }).then((res) => {});
        await add(arr1).then((res) => {
          this.$message.success("编辑成功");
          this.EditModal = false;
          this.handleSearch();
        });
      }
    },
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.options2 = res.data.rows;
        })
        .catch((err) => {});
    },
    jia(row, index) {
      var obj = { xxFz: "", xxWz: "" };
      this.detailALL.tmxxList.push(obj);
    },
    jian(row, index) {
      this.detailALL.tmxxList.splice(index, 1);
    },
    detailCancel() {
      this.detailModal = false;
    },
    hadleDetail(row) {
      let data = {
        id: row.id,
        tmMk: this.training.choose,
        tmName: this.tmName,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      getDetail(data).then((res) => {
        this.detailModal = true;
        this.detailALL = res.data;
      });
    },
    hadleEdit(row) {
      let data = {
        id: row.id,
        tmMk: this.training.choose,
        tmName: this.tmName,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      getDetail(data).then((res) => {
        this.EditModal = true;
        this.detailALL = res.data;
      });
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmtmszmk":
              this.$set(this.training, "checkBox", res.data);
              this.options = res.data;
              break;
            case "dmpyccm":
              this.options1 = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 查询
    handleSearch() {
      let data = {
        tmMk: this.training.choose,
        tmName: this.tmName,
        pageNum: this.queryParams.pageNum,
        tmPycc: "",
        tmYear: "",
        pageSize: this.queryParams.pageSize,
        limitSql: "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    addTest() {
      this.$router.push({
        path: "/assistantTest/stuTest/testSettingAdd",
      });
    },
    // 培养层次全选
    handleCheckAllChangeTraining(val) {
      let allCheck = [];
      for (let i in this.training.checkBox) {
        allCheck.push(this.training.checkBox[i].dm);
      }
      this.training.choose = val ? allCheck : [];

      this.training.isIndeterminate = false;
    },
    delCance() {
      this.delConfirm = false;
    },
    delModal() {
      this.delConfirm = true;
    },
    delTest() {
      delTest({ ids: this.delArr }).then((res) => {
        this.handleSearch();
        this.delConfirm = false;
      });
    },
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
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
  },
};
</script>

<style lang="scss" scoped>
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
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.expandOpen {
  width: 80%;
  height: 100px;
  overflow: hidden;
  padding: 10px;
  margin-left: -10px;
}
.expandClose {
  width: 80%;
  height: 310px;
}

.manStudentStyle {
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
      .inputSelect {
        width: 30%;
      }
    }
    .search1 {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      align-items: center;
      background: #fff;
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
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

        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          // vertical-align: middle;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .btns2 {
          margin-left: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
        }
      }
      .headerRight {
        display: flex;
        .dropDown {
          margin-right: 20px;
        }
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
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
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
    .lct {
      background: url("~@/assets/dangan/lct.png");
    }
    .noflag {
      color: #ccc;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
}
</style>
