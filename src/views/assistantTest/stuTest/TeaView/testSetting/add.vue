<template>
  <div class="manStudentStyle">
    <div class="bgw">
      <div class="fir">新增</div>
      <div>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item
                label="模块："
                prop="mkValue"
                :rules="rules.mkValue"
              >
                <el-select
                  v-model="form.mkValue"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.dm"
                    :label="item.mc"
                    :value="item.dm"
                  >
                  </el-option>
                </el-select>
              </el-form-item> </el-form
          ></el-col>
          <el-col :span="8">
            <button class="span1" style="margin-right: 20px" @click="zgtAdd">
              新增主观题
            </button>
            <button class="span1" @click="xztAdd">新增选择题</button>
          </el-col>
        </el-row>
        <el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rules"
          label-width="120px"
        >
          <div v-for="(item, ind) in formAdd.allList" style="margin-top: 10px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label="题目："
                  :prop="`allList.${ind}.tmName`"
                  :rules="rules.tmName"
                >
                  <el-input v-model="item.tmName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <span style="margin-top: 7px; display: inline-block"
                  >类型：{{ item.tmType }}</span
                >
              </el-col>
              <el-col :span="7">
                <div
                  style="display: inline-block"
                  @click="
                    (item) => {
                      copy(item, ind);
                    }
                  "
                >
                  <i class="icon fuzhi"></i>
                  <span
                    style="
                      color: #005657;
                      margin-right: 10px;
                      margin-top: 5px;
                      display: inline-block;
                    "
                    >复制</span
                  >
                </div>
                <div
                  style="display: inline-block"
                  @click="
                    (item) => {
                      delList(item, ind);
                    }
                  "
                >
                  <i class="icon shanchu"></i>
                  <span
                    style="
                      color: #005657;
                      margin-top: 5px;
                      display: inline-block;
                    "
                    >删除</span
                  >
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item
                  label="分值："
                  :prop="`allList.${ind}.tmFz`"
                  :rules="rules.tmFz"
                >
                  <el-input-number
                    v-model="item.tmFz"
                    controls-position="right"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="面向培养层次："
                  :prop="`allList.${ind}.tmPycc`"
                  :rules="rules.tmPycc"
                >
                  <el-select
                    v-model="item.tmPycc"
                    multiple
                    ref="selectLabel"
                    @change="
                      (item) => {
                        changePycc(item, ind);
                      }
                    "
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="适用年度："
                  :prop="`allList.${ind}.tmYear`"
                  :rules="rules.tmYear"
                >
                  <el-select v-model="item.tmYear" placeholder="请选择">
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
            <el-table
              ref="multipleTable"
              :data="item.tmxxList"
              v-if="item.tmType == '选择题'"
            >
              <el-table-column label="选项文字" width="950" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`allList.${ind}.tmxxList.${scope.$index}.xxWz`"
                    :rules="rules.xxWz"
                  >
                    <el-input
                      v-model="scope.row.xxWz"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="选项分值" align="center">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin-bottom: 15px"
                    :prop="`allList.${ind}.tmxxList.${scope.$index}.xxFz`"
                    :rules="rules.xxFz"
                  >
                    <el-input
                      v-model="scope.row.xxFz"
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
                      @click="jia(scope.row, scope.$index, ind)"
                    ></i>
                    <i
                      class="icon jian"
                      @click="jian(scope.row, scope.$index, ind)"
                    ></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <hr />
      <el-row :gutter="20">
        <el-col :span="6" :offset="21">
          <div>
            <button class="span2" style="margin-right: 20px" @click="cancel">
              取消
            </button>
            <button
              class="span1"
              @click="save"
              v-if="formAdd.allList.length > 0"
            >
              保 存
            </button>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../../../components/checkboxCom";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { add } from "@/api/test/testSetting";
import { getGrade } from "@/api/class/maintenanceClass";

