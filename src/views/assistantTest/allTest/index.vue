<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="请输入..."
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            @change="selectChange"
            placeholder="请选择查询条件"
          >
            <el-option label="工号" value="1" />
            <el-option label="姓名" value="2" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="getList"
            >查询</el-button
          >
        </el-input>

        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多选择 -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="12">
            <span>工作单位：</span>
            <el-select
              v-model="workPlace"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in gzdwOptions"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select v-model="nj" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item, index) in njOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类<span v-html="'\u3000\u3000'"></span>型：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="category"
                @training="handleCheckAllCategoryChange"
                @checkedTraining="handleCheckedCategoryChange"
              />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="3">所辖培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="pyccOps"
                @training="handleCheckAllpyccChange"
                @checkedTraining="handleCheckedpyccChange"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">评价结果</span>
          <!-- <i class="Updataicon" /> -->
          <div class="yearOption">
            <el-select
              v-model="ndval"
              @change="ndChange"
              style="width: 80px"
              placeholder=""
            >
              <el-option
                v-for="(item, index) in njOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
            ><span>年度</span>
          </div>
        </div>

        <div class="headerRight">
          <div style="margin-right: 15px">{{ this.time }}更新</div>
          <div class="btns borderOrange" @click="Updata">
            <i class="icon setIcon"></i><span class="title">更新</span>
          </div>
          <div class="btns borderOrange" @click="Setting">
            <i class="icon setIcon"></i><span class="title">设置</span>
          </div>
          <div class="btns borderOrange" @click="Export">
            <i class="icon outIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="basicInfoList"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable="custom" />
          <el-table-column prop="lx" label="类型" sortable="custom" />

          <el-table-column
            prop="dwmc"
            label="工作单位"
            min-width="100"
            sortable="custom"
          />
          <el-table-column prop="ssnj" label="年级" sortable="custom" />
          <el-table-column
            prop="pycc"
            label="所辖培养层次"
            min-width="100"
            :show-overflow-tooltip="true"
            sortable="custom"
          />
          <el-table-column prop="xscp" label="学生测评" sortable="custom" />
          <el-table-column prop="thhp" label="同行互评" sortable="custom" />
          <el-table-column prop="dwjd" label="单位鉴定" sortable="custom" />
          <el-table-column prop="xxpj" label="学校评价" sortable="custom" />
          <el-table-column prop="zhpj" label="综合评价分数" sortable="custom" />
        </el-table>
        <pagination
          v-show="total > 0"
          class="pagination"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>

    <!-- 设置对话框 -->
    <el-dialog
      title="设置"
      :visible.sync="showSet"
      width="40%"
      :close-on-click-modal="false"
    >
      <div class="form" style="margin: 20px">
        <el-form :model="formEdit" ref="formEdit" :rules="rules">
          <div class="formtop">
            <el-row :gutter="20">
              <el-col :span="12"><el-form-item label="结果运用设置" /></el-col>
              <el-col :span="12">
                <el-form-item label="适用年度">
                  <span> {{ formEdit.synd }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-table :data="formEdit.mkList" style="width: 100%">
                <el-table-column prop="name" label="模块名称" />
                <el-table-column label="权重比例（百分比）">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="`mkList.${scope.$index}.bl`"
                      :rules="rules.qzbl"
                    >
                      <el-input-number
                        :controls="false"
                        v-model="scope.row.bl"
                        :min="0"
                        :max="100"
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-form-item
                label="有效测评分是按照去掉头部和尾部相应百分比的人次计算所得平均分"
            /></el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="有效测评分百分比设置(学生测评)">
                  <el-input-number
                    :controls="false"
                    style="width: 100px"
                    placeholder="10%"
                    v-model="formEdit.xscpbfb"
                    :min="0"
                    :max="100"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效测评分百分比设置(同行互评)">
                  <el-input-number
                    :controls="false"
                    style="width: 100px"
                    placeholder="10%"
                    :min="0"
                    :max="100"
                    v-model="formEdit.thhpbfb"
                  ></el-input-number>
                </el-form-item> </el-col
            ></el-row>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="setConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导出确认对话框 -->
    <el-dialog title="导出" :visible.sync="showExport" width="30%">
      <span>确认导出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="exportConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CheckboxCom from "../../components/checkboxCom";
import { lookDetail, getGzdw } from "@/api/politicalWork/assistantappoint";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege } from "@/api/class/maintenanceClass";
import { getGrade } from "@/api/assistantWork/listen";
import {
  getFdycpZhcpSz,
  queryZhcpList,
  updateFdycpZhcpSz,
  updateList,
  updateTime,
  exp,
} from "@/api/test/allTest";

