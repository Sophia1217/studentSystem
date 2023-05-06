<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">课程安排</span>
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
            prop="kczt"
            label="课程主题"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="kkrq"
            label="起止时间"
            sortable="custom"
            :show-overflow-tooltip="true"
            :min-width="150"
          >
          </el-table-column>
          <el-table-column prop="kksj" label="开课时间"> </el-table-column>
          <el-table-column prop="kkcs" label="次数"> </el-table-column>
          <el-table-column prop="kjnrs" label="可接纳人数"> </el-table-column>
          <el-table-column prop="ykrs" label="约课人员">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="thmodal(scope.row, 1)"
              >
                <span>{{ scope.row.tkrs }}</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="tkrs" label="退课人员">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="thmodal(scope.row, 2)"
              >
                <span>{{ scope.row.tkrs }}</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="kkdd" label="开课地点"> </el-table-column>
          <el-table-column label="发起评价" sortable="custom">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                disabled
                v-if="scope.row.sfkspj == 1"
              >
                <span> 已评价 </span>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="pjCLI(scope.row)"
                v-else
              >
                <span> 评价 </span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="240"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="daka(scope.row)">
                <span style="margin-left: 5px">打卡</span>
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

    <el-dialog title="二维码" :visible.sync="ewmModal" width="20%">
      <el-image :src="url" v-if="url" lazy
        ><div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div></el-image
      >
    </el-dialog>
    <el-dialog title="退课" :visible.sync="delModal" width="20%">
      <span>确认退课？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="deletepbsq()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="评价" :visible.sync="pjModal" width="60%">
      <el-form :model="formPj" ref="formPj">
        <el-form-item label="评分" prop="score" :rules="rules.common">
          <el-radio-group v-model="formPj.score">
            <el-radio label="1" size="large">1分</el-radio>
            <el-radio label="2" size="large">2分</el-radio>
            <el-radio label="3" size="large">3分</el-radio>
            <el-radio label="4" size="large">4分</el-radio>
            <el-radio label="5" size="large">5分</el-radio>
            <el-radio label="6" size="large">6分</el-radio>
            <el-radio label="7" size="large">7分</el-radio>
            <el-radio label="8" size="large">8分</el-radio>
            <el-radio label="9" size="large">9分</el-radio>
            <el-radio label="10" size="large">10分</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item label="评价" prop="pfms" :rules="rules.common">
          <el-input
            type="textarea"
            :rows="5"
            maxlength="500"
            v-model="formPj.pfms"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="pingjia()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="tkryModal" width="60%">
      <el-table
        :data="tableDateTk"
        style="width: 100%"
        @sort-change="changeTableSort"
      >
        <el-table-column prop="xh" label="学号"> </el-table-column>
        <el-table-column prop="xm" label="姓名"> </el-table-column>
        <el-table-column prop="dwhmc" label="培养单位"> </el-table-column>
        <el-table-column prop="zydmmc" label="专业"> </el-table-column>
        <el-table-column prop="yksj" label="约课时间"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tkryModal = fasle">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apply, comment, reject } from "@/api/friendTutor/classSet";
import { kcapStuList, thInfo, getQrcode, upList } from "@/api/kcpk";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  data() {
    return {
      title: "",
      tableDateTk: [],
      url: "",
      ewmModal: false,
      tkryModal: false,
      dglxList: [],
      dgyhList: [],
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formPj: {},
      kcid: "",
      formEdit: {},
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      czlx: [],
      dmsfbzm: [],
      pjModal: false,
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
    this.getCode("dmsplcm"); //状态
  },

  methods: {
    pjCLI(row) {
      var data = {
        id: row.id,
        sfkspj: "1",
      };
      this.$confirm("是否开启评价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          upList(data).then((res) => {
            this.$message({
              type: "success",
              message: "开启评价成功!",
            });
            this.query();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消评价",
          });
        });
    },
    daka(row) {
      var data = {
        kcId: row.id,
        kcName: row.kczt,
      };
      getQrcode(data).then((res) => {
        console.log("Res", res);
        this.url = window.URL.createObjectURL(res);
        this.ewmModal = true;
      });
    },
    thmodal(row, index) {
      var data = {
        kcId: row.id,
        type: index,
      };
      thInfo(data).then((res) => {
        this.tableDateTk = res.data;
        this.title = index == 1 ? "约课人员" : "退课人员";
        this.tkryModal = true;
      });
    },
    tkrsTable() {},
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
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
        }
      });
    },

    chCancel() {
      this.pjModal = false;
    },
    pingjia() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单信息！");
      } else {
        let data = {
          kcId: this.kcid,
          score: this.formPj.score,
          pfms: this.formPj.pfms,
        };

        comment(data).then((res) => {
          this.$message.success("评价成功");
          this.query();
          this.pjModal = false;
        });
      }
    },
    chModal(row) {
      this.pjModal = true;
      this.kcid = row.id;
    },
    showDel() {
      if (this.delArr && this.delArr.length > 0) {
        this.delModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    deletepbsq() {
      reject(this.delArr).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("退课成功");
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
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
    },

    query() {
      kcapStuList({ xh: this.$store.getters.userId }).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formPj.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    showDetail(row) {
      this.$router.push({
        path: "/lessonDetail",
        query: {
          isEdit: 1,
          id: row.id,
          xh: row.xh,
        },
      });
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .grayBg .el-form-item__label {
  background-color: #f0f0f0;
  padding: 5px 10px 5px 0px;
}
.grayBg {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}
.sqList {
  padding: 5px 0px 5px 10px;
  width: 85%;
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
</style>
