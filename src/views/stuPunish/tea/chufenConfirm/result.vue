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
            <el-option label="确认人" value="qrrxm"></el-option>
            <el-option label="处分文号" value="cfwh"></el-option>
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
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.ssdwdm"
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
            <span>处分等级：</span>
            <el-select
              v-model="moreIform.cfdjmList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in cfdjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="20">
            <span>处分日期：</span>
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
          <span class="title">学生列表</span>
          <div style="margin-left: 10px">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导入</span>
          </div> -->
          <div class="btns borderBlue" @click="mbDown">
            <i class="icon downIcon"></i><span class="btutitle">模板下载</span>
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
              <i class="icon blueIcon"></i><span class="btutitle">导入</span>
            </el-upload>
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
          <el-table-column
            prop="xh"
            label="学号"
            width="100px"
            sortable="custom"
          />
          <el-table-column
            prop="xm"
            label="姓名"
            width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="ssdwdmmc"
            label="培养单位"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="cfdjmmc"
            label="处分等级"
            width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="qrr"
            label="确认人"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="cfrq"
            label="处分日期"
            min-width="135px"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.cfrq"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 135px"
                :clearable="false"
                @change="changeSJ(scope.row, 1)"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="cfrq"
            label="处分期限"
            min-width="230px"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="scope.row.datePickerEdit"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 230px"
                :clearable="false"
                
                @input="editCfqx(scope.row)"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            prop="cfwh"
            label="处分文号"
            min-width="130px"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.cfwh"
                maxlength="100"
                placeholder="请输入"
                @change="changeSJ(scope.row, 3)"
              />
            </template>
          </el-table-column>
          <el-table-column label="附件" min-width="350">
            <template slot-scope="scope">
              <div>
                <div v-for="item in scope.row.fileList">
                  <div style="display: flex; justify-content: space-between">
                    <el-button type="text" size="small" @click="xzWj(item)">
                      <span class="handleName">{{ item.fileName }}</span>
                    </el-button>
                    <el-button type="text" size="small" @click="delWj(item)">
                      <span>删除</span>
                    </el-button>
                  </div>
                </div>
                <el-upload
                  accept=".pdf,.jpg"
                  :auto-upload="true"
                  :action="uploadUrlUp"
                  :show-file-list="false"
                  :headers="fileHeader"
                  :data="fileDataUp"
                  :on-success="upLoadSuccess"
                  :on-error="upLoadError"
                >
                  <el-button
                    type="text"
                    size="small"
                    style="margin-left: 10px"
                    @click="thmb(scope.row)"
                  >
                    <span class="handleName">上传协议附件</span>
                  </el-button>
                </el-upload>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column> -->

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
        title="详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
      >
        <template>
          <div class="baseInfo">
            <el-form :model="formDetails">
              <!-- <div class="formLeft"><span class="title">基本信息</span></div> -->
              <div class="backDetail">
                <div class="formRight">
                  <el-row :gutter="20">
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
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">性别</div>
                        <div class="content">{{ basicInfo.xbmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ basicInfo.pyccmmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ basicInfo.ssdwdmmc }}</div>
                      </div>
                    </el-col>

                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ basicInfo.ssnj }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ basicInfo.zydmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">班级</div>
                        <div class="content">{{ basicInfo.bjmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="formLeft"><span class="title">学院意见</span></div>
              <div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="违纪事实描述" label-width="120px">
                      {{ formDetails.wjssmsXgbfzr }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="处分依据条款" label-width="120px">
                      {{ formDetails.cfyjtkXgbfzr }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="处分等级" label-width="120px">
                      {{ formDetails.cfdjmmc }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="单位建议" label-width="120px">
                      {{ formDetails.dwjyXgbfzr }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-table
                  :data="tableDataDetail"
                  ref="multipleTable"
                  style="width: 100%"
                >
                  <el-table-column prop="cfrq" label="处分日期">
                  </el-table-column>
                  <el-table-column prop="cfqxStart" label="处分开始日期">
                  </el-table-column>
                  <el-table-column prop="cfqxEnd" label="处分结束日期">
                  </el-table-column>
                  <el-table-column
                    prop="cfwh"
                    label="处分文号"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column prop="fjName" label="附件" min-width="140">
                    <template slot-scope="scope">
                      <div v-for="item in scope.row.fileList">
                        <div
                          style="display: flex; justify-content: space-between"
                        >
                          <el-button
                            type="text"
                            size="small"
                            @click="xzWj(item)"
                          >
                            <span class="handleName">{{ item.fileName }}</span>
                          </el-button>
                          <!-- <el-button
                            type="text"
                            size="small"
                            @click="delWj(item)"
                          >
                            <span>删除</span>
                          </el-button> -->
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form>
          </div>
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import { querywj, Exportwj, delwj } from "@/api/assistantWork/classEvent";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import {
  querycfjgList,
  updateCfjg,
  mbDown,
} from "@/api/stuPunish/chufenConfirm";
import { exportYsh, wjcfDetail } from "@/api/stuPunish/nichufen";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { getCollege } from "@/api/class/maintenanceClass";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getToken } from "@/utils/auth";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  computed: {
    fileDataUp: {
      get() {
        return {
          pageType: "xscf",
          roleType: "rcsw",
          businesId: this.businesId,
        };
      },
    },
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
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswWjcf/importExcelCfjg",
      uploadUrlUp:
        process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
      businesId: "",
      showExport: false,
      lctModal: false,
      ztStatus: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        ssdwdm: [], // 学院下拉框
        cfdjmList: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      allDwh: [],
      bjOps: [],
      cfdjOps: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        total: 0,
        xn: "",
        xqm: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      detailModal: false,
      formDetails: {},
      basicInfo: {},
      delArr: [],
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      tableDataDetail: [],
      fileList: [],
      fileListAdd: [],
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
    this.getXnxq();
    this.getAllCollege();
    this.getCode1("dmcfdjm"); // 处分等级
    this.getCode1("dmsplcm");
  },

  methods: {
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }
        this.queryParams.xn = this.dqXnxq[0];
        this.queryParams.xqm = this.dqXnxq[1];
        this.handleSearch();
      });
    },
    handleChangeXnxq() {
      this.queryParams.xn = " ";
      this.queryParams.xqm = "";
      if (this.dqXnxq[0]) {
        this.queryParams.xn = this.dqXnxq[0];
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqm = this.dqXnxq[1];
      }
      this.handleSearch();
    },
    //模板下载
    mbDown() {
      mbDown().then((res) => {
        this.downloadFn(res, "处分结果学生列表模板下载", "xlsx");
        this.$message.success("操作成功");
      });
    },
    //导入失败
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.handleSearch();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      this.exportParams.pageNum = 0;
      this.$set(this.exportParams, "ids", ids);
      exportYsh(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "违纪处分已处理列表导出.xlsx", "xlsx");
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
        qrrxm: this.select == "qrrxm" ? this.searchVal : null,
        cfwh: this.select == "cfwh" ? this.searchVal : null,
        ssdwdm: this.moreIform.ssdwdm,
        cfdjmList: this.moreIform.cfdjmList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
        cfrqStart:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        cfrqEnd:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        // pyccm: this.training.choose || [],

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
          case "dmcfdjm": //处分等级
            this.cfdjOps = res.data;
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
      this.tableDataDetail[0] = row;
      queryKnssqxsjbxx({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      wjcfDetail({ id: row.id }).then((res) => {
        this.formDetails = res.data;
        this.detailModal = true;
      });
    },
    detailCancel() {
      this.detailModal = false;
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        qrrxm: this.select == "qrrxm" ? this.searchVal : null,
        cfwh: this.select == "cfwh" ? this.searchVal : null,
        ssdwdm: this.moreIform.ssdwdm,
        cfdjmList: this.moreIform.cfdjmList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
        cfrqStart:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        cfrqEnd:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        // pyccm: this.training.choose || [],

        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      querycfjgList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
          this.insertDate();
        })
        .catch((err) => {});
    },
    //处分期限赋值
    insertDate() {
      if (this.tableData.length > 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].cfqxEnd !== null) {
            this.tableData[i].datePickerEdit = [];
            this.tableData[i].datePickerEdit.push(this.tableData[i].cfqxStart);
            this.tableData[i].datePickerEdit.push(this.tableData[i].cfqxEnd);
            // this.tableData[i].datePickerEdit[0] = this.tableData[i].cfqxStart ||"";
            // this.tableData[i].datePickerEdit[1] = this.tableData[i].cfqxEnd ||"";
          }
        }
      }

      // console.log("row", this.tableData);
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
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.id);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    editCfqx(row){
      this.changeSJ(row,2);
    },
    changeSJ(row, flag) {
      if (flag == 1) {
        var data = {
          id: row.id,
          cfrq: row.cfrq,
        };
      } else if (flag == 2) {
        var data = {
          id: row.id,
          cfqxStart: row.datePickerEdit[0],
          cfqxEnd: row.datePickerEdit[1],
        };
      } else {
        var data = {
          id: row.id,
          cfwh: row.cfwh,
        };
      }
      updateCfjg(data).then((res) => {
        this.$message.success("修改成功");
        this.handleSearch();
      })
      .catch((err) => {
        this.handleSearch();
      });
    },
    thmb(row) {
      this.businesId = row.id;
    },
    //下载附件
    xzWj(item) {
      Exportwj({ id: item.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, item.fileName);
      });
    },
    delWj(item) {
      delwj({ id: item.id.toString() }).then((res) => {
        this.$message.success("附件删除成功");
        this.handleSearch();
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
  .moban {
    display: flex;
    // flex-direction: row;
    justify-content: space-between;
    .inline-block {
      display: inline-block;
    }
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
        flex-direction: row;
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
          .btutitle {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
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
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
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
