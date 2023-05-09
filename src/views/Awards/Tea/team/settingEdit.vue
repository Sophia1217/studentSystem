<template>
  <div style="background-color: #fff">
    <div class="topDIV">
      <div class="leftDIV">
        <h3>奖项基本设置</h3>
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
            <span v-if="bjzt == '1'">{{ formAdd.pjjx }}</span>
            <el-input
              v-else
              maxlength="50"
              v-model="formAdd.pjjx"
              placeholder="请输入评奖奖项"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="英文名称" label-width="80px">
            <span v-if="bjzt == '1'">{{ formAdd.ywmc }}</span>
            <el-input
              maxlength="50"
              v-else
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
            <span v-if="bjzt == '1'"
              >{{ formAdd.pjxn }} {{ formAdd.pjxq }}</span
            >
            <div v-else>
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
            </div>
          </el-form-item>
          <el-form-item
            label="评审时间"
            label-width="80px"
            prop="sjArr"
            :rules="rules.sjArr"
          >
            <span v-if="bjzt == '1'"
              >{{ formAdd.pssjstart }}至 {{ formAdd.pssjend }}</span
            >
            <el-date-picker
              v-else
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
            label="奖项级别"
            label-width="80px"
            prop="jxjbm"
            :rules="rules.jxjbm"
          >
            <span v-if="bjzt == '1'">{{ formAdd.jxjb }}</span>
            <el-select
              v-else
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
          <el-form-item label="培养单位" label-width="80px">
            <span v-if="bjzt == '1'">{{ formAdd.pydw }}</span>
            <el-select
              v-else
              style="width: 500px"
              v-model="formAdd.pydwmList"
              placeholder="请选择培养单位"
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
          <el-form-item label="面向对象" label-width="80px">
            <span v-if="bjzt == '1'">已设置</span>
            <span
              @click="setting"
              style="color: #005657; cursor: pointer"
              v-else
            >
              {{
                formInner.pyccDefList[0].tjmzList.length > 0
                  ? "已设置"
                  : "去设置"
              }}</span
            ></el-form-item
          >
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
                    <span v-if="bjzt == '1'">{{ scope.row.jx }}</span>
                    <el-input
                      v-else
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
            <span v-if="bjzt == '1'">{{
              formAdd.sfyxcftj == "1" ? "是" : "否"
            }}</span>
            <el-radio-group v-else v-model="formAdd.sfyxcftj">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="rightDIV">
        <h3>奖项分配设置</h3>
        <el-row :gutter="20">
          <el-col :span="1.5"> <span class="span1">总人数</span></el-col>
          <el-col :span="4.5">
            <span
              v-if="bjzt == '1'"
              style="display: inline-block; margin-top: 7px"
              >{{ formAdd.zrs }}</span
            >
            <el-input-number
              v-else
              v-model="formAdd.zrs"
              size="small"
              controls-position="right"
              :min="1"
            ></el-input-number
          ></el-col>
          <el-col :span="4.5">
            <div class="btns borderGreen" @click="monfp" v-if="bjzt == '2'">
              <span class="title1">模拟分配</span>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20" style="margin-top: 25px; margin-left: -22px">
          <el-col :span="1.5"> <span class="span1">指标细化</span></el-col>
          <el-col :span="6" class="heightCom">
            <span v-if="bjzt == '1'" style="display: inline-block">{{
              formAdd.zbxhfs == "1" ? "按总额" : "按比例"
            }}</span>
            <el-radio-group v-model="formAdd.zbxhfs" v-else>
              <el-radio :label="1">按总额</el-radio>
              <el-radio :label="2">按比例</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <span v-if="bjzt == '1' && formAdd.zbxhfs == 2">
              比例值 ： {{ formAdd.zbxhbl }}</span
            >
            <el-input
              v-else
              class="input1"
              style="height: 28px; line-height: 28px"
              v-if="formAdd.zbxhfs == 2 && bjzt == '2'"
              v-model="formAdd.zbxhbl"
              type="number"
              :max="100"
              :min="0"
              placeholder="比例值"
            />
          </el-col>
          <el-col :span="6" :offset="4">
            <span class="span1"
              >合计：{{ formAdd.zrs }}人
              <span v-html="'\u3000'"></span> 剩余指标：{{ this.syzb }}
            </span></el-col
          >
        </el-row>
        <div style="margin: 20px 50px 0 -20px">
          <el-table :data="formAdd.jxfpLIST">
            <el-table-column type="index" label="序号" />
            <el-table-column prop="pydw" label="培养单位" />
            <el-table-column prop="cprs" label="参评人数" />
            <el-table-column prop="bl" label="比例%" />
            <el-table-column prop="jsrs" label="计算人数" />
            <el-table-column prop="zzrs" label="最终人数">
              <template slot-scope="scope">
                <span v-if="bjzt == '1'">{{ scope.row.zzrs }}</span>
                <el-input
                  v-else
                  style="width: 80px"
                  type="number"
                  @change="zzrschange"
                  v-model="scope.row.zzrs"
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
                      <span v-if="bjzt == '1'">{{ scope.row.tjmzzw }}</span>
                      <el-select
                        v-else
                        collapse-tags
                        placeholder="请选择"
                        multiple
                        @change="pyccChange($event, scope.row)"
                        v-model="scope.row.tjmzList"
                      >
                        <el-option
                          v-for="(item, index) in scope.row.tjmbList"
                          :key="`${index}` + index"
                          :label="item.mc"
                          :value="item.dm"
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
                    <span v-if="bjzt == '1'">{{ scope.row.tjzw }}</span>
                    <el-form-item
                      v-else
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
                    <span v-if="bjzt == '1'">{{ scope.row.tjmzzw }}</span>
                    <el-form-item
                      v-else
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
                          v-for="(item, index) in scope.row.tjmbList"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
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
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" class="confirm" @click="mxdxSAVE"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="editBottom">
      <div class="btn confirm" @click="colseDe" v-if="bjzt == '1'">关闭</div>
      <div
        class="btn confirm"
        @click="edit"
        v-if="bjzt == '1' && this.auth == '1'"
        v-show="AUTHFLAG"
      >
        编辑
      </div>
      <div class="btn cancel" v-if="bjzt == '2'" @click="cancelAdd">取消</div>
      <div class="btn confirm" @click="finalSave" v-if="bjzt == '2'">保存</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