export default {
  components: { CheckboxCom },
  data() {
    return {
      rules: {
        xxWz: [
          {
            required: true,
            message: "选项文字不能为空",
            trigger: "blur",
          },
        ],
        xxFz: [
          {
            required: true,
            message: "选项分值不能为空",
            trigger: "blur",
          },
        ],
        tmName: [
          {
            required: true,
            message: "题目不能为空",
            trigger: "blur",
          },
        ],
        tmFz: [
          {
            required: true,
            message: "分值不能为空",
            trigger: "blur",
          },
        ],
        tmPycc: [
          {
            required: true,
            message: "培养层次不能为空",
            trigger: "blur",
          },
        ],
        mkValue: [
          {
            required: true,
            message: "模块不能为空",
            trigger: "blur",
          },
        ],
        tmYear: [
          {
            required: true,
            message: "适应年度不能为空",
            trigger: "blur",
          },
        ],
      },
      options: [],
      options1: [],
      options2: [],
      form: { mkValue: "" },
      formAdd: {
        allList: [],
      },
      delArr: [],
      delConfirm: true,
      dynamicModal: false,
      tableHeader: [
        { dm: "tmMk", mc: "模块" },
        { dm: "tmName", mc: "题目", width: "520" },
        { dm: "tmPyccname", mc: "培养层次" },
        { dm: "tmYear", mc: "适用年度" },
        { dm: "tmFz", mc: "分值" },
      ],
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      AUTHFLAG: false,
    };
  },
  mounted() {
    this.getAllGrade(); //年级
    this.getCode("dmtmszmk");
    this.getCode("dmpyccm");
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  methods: {
    jia(row, index, ind) {
      var obj = { xxFz: "", xxWz: "" };
      this.formAdd.allList[ind].tmxxList.push(obj);
    },
    jian(row, index, ind) {
      this.formAdd.allList[ind].tmxxList.splice(index, 1);
    },
    copy(item, ind) {
      this.formAdd.allList.push(this.formAdd.allList[ind]);
    },
    delList(item, ind) {
      this.formAdd.allList.splice(ind, 1);
    },
    changePycc(item, ind) {
      var newArray = []; //新数组
      var j = 0;
      //查找符合条件值并存入新数组
      for (let i in this.options1) {
        for (var x = 0; x < item.length; x++) {
          if (this.options1[i].dm == item[x]) {
            newArray[j++] = this.options1[i].mc;
          }
        }
      }
      this.formAdd.allList[ind].tmPyccname = newArray;
    },
    xztAdd() {
      var data = {
        tmName: "",
        tmFz: "",
        tmPycc: [],
        tmPyccname: [],
        tmYear: "",
        tmType: "选择题",
        tmLy: 0,
        tmMk: this.form.mkValue,
        tmxxList: [
          { xxFz: "", xxWz: "" },
          { xxFz: "", xxWz: "" },
          { xxFz: "", xxWz: "" },
          { xxFz: "", xxWz: "" },
        ],
      };
      this.formAdd.allList.push(data);
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      let validForm1 = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      this.$refs.form.validate((valid) => {
        validForm1 = valid;
      });
      if (!validForm || !validForm1) {
        return false;
      }
      return true;
    },
    cancel() {
      this.$router.push({
        path: "/assistantTest/stuTest/testSetting",
      });
    },
    save() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        for (var y = 0; y < this.formAdd.allList.length; y++) {
          this.formAdd.allList[y].tmMk = this.form.mkValue;
        }
        add(this.formAdd.allList).then((res) => {
          this.$message.success("新增成功");
          this.$router.push({
            path: "/assistantTest/stuTest/testSetting",
          });
        });
      }
    },
    zgtAdd() {
      var data = {
        tmName: "",
        tmFz: "",
        tmPycc: [],
        tmYear: "",
        tmType: "文字题",
        tmLy: 0,
        tmMk: this.form.mkValue,
        tmxxList: [],
      };
      this.formAdd.allList.push(data);
    },
    getAllGrade() {
      getGrade()
        .then((res) => {
          this.options2 = res.data.rows;
        })
        .catch((err) => {});
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmtmszmk":
              this.options = res.data;
              break;
            case "dmpyccm":
              this.options1 = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = this.multipleSelection.map((item) => item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.span1 {
  cursor: pointer;
  color: #fff;
  background: #005657;
  border: 1px solid #005657;
  padding: 10px;
}
.span2 {
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  padding: 10px;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-right: 5px;
}
.shanchu {
  margin-top: 9px;
  background: url("~@/assets/images/shanchu.png") no-repeat;
}

.fuzhi {
  margin-top: 9px;
  background: url("~@/assets/images/fuzhi.png") no-repeat;
}
.jia {
  margin-top: 9px;
  background: url("~@/assets/images/jia.png") no-repeat;
}

.jian {
  margin-top: 9px;
  background: url("~@/assets/images/jian.png") no-repeat;
}
.bgw {
  background-color: #fff;
  margin-top: 10px;
}
.fir {
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
  line-height: 28px;
  padding: 10px;
}
</style>
