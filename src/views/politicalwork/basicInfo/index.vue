<template>
  <div class="basicInfoStyle">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="可输入多个查询条件，以半角空格区分"
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            placeholder="查询条件"
            @change="clear"
          >
            <el-option label="工号" value="gh" />
            <el-option label="姓名" value="xm" />
            <el-option label="身份证件号" value="sfzjh" />
            <el-option label="移动电话" value="yddh" />
            <el-option label="籍贯" value="jg" />
            <el-option label="毕业院校" value="byyx" />
            <el-option label="专业背景" value="zybj" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <!-- 更多分类按钮 -->
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多分类下拉checkbox -->
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-row :gutter="20" class="mt15">
            <el-col :span="3">性 别：</el-col>
            <el-col :span="20">
              <div class="checkbox">
                <checkboxCom
                  :obj-prop="gender"
                  @training="genderAll"
                  @checkedTraining="genderCheck"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mt15">
            <el-col :span="3">民 族：</el-col>
            <el-col :span="20">
              <div class="checkbox">
                <checkboxCom
                  :obj-prop="ethnic"
                  @training="ethnicAll"
                  @checkedTraining="ethnicCheck"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mt15">
            <el-col :span="3">政治面貌：</el-col>
            <el-col :span="20">
              <div class="checkbox">
                <checkboxCom
                  :obj-prop="politica"
                  @training="politicaAll"
                  @checkedTraining="politicaCheck"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mt15">
            <el-col :span="3">工作单位：</el-col>
            <el-col :span="20">
              <div class="checkbox">
                <checkboxCom
                  :obj-prop="workPlace"
                  @training="workPlaceAll"
                  @checkedTraining="workPlaceCheck"
                />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="mt15">
            <el-col :span="3">岗 位：</el-col>
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
        </el-row>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">政工干部列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderGreen">

            <i class="icon greenIcon" /><span class="title">导入</span>
          </div> -->
          <div class="btns borderGreen" @click="handleExport">
            <!-- <div class="btns borderGreen" @click="handleExport"> -->
            <i class="icon greenIcon" /><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <el-table-column prop="xbm" label="性别" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.xbm == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="lxdh" label="联系方式" sortable />
          <el-table-column prop="gzdw" label="工作单位" sortable />
          <el-table-column prop="zgxl" label="最高学历" sortable />
          <el-table-column prop="zgxlbyxx" label="最高学历毕业学校" sortable />
          <el-table-column prop="zybj" label="专业背景" sortable />
          <el-table-column prop="gw" label="职务" sortable />
          <el-table-column prop="cjgzsj" label="参加工作时间" sortable />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams.total > 0"
          class="pagination"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleSearch"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  getPoliticalWorkList,
  getCodeInfoByEnglish,
  exportBasicInfo,
  getListWorkPlace,
} from "@/api/politicalWork/basicInfo";
import CheckboxCom from "../../components/checkboxCom";

