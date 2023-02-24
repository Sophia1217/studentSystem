<template>
  <div style="background-color: #fff">
    <div class="topDIV">
      <div class="leftDIV">
        <h3>奖项基本设置</h3>
        <el-form
          ref="formAdd"
          label-width="110px"
          style="margin: 0 30px"
          :model="formAdd"
        >
          <el-form-item label="奖助类别" prop="jzlb" :rules="rules.jzlb">
            <el-select
              v-model="formAdd.jzlb"
              placeholder=" 请输入评奖奖项"
              @change="jzlbChange"
              clearable
            >
              <el-option
                v-for="(item, index) in lzlbList"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="资助项目名称"
            prop="zzxmmc"
            :rules="rules.zzxmmc"
          >
            <el-input
              v-model="formAdd.zzxmmc"
              placeholder="请选择资助项目名称"
              maxlength="50"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input
              v-model="formAdd.ywmc"
              placeholder="请输入英文名称"
              maxlength="50"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="资助项目类别"
            prop="zzxmlb"
            :rules="rules.zzxmlb"
          >
            <el-select
              v-model="formAdd.zzxmlb"
              placeholder="请选择资助项目类别"
              clearable
            >
              <el-option
                v-for="(item, index) in zzxmlbList"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评奖周期" prop="pjxn" :rules="rules.pjxn">
            <el-select
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
            >
              <el-option
                v-for="(item, index) in dmxqm"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评审时间" prop="sjArr" :rules="rules.sjArr">
            <el-date-picker
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
          <el-form-item label="奖项级别" prop="jxjbm" :rules="rules.jxjbm">
            <el-select
              v-model="formAdd.jxjbm"
              placeholder="请选择奖项级别"
              clearable
              @change="jxjbChange"
            >
              <el-option
                v-for="(item, index) in jxjbList"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培养单位">
            <el-select
              style="width: 500px"
              v-model="formAdd.pydwmList"
              placeholder="请选择培养单位"
              @change="changePycc"
              multiple
              clearable
              :disabled="formAdd.jxjbm == '01' ? false : true"
            >
              <el-option
                v-for="(item, index) in allDwh"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面向对象">
            <span @click="setting" style="color: #005657; cursor: pointer">{{
              formInner.pyccDefList[0].tjmzList.length > 0 ? "已设置" : "去设置"
            }}</span></el-form-item
          >
          <el-form-item label="奖项等级">
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
              <el-table-column label="金额" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    style="margin-bottom: 15px"
                    :prop="`jxdjList.${scope.$index}.je`"
                    :rules="rules.jxdjListRuleJe"
                  >
                    <el-input-number
                      size="small"
                      controls-position="right"
                      :min="1"
                      maxlength="50"
                      v-model="scope.row.je"
                      placeholder="请输入金额"
                    ></el-input-number>
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
      <div class="rightDIV">
        <h3>奖项分配设置</h3>
        <el-row :gutter="20">
          <el-col :span="1.5"> <span class="span1">总人数分配</span></el-col>
          <el-col :span="4.5">
            <el-input-number
              v-model="formAdd.zrs"
              size="small"
              controls-position="right"
              :max="100000"
              :min="1"
            ></el-input-number
          ></el-col>
          <el-col :span="1.5"> <span class="span1">总金额分配</span></el-col>
          <el-col :span="4.5">
            <el-input-number
              v-model="formAdd.zje"
              size="small"
              controls-position="right"
              :min="1"
              :max="10000000"
            ></el-input-number
          ></el-col>
          <el-col :span="4.5">
            <div class="btns borderGreen" @click="monfp">
              <span class="title1">不可兼得设置</span>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20" style="margin-top: 25px; margin-left: -22px">
          <el-col :span="1.5"> <span class="span1">指标细化</span></el-col>
          <el-col :span="9" class="heightCom">
            <el-radio-group v-model="formAdd.zbxhfs">
              <el-radio :label="1">分配指标</el-radio>
              <el-radio :label="2">推荐指标</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 25px; margin-left: -22px">
          <el-col :span="12">
            <span class="span1"
              >合计：分配（推荐）人数：{{ fprs }}
              <span v-html="'\u3000'"></span> 分配金额（元）：{{ fpje }}
            </span></el-col
          >
        </el-row>
        <div style="margin: 20px 50px 0 -20px">
          <el-table :data="formAdd.jxfpLIST">
            <el-table-column type="index" label="序号" />
            <el-table-column prop="pydw" label="培养单位" />
            <el-table-column prop="cprs" label="分配（推荐）人数">
              <template slot-scope="scope">
                <el-input
                  style="width: 80px"
                  type="number"
                  @change="zzrschange"
                  v-model="scope.row.fprs"
                  size="small"
                  :min="0"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="cprs" label="分配金额（元）">
              <template slot-scope="scope">
                <el-input
                  style="width: 80px"
                  type="number"
                  @change="zzrschange"
                  v-model="scope.row.fpje"
                  size="small"
                  :min="0"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog
        title="面向对象"
        :visible.sync="mxdxModal"
        width="45%"
        @close="quxiao1"
        :close-on-click-modal="false"
      >
        <template>
          <div>
            <el-form ref="formInner" label-width="150px" :model="formInner">
              <span class="leftStyle" style=""> 默认条件</span>
              <el-table :data="formInner.pyccDefList">
                <el-table-column prop="tjzw" label="条件值" width="220px" />
                <el-table-column prop="cbrs" label="设置" width="600px">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      style="margin-bottom: 15px"
                      :prop="`pyccDefList.${scope.$index}.tjmzList`"
                      :rules="rules.inner"
                    >
                      <el-select
                        collapse-tags
                        placeholder="请选择"
                        multiple
                        @change="pyccChange($event, scope.row)"
                        v-model="scope.row.tjmzList"
                      >
                        <el-option
                          v-if="scope.row.tjzw != '年级'"
                          v-for="(item, index) in scope.row.option"
                          :key="`${index}` + index"
                          :label="item.mc"
                          :value="item.dm"
                        ></el-option>

                        <el-option
                          v-if="scope.row.tjzw == '年级'"
                          v-for="(item, index) in allNj"
                          :key="index"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
              <span class="leftStyle" style="margin-top: 20px"> 新增条件</span>
              <div
                class="btns borderGreen"
                style="margin-top: 20px; float: right"
                @click="addTj"
              >
                <span class="title1">新增条件</span>
              </div>

              <el-table :data="formInner.pyccAddList">
                <el-table-column prop="tjzw" label="条件值" width="220px">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="`pyccAddList.${scope.$index}.tjzw`"
                      style="margin-bottom: 15px"
                      :rules="rules.inner"
                    >
                      <el-select
                        collapse-tags
                        placeholder="请选择"
                        size="small"
                        @change="
                          pyccInnerChange($event, scope.row, scope.$index)
                        "
                        v-model="scope.row.tjzw"
                      >
                        <el-option
                          v-for="(item, index) in leftOptions"
                          :key="index"
                          :label="item.tjzw"
                          :value="{
                            value: item.tjyw,
                            label: item.tjzw,
                            mz: item.tjmz,
                          }"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="cbrs" label="设置">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="`pyccAddList.${scope.$index}.tjmzList`"
                      style="margin-bottom: 15px"
                      :rules="rules.inner"
                    >
                      <el-select
                        collapse-tags
                        placeholder="请选择"
                        size="small"
                        multiple
                        v-model="scope.row.tjmzList"
                      >
                        <el-option
                          v-for="(item, index) in scope.row.option"
                          :key="index"
                          :label="item.codeKey"
                          :value="item.codeValue"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="添加选项" align="center">
                  <template slot-scope="scope">
                    <div style="margin-bottom: 20px">
                      <i
                        class="icon jian"
                        @click="jian1(scope.row, scope.$index)"
                      ></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao">关 闭</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="不可兼得对象"
        :visible.sync="bkjdModal"
        width="45%"
        :close-on-click-modal="false"
      >
        <template>
          <div>
            <div v-for="(item, index) in datas" :key="index" class="customlist">
              <el-checkbox
                :indeterminate="item.isIndeterminate"
                v-model="item.checked"
                @change="handleCheckAllChange1(index, $event)"
              >
                <span style="font-weight: bolder">{{
                  item.mc
                }}</span></el-checkbox
              >
              <div style="margin: 10px 40px">
                <el-checkbox
                  v-for="(items, i) in item.dataCode"
                  v-model="items.checked"
                  :label="items.mc"
                  :key="i"
                  @change="
                    handleCheckedCitiesChange1(index, i, items.dm, $event)
                  "
                  >{{ items.mc }}</el-checkbox
                >
              </div>
            </div>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="gb">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="editBottom">
      <div class="btn cancel" @click="cancelAdd">取消</div>
      <div class="btn confirm" @click="finalSave">保存</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { listQuery } from "@/api/systemMan/dictionary";
