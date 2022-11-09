<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">校内外培训经历</span> <i class="Updataicon"></i>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="del">
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
          <el-table-column prop="pxxmmc" label="培训项目名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwh" label="组织单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxkssj" label="培训开始时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxjssj" label="培训结束时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="zxs" label="总学时" sortable="custom">
          </el-table-column>
          <el-table-column prop="xz" label="性质" sortable="custom">
          </el-table-column>
          <el-table-column prop="pxdwlb" label="培训单位类别" sortable="custom">
          </el-table-column>
          <el-table-column prop="jg" label="结果" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="fileList"
            label="结业证书"
            sortable="custom"
            align="center"
            width="300"
          >
            <template slot-scope="scope">
              <div v-for="item in scope.row.fileList">
                <div style="display: flex; justify-content: space-between">
                  <a>
                    {{ item.fileName }}
                  </a>
                  <el-button>预览</el-button>
                </div>
              </div>
            </template>
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

              <el-button type="text" size="small" @click="lct(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="新增" :visible.sync="addModal" width="80%">
        <el-table :data="addData">
          <el-table-column label="培训项目名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pxxmmc" />
            </template>
          </el-table-column>
          <el-table-column label="组织单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dwh" />
            </template>
          </el-table-column>
          <el-table-column label="培训开始时间" width="240px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.pxkssj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="培训结束时间" width="240px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.pxjssj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="总学时" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.zxs" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="性质" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xz" />
            </template>
          </el-table-column>
          <el-table-column label="培训单位类别" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pxdwlb" />
            </template>
          </el-table-column>
          <el-table-column label="结果" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jg" />
            </template>
          </el-table-column>
          <el-table-column label="结业证书" width="360px">
            <template slot-scope="scope">
              <el-upload
                action="#"
                multiple
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="scope.row.files"
                :on-change="fileChange"
                accept=".pdf,.jpg"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="编辑" :visible.sync="editModal" width="80%">
        <el-table :data="editData">
          <el-table-column label="培训项目名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pxxmmc" />
            </template>
          </el-table-column>
          <el-table-column label="组织单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dwh" />
            </template>
          </el-table-column>
          <el-table-column label="培训开始时间" align="center">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.pxkssj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="培训结束时间" align="center">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.pxjssj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="总学时" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.zxs" type="number" />
            </template>
          </el-table-column>
          <el-table-column label="性质" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xz" />
            </template>
          </el-table-column>
          <el-table-column label="培训单位类别" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pxdwlb" />
            </template>
          </el-table-column>
          <el-table-column label="结果" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jg" />
            </template>
          </el-table-column>
          <el-table-column label="结业证书" width="450">
            <template slot-scope="scope">
              <el-upload
                action="#"
                multiple
                class="el-upload"
                accept=".pdf,.jpg"
                :auto-upload="false"
                ref="upload"
                :file-list="scope.row.fileList"
                :on-change="fileChange"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog title="流程图" :visible.sync="lctModal" width="40%">
        <div>
          <el-image :src="url"
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div></el-image
          >
          <el-table :data="tableLct">
            <el-table-column prop="userId" label="操作人" sortable="custom">
            </el-table-column>
            <el-table-column prop="opTime" label="操作时间" sortable="custom">
            </el-table-column>
            <el-table-column prop="opType" label="操作类型" sortable="custom">
            </el-table-column>
            <el-table-column prop="msg" label="审核意见" sortable="custom">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
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
  </div>
</template>
<script>
import {
  edit,
  del,
  query,
  lct,
  lctTable,
} from "@/api/stuDangan/detailList/xiaoneiwai";
import { delwj } from "@/api/assistantWork/classEvent";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  data() {
    return {
      tableLct: [],
      lctModal: false,
      addModal: false,
      editModal: false,
      addData: [],
      editData: [],
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      fileList: [],
      delArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      url: "",
      tableLct:[],
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //性别
  },

  methods: {
    lct(row) {
      this.tableLct = [];
      this.url = "";
      var processInstanceId = row.processid;
      lct({ processInstanceId }).then((res) => {
        this.url = window.URL.createObjectURL(res);
      });
      lctTable({ processInstanceId }).then((res) => {
        console.log("res", res);
        this.tableLct = res.data;
      });
      this.lctModal = true;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        this.ztStatus = res.data;
      });
    },
    del() {
  
        if (this.delArr && this.delArr.length > 0) {
          del({ ids: this.delArr }).then((res) => {
            this.$message.success("删除成功");
            this.query();
          });
        } else {
          this.$message.error("请先勾选数据");
        }

    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
    },
    handlePreview() {
      console.log("yulan");
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      if (this.fileListAdd) {
        this.fileListAdd.splice(idx, 0);
      }
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
    bianji(row) {
      this.editData = [];
      // row.fileList = row.fileList.map((ele) => {
      //   return {
      //     name: ele.fileName,
      //     ...ele,
      //   };
      // });
      this.editData.push(row);
      this.editModal = true;
    },
    editCance() {
      this.editModal = false;
    },
    editClick() {
      var data = this.editData[0];
      let formData = new FormData();
      formData.append("pxxmmc", data.pxxmmc);
      formData.append("dwh", data.dwh);
      formData.append("pxkssj", data.pxkssj);
      formData.append("pxjssj", data.pxjssj);
      formData.append("zxs", data.zxs);
      formData.append("xz", data.xz);
      formData.append("pxdwlb", data.pxdwlb);
      formData.append("jg", data.jg);
      formData.append("id", data.id);
      formData.append("xh", this.$route.query.xh,);
      if (this.fileListAdd.length > 0) {
        this.fileListAdd.map((file) => {
          formData.append("files", file.raw);
        });
      }
      edit(formData).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("编辑成功");
          this.query();
        } else {
          this.$message.error("编辑失败");
        }
      });
      this.editModal = false;
    },
    addClick() {
      var data = this.addData[0];
      let formData = new FormData();
      formData.append("pxxmmc", data.pxxmmc);
      formData.append("dwh", data.dwh);
      formData.append("pxkssj", data.pxkssj);
      formData.append("pxjssj", data.pxjssj);
      formData.append("zxs", data.zxs);
      formData.append("xz", data.xz);
      formData.append("pxdwlb", data.pxdwlb);
      formData.append("jg", data.jg);
      formData.append("xh", this.$route.query.xh,);
      if (this.fileList.length > 0) {
        this.fileList.map((file) => {
          formData.append("files", file.raw);
        });
      }
      edit(formData).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("新增成功");
          this.query();
        } else {
          this.$message.error("新增失败");
        }
      });
      this.addModal = false;
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
      this.addData = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        pxxmmc: "",
        dwh: "",
        pxkssj: "",
        pxjssj: "",
        zxs: "",
        xz: "",
        pxdwlb: "",
        jg: "",
        files: [],
      };
      this.addData.push(newLine);
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
    },
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
