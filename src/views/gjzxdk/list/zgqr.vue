<template>
  <div class="talkRec">
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">在岗确认</span>
        </div>
      </div>

      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>

          <el-table-column prop="xh" label="学号" width="100">
          </el-table-column>

          <el-table-column prop="xm" label="姓名" width="85"> </el-table-column>

          <el-table-column prop="ssdwdmmc" label="培养单位"> </el-table-column>

          <el-table-column prop="bjdmmc" label="班级"> </el-table-column>

          <el-table-column prop="pyccmc" label="培养层次" min-width="100">
          </el-table-column>

          <el-table-column prop="nd" label="年度"> </el-table-column>

          <el-table-column prop="qrzt" label="确认状态"> </el-table-column>

          <el-table-column
            prop="fileList"
            label="附件"
            align="center"
            width="300"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-upload
                :on-preview="handlePreview"
                action="#"
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :disabled="true"
                :file-list="scope.row.fileList"
              >
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作" sortable="custom">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="queren(scope.row)"
                v-if="scope.row.qrzt == '待确认'"
              >
                <i class="scopeIncon handledie"></i>

                <span class="handleName">确认</span>
              </el-button>

              <span v-else> 已确认</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="确认"
      :visible.sync="qrExport"
      width="30%"
      @close="handleCancelB"
      :close-on-click-modal="false"
    >
      <template>
        <div class="innerCommon">
          <span>附件:</span>

          <el-upload
            style="margin-left: 10px"
            action="#"
            multiple
            class="el-upload"
            :auto-upload="false"
            ref="upload"
            :file-list="fileList"
            :on-change="fileChange"
            :before-remove="beforeRemove"
          >
            <el-button size="small" type="primary">附件上传</el-button>
          </el-upload>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelB">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirmB"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { stuZgqr, stuZgqrQr } from "@/api/jccy/index";
import { delwj, Exportwj } from "@/api/assistantWork/classEvent";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  data() {
    return {
      fileList: [],
      status: "",
      qrExport: false,
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
      id: "",
      dmgbyqrztm: [],
      multipleSelection: [],
    };
  },

  mounted() {
    this.getCode("dmgbyqrztm"); //
    this.handleSearch();
  },

  methods: {
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileList.push(file);
      }
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = this.fileList.findIndex((item) => item.uid === uid);
      this.fileList.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    handleCancelB() {
      this.fileList = []; //关闭之后把新增的文件清空，免得反复累加
      this.qrExport = false;
    },
    handleConfirmB() {
      if (this.fileList.length > 0) {
        let formData = new FormData();
        formData.append("id", this.id);
        formData.append("qrrgh", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        stuZgqrQr(formData)
          .then((res) => {
            this.$message.success("确认成功");
            this.qrExport = false;
            this.handleSearch();
          })
          .catch((err) => {});
      } else {
        this.$message.error("请先上传附件");
      }
    },
    queren(row) {
      if (row.fileList && row.fileList.length > 0) {
        this.fileList = row.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      }
      this.id = row.id;
      this.qrExport = true;
    },
    // 查询
    handleSearch() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      stuZgqr(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
          for (var i = 0; i < this.tableData.length; i++) {
            if (
              this.tableData[i].fileList &&
              this.tableData[i].fileList.length > 0
            ) {
              for (var j = 0; j < this.tableData[i].fileList.length; j++) {
                this.tableData[i].fileList[j].name =
                  this.tableData[i].fileList[j].fileName;
              }
            }
          }
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmgbyqrztm":
              this.dmgbyqrztm = res.data.filter((item) => {
                return item.dm !== "05";
              });
              break;
          }
        })
        .catch((err) => {});
    },
    // 多选
    handleSelectionChange(val) {
      this.delArr = val.map((item) => item.id);
      this.multipleSelection = val;
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.innerCommon {
  margin-top: 10px;
  margin-left: 80px;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}

.handledie {
  background: url("~@/assets/images/edit.png");
}

.talkRec {
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
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
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .lightIcon {
          margin-top: 9px;
          background: url("~@/assets/assistantPng/delete.png") no-repeat;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #005657;
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff; // vertical-align: middle;
          }
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
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
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/chehui.png") no-repeat;
          }
        }
      }
    }
  }
}
</style>
