<template>
  <div class="talkRec">
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入查询内容"
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
            <el-option label="主题" value="hdzt"></el-option>
            <el-option label="参与人" value="cyrmc"></el-option>
            <el-option label="地点" value="hddd"></el-option>
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
          <el-col :span="8">
            <span>组织单位：</span>
            <el-select
              v-model="moreIform.zzdwList"
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
          </el-col>
          <el-col :span="8">
            <span>类<span v-html="'\u3000\u3000'"></span>别：</span>
            <el-select
              v-model="moreIform.hdlb"
              collapse-tags
              clearable
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in allLb"
                :key="index"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >经费维护（区间）</el-col
          >
          <el-col :span="1.5">
            <el-input-number
              v-model="moreIform.jfwhStart"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
          <el-col :span="0.5" style="margin-top: 7px; margin-left: -52px">
            ——
          </el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="moreIform.jfwhEnd"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="3">培养层次：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <checkboxCom
                :objProp="training"
                @training="handleCheckAllChangeTraining"
                @checkedTraining="handleCheckedCitiesChangeTraining"
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
          <span class="title">活动列表</span>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="hdzt" label="主题" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="zzdwmc"
            label="组织单位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column prop="cyrmc" label="参与人" min-width="85" sortable>
          </el-table-column>
          <el-table-column prop="hdsj" label="时间" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="hddd" label="地点" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="hdlb" label="类别" min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="dgjsktgrs"
            label="通过人数"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="jfwh"
            label="经费维护（元）"
            min-width="130"
            sortable
          >
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.jfwh"
                :min="0"
                :controls="false"
                @change="alterMoney($event, scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">进入评分</span>
              </el-button>
            </template>
          </el-table-column> -->
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
    <el-dialog
      title="修改经费维护确认提示"
      :visible.sync="sureModal"
      width="30%"
    >
      <span>是否修改经费为{{ jf }}元</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sureCancel">取消</el-button>
        <el-button type="primary" @click="sureConfirm" class="confirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../components/checkboxCom";
import { queryMoneyList, updateMoney } from "@/api/afterTea/audit";
import { getCollege } from "@/api/class/maintenanceClass"; //待定
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom },
  data() {
    return {
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        zzdwList: [], // 学院下拉框
        hdlb: "",
        jfwhStart: 0,
        jfwhEnd: 9999999,
      },
      tableData: [],
      allDwh: [],
      allLb: [{ mc: "教授午餐会" }, { mc: "教授下午茶" }],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        total: 0,
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      sureModal: false,
      alterId: "",
      jf: "",
      rules: {
        // shjg: [
        //   { required: true, message: "审核结果不能为空", trigger: "change" },
        // ],
      },
    };
  },

  mounted() {
    this.getAllCollege();
    this.handleSearch();
    // this.getCode("dmpyccm"); // 培养层次
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },

    async hadleDetail(row) {
      console.log("row", row);
      this.$router.push({
        path: "/assistantTest/schoolTest/fsjDetail",
        query: {
          id: row.wjid,
          gh: row.gh,
        },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        hdzt: this.select == "hdzt" ? this.searchVal : null,
        cyrmc: this.select == "cyrmc" ? this.searchVal : null,
        hddd: this.select == "hddd" ? this.searchVal : null,
        zzdwList: this.moreIform.zzdwList,
        hdlb: this.moreIform.hdlb,
        jfwhEnd: this.moreIform.jfwhEnd,
        jfwhStart: this.moreIform.jfwhStart,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryMoneyList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },
    // 修改
    alterMoney(e, row) {
      this.alterId = "";
      this.jf = "";
      this.alterId = row.id;
      this.jf = String(row.jfwh);
      if (row.jfwh == undefined) {
        this.$message.error("经费维护不能为空");
      } else {
        this.sureModal = true;
      }
    },
    sureConfirm() {
      if (this.jf == "") {
        this.$message.error("经费维护不能为空");
      } else {
        var data = {
          id: this.alterId,
          jf: this.jf,
        };
        updateMoney(data)
          .then((response) => {
            if (response.errcode == "00") {
              this.$message({
                showClose: true,
                message: "修改经费维护成功",
                type: "success",
              });
              this.handleSearch();
              this.sureModal = false;
            } else {
              this.$message({
                showClose: true,
                message: "修改经费维护失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.sureModal = false;
          });
      }
    },
    sureCancel() {
      this.sureModal = false;
      this.handleSearch();
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
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
          .deteIcon {
            background: url("~@/assets/images/yes.png") no-repeat;
          }
          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
        }
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    // overflow-x: auto;
    .formLeft {
      background: #fff;
      // display: flex;
      align-items: flex-start;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 20px;
      }
    }
  }
  .backDetail {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;

    .formRight {
      width: 100%;
      margin-top: 15px;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 48px;
          background: #e0e0e0;
          text-align: right;
          padding-right: 5px;
          margin: 0 !important;
        }
        .content {
          font-weight: 400;
          font-size: 14px;
          color: #1f1f1f;
          line-height: 22px;
          margin-left: 16px;
        }
      }

      .GreenButton {
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
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
      .greenIcon {
        margin: 15px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
</style>
