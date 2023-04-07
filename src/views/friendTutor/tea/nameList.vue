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
            placeholder="请选择查询条件"
          >
            <el-option label="工号" value="gh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="联系电话" value="lxdh"></el-option>
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
          <el-col :span="6">
            <span>工作单位：</span>
            <el-select
              v-model="moreIform.dwhList"
              multiple
              collapse-tags
              @change="changeXY"
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
          </el-col>
          <el-col :span="6">
            <span>年<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.njList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in njOps"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">类<span v-html="'\u3000\u3000'"></span>别：</el-col>
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
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学习中心联系人名单</span>
          <el-select
            v-model="moreIform.nd"
            collapse-tags
            @change="handleSearch"
            placeholder="请选择"
            style="width: 90px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allNd"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <span>年度</span>
        </div>
        <div class="headerRight">
          <div class="btns borderRed" @click="showDel">
            <i class="icon outIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">加入</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="gh" label="工号" min-width="110" sortable>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" min-width="85" sortable>
          </el-table-column>
          <el-table-column prop="lx" label="类型" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="dwmc"
            label="工作单位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sxpycc"
            label="所辖培养层次"
            min-width="130"
            sortable
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="zy" label="联系电话" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName" style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
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
    <el-dialog title="加入" :visible.sync="addModal" width="60%">
      <template>
        <div class="search_add">
          <div style="margin: 0px 15px">
            <el-input v-model="xm" placeholder="请输入姓名" clearable />
          </div>
          <div class="btns borderBlue" @click="queryAllXm">
            <span class="title1">查询</span>
          </div>
        </div>
        <div class="mt15">
          <el-table
            :data="addData"
            ref="multipleTable"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
              fixed="left"
            ></el-table-column>
            <el-table-column prop="gh" label="工号" sortable> </el-table-column>
            <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
            <el-table-column prop="lx" label="类型" sortable> </el-table-column>
            <el-table-column prop="dwmc" label="工作单位" sortable>
            </el-table-column>
            <el-table-column
              prop="nj"
              label="年级"
              sortable
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="sxpycc"
              label="所辖培养层次"
              sortable
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </div>
      </template>
      <pagination
        v-show="queryParams2.totalAdd > 0"
        :total="queryParams2.totalAdd"
        :page.sync="queryParams2.pageNum"
        :limit.sync="queryParams2.pageSize"
        @pagination="queryAllXm"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
import {
  queryMdList,
  queryAllXm,
  mdAdd,
  mdDelete,
} from "@/api/friendTutor/audit";
import { getYears } from "@/api/jccy/index";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import CheckboxCom from "../../components/checkboxCom";
export default {
  components: { CheckboxCom },
  data() {
    return {
      AUTHFLAG: false,
      delModal: false,
      searchVal: "",
      select: "",
      isMore: false,

      moreIform: {
        dwhList: [], // 学院下拉框
        njList: [],
        sxpyccList: [],
        nd: "",
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      allNd: [], //年度下拉
      njOps: [],
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        totalAdd: 0,
        orderZd: "",
        orderPx: "",
      },
      dmgbyqrztm: [],
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      delArr: [],
      multipleSelection: [],
      multipleSelection2: [],
      addArr: [],
      addData: [],
      xm: "",
      addModal: false,
      category: {
        // 类别
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "兼职", dm: "兼职" },
          { mc: "专职", dm: "专职" },
        ],
        isIndeterminate: true,
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getYears();
  },

  methods: {
    //获取学年
    getYears() {
      getYears()
        .then((res) => {
          this.allNd = res.data.rows;
          this.moreIform.nd = res.data.rows[0];
          this.handleSearch();
        })
        .catch((err) => {});
      //年级
      getGrade()
        .then((res) => {
          this.njOps = res.data.rows;
        })
        .catch((err) => {});
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        gh: this.select == "gh" ? this.searchVal : null,
        lxdh: this.select == "lxdh" ? this.searchVal : null,
        nd: this.moreIform.nd,
        dwhList: this.moreIform.dwhList,
        sxpyccList: this.training.choose || [],
        lxList: this.category.choose,
        njList: this.moreIform.njList,

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryMdList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    showDetail(row, flag) {
      this.$router.push({
        path: "/politicalwork/detailInfo",
        query: {
          gh: row.gh,
          id: row.date,
          show: flag,
        },
      });
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
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
    // 培养层次单选
    handleCheckedCitiesChangeTraining(value) {
      let checkedCount = value.length;
      this.training.checkAll = checkedCount === this.training.checkBox.length;
      this.training.isIndeterminate =
        checkedCount > 0 && checkedCount < this.training.checkBox.length;
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
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    delCancel() {
      this.delModal = false;
    },
    del() {
      mdDelete(this.delArr).then((res) => {
        this.$message.success("删除成功");
        this.handleSearch();
        this.delModal = false;
      });
    },
    //新增查询所有老师
    queryAllXm() {
      let data = {
        xm: this.xm,
        nd: this.moreIform.nd,
        pageNum: this.queryParams2.pageNum,
        pageSize: this.queryParams2.pageSize,
        orderZd: this.queryParams2.orderZd,
        orderPx: this.queryParams2.orderPx,
      };
      queryAllXm(data)
        .then((res) => {
          this.addData = res.data;
          this.queryParams2.totalAdd = res.totalCount;
        })
        .catch((err) => {});
    },
    //加入
    xinzeng() {
      this.addModal = true;
      this.xm = "";
      this.queryAllXm();
    },
    addCancel() {
      this.addModal = false;
    },
    addConfirm() {
      if (this.multipleSelection2.length > 0) {
        let xhs = [];
        for (let item_row of this.multipleSelection2) {
          xhs.push(item_row.gh);
        }
        let data = {
          xhs: xhs,
          gwId: this.gwId,
          xm: this.xm,
        };
        for (let index = 0; index < this.multipleSelection2.length; index++) {
          this.multipleSelection2[index].nd = this.moreIform.nd;
        }
        mdAdd(this.multipleSelection2)
          .then((res) => {
            this.$message.success("新增成功");
            //查询
            this.addModal = false;
            this.handleSearch();
          })
          .catch((err) => {});
      } else {
        this.$message.error("请勾选数据！");
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.delArr = val.map((item) => item.id);
      this.multipleSelection = val;
    },
    //新增多选
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.addArr = val.map((item) => item.id);
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
.talkRec {
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
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
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .lightIcon {
          margin-top: 9px;
          background: url("~@/assets/assistantPng/delete.png") no-repeat;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #005657;
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            // vertical-align: middle;
          }
        }
        .borderRed {
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
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
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
            background: url("~@/assets/images/passWhite.png") no-repeat;
          }
          .outIcon {
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
.search_add {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .borderBlue {
    color: #fff;
    background: #005657;
    border: 1px solid grey;
  }
  .btns {
    width: 60px;
    margin-right: 20px;
    padding: 0px 12px;
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
  }
}
</style>
