<template>
  <div class="scholarships">
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">校内外奖项</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
          <div class="btns borderGreen" @click="submit">
            <i class="icon tjIcon"></i><span class="title1">提交</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="detailInfoData.xnJxj"
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
            prop="jxjmc"
            label="奖学金名称"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="jb" label="级别" sortable="custom">
          </el-table-column>
          <el-table-column prop="dj" label="等级" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="je"
            label="金额"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="jxjlx" label="奖学金类型" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="sldw"
            label="设立单位"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="hjsj" label="获奖时间" sortable="custom">
          </el-table-column>

          <el-table-column prop="status" label="审核状态" sortable="custom">
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
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="bianji(scope.row)"
                v-show="scope.row.status === '01' || scope.row.status === '08'"
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                :disabled="true"
                @click="bianji(scope.row)"
                v-show="scope.row.status !== '01' && scope.row.status !== '08'"
              >
                <i class="scopeIncon EditDis"></i>
                <span style="color: #bfbfbf">编辑</span>
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="chehui(scope.row)"
                v-show="scope.row.status === '02'"
              >
                <i class="scopeIncon ch"></i>
                <span>撤回</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                :disabled="true"
                @click="chehui(scope.row)"
                v-show="scope.row.status !== '02'"
              >
                <i class="scopeIncon chDis"></i>
                <span style="color: #bfbfbf">撤回</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <el-table :data="formAdd.addData">
            <el-table-column label="奖学金名称" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jxjmc'"
                  :rules="rules.jxjmc"
                >
                  <el-input v-model="scope.row.jxjmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in jbmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="240px" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in djmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.je'"
                  :rules="rules.je"
                >
                  <el-input v-model="scope.row.je" />
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="奖学金类型" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jxjlxm'"
                  :rules="rules.jxjlxm"
                >
                  <el-select
                    v-model="scope.row.jxjlxm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in jxjlxmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="设立单位" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.sldw'"
                  :rules="rules.sldw"
                >
                  <el-input v-model="scope.row.sldw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="获奖时间" width="240px" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.hjsj'"
                  :rules="rules.hjsj"
                >
                  <el-date-picker
                    v-model="scope.row.hjsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="编辑"
        :visible.sync="editModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formEdit" :model="formEdit" :rules="rules">
          <el-table :data="formEdit.editData">
            <el-table-column label="奖学金名称" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jxjmc'"
                  :rules="rules.jxjmc"
                >
                  <el-input v-model="scope.row.jxjmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="级别" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jbm'"
                  :rules="rules.jbm"
                >
                  <el-select
                    v-model="scope.row.jbm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in jbmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="240px" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in djmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="金额" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.je'"
                  :rules="rules.je"
                >
                  <el-input v-model="scope.row.je" />
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="奖学金类型" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jxjlxm'"
                  :rules="rules.jxjlxm"
                >
                  <el-select
                    v-model="scope.row.jxjlxm"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="(item, index) in jxjlxmOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="设立单位" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.sldw'"
                  :rules="rules.sldw"
                >
                  <el-input v-model="scope.row.sldw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="获奖时间" width="240px" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.hjsj'"
                  :rules="rules.hjsj"
                >
                  <el-date-picker
                    v-model="scope.row.hjsj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <lctCom
        ref="child"
        :lctModal="lctModal"
        @handleCloseLct="handleCloseLct"
      ></lctCom>

      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getinList"
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
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  insertJxj,
  deleteJxj,
  queryJxjList,
  updateJxj,
  commitJxj,
  RollBackJxj,
} from "@/api/growFiles/scholarships";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  name: "scholarships",
  components: { lctCom },
  data() {
    return {
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      submitModal: false,
      detailInfoData: {},
      formAdd: { addData: [] },
      formEdit: { editData: [] },

      tableDate: [],
      isEdit: 1,
      queryParams: {
        xh: this.$store.getters.userId,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      ztStatus: [],
      jbmOps: [],
      djmOps: [],
      jxjlxmOps: [],
      val: [],
      url: "",
      rules: {
        jxjmc: [
          {
            required: true,
            message: "奖学金名称不能为空",
            trigger: "blur",
          },
        ],
        jbm: [{ required: true, message: "级别不能为空", trigger: "change" }],
        djm: [{ required: true, message: "等级不能为空", trigger: "change" }],
        je: [{ required: true, message: "金额不能为空", trigger: "blur" }],
        jxjlxm: [
          { required: true, message: "奖学金类型不能为空", trigger: "change" },
        ],
        sldw: [
          { required: true, message: "设立单位不能为空", trigger: "blur" },
        ],
        hjsj: [
          {
            required: true,
            message: "获奖时间不能为空",

            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  mounted() {
    this.getinList();
    this.getCode("dmxgjljbm");
    this.getCode("dmjldjm");
    this.getCode("dmjxjlxm");
    this.getCode("dmsplcm");
  },
  methods: {
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
    getinList() {
      let data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryJxjList(data)
        .then((res) => {
          console.log(res);
          this.$set(
            this.detailInfoData,
            "xnJxj",
            res.data ? res.data : [] // 校内奖项
          );
        })
        .catch((err) => {});
    },
    // lct(row) {
    //   var processInstanceId = row.processid;
    //   lct({ processInstanceId }).then((res) => {
    //     this.url = window.URL.createObjectURL(res);
    //   });
    //   this.lctModal = true;
    // },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    chehui(row) {
      RollBackJxj({ ...row }).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("撤销成功");
          this.getinList();
        } else {
          this.$message.error("撤销失败");
        }
      });
    },
    tj() {
      var data = this.val;
      commitJxj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.getinList();
        } else {
          this.$message.error("提交失败");
        }
      });
      this.submitModal = false;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmxgjljbm":
            this.jbmOps = res.data;
            break;
          case "dmjldjm":
            this.djmOps = res.data;
            break;
          case "dmjxjlxm":
            this.jxjlxmOps = res.data;
            break;
          case "dmsplcm":
            this.ztStatus = res.data;
            break;
        }
      });
    },
    del() {
      //if (this.delArr && this.delArr.length > 0) {
      deleteJxj(this.delArr).then((res) => {
        this.$message.success("删除成功");
        this.getinList();
      });
      // } else {
      //   this.$message.error("请先勾选数据");
      // }
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getinList();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
    },
    bianji(row) {
      this.formEdit.editData = [];

      this.formEdit.editData.push(row);
      this.editModal = true;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = this.formEdit.editData[0];
        updateJxj(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.getinList();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    editCance() {
      this.editModal = false;
    },
    xinzeng() {
      this.formAdd.addData = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        jxjmc: "",
        hjsj: "",
        djm: "",
        jbm: "",
        jxjlxm: "",
        je: "",
        sldw: "",
      };
      this.formAdd.addData.push(newLine);
      this.addModal = true;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          jxjmc: this.formAdd.addData[0].jxjmc,
          hjsj: this.formAdd.addData[0].hjsj,
          djm: this.formAdd.addData[0].djm,
          jbm: this.formAdd.addData[0].jbm,
          jxjlxm: this.formAdd.addData[0].jxjlxm,
          je: this.formAdd.addData[0].je,
          sldw: this.formAdd.addData[0].sldw,
          xh: this.$store.getters.userId,
        };

        insertJxj(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.getinList();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    addCance() {
      this.addModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getinList();
    },
    delCancel() {
      this.delModal = false;
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
    //提交
    submit() {
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

    subCancel() {
      this.submitModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.scholarships {
  flex: 1;
  background: #fff;
  .right_top {
    .title {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
      color: #005657;
      line-height: 24px;
    }
    .timeWrap {
      text-align: center;
      font-weight: 400;
      font-size: 16px;
      color: #383838;
      line-height: 28px;
      .updataTime {
        margin-left: 20px;
      }
    }
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
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
  .ch {
    background: url("~@/assets/dangan/ch.png");
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
            background: url("~@/assets/images/passWhite.png") no-repeat;
          }
        }
      }
    }
  }
}
</style>
