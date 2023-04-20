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
            <span>处分等级：</span>
            <el-select
              v-model="moreIform.cfdj"
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
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >处分日期：</el-col
          >
          <el-col :span="20">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="queryParams.cfrq"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学生列表</span>
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
          <!-- <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns borderRed" @click="back" v-show="AUTHFLAG">
            <i class="icon backIcon"></i><span class="title">退回</span>
          </div>
          <div class="btns borderRed" @click="refuse" v-show="AUTHFLAG">
            <i class="icon refuseIcon"></i><span class="title">拒绝</span>
          </div> -->
          <div class="btns fullGreen" @click="assign">
            <i class="icon passIcon"></i><span class="title1">指派</span>
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
            prop="wjssmsXgbfzr"
            label="违纪事实描述"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="cfdjmmc" label="处分等级"> </el-table-column>
          <el-table-column prop="cfrq" label="处分日期"> </el-table-column>
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
        @close="editCance"
        width="80%"
        :close-on-click-modal="false"
      >
        <template>
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            :inline-message="true"
          >
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
                  <el-form-item
                    label="岗位名称"
                    prop="gwList"
                    :rules="rules.common"
                  >
                    <el-select
                      v-model="formEdit.gwList"
                      placeholder="请选择"
                      @change="setOther"
                    >
                      <el-option
                        v-for="(item, index) in gwList"
                        :key="index"
                        :label="item.gwMainMc"
                        :value="item.id"
                      ></el-option>
                    </el-select>
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
                  <el-form-item label="时长" prop="xs" :rules="rules.common">
                    <el-input-number
                      v-model="formEdit.xs"
                      :min="0"
                      :max="9999"
                      controls-position="right"
                    ></el-input-number>
                    <span>学时</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="谈话总次数"
                    prop="thcs"
                    :rules="rules.common"
                  >
                    <el-input-number
                      v-model="formEdit.thcs"
                      :min="0"
                      :max="9999"
                      controls-position="right"
                    ></el-input-number>
                    <span>次</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="最早可结束时间"
                    prop="zzkjssj"
                    :rules="rules.common"
                  >
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd "
                      v-model="formEdit.zzkjssj"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="handleConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
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
                        <div class="content">{{ stuInfo.xh }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">姓名</div>
                        <div class="content">{{ stuInfo.xm }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">性别</div>
                        <div class="content">{{ stuInfo.xbmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养层次</div>
                        <div class="content">{{ stuInfo.pyccmmc }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">培养单位</div>
                        <div class="content">{{ stuInfo.ssdwdmmc }}</div>
                      </div>
                    </el-col>

                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">年级</div>
                        <div class="content">{{ stuInfo.ssnj }}</div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">专业</div>
                        <div class="content">{{ stuInfo.zydmmc }}</div>
                      </div>
                    </el-col>
                    <el-col :span="12" class="rowStyle">
                      <div class="wrap">
                        <div class="title">班级</div>
                        <div class="content">{{ stuInfo.bjmc }}</div>
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
  </div>
</template>

<script>
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { delwj } from "@/api/assistantWork/classEvent";
import {
  queryZpList,
  saveZp,
  queryGwListAll,
} from "@/api/stuPunish/jzjyAssign";
import { xhQuery } from "@/api/dailyBehavior/lskn";
import { getCollege } from "@/api/class/maintenanceClass";

import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ } from "@/api/student/index";
import { getYears } from "@/api/test/fdySelfTest";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { wjcfDetail } from "@/api/stuPunish/nichufen";
export default {
  name: "dksh",
  data() {
    return {
      showExport: false,
      detailModal: false,
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        nd: "",
        cfdj: [],
      },
      gwList: [],
      tableDataDetail: [],
      cfdjOps: [],
      editModal: false,
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
      formEdit: {},
      formDetails: {},
      basicInfo: {},
      stuInfo: {},
      exportParams: {},
      leng: 0,
      tableData: [],

      allDwh: [],
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        cfrq: "",

        orderZd: "",
        orderPx: "",
      },

      AUTHFLAG: false,
    };
  },

  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getAllCollege();
    this.getCode("dmcfdjm");
    this.getSchoolYears();
  },

  methods: {
    editCance() {
      this.editModal = false;
      this.$refs.formEdit.resetFields();
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
    },

    handleCancel() {
      this.editModal = false;
    },

    handleConfirm() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          gwid: this.formEdit.gwList,
          id: this.multipleSelection[0].id,
          xs: this.formEdit.xs,
          zzkjssj: this.formEdit.zzkjssj,
          thcs: this.formEdit.thcs,
          jzjyzt: "03",
        };
        saveZp(data).then((res) => {
          this.editModal = false;

          this.handleSearch();
        });
      }
    },

    assign() {
      if (this.multipleSelection.length != 1) {
        this.$message.error("请勾选一名学生！");
      } else {
        let row = this.multipleSelection[0];
        this.editModal = true;
        xhQuery({ xh: row.xh }).then((res) => {
          this.basicInfo = res.data;
        });
        queryGwListAll()
          .then((res) => {
            this.gwList = res.data;
          })
          .catch((err) => {});
      }
    },
    setOther(val) {
      for (let item of this.gwList) {
        if (val == item.id) {
          this.$set(this.formEdit, "gwTypeMc", item.gwTypeMc);
          this.$set(this.formEdit, "gwYrbmc", item.gwYrbmc);
          this.$set(this.formEdit, "gwKjnrs", item.gwKjnrs);
          this.$set(this.formEdit, "gwGzdd", item.gwGzdd);
          this.$set(this.formEdit, "gwZdls", item.gwZdls);
          this.$set(this.formEdit, "gwLxfs", item.gwLxfs);
          this.$set(this.formEdit, "gwGznr", item.gwGznr);
        }
      }
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
      this.detailModal = true;
      this.tableDataDetail[0] = row;
      queryKnssqxsjbxx({ xh: row.xh }).then((res) => {
        this.stuInfo = res.data;
      });
      wjcfDetail({ id: row.id }).then((res) => {
        this.formDetails = res.data;
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
        xn: this.moreIform.xn,
        cfdjm: this.moreIform.cfdj,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        jzjyzt: "02",
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
            case "dmcfdjm":
              this.cfdjOps = res.data; //贷款类型
              break;
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.commonParams = this.multipleSelection.map((v) => ({
      //   businesId: v.businesId,
      //   processId: v.processid,
      //   status: v.status,
      //   taskId: v.taskId,
      //   xh: v.xh,
      // }));
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
