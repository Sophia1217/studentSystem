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
                maxlength="50"
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
        ref="formAdd"
        :model="formAdd"
        :rules="rules"
        label-width="120px"
      >
        <div v-for="(item, ind) in formAdd.dwXxWjTmList">
          <div style="margin-top: 10px">
            <div class="father_box" style="font-size: bolder">
              <div>第{{ ind + 1 }}个模块</div>
              <div class="right_box">
                <span
                  class="title"
                  @click="
                    (item) => {
                      delList(item, ind);
                    }
                  "
                  >删除</span
                >
                <span
                  class="title"
                  @click="
                    (item) => {
                      xinzeng(item, ind);
                    }
                  "
                  >新增</span
                >
              </div>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="评分类别："
                :prop="`dwXxWjTmList.${ind}.tmMk`"
                :rules="rules.tmMk"
              >
                <el-input
                  v-model="item.tmMk"
                  @blur="
                    (a) => {
                      bindData(a, ind);
                    }
                  "
                  style="width: 20%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <span>合计：{{ item.total }}分</span>
            </el-col>
            <el-table :data="item.tmxxList">
              <el-table-column
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column label="选项文字" width="750" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`dwXxWjTmList.${ind}.tmxxList.${scope.$index}.tmName`"
                    :rules="rules.tmName"
                    label-width="0"
                  >
                    <el-input
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
                    :prop="`dwXxWjTmList.${ind}.tmxxList.${scope.$index}.tmFz`"
                  >
                    <el-input-number
                      :max="100"
                      :min="0"
                      style="width: 170px"
                      v-model="scope.row.tmFz"
                      placeholder="请输入"
                      @change="
                        (a) => {
                          changeData(a, ind);
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
                      v-if="scope.$index !== item.tmxxList.length - 1"
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
          确认生成名称为{{ form.wjName }}的问卷，分数为 {{ totalFZ }}分？
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
import { queryList, scWj1, getDetail, mkQuery } from "@/api/test/testSetting";
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
      formAdd: {
        dwXxWjTmList: [
          {
            tmMk: "",
            total: 0,
            tmxxList: [
              { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
              { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
              { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
              { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
            ],
          },
        ],
      },
      dynamicModal: false,
      tableData: [],
      totalFZ: 0,
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.mkQuery1();
    this.getAllGrade(); //年级
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },

  methods: {
    shangyi(index, row, ind) {
      //   if (index > 0) {
      const upDate = this.formAdd.dwXxWjTmList[ind].tmxxList[index - 1];
      this.formAdd.dwXxWjTmList[ind].tmxxList.splice(index - 1, 1);
      this.formAdd.dwXxWjTmList[ind].tmxxList.splice(index, 0, upDate);
      //   } else {
      //     alert("已经是第一条，不可上移");
      //   }
    },
    // 下移
    xiayi(index, row, ind) {
      //   if (index + 1 === this.formAdd.dwXxWjTmList[ind].tmxxList.length) {
      //     alert("已经是最后一条，不可下移");
      //   } else {
      const downDate = this.formAdd.dwXxWjTmList[ind].tmxxList[index + 1];
      this.formAdd.dwXxWjTmList[ind].tmxxList.splice(index + 1, 1);
      this.formAdd.dwXxWjTmList[ind].tmxxList.splice(index, 0, downDate);
      //   }
    },
    jia(row, index, ind) {
      var obj = { tmFz: "", tmName: "" };
      this.formAdd.dwXxWjTmList[ind].tmxxList.push(obj);
    },
    jian(row, index, ind) {
      if (this.formAdd.dwXxWjTmList[ind].tmxxList.length > 1) {
        this.formAdd.dwXxWjTmList[ind].tmxxList.splice(index, 1);
      } else {
        this.$message.warning("请至少保留一个题目");
      }
    },
    delList(item, ind) {
      if (this.formAdd.dwXxWjTmList.length > 1) {
        this.formAdd.dwXxWjTmList.splice(ind, 1);
      } else {
        this.$message.warning("请至少保留一个模块");
      }
    },
    changeData(a, ind) {
      //分数改变统计当前模块合计
      this.formAdd.dwXxWjTmList[ind].total = this.formAdd.dwXxWjTmList[
        ind
      ].tmxxList.reduce((prev, next) => {
        return prev + Number(next.tmFz);
      }, 0);
    },
    bindData(item, ind) {
      //以为后台数据问题，每次失去焦点，就自动为当前模块每一条列表数据绑定上一个模块字段
      for (var x = 0; x < this.formAdd.dwXxWjTmList[ind].tmxxList.length; x++) {
        this.formAdd.dwXxWjTmList[ind].tmxxList[x].tmMk = item.target.value;
      }
    },
    xinzeng() {
      this.formAdd.dwXxWjTmList.push({
        tmMk: "",
        total: 0,
        tmxxList: [
          { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
          { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
          { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
          { tmFz: "", tmName: "", tmLy: "2", tmType: "文字题", wjId: "" },
        ],
      });
    },
    openModal() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.totalFZ = this.formAdd.dwXxWjTmList.reduce((prev, next) => {
          return prev + Number(next.total);
        }, 0);
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
      this.$refs.formAdd.validate((valid) => {
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
        dwXxWjTmList: [],
        wjCount: "",
        wjFz: "",
        wjDy: this.form.wjDy,
        wjLy: "2",
        wjName: this.form.wjName,
        wjYear: this.form.tmYear,
      };
      for (var x = 0; x < this.formAdd.dwXxWjTmList.length; x++) {
        for (var y = 0; y < this.formAdd.dwXxWjTmList[x].tmxxList.length; y++) {
          data.dwXxWjTmList.push(this.formAdd.dwXxWjTmList[x].tmxxList[y]);
        }
      }
      data.wjFz = data.dwXxWjTmList.reduce((prev, next) => {
        return prev + Number(next.tmFz);
      }, 0);
      data.wjCount = data.dwXxWjTmList.length;
      scWj1(data).then((res) => {
        this.$message.success("问卷已生成");
        this.scModal = false;
        this.$router.push({
          path: "/assistantTest/unitTest/questionList",
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
