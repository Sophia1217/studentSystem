<template>
  <div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">学生处分</span>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="jzjy()">
            <i class="icon tjIcon"></i><span class="title2">矫正教育</span>
          </div>
          <!-- <div class="btns borderLight" @click="showDel">
            <i class="icon lightIcon"></i><span class="title">解除</span>
          </div>

          <div class="btns borderLight" @click="chModal">
            <i class="icon chIcon"></i><span class="title2">申诉</span>
          </div> -->
          <div class="btns borderLight" @click="tjModal">
            <i class="icon tjIcon"></i><span class="title2">确认</span>
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
          <el-table-column
            prop="wjssmsXgbfzr"
            label="违纪事实描述"
            
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="cfdjmmc"
            label="处分等级"
            
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="cfqxStart"
            label="处分开始时间"
            
          >
          </el-table-column>
          <el-table-column
            prop="cfqxEnd"
            label="处分结束时间"
            
          >
          </el-table-column>
          <el-table-column prop="jzjyztmc" label="矫正教育" >
          </el-table-column>

          <el-table-column prop="cfztmmc" label="处分状态" >
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
    </div>
    <!-- <el-dialog title="解除" :visible.sync="delModal" width="20%">
      <span>确认解除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
    <el-dialog title="矫正教育" :visible.sync="jzjyModal" width="20%">
      <span>确认修改状态？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jzjyCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="jzjyxg()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="确认" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确定确认？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="detailModal"
      :before-close="detailCancel"
      width="50%"
    >
      <template>
        <div class="baseInfo">
          <el-form :model="formDetails">
            <!-- <div class="formLeft"><span class="title">基本信息</span></div> -->
            <div class="backDetail">
              <div class="formRight">
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">学号</div>
                      <div class="content">{{ basicInfo.xh }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">姓名</div>
                      <div class="content">{{ basicInfo.xm }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">性别</div>
                      <div class="content">{{ basicInfo.xbmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养层次</div>
                      <div class="content">{{ basicInfo.pyccmmc }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">培养单位</div>
                      <div class="content">{{ basicInfo.ssdwdmmc }}</div>
                    </div>
                  </el-col>

                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">年级</div>
                      <div class="content">{{ basicInfo.ssnj }}</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">专业</div>
                      <div class="content">{{ basicInfo.zydmmc }}</div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="rowStyle">
                    <div class="wrap">
                      <div class="title">班级</div>
                      <div class="content">{{ basicInfo.bjmc }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="formLeft"><span class="title">学院意见</span></div>
            <div>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item label="违纪事实描述" label-width="120px">
                    {{ formDetails.wjssmsXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="处分依据条款" label-width="120px">
                    {{ formDetails.cfyjtkXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="处分等级" label-width="120px">
                    {{ formDetails.cfdjmmc }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item label="单位建议" label-width="120px">
                    {{ formDetails.dwjyXgbfzr }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-table
                :data="tableDataDetail"
                ref="multipleTable"
                style="width: 100%"
              >
                <el-table-column prop="cfrq" label="处分日期">
                </el-table-column>
                <el-table-column prop="cfqxStart" label="处分开始日期">
                </el-table-column>
                <el-table-column prop="cfqxEnd" label="处分结束日期">
                </el-table-column>
                <el-table-column
                  prop="cfwh"
                  label="处分文号"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <!-- <el-table-column prop="fjName" label="附件" width="140">
                    <template slot-scope="scope">
                      <div class="moban">
                        <div class="content">
                          <el-button
                            type="text"
                            size="small"
                            @click="xzWj(scope.row, 1)"
                          >
                            <span class="handleName">{{
                              scope.row.fjName
                            }}</span>
                          </el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column> -->
              </el-table>
            </div>
          </el-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer footerFlex">
        <el-button @click="detailCancel">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { wjcfDetail } from "@/api/stuPunish/nichufen";
import { queryXscfList, updateJzztm, updateQrztm } from "@/api/stuPunish/stu";
export default {
  data() {
    return {
      AUTHFLAG: false,
      len: 0,
      jzjyModal: false,
      submitModal: false,
      detailModal: false,
      delModal: false,

      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      tableDataDetail: [],
      delArr: [],
      tjArr: [],
      ztStatus: [],
      val: [],
      formDetails: {},
      basicInfo: {},
      xnOptions: [],
      fzform: {
        fzxn: "",
        gwTime: [],
      },

      xh: this.$store.getters.userId,
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;

    this.query();
  },

  methods: {
    tjModal() {
      if (this.tjArr && this.tjArr.length > 0) {
        this.submitModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    tj() {
      updateQrztm({ ids: this.tjArr }).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("确认成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("确认失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
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
    jzjyCancel() {
      this.jzjyModal = false;
    },
    jzjyxg() {
      updateJzztm({ ids: this.delArr }).then((res) => {
        this.$message.success("修改成功");
        this.query();
        this.jzjyModal = false;
      });
    },
    jzjy() {
      if (this.delArr && this.delArr.length > 0) {
        this.jzjyModal = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    showDetail(row) {
      this.tableDataDetail[0] = row;
      queryKnssqxsjbxx({ xh: this.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      wjcfDetail({ id: row.id }).then((res) => {
        this.formDetails = res.data;
        this.detailModal = true;
      });
    },
    detailCancel() {
      this.detailModal = false;
    },
    // showDel() {
    //   var falg = 1;
    //   for (var i = 0; i < this.val.length; i++) {
    //     if (this.val[i].status !== "01") falg = 2;
    //   }
    //   if (falg == 1) {
    //     if (this.delArr && this.delArr.length > 0) {
    //       this.delModal = true;
    //     } else {
    //       this.$message.error("请先勾选数据");
    //     }
    //   } else {
    //     this.$message.error("存在非草稿状态数据，不可以删除");
    //   }
    // },
    // del() {
    //   deleteQgzxXssq({ idList: this.delArr }).then((res) => {
    //     this.query();
    //     this.delModal = false;
    //     this.$message.success("删除成功");
    //   });
    // },
    // delCancel() {
    //   this.delModal = false;
    // },
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
      queryXscfList().then((res) => {
        this.tableDate = res.data;
      });
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
.baseInfo {
  // padding: 20px;
  margin-left: 30px;
  margin-right: 30px;

  // overflow-x: auto;
  .formLeft {
    background: #fff;
    // display: flex;
    align-items: flex-start;

    .title {
      font-weight: 600;
      font-size: 16px;
      color: #1f1f1f;
      line-height: 20px;
    }
  }
}

.backDetail {
  display: flex;
  margin-bottom: 20px;
  flex-direction: row;

  .formRight {
    width: 100%;
    margin-top: 15px;

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
      }
    }

    .GreenButton {
      //border: 1px solid grey;
      height: 49px;
      border-radius: 2px;
      background: #005657;
    }

    .title1 {
      font-size: 16px;
      text-align: center;
      line-height: 48px;
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

    .greenIcon {
      margin: 15px;
      background: url("~@/assets/assistantPng/add.png") no-repeat;
    }
  }
}
</style>
