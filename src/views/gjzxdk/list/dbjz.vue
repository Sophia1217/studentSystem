<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <div><span class="title">大病救助申请</span></div>
          <div
            class="btns borderBlue"
            @click="jmApply"
            v-show="currentRow.id !== '' && currentRow.status == '10'"
          >
            <span class="title1">减免申请</span>
          </div>
          <div
            class="btns borderBlue"
            @click="hkApply"
            v-show="currentRow.id !== '' && currentRow.status == '10'"
          >
            <span class="title1">提交还款</span>
          </div>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="xyDown">
            <i class="icon downIcon"></i><span class="title2">协议下载</span>
          </div>
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
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column property="sqJe" label="申请金额（元）">
          </el-table-column>
          <el-table-column property="fjName" label="申请附件" min-width="140">
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
          <el-table-column property="xyFjName" label="协议附件" min-width="140">
            <template slot-scope="scope">
              <div class="moban">
                <div class="content">
                  <el-button
                    type="text"
                    size="small"
                    @click="xzWj(scope.row, 2)"
                  >
                    <span class="handleName">{{ scope.row.xyFjName }}</span>
                  </el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="sqsj" label="申请时间"> </el-table-column>
          <el-table-column property="statusMc" label="审核状态">
          </el-table-column>
          <el-table-column
            property="jg"
            label="审核进度"
            sortable="custom"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流转记录</span>
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
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">减免申请</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDelJm">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderLight" @click="chModalJm">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderLight" @click="tjModalJm">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDateJm"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChangeJm"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="dbjzsqSqje" label="申请金额（元）">
          </el-table-column>
          <el-table-column prop="jmJe" label="减免金额（元）" width="140">
          </el-table-column>
          <el-table-column prop="sqsj" label="申请时间"> </el-table-column>
          <el-table-column prop="fjName" label="附件" width="140">
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
          <el-table-column prop="statusMc" label="审核状态"> </el-table-column>
          <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="lctClickJm(scope.row)"
              >
                <i class="scopeIncon lct"></i>
                <span>流转记录</span>
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
                @click="showDetailJm(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">还款记录</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDelHk">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableDateHk"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChangeHk"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="dhJe" label="待还金额（元）">
          </el-table-column>
          <el-table-column prop="yhJe" label="已还金额（元）">
          </el-table-column>
          <el-table-column prop="hkSj" label="还款时间"> </el-table-column>
          <el-table-column prop="fjName" label="还款凭证" width="140">
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
        </el-table>
      </div>
      <el-dialog
        :title="titleJz"
        :visible.sync="addModal"
        width="40%"
        @close="addCance"
        :close-on-click-modal="false"
      >
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <div style="padding: 15px">
            <el-row :gutter="20">
              <el-col :span="15">
                <el-form-item
                  label="申请金额"
                  prop="sqJe"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="formAdd.sqJe"
                    v-if="editFlag == 2"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number>
                  <div v-else>{{ formAdd.sqJe }} 元</div>
                  <span v-show="editFlag == 2"> 元</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="申请理由"
                  prop="sqLy"
                  :rules="rules.common"
                >
                  <el-input
                    v-model="formAdd.sqLy"
                    v-if="editFlag == 2"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5 }"
                    placeholder="请输入内容"
                    maxlength="500"
                    show-word-limit
                  ></el-input>
                  <div v-else>{{ formAdd.sqLy }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请附件">
                  <template>
                    <div
                      v-if="editFlag == 1"
                      style="display: flex; justify-content: space-between"
                    >
                      <a>
                        {{ formAdd.fjName }}
                      </a>
                    </div>
                    <div v-else>
                      <el-upload
                        action="#"
                        class="el-upload"
                        :auto-upload="false"
                        ref="upload"
                        :file-list="fileList"
                        :on-change="fileChange"
                        :before-remove="beforeRemove"
                      >
                        <el-button size="small" type="primary"
                          >附件上传</el-button
                        >
                      </el-upload>
                    </div>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
          v-show="
            (formAdd.status == '01' || formAdd.status == '08') && editFlag == 1
          "
        >
          <el-button type="primary" class="confirm" @click="EditStatus"
            >编 辑</el-button
          >
        </span>
        <span slot="footer" class="dialog-footer" v-show="editFlag == 2">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        :title="titleJm"
        :visible.sync="addModalJm"
        width="50%"
        @close="addCanceJm"
        :close-on-click-modal="false"
      >
        <el-form ref="formAddJm" :model="formAddJm" :rules="rules">
          <div style="padding: 15px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="申请金额"
                  prop="dbjzsqSqje"
                  :rules="rules.common"
                >
                  <!-- <el-input-number
                    v-model="formAddJm.dbjzsqSqje"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                  ></el-input-number> -->
                  <span>{{ formAddJm.dbjzsqSqje }} 元</span>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label="减免金额"
                  prop="jmJe"
                  :rules="rules.common"
                >
                  <el-input-number
                    v-model="formAddJm.jmJe"
                    v-if="editFlagJm == 2"
                    :min="0"
                    :max="maxJmje"
                    :controls="false"
                  ></el-input-number>
                  <div v-else>{{ formAddJm.jmJe }} 元</div>
                  <span v-show="editFlagJm == 2"> 元</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="申请理由"
                  prop="jmLy"
                  :rules="rules.common"
                >
                  <el-input
                    v-model="formAddJm.jmLy"
                    v-if="editFlagJm == 2"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 5 }"
                    placeholder="请输入内容"
                    maxlength="500"
                    show-word-limit
                  ></el-input>
                  <div v-else>{{ formAddJm.jmLy }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请附件">
                  <template>
                    <div
                      v-if="editFlagJm == 1"
                      style="display: flex; justify-content: space-between"
                    >
                      <a>
                        {{ formAddJm.fjName }}
                      </a>
                    </div>
                    <div v-else>
                      <el-upload
                        action="#"
                        class="el-upload"
                        :auto-upload="false"
                        ref="upload"
                        :file-list="fileListJm"
                        :on-change="fileChangeJm"
                        :before-remove="beforeRemoveJm"
                      >
                        <el-button size="small" type="primary"
                          >附件上传</el-button
                        >
                      </el-upload>
                    </div>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
          v-show="
            (formAddJm.status == '01' || formAddJm.status == '08') &&
            editFlagJm == 1
          "
        >
          <el-button type="primary" class="confirm" @click="EditStatusJm"
            >编 辑</el-button
          >
        </span>
        <span slot="footer" class="dialog-footer" v-show="editFlagJm == 2">
          <el-button @click="addCanceJm">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClickJm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="还款记录"
        :visible.sync="addModalHk"
        width="60%"
        @close="addCanceHk"
        :close-on-click-modal="false"
      >
        <el-form ref="formAddHk" :model="formAddHk" :rules="rules">
          <el-table :data="formAddHk.addData">
            <el-table-column
              label="待还金额（元）"
              min-width="180px"
              align="center"
              :render-header="addRedStar"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.dhJe'"
                  :rules="rules.dhJe"
                >
                  <el-input maxlength="200" v-model="scope.row.dhJe" disabled/>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="还款金额（元）"
              min-width="180px"
              align="center"
              :render-header="addRedStar"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.yhJe'"
                  :rules="rules.yhJe"
                >
                  <el-input-number
                    v-model="scope.row.yhJe"
                    :min="0"
                    :max="scope.row.dhJe"
                    :controls="false"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="还款时间"
              min-width="200px"
              align="center"
              :render-header="addRedStar"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.hkSj'"
                  :rules="rules.common"
                >
                  <el-date-picker
                    v-model="scope.row.hkSj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="还款凭证" min-width="200px">
              <template slot-scope="scope">
                <el-form-item :prop="'addData.' + scope.$index + '.fileListHk'">
                  <el-upload
                    action="#"
                    multiple
                    class="el-upload"
                    :auto-upload="false"
                    ref="upload"
                    :file-list="scope.row.fileListHk"
                    :on-change="fileChangeHk"
                    accept=".pdf,.jpg"
                    :before-remove="beforeRemoveHk"
                  >
                    <el-button size="small" type="primary">上传附件</el-button>
                  </el-upload>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCanceHk">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClickHk"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      /> -->
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
    <el-dialog title="删除" :visible.sync="delModalJm" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancelJm">取 消</el-button>
        <el-button type="primary" class="confirm" @click="delJm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delModalHk" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancelHk">取 消</el-button>
        <el-button type="primary" class="confirm" @click="delHk()"
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
    <el-dialog title="撤回" :visible.sync="chehuiModalJm" width="20%">
      <span>确认撤回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancelJm">取 消</el-button>
        <el-button type="primary" class="confirm" @click="chJm()"
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
    <el-dialog title="提交" :visible.sync="submitModalJm" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancelJm">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tjJm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
    <lctCom
      ref="childJm"
      :lctModal="lctModalJm"
      @handleCloseLct="handleCloseLctJm"
    ></lctCom>
  </div>
</template>
<script>
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../components/lct";
import { nowYear, getDetails } from "@/api/gzzxdk/gjzxdk";
import {
  queryJzsqList,
  queryJmsqList,
  queryHkjlList,
  deleteHkjl,
  deleteJmsq,
  deleteJzsq,
  importHkjl,
  importJmsq,
  importJzsq,
  tjJmsq,
  tjJzsq,
  cxByIdJmsq,
  cxByIdJzsq,
} from "@/api/dailyBehavior/illnessHelpStu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  components: { lctCom },
  watch: {
    // "formAddHk.addData.dhJe": function (newVal, oldVal) {
    //   console.log("newVal", newVal);
    //   console.log("oldVal", oldVal);
    //   var result = this.tableDateJm.filter((item) => item.status == "10");
    //   console.log("result", result);
    //   return (
    //     this.currentRow.sqJe -
    //     (result.length > 0
    //       ? result.reduce((pre, cur) => {
    //           return pre + Number(cur.jmJe);
    //         }, 0)
    //       : 0) -
    //     (this.tableDateHk.length > 0
    //       ? this.tableDateHk.reduce((pre, cur) => {
    //           return pre + Number(cur.yhJe);
    //         }, 0)
    //       : 0)
    //   );
    // },
    // deep: true,
    // immediate: true,
  },
  computed: {
    // 计算最大值
    maxJmje: {
      get() {
        var res = this.tableDateJm.filter((item) => item.status == "01");
        return (
          this.currentRow.sqJe -
          (res.length > 0
            ? res.reduce((pre, cur) => {
                return pre + Number(cur.jmJe);
              }, 0)
            : 0)
        );
      },
      set() {},
    },
  },
  data() {
    return {
      dglxList: [],
      dgyhList: [],
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      submitModalJm: false,
      lctModal: false,
      lctModalJm: false,
      addModal: false,
      addModalJm: false,
      addModalHk: false,
      editModal: false,
      editModalJm: false,
      delModal: false,
      delModalJm: false,
      delModalHk: false,
      formAdd: {
        id: "",
        sqJe: "",
        sqLy: "",
      },
      formAddJm: {
        id: "",
        dbjzsqId: "",
        dbjzsqSqje: "",
        jmJe: "",
        jmLy: "",
      },
      formAddHk: {
        addData: [
          {
            id: "",
            dbjzsqId: "",
            dbjzsqSqje: "",
            dhJe: "",
            hkSj: "",
            yhJe: "",
          },
        ],
      },
      formEdit: {},
      tableDate: [],
      tableDateJm: [],
      tableDateHk: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      fileList: [],
      fileListJm: [],
      fileListHk: [],
      delArr: [],
      delArrJm: [],
      delArrHk: [],
      fileListAdd: [],
      fileListAddJm: [],
      ztStatus: [],
      val: [],
      valJm: [],
      valHk: [],
      czlx: [],
      dmsfbzm: [],
      chehuiModal: false,
      chehuiModalJm: false,
      currentRow: { id: "" },
      titleJz: "",
      titleJm: "",
      addFlag: 1, //1新增，2详情
      addFlagJm: 1, //1新增，2详情
      editFlag: 1, //1只读，2编辑
      editFlagJm: 1, //1只读，2编辑
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
    this.queryJz();
    // this.queryJm();
    // this.queryHk();
    this.getCode("dmsplcm"); //状态
    // this.getCode("dmgjzxdk"); //国家助学贷款码
    // this.getCode("dmzudkyhm"); //国家助学贷款银行码
    // this.getYear();
  },

  methods: {
    getYear() {
      nowYear().then((res) => {
        this.dkxn = res.errmsg;
      });
    },
    //下载附件
    xzWj(row, index) {
      if (index == 1) {
        Exportwj({ id: row.fjId.toString() }).then((res) => {
          this.url = window.URL.createObjectURL(res);
          this.downloadFn(res, row.fjName);
        });
      } else if (index == 2) {
        Exportwj({ id: row.xyFjId.toString() }).then((res) => {
          this.url = window.URL.createObjectURL(res);
          this.downloadFn(res, row.xyFjName);
        });
      }
      // else {
      //   // Exportwj({ id: row.xyFjId.toString() }).then((res) => {
      //   //   this.url = window.URL.createObjectURL(res);
      //   //   this.downloadFn(res, row.xyFjName);
      //   // });
      // }
    },
    tjModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
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
      tjJzsq(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.queryJz();
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
    jmApply() {
      if (!this.currentRow.id) {
        this.$message.error("请选择大病救助申请！");
      } else {
        this.titleJm = "新增减免申请";
        this.addFlagJm = 1; //新增
        this.editFlagJm = 2;
        this.formAddJm = {
          id: "",
          // dbjzsqId: "",
          // dbjzsqSqje: "",
          jmJe: "",
          jmLy: "",
        }; // 每次打开弹框先将弹框的table数组置空
        this.fileListJm = [];
        // tableDateJm
        this.$set(this.formAddJm, "dbjzsqId", this.currentRow.id || "");
        this.$set(this.formAddJm, "dbjzsqSqje", this.currentRow.sqJe || "");
        this.addModalJm = true;
        // console.log("this.formAddJm.dbjzsqSqje", this.currentRow.sqJe);
      }
    },
    hkApply() {
      if (!this.currentRow.id) {
        this.$message.error("请选择大病救助申请！");
      } else {
        var jm = 0;
        //减免
        for (let i = 0; i < this.tableDateJm.length; i++) {
          //目前是所有状态相加，给你改一下 status == "10"
          if (this.tableDateJm[i].status == "10") {
            jm += Number(this.tableDateJm[i].jmJe);
          }
        }
        //已还款
        for (let j = 0; j < this.tableDateHk.length; j++) {
          jm += Number(this.tableDateHk[j].yhJe);
        }
        // console.log("jmje", jm);
        this.$set(
          this.formAddHk.addData[0],
          "dbjzsqId",
          this.currentRow.id || ""
        );
        this.$set(
          this.formAddHk.addData[0],
          "dbjzsqSqje",
          this.currentRow.sqJe || ""
        );
        var jmje2 = Number(this.currentRow.sqJe) - (jm || 0); //申请金额-减免金额和已还金额
        this.$set(this.formAddHk.addData[0], "dhJe", String(jmje2) || "");
        this.addModalHk = true;
        this.fileListHk = [];
      }
    },
    EditStatus() {
      this.editFlag = 2;
    },
    async showDetail(row) {
      this.titleJz = "大病救助申请详情";
      this.addFlag = 2; //详情
      this.editFlag = 1; //不可编辑
      this.formAdd = row;
      this.fileList = [];

      //用于文件查询
      if (row.fjId !== "") {
        querywj({ businesId: row.id }).then((res) => {
          if (res.data && res.data.length > 0) {
            this.fileList = res.data.map((ele) => {
              return {
                name: ele.fileName,
                ...ele,
              };
            });
          }
        });
      }
      this.addModal = true;
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      var data = this.val;
      cxByIdJzsq(data).then((res) => {
        this.$message.success("撤回成功");
        this.queryJz();
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
      deleteJzsq({ ids: this.delArr }).then((res) => {
        this.queryJz();
        this.queryJm();
        this.queryHk();
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
      this.queryJz();
    },
    handleCurrentChange(val) {
      console.log("val", val);
      this.val = [val];
      this.delArr = val == null ? [] : [val.id];
      if (val !== null) {
        this.currentRow = val;
        this.queryJm();
        this.queryHk();
      } else {
        this.currentRow = { id: "" };
      }
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
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
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
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd;
        let formData = new FormData();
        formData.append("sqJe", data.sqJe);
        formData.append("sqLy", data.sqLy);
        if (this.addFlag == 1) {
          formData.append("id", "");
          if (this.fileList.length > 0) {
            this.fileList.map((file) => {
              formData.append("files", file.raw);
            });
          }
        } else {
          formData.append("id", data.id);
          if (this.fileListAdd.length > 0) {
            this.fileListAdd.map((file) => {
              formData.append("files", file.raw);
            });
          }
        }
        // formData.append("xh", this.$store.getters.userId);
        importJzsq(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.queryJz();
            this.addModal = false;
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    queryJz() {
      // this.currentRow.id = "";
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryJzsqList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.titleJz = "新增申请";
      this.addFlag = 1; //新增
      this.editFlag = 2;
      this.formAdd = {
        id: "",
        sqJe: "",
        sqLy: "",
      }; // 每次打开弹框先将弹框的table数组置空
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    //下载
    xyDown() {
      querywj({ businesId: "大病救助" }).then((res) => {
        if (res.data && res.data.length > 0) {
          var aid = res.data[0];
          Exportwj({ id: aid.id }).then((res) => {
            this.url = window.URL.createObjectURL(res);
            this.downloadFn(res, aid.fileName);
          });
        } else {
          this.$message("附件待上传");
        }
      });
    },

    //################# 减免申请###################
    tjModalJm() {
      var falg = 1;
      for (var i = 0; i < this.valJm.length; i++) {
        if (this.valJm[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArrJm && this.delArrJm.length > 0) {
          this.submitModalJm = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tjJm() {
      var data = this.valJm;
      tjJmsq(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.queryJm();
          this.submitModalJm = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancelJm() {
      this.submitModalJm = false;
    },
    // 表单校验
    checkFormAddJm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddJm.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handleCloseLctJm() {
      this.lctModalJm = false;
    },
    lctClickJm(row) {
      if (!!row.processid) {
        this.$refs.childJm.inner(row.processid);
        this.lctModalJm = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    EditStatusJm() {
      this.editFlagJm = 2;
    },
    async showDetailJm(row) {
      this.titleJm = "减免申请详情";
      this.addFlagJm = 2; //详情
      this.editFlagJm = 1; //不可编辑
      this.formAddJm = row;
      this.fileListJm = [];

      //用于文件查询
      if (row.fjId !== "") {
        querywj({ businesId: row.id }).then((res) => {
          if (res.data && res.data.length > 0) {
            this.fileListJm = res.data.map((ele) => {
              return {
                name: ele.fileName,
                ...ele,
              };
            });
          }
        });
      }
      this.addModalJm = true;
    },
    chCancelJm() {
      this.chehuiModalJm = false;
    },
    chJm() {
      var data = this.valJm;
      cxByIdJmsq(data).then((res) => {
        this.$message.success("撤回成功");
        this.queryJm();
        this.chehuiModalJm = false;
      });
    },
    chModalJm() {
      var falg = 1;
      for (var i = 0; i < this.valJm.length; i++) {
        if (this.valJm[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArrJm && this.delArrJm.length > 0) {
          this.chehuiModalJm = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    showDelJm() {
      var falg = 1;
      for (var i = 0; i < this.valJm.length; i++) {
        if (this.valJm[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArrJm && this.delArrJm.length > 0) {
          this.delModalJm = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    delJm() {
      deleteJmsq({ ids: this.delArrJm }).then((res) => {
        this.queryJm();
        this.delModalJm = false;
        this.$message.success("删除成功");
      });
    },
    delCancelJm() {
      this.delModalJm = false;
    },
    handleSelectionChangeJm(val) {
      this.valJm = val;
      this.delArrJm = val.map((item) => item.id);
    },
    bianjiJm() {
      this.editFlag = 3;
    },
    editClickJm() {
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
        importJmsq(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.queryJm();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModalJm = false;
      }
    },
    addClickJm() {
      if (!this.checkFormAddJm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAddJm;
        let formData = new FormData();
        formData.append("dbjzsqId", data.dbjzsqId);
        formData.append("dbjzsqSqje", data.dbjzsqSqje);
        formData.append("jmJe", data.jmJe);
        formData.append("jmLy", data.jmLy);
        if (this.addFlagJm == 1) {
          formData.append("id", "");
          if (this.fileListJm.length > 0) {
            this.fileListJm.map((file) => {
              formData.append("files", file.raw);
            });
          }
        } else {
          formData.append("id", data.id);
          if (this.fileListAddJm.length > 0) {
            this.fileListAddJm.map((file) => {
              formData.append("files", file.raw);
            });
          }
        }
        // formData.append("xh", this.$store.getters.userId);
        importJmsq(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增减免申请成功");
            this.queryJm();
          } else {
            this.$message.error("新增减免申请失败");
          }
        });
        this.addModalJm = false;
      }
    },
    addCanceJm() {
      this.addModalJm = false;
      this.$refs.formAddJm.resetFields();
    },
    queryJm() {
      var data = {
        dbjzsqId: this.currentRow.id || "",
        // xh: this.$store.getters.userId,
        // pageNum: this.queryParams.pageNum,
        // pageSize: this.queryParams.pageSize,
        // orderZd: this.queryParams.orderZd,
        // orderPx: this.queryParams.orderPx,
      };
      queryJmsqList(data).then((res) => {
        this.tableDateJm = res.data;
        // this.queryParams.totalCount = res.totalCount;
      });
    },
    beforeRemoveJm(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileListJm = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    beforeRemoveEditJm(file, fileList) {
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChangeJm(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileListAddJm.push(file); //修改编辑的文件参数
      }
      this.fileListJm = fileList;
    },
    fileChangeEditJm(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
    },
    //############# 还款记录 ##########################
    queryHk() {
      var data = {
        dbjzsqId: this.currentRow.id || "",
        // xh: this.$store.getters.userId,
        // pageNum: this.queryParams.pageNum,
        // pageSize: this.queryParams.pageSize,
        // orderZd: this.queryParams.orderZd,
        // orderPx: this.queryParams.orderPx,
      };
      queryHkjlList(data).then((res) => {
        this.tableDateHk = res.data;
        // this.queryParams.totalCount = res.totalCount;
      });
    },
    addCanceHk() {
      this.addModalHk = false;
      this.$refs.formAddHk.resetFields();
    },
    addClickHk() {
      if (!this.checkFormAddHk()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAddHk.addData[0];
        let formData = new FormData();
        formData.append("dbjzsqId", data.dbjzsqId);
        formData.append("dbjzsqSqje", data.dbjzsqSqje);
        formData.append("dhJe", data.dhJe);
        formData.append("hkSj", data.hkSj);
        formData.append("yhJe", data.yhJe);
        formData.append("id", "");
        // formData.append("xh", this.$store.getters.userId);
        if (this.fileListHk.length > 0) {
          this.fileListHk.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importHkjl(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("还款新增成功");
            this.queryHk();
          } else {
            this.$message.error("还款新增失败");
          }
        });
        this.addModalHk = false;
      }
    },
    showDelHk() {
      if (this.delArrHk && this.delArrHk.length > 0) {
        this.delModalHk = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    // 表单校验
    checkFormAddHk() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddHk.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    delHk() {
      deleteHkjl({ ids: this.delArrHk }).then((res) => {
        this.queryHk();
        this.delModalHk = false;
        this.$message.success("删除成功");
      });
    },
    delCancelHk() {
      this.delModalHk = false;
    },
    handleSelectionChangeHk(val) {
      this.valHk = val;
      this.delArrHk = val.map((item) => item.id);
    },
    fileChangeHk(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      }
      this.fileListHk = fileList;
    },
    beforeRemoveHk(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileListHk = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
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
      display: flex;
      align-items: center;
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
      .borderBlue {
        color: #fff;
        background: #005657;
        border: 1px solid grey;
      }
      .btns {
        width: 90px;
        margin-left: 15px;
        padding: 0px 12px;
        cursor: pointer;
        border-radius: 4px;
        .title1 {
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          color: #fff;
          // vertical-align: middle;
        }
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
        .downIcon {
          margin-top: 10px;
          background: url("~@/assets/images/down.png") no-repeat;
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
  .moban {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .inline-block {
      display: inline-block;
    }
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
}
</style>