import { queryLb, bkjdsz, getPydwList, addSave } from "@/api/jzsz/jzsz";
import { addPycc } from "@/api/dailyBehavior/pjpySetting";
import { getXnxq } from "@/api/dailyBehavior/xnxjStu";
export default {
  computed: {
    fpje: {
      get() {
        return this.formAdd.jxfpLIST.length > 0
          ? this.formAdd.jxfpLIST.reduce((pre, cur) => {
              return pre + Number(cur.fpje);
            }, 0)
          : 0;
      },
    },
    fprs: {
      get() {
        return this.formAdd.jxfpLIST.length > 0
          ? this.formAdd.jxfpLIST.reduce((pre, cur) => {
              return pre + Number(cur.fprs);
            }, 0)
          : 0;
      },
    },
    resultArr: {
      get() {
        return [...this.formInner.pyccDefList, ...this.formInner.pyccAddList]; //把默认和新增的对象合并给后台
      },
    },
  },
  data() {
    return {
      a: [],
      b: [],
      bkjdModal: false,
      mxdxModal: false,
      innerModal: false,
      lzlbList: [
        { dm: "1", mc: "奖学金" },
        { dm: "2", mc: "助学金" },
      ], //奖助类别list
      leftOptions: [], //新增条件左侧下拉框
      rightOptions: [], //新增条件右侧下拉框
      pyccOption: [], //培养层次下拉框
      allNj: [], //年级下拉框
      dmsfslxmList: [], //师范生
      dmrsxxxsmList: [], //学习形式
      dmxzList: [], //学制
      jxjbList: [], //奖项级别下拉框
      allDwh: [], // 学院下拉框
      dmxqm: [], //学期下拉框
      xnxqList: [],
      zzxmlbList: [], //资助项目类别
      xnList: [], //学年下拉框
      rules: {
        jzlb: [
          {
            required: true,
            message: "奖助类别不能为空",
            trigger: "blur",
          },
        ],
        zzxmmc: [
          {
            required: true,
            message: "资助项目名称不能为空",
            trigger: "blur",
          },
        ],
        zzxmlb: [
          {
            required: true,
            message: "资助项目类别不能为空",
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
        jxjbm: [
          {
            required: true,
            message: "奖项级别不能为空",
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
        jxdjListRuleJe: [
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
      formAdd: {
        zzxmmc: "", //奖助类别
        zzxmlb: "", // 奖助类别
        zbxhbl: "",
        zbxhfs: 1,
        zrs: 1,
        zje: 1,
        jzlb: "", //奖助类别
        ywmc: "", //英文名称
        pjxn: "", //评奖学年
        pjxqm: "", //评奖学期
        jxjbm: "", //奖项级别码
        pydwmList: [], //培养单位
        sfyxcftj: 1, //重复提交
        szzl: "1",
        jxfpLIST: [],
        sfdjMnfp: 0,
        jxdjList: [
          { jx: "一等奖", je: 100, px: 1 },
          { jx: "二等奖", je: 100, px: 2 },
          { jx: "三等奖", je: 100, px: 3 },
          { jx: "优秀奖", je: 100, px: 4 },
        ],
        sjArr: [], //评审时间
      },
      datas: [],
      formInner: {
        pyccAddList: [], //新增条件
        pyccDefList: [
          {
            tjyw: "pyccm",
            tjzw: "培养层次",
            option: [],
            tjmzList: [],
            tjnfsc: "1",
          },
        ], //默认条件
      },
      checkedCities: [], //不可兼得设置中的选中数组
    };
  },
  mounted() {
    this.addPyccList(); //查询所有的新增类型
    this.getAllCollege();
    this.getCode("dmpyccm"); //培养层次1
    this.getXnxq1(); //学年2
    this.getAllGrade(); //年级2
    this.getCode("dmsfslxm"); //师范生属性3
    this.getCode("dmxsxxxsm"); //学习形式4
    this.getCode("dmxz"); //学制5
    this.getCode("dmpjpyjxjbm"); //奖项级别
    this.getCode("dmxqm"); //学期
    this.jdsz(); //不可兼得设置
  },
  methods: {
    handleCheckAllChange1(index, e) {
      this.datas[index].checked = e;
      if (e == false) {
        this.datas[index].isIndeterminate = false;
      } else {
        this.datas[index].checked = true;
        this.datas[index].isIndeterminate = false;
      }
      var childrenArray = this.datas[index].dataCode;
      if (childrenArray)
        for (var i = 0, len = childrenArray.length; i < len; i++)
          childrenArray[i].checked = e;

      if (this.datas[index].checked == true) {
        // 点击全选往v-model添加选中的id
        for (var i = 0; i < childrenArray.length; i++)
          this.checkedCities.push({
            dm: childrenArray[i].dm,
            mc: childrenArray[i].mc,
          });
      } else {
        // 取消全选删除重复的id
        this.checkedCities = this.checkedCities.filter(
          (item) => !childrenArray.some((ele) => ele.dm === item.dm)
        );
      }
      this.checkedCities = this.qc(this.checkedCities);
    },
    qc(pa) {
      let newArr = [];
      let obj = {};
      for (let i = 0; i < pa.length; i++) {
        if (!obj[pa[i].dm]) {
          newArr.push(pa[i]);
          obj[pa[i].dm] = true;
        }
      }
      return newArr;
    },
    handleCheckedCitiesChange1(index, ind, dm, e) {
      var childrenArray = this.datas[index].dataCode;
      var tickCount = 0,
        unTickCount = 0,
        len = childrenArray.length;
      for (var i = 0; i < len; i++) {
        if (dm == childrenArray[i].dm) childrenArray[i].checked = e;
        if (childrenArray[i].checked == true) tickCount++;
        if (childrenArray[i].checked == false) unTickCount++;
      }
      if (tickCount == len) {
        this.datas[index].checked = true;
        this.datas[index].isIndeterminate = false;
      } else if (unTickCount == len) {
        this.datas[index].checked = false;
        this.datas[index].isIndeterminate = false;
      } else {
        this.datas[index].checked = false;
        this.datas[index].isIndeterminate = true; //添加一级不确定状态
      }
      if (this.datas[index].dataCode[ind].checked == true) {
        this.checkedCities.push({
          dm: childrenArray[ind].dm,
          mc: childrenArray[ind].mc,
        });
      } else {
        // 取消全选删除重复的id
        this.checkedCities = this.checkedCities.filter(
          (item) => childrenArray[ind].dm !== item.dm
        );
      }
    },
    format1(items) {
      return items.map((item) => {
        const result = { ...item, checked: false, isIndeterminate: false };
        if (item.dataCode) {
          result.dataCode = this.format1(item.dataCode);
        }
        return result;
      });
    },
    gb() {
      this.bkjdModal = !this.bkjdModal;
    },
    monfp() {
      this.bkjdModal = !this.bkjdModal;
    },
    zzrschange() {
      this.syzb =
        this.formAdd.zrs -
        this.formAdd.jxfpLIST.reduce((pre, cur) => {
          return pre + Number(cur.zzrs);
        }, 0);
    },
    jdsz() {
      bkjdsz().then((res) => {
        this.datas = res.data;
        this.datas = this.format1(this.datas);
      });
    },
    jzlbChange(e) {
      queryLb({
        jzlbm: e,
      }).then((res) => {
        this.zzxmlbList = res.data;
      });
    },
    quxiao() {
      if (!this.checkFormInner()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.mxdxModal = false;
      }
    },
    quxiao1() {
      if (!this.checkFormInner()) {
        this.$message.error("请完善表单相关信息！");
        this.mxdxModal = true;
      } else {
      }
    },
    jia(row, index) {
      var obj = { jx: "", je: 0, px: Number(this.formAdd.jxdjList.length) + 1 };
      this.formAdd.jxdjList.push(obj);
    },
    jian(row, index) {
      this.formAdd.jxdjList.splice(index, 1);
    },
    jian1(row, index) {
      this.formInner.pyccAddList.splice(index, 1);
    },
    getXnxq1() {
      getXnxq().then((res) => {
        this.xnxqList = res.data;
      });
    },
    cancelAdd() {
      this.$router.push({
        path: "/awardSubsidyTea/awardSubsidySetting",
      });
    },
    jxjbChange(e) {
      if (e == "02") {
        this.formAdd.pydwmList = []; //选了校级 将培养单位置空，同时调用分配列表的接口
        getPydwList({ pydwmList: [] }).then((res) => {
          this.formAdd.jxfpLIST = res.data;
        });
      }
    },
    changePycc(e) {
      getPydwList({ pydwmList: e }).then((res) => {
        this.formAdd.jxfpLIST = res.data;
      });
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
    finalSave() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        if (this.formInner.pyccDefList[0].tjmzList.length > 0) {
          for (const key in this.resultArr) {
            //   // 删除id属性
            delete this.resultArr[key].option;
          }
          var data = {
            rcswJzsqJxbkjdszList: this.checkedCities,
            rcswJzsqJxdjszList: this.formAdd.jxdjList,
            rcswJzsqJxfpszReqList: this.formAdd.jxfpLIST,
            rcswPjszDxReqList: this.resultArr,
            rcswJzsqJxjbszReq: {
              zzxmmc: this.formAdd.zzxmmc, //奖助名称
              zzxmlbm: this.formAdd.zzxmlb, // 奖助类别
              pydwmList: this.formAdd.pydwmList,
              zbxhbl: this.formAdd.zbxhbl,
              zbxhfs: this.formAdd.zbxhfs,
              zrs: this.formAdd.zrs,
              zje: this.formAdd.zje,
              pssjend: this.formAdd.sjArr[1],
              pssjstart: this.formAdd.sjArr[0],
              sfyxcftj: this.formAdd.sfyxcftj, //重复提交
              jxjbm: this.formAdd.jxjbm, //奖项级别码
              pjxqm: this.formAdd.pjxqm, //评奖学期
              pjxn: this.formAdd.pjxn, //评奖学年
              ywmc: this.formAdd.ywmc, //英文名称
              jzlbm: this.formAdd.jzlb, //奖助类别
            },
          };
          addSave(data).then((res) => {
            this.$router.push({
              path: "/awardSubsidyTea/awardSubsidySetting",
            });
          });
        } else {
          this.$message.error("面向对象暂未设置");
        }
      }
    },

    checkFormInner() {
      let validForm1 = false;
      this.$refs.formInner.validate((valid) => {
        validForm1 = valid;
      });
      if (!validForm1) {
        return false;
      }
      return true;
    },
    addPyccList() {
      addPycc().then((res) => {
        this.leftOptions = res.data;
      });
    },
    addTj() {
      var data = {
        tjyw: "",
        tjzw: "",
        option: this.leftOptions,
        tjmzList: [],
        tjnfsc: "2",
      };
      this.formInner.pyccAddList.push(data);
    },
    pyccInnerChange(e, row, index) {
      const { value, label, mz } = e;
      let data = {
        createTimeStart: "",
        createTimeEnd: "",
        codeTableEnglish: mz,
        codeTableChinese: "",
        state: 0,
        pageNum: 1,
        pageSize: 1000,
        codeKey: "",
        codeValue: "",
        orderZd: "",
        orderPx: "",
      };
      this.formInner.pyccAddList[index].tjyw = value;
      this.formInner.pyccAddList[index].tjzw = label;
      this.formInner.pyccAddList[index].tjmbm = mz; //为后端数据结构赋值
      listQuery(data).then((res) => {
        this.formInner.pyccAddList[index].option = res.data;
      });
    },
    pyccChange(e, row) {
      //这里处理选择本科还是研究生不同展示的逻辑
      var arr = [
        {
          tjyw: "pyccm",
          tjzw: "培养层次",
          option: this.pyccOption,
          tjmzList: e,
          tjnfsc: "1",
          tjmbm: "dmpyccm",
        },
        {
          tjyw: "nj",
          tjzw: "年级",
          option: this.allNj,
          tjmzList: [],
          tjnfsc: "1",
          tjmbm: "nj",
        },
        {
          tjyw: "xz",
          tjzw: "学制",
          option: this.dmxzList,
          tjmzList: [],
          tjnfsc: "1",
          tjmbm: "dmxz",
        },
        {
          tjyw: "jtjjkn",
          tjzw: "家庭经济困难认定结果采用年度",
          option: this.xnxqList,
          tjmzList: [],
          tjnfsc: "1",
          tjmbm: "jtjjkn",
        },
      ];
      if (row.tjzw == "培养层次") {
        if ((e.includes("1") || e.includes("2")) && e.includes("3")) {
          this.formInner.pyccDefList = [
            ...arr,
            {
              tjyw: "sfsfs",
              tjzw: "师范生属性",
              option: this.dmsfslxmList, //dmsfslxm
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmsfslxm",
            },
            {
              tjyw: "xxxs",
              tjzw: "学习形式",
              option: this.dmrsxxxsmList,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmxsxxxsm",
            },
          ];
        } else if (e.includes("2") || e.includes("1")) {
          this.formInner.pyccDefList = [
            ...arr,
            {
              tjyw: "xxxs",
              tjzw: "学习形式",
              option: this.dmrsxxxsmList, //dmrsxxxsm
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmrsxxxsm",
            },
          ];
        } else if (e.includes("3")) {
          this.formInner.pyccDefList = [
            ...arr,
            {
              tjyw: "sfsfs",
              tjzw: "师范生属性",
              option: this.dmsfslxmList,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmsfslxm",
            },
          ];
        } else if (!e.includes("2") || !e.includes("3")) {
          this.formInner.pyccDefList = [
            {
              tjyw: "pyccm",
              tjzw: "培养层次",
              option: this.pyccOption,
              tjmzList: e,
              tjnfsc: "1",
              tjmbm: "dmpyccm",
            },
          ];
        }
      }
    },
    setting() {
      this.formInner.pyccDefList[0].option = this.pyccOption;
      this.formInner.pyccDefList[0].tjmbm = "dmpyccm";
      this.mxdxModal = true;
    },

    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows;
        })
        .catch((err) => {});
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmpyccm": //培养层次
            this.pyccOption = res.data;
            break;
          case "dmsfslxm": //师范生
            this.dmsfslxmList = res.data;
            break;
          case "dmxsxxxsm": //学习形式4
            this.dmrsxxxsmList = res.data;
            break;
          case "dmxz": //学制5
            this.dmxzList = res.data;
            break;
          case "dmpjpyjxjbm": //奖项级别
            this.jxjbList = res.data;
            break;
          case "dmxqm": //学期
            this.dmxqm = res.data;
            break;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-form-item__label {
//   font-size: 17px;
// }
.topDIV {
  display: flex;

  .leftDIV {
    width: 50%;
    padding: 20px 4%;
  }
  .rightDIV {
    width: 50%;
    padding: 20px 0;
  }
}

.heightCom {
  height: 28px;
  line-height: 28px;
}
.input1 {
  margin-top: -5px;
  margin-left: -25px;
  width: 95px;
}

.editBottom {
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn {
    width: 84px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #005657;
    border-radius: 2px;
    margin-right: 20px;
  }
  .cancel {
    color: #005657;
  }
  .confirm {
    background: #005657;
    color: #fff;
  }
}
.leftStyle {
  float: left;
  font-weight: 600;
  font-size: 16px;
  font-family: "PingFang SC";
  font-style: normal;
  line-height: 24px;
  margin-bottom: 10px;
  color: #1f1f1f;
}

.rightStyle {
  float: right;
  font-weight: 600;
  font-size: 16px;
  font-family: "PingFang SC";
  font-style: normal;
  line-height: 24px;
  margin-bottom: 10px;
  color: #1f1f1f;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.btns {
  margin-right: 15px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 4px;
}
.span1 {
  display: inline-block;
  margin-top: 4px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}
.borderGreen {
  border: 1px solid grey;
  background: #005657;
}
.title1 {
  font-size: 14px;
  text-align: center;
  line-height: 32px;
  color: #fff;
}
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}

.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
</style>
