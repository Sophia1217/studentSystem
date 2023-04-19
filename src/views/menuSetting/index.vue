<template>
  <div>
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="菜单编号" value="modId"></el-option>
            <el-option label="英文名称" value="modName"></el-option>
            <el-option label="中文名称下拉" value="modTitle"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="query"
            >查询</el-button
          >
        </el-input>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">菜单列表</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="showChao">
            <i class="icon tjIcon"></i><span class="title2">配置超管角色</span>
          </div>
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
          <el-table-column prop="modId" label="菜单编号" sortable="custom" />
          <el-table-column prop="modName" label="英文名称" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="modTitle"
            label="中文名称"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="modIcon" label="图标代码" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="modUrl"
            label="URL"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="modComponent"
            label="前端代码路径"
            min-width="130px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="modPid"
            label="父页面编号"
            width="80px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="isChild"
            label="是否为叶子节点"
            width="90px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="页面顺序"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="modStatus"
            label="是否要显示在侧边栏"
            width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="licensedToAdmin"
            label="已配置超管角色"
            width="90px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="modTime"
            label="创建时间"
            width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="140"
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
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除菜单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="确认" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认配置超管角色？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="chao"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="addModal"
      width="50%"
      @close="addCance"
      :close-on-click-modal="false"
    >
      <div class="tableStyle">
        <el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item label="菜单编号" prop="modId" :rules="rules.common">
            <el-input
              v-model="formAdd.modId"
              placeholder="教师端一级标题编号示例01、02，二级示例0101、0102"
            />
          </el-form-item>
          <el-form-item label="英文名称" prop="modName" :rules="rules.common">
            <el-input v-model="formAdd.modName" />
          </el-form-item>
          <el-form-item label="中文名称" prop="modTitle" :rules="rules.common">
            <el-input v-model="formAdd.modTitle" />
          </el-form-item>
          <el-form-item label="图标代码" prop="modIcon">
            <el-input v-model="formAdd.modIcon" />
          </el-form-item>
          <el-form-item label="URL" prop="modUrl" :rules="rules.common">
            <el-input
              v-model="formAdd.modUrl"
              placeholder="教师端编号为2位的url前面需要加“/”，其他教师端页面前不需要“/”；学生端页面前面都需要加“/”"
            />
          </el-form-item>
          <el-form-item
            label="前端代码路径"
            prop="modComponent"
            :rules="rules.common"
          >
            <el-input
              v-model="formAdd.modComponent"
              placeholder="教师端编号为2位的统一为“Layout”，其他页面根据实际内容填写"
            />
          </el-form-item>
          <el-form-item label="父页面编号" prop="modPid" :rules="rules.common">
            <el-input v-model="formAdd.modPid" />
          </el-form-item>
          <el-form-item
            label="是否为叶子节点"
            prop="isChild"
            :rules="rules.common"
          >
            <el-input
              v-model="formAdd.isChild"
              placeholder="1为父节点，2为叶子节点"
            />
          </el-form-item>
          <el-form-item label="页面顺序" prop="sortId" :rules="rules.common">
            <el-input
              v-model="formAdd.sortId"
              placeholder="当前页面的显示顺序，推荐取mod_id后两位"
            />
          </el-form-item>
          <el-form-item
            label="是否要显示在侧边栏"
            prop="modStatus"
            :rules="rules.common"
          >
            <el-input
              v-model="formAdd.modStatus"
              placeholder="0为显示，1为不显示"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="editModal"
      width="50%"
      @close="editCance"
      :close-on-click-modal="false"
    >
      <div class="tableStyle">
        <el-form
          ref="formEdit"
          :model="formEdit"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item label="菜单编号" prop="modId" :rules="rules.common">
            <el-input
              v-model="formEdit.modId"
              disabled
              placeholder="教师端一级标题编号示例01、02，二级示例0101、0102"
            />
          </el-form-item>
          <el-form-item label="英文名称" prop="modName" :rules="rules.common">
            <el-input v-model="formEdit.modName" />
          </el-form-item>
          <el-form-item label="中文名称" prop="modTitle" :rules="rules.common">
            <el-input v-model="formEdit.modTitle" />
          </el-form-item>
          <el-form-item label="图标代码" prop="modIcon">
            <el-input v-model="formEdit.modIcon" />
          </el-form-item>
          <el-form-item label="URL" prop="modUrl" :rules="rules.common">
            <el-input
              v-model="formEdit.modUrl"
              placeholder="教师端编号为2位的url前面需要加“/”，其他教师端页面前不需要“/”；学生端页面前面都需要加“/”"
            />
          </el-form-item>
          <el-form-item
            label="前端代码路径"
            prop="modComponent"
            :rules="rules.common"
          >
            <el-input
              v-model="formEdit.modComponent"
              placeholder="教师端编号为2位的统一为“Layout”，其他页面根据实际内容填写"
            />
          </el-form-item>
          <el-form-item label="父页面编号" prop="modPid" :rules="rules.common">
            <el-input v-model="formEdit.modPid" />
          </el-form-item>
          <el-form-item
            label="是否为叶子节点"
            prop="isChild"
            :rules="rules.common"
          >
            <el-input
              v-model="formEdit.isChild"
              placeholder="1为父节点，2为叶子节点"
            />
          </el-form-item>
          <el-form-item label="页面顺序" prop="sortId" :rules="rules.common">
            <el-input
              v-model="formEdit.sortId"
              placeholder="当前页面的显示顺序，推荐取mod_id后两位"
            />
          </el-form-item>
          <el-form-item
            label="是否要显示在侧边栏"
            prop="modStatus"
            :rules="rules.common"
          >
            <el-input
              v-model="formEdit.modStatus"
              placeholder="0为显示，1为不显示"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCance">取 消</el-button>
        <el-button type="primary" class="confirm" @click="editClick"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryMenuList,
  configAdmin,
  deleteMenu,
  insertMenu,
  updateMenu,
  queryFirstLevel,
} from "@/api/menuSetting/list";
export default {
  data() {
    return {
      submitModal: false,
      delModal: false,
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      delArr: [],
      val: [],
      searchVal: "",
      select: "",
      moreIform: {
        statusList: [],
      },
      addModal: false,
      editModal: false,
      formAdd: {
        modId: "",
        modName: "",
        modTitle: "",
        modIcon: "",
        modUrl: "",
        modComponent: "",
        modPid: "",
        isChild: "",
        sortId: "",
        modStatus: "",
      },
      formEdit: { id: "" },
      multipleSelection: [],
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
  mounted() {
    this.query();
  },

  methods: {
    query() {
      var data = {
        modId: this.select == "modId" ? this.searchVal : null,
        modName: this.select == "modName" ? this.searchVal : null,
        modTitle: this.select == "modTitle" ? this.searchVal : null,
        // statusList: this.moreIform.statusList,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryMenuList(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    showDetail(row) {
      this.formEdit = row;
      this.editModal = true;
    },
    showChao() {
      if (this.delArr && this.delArr.length > 0) {
        this.submitModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    chao() {
      var data = this.val;
      configAdmin(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("配置超管角色成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("配置超管角色失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
    },
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
    changeSelect() {
      this.searchVal = "";
    },
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    del() {
      deleteMenu(this.delArr ).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("删除成功");
      });
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
      this.multipleSelection = val;
      this.val = val;
      this.delArr = val.map((item) => item.id);
    },
    xinzeng() {
      this.formAdd = {};
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          modId: this.formAdd.modId,
          modName: this.formAdd.modName,
          modTitle: this.formAdd.modTitle,
          modIcon: this.formAdd.modIcon,
          modUrl: this.formAdd.modUrl,
          modComponent: this.formAdd.modComponent,
          modPid: this.formAdd.modPid,
          isChild: this.formAdd.isChild,
          sortId: this.formAdd.sortId,
          modStatus: this.formAdd.modStatus,
        };
        insertMenu(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
            this.addModal = false;
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    editCance() {
      this.editModal = false;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          id:this.formEdit.id,
          modId: this.formEdit.modId,
          modName: this.formEdit.modName,
          modTitle: this.formEdit.modTitle,
          modIcon: this.formEdit.modIcon,
          modUrl: this.formEdit.modUrl,
          modComponent: this.formEdit.modComponent,
          modPid: this.formEdit.modPid,
          isChild: this.formEdit.isChild,
          sortId: this.formEdit.sortId,
          modStatus: this.formEdit.modStatus,
        };
        updateMenu(data).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.query();
            this.editModal = false;
          } else {
            this.$message.error("编辑失败");
          }
        });
      }
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
.searchWrap {
  background: #fff;
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
    .more {
      flex: 0 0 100px;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #005657;
      cursor: pointer;
      .moreIcon {
        display: block;
        width: 20px;
        height: 20px;
      }
      .chevronDown {
        background: url("~@/assets/images/chevronDown.png") no-repeat;
      }
      .chevronUp {
        background: url("~@/assets/images/chevronUp.png") no-repeat;
      }
    }
  }
  .moreSelect {
    margin-top: 20px;
    padding: 20px;
    background: #fafafa;
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
      flex-direction: row;
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
      }
    }
  }
}
.headline {
  padding: 15px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 20px;
  color: #1f1f1f;
  line-height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tableStyle {
  padding: 0 20px;
  .rowStyle {
    padding: 0 !important;
    margin: 0;
    border-bottom: 1px solid #cccccc;
  }
  .wrap {
    display: flex;
    align-items: center;
    .title {
      flex: 0 0 160px;
      line-height: 48px;
      background: #e0e0e0;
      text-align: right;
      padding-right: 5px;
      margin: 0 !important;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 22px;
      margin-left: 16px;
      ::v-deep .el-input {
        width: 200px;
      }
    }
  }
}
</style>