export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      queryParams: {
        xm: "",
        gh: "",
        sfzjh: "",
        yddh: "",
        jg: "",
        byyx: "",
        zybj: "",
        genderList: [],
        mzList: [],
        zzmmLixt: [],
        dwmcList: [],
        gwList: [],
        pageNum: 1,
        total: 0,
        pageSize: 10,
      },
      searchVal: "",
      select: "",
      isMore: false,
      selectedCheckbox: [],
      tableData: [],
      multipleSelection: [],
      gender: {
        // 性别
        checkAll: false,
        choose: [],
        // checkBox: [{ label: '男', val: 1 }, { label: '女', val: 2 }],
        checkBox: [],
        isIndeterminate: true,
      },
      position: {
        // 岗位：
        checkAll: false,
        choose: [],
        checkBox: [
          { mc: "学院书记", dm: "学院书记" },
          { mc: "学院副书记", dm: "学院副书记" },
          { mc: "组织员", dm: "组织员" },
          { mc: "辅导员", dm: "辅导员" },
          { mc: "班主任", dm: "班主任" },
          { mc: "导师", dm: "导师" },
        ],
        isIndeterminate: true,
      },
      workPlace: {
        // 工作单位
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      ethnic: {
        // 民 族
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      politica: {
        // 政治面貌：
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
    };
  },
  mounted() {
    this.getCode("dmxbm"); // 性别
    this.getCode("dmmzm"); // 民 族
    this.getCode("dmzzmmm"); // 政治面貌
    this.getListWorkPlace("dmdwmc"); // 工作单位  上面三个字段是用码表给的返回值，工作单位是用的公共的调学院的接口
    // this.getListRole('dmgw') // 岗位  岗位去调用查询角色列表的接口
    this.handleSearch();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    // getPosition(data) {
    //   this.getListRole(data)
    // },
    getWorkPlace(data) {
      this.getListWorkPlace(data);
    },
    // getListRole(paramsData) {
    //   const data = { listRole: paramsData }
    //   getListRole(data)
    //     .then((res) => {
    //       console.log('res', res)
    //       this.$set(this.position, 'checkBox', res.data)
    //     })
    //     .catch((err) => {})
    // },
    getListWorkPlace(paramsData) {
      const data = { listWorkPlace: paramsData };
      getListWorkPlace(data)
        .then((res) => {
          console.log("res", res);
          this.$set(this.workPlace, "checkBox", res.data.rows);
        })
        .catch((err) => {});
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          console.log("res", res);
          switch (paramsData) {
            case "dmmzm":
              this.$set(this.ethnic, "checkBox", res.data);
              break;
            case "dmzzmmm":
              this.$set(this.politica, "checkBox", res.data);
              break;
            case "dmxbm":
              this.$set(this.gender, "checkBox", res.data);
              break;
          }
        })
        .catch((err) => {});
    },

    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? 1 : 0; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    // 查询
    handleSearch() {
      // const data = {
      //   xm: this.select == 'xm' ? this.searchVal : '',
      //   gh: this.select == 'gh' ? this.searchVal : '',
      //   sfzjh: this.select == 'sfzjh' ? this.searchVal : '',
      //   yddh: this.select == 'yddh' ? this.searchVal : '',
      //   zybj: this.select == 'zybj' ? this.searchVal : '',
      //   jg: this.select == 'jg' ? this.searchVal : '',
      //   byyx: this.select == 'byyx' ? this.searchVal : '',
      //   // jg: this.queryParams.jg,
      //   // byyx: this.queryParams.byyx,
      //   // zybj: this.queryParams.zybj,
      //   pageNum: this.queryParams.pageNum,
      //   pageSize: this.queryParams.pageSize
      // }
      this.queryParams.xm = this.select == "xm" ? this.searchVal : "";
      this.queryParams.gh = this.select == "gh" ? this.searchVal : "";
      this.queryParams.sfzjh = this.select == "sfzjh" ? this.searchVal : "";
      this.queryParams.yddh = this.select == "yddh" ? this.searchVal : "";
      this.queryParams.zybj = this.select == "zybj" ? this.searchVal : "";
      this.queryParams.jg = this.select == "jg" ? this.searchVal : "";
      this.queryParams.byyx = this.select == "byyx" ? this.searchVal : "";
      this.queryParams.genderList = this.gender.choose;
      this.queryParams.mzList = this.ethnic.choose;
      this.queryParams.zzmmLixt = this.politica.choose;
      this.queryParams.dwmcList = this.workPlace.choose;
      this.queryParams.gwList = this.position.choose;
      getPoliticalWorkList(this.queryParams)
        .then((res) => {
          this.tableData = res.stafflistRes;
          this.queryParams.total = res.count;
        })
        .catch((err) => {});
      console.log(this.ethnic, "this.ethnic");
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 性别全选
    genderAll(val) {
      const allCheck = [];
      for (const i in this.gender.checkBox) {
        allCheck.push(this.gender.checkBox[i].dm);
      }
      this.gender.choose = val ? allCheck : [];
      console.log(this.gender.choose, "全选");
      this.gender.isIndeterminate = false;
      this.handleSearch();
    },
    // 性别单选
    genderCheck(value) {
      const checkedCount = value.length;
      this.gender.checkAll = checkedCount === this.gender.checkBox.length;
      this.gender.isIndeterminate =
        checkedCount > 0 && checkedCount < this.gender.checkBox.length;
      // console.log(this.training.choose, "单选");
      this.handleSearch();
    },
    // 岗位全选
    positionAll(val) {
      const allCheck = [];
      for (const i in this.position.checkBox) {
        allCheck.push(this.position.checkBox[i].dm);
      }
      this.position.choose = val ? allCheck : [];
      console.log(this.position.choose, "全选");
      this.position.isIndeterminate = false;
      this.handleSearch();
    },
    // 岗位单选
    positionCheck(value) {
      const checkedCount = value.length;
      this.position.checkAll = checkedCount === this.position.checkBox.length;
      this.position.isIndeterminate =
        checkedCount > 0 && checkedCount < this.position.checkBox.length;
      console.log(this.position.choose, "单选");
      this.handleSearch();
    },
    // 工作单位全选
    workPlaceAll(val) {
      const allCheck = [];
      for (const i in this.workPlace.checkBox) {
        allCheck.push(this.workPlace.checkBox[i].dm);
      }
      this.workPlace.choose = val ? allCheck : [];
      console.log(this.workPlace.choose, "全选");
      this.workPlace.isIndeterminate = false;
      this.handleSearch();
    },
    // 工作单位单选
    workPlaceCheck(value) {
      const checkedCount = value.length;
      this.workPlace.checkAll = checkedCount === this.workPlace.checkBox.length;
      this.workPlace.isIndeterminate =
        checkedCount > 0 && checkedCount < this.workPlace.checkBox.length;
      console.log(this.workPlace.choose, "单选");
      this.handleSearch();
    },
    // 民 族全选
    ethnicAll(val) {
      const allCheck = [];
      for (const i in this.ethnic.checkBox) {
        allCheck.push(this.ethnic.checkBox[i].dm);
      }
      this.ethnic.choose = val ? allCheck : [];
      console.log(this.ethnic.choose, "全选");
      this.ethnic.isIndeterminate = false;
      this.handleSearch();
    },
    clear() {
      this.searchVal = "";
    },
    // 民 族单选
    ethnicCheck(value) {
      const checkedCount = value.length;
      this.ethnic.checkAll = checkedCount === this.ethnic.checkBox.length;
      this.ethnic.isIndeterminate =
        checkedCount > 0 && checkedCount < this.ethnic.checkBox.length;
      console.log(this.ethnic.choose, "单选");
      this.handleSearch();
    },
    // 政治面貌：全选
    politicaAll(val) {
      const allCheck = [];
      for (const i in this.politica.checkBox) {
        allCheck.push(this.politica.checkBox[i].dm);
      }
      this.politica.choose = val ? allCheck : [];
      console.log(this.politica.choose, "全选");
      this.politica.isIndeterminate = false;
      this.handleSearch();
    },
    // 政治面貌：单选
    politicaCheck(value) {
      const checkedCount = value.length;
      this.politica.checkAll = checkedCount === this.politica.checkBox.length;
      this.politica.isIndeterminate =
        checkedCount > 0 && checkedCount < this.politica.checkBox.length;
      console.log(this.politica.choose, "单选");
      this.handleSearch();
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    hadleDetail(row, flag) {
      this.$router.push({
        path: "/politicalwork/detailInfo",
        query: {
          gh: row.gh,
          id: row.date,
          show: flag,
        },
      });
    },
    handleExport() {
      // this.showExport = true
      this.queryParams.pageNum = 1;
      // this.queryParams.pageSize = 1
      exportBasicInfo(this.queryParams)
        .then((res) => {
          this.downloadFn(res, "政工干部信息表.xlsx", "xlsx");
        })
        .catch((err) => {});
    },
    /** 详细信息查询 */
    // handleGet(row) {
    //   const name = row.name || ''
    //   this.$router.push({ path: '/basicInfo/detailInfo/index', query: { name: name }})
    // }
  },
};
</script>

<style lang="scss" scoped>
.basicInfoStyle {
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
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid #cc3014;
          color: #cc3014;
          background: #fdf6f3;
        }
        .borderLight {
          border: 1px solid #0090a1;
          color: #0090a1;
          background: #e7fcfc;
        }
        .borderGreen {
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
            background: url("~@/assets/images/icon_1.png") no-repeat;
          }
          .orangeIcon {
            background: url("~@/assets/images/icon_2.png") no-repeat;
          }
          .lightIcon {
            background: url("~@/assets/images/icon_3.png") no-repeat;
          }
          .greenIcon {
            background: url("~@/assets/images/export.png");
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
.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
</style>
