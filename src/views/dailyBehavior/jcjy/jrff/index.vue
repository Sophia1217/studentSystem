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
              v-model="queryParams.ssdwdm"
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
              v-model="queryParams.bjdm"
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
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >批次：</el-col
          >
          <el-col :span="20">
            <el-select
              v-model="queryParams.pc"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in dmjcjyjeffpc"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
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
          <span class="title">金额发放列表</span>
          <i class="Updataicon"></i>
          <el-select
            v-model="queryParams.nd"
            collapse-tags
            placeholder="请选择"
            @change="handleSearch"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allnd"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <span>年度</span>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
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
          <div class="btns borderRed" @click="delList">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns fullGreen" @click="add">
            <i class="icon passIcon"></i><span class="title1">新增</span>
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
          <el-table-column prop="xh" label="学号" width="100">
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85"> </el-table-column>
          <el-table-column prop="ssdwdmmc" label="培养单位"> </el-table-column>
          <el-table-column prop="bjdmmc" label="班级"> </el-table-column>
          <el-table-column prop="pcmc" label="批次"> </el-table-column>
          <el-table-column prop="dcje" label="代偿金额（元）">
          </el-table-column>
          <el-table-column prop="dkbj" label="贷款本金（元）">
          </el-table-column>
          <el-table-column prop="xxje" label="学费金额（元）">
          </el-table-column>
          <el-table-column prop="sj" label="时间"> </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="addModal"
      width="50%"
      :close-on-click-modal="false"
    >
      <template>
        <div>
          <el-form
            ref="formAdd"
            style="margin-bottom: 60px"
            :model="formAdd"
            :inline-message="true"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="学号"
                  class="grayBg"
                  label-width="42%"
                  prop="xh"
                  :rules="rules.common"
                >
                  <div class="sqList">
                    <el-input-number
                      :controls="false"
                      @blur="test"
                      style="width: 170px"
                      v-model="formAdd.xh"
                      placeholder="请输入学号"
                    ></el-input-number>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span>{{ basicDate.xm }} </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicDate.xbmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培养层次" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicDate.pyccmmc }} </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="培养单位" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicDate.dwhmc }} </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年级" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicDate.nj }} </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="专业" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ basicDate.zydmmc }} </span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="班级" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span>{{ basicDate.bjmmc }} </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-table :data="formAdd.rcswJcjyCjffPixxReq" style="width: 100%">
              <el-table-column label="批次">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`rcswJcjyCjffPixxReq.${scope.$index}.pc`"
                    :rules="rules.common"
                    label-width="0"
                  >
                    <el-select
                      v-model="scope.row.pc"
                      collapse-tags
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in dmjcjyjeffpc"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="代偿金额（元）">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`rcswJcjyCjffPixxReq.${scope.$index}.dcje`"
                    :rules="rules.common"
                    label-width="0"
                  >
                    <el-input-number
                      :controls="false"
                      :min="0"
                      style="width: 170px"
                      v-model="scope.row.dcje"
                      placeholder="请输入"
                    ></el-input-number>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="贷款本金（元）">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`rcswJcjyCjffPixxReq.${scope.$index}.dkbj`"
                    :rules="rules.common"
                    label-width="0"
                  >
                    <el-input-number
                      :controls="false"
                      :min="0"
                      style="width: 170px"
                      v-model="scope.row.dkbj"
                      placeholder="请输入"
                    ></el-input-number>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="学费金额（元）">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`rcswJcjyCjffPixxReq.${scope.$index}.xxje`"
                    :rules="rules.common"
                    label-width="0"
                  >
                    <el-input-number
                      :controls="false"
                      :min="0"
                      style="width: 170px"
                      v-model="scope.row.xxje"
                      placeholder="请输入"
                    ></el-input-number>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addCon"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryCjffList,
  daochu,
  getYears,
  downLoadCjff,
  shanchu,
  xinzeng,
  queryXsByXh,
} from "@/api/jccy/index";
import { getBJ } from "@/api/student/index";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getToken } from "@/utils/auth";
import { getXmXgh } from "@/api/assistantWork/talk";
export default {
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
      basicDate: {},
      formAdd: {
        xh: undefined,
        xm: "",
        bjdm: "",
        ssdwdm: "",
        rcswJcjyCjffPixxReq: [
          {
            pc: "",
            dcje: undefined,
            xxje: undefined,
            dkbj: undefined,
          },
        ],
      },
      addModal: false,
      uploadUrl: process.env.VUE_APP_BASE_API + "/jcjyCjff/importExcelJcjyCjff",
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      zyOps: [],
      exportParams: {},
      tableData: [],

      allDwh: [],
      bjOps: [], // 班级下拉
      allnd: [], //年度下拉
      commonParams: [],
      queryParams: {
        ssdwdm: [], // 学院下拉框
        bjdm: [],
        nd: "",
        pc: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
      dmjcjyjeffpc: [],
      multipleSelection: [],
      AUTHFLAG: false,
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getAllCollege();
    this.getCode("dmjcjyjeffpc"); // 培养层次
    this.getSchoolYears();
  },

  methods: {
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    test(e) {
      if (!!e.target.value) {
        queryXsByXh({ xh: e.target.value }).then((res) => {
          if (res.data) {
            this.basicDate = res.data;
            this.formAdd.xh = res.data.xh;
            this.formAdd.xm = res.data.xm;
            this.formAdd.bjdm = res.data.bjm;
            this.formAdd.ssdwdm = res.data.dwh;
          } else {
            this.$message.warning("当前学号暂无数据，请输入完整数据");
          }
        });
      }
    },
    addCon() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd;
        xinzeng(data).then((res) => {
          this.$message.success("新增成功");
          this.addModal = false;
          this.handleSearch();
          this.resetForm("formAdd");
          this.basicDate = {};
        });
      }
    },
    addCance() {
      this.addModal = false;
      this.resetForm("formAdd");
      this.basicDate = {};
    },
    //拒绝
    delList() {
      var delArr = this.multipleSelection.map((item) => item.id);
      if (delArr.length > 0) {
        this.$confirm("即将删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            shanchu({ ids: delArr }).then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.handleSearch();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    mbDown() {
      downLoadCjff().then((res) => {
        this.downloadFn(res, "金额发放模板下载", "xlsx");
        this.$message.success("操作成功");
      });
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
    //获取年度
    getSchoolYears() {
      getYears()
        .then((res) => {
          this.allnd = res.data.rows;
          this.queryParams.nd = res.data.rows[0];
          this.handleSearch();
        })
        .catch((err) => {});
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res.data.stuList;
          resultNew = result.map((ele) => {
            return {
              value: `${ele.mc}(${ele.dm})`,
              label: ele.mc,
            };
          });
          cb(resultNew);
        });
      }
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      this.$set(this.exportParams, "ids", ids);
      daochu(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "在岗确认待审核列表导出.xlsx", "xlsx");
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
      var data = {};
      data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        ...this.queryParams,
      };
      this.exportParams = data;
      this.showExport = true;
    },
    //确认

    add() {
      this.addModal = true;
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
        this.queryParams.zydm = []; // 专业
        this.queryParams.bjm = []; // 班级
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
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        ...this.queryParams,
      };
      queryCjffList(data)
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
            case "dmjcjyjeffpc":
              this.dmjcjyjeffpc = res.data;
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
.footerFlex {
  display: flex;
  justify-content: flex-end;
}
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
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
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
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
          .passIcon {
            margin-top: 10px;
            background: url("~@/assets/images/passWhite.png") no-repeat;
          }
          .refuseIcon {
            margin-top: 10px;
            background: url("~@/assets/images/refuse.png") no-repeat;
          }
          .backIcon {
            margin-top: 10px;
            background: url("~@/assets/images/back.png") no-repeat;
          }
        }
      }
    }
  }
  .borderRed {
    border: 1px solid #e8e8e8;
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
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
    }
    .passIcon {
      margin-top: 10px;
      background: url("~@/assets/images/passWhite.png") no-repeat;
    }
    .refuseIcon {
      margin-top: 10px;
      background: url("~@/assets/images/refuse.png") no-repeat;
    }
    .backIcon {
      margin-top: 10px;
      background: url("~@/assets/images/back.png") no-repeat;
    }
  }
}
</style>
