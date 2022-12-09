<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">申请列表</span> <i class="Updataicon"></i>
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
          :default-sort="{ prop: 'date', order: 'descending' }"
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
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xm"
            label="姓名"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="sqje"
            label="申请金额"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="sqlbmc" label="申请类别"> </el-table-column>
          <el-table-column
            prop="xnmc"
            label="学年"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xqmc"
            label="学期"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="status" label="审批状态" sortable="custom">
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
          <el-table-column prop="sqsj" label="申请时间" sortable="custom">
          </el-table-column>
          <el-table-column label="审核进度" sortable="custom">
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
        width="55%"
        @close="addCance"
        :close-on-click-modal="false"
      >
        <div style="padding: 0 50px">
          <el-form ref="formAdd" :model="formAdd">
            <el-table :data="formAdd.table" style="width: 100%">
              <el-table-column label="学年" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.xn'"
                    :rules="rules.xn"
                  >
                    <el-select
                      v-model="scope.row.xn"
                      collapse-tags
                      placeholder="请选择学年"
                      size="small"
                    >
                      <el-option
                        v-for="(item, index) in allNj"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="xq" label="学期" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.xq'"
                    :rules="rules.xq"
                  >
                    <el-select v-model="scope.row.xq" placeholder="请选择">
                      <el-option
                        v-for="item in dmxqm"
                        :key="item.value"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="sqje" label="申请金额（元）" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.sqje'"
                    :rules="rules.sqje"
                  >
                    <el-input v-model="scope.row.sqje" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="sqyylb" label="申请原因类别" width="160">
                <template slot-scope="scope" align="center">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.sqyylb'"
                    :rules="rules.sqyylb"
                  >
                    <el-select v-model="scope.row.sqyylb" placeholder="请选择">
                      <el-option
                        v-for="item in dmlsknsqlb"
                        :key="item.value"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="材料证明">
                <template slot-scope="scope">
                  <el-upload
                    action="#"
                    multiple
                    class="el-upload"
                    accept=".pdf,.jpg"
                    :auto-upload="false"
                    ref="upload"
                    :file-list="scope.row.files"
                    :on-change="fileChange"
                    :before-remove="beforeRemove"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </template>
              </el-table-column>
            </el-table>

            <el-row>
              <div style="margin: 15px 0; font-weight: 700">申请理由</div>
              <el-form-item prop="sqly" :rules="rules.sqly">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formAdd.sqly"
                  :autosize="{ minRows: 5 }"
                >
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <div style="margin: 15px 0; font-weight: 700">申请时间</div>
              <el-form-item prop="sqsj" :rules="rules.sqsj">
                <el-date-picker
                  v-model="formAdd.sqsj"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-row>
          </el-form>
        </div>

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
        width="55%"
        :close-on-click-modal="false"
      >
        <div style="padding: 0 50px">
          <el-form ref="formEdit" :model="formEdit">
            <el-table :data="formEdit.table" style="width: 100%">
              <el-table-column label="学年" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.xn'"
                    :rules="rules.xn"
                  >
                    <div v-if="editFlag == '2'">{{ scope.row.xnmc }}</div>
                    <el-select
                      v-model="scope.row.xn"
                      collapse-tags
                      placeholder="请选择学年"
                      v-if="editFlag == '3'"
                      size="small"
                    >
                      <el-option
                        v-for="(item, index) in allNj"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="xq" label="学期" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.xq'"
                    :rules="rules.xn"
                  >
                    <div v-if="editFlag == '2'">{{ scope.row.xqmc }}</div>
                    <el-select
                      v-model="scope.row.xq"
                      placeholder="请选择"
                      v-if="editFlag == '3'"
                    >
                      <el-option
                        v-for="item in dmxqm"
                        :key="item.value"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="sqje" label="申请金额（元）" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.sqje'"
                    :rules="rules.xn"
                  >
                    <div v-if="editFlag == '2'">{{ scope.row.sqje }}</div>
                    <el-input v-if="editFlag == '3'" v-model="scope.row.sqje" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="sqyylb" label="申请原因类别" width="160">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'table.' + scope.$index + '.sqyylb'"
                    :rules="rules.xn"
                  >
                    <div v-if="editFlag == '2'">{{ scope.row.sqlbmc }}</div>
                    <el-select
                      v-if="editFlag == '3'"
                      v-model="scope.row.sqyylb"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmlsknsqlb"
                        :key="item.value"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="材料证明">
                <template slot-scope="scope">
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
                    action="#"
                    v-if="editFlag == '3'"
                    multiple
                    class="el-upload"
                    accept=".pdf,.jpg"
                    :auto-upload="false"
                    ref="upload"
                    :file-list="formEdit.fileList"
                    :on-change="fileChange"
                    :before-remove="beforeRemoveEdit"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </template>
              </el-table-column>
            </el-table>

            <el-row>
              <div style="margin: 15px 0; font-weight: 700">申请理由</div>
              <el-form-item prop="sqly" :rules="rules.sqly">
                <div v-if="editFlag == '2'">{{ formEdit.sqly }}</div>
                <el-input
                  type="textarea"
                  v-if="editFlag == '3'"
                  placeholder="请输入内容"
                  v-model="formEdit.sqly"
                  :autosize="{ minRows: 5 }"
                >
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <div style="margin: 15px 0; font-weight: 700">申请时间</div>
              <el-form-item prop="sqsj" :rules="rules.sqsj">
                <div v-if="editFlag == '2'">{{ formEdit.sqsj }}</div>
                <el-date-picker
                  v-if="editFlag == '3'"
                  v-model="formEdit.sqsj"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="editFlag == 2" @click="editCance">关 闭</el-button>
          <el-button
            type="primary"
            class="confirm"
            @click="bianji"
            v-if="
              editFlag == 2 &&
              (formEdit.status == '08' || formEdit.status == '01')
            "
            >编 辑</el-button
          >
          <el-button class="confirm" @click="bianji1" v-if="editFlag == 3"
            >取 消</el-button
          >
          <el-button
            type="primary"
            class="confirm"
            @click="editClick"
            v-if="editFlag == 3"
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
import { del, query, back, tj, add, edit } from "@/api/dailyBehavior/lskn";
import { querywj, delwj } from "@/api/assistantWork/classEvent";
import { queryXnXQ } from "@/api/common/common";
import lctCom from "../../../components/lct";
import { getGrade } from "@/api/class/maintenanceClass";

