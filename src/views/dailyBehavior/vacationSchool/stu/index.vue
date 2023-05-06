<template>
  <div class="basicInfo">
    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <topTitle :routeTitle="routeTitle"></topTitle>
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">假期留校</span>
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderRed" @click="handleDelete">
            <i class="icon lightIcon" /><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="handleSubmit">
            <i class="icon orangeIcon" /><span class="title">提交</span>
          </div> -->
          <div class="btns fullGreen" @click="lxsq">
            <i class="icon greenIcon" /><span class="title1">留校申请</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="tableDataLiu"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="lxkssj" label="留校开始日期" sortable />
          <el-table-column
            prop="lxjssj"
            label="留校结束日期"
            sortable="custom"
          />
          <el-table-column prop="lxyy" label="留校原因" sortable="custom" />
          <el-table-column prop="sqsj" label="申请时间" sortable="custom" />
          <el-table-column
            prop="statusChinese"
            label="审核状态"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="createDwhMc" label="审核进度">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span class="handleName">流转记录</span>
              </el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="headerTop" style="margin-top: 15px">
        <div class="headerLeft">
          <span class="title">假期离校</span>
        </div>
        <div class="headerRight">
          <div class="btns fullGreen" @click="lxdj">
            <i class="icon greenIcon" /><span class="title1">离校登记</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="tableDataLi"
          style="width: 100%"
          :default-sort="{ prop: 'gh', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="lxsj" label="离校日期" />
          <el-table-column prop="lxqxpj" label="离校去向" />
          <el-table-column prop="qxlxmc" label="去向类型" />
          <el-table-column prop="jjlxr" label="紧急联系人" />
          <el-table-column prop="lxfs" label="联系方式" />
          <el-table-column prop="gx" label="关系" />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="留校申请"
      :visible.sync="addModalLiu"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formAddLiu"
        :model="formAddLiu"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="留校起止时间" prop="datePicker">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="datePicker"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="留校原因" prop="lxyy" :rules="rules.common">
              <el-input
                v-model="formAddLiu.lxyy"
                type="textarea"
                maxlength="500"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCanceLiu">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClickLiu"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="离校登记"
      :visible.sync="addModalLi"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formAddLi"
        :model="formAddLi"
        :rules="rules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="离校日期" prop="lxsj" :rules="rules.common">
              <el-date-picker
                v-model="formAddLi.lxsj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="去向类型" prop="qxlx" :rules="rules.common">
              <el-select v-model="formAddLi.qxlx" collapse-tags>
                <el-option
                  v-for="(item, index) in qxlxOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item
              label="离校去向"
              prop="lxqxSheng"
              :rules="rules.common"
            >
              <div>
                <el-cascader
                  v-model="formAddLi.lxqxSheng"
                  :options="options"
                  @change="handleChangeJg"
                  :props="locationProps"
                ></el-cascader>
                <el-input
                  v-model="formAddLi.lxqxXxdz"
                  maxlength="200"
                  placeholder="请输入详细地址"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="紧急联系人" prop="jjlxr" :rules="rules.common">
              <el-input v-model="formAddLi.jjlxr" maxlength="10" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="lxfs" :rules="rules.common">
              <el-input v-model="formAddLi.lxfs" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关系" prop="gx" :rules="rules.common">
              <el-input v-model="formAddLi.gx" maxlength="10" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="离校原因" prop="lxyy">
              <el-input
                v-model="formAddLi.lxyy"
                type="textarea"
                maxlength="500"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCanceLi">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClickLi"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量删除对话框 -->
    <el-dialog title="删除" :visible.sync="showDelete" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="rmRecord"
          >确 定</el-button
        >
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
import { del } from "@/api/dailyBehavior/dormStu";
import { query, editLi, editLiu } from "@/api/dailyBehavior/vacationSchoolStu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { getLocationjl } from "@/api/student/index";
import { delwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../../components/lct";
import topTitle from "../../../components/topTitle";
export default {
  name: "BasicInfo",
  components: { lctCom, topTitle },
  props: [],
  data() {
    return {
      delArr: [],
      subArr: [],
      title: "",
      // // 总条数
      // 批量删除确定框弹出
      showDelete: false,
      // 详情框显示
      open: false,

      // // 查询参数

      searchVal: "",
      select: "",
      isMore: false,
      lctModal: false,
      ztStatus: [], //状态
      status: [],
      tableDataLi: [],
      tableDataLiu: [],
      multipleSelection: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        xh: this.$store.getters.userId,
      },
      datePicker: [],
      addModalLi: false,
      addModalLiu: false,
      editModal: false,
      formAddLi: {
        gx: "",
        jjlxr: "",
        lxfs: "",
        lxsj: "",
        lxyy: "",
        qxlx: "",
        lxqxXxdz: "",
        lxqxSheng: "",
      },
      formAddLiu: {
        lxyy: "",
        lxjssj: "",
        lxkssj: "",
      },
      isEdit: 0, //0详情1编辑
      qxlxOps: [],
      //地区级联
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      fileList: [],
      fileListAdd: [],
      routeTitle: "",
      updateCsd: "",
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getList();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmlxqxlx"); // 去向
    this.getLocationjl();
    this.routeTitle = this.$route.meta.title;
  },

  methods: {
    // 表单校验
    checkformAddLi() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddLi.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    checkformAddLiu() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddLiu.validate((valid) => {
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
    //流程
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm":
            this.ztStatus = res.data; //状态
            break;
          case "dmlxqxlx":
            this.qxlxOps = res.data; //去向类型
            break;
        }
      });
    },
    selectChange() {
      this.searchVal = "";
    },
    //获取数据列表
    getList() {
      query()
        .then((response) => {
          this.tableDataLiu = response.data.rcswQueryLiuxsqListRes; // 留校
          this.tableDataLi = response.data.rcswQueryLixsqListRes; // 离校
        })
        .catch((err) => {});
    },
    //批量删除对话框关闭
    delCancel() {
      this.showDelete = false;
    },
    // 详情对话框关闭按钮
    cancel() {
      this.open = false;
    },

    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },

    // 列表多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.subArr = val.map((item) => item.id);
      this.delArr = val.map((item) => item.id);
    },
    //批量删除
    rmRecord() {
      this.showDelete = false;
      del({ ids: this.delArr })
        .then((res) => {
          this.$message.success("删除成功");
          this.getList();
        })
        .catch((err) => {});
    },
    //假期留校
    lxsq() {
      this.addModalLiu = true;
      this.formAddLiu = {
        lxyy: "",
        lxjssj: "",
        lxkssj: "",
      };
      this.$set(this, "datePicker", []);
    },
    addCanceLiu() {
      this.addModalLiu = false;
    },
    addClickLiu() {
      if (this.datePicker.length == 0 || !this.checkformAddLiu()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          id: this.formAddLi.id || "",
          lxkssj:
            this.datePicker && this.datePicker.length > 0
              ? this.datePicker[0]
              : "",
          lxjssj:
            this.datePicker && this.datePicker.length > 0
              ? this.datePicker[1]
              : "",
          lxyy: this.formAddLiu.lxyy,
        };
        editLiu(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("操作成功");
            this.addModalLiu = false;
            this.getList();
          } else {
            this.$message.error("操作失败");
          }
        });
      }
    },
    //离校登记
    lxdj() {
      this.addModalLi = true;
      this.formAddLi = {};
    },
    addCanceLi() {
      this.addModalLi = false;
    },
    addClickLi() {
      if (!this.checkformAddLi()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          id: this.formAddLi.id || "",
          gx: this.formAddLi.gx,
          jjlxr: this.formAddLi.jjlxr,
          lxfs: this.formAddLi.lxfs,
          lxsj: this.formAddLi.lxsj,
          lxyy: this.formAddLi.lxyy,
          qxlx: this.formAddLi.qxlx,
          lxqxXxdz: this.formAddLi.lxqxXxdz,
          lxqxSheng: this.updateCsd ? this.updateCsd : this.formAddLi.lxqxSheng,
        };
        editLi(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("操作成功");
            this.addModalLi = false;
            this.getList();
          } else {
            this.$message.error("操作失败");
          }
        });
      }
    },
    //点击详情
    hadleDetail(row) {
      this.addModalLi = true;
      // console.log("row", row);
      this.formAddLi = row;
    },
    EditStatus() {
      this.isEdit = 1;
      this.getAllld();
    },
    //详情编辑
    editCance() {
      this.editModal = false;
      this.isEdit = 0;
    },

    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
      });
    },
    handleChangeJg(value) {
      if (value && value.length == 1) {
        this.updateCsd = value[0]; //若是简单下拉框，则绑定v-model就可以
      } else if (value && value.length == 2) {
        this.updateCsd = value[1];
      } else {
        this.updateCsd = value[2];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
}
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }
  // .searchWrap {
  //   background: #fff;
  //   padding: 20px;
  //   .search {
  //     display: flex;
  //     flex-direction: row;
  //     align-items: center;
  //     background: #fff;
  //     .elSelect {
  //       width: 150px;
  //     }
  //     .inputSelect {
  //       width: 50%;
  //     }
  //     .more {
  //       flex: 0 0 100px;
  //       margin-left: 20px;
  //       display: flex;
  //       flex-direction: row;
  //       align-items: center;
  //       color: #005657;
  //       cursor: pointer;
  //       .moreIcon {
  //         display: block;
  //         width: 20px;
  //         height: 20px;
  //       }
  //       .chevronDown {
  //         background: url("~@/assets/images/chevronDown.png") no-repeat;
  //       }
  //       .chevronUp {
  //         background: url("~@/assets/images/chevronUp.png") no-repeat;
  //       }
  //     }
  //   }
  //   .moreSelect {
  //     margin-top: 20px;
  //     padding: 20px;
  //     background: #fafafa;
  //   }
  // }
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
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
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
          .backIcon {
            margin-top: 10px;
            background: url("~@/assets/images/chehui.png") no-repeat;
          }
        }
      }
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
  .searchButton {
    background: #005657;
    color: white;
  }
}
.closeButton {
  background: #005657;
  color: white;
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.greenDot {
  width: 8px;
  height: 8px;
  color: #23ad6f;
}
.redDot {
  width: 8px;
  height: 8px;
  color: #ed5234;
}
</style>
