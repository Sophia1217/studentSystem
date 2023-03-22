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
            <span>申请类型：</span>
            <el-select
              v-model="moreIform.sqlx"
              collapse-tags
              placeholder="请选择"
              size="small"
              clearable
            >
              <el-option
                v-for="item in sqlxOps"
                :key="item.mc"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.status"
              multiple
              placeholder="请选择"
              collapse-tags
            >
              <el-option
                v-for="(item, index) in ztStatus"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>申请时间：</span>
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="datePicker"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
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
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <!-- <div class="btns borderRed" @click="back">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div> -->
          <div class="btns fullGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">加入</span>
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
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xh" label="学号" width="100" sortable>
          </el-table-column>
          <el-table-column prop="xm" label="姓名" width="85" sortable>
          </el-table-column>
          <el-table-column
            prop="dwhmc"
            label="培养单位"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqJe"
            label="申请金额（元）"
            min-width="135"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="jmJe"
            label="减免金额（元）"
            min-width="135"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqlx"
            label="申请类型"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column property="fjName" label="申请附件" width="140">
            <template slot-scope="scope">
              <div class="moban">
                <div class="content">
                  <el-button
                    type="text"
                    size="small"
                    @click="xzWj(scope.row, 1)"
                  >
                    <span class="handleName">{{ scope.row.fjName }}</span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="statusChinese"
            label="状态"
            min-width="100"
            sortable
          >
          </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">申报详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="申报详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
      >
        <template>
          <div class="baseInfo">
            <el-form :model="formDetails">
              <div class="formLeft"><span class="title">基本信息</span></div>
              <div class="backDetail">
                <div class="formRight">
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">学号</div>
                        <div class="content">{{ basicInfo.xh }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">姓名</div>
                        <div class="content">{{ basicInfo.xm }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ basicInfo.pyccmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ basicInfo.dwhmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ basicInfo.zydmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ basicInfo.nj }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">班级</div>
                        <div class="content">{{ basicInfo.bjmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">困难等级</div>
                        <div class="content">{{ basicInfo.kndjMc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="formLeft"><span class="title">申请信息</span></div>
              <div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item
                      label="申请金额"
                      label-width="120px"
                      prop="sqJe"
                    >
                      {{ formDetails.sqJe }}
                      <span style="margin-left: 10px">元</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" v-show="formDetails.sqLx == '减免'">
                    <el-form-item
                      label="减免金额"
                      label-width="120px"
                      prop="jmJe"
                    >
                      <span>{{ formDetails.jmJe }}</span>
                      <span style="margin-left: 10px">元</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item
                      label="申请理由"
                      label-width="120px"
                      prop="sqLy"
                    >
                      {{ formDetails.sqLy }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="附件" label-width="120px" prop="sqsj">
                      {{ formDetails.fjName }}
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer footerFlex">
          <el-button
            @click="detailCancel"
            style="margin-right: 12px; padding: 8px 20px"
            >关 闭</el-button
          >
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
    <el-dialog title="新增" :visible.sync="addModal" width="60%">
      <template>
        <div class="search">
          <div style="margin: 0px 15px">
            <el-input v-model="xm" placeholder="请输入学生姓名" clearable />
          </div>
          <div class="btns borderBlue" @click="queryAllXs">
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
            <el-table-column prop="xh" label="学号" sortable> </el-table-column>
            <el-table-column prop="xm" label="姓名" sortable> </el-table-column>
            <el-table-column prop="xb" label="性别" sortable> </el-table-column>
            <el-table-column prop="nj" label="年级" sortable> </el-table-column>
            <el-table-column prop="dwmc" label="学院" sortable>
            </el-table-column>
            <el-table-column prop="zymc" label="专业" sortable>
            </el-table-column>
            <el-table-column prop="bjmc" label="班级" sortable>
            </el-table-column>
            <el-table-column prop="sfkns" label="是否困难生" sortable>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <pagination
        v-show="queryParams2.totalAdd > 0"
        :total="queryParams2.totalAdd"
        :page.sync="queryParams2.pageNum"
        :limit.sync="queryParams2.pageSize"
        @pagination="queryAllXs"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import { xhQuery } from "@/api/dailyBehavior/lskn";
import {
  queryYshList,
  exportYsh,
  addFlow,
} from "@/api/dailyBehavior/illnessHelpTea";
import { queryStuList } from "@/api/familyDifficulties/difficultTea";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
import { getCollege } from "@/api/class/maintenanceClass";
import lctCom from "../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
      showExport: false,
      lctModal: false,
      ztStatus: [],
      zdOps: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        sqlx: "",
        status: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      commonParams: [],
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
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        totalAdd: 0,
        orderZd: "",
        orderPx: "",
      },
      multipleSelection: [],
      tempRadio: false,
      detailModal: false,
      tableDetails: [],
      formDetails: {},
      formAdd: { xsxh: "" },
      shjgOps: [
        { dm: "01", mc: "通过" },
        { dm: "02", mc: "拒绝" },
        { dm: "03", mc: "退回" },
      ],
      sqlxOps: [{ mc: "救助" }, { mc: "减免" }],
      basicInfo: {},
      addModal: false,
      fileList: [],
      addData: [],
      xm: "",
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.handleSearch();
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); // 培养层次
  },

  methods: {
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.businesId);
      }
      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      exportYsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "大病优惠已处理列表导出.xlsx", "xlsx");
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
        dwh: this.moreIform.dwh,
        sqlx: this.moreIform.sqlx,
        status: this.moreIform.status,
        // pyccm: this.training.choose || [],
        sqsjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        sqsje:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    getCode1(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },

    hadleDetail(row) {
      console.log("row", row);
      this.formDetails = row;
      this.commonParams = [
        {
          businesId: row.businesId,
          processId: row.processid,
          status: row.status,
          taskId: row.taskId,
          xh: row.xh,
          mk: row.sqlx,
        },
      ];
      xhQuery({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      this.detailModal = true;
    },
    detailCancel() {
      this.detailModal = false;
      this.commonParams = [];
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dwh: this.moreIform.dwh,
        sqlx: this.moreIform.sqlx,
        status: this.moreIform.status,
        // pyccm: this.training.choose || [],
        sqsjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        sqsje:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryYshList(data)
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
    handleCloseLct() {
      this.lctModal = false;
    },
    //流程
    lctClick(row) {
      if (!!row.processId) {
        this.$refs.child.inner(row.processId);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
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
    //下载附件
    xzWj(row) {
      Exportwj({ id: row.fjId.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, row.fjName);
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processId,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
        mk: v.sqlx,
      }));
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
    // 表单校验
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
    //新增查询所有学生
    queryAllXs() {
      let data = {
        xm: this.xm,
        pageNum: this.queryParams2.pageNum,
        pageSize: this.queryParams2.pageSize,
        orderZd: this.queryParams2.orderZd,
        orderPx: this.queryParams2.orderPx,
      };
      addFlow(data)
        .then((res) => {
          this.addData = res.data;
          this.queryParams2.totalAdd = res.totalCount;
        })
        .catch((err) => {});
    },
    //通过
    xinzeng() {
      this.addModal = true;
      this.formAdd = {
        id: "",
        sqJe: "",
        sqLy: "",
        xsxh: "",
      };
      this.fileList = [];
    },
    addCance() {
      this.addModal = false;
    },
    addClick() {
      if (this.multipleSelection2.length > 0) {
        let xhs = [];
        for (let item_row of this.multipleSelection2) {
          xhs.push(item_row.xh);
        }
        let data = {
          // xhs: xhs,
          // gwId: this.gwId,
          // ly: "1",
          xm: this.xm,
        };
        addFlow(data)
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
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      }
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    //通过学号查姓名信息
    querySearchByXh(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xh = { xh: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xh).then((res) => {
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelectXh(item) {
      this.formAdd.xsxh = item.gh;
      // this.formAdd.xsxm = item.xm;
      xhQuery({ xh: item.gh }).then((res) => {
        this.basicInfo = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footerFlex {
  display: flex;
  justify-content: flex-end;
}
.lct {
  background: url("~@/assets/dangan/lct.png");
}
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
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
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
