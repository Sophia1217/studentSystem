<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">社会实践</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns borderGreen" @click="xinzeng">
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
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xmmc" label="项目名称" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="zzdw" label="组织单位或个人" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="dj" label="等级" sortable="custom">
          </el-table-column>
          <el-table-column prop="lxchinese" label="类型" sortable="custom">
          </el-table-column>
          <el-table-column prop="sjdd" label="实践地点" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="kssj" label="开始时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="jssj" label="结束时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="gzgw" label="工作岗位或内容描述" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="zmr" label="证明人" sortable="custom" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="lxfs" label="证明人联系方式" sortable="custom" :show-overflow-tooltip="true">
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
              >
                <i class="scopeIncon Edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增" :visible.sync="addModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formAdd" :model="formAdd" :rules="rules">
          <el-table :data="formAdd.addData">
            <el-table-column label="项目名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.xmmc'"
                  :rules="rules.xmmc"
                >
                  <el-input maxlength="200" v-model="scope.row.xmmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位或个人" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.zzdw'"
                  :rules="rules.zzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.zzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in djOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.lx'"
                  :rules="rules.lx"
                >
                  <el-select
                    v-model="scope.row.lx"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in lxOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="实践地点" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.sjdd'"
                  :rules="rules.sjdd"
                >
                  <el-input maxlength="200" v-model="scope.row.sjdd" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.kssj'"
                  :rules="rules.kssj"
                >
                  <el-date-picker
                    v-model="scope.row.kssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(1)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.jssj'"
                  :rules="rules.jssj"
                >
                  <el-date-picker
                    v-model="scope.row.jssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(2)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column label="工作岗位或内容描述" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.gzgw'"
                  :rules="rules.gzgw"
                >
                  <el-input 
                    v-model="scope.row.gzgw" 
                    type="text"
                    maxlength="500"
                  />
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column label="证明人" width="120px" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.zmr'"
                  :rules="rules.zmr"
                >
                  <el-input maxlength="200" v-model="scope.row.zmr" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证明人联系方式" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'addData.' + scope.$index + '.lxfs'"
                  :rules="rules.lxfs"
                >
                  <el-input maxlength="11" v-model="scope.row.lxfs" />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item prop="gzgw" :rules="rules.gzgw" label="工作岗位或内容描述：">
            <el-input 
              v-model="formAdd.gzgw" 
              type="text"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editModal" width="80%" :close-on-click-modal="false">
        <el-form ref="formEdit" :model="formEdit" :rules="rules">
          <el-table :data="formEdit.editData">
            <el-table-column label="项目名称" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.xmmc'"
                  :rules="rules.xmmc"
                >
                  <el-input maxlength="200" v-model="scope.row.xmmc" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="组织单位或个人" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.zzdw'"
                  :rules="rules.zzdw"
                >
                  <el-input maxlength="200" v-model="scope.row.zzdw" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="等级" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.djm'"
                  :rules="rules.djm"
                >
                  <el-select
                    v-model="scope.row.djm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in djOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.lx'"
                  :rules="rules.lx"
                >
                  <el-select
                    v-model="scope.row.lx"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in lxOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="实践地点" width="150px" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.sjdd'"
                  :rules="rules.sjdd"
                >
                  <el-input maxlength="200" v-model="scope.row.sjdd" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.kssj'"
                  :rules="rules.kssj"
                >
                  <el-date-picker
                    v-model="scope.row.kssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(3)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.jssj'"
                  :rules="rules.jssj"
                >
                  <el-date-picker
                    v-model="scope.row.jssj"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="changeDate(4)"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column label="工作岗位或内容描述" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.gzgw'"
                  :rules="rules.gzgw"
                >
                  <el-input 
                    v-model="scope.row.gzgw" 
                    type="text"
                    maxlength="500"
                  />
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column label="证明人" width="120px" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.zmr'"
                  :rules="rules.zmr"
                >
                  <el-input maxlength="200" v-model="scope.row.zmr" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证明人联系方式" align="center" :render-header="addRedStar">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'editData.' + scope.$index + '.lxfs'"
                  :rules="rules.lxfs"
                >
                  <el-input maxlength="11" v-model="scope.row.lxfs" />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item prop="gzgw" :rules="rules.gzgw" label="工作岗位或内容描述：">
            <el-input 
              v-model="formEdit.gzgw" 
              type="text"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import { edit, del, query } from "@/api/stuDangan/detailList/shsj";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom },
  data() {
    return {
      lctModal: false,
      delModal: false,
      ztStatus: [],
      lxOps: [],
      djOps: [],
      addModal: false,
      editModal: false,
      formAdd: { addData: [], gzgw:"" },
      formEdit: { editData: [], gzgw:""},
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      delArr: [],
      subArr: [],
      val: [],
      rules: {
        xmmc: [
          {
            required: true,
            message: "项目名称不能为空",
            trigger: "blur",
          },
        ],
        zzdw: [
          { required: true, message: "组织单位或个人不能为空", trigger: "change" },
        ],
        djm: [{ required: true, message: "等级不能为空", trigger: "change" }],
        lx: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        sjdd: [
          { required: true, message: "时间地点不能为空", trigger: "change" },
        ],
        zmr: [{ required: true, message: "证明人不能为空", trigger: "blur" }],
        gzgw: [{ required: true, message: "工作岗位不能为空", trigger: "blur" }],
        kssj: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "blur",
          },
        ],
        jssj: [
          {
            required: true,
            message: "结束时间不能为空",

            trigger: "blur",
          },
        ],
        lxfs: [
          { required: true, message: "证明人联系方式不能为空", trigger: "blur" },
        ],
        shzt: [
          { required: true, message: "审核状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //性别
    this.getCode("dmshsjlxm"); //类型
    this.getCode("dmshsjdjm"); //等级
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
    handleCloseLct() {
      this.lctModal = false;
    },
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
          case "dmshsjlxm":
            this.lxOps = res.data; //类型
            break;
          case "dmshsjdjm":
            this.djOps = res.data; //等级
            break;
        }
      });
    },
    del() {
      del({ ids: this.delArr }).then((res) => {
        this.$message.success("删除成功");
        this.query();
        this.delModal = false;
      });
    },
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
    },
    delCancel() {
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.subArr = val.map((item) => item.id);
    },
    bianji(row) {
      this.formEdit.editData = [];
      this.formEdit.editData.push(row);
      this.formEdit.gzgw = row.gzgw;
      this.editModal = true;
    },
    editCance() {
      this.editModal = false;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        this.formEdit.editData[0].gzgw = this.formEdit.gzgw;
        let data = this.formEdit.editData[0];
        edit(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.query();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd.addData[0];
        var params = {
          xmmc: data.xmmc,
          zzdw: data.zzdw,
          djm: data.djm,
          lx: data.lx,
          sjdd: data.sjdd,
          kssj: data.kssj,
          jssj: data.jssj,
          zmr: data.zmr,
          lxfs: data.lxfs,
          gzgw: this.formAdd.gzgw,
          xh: this.$route.query.xh,
        };
        edit(params).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    query() {
      var data = {
        xh: this.$route.query.xh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      query(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd.addData = []; // 每次打开弹框先将弹框的table数组置空
      this.formAdd.gzgw = "";
      var newLine = {
        xmmc: "",
        zzdw: "",
        djm: "",
        lx: "",
        kssj: "",
        sjdd: "",
        jssj: "",
        zmr: "",
        lxfs: "",
      };
      this.formAdd.addData.push(newLine);
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
    // 判断 开始时间 结束时间
    changeDate(flag) {
      let addParams = this.formAdd.addData[0];
      let editParams = this.formEdit.editData[0];
      if (flag==1) {//新增开始时间
        if (addParams.jssj) {
          if (addParams.kssj > addParams.jssj) {
            addParams.kssj = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else if (flag==2) {//新增结束时间
        if (addParams.kssj) {
          if (addParams.kssj > addParams.jssj) {
            addParams.jssj = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      } else if (flag==3) {
        if (editParams.jssj) {
          if (editParams.kssj > editParams.jssj) {
            editParams.kssj = null;
            this.$message.error("开始时间不能大于结束时间！");
          }
        }
      } else {
        if (editParams.kssj) {
          if (editParams.kssj > editParams.jssj) {
            editParams.jssj = null;
            this.$message.error("结束时间不能小于开始时间！");
          }
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
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
      }
    }
  }
}
</style>
