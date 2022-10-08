<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="查询条件"
          >
            <el-option label="工号" value="gh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="课程名称" value="kcmc"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="3"> 工作单位 ： </el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-select
                v-model="moreIform.xydm"
                multiple
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
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">岗位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :obj-prop="position"
                @training="positionAll"
                @checkedTraining="positionCheck"
              />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类型：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="Type"
                @training="TypeAll"
                @checkedTraining="TypeCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="8">
            <span>开课学年：</span>
            <el-select
              v-model="moreIform.kkxn"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in kkxn"
                :key="item.dm"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>开课学期：</span>
            <el-select
              v-model="moreIform.kkxq"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in kkxq"
                :key="item.id"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">思政课程授课记录列表</span>
          <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon blueIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue">
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
          <div class="btns borderOrange" @click="daochu">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderLight" @click="del">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="addClass">
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
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="gh" label="工号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="gzdw" label="工作单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwmc" label="岗位" sortable="custom">
          </el-table-column>
          <el-table-column prop="lxmc" label="类型" sortable="custom">
          </el-table-column>
          <el-table-column prop="kcmc" label="课程名称" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="kxxn"
            label="开课学年"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="kxxq"
            label="开课学期"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="xs"
            label="学时"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="rs"
            label="人数"
            sortable="custom"
          ></el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog title="新增思政课程" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-form-item
            label="授课人员"
            :label-width="formLabelWidth"
            prop="xm"
          >
            <el-autocomplete
              v-model="form.xm"
              :fetch-suggestions="querySearch"
              style="width: 520px"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
              size="small"
            ></el-autocomplete>
            <!-- <el-input
              v-model="form.xm"
              style="width: 520px"
              placeholder="请输入"
            ></el-input> -->
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item
            label="课程名称"
            :label-width="formLabelWidth"
            prop="kcmc"
          >
            <el-input
              v-model="form.kcmc"
              style="width: 520px"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item
              label="开课时间"
              :label-width="formLabelWidth"
              prop="kxxn"
            >
              <el-select
                v-model="form.kxxn"
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in kkxn"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option> </el-select></el-form-item
          ></el-col>
          <el-col :span="10">
            <el-form-item
              label="学期"
              :label-width="formLabelWidth"
              prop="kxxq"
            >
              <el-select
                v-model="form.kxxq"
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in kkxq"
                  :key="item.id"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option> </el-select></el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item
              label="课程学时"
              :label-width="formLabelWidth"
              prop="xs"
            >
              <el-input
                placeholder="请输入"
                v-model="form.xs"
                style="width: 240px"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="10">
            <el-form-item label="人数" :label-width="formLabelWidth" prop="rs">
              <el-input
                v-model="form.rs"
                placeholder="请输入"
                style="width: 180px"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal(form)">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import {
  querySelect,
  add,
  expor,
  mbDown,
  del,
  queryList,
} from "@/api/assistantWork/sizheng";
import { getToken } from "@/utils/auth";
import { getCollege } from "@/api/class/maintenanceClass";
import { getGw } from "@/api/politicalWork/basicInfo";
import { getXmXgh } from "@/api/assistantWork/sizheng";
export default {
  name: "sizheng",
  components: { CheckboxCom },
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
      form: {
        rs: "",
        xm: "",
        gh: "20040710",
        kcmc: "",
        kxxq: "",
        kxxn: "",
        xs: "",
      },
      rules: {
        xm: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"],
          },
          {
            min: 2,
            message: "长度在 2 到 5 个字符",
            trigger: ["blur", "change"],
          },
        ],
        rs: [
          {
            required: true,
            message: "请选择人数",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(0|[1-9][0-9]*)$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
        kcmc: [
          {
            required: true,
            message: "请输入开课名称",
            trigger: ["blur", "change"],
          },
        ],
        kxxq: [
          {
            required: true,
            message: "请输入开课学期",
            trigger: ["blur", "change"],
          },
        ],
        kxxn: [
          {
            required: true,
            message: "请输入开课时间",
            trigger: ["blur", "change"],
          },
        ],
        xs: [
          {
            required: true,
            message: "请输入学时",
            trigger: ["blur", "change"],
          },
          {
            pattern: /^(0|[1-9][0-9]*)$/,
            message: "请输入数字",
            trigger: "blur",
          },
        ],
      },
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdySzkcs/import",
      dialogFormVisible: false,

      formLabelWidth: "120px",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        xydm: [],
        kkxq: [],
        kkxn: [],
      },
      allDwh: [], // 学院下拉框
      kkxn: [],
      kkxq: [],
      position: {
        // 岗位：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      Type: {
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      multipleSelection: [],
      addParams: {},
    };
  },

  mounted() {
    this.handleSearch();
    this.querySelect();
    this.getAllCollege();
    this.getGwList();
  },

  methods: {
    handleSelect(item) {
      this.addParams = item;
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res.data;
          resultNew = result.map((ele) => {
            return {
              value: `${ele.xm}(${ele.gh})`,
              label: ele.xm,
              xm: ele.gh,
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
    cancelModal(form) {
      this.dialogFormVisible = false;
      this.form = {};
    },

    addData() {
      var FdySzkcskEntityReq = {
        rs: this.form.rs,
        xm: this.addParams.label,
        gh: this.addParams.xm,
        kcmc: this.form.kcmc,
        kxxq: this.form.kxxq,
        kxxn: this.form.kxxn,
        xs: this.form.xs,
      };
      add(FdySzkcskEntityReq).then((res) => {
        this.dialogFormVisible = false;
        this.form = {};
      });
    },
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "思政模板下载", "xlsx");
      });
    },
    daochu() {
      var idList = [];
      this.multipleSelection.map((item) => idList.push(item.id));
      var data = {
        gh: this.select == "gh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        kcmc: this.select == "kcmc" ? this.searchVal : null,
        gzdwhList: this.moreIform.xydm || [],
        kkxnList: this.moreIform.kkxn || [],
        kxxqList: this.moreIform.kkxq || [],
        gwList: this.position.choose || [],
        lxList: this.Type.choose || [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.multipleSelection.length > 0) {
        expor({ idList: idList }).then((res) =>
          this.downloadFn(res, "思政課程授課列表下载", "xlsx")
        );
      } else {
        expor(data).then((res) =>
          this.downloadFn(res, "思政課程授課列表下载", "xlsx")
        );
      }
    },
    del() {
      var arr = [];
      this.multipleSelection.map((item) => arr.push(item.id));
      del(arr).then((res) => {
        this.handleSearch();
      });
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    getGwList() {
      getGw().then((res) => {
        this.position.checkBox = res.data.rows;
      });
    },
    querySelect() {
      //0类型  1学年 2学期
      var queryType0 = "0";
      var queryType1 = "1";
      var queryType2 = "2";
      querySelect(queryType0).then((res) => {
        this.Type.checkBox = res.data;
      });
      querySelect(queryType1).then((res) => {
        this.kkxn = res.data;
      });
      querySelect(queryType2).then((res) => {
        this.kkxq = res.data;
      });
    },
    addClass() {
      this.dialogFormVisible = true;
    },
    changeSelect() {
      this.searchVal = "";
    },
    positionAll(val) {
      const allCheck = [];
      for (const i in this.position.checkBox) {
        allCheck.push(this.position.checkBox[i].dm);
      }
      this.position.choose = val ? allCheck : [];

      this.position.isIndeterminate = false;
    },
    positionCheck(value) {
      const checkedCount = value.length;
      this.position.checkAll = checkedCount === this.position.checkBox.length;
      this.position.isIndeterminate =
        checkedCount > 0 && checkedCount < this.position.checkBox.length;
    },
    TypeAll(val) {
      const allCheck = [];
      for (const i in this.Type.checkBox) {
        allCheck.push(this.Type.checkBox[i].dm);
      }
      this.Type.choose = val ? allCheck : [];
      this.Type.isIndeterminate = false;
    },
    TypeCheck(value) {
      const checkedCount = value.length;
      this.Type.checkAll = checkedCount === this.Type.checkBox.length;
      this.Type.isIndeterminate =
        checkedCount > 0 && checkedCount < this.Type.checkBox.length;
    },

    // 查询
    handleSearch() {
      let data = {
        gh: this.select == "gh" ? this.searchVal : null,
        xm: this.select == "xm" ? this.searchVal : null,
        kcmc: this.select == "kcmc" ? this.searchVal : null,
        gzdwhList: this.moreIform.xydm || [],
        kxxnList: this.moreIform.kkxn || [],
        kxxqList: this.moreIform.kkxq || [],
        gwList: this.position.choose || [],
        lxList: this.Type.choose || [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
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
    //是否在校：全选
    inSchoolAll(val) {
      let allCheck = [];
      for (let i in this.inSchool.checkBox) {
        allCheck.push(this.inSchool.checkBox[i].dm);
      }
      this.inSchool.choose = val ? allCheck : [];

      this.inSchool.isIndeterminate = false;
    },
    // 是否在校：单选
    inSchoolCheck(value) {
      let checkedCount = value.length;
      this.inSchool.checkAll = checkedCount === this.inSchool.checkBox.length;
      this.inSchool.isIndeterminate =
        checkedCount > 0 && checkedCount < this.inSchool.checkBox.length;
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
    // 多选
    handleSelectionChange(val) {
      console.log("val", val);
      this.multipleSelection = val;
    },
    //排序
    changeTableSort(column) {
      //console.log(1);
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.talkRec {
  .el-dialog:not(.is-fullscreen) {
    margin-top: 6vh !important;
    height: 400px;
    width: 800px;
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
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
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
      .elSelect {
        width: 110px;
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
          background: url("../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../assets/images/chevronUp.png") no-repeat;
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
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("../../../assets/images/updata.png") no-repeat;
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
        }
      }
    }
  }
}
</style>
