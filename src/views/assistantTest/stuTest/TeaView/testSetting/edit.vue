<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <el-form>
        <el-row> <h3 style="font-weight: bolder">问卷信息</h3> </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="问卷名称：">
              <el-input
                v-model="wjName"
                placeholder="请输入问卷名称"
                class="inputSelect"
                clearable
                style="width: 80%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="问卷导语：">
              <el-input
                style="width: 80%"
                v-model="wjDy"
                placeholder="请输入问卷导语"
                class="inputSelect"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="适用年度：">
              <el-select v-model="tmYear" placeholder="请选择" clearable>
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
          <el-col :span="6">
            <el-form-item label="面向培养层次：">
              <el-select
                v-model="tmPycc"
                ref="selectLabel"
                placeholder="请选择"
                clearable
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
          <el-col :span="5">
            <el-form-item label="面向年级：">
              <el-select v-model="wjNj" placeholder="请选择" clearable>
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
      </el-form>
      <el-row> <h3 style="font-weight: bolder">题库选择</h3> </el-row>
      <div class="search">
        <span>题目查询:<span v-html="'\u3000\u3000'"></span> </span>
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
          <span>模块筛选:<span v-html="'\u3000\u3000'"></span> </span
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
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="待加入" name="first">
              <span slot="label"><i class="icon tabsicon_ke"></i>待加入</span>
            </el-tab-pane>
            <el-tab-pane label="已加入" name="second">
              <span slot="label"><i class="icon tabsicon_quan"></i>已加入</span>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="headerRight">
          <div>
            <h4 style="font-weight: 700">
              已选题数：{{ tableData1.length }}
              <span v-html="'\u3000'"></span> 合计： {{ totalFZ }}分<span
                v-html="'\u3000\u3000'"
              ></span>
            </h4>
          </div>
          <div @click="jiaru">
            <span class="greenbtn" style="line-height: 60px">加入</span>
          </div>
        </div>
      </div>
      <div class="mt15" v-if="activeName == 'first'">
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
          </el-table-column>
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
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt15" v-if="activeName == 'second'">
        <el-table
          :data="tableData1"
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
          </el-table-column>
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
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-if="activeName == 'first'"
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>
    <el-dialog
      title="预览"
      :visible.sync="preModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="timuStyle" style="">问卷题目： {{ wjName }}</div>
      <div class="dyStyle">问卷导语：{{ wjDy }}</div>
      <div class="dyStyle">
        总题数：{{ tableData1.length
        }}<span v-html="'\u3000\u3000'"></span> 合计：{{ totalFZ }}分
      </div>
      <div v-for="(item, i) in previewArr">
        <el-table :data="item" style="width: 100%"> </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailCancel">取 消</el-button>
        <el-button @click="detailCancel">生成问卷</el-button>
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

    <div
      style="
        background: white;
        display: flex;
        padding: 15px;
        justify-content: flex-end;
      "
    >
      <div @click="yulan" class="whitebtn" style="margin-right: 10px">预览</div>
      <div @click="scWj" class="greenbtn">生成问卷</div>
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { queryList, scWj, getDetail, mkQuery } from "@/api/test/testSetting";
import { getGrade } from "@/api/class/maintenanceClass";
export default {
  components: { CheckboxCom },
  data() {
    return {
      preModal: false,
      wjName: "",
      wjDy: "",
      wjNj: "",
      //
      activeName: "first",
      options: [],
      options1: [],
      options2: [],
      detailModal: false,
      detailALL: {},
      delArr: [],
      delConfirm: false,
      tmName: "",
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      tmYear: "",
      tmPycc: "",
      dynamicModal: false,
      tableHeader: [
        { dm: "tmName", mc: "题目", width: "520" },
        { dm: "tmPyccname", mc: "培养层次" },
        { dm: "tmYear", mc: "适用年度" },
        { dm: "tmFz", mc: "分值" },
      ],
      previewArr: [],
      tableData: [],
      tableData1: [],
      totalFZ: 0,
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
    this.mkQuery1();
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
    yulan() {
      let newArr = [];
      this.tableData1.forEach((item) => {
        const parent = newArr.find((c) => c.tmMk === item.tmMk);
        if (parent) {
          parent.childs.push(item);
        } else {
          const obj = {
            tmMk: item.tmMk,
            tmFz: item.tmFz,
            id: item.id,
            childs: [item],
          };
          newArr.push(obj);
        }
      });
      if (newArr.length > 0) {
        this.test(newArr);
        this.preModal = true;
      } else {
        this.$message.warning("当前无可预览数据");
      }
    },
    test(arr) {
      for (var y = 0; y < arr.length; y++) {
        var chi = this.toChinesNum(y + 1);
        arr[y].mk = `模块${chi}:${arr[y].tmMk}`;
        var total = 0;
        if (arr[y].childs.length > 0) {
          total += arr[y].childs.reduce((pre, cur) => {
            return pre + Number(cur.tmFz);
          }, 0);
        }
        arr[y].childs.total = total;
      }
      this.previewArr = arr;
      console.log("this.previwe", this.previewArr);
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        let newArr = [];
        strArr.forEach((item, index) => {
          newArr.unshift(
            item === "0" ? changeNum[item] : changeNum[item] + unit[index]
          );
        });
        let numArr = [];
        newArr.forEach((m, n) => {
          if (m !== "零") numArr.push(n);
        });
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === "零") {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m;
              }
            } else {
              newNum += m;
            }
          });
        } else {
          newNum = newArr[0];
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    scWj() {
      var arr = [];
      arr = this.tableData1.map((item) => item.id);
      var data = {
        tmIdList: arr, //题目Id数组
        wjCount: this.tableData1.length,
        wjFz: this.totalFZ,
        wjDy: this.wjDy,
        wjName: this.wjName,
        wjLy: "0",
        wjNj: this.wjNj,
        wjPycc: this.tmPycc,
        wjYear: this.tmYear,
        wjTnjps: "0",
      };
      scWj(data).then((res) => {
        this.$message.success("问卷已生成");
        console.log("res", res);
      });
    },
    jiaru() {
      if (this.multipleSelection.length < 1) {
        this.$message.warning("请先选择数据再加入");
      } else {
        for (var l = 0; l < this.multipleSelection.length; l++) {
          this.tableData1.push(this.multipleSelection[l]);
        }
        this.tableData1 = [...new Set(this.tableData1)];
        this.totalFZ = this.tableData1.reduce((prev, next) => {
          return prev + Number(next.tmFz);
        }, 0);
      }
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    mkQuery1() {
      mkQuery({ tmMk: " " }).then((res) => {
        this.$set(this.training, "checkBox", res.data);
        this.options = res.data;
      });
    },
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.options2 = res.data.rows;
        })
        .catch((err) => {});
    },
    detailCancel() {
      this.detailModal = false;
    },
    hadleDetail(row) {
      let data = {
        id: row.id,
        tmMk: this.training.choose,
        tmName: this.tmName,
        tmPycc: this.tmPycc,
        tmYear: this.tmYear,
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
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
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
        tmPycc: this.tmPycc,
        tmYear: this.tmYear,
        pageNum: this.queryParams.pageNum,
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
.timuStyle {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
}
.dyStyle {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
}
.greenbtn {
  background-color: #005657;
  padding: 8px 15px;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
}
.whitebtn {
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 8px 15px;
  cursor: pointer;
}
.tabs {
  background: #fff;
  padding-left: 10px;
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
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