export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      rules: {
        qzbl: [
          {
            required: true,
            message: "权重比例不能为空",
            trigger: "blur",
          },
        ],
        xscp: [
          {
            required: true,
            message: "学生测评权重比例不能为空",
            trigger: "blur",
          },
        ],
        thcp: [
          {
            required: true,
            message: "同行互评权重比例不能为空",
            trigger: "blur",
          },
        ],
        dwjd: [
          {
            required: true,
            message: "单位鉴定权重比例不能为空",
            trigger: "blur",
          },
        ],
        xxpj: [
          {
            required: true,
            message: "学校评价权重比例不能为空",
            trigger: "blur",
          },
        ],
      },
      // // 总条数
      total: 0,
      total2: 0,
      showSet: false,
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      gzdwOptions: [],
      njOptions: [],
      category: {
        // 类别
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: "1" },
          { mc: "专职", dm: "0" },
        ],
        isIndeterminate: true,
      },
      pyccOps: {
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      workPlace: [],
      nj: [],
      ndval: "",
      status: {
        // 状态
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "否", dm: 0 },
          { mc: "是", dm: 1 },
        ],
        isIndeterminate: true,
      },
      Sxpycc: [],
      detailGh: "",
      basicInfoList: [],
      multipleSelection: [],
      multipleSelection2: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
        nd: "",
        dwhs: [],
        lxs: [],
        njs: [],
        pyccms: [],
      },
      time: "",
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xm: "",
        gh: "",
        nd: "",
        dwhs: [],
        lxs: [],
        njs: [],
        pyccms: [],
      },

      expArr: [],
      list2: [],
      sfyx: "",
      settingId: "",
      len: 0,
      formEdit: {
        mkList: [
          { name: "学生测评", bl: "10" },
          { name: "同行互评", bl: "10" },
          { name: "单位鉴定", bl: "10" },
          { name: "学校评价", bl: "10" },
        ],
        synd: "",
        thhpbfb: "",
        xscpbfb: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOption();
    this.getCode("dmpyccm");
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    upTime() {
      updateTime({ nd: this.ndval }).then((res) => {
        this.time = res.errmsg;
      });
    },
    Updata() {
      updateList({ nd: this.ndval }).then((res) => {
        this.$message.success(res.errmsg);
        this.upTime();
      });
    },
    Setting() {
      getFdycpZhcpSz({ nd: this.ndval }).then((res) => {
        this.settingId = res.data?.id;
        this.formEdit.mkList[0].bl = res.data?.xscpbl;
        this.formEdit.mkList[1].bl = res.data?.thhpbl;
        this.formEdit.mkList[2].bl = res.data?.dwjdbl;
        this.formEdit.mkList[3].bl = res.data?.xxpjbl;
        this.$forceUpdate();
        this.formEdit.synd = this.ndval;
        this.formEdit.xscpbfb = res.data?.xscpbfb;
        this.formEdit.thhpbfb = res.data?.thhpbfb;
        this.showSet = true;
      });
    },
    setCancel() {
      this.$refs.formEdit.clearValidate();
      this.showSet = false;
    },
    setConfirm() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var total = this.formEdit.mkList.reduce((prev, next) => {
          return prev + Number(next.bl);
        }, 0);
        if (total == 100) {
          let data = {
            dwjdbl: this.formEdit.mkList[3].bl ? this.formEdit.mkList[3].bl : 0,
            id: !!this.settingId ? this.settingId : "",
            nd: this.ndval,
            thhpbfb: this.formEdit.thhpbfb ? this.formEdit.thhpbfb : 0,
            thhpbl: this.formEdit.mkList[1].bl ? this.formEdit.mkList[1].bl : 0,
            xscpbfb: this.formEdit.xscpbfb ? this.formEdit.xscpbfb : 0,
            xscpbl: this.formEdit.mkList[0].bl ? this.formEdit.mkList[0].bl : 0,
            xxpjbl: this.formEdit.mkList[2].bl ? this.formEdit.mkList[2].bl : 0,
          };
          updateFdycpZhcpSz(data).then((res) => {
            this.showSet = false;
          });
        } else {
          this.$message.error(`所有模块权重比例和应该为100%，当前为${total}%`);
        }
      }
    },
    Export() {
      this.showExport = true;
    },
    exportCancel() {
      this.showExport = false;
    },
    exportConfirm() {
      this.showExport = false;
      var data = {
        xm: this.select == 2 ? this.searchVal : "",
        gh: this.select == 1 ? this.searchVal : "",
        pyccms: this.pyccOps.choose,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderPx: this.queryParams.orderPx,
        orderZd: this.queryParams.orderZd,
        njs: this.nj,
        nd: this.ndval,
        lxs: this.category.choose,
        dwhs: this.workPlace,
        ghList: this.expArr,
      };
      exp(data)
        .then((res) => {
          this.downloadFn(res, "综合评价列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
    },
    ndChange() {
      this.getList();
    },
    selectChange(val) {
      this.searchVal = "";
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.Sxpycc = res.data;
              this.$set(this.pyccOps, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    async getOption() {
      this.gzdwOptions = [];
      getGzdw()
        .then((res) => {
          if (res.errcode == "00") {
            this.gzdwOptions = res.data.rows;
          }
        })
        .catch((err) => {
          //this.$message.error(err.errmsg);
        });
      await getGrade().then((response) => {
        // 获取年级列表数据
        this.njOptions = response.data.rows;
        this.ndval = this.njOptions[1];
      });
      this.getList();
      this.upTime();
    },
    //获取数据列表
    getList() {
      var data = {
        xm: this.select == 2 ? this.searchVal : "",
        gh: this.select == 1 ? this.searchVal : "",
        pyccms: this.pyccOps.choose,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderPx: this.queryParams.orderPx,
        orderZd: this.queryParams.orderZd,
        njs: this.nj,
        nd: this.ndval,
        lxs: this.category.choose,
        dwhs: this.workPlace,
      };
      queryZhcpList(data)
        .then((res) => {
          this.basicInfoList = res.data;
          // this.basicInfoList = response.data; // 根据状态码接收数据
          // this.total = response.totalCount; //总条数
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },

    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 类别全选
    handleCheckAllCategoryChange(val) {
      const allCheck = [];
      for (const i in this.category.checkBox) {
        allCheck.push(this.category.checkBox[i].dm);
      }
      this.category.choose = val ? allCheck : [];
      this.queryParams.lbList = this.category.choose;
    },
    // 类别单选
    handleCheckedCategoryChange(value) {
      const checkedCount = value.length;
      this.category.checkAll = checkedCount === this.category.checkBox.length;
      this.category.isIndeterminate =
        checkedCount > 0 && checkedCount < this.category.checkBox.length;
      this.queryParams.lxs = this.category.choose;
    },
    // 性别全选
    handleCheckAllpyccChange(val) {
      const allCheck = [];
      for (const i in this.pyccOps.checkBox) {
        allCheck.push(this.pyccOps.checkBox[i].dm);
      }
      this.pyccOps.choose = val ? allCheck : [];

      this.pyccOps.isIndeterminate = false;

      this.queryParams.pyccms = this.pyccOps.choose;
    },
    // 性别单选
    handleCheckedpyccChange(value) {
      const checkedCount = value.length;
      this.pyccOps.checkAll = checkedCount === this.pyccOps.checkBox.length;
      this.pyccOps.isIndeterminate =
        checkedCount > 0 && checkedCount < this.pyccOps.checkBox.length;

      this.queryParams.pyccms = this.pyccOps.choose;
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.expArr = this.multipleSelection.map((item) => item.gh);
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.list2 = [...val]; // 存储已被勾选的数据
    },
    checkForm() {
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
    //状态全选
    handleCheckAllStatusChange(val) {
      const allCheck = [];
      for (const i in this.status.checkBox) {
        allCheck.push(this.status.checkBox[i].dm);
      }
      this.status.choose = val ? allCheck : [];

      this.status.isIndeterminate = false;

      this.queryParams.sfdbList = this.status.choose;
    },
    // 状态单选
    handleCheckedStatusChange(value) {
      const checkedCount = value.length;
      this.status.checkAll = checkedCount === this.status.checkBox.length;
      this.status.isIndeterminate =
        checkedCount > 0 && checkedCount < this.status.checkBox.length;

      this.queryParams.sfdbList = this.status.choose;
    },

    //点击详情
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantTest/fdyselfTest",
        query: {
          gh: row.gh,
          nd: this.ndval,
          isEdit: 0,
        },
      });
    },

    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
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
          background: url("~@/assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("~@/assets/images/chevronUp.png") no-repeat;
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
        display: flex;
        flex-direction: row;
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        // .Updataicon {
        //   display: inline-block;
        //   vertical-align: middle;
        //   margin-left: 10px;
        //   width: 20px;
        //   height: 20px;
        //   background: url("~@/assets/images/updata.png") no-repeat;
        // }
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

          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .addIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .setIcon {
            margin-top: 10px;
            background: url("~@/assets/images/set.png") no-repeat;
          }
          .outIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
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
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.pagination2 {
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.searchName {
  .inputSelect {
    width: 50%;
  }
}
</style>
