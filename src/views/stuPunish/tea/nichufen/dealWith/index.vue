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
              v-model="moreIform.ssdwdm"
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
              v-model="moreIform.bjdm"
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
            <span>建议处分等级：</span>
            <el-select
              v-model="moreIform.jycfdjmList"
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
          <el-col :span="6">
            <span>审核状态：</span>
            <el-select
              v-model="moreIform.statusList"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in ztStatus"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
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
          <span class="title">已处理列表</span>
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
          <div class="btns borderOrange" @click="expor">
            <i class="icon orangeIcon"></i><span class="title">导出</span>
          </div>
          <div class="btns fullGreen" @click="chehui">
            <i class="icon backIcon"></i><span class="title1">撤回</span>
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
          <el-table-column prop="xh" label="学号" sortable="custom" />
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="ssdwdmmc"
            label="培养单位"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="bjdmmc" label="班级" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="wjssmsFdy"
            label="违纪事实描述"
            min-width="130px"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jycfdjmmc"
            label="建议处分等级"
            min-width="130px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sqsj"
            label="申请时间"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="statusChinese"
            label="审核状态"
            min-width="100px"
            sortable="custom"
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
              <!-- <div class="formLeft"><span class="title">学院意见</span></div> -->
              <div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item label="违纪事实描述" label-width="120px">
                      {{ formDetails.wjssmsFdy }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="处分依据条款" label-width="120px">
                      {{ formDetails.cfyjtkFdy }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="建议处分等级" label-width="120px">
                      {{ formDetails.jycfdjmmc }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="单位建议" label-width="120px">
                      {{ formDetails.dwjyFdy }}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item label="附件信息" label-width="120px">
                      <div v-for="item in formDetails.fileList">
                        <div
                          style="display: flex; justify-content: space-between"
                        >
                          <a>
                            {{ item.fileName }}
                          </a>
                          <!-- <el-button>预览</el-button> -->
                        </div>
                      </div>
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
      <el-dialog
        title="详情"
        :visible.sync="editModal"
        width="50%"
        :close-on-click-modal="false"
      >
        <div class="headline2">处理决定告知书</div>
        <div class="backDetail" style="margin-left: 30px; margin-right: 30px">
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
        <div class="headline">学院意见</div>
        <div style="margin-left: 30px; margin-right: 30px">
          <el-form
            ref="formEdit"
            :model="formEdit"
            :rules="rules"
            label-width="130px"
          >
            <el-form-item
              label="违纪事实描述"
              prop="wjssmsXgbfzr"
              :rules="rules.common"
            >
              <el-input
                type="textarea"
                v-model="formEdit.wjssmsXgbfzr"
                maxlength="500"
              />
            </el-form-item>
            <el-form-item
              label="处分依据条款"
              prop="cfyjtkXgbfzr"
              :rules="rules.common"
            >
              <el-input
                type="textarea"
                v-model="formEdit.cfyjtkXgbfzr"
                maxlength="500"
              />
            </el-form-item>
            <el-form-item label="处分等级" prop="cfdjm" :rules="rules.common">
              <el-select v-model="formEdit.cfdjm" placeholder="请选择">
                <el-option
                  v-for="(item, index) in cfdjOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="单位建议"
              prop="dwjyXgbfzr"
              :rules="rules.common"
            >
              <el-input
                type="textarea"
                v-model="formEdit.dwjyXgbfzr"
                maxlength="500"
              />
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
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
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="撤回" :visible.sync="chehuiModal" width="20%">
      <template>
        <div style="margin-bottom: 10px;"><span>{{ statusName }}理由:</span></div>
        
        <el-input placeholder="请输入理由" v-model="chehuily"></el-input>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="chConfirm()"
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
import CheckboxCom from "../../../../components/checkboxCom";
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import {
  queryYshList,
  exportYsh,
  wjcfDetail,
  updateQgzxGw,
  chbyId,
} from "@/api/stuPunish/nichufen";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { getBJ, getZY } from "@/api/student/index";
import { getCollege } from "@/api/class/maintenanceClass";
import lctCom from "../../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
  components: { CheckboxCom, lctCom },
  data() {
    return {
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
        bjdm: [],
        jycfdjmList: [],
        statusList: [],
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
      editModal: false,
      formDetails: {},
      formEdit: {},
      basicInfo: {},
      chehuiModal: false,
      chehuily: "",
      delArr: [],
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      statusName: "",
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
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.bjdm = []; // 班级
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
        ssdwdm: this.moreIform.ssdwdm,
        bjdm: this.moreIform.bjdm,
        jycfdjmList: this.moreIform.jycfdjmList,
        statusList: this.moreIform.statusList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
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
      // console.log("row", row);
      queryKnssqxsjbxx({ xh: row.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      wjcfDetail({ id: row.id }).then((res) => {
        if (this.$store.getters.roleId == "03") {
          //学工部负责人
          this.formEdit = res.data;
          this.editModal = true;
        } else {
          this.formDetails = res.data;
          this.detailModal = true;
        }
      });
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
    detailCancel() {
      this.detailModal = false;
      this.editModal = false;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var params = {
          xh: this.basicInfo.xh,
          wjssmsXgbfzr: this.formEdit.wjssmsXgbfzr,
          cfyjtkXgbfzr: this.formEdit.cfyjtkXgbfzr,
          cfdjm: this.formEdit.cfdjm,
          dwjyXgbfzr: this.formEdit.dwjyXgbfzr,
          id: this.formEdit.id,
        };
        updateQgzxGw(params).then((res) => {
          this.$message.success("处分告知书修改成功");
          this.editModal = false;
          this.handleSearch();
        });
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
        ssdwdm: this.moreIform.ssdwdm,
        bjdm: this.moreIform.bjdm,
        jycfdjmList: this.moreIform.jycfdjmList,
        statusList: this.moreIform.statusList,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
        // pyccm: this.training.choose || [],

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
    chehui() {
      if (this.delArr && this.delArr.length > 0) {
        var flag = 1;
        if (this.delArr.length > 1) {
          this.$message.error("请选择单条数据！");
          this.handleSearch();
        } else {
          for (let index = 0; index < this.delArr.length; index++) {
            if (
              this.multipleSelection[index].status !== "10" &&
              this.multipleSelection[index].status !== "09"
            ) {
              this.$message.error("请选择已通过或拒绝状态数据！");
              flag = 2;
              break;
            }
          }
          if (flag == 1) {
            if (this.multipleSelection[0].status == "10") {
              this.statusName = "拒绝";
            } else {
              this.statusName = "已通过";
            }
            this.chehuily = "";
            this.chehuiModal = true;
          }
        }
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    chConfirm() {
      if (this.chehuily == "") {
        this.$message.error("请输入撤回理由！");
      } else {
        var statusChe = "";
        if (this.multipleSelection[0].status == "10") {
          statusChe = "09";
        } else {
          statusChe = "10";
        }
        var data = {
          id: this.multipleSelection[0].id,
          message: this.chehuily,
          mkId: "5a9f04c6-dcf6-11ed-850b-52549e666099", //违纪处分模块
          processid: this.multipleSelection[0].processId,
          status: statusChe,
        };
        chbyId(data).then((res) => {
          this.handleSearch();
          this.chehuiModal = false;
          this.$message.success("撤销成功");
        });
      }
    },
    chCancel() {
      this.chehuiModal = false;
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
  .headline2 {
    padding: 15px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
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
