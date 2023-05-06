<template>
  <div>
    <div class="tableWrap mt15">
      <topTitle :routeTitle="routeTitle"></topTitle>
      <div class="headerTop">
        <div class="headerLeft">
          <el-form
            :model="formSearch"
            ref="formSearch"
            size="small"
            :inline="true"
            label-width="68px"
          >
            <el-form-item label="姓名" prop="bjmc">
              <el-input
                v-model="formSearch.xm"
                placeholder="请输入姓名"
                clearable
                @keyup.enter.native="query"
              />
            </el-form-item>
            <el-form-item label="工作单位" prop="gzdwList">
              <el-select
                v-model="formSearch.gzdwList"
                placeholder="未选择"
                clearable
                multiple
              >
                <el-option
                  v-for="(item, index) in dwOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="日期" prop="pyccList">
              <el-date-picker
                type="daterange"
                placeholder="选择日期"
                v-model="datePicker"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-search"
                class="background: #005657"
                @click="query"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="headerRight">
          <div class="btns borderLight" @click="myBook">
            <span class="title2">我的预约</span>
          </div>
          <!-- <div class="btns borderLight" @click="showDetail(1)">
            <span class="title2">预约</span>
          </div>
          <div class="btns borderLight" @click="bookDetail(11, 1)">
            <span class="title2">预约登记</span>
          </div> -->
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column prop="dwmc" label="工作单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="zcmc" label="职称" sortable="custom">
          </el-table-column>
          <el-table-column prop="yddh" label="联系方式" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="rqfw"
            label="日期"
            min-width="130px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="pbsj"
            label="时间"
            min-width="220px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="zxdd" label="地点" sortable="custom">
          </el-table-column>
          <!-- <el-table-column
            prop="jg"
            label="审核进度"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="lctClick(scope.row)">
                <i class="scopeIncon lct"></i>
                <span>流程图</span>
              </el-button>
            </template>
          </el-table-column> -->
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
                <span style="margin-left: 5px">预约</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="详情" :visible.sync="editModal" width="50%">
        <template>
          <div class="baseInfo">
            <div class="information">
              <div class="picture" style="width: 30%">
                <div style="margin-bottom: 20px">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <!-- </el-upload> -->
                <div class="title">咨询师：{{ basicInfo.xm }}</div>
                <div class="post">{{ basicInfo.zcmc }}</div>
              </div>
              <div style="width: 70%">
                <div class="itemtitle">联系方式</div>
                <div class="word">联系电话：{{ basicInfo.yddh }}</div>
                <div class="itemtitle">咨询方向：</div>
                <div class="word">{{ basicInfo.zxfx }}</div>
                <div class="itemtitle">个人信息：</div>
                <div class="word">{{ basicInfo.grxx }}</div>
              </div>
            </div>
            <div class="headline">排班信息</div>
            <div>
              <el-table
                :data="basicInfo.dutyData"
                ref="dutyData"
                style="width: 100%"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>

                <el-table-column prop="rq" label="日期"> </el-table-column>
                <el-table-column prop="sd" label="时间" min-width="100px">
                </el-table-column>
                <el-table-column prop="yyzt" label="状态" />
                <el-table-column label="附件" width="180">
                  <template slot-scope="scope">
                    <div style="display: flex; justify-content: space-between">
                      <el-button
                        type="text"
                        size="small"
                        @click="bookDetail(scope.row, 1)"
                        :disabled="scope.row.yyzt == '可约' ? false : true"
                      >
                        <span
                          :class="
                            scope.row.yyzt == '可约'
                              ? 'handleName'
                              : 'handleNone'
                          "
                          >线上预约</span
                        >
                      </el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="bookDetail(scope.row, 2)"
                        :disabled="scope.row.yyzt == '可约' ? false : true"
                      >
                        <span
                          :class="
                            scope.row.yyzt == '可约'
                              ? 'handleName'
                              : 'handleNone'
                          "
                          >线下预约</span
                        >
                      </el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </template>
        <!-- <span slot="footer" class="dialog-footer footerFlex">
          <el-button
            @click="detailCancel"
            style="margin-right: 12px; padding: 8px 20px"
            >关 闭</el-button
          >
        </span> -->
      </el-dialog>
      <pagination
        v-show="queryParams.totalCount > 0"
        :total="queryParams.totalCount"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="query"
      />
    </div>
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { edit, tj } from "@/api/dailyBehavior/xnxjStu";
import { queryPbList, queryZxsPbxxYyzt } from "@/api/career/bookStu";
import lctCom from "../../../components/lct";
import topTitle from "../../../components/topTitle";
import {
  getCodeInfoByEnglish,
  queryAllDwh,
} from "@/api/politicalWork/basicInfo";
export default {
  components: { lctCom, topTitle },
  data() {
    return {
      xnxjModal: false,
      formAdd: {
        xn: "",
        zwxj: "",
        jcqk: "",
        kcxxqk: "",
        kycg: "",
        sxzzbx: "",
        zsxsj: "",
      },
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      editModal: false,
      formEdit: {},
      tableData: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        xh: "",
      },
      editFlag: 2,
      tjArr: [],
      ztStatus: [],
      val: [],
      routeTitle: "",
      rulesBlcak: {},
      benke: "2",
      XN: "",
      dwOps: [],
      datePicker: [],
      formSearch: {
        xm: "",
        gzdwList: [],
      },
      imageUrl: "",
      basicInfo: { dutyData: [] },
      rules: {},
    };
  },
  mounted() {
    this.query();
    this.getCode("dmsplcm"); //状态
    this.getAllDwh();
    this.routeTitle = this.$route.meta.title;
  },

  methods: {
    BackHomepage() {
      this.$router.push({
        path: "/studentHomePage",
      });
    },
    getAllDwh() {
      queryAllDwh()
        .then((res) => {
          this.dwOps = res.data.rows;
        })
        .catch((err) => {});
    },
    //预约
    showDetail(row) {
      this.editModal = true;
      // detail({ id: row.id })
      //   .then((res) => {
      //     this.basicInfo = res.data;
      //   })
      //   .catch((err) => {});
      queryZxsPbxxYyzt({ gh: row.gh })
        .then((res) => {
          this.basicInfo.dutyData = res.data;
        })
        .catch((err) => {});
    },
    bookDetail(row, flag) {
      console.log(row.id);
      this.$router.push({
        path: "/careerBookDetail",
        query: {
          mtfs: flag, //1线上，2线下
          yyid: row.id,
        },
      });
    },
    myBook() {
      this.$router.push({
        path: "/careerMybook",
      });
    },
    tj() {
      var data = this.val;
      tj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    // 表单校验
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
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.val = val;
      this.tjArr = val.map((item) => item.id);
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = {
          xn: this.formEdit.xn,
          zwxj: this.formEdit.zwxj,
          jcqk: this.formEdit.jcqk,
          kcxxqk: this.formEdit.kcxxqk,
          kycg: this.formEdit.kycg,
          sxzzbx: this.formEdit.sxzzbx,
          zsxsj: this.formEdit.zsxsj,
          id: this.formEdit.id,
        };
        edit(data).then((res) => {
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
    query() {
      var data = {
        xm: this.formSearch.xm,
        gzdwList: this.formSearch.gzdwList,
        pbrqks:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[0]
            : "",
        pbrqjs:
          this.datePicker && this.datePicker.length > 0
            ? this.datePicker[1]
            : "",
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryPbList(data).then((res) => {
        this.tableData = res.data;
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
      align-items: center;
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
      }
    }
  }
  .baseInfo {
    // padding: 20px;
    margin-left: 30px;
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    // overflow-x: auto;
    .information {
      display: flex;
      flex-direction: row;
      background: #fff;
      height: 50%;
      .picture {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
          font-weight: 600;
          font-size: 28px;
          color: #005657;
          line-height: 28px;
        }
        .post {
          font-size: 16px;
          color: #1f1f1f;
          line-height: 30px;
        }
      }
      .itemtitle {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .word {
        font-size: 16px;
        color: #1f1f1f;
        line-height: 30px;
      }
    }
  }
}
.handleName {
  font-weight: 400;
  font-size: 14px;
  color: #005657;
  line-height: 28px;
}
.handleNone {
  font-weight: 400;
  font-size: 14px;
  color: #cce0e1ff;
  line-height: 28px;
}
</style>
