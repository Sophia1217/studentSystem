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
            <el-option label="岗位名称" value="gwMainMc"></el-option>
            <el-option label="指导教师" value="gwZdls"></el-option>
            <el-option label="联系电话" value="gwLxfs"></el-option>
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
      <div v-if="isMore" class="moreSelect">
        <el-row :gutter="20" class="mt15">
          <el-col :span="5">
            <span>岗位类型：</span>
            <el-select
              v-model="queryParams.gwType"
              placeholder="请选择"
              multiple
              collapse-tags
            >
              <el-option
                v-for="(item, index) in gwlxList"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="5">
            <span>用人部门：</span>
            <el-select
              v-model="queryParams.gwYrbm"
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in allDwh"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="5">
            <span style="display: inline-block"> 工作地点：</span>
            <div style="display: inline-block">
              <el-input
                v-model="queryParams.gwGzdd"
                placeholder="请输入"
              ></el-input>
            </div>
          </el-col>
        </el-row>
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
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div>
          <div class="btns fullGreen" @click="pass">
            <i class="icon passIcon"></i><span class="title1">通过</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="basicInfoList"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="gwMainMc"
            label="岗位名称"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="gwTypeMc"
            label="岗位类型"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="gwGzdd" label="工作地点" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwYrbmc" label="用人部门" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwKjnrs" label="可接纳人数" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwZdls" label="指导教师" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwLxfs" label="联系电话" sortable="custom">
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
      <el-dialog title="拒绝理由" :visible.sync="jjModal" width="30%">
        <template>
          <el-input placeholder="请输入拒绝理由" v-model="jjly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jjCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="jjConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回选择" :visible.sync="thTableModal" width="20%">
        <template>
          <el-table
            :data="tableInner"
            ref="multipleTable1"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column width="55">
              <template slot-scope="scope">
                <el-radio
                  :label="scope.$index"
                  v-model="tempRadio"
                  @change.native="getRow(scope.$index, scope.row)"
                  >{{ "" }}</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="actName" label="节点名称" sortable="custom">
            </el-table-column>
          </el-table>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thTableCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thTableConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="退回理由" :visible.sync="thModal" width="30%">
        <template>
          <el-input placeholder="请输入退回理由" v-model="thly"></el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="thCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="thConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
        @close="emptyEdit()"
      >
        <template>
          <el-form
            :model="detailForm"
            ref="detailForm"
            size="small"
            :rules="rules"
            label-width="80px"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="岗位名称"
                  prop="gwMainMc"
                  :rules="rules.common"
                >
                  <el-input
                    v-if="bjzt == '2'"
                    v-model="detailForm.gwMainMc"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ detailForm.gwMainMc }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="岗位类型"
                  prop="gwType"
                  :rules="rules.common"
                >
                  <el-select
                    v-model="detailForm.gwType"
                    placeholder="请选择"
                    v-if="bjzt == '2'"
                  >
                    <el-option
                      v-for="(item, index) in ztStatus"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                  <span v-else>{{ detailForm.gwTypeMc }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="用人部门">
                  <span>{{ detailForm.gwYrMc }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="可接纳人数"
                  label-width="100px"
                  prop="gwKjnrs"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-if="bjzt == '2'"
                    :controls="false"
                    :min="0"
                    v-model="detailForm.gwKjnrs"
                    placeholder="请输入内容"
                  ></el-input-number>
                  <span v-else>{{ detailForm.gwKjnrs }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="工作地点"
                  prop="gwGzdd"
                  :rules="rules.common"
                >
                  <el-input
                    v-if="bjzt == '2'"
                    v-model="detailForm.gwGzdd"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ detailForm.gwGzdd }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="指导老师"
                  prop="gwZdls"
                  :rules="rules.common"
                >
                  <el-autocomplete
                    v-if="bjzt == '2'"
                    v-model="detailForm.gwZdls"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入老师"
                    :trigger-on-focus="false"
                    @select="handleSelect()"
                    size="small"
                  ></el-autocomplete>
                  <span v-else>{{ detailForm.gwZdls }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="联系方式"
                  prop="gwLxfs"
                  :rules="rules.common"
                >
                  <el-input
                    v-if="bjzt == '2'"
                    type="number"
                    v-model="detailForm.gwLxfs"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ detailForm.gwLxfs }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="工作内容"
                  prop="gwGznr"
                  :rules="rules.common"
                >
                  <el-input
                    v-if="bjzt == '2'"
                    type="textarea"
                    :rows="5"
                    v-model="detailForm.gwGznr"
                    placeholder="请输入内容"
                  ></el-input>
                  <span v-else>{{ detailForm.gwGznr }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailModal = false">关 闭</el-button>
        </span>
      </el-dialog>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
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
import { backFlow } from "@/api/growFiles/infoAppr";
import {
  getDshList,
  tongguo,
  jujue,
  tuihui,
  excelLsDshList,
} from "@/api/jzjyGwsq/index";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  data() {
    return {
      bjzt: "1",
      gwlxList: [],
      allDwh: [],
      total: 0,
      showExport: false,
      ztStatus: [],
      searchVal: "",
      lctModal: false,
      select: "",
      isMore: false,
      exportParams: {},
      leng: 0,
      basicInfoList: [],
      queryParams: {
        gwType: [],
        gwYrbm: "",
        gwGzdd: "",
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
      },
      dynamicModal: false,
      commonParams: [],
      multipleSelection: [],
      multipleSelection1: "",
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      detailModal: false,
      tableDetails: [],
      detailForm: {},
      rules: {
        common: [{ required: true, message: "请完善表单", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getCode("dmqjlxm"); //请假类型
    this.getCode("dmxqm");
    this.getCode("dmgwlx"); //状态
    this.getList();
    this.getAllCollege();
  },

  methods: {
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.$set(this.exportParams, "ids", ids);
      excelLsDshList(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "岗位待审核列表导出.xlsx", "xlsx");
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
        gwMainMc: this.select == "gwMainMc" ? this.searchVal : "",
        gwZdls: this.select == "gwZdls" ? this.searchVal : "",
        gwLxfs: this.select == "gwLxfs" ? this.searchVal : "",
        ...this.queryParams,
      };
      this.exportParams = data;
      this.showExport = true;
    },
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.detailForm.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    emptyEdit() {
      this.$nextTick(() => {
        this.$refs.detailForm.resetFields();
      });
    },
    getList() {
      this.queryParams.gwMainMc =
        this.select == "gwMainMc" ? this.searchVal : "";
      this.queryParams.gwZdls = this.select == "gwZdls" ? this.searchVal : "";
      this.queryParams.gwLxfs = this.select == "gwLxfs" ? this.searchVal : "";
      getDshList(this.queryParams)
        .then((response) => {
          this.basicInfoList = response.data; // 根据状态码接收数据
          this.total = response.totalCount; //总条数
        })
        .catch((err) => {});
    },
    editClick() {},
    changeJG(val) {
      if (val && val == "3") {
        var processId = { processId: this.defaultRes.taskId };
        backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      }
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },

    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //通过
    pass() {
      if (this.commonParams.length > 0) {
        var data = this.commonParams.map((item) => ({
          ...item,
          opMsg: "审核通过",
        }));
        tongguo(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("审核已通过");
            this.detailModal = false;
            this.getList();
          }
        });
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    //拒绝
    refuse() {
      if (this.commonParams.length > 0) {
        this.jjModal = true;
        this.jjly = "";
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    jjCancel() {
      this.jjModal = false;
    },
    jjConfirm() {
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.jjly,
      }));
      jujue(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.detailModal = false;
          this.getList();
        }
      });
      this.jjModal = false;
    },
    async back() {
      if (this.commonParams.length > 0) {
        var processId = { processId: this.commonParams[0].taskId };
        await backFlow(processId).then((res) => {
          this.tableInner = res.data;
        });
        this.thTableModal = true;
      } else {
        this.$message.error("请先选择一条数据");
      }
    },
    thTableCancel() {
      this.thTableModal = false;
    },
    thTableConfirm() {
      if (!!this.tempRadio || this.tempRadio === 0) {
        this.thTableModal = false;
        if (this.detailModal == false) {
          this.thModal = true;
        }
      } else {
        this.$message.error("请先勾选退回的节点");
      }
    },
    thCancel() {
      this.thModal = false;
    },
    thConfirm() {
      this.thModal = false;
      var data = this.commonParams.map((item) => ({
        ...item,
        opMsg: this.thly,
        actId: this.multipleSelection1.actId,
        actName: this.multipleSelection1.actName,
      }));
      // var targ = {
      //   flowNodeRes: this.multipleSelection1,
      //   flowOpReqList: data,
      // };
      tuihui(data).then((res) => {
        if (res.errcode == "00") {
          this.detailModal = false;
          this.$message.success("退回成功");
          this.getList();
        }
      });
    },
    hadleDetail(row) {
      this.detailForm = row;
      this.detailModal = true;
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      this.getList(this.queryParams);
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
            case "dmsplcm":
              this.ztStatus = res.data;
              this.$set(this.shzt, "checkBox", res.data);
              break;
            case "dmgwlx": //审批结果
              this.gwlxList = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processId,
        status: v.status,
        taskId: v.taskId,
      }));
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getList();
    },
    handleCloseLct() {
      this.lctModal = false;
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
  .lct {
    background: url("~@/assets/dangan/lct.png");
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
        display: flex;
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
        .dqXnxqArea {
          margin-left: 20px;
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
          .controlIcon {
            background: url("~@/assets/images/control.png");
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
  .headline {
    padding: 15px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableStyle {
    padding: 0 20px;
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
        ::v-deep .el-input {
          width: 200px;
        }
      }
    }
  }
}
</style>
