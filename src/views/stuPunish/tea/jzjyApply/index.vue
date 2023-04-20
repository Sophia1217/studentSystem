<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">岗位列表</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderLight" @click="copy">
            <i class="icon copyIcon"></i><span class="title2">复制</span>
          </div>
          <div class="btns borderLight" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">撤回</span>
          </div>
          <div class="btns borderLight" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">提交</span>
          </div>
          <div class="btns borderGreen" @click="addModal = true">
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
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="gwMainMc"
            label="岗位名称"
            sortable="custom"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="gwTypeMc"
            label="岗位类型"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="gwGzdd"
            label="工作地点"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="gwYrbmc" label="用人部门" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwKjnrs" label="可接纳人数" sortable="custom">
          </el-table-column>
          <el-table-column prop="gwZdls" label="指导教师" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="gwLxfs"
            label="联系电话"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="status"
            label="审核状态"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in dmsplcm"
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
                @click="showDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span style="margin-left: 5px">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <el-dialog
      title="新增"
      :visible.sync="addModal"
      :close-on-click-modal="false"
      width="50%"
      @close="addEmpty()"
    >
      <template>
        <el-form
          :model="addForm"
          ref="addForm"
          size="small"
          :rules="rules"
          label-width="80px"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="岗位名称"
                prop="gwMainMc"
                :rules="rules.common"
              >
                <el-input
                  maxlength="50"
                  show-word-limit
                  v-model="addForm.gwMainMc"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="岗位类型"
                prop="gwType"
                :rules="rules.common"
              >
                <el-select v-model="addForm.gwType" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用人部门">
                <span>{{ addForm.gwYrMc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="可接纳人数"
                label-width="100px"
                prop="gwKjnrs"
                :rules="rules.common"
              >
                <el-input
                  type="number"
                  oninput="if(value.length > 5) value = value.slice(0,10)"
                  maxlength="5"
                  show-word-limit
                  v-model="addForm.gwKjnrs"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="工作地点"
                prop="gwGzdd"
                :rules="rules.common"
              >
                <el-input
                  maxlength="100"
                  show-word-limit
                  v-model="addForm.gwGzdd"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="指导老师"
                prop="gwZdls"
                :rules="rules.common"
              >
                <el-autocomplete
                  v-model="addForm.gwZdls"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入老师"
                  :trigger-on-focus="false"
                  @select="handleSelect()"
                  size="small"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="联系方式"
                prop="gwLxfs"
                :rules="rules.common"
              >
                <el-input
                  type="number"
                  oninput="if(value.length > 5) value = value.slice(0,50)"
                  show-word-limit
                  v-model="addForm.gwLxfs"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="工作内容"
                prop="gwGznr"
                :rules="rules.common"
              >
                <el-input
                  type="textarea"
                  :rows="5"
                  maxlength="500"
                  show-word-limit
                  v-model="addForm.gwGznr"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModal = false">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addSave"
          >保存</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="detailModal"
      :close-on-click-modal="false"
      width="50%"
    >
      <template>
        <el-form
          :model="detailForm"
          ref="detailForm"
          size="small"
          :rules="rules"
          label-width="80px"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="岗位名称"
                prop="gwMainMc"
                :rules="rules.common"
              >
                <el-input
                  maxlength="50"
                  show-word-limit
                  v-if="bjzt == '2'"
                  v-model="detailForm.gwMainMc"
                  placeholder="请输入内容"
                ></el-input>
                <span v-else>{{ detailForm.gwMainMc }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="岗位类型"
                prop="gwType"
                :rules="rules.common"
              >
                <el-select
                  v-model="detailForm.gwType"
                  placeholder="请选择"
                  v-if="bjzt == '2'"
                >
                  <el-option
                    v-for="(item, index) in ztStatus"
                    :key="index"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
                <span v-else>{{ detailForm.gwTypeMc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="用人部门">
                <span>{{ detailForm.gwYrMc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="可接纳人数"
                label-width="100px"
                prop="gwKjnrs"
                :rules="rules.common"
              >
                <el-input
                  v-if="bjzt == '2'"
                  oninput="if(value.length > 5) value = value.slice(0,10)"
                  type="number"
                  v-model="detailForm.gwKjnrs"
                  placeholder="请输入内容"
                ></el-input>
                <span v-else>{{ detailForm.gwKjnrs }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="工作地点"
                prop="gwGzdd"
                :rules="rules.common"
              >
                <el-input
                  maxlength="100"
                  v-if="bjzt == '2'"
                  v-model="detailForm.gwGzdd"
                  placeholder="请输入内容"
                ></el-input>
                <span v-else>{{ detailForm.gwGzdd }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="指导老师"
                prop="gwZdls"
                :rules="rules.common"
              >
                <el-autocomplete
                  v-if="bjzt == '2'"
                  v-model="detailForm.gwZdls"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入老师"
                  :trigger-on-focus="false"
                  @select="handleSelect()"
                  size="small"
                ></el-autocomplete>
                <span v-else>{{ detailForm.gwZdls }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item
                label="联系方式"
                prop="gwLxfs"
                :rules="rules.common"
              >
                <el-input
                  v-if="bjzt == '2'"
                  type="number"
                  oninput="if(value.length > 5) value = value.slice(0,50)"
                  v-model="detailForm.gwLxfs"
                  placeholder="请输入内容"
                ></el-input>
                <span v-else>{{ detailForm.gwLxfs }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item
                label="工作内容"
                prop="gwGznr"
                :rules="rules.common"
              >
                <el-input
                  v-if="bjzt == '2'"
                  maxlength="500"
                  show-word-limit
                  type="textarea"
                  :rows="5"
                  v-model="detailForm.gwGznr"
                  placeholder="请输入内容"
                ></el-input>
                <span v-else>{{ detailForm.gwGznr }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          v-if="
            bjzt == '1' &&
            (detailForm.status == '08' || detailForm.status == '01')
          "
          @click="bjzt = '2'"
          >编 辑</el-button
        >
        <el-button type="primary" v-if="bjzt == '2'" @click="edit"
          >保 存</el-button
        >
        <el-button type="primary" @click="detailModal = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { getXmXgh } from "@/api/assistantWork/homeSchool";
import {
  queryList,
  delList,
  fuzhi,
  tj,
  cehui,
  save,
} from "@/api/jzjyGwsq/index";
import { queryZgJbxxDwh } from "@/api/dailyBehavior/thriftbumen";
export default {
  watch: {
    detailModal: function (newV) {
      if (newV) {
        this.bjzt = "1";
      }
    },
  },
  data() {
    return {
      bjzt: "1",
      addForm: {
        gwGzdd: "", //工作地点
        gwGznr: "", //工作内容
        gwKjnrs: "", //可接纳人数
        gwLxfs: "", //联系方式
        gwMainMc: "", //岗位名称
        gwType: "", //岗位性质
        gwYrMc: "",
        gwYrbm: "", //用人部门
        gwZdls: "", //指导教师
      },
      detailForm: {},
      detailModal: false,
      multipleSelection: [],
      addModal: false,
      AUTHFLAG: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      delArr: [],
      tjArr: [],
      ztStatus: [],
      dmsplcm: [],
      val: [],
      rules: {
        common: [{ required: true, message: "请完善表单", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.query();
    this.getYrbm();
    this.getCode("dmgwlx"); //状态
    this.getCode("dmsplcm"); //状态
  },

  methods: {
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.addForm.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    checkFormDetail() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.detailForm.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handleSelect() {
      //   this.addForm.gwZdls
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res && res.data;
          resultNew = result.map((ele) => {
            return {
              value: `${ele.xm}(${ele.gh})`,
              label: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          cb(callBackArr);
        });
      }
    },
    addSave() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        save(this.addForm).then((res) => {
          this.query();
          this.addModal = false;
        });
      }
    },
    edit() {
      if (!this.checkFormDetail()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        save(this.detailForm).then((res) => {
          this.query();
          this.detailModal = false;
        });
      }
    },
    getYrbm() {
      queryZgJbxxDwh()
        .then((res) => {
          this.addForm.gwYrMc = res.data.mc;
          this.addForm.gwYrbm = res.data.dm;
        })
        .catch((err) => {});
    },
    addEmpty() {
      this.$nextTick(() => {
        this.$refs.addForm.resetFields();
      });
    },
    empty() {
      this.$nextTick(() => {
        this.$refs.fzform.resetFields();
      });
    },
    showDetail(row) {
      //深克隆，浅克隆会影响当前row的数据
      this.detailForm = JSON.parse(JSON.stringify(row));
      this.detailModal = true;
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.$confirm("即将删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              delList({ ids: this.delArr }).then((res) => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.query();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    copy() {
      if (this.delArr.length > 0) {
        this.$confirm("即将复制, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        })
          .then(() => {
            fuzhi({ ids: this.delArr }).then((res) => {
              this.$message({
                type: "success",
                message: "复制成功!",
              });
              this.query();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消复制",
            });
          });
      } else {
        this.$message.error("请先勾选数据！");
      }
    },
    tjModal() {
      var falg = 1;
      //判断是否是草稿数据
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.tjArr && this.tjArr.length > 0) {
          this.$confirm("即将提交, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success",
          })
            .then(() => {
              tj(this.multipleSelection).then((res) => {
                this.$message({
                  type: "success",
                  message: "提交成功!",
                });
                this.query();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交",
              });
            });
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    chModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          if (this.tjArr && this.tjArr.length > 0) {
            this.$confirm("即将撤回, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                cehui(this.multipleSelection).then((res) => {
                  this.$message({
                    type: "success",
                    message: "撤回成功!",
                  });
                  this.query();
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消撤回",
                });
              });
          } else {
            this.$message.error("请先勾选数据");
          }
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmgwlx": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmsplcm": //审批结果
            this.dmsplcm = res.data;
            break;
        }
      });
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
    },
    query() {
      var data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.spcHs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 7px;
}
.jbxx {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
}
.yiny {
  border: 1px solid grey;
  background: rgba(0, 0, 0, 0.0001);
  box-shadow: inset 0px -1px 0px #e0e0e0;
  height: 50px;
  border-left: none;
  border-collapse: collapse;
}
.hs {
  flex: 0 0 100px;
  background: #ccc;
  padding-left: 20px;
  padding-top: 14px;
}
.bs {
  padding-left: 20px;
  display: inline-block;
  position: relative;
  top: 80%;
  transform: translateY(-50%);
}

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
        .copyIcon {
          margin-top: 10px;
          background: url("~@/assets/images/copy.png") no-repeat;
        }
      }
    }
  }
}
</style>
