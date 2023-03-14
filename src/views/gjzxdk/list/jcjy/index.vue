<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">基层就业代偿申请</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderLight" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderLight" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDate"
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
            prop="xn"
            label="学号"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xn"
            label="姓名"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xn"
            label="培养单位"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xn"
            label="学费金额（元）"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xn"
            label="贷款本金（元）"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xn"
            label="申请时间"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="结果状态"
            sortable="custom"
            fixed="right"
          >
            <template slot-scope="scope">
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
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="新增申请"
        :visible.sync="addModal"
        width="50%"
        @close="addCance"
        :close-on-click-modal="false"
      >
        <el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rules"
          :inline-message="true"
        >
          <el-row>
            <h3>贷款信息</h3>
            <el-col :span="12">
              <el-form-item label="贷款学年" class="grayBg" label-width="41%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款总金额（元）"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    controls-position="right"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="住宿费应收数（元）"
                prop="zsfys"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input-number
                    :min="0"
                    :max="9999999"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formAdd.zsfys"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="学费应收数（元）"
                prop="xfys"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input-number
                    :min="0"
                    :max="9999999"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formAdd.xfys"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款类型"
                prop="dklx"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.dklx" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款银行"
                prop="dkyh"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.dkyh" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dgyhList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="合同编号"
                prop="htbh"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input
                    :minlength="0"
                    :maxlength="50"
                    v-model="formAdd.htbh"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款开始时间"
                prop="dkkssj"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd "
                    v-model="formAdd.dkkssj"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款期限（月）"
                prop="dkqx"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input-number
                    :min="0"
                    :max="100"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formAdd.dkqx"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="回执检验码"
                prop="hzjym"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <el-input
                    :minlength="0"
                    :maxlength="50"
                    v-model="formAdd.hzjym"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="备注" prop="bz" :rules="rules.common">
                <el-input
                  v-model="formAdd.bz"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  placeholder="请输入内容"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="附件">
                <template slot-scope="scope">
                  <el-upload
                    action="#"
                    multiple
                    class="el-upload"
                    :auto-upload="false"
                    ref="upload"
                    :file-list="fileList"
                    :on-change="fileChange"
                    :before-remove="beforeRemove"
                  >
                    <el-button size="small" type="primary">附件上传</el-button>
                  </el-upload>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
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
        <el-form
          ref="formEdit"
          :model="formEdit"
          :rules="rules"
          :inline-message="true"
        >
          <el-row>
            <h3>贷款信息</h3>
            <el-col :span="12">
              <el-form-item label="贷款学年" class="grayBg" label-width="41%">
                <div class="sqList">
                  <span> {{ formEdit.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款总金额（元）"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.dkzje }}</div>

                  <el-input-number
                    :min="0"
                    :max="9999999"
                    v-else="editFlag == 3"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formEdit.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="住宿费应收数（元）"
                prop="zsfys"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.xfys }}</div>
                  <el-input-number
                    :min="0"
                    :max="9999999"
                    v-else="editFlag == 3"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formEdit.zsfys"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="学费应收数（元）"
                prop="xfys"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.xfys }}</div>
                  <el-input-number
                    :min="0"
                    :max="9999999"
                    v-else="editFlag == 3"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formEdit.xfys"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款类型"
                prop="dklx"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.dklxmc }}</div>
                  <el-select
                    v-model="formEdit.dklx"
                    placeholder="请选择"
                    v-else="editFlag == 3"
                  >
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款银行"
                prop="dkyh"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.dkyhmc }}</div>
                  <el-select
                    v-model="formEdit.dkyh"
                    placeholder="请选择"
                    v-else="editFlag == 3"
                  >
                    <el-option
                      v-for="(item, index) in dgyhList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="合同编号"
                prop="htbh"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.htbh }}</div>
                  <el-input
                    :minlength="0"
                    :maxlength="50"
                    v-else="editFlag == 3"
                    v-model="formEdit.htbh"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款开始时间"
                prop="dkkssj"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.dkkssj }}</div>
                  <el-date-picker
                    v-else="editFlag == 3"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd "
                    v-model="formEdit.dkkssj"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款期限（月）"
                prop="dkqx"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.dkqx }}</div>
                  <el-input-number
                    v-else="editFlag == 3"
                    :min="0"
                    :max="100"
                    style="width: 216px"
                    controls-position="right"
                    v-model="formAdd.dkqx"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="回执检验码"
                prop="hzjym"
                :rules="rules.common"
                class="grayBg"
                label-width="41%"
              >
                <div class="sqList">
                  <div v-if="editFlag == 2">{{ formEdit.hzjym }}</div>
                  <el-input
                    v-else="editFlag == 3"
                    :minlength="0"
                    :maxlength="50"
                    v-model="formEdit.hzjym"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="备注" prop="bz" :rules="rules.common">
                <div v-if="editFlag == 2">{{ formEdit.bz }}</div>
                <el-input
                  v-else="editFlag == 3"
                  v-model="formEdit.bz"
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                  placeholder="请输入内容"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="申请材料">
                <el-upload
                  v-if="editFlag == 2"
                  action="#"
                  multiple
                  :file-list="formEdit.fileList"
                  :auto-upload="false"
                  class="el-upload"
                  :disabled="editFlag == 2 ? true : false"
                >
                </el-upload>
                <el-upload
                  v-if="editFlag == 3"
                  action="#"
                  multiple
                  class="el-upload"
                  :auto-upload="false"
                  ref="upload"
                  :file-list="formEdit.fileList"
                  :on-change="fileChangeEdit"
                  :before-remove="beforeRemoveEdit"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="editFlag == 2" @click="editCance">关 闭</el-button>
          <el-button
            type="primary"
            v-if="
              editFlag == 2 &&
              (formEdit.status == '08' || formEdit.status == '01')
            "
            class="confirm"
            @click="bianji"
            >编 辑</el-button
          >
          <el-button
            v-if="editFlag == 3"
            type="primary"
            class="confirm"
            @click="bianji1"
            >取 消</el-button
          >
          <el-button
            v-if="editFlag == 3"
            type="primary"
            class="confirm"
            @click="editClick"
            >保 存</el-button
          >
        </span>
      </el-dialog>
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="撤回" :visible.sync="chehuiModal" width="20%">
      <span>确认撤回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="ch()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj">确 定</el-button>
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
import { querywj, delwj } from "@/api/assistantWork/classEvent";
import lctCom from "@/components/lct";
import {
  nowYear,
  edit,
  query,
  del,
  back,
  tj,
  getDetails,
} from "@/api/gzzxdk/gjzxdk";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  components: { lctCom },
  data() {
    return {
      dglxList: [],
      dgyhList: [],
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formAdd: {},
      formEdit: {},
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      czlx: [],
      dmsfbzm: [],
      chehuiModal: false,
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
    this.query();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmgjzxdk"); //国家助学贷款码
    this.getCode("dmzudkyhm"); //国家助学贷款银行码
    this.getYear();
  },

  methods: {
    getYear() {
      nowYear().then((res) => {
        this.dkxn = res.errmsg;
      });
    },
    tjModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.tjArr && this.tjArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tj() {
      var data = this.val;
      tj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
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
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmgjzxdk":
            this.dglxList = res.data; //贷款类型
            break;
          case "dmzudkyhm":
            this.dgyhList = res.data; //银行
            break;
        }
      });
    },
    async showDetail(row) {
      let res = await getDetails({
        id: row.id,
      });
      // async await的正确用法是await返回值，而不是直接.then之后获取值
      if (res.errcode == "00") {
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
      }
      // await this.querywj(row.id);
      // this.formEdit = row;
      // await getDetails({
      //   id: row.id,
      // }).then((res) => {
      //   console.log("limian");
      //   this.formEdit = res.data;
      //   if (res.data.fileList && res.data.fileList.length > 0) {
      //     this.formEdit.fileList = res.data.fileList.map((ele) => {
      //       return {
      //         name: ele.fileName,
      //         ...ele,
      //       };
      //     });
      //   }
      //   this.editModal = true;
      // });
      // console.log("waimian");
    },
    // querywj(data) {
    //   if (this.formEdit.fileList && this.formEdit.fileList.length > 0) {
    //     this.formEdit.fileList = [];
    //   }
    //   //用于文件查询
    //   querywj({ businesId: data }).then((res) => {
    //     if (res.data && res.data.length > 0) {
    //       this.formEdit.fileList = res.data.map((ele) => {
    //         return {
    //           name: ele.fileName,
    //           ...ele,
    //         };
    //       });
    //     }
    //     this.editModal = true;
    //   });
    // },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      back({ ids: this.delArr }).then((res) => {
        this.$message.success("撤回成功");
        this.query();
        this.chehuiModal = false;
      });
    },
    chModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.chehuiModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    del() {
      del({ ids: this.delArr }).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
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
    beforeRemoveEdit(file, fileList) {
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
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
    bianji() {
      this.editFlag = 3;
    },
    bianji1() {
      this.editFlag = 2;
      this.$refs.formEdit.resetFields();
    },
    editCance() {
      this.editModal = false;
      this.editFlag = 2;
      this.$refs.formEdit.resetFields();
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formEdit;
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
        formData.append("xh", this.$store.getters.userId);
        formData.append("shrgh", "");
        formData.append("id", data.id);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.query();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd;
        let formData = new FormData();
        formData.append("dkxn", this.dkxn);
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
        formData.append("xh", this.$store.getters.userId);
        formData.append("shrgh", "");
        formData.append("id", "");
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    query() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      query(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.$router.push({
        path: "/jcjyadd",
      });
      // this.formAdd = {
      //   xn: this.dkxn, //贷款学年
      //   bz: "", //备注
      //   zsfys: "", //
      //   xfys: "", //
      //   dkzje: "",
      //   dklx: "",
      //   dkyh: "",
      //   htbh: "",
      //   dkkssj: "",
      //   dkqx: "",
      //   hzjym: "",
      // }; // 每次打开弹框先将弹框的table数组置空
      // this.fileList = [];
      // this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
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
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
}
.chDis {
  background: url("~@/assets/dangan/chDisable.png");
}
.Edit {
  background: url("~@/assets/images/edit.png");
}
.EditDis {
  background: url("~@/assets/dangan/editDisable.png") no-repeat;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
.mt15 {
  margin-top: 15px;
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
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          color: #000;
          // vertical-align: middle;
        }

        // dialog标题下加一条线

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
        .chIcon {
          margin-top: 10px;
          background: url("~@/assets/dangan/chIcon.png") no-repeat;
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
        .tjIcon {
          margin-top: 10px;
          background: url("~@/assets/assistantPng/out.png") no-repeat;
        }
      }
    }
  }
}
</style>