import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom },
  data() {
    return {
      allNj: [],
      XnXQ: {},
      dmlsknsqlb: [],
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formAdd: { table: [], sqsj: "", sqly: "" },
      formEdit: { table: [], sqsj: "", sqly: "" },
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
        sqlx: "blxj",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      fileList: [],
      dmxqm: [],
      dmsfbzm: [],
      chehuiModal: false,
      rules: {
        sqly: [
          {
            required: true,
            message: "申请理由不能为空",
            trigger: "blur",
          },
        ],
        sqsj: [
          {
            required: true,
            message: "申请时间不能为空",
            trigger: "blur",
          },
        ],
        sqje: [
          {
            required: true,
            message: "申请金额不能为空",
            trigger: "blur",
          },
        ],
        sqyylb: [
          {
            required: true,
            message: "申请原因类别不能为空",
            trigger: "blur",
          },
        ],

        xn: [
          {
            required: true,
            message: "学年不能为空",
            trigger: "blur",
          },
        ],
        xq: [
          {
            required: true,
            message: "学期不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.query();
    this.getAllGrade();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmsfbzm"); //
    this.getCode("dmxqm"); //学期
    this.getCode("dmlsknsqlb"); //申请原因类别
  },

  methods: {
    //获取年级
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
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
          case "dmxqm":
            this.dmxqm = res.data; //
            break;
          case "dmlsknsqlb":
            this.dmlsknsqlb = res.data; //
            break;
          case "dmsfbzm":
            this.dmsfbzm = res.data; //是否
            break;
        }
      });
    },

    querywj(data) {
      //用于文件查询
      querywj({ businesId: data }).then((res) => {
        this.formEdit.fileList = res.data;
        this.formEdit.fileList = this.formEdit.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
        this.editModal = true;
      });
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      var data = this.val;
      back(data).then((res) => {
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
      del(this.delArr).then((res) => {
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
      let idx1 = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx1, 1);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 1) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
    fileChangeEdit(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 1) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
    bianji() {
      this.editFlag = 3;
    },
    bianji1() {
      this.editFlag = 2;
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
        console.log("this.fileListAdd", this.fileListAdd);
        var data = this.formEdit;
        console.log("data", data);
        let formData = new FormData();
        formData.append("sqje", data.table[0].sqje);
        formData.append("sqly", data.sqly);
        formData.append("sqsj", data.sqsj);
        formData.append("xqm", data.table[0].xq);
        formData.append("xnm", data.table[0].xn);
        formData.append("sqlbm", data.table[0].sqyylb);
        formData.append("xh", this.$store.getters.userId);
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
        console.log("data", data);
        let formData = new FormData();
        formData.append("sqje", data.table[0].sqje);
        formData.append("sqly", data.sqly);
        formData.append("sqsj", data.sqsj);
        formData.append("xqm", data.table[0].xq);
        formData.append("xnm", data.table[0].xn);
        formData.append("sqlbm", data.table[0].sqyylb);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        add(formData).then((res) => {
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
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryXnXQ().then((res) => {
        this.XnXQ = res.data ? res.data[0] : {};
      });
      query(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd.table = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        xn: this.XnXQ.year, //自动回显
        xq: this.XnXQ.term,
        sqje: "",
        sqyylb: "",
        files: [],
      };
      this.fileList = [];
      this.formAdd.table.push(newLine);
      this.addModal = true;
    },
    showDetail(row) {
      this.formEdit.table = [];
      var newLine = {
        xn: row.xnm, //自动回显
        xq: row.xqm,
        sqje: row.sqje,
        sqyylb: row.sqlbm,
        sqlbmc: row.sqlbmc,
        xnmc: row.xnmc,
        xqmc: row.xqmc,
      };
      this.formEdit.sqly = row.sqly;
      this.formEdit.sqsj = row.sqsj;
      this.formEdit.id = row.id;
      this.formEdit.status = row.status;
      this.formEdit.table.push(newLine);
      this.querywj(row.id);
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    // 判断 开始时间 结束时间
    changeDate(flag) {
      let startTimeAdd = this.formAdd.startTime; //新增开始时间
      let endTimeAdd = this.formAdd.endTime; //新增开始时间
      let startTimeEdit = this.formAdd.startTime; //编辑开始时间
      let endTimeEdit = this.formAdd.endTime; //编辑开始时间
      if (flag == 1) {
        //新增开始时间
        if (startTimeAdd && endTimeAdd) {
          if (startTimeAdd > endTimeAdd) {
            startTimeAdd = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else if (flag == 2) {
        //新增结束时间
        if (endTimeAdd) {
          if (startTimeAdd > endTimeAdd) {
            endTimeAdd = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      } else if (flag == 3) {
        if (startTimeEdit && endTimeEdit) {
          if (startTimeEdit > endTimeEdit) {
            startTimeEdit = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else {
        if (endTimeEdit) {
          if (startTimeEdit > endTimeEdit) {
            endTimeEdit = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
        background: url("../../../../assets/images/updata.png") no-repeat;
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
