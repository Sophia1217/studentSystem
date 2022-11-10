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
            <el-option label="申请人" value="sqxm"></el-option>
            <el-option label="学号" value="sqxh"></el-option>
            <el-option label="手机号" value="sqsjh"></el-option>
            <el-option label="外出原因" value="sqwcyymc"></el-option>
            <el-option label="目的地" value="sqwcmdd"></el-option>
            <el-option label="审核人" value="fdysprxm"></el-option>
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
          <el-col :span="3"> 培养单位： </el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-select
                v-model="moreIform.xydm"
                multiple
                collapse-tags
                placeholder="请选择"
                size="medium"
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
          <el-col :span="3">外出时间</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="dateArrayOut"
                unlink-panels
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">拟返回时间</el-col>
          <el-col :span="20">
            <div class="checkbox">
              <el-date-picker
                v-model="dateArrayBack"
                unlink-panels
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">临时出入申请列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="handleExport">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="sqxm" label="申请人" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqxh" label="学号" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqxymc" label="培养单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqsjh" label="手机号" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqwcyymc" label="外出原因" sortable="custom">
          </el-table-column>
          <el-table-column prop="sqwcmdd" label="目的地" sortable="custom">
          </el-table-column>
          <el-table-column prop="wcsj" label="外出时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="fxsj" label="拟返回时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="fdysprxm" label="审核人" sortable="custom">
          </el-table-column>
          <el-table-column prop="fdyspsj" label="审核时间" sortable="custom">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail2(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申请详情</span>
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
    <el-dialog :title="title" :visible.sync="showExport" width="30%">
      <span>确认导出{{ len }}条数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="exp">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="临时出入申请详情"
      :visible.sync="detailModal"
      width="40%"
      style="height: 78vh"
    >
      <div>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">申请人</div>
              <div class="bs">{{ res.sqxm }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">学号</div>
              <div class="bs">{{ res.sqxh }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">培养单位</div>
              <div class="bs">{{ res.sqxymc }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">身份证号</div>
              <div class="bs">{{ res.sqsfzh }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">学生类别</div>
              <div class="bs">{{ res.sqxslb }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">手机号</div>
              <div class="bs">{{ res.sqsjh }}</div>
            </div>
          </el-col> </el-row
        ><el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">外出原因</div>
              <div class="bs">{{ res.sqwcyymc }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">目的地</div>
              <div class="bs">{{ res.sqwcmdd }}</div>
            </div>
          </el-col> </el-row
        ><el-row>
          <el-col :span="24" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">原因说明</div>
              <div class="bs">{{ res.sqwcyysm }}</div>
            </div>
          </el-col> </el-row
        ><el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">外出时间</div>
              <div class="bs">{{ res.wcsj }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">拟返回时间</div>
              <div class="bs">{{ res.fxsj }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核人</div>
              <div class="bs">{{ res.fdysprXmAndGh }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核时间</div>
              <div class="bs">{{ res.fdyspsj }}</div>
            </div>
          </el-col> </el-row
        ><el-row>
          <el-col :span="24" class="yiny">
            <div
              style="display: flex; height: 50px; border-bottom: 1px solid grey"
            >
              <div class="hs">审核状态</div>
              <div class="bs">{{ res.fdyspyj }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import {
  getQuerylist,
  exp,
  getDetail,
} from "@/api/epidemicControl/provisionalPass";
import { getCollege } from "@/api/class/maintenanceClass";
export default {
  components: { CheckboxCom },
  data() {
    return {
      res: {},
      detailModal: false,
      moreIform: {
        xydm: [],
      },
      delArr: [],
      searchVal: "",
      allDwh: [], // 学院下拉框
      select: "",
      isMore: false,
      showExport: false,
      title: "",
      dateArrayOut: [],
      dateArrayBack: [],
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      len: 0,
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
  },
  activated() {
    this.handleSearch();
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    async handleExport() {
      if (this.delArr && this.delArr.length > 0) {
        this.len = this.delArr.length;
      } else {
        let data = {
          sqxm: this.select == "sqxm" ? this.searchVal : null,
          sqxh: this.select == "sqxh" ? this.searchVal : null,
          sqsjh: this.select == "sqsjh" ? this.searchVal : null,
          sqwcyymc: this.select == "sqwcyymc" ? this.searchVal : null,
          sqwcmdd: this.select == "sqwcmdd" ? this.searchVal : null,
          fdysprxm: this.select == "fdysprxm" ? this.searchVal : null,
          dwhList: this.moreIform.xydm,
          fxsjStart:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[0]
              : "",
          fxsjEnd:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[1]
              : "",
          wcsjStart:
            this.dateArrayOut && this.dateArrayOut.length > 0
              ? this.dateArrayOut[0]
              : "",
          wcsjEnd:
            this.dateArrayOut && this.dateArrayOut.length > 0
              ? this.dateArrayOut[1]
              : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        await getQuerylist(data)
        .then((res) => {
          this.len = res.totalCount;
        })
        .catch((err) => {});
      }
      if (this.len > 0) {
        this.showExport = true;
        this.title = "导出";
      } else {
        this.$message.warning("当前无数据导出");
      }
    },
    handleCancel() {
      this.showExport = false;
    },
    exp() {
      if (this.delArr && this.delArr.length > 0) {
        var ids = this.delArr;
        exp({ idList: ids }).then((res) => {
          this.downloadFn(res, "临时出入申请列表下载", "xlsx");
          this.handleSearch();
        });
      } else {
        let data = {
          sqxm: this.select == "sqxm" ? this.searchVal : null,
          sqxh: this.select == "sqxh" ? this.searchVal : null,
          sqsjh: this.select == "sqsjh" ? this.searchVal : null,
          sqwcyymc: this.select == "sqwcyymc" ? this.searchVal : null,
          sqwcmdd: this.select == "sqwcmdd" ? this.searchVal : null,
          fdysprxm: this.select == "fdysprxm" ? this.searchVal : null,
          dwhList: this.moreIform.xydm,
          fxsjStart:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[0]
              : "",
          fxsjEnd:
            this.dateArrayBack && this.dateArrayBack.length > 0
              ? this.dateArrayBack[1]
              : "",
          wcsjStart:
            this.dateArrayOut && this.dateArrayOut.length > 0
              ? this.dateArrayOut[0]
              : "",
          wcsjEnd:
            this.dateArrayOut && this.dateArrayOut.length > 0
              ? this.dateArrayOut[1]
              : "",
          pageNum: this.queryParams.pageNum,
          pageSize: this.queryParams.pageSize,
          orderZd: this.queryParams.orderZd,
          orderPx: this.queryParams.orderPx,
        };
        exp({ ...data }).then((res) => {
          this.downloadFn(res, "临时出入申请列表下载", "xlsx");
          this.handleSearch();
        });
      }
      this.showExport = false;
    },
    del() {
      if (this.delArr && this.delArr.length > 0) {
        delTalk({ ids: this.delArr }).then((res) => this.handleSearch());
      } else {
        this.$message.error("请先勾选数据");
      }
    },

    hadleDetail2(row) {
      // sqxm sqxh  sqxymc  sqsfzh  sqxslb sqsjh  sqwcyymc sqwcmdd  sqwcyysm wcsj fxsj  fdysprXmAndGh fdyspsj  fdyspyj
      this.$nextTick((_) => {
        getDetail({ id: row.id })
          .then((res) => {
            const { data } = res;
            // this.res = data;
            this.res.sqxm = data ? data.sqxm : "";
            this.res.sqxh = data ? data.sqxh : "";
            this.res.sqxymc = data ? data.sqxymc : "";
            this.res.sqsfzh = data ? data.sqsfzh : "";
            this.res.sqxslb = data ? data.sqxslb : "";
            this.res.sqsjh = data ? data.sqsjh : "";
            this.res.sqwcyymc = data ? data.sqwcyymc : "";
            this.res.sqwcmdd = data ? data.sqwcmdd : "";
            this.res.sqwcyysm = data ? data.sqwcyysm : "";
            this.res.wcsj = data ? data.wcsj : "";
            this.res.fxsj = data ? data.fxsj : "";
            this.res.fdysprXmAndGh = data ? data.fdysprXmAndGh : "";
            this.res.fdyspsj = data ? data.fdyspsj : "";
            this.res.fdyspyj = data ? data.fdyspyj : "";
          })
          .then(() => (this.detailModal = true));
      });
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        sqxm: this.select == "sqxm" ? this.searchVal : null,
        sqxh: this.select == "sqxh" ? this.searchVal : null,
        sqsjh: this.select == "sqsjh" ? this.searchVal : null,
        sqwcyymc: this.select == "sqwcyymc" ? this.searchVal : null,
        sqwcmdd: this.select == "sqwcmdd" ? this.searchVal : null,
        fdysprxm: this.select == "fdysprxm" ? this.searchVal : null,
        dwhList: this.moreIform.xydm,
        fxsjStart:
          this.dateArrayBack && this.dateArrayBack.length > 0
            ? this.dateArrayBack[0]
            : "",
        fxsjEnd:
          this.dateArrayBack && this.dateArrayBack.length > 0
            ? this.dateArrayBack[1]
            : "",
        wcsjStart:
          this.dateArrayOut && this.dateArrayOut.length > 0
            ? this.dateArrayOut[0]
            : "",
        wcsjEnd:
          this.dateArrayOut && this.dateArrayOut.length > 0
            ? this.dateArrayOut[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      getQuerylist(data)
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
.talkRec {
  .yiny {
    border: 1px solid grey;
    background: rgba(0, 0, 0, 0.0001);
    box-shadow: inset -1px 0px 0px #e0e0e0, inset 1px 0px 0px #e0e0e0;
    height: 50px;
    border-bottom: none;
    border-left: none;
  }
  .hs {
    flex: 0 0 100px;
    background: #ccc;
    padding-left: 20px;
    padding-top: 14px;
  }
  .bs {
    padding-left: 40px;
    padding-top: 14px;
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
  .scopeIncon1 {
    display: inline-block;
    width: 20px;
    height: 16px;
    vertical-align: middle;
  }
  .ywc {
    background: url("~@/assets/assistantPng/blue.png") no-repeat;
  }
  .djl {
    background: url("~@/assets/assistantPng/red.png") no-repeat;
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
