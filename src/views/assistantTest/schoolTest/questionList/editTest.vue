<template>
  <div class="manStudentStyle">
    <div class="searchWrap">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row> <h3 style="font-weight: bolder">问卷信息</h3> </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item
              label="问卷名称："
              prop="wjName"
              :rules="rules.wjName"
            >
              <el-input
                v-model="form.wjName"
                placeholder="请输入问卷名称"
                class="inputSelect"
                clearable
                maxlength="50"
                style="width: 80%"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="问卷导语：" prop="wjDy" :rules="rules.wjDy">
              <el-input
                style="width: 80%"
                v-model="form.wjDy"
                placeholder="请输入问卷导语"
                maxlength="500"
                class="inputSelect"
                clearable
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item
              label="适用年度："
              prop="tmYear"
              :rules="rules.tmYear"
            >
              <el-select v-model="form.tmYear" placeholder="请选择" clearable>
                <el-option
                  v-for="(ele, index) in options2"
                  :key="index"
                  :label="ele"
                  :value="ele"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row> <h3 style="font-weight: bolder">问卷内容</h3> </el-row>
      <el-form
        ref="formEdit"
        :model="formEdit"
        :rules="rules"
        label-width="120px"
      >
        <div v-for="(item, ind) in formEdit.listArr">
          <div style="margin-top: 10px">
            <div class="father_box" style="font-size: bolder">
              <div>{{ item.mk }}</div>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="评分类别：">
                <span>{{ item.tmMk }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="line-height: 40px; font-weight: 700">
              <span>合计：{{ item.childs.total }}分</span>
            </el-col>
            <el-table :data="item.childs">
              <el-table-column
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column label="选项文字" width="750" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    label-width="0"
                    :prop="`listArr.${ind}.childs.${scope.$index}.tmName`"
                    :rules="rules.tmName"
                  >
                    <el-input
                      maxlength="100"
                      @blur="
                        (a) => {
                          wZchange(a, scope.row);
                        }
                      "
                      v-model="scope.row.tmName"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="选项分值" width="200" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    label-width="0"
                    style="margin-bottom: 15px"
                    :prop="`listArr.${ind}.childs.${scope.$index}.tmFz`"
                    :rules="rules.tmFz"
                  >
                    <el-input-number
                      :max="item.tmMk == '加分项' ? 100 : 0"
                      :min="item.tmMk == '减分项' ? -100 : 0"
                      style="width: 170px"
                      v-model="scope.row.tmFz"
                      placeholder="请输入"
                      @change="
                        (a) => {
                          wZchange(a, scope.row);
                        }
                      "
                    ></el-input-number>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="上移下移" align="center">
                <template slot-scope="scope">
                  <div style="margin-bottom: 20px">
                    <i
                      v-if="scope.$index !== 0"
                      class="icon shangyi"
                      @click="shangyi(scope.$index, scope.row, ind)"
                    ></i>
                    <i
                      v-if="scope.$index !== item.childs.length - 1"
                      class="icon xiayi"
                      @click="xiayi(scope.$index, scope.row, ind)"
                    ></i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="添加选项" align="center">
                <template slot-scope="scope">
                  <div style="margin-bottom: 20px">
                    <i
                      class="icon jia"
                      @click="jia(scope.row, scope.$index, ind)"
                    ></i>
                    <i
                      class="icon jian"
                      @click="jian(scope.row, scope.$index, ind)"
                    ></i>
                  </div>
                </template> </el-table-column
            ></el-table>
          </el-row>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="生成问卷提示"
      :visible.sync="scModal"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <h3 style="margin-left: 25px; font-weight: 700">
          确认生成名称为{{ form.wjName }}的问卷，加分项有{{ jialen }}题，加分为
          {{ jiafen }}分; 减分项有{{ jianlen }}题，减分为 {{ jianfen }}分;
        </h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="scModalCancel">关 闭</el-button>
        <el-button @click="scWj">确 认</el-button>
      </span>
    </el-dialog>
    <div
      style="
        background: white;
        display: flex;
        padding: 15px;
        justify-content: flex-end;
      "
    >
      <div @click="openModal" class="greenbtn">生成问卷</div>
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../../components/checkboxCom";
import {
  scWj1,
  mkQuery,
  updataScWj,
  listDetail,
  editSolo,
  editJiaru,
  YICHU,
  updown,
} from "@/api/test/testSetting";
import { getGrade } from "@/api/class/maintenanceClass";
export default {
  components: { CheckboxCom },
  data() {
    return {
      scModal: false,
      rules: {
        wjName: [
          {
            required: true,
            message: "问卷名称不能为空",
            trigger: "blur",
          },
        ],
        tmMk: [
          {
            required: true,
            message: "评分类别不能为空",
            trigger: "blur",
          },
        ],
        wjDy: [
          {
            required: true,
            message: "问卷导语不能为空",
            trigger: "blur",
          },
        ],
        tmYear: [
          {
            required: true,
            message: "适用年度不能为空",
            trigger: "blur",
          },
        ],
        tmName: [
          {
            required: true,
            message: "选项文字不能为空",
            trigger: "blur",
          },
        ],
        tmFz: [
          {
            required: true,
            message: "选项分值不能为空",
            trigger: "blur",
          },
        ],
      },
      preModal: false,
      form: {
        wjName: "",
        wjDy: "",
        tmYear: "",
      },
      activeName: "first",
      options2: [],
      delArr: [],
      tmName: "",
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      routeId: "",

      formEdit: { listArr: [] },
      dynamicModal: false,
      tableData: [],
      totalFZ: 0,
      len: 0,
      AUTHFLAG: false,
      list: [],
      jiafen: 0,
      jialen: 0,
      jianfen: 0,
      jianlen: 0,
    };
  },
  mounted() {
    this.mkQuery1();
    this.routeId = this.$route.query.id;
    this.listDetail1();
    this.getAllGrade(); //年级
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    wZchange(wz, row) {
      var data = [
        {
          id: row.id,
          tmFz: row.tmFz,
          tmMk: row.tmMk,
          tmName: row.tmName,
        },
      ];
      editSolo(data).then((res) => {
        this.listDetail1();
      });
    },
    listDetail1() {
      listDetail(this.routeId)
        .then((res) => {
          this.form.wjName = res.data.wjName;
          this.form.wjDy = res.data.wjDy;
          this.form.tmYear = res.data.wjYear;
          let newArr = [];
          //多设置一个数组，接新增的参数
          this.list = res.data.tmList;
          res.data.tmList.forEach((item) => {
            const parent = newArr.find((c) => c.tmMk === item.tmMk);
            if (parent) {
              parent.childs.push(item);
            } else {
              const obj = {
                tmMk: item.tmMk,
                tmFz: item.tmFz,
                id: item.id,
                childs: [item],
              };
              newArr.push(obj);
            }
          });
          if (newArr.length > 0) {
            this.test(newArr);
          }
        })
        .catch((err) => {});
    },
    test(arr) {
      for (var y = 0; y < arr.length; y++) {
        var chi = this.toChinesNum(y + 1);
        arr[y].mk = `第${chi}部分`;
        var total = 0;
        if (arr[y].childs.length > 0) {
          total += arr[y].childs.reduce((pre, cur) => {
            return pre + Number(cur.tmFz);
          }, 0);
        }
        arr[y].childs.total = total;
      }
      // console.log("目标arr", arr);
      this.formEdit.listArr = arr;
    },
    changeData(a, ind) {
      //分数改变统计当前模块合计
      this.formEdit.listArr[ind].childs.total = this.formEdit.listArr[
        ind
      ].childs.reduce((prev, next) => {
        return prev + Number(next.tmFz);
      }, 0);
      //数据层级嵌套过深，需要强制更新
      this.$forceUpdate();
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        let newArr = [];
        strArr.forEach((item, index) => {
          newArr.unshift(
            item === "0" ? changeNum[item] : changeNum[item] + unit[index]
          );
        });
        let numArr = [];
        newArr.forEach((m, n) => {
          if (m !== "零") numArr.push(n);
        });
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === "零") {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m;
              }
            } else {
              newNum += m;
            }
          });
        } else {
          newNum = newArr[0];
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    shangyi(index, row, ind) {
      const upDate = this.formEdit.listArr[ind].childs[index - 1];
      this.formEdit.listArr[ind].childs.splice(index - 1, 1);
      this.formEdit.listArr[ind].childs.splice(index, 0, upDate);
      var data = [];
      for (var x = 0; x < this.formEdit.listArr.length; x++) {
        for (var y = 0; y < this.formEdit.listArr[x].childs.length; y++) {
          data.push({
            id: "",
            tmId: this.formEdit.listArr[x].childs[y].id,
            wjId: this.routeId,
          });
        }
      }
      updown(data).then((res) => {
        this.$message.success("顺序已更新");
      });
    },
    // 下移
    xiayi(index, row, ind) {
      const downDate = this.formEdit.listArr[ind].childs[index + 1];
      this.formEdit.listArr[ind].childs.splice(index + 1, 1);
      this.formEdit.listArr[ind].childs.splice(index, 0, downDate);
      var data = [];
      for (var x = 0; x < this.formEdit.listArr.length; x++) {
        for (var y = 0; y < this.formEdit.listArr[x].childs.length; y++) {
          data.push({
            id: "",
            tmId: this.formEdit.listArr[x].childs[y].id,
            wjId: this.routeId,
          });
        }
      }
      updown(data).then((res) => {
        this.$message.success("顺序已更新");
      });
    },
    jia(row, index, ind) {
      var data = {
        tmLy: "2",
        tmMk: row.tmMk,
        tmFz: "",
        tmName: "",
        tmType: "文字题",
        wjId: this.routeId,
      };
      editJiaru(data).then((res) => {
        this.listDetail1();
      });
    },
    jian(row, index, ind) {
      var data = [{ id: "", tmId: row.id, wjId: this.routeId }];
      YICHU(data).then((res) => {
        this.listDetail1();
      });
    },
    delList(item, ind) {
      if (this.formEdit.listArr.length > 1) {
        var data = this.formEdit.listArr[ind].childs;
        let res = data.map((obj, index) => {
          return Object.assign(
            {},
            { id: "", tmId: obj.id, wjId: this.routeId }
          );
        });
        YICHU(res).then((res) => {
          this.listDetail1();
        });
      } else {
        this.$message.warning("请至少保留一个模块");
      }
    },

    bindData(item, ind) {
      // 以为后台数据问题，每次失去焦点，就自动为当前模块每一条列表数据绑定上一个模块字段
      for (var x = 0; x < this.formEdit.listArr[ind].childs.length; x++) {
        this.formEdit.listArr[ind].childs[x].tmMk = item.target.value;
      }
      let res = this.formEdit.listArr[ind].childs.map((obj, index) => {
        return Object.assign(
          {},
          { id: obj.id, tmFz: obj.tmFz, tmMk: obj.tmMk, tmName: obj.tmName }
        );
      });
      editSolo(res).then((res) => {
        this.listDetail1();
      });
    },
    xinzeng() {
      var data = {
        tmLy: "2",
        tmMk: "",
        tmFz: "",
        tmName: "",
        tmType: "文字题",
        wjId: this.routeId,
      };
      editJiaru(data).then((res) => {
        this.listDetail1();
      });
    },
    openModal() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.jiafen = this.formEdit.listArr[0].childs.total;
        this.jialen = this.formEdit.listArr[0].childs.length;
        this.jianfen = 0 - this.formEdit.listArr[1].childs.total;
        this.jianlen = this.formEdit.listArr[1].childs.length;
        // var arr = [];
        // for (var x = 0; x < this.formEdit.listArr.length; x++) {
        //   for (var y = 0; y < this.formEdit.listArr[x].childs.length; y++) {
        //     arr.push(this.formEdit.listArr[x].childs[y]);
        //   }
        // }
        // this.len = arr.length;
        // this.totalFZ = arr.reduce((prev, next) => {
        //   return prev + Number(next.tmFz);
        // }, 0);
        this.scModal = true;
      }
    },
    scModalCancel() {
      this.scModal = false;
    },
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      let validForm1 = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      this.$refs.formEdit.validate((valid) => {
        validForm1 = valid;
      });
      if (!validForm || !validForm1) {
        return false;
      }
      return true;
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        let newArr = [];
        strArr.forEach((item, index) => {
          newArr.unshift(
            item === "0" ? changeNum[item] : changeNum[item] + unit[index]
          );
        });
        let numArr = [];
        newArr.forEach((m, n) => {
          if (m !== "零") numArr.push(n);
        });
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === "零") {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m;
              }
            } else {
              newNum += m;
            }
          });
        } else {
          newNum = newArr[0];
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    scWj() {
      var data = {
        id: this.routeId,
        wjCount: this.len,
        wjFz: this.totalFZ,
        wjDy: this.form.wjDy,
        wjName: this.form.wjName,
        wjNj: "",
        wjPycc: "",
        wjYear: this.form.tmYear,
        wjTnjps: "0",
      };
      updataScWj(data).then((res) => {
        this.$message.success("问卷已生成");
        this.scModal = false;
        this.$router.push({
          path: "/assistantTest/schoolTest/questionList",
        });
      });
    },
    mkQuery1() {
      mkQuery({ tmMk: " " }).then((res) => {
        this.$set(this.training, "checkBox", res.data);
        this.options = res.data;
      });
    },
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.options2 = res.data.rows;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.father_box {
  height: 50px;
  align-items: center;
  display: flex;
  font-size: medium;
  font-weight: bolder;
}
.right_box {
  margin-left: auto;
}
.greenbtn {
  background-color: #005657;
  padding: 8px 15px;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
}
.whitebtn {
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 8px 15px;
  cursor: pointer;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}

.xiayi {
  margin-top: 9px;
  background: url("~@/assets/images/xiayi.png") no-repeat;
}

.shangyi {
  margin-top: 9px;
  background: url("~@/assets/images/shangyi.png") no-repeat;
}

.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.expandOpen {
  width: 80%;
  height: 100px;
  overflow: hidden;
  padding: 10px;
  margin-left: -10px;
}
.expandClose {
  width: 80%;
  height: 310px;
}

.manStudentStyle {
  width: 80%;
  margin: 0 auto;
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
      background: #fff;
      .inputSelect {
        width: 30%;
      }
    }
  }
  .btns {
    margin-left: 15px;
    padding: 5px 10px;
    cursor: pointer;
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 22px;
      // vertical-align: middle;
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
        display: flex;

        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          // vertical-align: middle;
        }
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
        .btns2 {
          margin-left: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
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
      .headerRight {
        display: flex;

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
          }
        }
      }
    }
  }
}
</style>