import { listQuery } from "@/api/systemMan/dictionary";
import {
  addPycc,
  mxdxSure,
  mnfp,
  addSave,
  getDetail,
} from "@/api/dailyBehavior/pjpySetting";
import { getXnxq } from "@/api/dailyBehavior/xnxjStu";
export default {
  computed: {
    resultArr: {
      get() {
        return [...this.formInner.pyccDefList, ...this.formInner.pyccAddList]; //把默认和新增的对象合并给后台
      },
      set() {},
    },
  },
  data() {
    return {
      AUTHFLAG: false,
      bjzt: "1", //1是看 2是改
      mxdxModal: false,
      innerModal: false,
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
      xnList: [], //学年下拉框
      syzb: 0, //剩余指标
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
        inner: [
          {
            required: true,
            message: "对应表格内容不能为空",
            trigger: "blur",
          },
        ],
      },
      formAdd: {
        zbxhbl: "",
        zbxhfs: 1,
        zrs: "",
        pjjx: "", //评奖奖项
        ywmc: "", //英文名称
        pjxn: "", //评奖学年
        pjxqm: "", //评奖学期
        jxjbm: "", //奖项级别码
        pydwmList: [], //培养单位
        sfyxcftj: 1, //重复提交
        szzl: "1",
        jxfpLIST: [],
        sfdjMnfp: 0,
        jxdjList: [],
        sjArr: [], //评审时间
      },
      formInner: {
        pyccAddList: [], //新增条件
        pyccDefList: [], //默认条件
      },
      // resultArr: [], //合并条件
      xnxqList: [],
      num: 1,
      lgnSn: "",
      auth: "",
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.lgnSn = this.$route.query.id; //逻辑主键
    this.auth = this.$route.query.au; //逻辑主键
    this.getDetail1();
    this.addPyccList(); //查询所有的新增类型
    this.getAllCollege();
    this.getCode("dmpyccm"); //培养层次1
    this.getXnxq1(); //学年2
    this.getAllGrade(); //年级2
    this.getCode("dmsfslxm"); //师范生属性3
    this.getCode("dmrsxxxsm"); //学习形式4
    this.getCode("dmxz"); //学制5
    this.getCode("dmpjpyjxjbm"); //奖项级别
    this.getCode("dmxqm"); //学期
  },
  methods: {
    colseDe() {
      this.$router.push({
        path: "/awardsTea/personalSetting",
      });
    },
    cancelAdd() {
      this.bjzt = "1";
    },
    edit() {
      this.bjzt = "2";
    },
    getDetail1() {
      getDetail({ id: this.lgnSn }).then((res) => {
        this.formAdd = res.data.rcswPjszJbReq;
        var data = res.data.rcswPjszJbReq.jxdjList;
        this.$set(this.formAdd, "sjArr", [
          res.data.rcswPjszJbReq.pssjstart,
          res.data.rcswPjszJbReq.pssjend,
        ]);
        this.formAdd.jxdjList = data.map((item) => {
          return {
            jx: item,
          };
        });
        for (var i = 0; i < res.data.rcswPjszDxReqList.length; i++) {
          if (res.data.rcswPjszDxReqList[i].tjnfsc == "1") {
            this.formInner.pyccDefList.push(res.data.rcswPjszDxReqList[i]);
          } else {
            this.formInner.pyccAddList.push(res.data.rcswPjszDxReqList[i]);
          }
        }
        this.formAdd.jxfpLIST = res.data.rcswPjszFpReqList;
        this.formAdd.sfyxcftj = Number(this.formAdd.sfyxcftj);
        this.formAdd.zbxhfs = Number(this.formAdd.zbxhfs);
        this.syzb =
          this.formAdd.zrs -
          this.formAdd.jxfpLIST.reduce((pre, cur) => {
            return pre + Number(cur.zzrs);
          }, 0);
      });
    },

    jia() {
      var obj = { jx: "" };
      this.formAdd.jxdjList.push(obj);
    },
    jian(row, index) {
      this.formAdd.jxdjList.splice(index, 1);
    },
    jian1(row, index) {
      this.formInner.pyccAddList.splice(index, 1);
    },
    zzrschange() {
      this.syzb =
        this.formAdd.zrs -
        this.formAdd.jxfpLIST.reduce((pre, cur) => {
          return pre + Number(cur.zzrs);
        }, 0);
    },
    getXnxq1() {
      getXnxq().then((res) => {
        this.xnxqList = res.data;
      });
    },

    jxjbChange(e) {
      if (e == "02") {
        this.formAdd.pydwmList = []; //选了校级 将培养单位置空
      }
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
          var arr = [];
          for (var i = 0; i < this.formAdd.jxdjList.length; i++) {
            arr.push(this.formAdd.jxdjList[i].jx);
          }

          var data = {
            rcswPjszFpReqList: this.formAdd.jxfpLIST,
            rcswPjszDxReqList: this.resultArr,
            rcswPjszJbReq: {
              id: this.lgnSn,
              pydwmList: this.formAdd.pydwmList,
              zbxhbl: this.formAdd.zbxhbl,
              zbxhfs: this.formAdd.zbxhfs,
              zrs: this.formAdd.zrs,
              jxdjList: arr,
              pssjend: this.formAdd.sjArr[1],
              pssjstart: this.formAdd.sjArr[0],
              szzl: "1", //注意区别 1 个人  2集体
              sfyxcftj: this.formAdd.sfyxcftj, //重复提交
              jxjbm: this.formAdd.jxjbm, //奖项级别码
              pjxqm: this.formAdd.pjxqm, //评奖学期
              pjxn: this.formAdd.pjxn, //评奖学年
              ywmc: this.formAdd.ywmc, //英文名称
              pjjx: this.formAdd.pjjx, //评奖奖项
            },
          };
          addSave(data).then((res) => {
            this.$message.success("保存成功");
            this.$router.push({
              path: "/awardsTea/personalSetting",
            });
          });
        } else {
          this.$message.error("面向对象暂未设置");
        }
      }
    },
    monfp() {
      var data = {
        pydwmList: this.formAdd.pydwmList,
        rcswPjszDxReqList: this.resultArr,
        zbxhbl: this.formAdd.zbxhbl,
        zbxhfs: this.formAdd.zbxhfs,
        zrs: this.formAdd.zrs,
      };
      mnfp(data).then((res) => {
        // this.formAdd.jxfpLIST = res.data;
        //但是this.$ set 方法还有另一种情况，就是当你要设置的key已经存在于这个对象或数组中的时候，它只会更改data并不会为该key添加响应检测，所以页面上的依赖jxfpLIST的试图就不会更新，解决这个问题的办法就是在设置值之前先把这个属性删除掉，然后再进行this.$set
        //当this.$set无效时 也可以强制更新此页面 this.$forceUpdate();
        this.$delete(this.formAdd, "jxfpLIST");
        this.$set(this.formAdd, "jxfpLIST", res.data);
      });
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
    mxdxSAVE() {
      if (!this.checkFormInner()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          pydwmList: this.formAdd.pydwmList,
          rcswPjszDxReqList: this.resultArr,
        };
        mxdxSure(data).then((res) => {
          this.mxdxModal = !this.mxdxModal;
          this.formAdd.jxfpLIST = res.data;
        });
      }
    },
    addPyccList() {
      addPycc().then((res) => {
        this.leftOptions = res.data;
      });
    },
    addTj() {
      var data = {
        tjmbList: [],
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
      this.formInner.pyccAddList[index].tjmzList = []; //左边变化，右边置空，新增不需要这个逻辑
      listQuery(data).then((res) => {
        this.formInner.pyccAddList[index].tjmbList = res.data.map((item) => {
          return {
            dm: item.codeValue,
            mc: item.codeKey,
          };
        });
      });
    },
    quxiao() {
      // if (!this.checkFormInner()) {
      //   this.$message.error("请完善表单相关信息！");
      //   return;
      // } else {
      this.mxdxModal = false;
      // }
    },
    quxiao1() {
      // if (!this.checkFormInner()) {
      //   this.$message.error("请完善表单相关信息！");
      //   this.mxdxModal = true;
      // } else {
      // }
    },
    pyccChange(e, row) {
      //这里处理选择本科还是研究生不同展示的逻辑
      if (row.tjzw == "培养层次") {
        if ((e.includes("1") || e.includes("2")) && e.includes("3")) {
          this.formInner.pyccDefList = [
            {
              tjyw: "pyccm",
              tjzw: "培养层次",
              tjmbList: this.pyccOption,
              tjmzList: e,
              tjnfsc: "1",
              tjmbm: "dmpyccm",
            },
            {
              tjyw: "nj",
              tjzw: "年级",
              tjmbList: this.allNj,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "nj",
            },
            {
              tjyw: "sfsfs",
              tjzw: "师范生属性",
              tjmbList: this.dmsfslxmList, //dmsfslxm
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmsfslxm",
            },
            {
              tjyw: "xxxs",
              tjzw: "学习形式",
              tjmbList: this.dmrsxxxsmList,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmrsxxxsm",
            },
            {
              tjyw: "xz",
              tjzw: "学制",
              tjmbList: this.dmxzList,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmxz",
            },
          ];
        } else if (e.includes("2") || e.includes("1")) {
          this.formInner.pyccDefList = [
            {
              tjyw: "pyccm",
              tjzw: "培养层次",
              tjmbList: this.pyccOption, //dmpyccm
              tjmzList: e,
              tjnfsc: "1",
              tjmbm: "dmpyccm",
            },
            {
              tjyw: "nj",
              tjzw: "年级",
              tjmbList: this.allNj, // nj
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "nj",
            },
            {
              tjyw: "xxxs",
              tjzw: "学习形式",
              tjmbList: this.dmrsxxxsmList, //dmrsxxxsm
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmrsxxxsm",
            },
            {
              tjyw: "xz",
              tjzw: "学制",
              tjmbList: this.dmxzList, //dmxz
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "dmxz",
            },
          ];
        } else if (e.includes("3")) {
          this.formInner.pyccDefList = [
            {
              tjyw: "pyccm",
              tjzw: "培养层次",
              tjmbList: this.pyccOption,
              tjmzList: e,
              tjnfsc: "1",
              tjmbm: "dmpyccm",
            },
            {
              tjyw: "nj",
              tjzw: "年级",
              tjmbList: this.allNj,
              tjmzList: [],
              tjnfsc: "1",
              tjmbm: "nj",
            },
            {
              tjyw: "sfsfs",
              tjzw: "师范生属性",
              tjmbList: this.dmsfslxmList,
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
              tjmbList: this.pyccOption,
              tjmzList: e,
              tjnfsc: "1",
              tjmbm: "dmpyccm",
            },
          ];
        }
      }
    },
    setting() {
      this.mxdxModal = true;
    },

    getAllGrade() {
      getGrade()
        .then((res) => {
          this.allNj = res.data.rows.map((item) => {
            return {
              dm: item,
              mc: item,
            };
          });
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
          case "dmrsxxxsm": //学习形式4
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
