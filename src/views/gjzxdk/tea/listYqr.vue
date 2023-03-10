<template>
  <div class="talkRec">
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
            <el-option label="学号" value="xh"></el-option>
            <el-option label="姓名" value="xm"></el-option>
            <el-option label="确认人" value="shrxm"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span>{{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" class="mt15">
          <el-col :span="6">
            <span>培养单位：</span>
            <el-select
              v-model="moreIform.dwh"
              multiple
              collapse-tags
              @change="changeXY"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in allDwh"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>班<span v-html="'\u3000\u3000'"></span>级：</span>
            <el-select
              v-model="moreIform.bjm"
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in bjOps"
                :key="item.dm"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >贷款总金额（区间）：</el-col
          >
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeStart"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
          <el-col :span="0.5" style="margin-top: 7px; margin-left: -52px">
            ——
          </el-col>
          <el-col :span="1.5">
            <el-input-number
              v-model="queryParams.dkzjeEnd"
              :controls="false"
              style="width: 70%"
            ></el-input-number>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5" style="display: inline-block; line-height: 37px"
            >贷款开始时间：</el-col
          >
          <el-col :span="20">
            <el-date-picker
              type="daterange"
              placeholder="选择日期"
              v-model="queryParams.dksjArr"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width= 60px;"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt15">
          <el-col :span="1.5">状态：</el-col>
          <el-col :span="8">
            <div class="checkbox">
              <el-select
                v-model="moreIform.ztStatus"
                multiple
                collapse-tags
                placeholder="请选择状态"
                size="small"
              >
                <el-option
                  v-for="(item, index) in dmgbyqrztm"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">已确认列表</span> <i class="Updataicon"></i>
          <el-select
            v-model="moreIform.xn"
            collapse-tags
            @change="handleSearch"
            placeholder="请选择"
            style="width: 130px; margin: 0 15px 0"
          >
            <el-option
              v-for="(item, index) in allXn"
              :key="index"
              :label="item.mc"
              :value="item.mc"
            ></el-option>
          </el-select>
          <span>学年</span>
        </div>
        <div class="headerRight">
          <div class="btns borderBlue" @click="queren">
            <i class="icon downIcon"></i><span class="title">状态修改</span>
          </div>
          <!-- <div class="btns borderOrange" @click="queren">
            <i class="icon orangeIcon"></i><span class="title1">确认</span>
          </div> -->
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
          </el-table-column>
          <el-table-column
            prop="fileList"
            label="结业证书"
            align="center"
            width="300"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-upload
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
          <el-table-column prop="shrxm" label="确认人"> </el-table-column>
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
      title="确认提示"
      :visible.sync="qrExport"
      width="30%"
      @close="handleCancelB"
      :close-on-click-modal="false"
    >
      <template>
        <div
          style="
            margin-left: 80px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
          "
        >
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
import { queryXn } from "@/api/dailyBehavior/yearSum";
import { byqrYqr, dkjgExp, delByqr, mbDown2, ztxg } from "@/api/gzzxdk/gjzxdk";
import { getCollege } from "@/api/class/maintenanceClass";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getBJ } from "@/api/student/index";
import { getToken } from "@/utils/auth";
export default {
  computed: {
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
  data() {
    return {
      status: "",
      uploadUrl:
        process.env.VUE_APP_BASE_API + "/rcswByqr/importExcelGraduation",
      qrExport: false,
      showExport: false,
      searchVal: "",
      select: "",
      isMore: false,

      moreIform: {
        dwh: [], // 学院下拉框
        bjm: [],
        xn: "",
        ztStatus: [],
      },
      exportParams: {},
      leng: 0,
      tableData: [],
      updownDate: [],
      allDwh: [],
      bjOps: [], // 班级下拉
      allXn: [], //学年下拉
      commonParams: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dksjArr: [],
        // 金额
        dkzjeEnd: 9999999,
        dkzjeStart: 1,
        orderZd: "",
        orderPx: "",
      },
      dmgbyqrztm: [],
      training: {
        // 培养层次
        checkAll: false,
        choose: [],
        checkBox: [],
        isIndeterminate: true,
      },
      multipleSelection: [],
    };
  },

  mounted() {
    this.getAllCollege();
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmgbyqrztm"); //
    this.getSchoolYears();
  },

  methods: {
    del() {
      if (this.delArr.length > 0) {
        this.$confirm("删除提示1", "删除提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
        }).then(() => {
          // delByqr({ ids: this.delArr }).then((res) => {
          //   this.handleSearch();
          // });
        });
      } else {
        this.$message.error("请先勾选数据");
      }

      // if (this.delArr.length > 0) {
      //   delByqr({ ids: this.delArr }).then((res) => {
      //     this.handleSearch();
      //   });
      // } else {
      //   this.$message.error("请先勾选数据");
      // }
    },
    ///上传
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.handleSearch();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },

    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    //获取学年
    getSchoolYears() {
      queryXn()
        .then((res) => {
          this.allXn = res.data;
          this.moreIform.xn = res.data[0].mc;
          this.handleSearch();
        })
        .catch((err) => {});
    },

    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    handleCancelB() {
      this.qrExport = false;
    },
    // 导出确认
    handleConfirmB() {
      if (this.status != "") {
        var data = {};
        data = this.multipleSelection.map((item) => ({
          id: item.id,
          status: this.status,
        }));
        ztxg(data)
          .then((res) => {
            this.$message.success("状态修改成功");
            this.qrExport = false;
            this.handleSearch();
          })
          .catch((err) => {});
      } else {
        this.$message.error("请先选择确认类型");
      }
    },
    //模板下载
    mbDown1() {
      mbDown2().then((res) => {
        this.downloadFn(res, "毕业确认模板下载", "xlsx");
      });
    },
    // 导出确认
    handleConfirm() {
      let ids = [];
      for (let item_row of this.multipleSelection) {
        ids.push(item_row.id);
      }
      this.$set(this.exportParams, "ids", ids);
      dkjgExp(this.exportParams)
        .then((res) => {
          this.downloadFn(res, "贷款结果列表导出.xlsx", "xlsx");
          if (this.$store.getters.excelcount > 0) {
            this.$message.success(
              `已成功导出${this.$store.getters.excelcount}条数据`
            );
          }
        })
        .catch((err) => {});
      this.showExport = false;
    },
    queren() {
      if (this.multipleSelection.length > 0) {
        this.status = "";
        this.qrExport = true;
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    expor() {
      var data = {};
      data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        shrxm: this.select == "shrxm" ? this.searchVal : null,
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        xn: this.moreIform.xn,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        statusList: this.moreIform.ztStatus,
        pageNum: 0,
        pageSize: 0,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      }; //这些参数不能写在查询条件中，因为导出条件时候有可能没触发查询事件
      this.exportParams = data;
      this.showExport = true;
    },
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.zydm = []; // 专业
        this.moreIform.bjm = []; // 班级
      }
      this.getBJ(val);
    },
    getBJ(val) {
      this.bjOps = [];
      let data = { DWH: val };
      if (Object.keys(val).length !== 0) {
        getBJ(data)
          .then((res) => {
            this.bjOps = res.data;
          })
          .catch((err) => {});
      }
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : null,
        xh: this.select == "xh" ? this.searchVal : null,
        shrxm: this.select == "shrxm" ? this.searchVal : null,
        xn: this.moreIform.xn,
        dkkssjEnd:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[0]
            : "",
        dkkssjStart:
          this.queryParams.dksjArr && this.queryParams.dksjArr.length > 0
            ? this.queryParams.dksjArr[1]
            : "",
        statusList: this.moreIform.ztStatus,
        dkzjeEnd: this.queryParams.dkzjeEnd,
        dkzjeStart: this.queryParams.dkzjeStart,
        bjdm: this.moreIform.bjm,
        ssdwdm: this.moreIform.dwh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      byqrYqr(data)
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
            case "dmpyccm":
              this.$set(this.training, "checkBox", res.data);
              break;
            case "dmgbyqrztm":
              //map和foreach的最大区别是foreach没返回值，map有，他们两个方法本来是不会改变数组，但是如果是针对对象数组的话，会改变（因为如果是纯数组，里面是几本数据类型，类似字符串和数组之类，但是对象是引用类型）
              // res.data.forEach((ele) => {
              //   if (ele.dm == "05") {
              //     ele.disabled = true;
              //   } else {
              //     ele.disabled = false;
              //   }
              // });
              // this.dmgbyqrztm = res.data;
              // this.dmgbyqrztm = res.data.map((item) => {
              //   return {
              //     ...item,
              //     Map1: "test",
              //     disabled: (item.dm = "05"
              //       ? (item.disabled = true)
              //       : (item.disabled = false)),
              //   };
              // });
              this.dmgbyqrztm = res.data.filter((item) => {
                return item.dm !== "05";
              });
              break;
            case "dmsplcm": //审批结果
              this.ztStatus = res.data;
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
.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
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
