<template>
  <div style="background-color: #fff">
    <div class="topDIV">
      <div class="leftDIV">
        <h1>测试</h1>
        <h3>奖项基本设置</h3>
        <el-form
          ref="formAdd"
          label-width="110px"
          style="margin: 0 30px"
          :model="formAdd"
        >
          <el-form-item
            label="奖助类别"
            prop="jzlbEdit"
            :rules="rules.jzlbEdit"
          >
            <span>{{ formAdd.jzlb }}</span>
          </el-form-item>
          <el-form-item
            label="资助项目名称"
            prop="zzxmmc"
            :rules="rules.zzxmmc"
          >
            <span>{{ formAdd.zzxmmc }}</span>
          </el-form-item>
          <el-form-item label="英文名称">
            <span>{{ formAdd.ywmc }}</span>
          </el-form-item>
          <el-form-item
            label="资助项目类别"
            prop="zzxmlbEdit"
            :rules="rules.zzxmlbEdit"
          >
            <span>{{ formAdd.zzxmlb }}</span>
          </el-form-item>
          <el-form-item label="评奖周期" prop="pjxn" :rules="rules.pjxn">
            <span>{{ formAdd.pjxn }} {{ formAdd.pjxq }}</span>
          </el-form-item>
          <el-form-item label="评审时间" prop="sjArr" :rules="rules.sjArr">
            <span>{{ formAdd.pssjstart }}至 {{ formAdd.pssjend }}</span>
          </el-form-item>
          <el-form-item label="奖项级别" prop="jxjbm" :rules="rules.jxjbm">
            <span>{{ formAdd.jxjb }}</span>
          </el-form-item>
          <el-form-item label="培养单位">
            <span>{{ formAdd.pydw }}</span>
          </el-form-item>
          <el-form-item label="面向对象">
            <span>已设置</span>
          </el-form-item>
          <!-- <el-button
              type="primary"
              size="medium"
              @click="addColumn"
              v-if="bjzt != '1'"
              >添加列</el-button
            > -->
          <el-form-item label="奖项等级">
            <el-table ref="multipleTable" :data="formAdd.jxdjList">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column label="奖项" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    style="margin-bottom: 15px"
                    :prop="`jxdjList.${scope.$index}.jxdjmc`"
                  >
                    <span>{{ scope.row.jxdjmc }}</span>
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
                    <span>{{ scope.row.je }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <!-- 动态列 -->
              <el-table-column
                v-for="(item, index) in dynamicColumns"
                :key="Math.random()"
                :prop="item.prop"
              >
                <template slot="header">
                  {{ item.label }}
                  <i
                    v-if="bjzt == '2'"
                    class="el-icon-remove"
                    style="color: red; cursor: pointer"
                    @click="deleteColunm(index)"
                  ></i>
                  <i
                    v-if="bjzt == '2'"
                    class="el-icon-circle-plus"
                    style="color: red; cursor: pointer"
                    @click="addColumn()"
                  ></i>
                </template>
                <template slot-scope="scope">
                  <span v-if="bjzt == '1'">{{ scope.row.nj[item.prop] }}</span>
                  <el-input-number
                    v-if="bjzt == '2'"
                    style="width: 150px"
                    v-model="scope.row.nj[item.prop]"
                    placeholder="请输入内容"
                  ></el-input-number>
                  <span v-else>{{ scope.row.nj[item.prop] }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
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
                </el-table-column> -->
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
            <el-radio-group v-model="formAdd.sfyxcftj" v-if="bjzt == '2'">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="editBottom">
      <div class="btn confirm" @click="colseDe">关闭</div>
      <div
        class="btn confirm"
        @click="edit"
        v-if="bjzt == '1' && this.auth == '1'"
      >
        编辑
      </div>
      <div class="btn cancel" v-if="bjzt == '2'" @click="cancelAdd">取消</div>
      <div class="btn confirm" @click="finalSave" v-if="bjzt == '2'">保存</div>
    </div>
  </div>
</template>
<script>
import { addSave, getDetail, addCol, queryCol } from "@/api/jzsz/jzsz";
export default {
  data() {
    return {
      bjzt: "1", //1是看 2是改
      rules: {
        jzlbEdit: [
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
        zzxmlbEdit: [
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
        jzlbEdit: "",
        zzxmlbEdit: "",
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
        jxdjList: [],
        sjArr: [], //评审时间
      },
      lgnSn: "",
      auth: "",
      propArr: [], // 生成dynamicColumns时的记录
      dynamicColumns: [], // 存放动态列
    };
  },
  mounted() {
    this.lgnSn = this.$route.query.id; //逻辑主键
    this.auth = this.$route.query.au; //逻辑主键
    this.getDetail1();
  },
  methods: {
    addColumn() {
      this.$prompt("请输入列名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.dynamicColumns.push({
          prop: value,
          label: value,
        });
      });
      console.log("this", this.dynamicColumns);
    },
    deleteColunm(index) {
      this.dynamicColumns.splice(index, 1);
    },
    submit() {
      let arr = [];
      this.tableData.forEach((data) => {
        let temp = {};
        temp.name = data.name;
        let obj = {};
        this.dynamicColumns.forEach((col) => {
          // 仅把有效的列提交
          if (data.nj[col.prop]) {
            obj[col.prop] = data.nj[col.prop];
          }
        });
        if (JSON.stringify(obj) !== "{}") {
          temp.nj = JSON.stringify(obj);
        }
        arr.push(JSON.stringify(obj));
      });
      var resArr = this.tableData.map((item, i) => {
        log;
        return {
          id: item.id,
          je: item.je,
          jxdjid: item.jxdjid,
          jxdjmc: item.jx,
          nj: arr[i],
        };
      });
      var data = {
        jxid: "",
        rcswJzsqJxfpszXyReqs: resArr,
      };
      addCol(data).then((res) => {});
    },
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

    async getDetail1() {
      await getDetail({ id: this.lgnSn }).then((res) => {
        this.formAdd = res.data.rcswJzsqJxjbszReq;
        this.$set(this.formAdd, "sjArr", [
          res.data.rcswJzsqJxjbszReq.pssjstart,
          res.data.rcswJzsqJxjbszReq.pssjend,
        ]);
        this.formAdd.jzlbEdit = res.data.rcswJzsqJxjbszReq.jzlbm;
        this.formAdd.zzxmlbEdit = res.data.rcswJzsqJxjbszReq.zzxmlbm;
        this.formAdd.sfyxcftj = Number(this.formAdd.sfyxcftj);
      });
      queryCol({ jxid: this.lgnSn }).then((res) => {
        this.formAdd.jxdjList = res.data;
        var tableData = [
          {
            id: "63f69fcd-5c93-4a70-b1f2-a651b211d7cb",
            je: "100",
            jx: "等奖",
            jxid: "954e1514-93f1-4bf7-b49c-77ca40715137",
          },
          {
            nj: '{"月半小夜曲": 1}',
            nj: "",
            id: "63f69fcd-5c93-4a70-b1f2-a651b211d7cb",
            je: "100",
            jx: "二等奖",
            jxid: "954e1514-93f1-4bf7-b49c-77ca40715137",
          },
          {
            nj: '{"测试": 1, "字段2": "哈哈哈"}',
            id: "63f69fcd-5c93-4a70-b1f2-a651b211d7cb",
            je: "100",
            jx: "三等奖",
            jxid: "954e1514-93f1-4bf7-b49c-77ca40715137",
          },
          {
            id: "63f69fcd-5c93-4a70-b1f2-a651b211d7cb",
            je: "100",
            jx: "四等奖",
            jxid: "954e1514-93f1-4bf7-b49c-77ca40715137",
          },
        ];
        res.data.forEach((item) => {
          if (item.nj) {
            item.nj = JSON.parse(item.nj);
            Object.keys(item.nj).forEach((key) => {
              if (this.propArr.indexOf(key) === -1) {
                this.dynamicColumns.push({ prop: key, label: key });
              }
            });
          } else {
            item.nj = {};
          }
        });
        var map = new Map();
        this.dynamicColumns = this.dynamicColumns.filter(
          (v) => !map.has(v.prop) && map.set(v.prop, 1)
        );
      });
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
        let arr = [];
        this.formAdd.jxdjList.forEach((data) => {
          let temp = {};
          temp.name = data.name;
          let obj = {};
          this.dynamicColumns.forEach((col) => {
            // 仅把有效的列提交
            if (data.nj[col.prop]) {
              obj[col.prop] = data.nj[col.prop];
            }
          });
          if (JSON.stringify(obj) !== "{}") {
            temp.nj = JSON.stringify(obj);
          }
          arr.push(JSON.stringify(obj));
        });
        var resArr = this.formAdd.jxdjList.map((item, i) => {
          return {
            id: item.id ? item.id : "",
            // id: "",
            je: item.je,
            jxdjid: item.jxdjid,
            jxdjmc: item.jxdjmc,
            nj: arr[i],
          };
        });
        var data = {
          jxid: this.lgnSn,
          rcswJzsqJxfpszXyReqs: resArr,
        };
        addCol(data).then((res) => {
          // this.$router.push({
          //   path: "/awardsTea/personalSetting",
        });
        // });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topDIV {
  display: flex;

  .leftDIV {
    width: 80%;
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
