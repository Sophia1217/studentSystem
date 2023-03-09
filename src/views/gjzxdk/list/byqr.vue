<template>
  <div class="talkRec">
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">毕业确认</span>
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
          <el-table-column
            prop="dkzje"
            label="贷款总金额（元）"
            min-width="100"
          >
          </el-table-column>
          <el-table-column prop="dkqx" label="贷款期限（月）"> </el-table-column
          ><el-table-column prop="dkkssj" label="贷款开始时间">
          </el-table-column>
          <el-table-column prop="statusChinese" label="状态" sortable="custom">
            <!-- <template slot-scope="scope">
              <el-select
                v-model="scope.row.status"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in dmgbyqrztm"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </template> -->
          </el-table-column>
          <el-table-column prop="status" label="操作" sortable="custom">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="queren(scope.row)"
                v-if="scope.row.status == '05'"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">确认</span>
              </el-button>
              <span v-else> 已确认</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
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
          <span>确认：</span>
          <el-select
            v-model="status"
            collapse-tags
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in dmgbyqrztm"
              :key="item.dm"
              :label="item.mc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </div>
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
import { xsqrList, xsqr } from "@/api/gzzxdk/gjzxdk";
import { delwj } from "@/api/assistantWork/classEvent";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  data() {
    return {
      fileList: [],
      fileListAdd: [],
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
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过10M");
      } else if (file.status == "ready") {
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    handleCancelB() {
      this.fileListAdd = []; //关闭之后把新增的文件清空，免得反复累加
      this.status = "";
      this.qrExport = false;
    },
    // 导出确认
    handleConfirmB() {
      if (this.status != "") {
        let formData = new FormData();
        formData.append("status", this.status);
        formData.append("id", this.id);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        xsqr(formData)
          .then((res) => {
            this.$message.success("确认成功");
            this.qrExport = false;
            this.handleSearch();
          })
          .catch((err) => {});
      } else {
        this.$message.error("请先选择确认类型");
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
      xsqrList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
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
  background: url("~@/assets/images/details.png");
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
            color: #fff;
            // vertical-align: middle;
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

          .blueIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/images/passWhite.png") no-repeat;
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
