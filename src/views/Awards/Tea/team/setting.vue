<template>
  <div>
    <div class="basicInfo">
      <div class="tableWrap mt15">
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">集体奖项设置列表</span>
          </div>
          <div class="headerRight">
            <div class="btns borderGreen" @click="xinzeng">
              <i class="icon greenIcon"></i><span class="title1">新增</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px">
          <el-table
            ref="multipleTable"
            :data="basicInfoList"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="pjjx" label="奖项名称" />
            <el-table-column prop="cpjtlb" label="参评集体类别">
              <template slot-scope="scope">
                <div>
                  {{
                    scope.row.cpjtlb == "1"
                      ? "以寝室为单位"
                      : scope.row.cpjtlb == "2"
                      ? "以班为单位"
                      : "自定义"
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pjzq" label="评奖周期" />
            <el-table-column prop="spsj" label="评审时间" width="500px">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.sqkfsj"
                  type="daterange"
                  unlink-panels
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="scope.row.sqkg == '0' ? false : true"
                  @blur="alterjxwh(scope.row)"
                  :clearable="false"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="sqkg" label="申请开关">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.sqkg"
                  active-color="#23AD6F"
                  inactive-color="#E0E0E0"
                  active-value="1"
                  inactive-value="0"
                  @change="alterjxwh(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
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
      </div>
      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="45%"
        :close-on-click-modal="false"
      >
        <template>
          <div>
            <h3>集体奖项信息</h3>
            <el-form
              ref="formAdd"
              label-width="150px"
              style="margin: 0 30px"
              :model="formAdd"
            >
              <el-form-item
                label="评奖奖项"
                label-width="80px"
                prop="pjjx"
                :rules="rules.pjjx"
              >
                <el-input
                  maxlength="50"
                  style="width: 200px"
                  v-model="formAdd.pjjx"
                  placeholder="请输入评奖奖项"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="英文名称" prop="ywmc" label-width="80px">
                <el-input
                  maxlength="50"
                  style="width: 200px"
                  v-model="formAdd.ywmc"
                  placeholder="请输入评奖奖项"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="评奖周期"
                label-width="80px"
                prop="pjxn"
                :rules="rules.pjxn"
              >
                <el-select
                  style="width: 200px"
                  v-model="formAdd.pjxn"
                  placeholder="请选择学年"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in xnxqList"
                    :key="index"
                    :label="item.mc"
                    :value="item.mc"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="formAdd.pjxqm"
                  placeholder="请选择学期"
                  clearable
                  style="width: 200px"
                >
                  <el-option
                    v-for="(item, index) in dmxqm"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="评审时间"
                label-width="80px"
                prop="sjArr"
                :rules="rules.sjArr"
              >
                <el-date-picker
                  style="width: 400px"
                  v-model="formAdd.sjArr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始年月日"
                  end-placeholder="结束年月日"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="参评集体类别"
                label-width="100px"
                style="margin-left: -15px"
              >
                <el-radio-group v-model="formAdd.cpjtlb">
                  <el-radio :label="1">以寝室为单位</el-radio>
                  <el-radio :label="2">以班为单位</el-radio>
                  <el-radio :label="3">自定义</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="奖项等级" label-width="80px">
                <el-table ref="multipleTable" :data="formAdd.jxdjList">
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column label="奖项" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0"
                        style="margin-bottom: 15px"
                        :prop="`jxdjList.${scope.$index}.jx`"
                        :rules="rules.jxdjListRule"
                      >
                        <el-input
                          maxlength="50"
                          v-model="scope.row.jx"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="添加选项" align="center">
                    <template slot-scope="scope">
                      <div style="margin-bottom: 20px">
                        <i
                          class="icon jia"
                          @click="jia(scope.row, scope.$index)"
                        ></i>
                        <i
                          class="icon jian"
                          v-if="scope.$index > 0"
                          @click="jian(scope.row, scope.$index)"
                        ></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item
                label="允许重复提交"
                label-width="100px"
                style="margin-left: -15px"
              >
                <el-radio-group v-model="formAdd.sfyxcftj">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addModalCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addModalConfirm()"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="详情"
        :visible.sync="editModal"
        width="45%"
        :close-on-click-modal="false"
      >
        <template>
          <div>
            <h3>集体奖项信息</h3>
            <el-form
              ref="formEdit"
              label-width="150px"
              style="margin: 0 30px"
              :model="formEdit"
            >
              <el-form-item
                label="评奖奖项"
                label-width="80px"
                prop="pjjx"
                :rules="rules.pjjx"
              >
                <span v-if="bjzt == '1'">{{ formEdit.pjjx }}</span>
                <el-input
                  v-else
                  style="width: 200px"
                  maxlength="50"
                  v-model="formEdit.pjjx"
                  placeholder="请输入评奖奖项"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="英文名称" label-width="80px">
                <span v-if="bjzt == '1'">{{ formEdit.ywmc }}</span>
                <el-input
                  maxlength="50"
                  v-else
                  style="width: 200px"
                  v-model="formEdit.ywmc"
                  placeholder="请输入评奖奖项"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="评奖周期"
                label-width="80px"
                prop="pjxn"
                :rules="rules.pjxn"
              >
                <span v-if="bjzt == '1'"
                  >{{ formEdit.pjxn }} - {{ formEdit.pjxq }}</span
                >
                <div v-else>
                  <el-select
                    style="width: 200px"
                    v-model="formEdit.pjxn"
                    placeholder="请选择学年"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in xnxqList"
                      :key="index"
                      :label="item.mc"
                      :value="item.mc"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="formEdit.pjxqm"
                    placeholder="请选择学期"
                    clearable
                    style="width: 200px"
                  >
                    <el-option
                      v-for="(item, index) in dmxqm"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                label="评审时间"
                label-width="80px"
                prop="sjArr"
                :rules="rules.sjArr"
              >
                <span v-if="bjzt == '1'"
                  >{{ formEdit.sjArr[0] }} - {{ formEdit.sjArr[1] }}</span
                >
                <el-date-picker
                  v-else
                  style="width: 400px"
                  v-model="formEdit.sjArr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="起始年月日"
                  end-placeholder="结束年月日"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                label="参评集体类别"
                label-width="100px"
                style="margin-left: -15px"
              >
                <span v-if="bjzt == '1'">{{
                  formEdit.cpjtlb == "1"
                    ? "以寝室为单位"
                    : formEdit.cpjtlb == "2"
                    ? "以班为单位"
                    : "自定义"
                }}</span>
                <el-radio-group v-model="formEdit.cpjtlb" v-else>
                  <el-radio :label="'1'">以寝室为单位</el-radio>
                  <el-radio :label="'2'">以班为单位</el-radio>
                  <el-radio :label="'3'">自定义</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="奖项等级" label-width="80px">
                <el-table ref="multipleTable" :data="formEdit.jxdjList">
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column label="奖项" align="center">
                    <template slot-scope="scope">
                      <span v-if="bjzt == '1'">{{ scope.row.jx }}</span>
                      <el-form-item
                        v-else
                        label-width="0"
                        style="margin-bottom: 15px"
                        :prop="`jxdjList.${scope.$index}.jx`"
                        :rules="rules.jxdjListRule"
                      >
                        <el-input
                          maxlength="50"
                          v-model="scope.row.jx"
                          placeholder="请输入"
                        ></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="添加选项"
                    align="center"
                    v-if="bjzt == '2'"
                  >
                    <template slot-scope="scope">
                      <div style="margin-bottom: 20px">
                        <i
                          class="icon jia"
                          @click="jia1(scope.row, scope.$index)"
                        ></i>
                        <i
                          class="icon jian"
                          v-if="scope.$index > 0"
                          @click="jian1(scope.row, scope.$index)"
                        ></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item
                label="允许重复提交"
                label-width="100px"
                style="margin-left: -15px"
              >
                <span v-if="bjzt == '1'">{{
                  formAdd.sfyxcftj == "1" ? "是" : "否"
                }}</span>
                <el-radio-group v-model="formAdd.sfyxcftj" v-else>
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao" v-if="bjzt == '2'">取 消</el-button>
          <el-button @click="guanbi" v-if="bjzt == '1'">关 闭</el-button>
          <el-button
            type="primary"
            class="confirm"
            @click="edit"
            v-if="bjzt == '1' && auth == '1'"
          >
            编 辑
          </el-button>
          <el-button
            type="primary"
            class="confirm"
            v-if="bjzt == '2'"
            @click="editConfirm()"
            >保 存</el-button
          >
        </span>
      </el-dialog>
    </div>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { getXnxq } from "@/api/dailyBehavior/xnxjStu";
import {
  pjList,
  pjjxListQuery,
  getDetail,
  changePjsz,
} from "@/api/dailyBehavior/pjpySetting";
import { addSave } from "@/api/dailyBehavior/pjpySetting";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  data() {
    return {
      bjzt: "1",
      auth: "1",
      dmxqm: [], //学期下拉框
      xnxqList: [], //学年下拉框
      formAdd: {
        pjjx: "", //评奖奖项
        ywmc: "", //英文名称
        pjxn: "", //评奖学年
        pjxqm: "", //评奖学期
        sfyxcftj: 1, //重复提交
        szzl: "1",
        cpjtlb: 1,
        jxdjList: [
          { jx: "一等奖" },
          { jx: "二等奖" },
          { jx: "三等奖" },
          { jx: "优秀奖" },
        ],
        sjArr: [], //评审时间
      },
      formEdit: {
        pjjx: "", //评奖奖项
        ywmc: "", //英文名称
        pjxn: "", //评奖学年
        pjxqm: "", //评奖学期
        sfyxcftj: 1, //重复提交
        cpjtlb: 1,
        szzl: "1",
        jxdjList: [],
        sjArr: [], //评审时间
      },
      addModal: false,
      editModal: false,
      //查询四个参数以及可以复用的码表
      jxjbList: [],
      pjjxList: [],
      PjjxArr: [],
      jxjbmList: [],
      JxjbArr: [],
      pyccmList: [],
      PyccArr: [],
      Csrq: [],
      //
      searchVal: "",
      select: "",
      isMore: false,
      basicInfoList: [],
      sqkfsj: [],
      qjModal: false,
      jeModal: false,
      pyccModal: false,
      sjModal: false,
      pycc: "",
      rules: {
        pjjx: [
          {
            required: true,
            message: "评奖奖项不能为空",
            trigger: "blur",
          },
        ],
        pjxn: [
          {
            required: true,
            message: "评奖学年不能为空",
            trigger: "blur",
          },
        ],
        pjxqm: [
          {
            required: true,
            message: "评奖学期不能为空",
            trigger: "blur",
          },
        ],
        sjArr: [
          {
            required: true,
            message: "评审时间不能为空",
            trigger: "blur",
          },
        ],
        jxdjListRule: [
          {
            required: true,
            message: "奖项不能为空",
            trigger: "blur",
          },
        ],
        inner: [
          {
            required: true,
            message: "对应表格内容不能为空",
            trigger: "blur",
          },
        ],
      },
      lgnsn: "",
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
    };
  },
  mounted() {
    this.getList();
    this.getXnxq1(); //学年2
    this.getCode("dmxqm"); //学期
    this.pjjxList1(); //评奖奖项
  },
  methods: {
    jia() {
      var obj = { jx: "" };
      this.formAdd.jxdjList.push(obj);
    },
    jian(row, index) {
      this.formAdd.jxdjList.splice(index, 1);
    },
    jia1() {
      var obj = { jx: "" };
      this.formEdit.jxdjList.push(obj);
    },
    jian1(row, index) {
      this.formEdit.jxdjList.splice(index, 1);
    },
    getXnxq1() {
      getXnxq().then((res) => {
        this.xnxqList = res.data;
      });
    },
    pjjxList1() {
      pjjxListQuery({ jxlb: "1" }).then((res) => {
        this.PjjxArr = res.data;
      });
    },
    addModalCancel() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    quxiao() {
      this.bjzt = "1";
    },
    guanbi() {
      this.editModal = false;
      this.bjzt = "1";
    },
    edit() {
      this.bjzt = "2";
    },
    editConfirm() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var arr = [];
        for (var i = 0; i < this.formEdit.jxdjList.length; i++) {
          arr.push(this.formAdd.jxdjList[i].jx);
        }
        var data = {
          rcswPjszJbReq: {
            id: this.lgnsn,
            jxdjList: arr,
            cpjtlb: this.formEdit.cpjtlb,
            pssjend: this.formEdit.sjArr[1],
            pssjstart: this.formEdit.sjArr[0],
            szzl: "2", //注意区别 1 个人  2集体
            sfyxcftj: this.formEdit.sfyxcftj, //重复提交
            pjxqm: this.formEdit.pjxqm, //评奖学期
            pjxn: this.formEdit.pjxn, //评奖学年
            ywmc: this.formEdit.ywmc, //英文名称
            pjjx: this.formEdit.pjjx, //评奖奖项
          },
        };
        addSave(data).then((res) => {
          this.editModal = false;
          this.bjzt = "1";
          this.$message.success("编辑成功");
          this.getList();
        });
      }
    },
    addModalConfirm() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var arr = [];
        for (var i = 0; i < this.formAdd.jxdjList.length; i++) {
          arr.push(this.formAdd.jxdjList[i].jx);
        }
        var data = {
          rcswPjszJbReq: {
            jxdjList: arr,
            cpjtlb: this.formAdd.cpjtlb,
            pssjend: this.formAdd.sjArr[1],
            pssjstart: this.formAdd.sjArr[0],
            szzl: "2", //注意区别 1 个人  2集体
            sfyxcftj: this.formAdd.sfyxcftj, //重复提交
            pjxqm: this.formAdd.pjxqm, //评奖学期
            pjxn: this.formAdd.pjxn, //评奖学年
            ywmc: this.formAdd.ywmc, //英文名称
            pjjx: this.formAdd.pjjx, //评奖奖项
          },
        };
        addSave(data).then((res) => {
          this.addModal = false;
          this.getList();
          this.$message.success("新增成功");
        });
      }
    },
    checkFormEdit() {
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
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
    alterjxwh(row) {
      var data = {
        pssjstart: row.sqkfsj && row.sqkfsj[0] ? row.sqkfsj[0] : "",
        pssjend: row.sqkfsj && row.sqkfsj[1] ? row.sqkfsj[1] : "",
        sqkg: row.sqkg,
        id: row.id,
      };
      changePjsz(data).then((res) => {
        this.$message.success("更新成功");
        this.getList();
      });
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formje.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    xinzeng() {
      (this.formAdd = {
        pjjx: "", //评奖奖项
        ywmc: "", //英文名称
        pjxn: "", //评奖学年
        pjxqm: "", //评奖学期
        sfyxcftj: 1, //重复提交
        szzl: "1",
        cpjtlb: 1,
        jxdjList: [
          { jx: "一等奖" },
          { jx: "二等奖" },
          { jx: "三等奖" },
          { jx: "优秀奖" },
        ],
        sjArr: [], //评审时间
      }),
        (this.addModal = true);
    },
    getList() {
      let data = {
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        szzl: "2", //
      };
      pjList(data).then((res) => {
        this.basicInfoList = res.data;
        for (var i = 0; i < this.basicInfoList.length; i++) {
          this.basicInfoList[i].sqkfsj = [
            this.basicInfoList[i].pssjstart,
            this.basicInfoList[i].pssjend,
          ];
        }
        this.queryParams.total = res.totalCount;
      });
    },
    hadleDetail(row) {
      if (row.sqkg && row.sqkg == "1") {
        this.auth = "2";
      }
      this.lgnsn = row.id;
      getDetail({ id: row.id }).then((res) => {
        this.formEdit = res.data.rcswPjszJbReq;
        var data = res.data.rcswPjszJbReq.jxdjList;
        this.$set(this.formEdit, "sjArr", [
          res.data.rcswPjszJbReq.pssjstart,
          res.data.rcswPjszJbReq.pssjend,
        ]);
        this.formAdd.cpjtlb = Number(this.formAdd.cpjtlb);
        this.formEdit.jxdjList = data.map((item) => {
          return {
            jx: item,
          };
        });
        this.editModal = true;
      });
    },

    sjCancel() {
      this.sjModal = false;
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
            case "dmxqm": //学期
              this.dmxqm = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}

.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.searchWrap {
  background: #ffffff;
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
  }
  .moreSelect {
    margin-top: 20px;
    padding: 20px;
    background: #fafafa;
  }
}
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
  }
  .headerRight {
    display: flex;
    align-items: center;

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
      .greenIcon {
        margin-top: 10px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
.basicInfo {
  background: #ffffff;
  .mt15 {
    margin-top: 15px;
    padding: 20px;
  }

  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
  .handledie {
    background: url("~@/assets/images/details.png");
  }
  .handleEdit {
    background: url("~@/assets/images/edit.png");
  }
}
</style>
