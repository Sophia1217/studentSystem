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
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
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
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>指派岗位：</span>

            <el-select
              v-model="moreIform.zpgw"
              placeholder="请选择审核状态"
              size="small"
            >
              <el-option
                v-for="(item, index) in gwList"
                :key="index"
                :label="item.gwMainMc"
                :value="item.gwMainMc"
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
          <span class="title">已指派列表</span> <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            @change="handleSearch"
            placeholder="请选择"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allXn"
              :key="index"
              :label="item.mc"
              :value="item.mc"
            ></el-option>
          </el-select>
          <span>学年</span>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85"> </el-table-column>
          <el-table-column prop="ssdwdmmc" label="培养单位"> </el-table-column>
          <el-table-column prop="bjdmmc" label="班级"> </el-table-column>
          <el-table-column
            prop="gwMainMc"
            label="指派岗位"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="xs" label="学时"> </el-table-column>
          <el-table-column prop="thcs" label="谈话次数"> </el-table-column>
          <el-table-column prop="zzkjssj" label="最早可结束时间">
          </el-table-column>

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
      <el-dialog
        title="指派"
        :visible.sync="editModal"
        width="50%"
        :close-on-click-modal="false"
      >
        <template>
          <el-form ref="formEdit" :model="formEdit" :inline-message="true">
            <el-row>
              <el-col :span="12">
                <el-form-item label="学号" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.xh }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.xm }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.xbmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培养层次" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.pyccmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培养单位" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.dwhmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.zydmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="班级" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.bjmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年级" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicInfo.nj }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="margin-top: 10px">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="岗位名称" prop="gwMainMc">
                    {{ formEdit.gwMainMc }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="岗位类型" prop="gwTypeMc">
                    {{ formEdit.gwTypeMc }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="用人部门" prop="gwYrbmc">
                    {{ formEdit.gwYrbmc }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="可接纳人数" prop="gwKjnrs">
                    {{ formEdit.gwKjnrs }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="23">
                  <el-form-item label="工作地点" prop="gwGzdd">
                    {{ formEdit.gwGzdd }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="指导老师" prop="gwZdls">
                    {{ formEdit.gwZdls }}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系方式" prop="gwLxfs">
                    {{ formEdit.gwLxfs }}
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="23">
                  <el-form-item label="工作内容" prop="gwGznr">
                    <el-input
                      v-model="formEdit.gwGznr"
                      type="textarea"
                      :autosize="{ minRows: 5, maxRows: 5 }"
                      readonly
                      maxlength="500"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="时长" prop="xs">
                    {{ formEdit.xs }}

                    学时
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="谈话总次数" prop="thcs">
                    {{ formEdit.thcs }}
                    次
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最早可结束时间" prop="zzkjssj">
                    {{ formEdit.zzkjssj }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer footerFlex">
          <el-button @click="detailCancel">关 闭</el-button>
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
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { xhQuery } from "@/api/dailyBehavior/lskn";
import { getCollege } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/dormTea";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ } from "@/api/student/index";

import {
  queryZpList,
  excelExportRcswZpList,
  queryGwListAll,
} from "@/api/stuPunish/jzjyAssign";
export default {
  data() {
    return {
      editModal: false,
      formEdit: {},
      showExport: false,
      gwList: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],

        xn: "",
        zpgw: "",
      },
      basicInfo: {},
      exportParams: {},
      leng: 0,
      tableData: [],
      updownDate: [],
      multipleSelection: [],
      allDwh: [],
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dksjArr: [],
        // 金额
        dkzjeEnd: 9999999,
        dkzjeStart: 1,
        orderZd: "",
        orderPx: "",
      },
    };
  },

  mounted() {
    this.getAllCollege();
    this.getSchoolYears();
  },

  methods: {
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let idList = [];
      idList = this.multipleSelection.map((item) => item.id);
      this.exportParams.pageNum = 0;
      this.exportParams.pageSize = 0;
      this.$set(this.exportParams, "ids", idList);
      console.log(this.exportParams);

      excelExportRcswZpList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "矫正教育岗位指派已处理列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});

      this.showExport = false;
    },
    expor() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xn: this.moreIform.xn,
        gwMainMc: this.moreIform.zpgw,
        cfdjm: this.moreIform.cfdj,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        jzjyzt: "03",
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
          this.moreIform.xn = res.data[0].mc;
          this.handleSearch();
        })
        .catch((err) => {});
      queryGwListAll()
        .then((res) => {
          this.gwList = res.data;
        })
        .catch((err) => {});
    },

    detailCancel() {
      this.editModal = false;
    },

    checkFormEdit() {
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
      this.getBJ(val);
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
    hadleDetail(row) {
      this.editModal = true;
      xhQuery({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      for (let val of this.gwList) {
        if (row.gwid == val.id) {
          this.$set(this.formEdit, "gwMainMc", val.gwMainMc);
          this.$set(this.formEdit, "gwTypeMc", val.gwTypeMc);
          this.$set(this.formEdit, "gwYrbmc", val.gwYrbmc);
          this.$set(this.formEdit, "gwKjnrs", val.gwKjnrs);
          this.$set(this.formEdit, "gwGzdd", val.gwGzdd);
          this.$set(this.formEdit, "gwZdls", val.gwZdls);
          this.$set(this.formEdit, "gwLxfs", val.gwLxfs);
          this.$set(this.formEdit, "gwGznr", val.gwGznr);
        }
      }
      this.$set(this.formEdit, "xs", row.xs);
      this.$set(this.formEdit, "zzkjssj", row.zzkjssj);
      this.$set(this.formEdit, "thcs", row.thcs);
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        xn: this.moreIform.xn,
        gwMainMc: this.moreIform.zpgw,
        cfdjm: this.moreIform.cfdj,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        jzjyzt: "03",
      };
      queryZpList(data)
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
            case "dmgjzxdk":
              this.dglxList = res.data; //贷款类型
              break;
            case "dmzudkyhm":
              this.dgyhList = res.data; //银行
              break;
          }
        })
        .catch((err) => {});
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
  ::v-deep .grayBg .el-form-item__label {
    background-color: #f0f0f0;
    padding: 5px 10px 5px 0px;
  }
  .grayBg {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0;
  }
  .sqList {
    padding: 5px 0px 5px 10px;
    width: 85%;
  }
  .lct {
    background: url("~@/assets/dangan/lct.png");
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
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

        .borderOrange {
          border: 1px solid grey;
          background: #fff;
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
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
        }
        .orangeIcon {
          margin-top: 10px;
        }
      }
    }
  }
}
.backDetail {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-width: 1px;
  border-color: #cccccc;
  .formLeft {
    width: 15%;
    background: #fff;
    display: flex;
    align-items: center;
    .title {
      width: 100%;
      text-align: center;
    }
  }
  .formRight {
    width: 85%;
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

    .title {
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
  }
}
</style>
