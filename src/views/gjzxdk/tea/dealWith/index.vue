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
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >贷款总金额（区间）</el-col
          >
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeStart"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
          <el-col :span="0.5" style="margin-top: 7px; margin-left: -52px">
            ——
          </el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeEnd"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >申请时间：</el-col
          >
          <el-col :span="20">
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="queryParams.dksjArr"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="3">审核状态：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.ztStatus"
                multiple
                collapse-tags
                placeholder="请选择审核状态"
                size="small"
              >
                <el-option
                  v-for="(item, index) in ztStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">已处理列表</span> <i class="Updataicon"></i>
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
            prop="dkzje"
            label="贷款总金额（元）"
            min-width="100"
          >
          </el-table-column>
          <el-table-column prop="dkqx" label="贷款期限（月）"> </el-table-column
          ><el-table-column prop="sqsj" label="申请时间"> </el-table-column>
          <el-table-column prop="status" label="审核状态" sortable="custom">
            <template slot-scope="scope" fixed="right">
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in ztStatus"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            :show-overflow-tooltip="true"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程记录</span>
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
        :visible.sync="editModal"
        @close="editCance"
        width="50%"
        :close-on-click-modal="false"
      >
        <template>
          <el-form ref="formEdit" :model="formEdit" :inline-message="true">
            <el-row>
              <h3>学生信息</h3>
              <el-col :span="12">
                <el-form-item label="学号" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.xh }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.xm }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.xbmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.sfzh }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="学院" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.ssdwdmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="专业" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.zydmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="班级" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.bjdmmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学制" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.xz }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="毕业日期" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.byrq }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.lxdh }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="家庭地址" class="grayBg" label-width="21%">
                  <div class="sqList">
                    <span> {{ formEdit.jtzz }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h3>贷款信息</h3>
              <el-col :span="12">
                <el-form-item label="贷款学年" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.xn }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="贷款总金额（元）"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.dkzje }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="住宿费应收数（元）"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.zsfys }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="学费应收数（元）"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.xfys }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="贷款类型" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.dklxmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贷款银行" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.dkyhmc }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同编号" class="grayBg" label-width="42%">
                  <div class="sqList">
                    <span> {{ formEdit.htbh }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="贷款开始时间"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.dkkssj }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="贷款期限（月）"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.dkqx }}</span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="回执检验码"
                  class="grayBg"
                  label-width="42%"
                >
                  <div class="sqList">
                    <span> {{ formEdit.hzjym }}</span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="备注" prop="bz">
                  <span> {{ formEdit.bz }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请材料">
                  <el-upload
                    action="#"
                    multiple
                    class="el-upload"
                    :auto-upload="false"
                    ref="upload"
                    :file-list="formEdit.fileList"
                    :disabled="true"
                  >
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer footerFlex">
          <el-button
            @click="editCance"
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
    <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
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
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { delwj } from "@/api/assistantWork/classEvent";
import {
  yclList,
  yclExp,
  tyFlow,
  jjFlow,
  thFinal,
  edit,
  getDetails,
} from "@/api/gzzxdk/gjzxdk";
import { getCollege } from "@/api/class/maintenanceClass";
import { backFlow } from "@/api/dailyBehavior/dormTea";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ } from "@/api/student/index";
import lctCom from "../../../components/lct";
export default {
  components: { lctCom },
  data() {
    return {
      lctModal: false,
      dglxList: [],
      dgyhList: [],
      editModal: false,
      formEdit: {},
      fileListAdd: [],
      showExport: false,
      ztStatus: [],
      searchVal: "",
      select: "",
      isMore: false,
      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        ztStatus: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      updownDate: [],
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
        dkzjeEnd: 99999,
        dkzjeStart: 1,
        orderZd: "",
        orderPx: "",
      },
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
      multipleSelection1: {},
      jjModal: false,
      jjly: "",
      tableInner: [],
      thTableModal: false,
      thModal: false,
      thly: "",
      tempRadio: false,
      defaultRes: {},
      editModal: false,
      whatType: "",
      tableDetails: [{ gzgw: "", fwnr: "" }],
      upDownIndex: 0,
    };
  },

  mounted() {
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode1("dmsplcm"); //
    this.getSchoolYears();
  },

  methods: {
    fileChangeEdit(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
    },
    editCance() {
      this.editModal = false;
      this.$refs.formEdit.resetFields();
    },
    beforeRemoveEdit(file, fileList) {
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    async upDate() {
      var tarIndex = this.upDownIndex - 1;
      var tar = this.updownDate[tarIndex];
      var data = {
        xh: tar.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: tar.businesId,
      };
      this.upDownIndex = this.upDownIndex - 1;
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
    async upDate() {
      var tarIndex = this.upDownIndex - 1;
      var tar = this.updownDate[tarIndex];
      var data = {
        xh: tar.xh,
        pageNum: "",
        pageSize: "",
        orderZd: "",
        orderPx: "",
        businesId: tar.businesId,
      };
      switch (tar.mk) {
      }
      this.upDownIndex = this.upDownIndex + 1;
    },
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
      this.$set(this.exportParams, "ids", ids);
      yclExp(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "贷款已处理审核列表导出.xlsx", "xlsx");
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
        xn: this.moreIform.xn,
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        statusList: this.moreIform.ztStatus,
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        pageNum: 0,
        pageSize: 0,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    detailCancel() {
      this.editModal = false;
      this.commonParams = [];
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
    getRow(index, row) {
      this.multipleSelection1 = row;
    },
    //通过
    pass(num) {
      //如果是1，就代表是外层的通过，是2的话就是详情里面的通过，需要先提交表单参数
      if (num == 1) {
        if (this.commonParams.length > 0) {
          var data = this.commonParams.map((item) => ({
            ...item,
            opMsg: "审核通过",
          }));
          tyFlow(data).then((res) => {
            if (res.errcode == "00") {
              this.$message.success("审核已通过");
              this.editModal = false;
              this.handleSearch();
            }
          });
        } else {
          this.$message.error("请先选择一条数据");
        }
      } else {
        if (!this.checkFormEdit()) {
          this.$message.error("请完善表单相关信息！");
          return;
        } else {
          var data = this.formEdit;
          console.log("data", data);
          let formData = new FormData();
          formData.append("dkxn", data.xn);
          formData.append("bz", data.bz);
          formData.append("zsfys", data.zsfys);
          formData.append("xfys", data.xfys);
          formData.append("dkzje", data.dkzje);
          formData.append("dklx", data.dklx);
          formData.append("dkyh", data.dkyh);
          formData.append("htbh", data.htbh);
          formData.append("dkkssj", data.dkkssj);
          formData.append("dkqx", data.dkqx);
          formData.append("hzjym", data.hzjym);
          formData.append("shrgh", this.$store.getters.userId);
          formData.append("xh", data.xh);
          formData.append("id", data.id);
          if (this.fileListAdd.length > 0) {
            this.fileListAdd.map((file) => {
              formData.append("files", file.raw);
            });
          }
          edit(formData).then((res) => {
            if (res.errcode == "00") {
              var params = this.commonParams.map((item) => ({
                ...item,
                opMsg: "审核通过",
              }));
              tyFlow(params).then((res) => {
                if (res.errcode == "00") {
                  this.$message.success("审核已通过");
                  this.editModal = false;
                  this.handleSearch();
                }
              });
            } else {
              this.$message.error("编辑失败");
            }
          });
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
      jjFlow(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("已拒绝");
          this.editModal = false;
          this.handleSearch();
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
        this.thModal = true;
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
      thFinal(data).then((res) => {
        if (res.errcode == "00") {
          this.editModal = false;
          this.$message.success("退回成功");
          this.handleSearch();
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
    async hadleDetail(row) {
      //单个退回通过拒绝的参数
      this.commonParams = [
        {
          businesId: row.businesId,
          processId: row.processid,
          status: row.status,
          taskId: row.taskId,
          xh: row.xh,
        },
      ];
      await getDetails({
        id: row.businesId,
      }).then((res) => {
        this.formEdit = res.data;
        if (res.data.fileList && res.data.fileList.length > 0) {
          this.formEdit.fileList = res.data.fileList.map((ele) => {
            return {
              name: ele.fileName,
              ...ele,
            };
          });
        }
        this.editModal = true;
      });
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
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        statusList: this.moreIform.ztStatus,
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      yclList(data)
        .then((res) => {
          this.tableData = res.data;
          // this.updownDate = res.data;
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
      this.commonParams = this.multipleSelection.map((v) => ({
        businesId: v.businesId,
        processId: v.processid,
        status: v.status,
        taskId: v.taskId,
        xh: v.xh,
      }));
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
            background: url("~@/assets/assistantPng/in.png") no-repeat;
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
