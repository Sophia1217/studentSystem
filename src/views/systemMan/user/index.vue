<template>
  <div class="manUser">
    <div class="searchWrap">
      <div class="search">
        <el-input placeholder="请输入" v-model="searchVal" class="inputSelect">
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="学号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="单位" value="3"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="2">单 位：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="learnHe"
                @training="learnHeAll"
                @checkedTraining="learnHeCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" class="mt15">
          <el-col :span="2">角<span v-html="'\u3000\u3000'"></span>色：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                label="roleId"
                name="roleName"
                :objProp="studentStatus"
                @training="studentStatusAll"
                @checkedTraining="studentStatusCheck"
              >
              </checkboxCom>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="2">性 别：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="ethnic"
                @training="ethnicAll"
                @checkedTraining="ethnicCheck"
              ></checkboxCom>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">用户列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight" v-show="AUTHFLAG">
          <el-dropdown split-button @command="handleCommand">
            <span class="el-dropdown-link"> 用户状态控制 </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="open">批量启用</el-dropdown-item>
              <el-dropdown-item command="close">批量关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
          <el-table-column prop="userId" label="学工号" sortable>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
          <el-table-column prop="dwmc" label="单位" sortable> </el-table-column>
          <el-table-column prop="roleNames" label="角色" sortable>
          </el-table-column>
          <el-table-column prop="roleState" label="用户状态" sortable>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isUse"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                @change="onSwitchChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handlePermiss(scope.row)"
                v-show="AUTHFLAG"
              >
                <i class="scopeIncon handleEdit"></i>
                <span class="handleName">数据权限</span>
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
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import {
  queryLoginUserDataAuth,
  queryUserDataAuth,
  queryUserPageList,
  disableUser,
} from "@/api/systemMan/user";
import { queryRoleList } from "@/api/systemMan/role";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "user",
  components: { CheckboxCom },
  data() {
    return {
      searchVal: "",
      select: "",
      isMore: false,
      learnHe: {
        //单位：：
        checkAll: false,
        choose: [],
        checkBox: [
          //   { label: "软件学院", val: 1 },
          //   { label: "设计学院", val: 2 },
          //   { label: "文学院", val: 3 },
          //   { label: "理学院", val: 4 },
          //   { label: "工业设计", val: 5 },
          //   { label: "通信工程", val: 6 },
          //   { label: "电子信息", val: 7 },
          //   { label: "建筑工程", val: 8 },
          //   { label: "统计学", val: 9 },
          //   { label: "工业设计", val: 10 },
          //   { label: "统计学", val: 11 },
        ],
        isIndeterminate: false,
      },
      studentStatus: {
        // 角色：
        checkAll: false,
        choose: [],
        checkBox: [
          //   { label: "校级领导用户", val: 1 },
          //   { label: "业务部门人员", val: 2 },
          //   { label: "培养单位负责人", val: 3 },
          //   { label: "培养单位本研学生工作负责人", val: 4 },
          //   { label: "辅导员", val: 5 },
        ],
        isIndeterminate: false,
      },
      ethnic: {
        // 姓别
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: false,
      },
      tableData: [],
      multipleSelection: [],
      checkboxWrap: [],
      AUTHFLAG: false,
      queryParams: {
        orderZd: "",
        orderPx: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG; //
    // this.handleSearch();
    this.getCode("dmxbm"); // 获取性别
    this.getqueryRoleList(); // 获取角色
    // this.getOrg(); // 获取单位
  },

  activated() {
    this.getList();
  },
  methods: {
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    // 获取单位
    getOrg() {
      let data = {
        userId: this.$store.getters.userId,
        roleId: this.$store.getters.roleId,
        type: "0",
      };
      queryDataAuth(data)
        .then((res) => {
          // console.log('操作人返回学院列表',res);
          var resData = res.data.rows || [];
          for (let x = 0; x < resData.length; x++) {
            resData[x].dm = resData[x].dwdm;
            resData[x].mc = resData[x].dwmc;
          }
          this.$set(this.learnHe, "checkBox", resData);
        })
        .catch((err) => {
          // console.log('操作人返回学院列表失败',err,data);
        });
    },
    // 查询性别代码
    getCode(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxbm":
              this.$set(this.ethnic, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },
    // 获取用户角色
    getqueryRoleList() {
      let data = { roleId: this.$store.getters.roleId };
      queryRoleList(data)
        .then((res) => {
          var checkboxWrap = res.data.rows || [];
          for (let index = 0; index < checkboxWrap.length; index++) {
            const element = checkboxWrap[index];
            element.dm = element.roleId;
            element.mc = element.roleName;
          }
          this.$set(this.studentStatus, "checkBox", res.data.rows);
        })
        .catch((res) => {});
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 获取数据
    getList() {
      var data = {
        // userId: "2005690002", // 用户Id
        userId: this.$store.getters.userId, // 用户Id
        // roleId: "01", //当前人
        roleId: this.$store.getters.roleId, //当前人
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.select == 1) {
        // 学号
        data.gh = this.searchVal;
      } else if (this.select == 2) {
        // 姓名
        data.xm = this.searchVal;
      } else if (this.select == 3) {
        // 单位
        data.dwmc = this.searchVal;
      }
      // var xbsz = this.ethnic.choose || [];
      // data.sexTypes = xbsz.join(",");

      var jssz = this.studentStatus.choose || [];
      data.childRoleIds = jssz.join(",");

      // var dwsz = this.learnHe.choose || [];
      // data.organizationCodes = dwsz.join(",");

      queryUserPageList(data)
        .then((res) => {
          var rows = res.rows || [];
          for (let index = 0; index < rows.length; index++) {
            const element = rows[index];
            element.isUse = element.isUse == "0" ? true : false;
            element.roleNames ? () => {} : (element.roleNames = "校友");
          }
          this.tableData = rows;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 角 色全选
    studentStatusAll(isAll) {
      let allCheck = [];
      for (let i in this.studentStatus.checkBox) {
        allCheck.push(this.studentStatus.checkBox[i].roleId);
      }
      this.studentStatus.choose = isAll ? allCheck : [];
      this.studentStatus.checkAll = isAll;
      //   console.log(this.studentStatus.choose, "全选",isAll,allCheck);
      this.studentStatus.isIndeterminate = false;
    },
    // 角 色单选
    studentStatusCheck(value) {
      let checkedCount = value.length;
      this.studentStatus.checkAll =
        checkedCount === this.studentStatus.checkBox.length;
      this.studentStatus.isIndeterminate =
        checkedCount > 0 && checkedCount < this.studentStatus.checkBox.length;
      //   console.log(this.studentStatus.choose, "单选");
    },
    // // 性 别全选
    // ethnicAll(val) {
    //   let allCheck = [];
    //   for (let i in this.ethnic.checkBox) {
    //     allCheck.push(this.ethnic.checkBox[i].dm);
    //   }
    //   this.ethnic.choose = val ? allCheck : [];
    // //   console.log(this.ethnic.choose, "全选");
    //   this.ethnic.isIndeterminate = false;
    // },
    // // 性 别单选
    // ethnicCheck(value) {
    //   let checkedCount = value.length;
    //   this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
    //   this.ethnic.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
    // //   console.log(this.ethnic.choose, "单选",value);
    // },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   console.log(this.multipleSelection);
    },

    handleCommand(command) {
      //   this.$message("click on item " + command);

      var selectedArr = this.multipleSelection || [];
      if (selectedArr.length == 0) {
        this.$message({
          message: "请至少选择一个用户",
          type: "warning",
        });
        return;
      }
      var userArr = [];
      for (let index = 0; index < selectedArr.length; index++) {
        const element = selectedArr[index];
        userArr.push(element.userId);
      }

      let param = {
        userIdList: userArr,
        isUse: command == "open" ? "0" : "1",
      };
      disableUser(param)
        .then((res) => {
          this.getList();
        })
        .catch(() => {});
    },

    // 用户状态改变
    onSwitchChange(user) {
      let param = {
        userIdList: [user.userId],
        isUse: user.isUse ? "0" : "1",
      };
      disableUser(param)
        .then((res) => {})
        .catch(() => {
          user.isUse = !user.isUse;
        });
    },
    // 数据权限
    handlePermiss(row) {
      var ids = row.roleIds || "";
      var a = ids.split(",") || [];
      var c = [];
      for (let x = 0; x < a.length; x++) {
        var item = a[x] || "";
        if (typeof item == "string" && item.length > 0 && item != "01") {
          c.push(item);
        }
      }
      var b = c.toString() || "";
      this.$router.push({
        path: "/systems/dataPermis",
        query: {
          testTree: this.treeData,
          roleId: b,
          userId: row.userId,
          xm: row.xm,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.manUser {
  background-color: #fff;
  .mt15 {
    margin-top: 15px;
  }

  .greentColor {
    color: #005657;
  }

  .searchWrap {
    background: #fff;
    padding: 20px;

    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #fff;

      .searchBtn {
        background: #005657;
        color: white;
      }

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
    // background: red;
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

        .borderBlue {
          border: 1px solid #005657;
          color: #fff;
          background: #005657;
        }

        .borderOrange {
          border: 1px solid #005657;
          color: #005657;
          background: #fff;
        }

        .btns {
          margin-right: 15px;
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

          .blueIcon {
            background: url("~@/assets/images/export2.png") no-repeat;
          }

          .orangeIcon {
            background: url("~@/assets/images/dataN.png") no-repeat;
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

  .checkboxItem {
    ::v-deep .el-checkbox {
      display: block !important;
    }
  }
}
</style>
