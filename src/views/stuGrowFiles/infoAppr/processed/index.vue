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
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
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
            <span>培养单位：</span>
            <el-select
                v-model="moreIform.dwh"
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
            <span>专业：</span>
            <el-select
                v-model="moreIform.zydm	"
                multiple
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in zyOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
          </el-col>
          <el-col :span="6">
            <span>班级：</span>
            <el-select
                v-model="moreIform.bjm"
                multiple
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in bjOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
          </el-col>
          <el-col :span="6">
            <span>所属模块：</span>
            <el-select
                v-model="moreIform.mk"
                multiple
                collapse-tags
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in mkOps"
                  :key="item.mc"
                  :label="item.mc"
                  :value="item.mc"
                ></el-option>
              </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
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
        </el-row>
        <!-- <el-row :gutter="20" class="mt15">
          <el-col :span="3">申报日期：</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="datePicker"
                unlink-panels
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row> -->
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">待审核列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="back">
            <i class="icon orangeIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon orangeIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon orangeIcon"></i><span class="title1">通过</span>
          </div>
          
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwhmc" label="培养单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="pyccmmc" label="培养层次" sortable="custom">
          </el-table-column>
          <el-table-column prop="zydmmc" label="专业" sortable="custom">
          </el-table-column>
          <el-table-column prop="bjmmc" label="班级" sortable="custom">
          </el-table-column
          ><el-table-column prop="mk" label="所属模块" sortable="custom">
          </el-table-column
          ><el-table-column prop="createTime" label="申报日期" sortable="custom">
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
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
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import { getToken } from "@/utils/auth";
import {
  queryDshList,
  tyFlow,
  jjFlow,
  backFlow,
} from "@/api/growFiles/infoAppr";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getZY, getBJ } from "@/api/student/index";
export default {
  name: "manStudent",
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
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/import",
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [],// 学院下拉框
        zydm: [],
        bjm: [],
        mk: [],
      },
      tableData: [],
      allDwh: [],
      zyOps: [], // 专业下拉
      bjOps: [], // 班级下拉
      mkOps:[
        {mc:"奖学金"},
        {mc:"社会实践"},
        {mc:"社团经历"},
        {mc:"校内外培训"},
        {mc:"学习成绩"},
        {mc:"资格认证"},
        {mc:"志愿服务"}
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      datePicker: [],
      multipleSelection: [],
      xhArr: [],
      mkArr: [],
      aab: {},
      
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
    getZY(val) {
      this.zyOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getZY(data)
          .then((res) => {
            this.zyOps = res.data;
          })
          .catch((err) => {});
      }
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
    },
    expor() {
      var rqs = "";
      var rqe = "";
      if (this.datePicker && this.datePicker.length > 0) {
        var rqs = this.datePicker[0];
        rqe = this.datePicker[1];
      }
      var idList = [];
      this.multipleSelection.map((item) => idList.push(item.id));
      var data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xzmc: this.select == "xzmc" ? this.xzmc : null,
        buyEndTime: rqs,
        buyStartTime: rqe,
        cbgs: this.select == "cbgs" ? this.cbgs : null,
        lxr: this.select == "lxr" ? this.lxr : null,
        lxdh: this.select == "lxdh" ? this.lxdh : null,
        xzlxList: this.moreIform.xzlx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      if (this.multipleSelection.length > 0) {
        expor({ idList: idList }).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      } else {
        expor(data).then((res) =>
          this.downloadFn(res, "学平险列表下载", "xlsx")
        );
      }
    },
    //通过
    pass(){
      var data = {
        xh: this.xhArr,
        mk: this.mkArr, 
        opMsg: "",
        taskId: this.multipleSelection.map((item) => item.taskId),
        status: this.multipleSelection.map((item) => item.status),
        processId: this.multipleSelection.map((item) => item.processId),
        businesId: this.multipleSelection.map((item) => item.businesId),
      }
      if (this.multipleSelection && this.multipleSelection.length > 0) {    
          tyFlow(data).then((res) => {
            console.log(111);
            this.$message.success("提交成功");
            this.handleSearch();
          });
          
        } else {
          this.$message.error("请先勾选数据");
        }
    },
    //拒绝
    refuse(){

    },
    //拒绝
    back(){

    },

    // upLoadError(err, file, fileList) {
    //   this.$message({
    //     type: "error",
    //     message: "上传失败",
    //   });
    // },
    // upLoadSuccess(res, file, fileList) {
    //   if (res.errcode == "00") {
    //     this.handleSearch();
    //     this.$message({
    //       type: "success",
    //       message: res.errmsg,
    //     });
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: res.errmsg,
    //     });
    //   }
    // },
    hadleDetail(row) {
      this.$router.push({
        path: "/assistantWork/detailBX",
        query: {
          id: row.id,
        },
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      // var rqs = "";
      // var rqe = "";
      // if (this.datePicker && this.datePicker.length > 0) {
      //   var rqs = this.datePicker[0];
      //   rqe = this.datePicker[1];
      // }
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,

        dwh: this.moreIform.dwh,
        zydm: this.moreIform.zydm,
        bjm: this.moreIform.bjm,
        mk: this.moreIform.mk,
        pyccm: this.training.choose || [],
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryDshList(data)
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
      console.log(this.multipleSelection);
      this.xhArr = val.map((item) => item.xh);
      this.mkArr = val.map((item) => item.mk);
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
          background: url("../../../../assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("../../../../assets/images/chevronUp.png") no-repeat;
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
          background: url("../../../../assets/images/updata.png") no-repeat;
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
        .borderRed{
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
}
</style>
