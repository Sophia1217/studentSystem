<template>
  <div class="scholarships">
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">校内外奖项</span> <i class="Updataicon"></i>
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
          :data="detailInfoData.xnJxj"
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
          <el-table-column prop="jxjmc" label="奖学金名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="jb" label="级别" sortable="custom">
          </el-table-column>
          <el-table-column prop="dj" label="等级" sortable="custom">
          </el-table-column>
          <el-table-column prop="je" label="金额" sortable="custom">
          </el-table-column>
          <el-table-column prop="jxjlx" label="奖学金类型" sortable="custom">
          </el-table-column>
          <el-table-column prop="sldw" label="设立单位" sortable="custom">
          </el-table-column>
          <el-table-column prop="hjsj" label="获奖时间" sortable="custom">
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
          <el-table-column label="奖学金名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jxjmc" />
            </template>
          </el-table-column>
          <el-table-column label="级别" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.jbm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in jbmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="等级" width="240px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.djm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in djmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.je" />
            </template>
          </el-table-column>

          <el-table-column label="奖学金类型" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.jxjlxm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in jxjlxmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="设立单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sldw" />
            </template>
          </el-table-column>
          <el-table-column label="获奖时间" width="240px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.hjsj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
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
          <el-table-column label="奖学金名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jxjmc" />
            </template>
          </el-table-column>
          <el-table-column label="级别" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.jbm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in jbmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="等级" width="240px">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.djm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in djmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.je" />
            </template>
          </el-table-column>

          <el-table-column label="奖学金类型" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.jxjlxm"
                placeholder="请选择"
                jxjlxm
                size="small"
              >
                <el-option
                  v-for="(item, index) in jxjlxmOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="设立单位" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sldw" />
            </template>
          </el-table-column>
          <el-table-column label="获奖时间" width="240px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.hjsj"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
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
        <el-image :src="url"
          ><div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div></el-image
        >
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
        @pagination="getinList"
      />
    </div>
  </div>
</template>
<script>
import {
  insertJxj,
  deleteJxj,
  queryJxjList,
  updateJxj,
} from "@/api/growFiles/scholarships";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  name: "scholarships",
  data() {
    return {
      lctModal: false,
      addModal: false,
      editModal: false,
      detailInfoData: {},
      addData: [],
      editData: [],
      tableDate: [],
      isEdit: 1,
      queryParams: {
        xh: this.$route.query.xh,
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
      },
      ztStatus: [],
      jbmOps: [],
      djmOps: [],
      jxjlxmOps: [],
      val: [],
      url: "",
    };
  },
  watch: {},
  mounted() {
    this.getinList();
    this.getCode("dmxgjljbm");
    this.getCode("dmjldjm");
    this.getCode("dmjxjlxm");
    this.getCode("dmsplcm");
  },
  methods: {
    getinList() {
      let data = {
        xh: this.$route.query.xh,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd ? this.queryParams.orderZd : "",
        orderPx: this.queryParams.orderPx ? this.queryParams.orderPx : "",
      };
      queryJxjList(data)
        .then((res) => {
          console.log(res);
          this.$set(
            this.detailInfoData,
            "xnJxj",
            res.data ? res.data : [] // 校内奖项
          );
        })
        .catch((err) => {});
    },
    lct(row) {
      var processInstanceId = row.processid;
      lct({ processInstanceId }).then((res) => {
        this.url = window.URL.createObjectURL(res);
      });
      this.lctModal = true;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmxgjljbm":
            this.jbmOps = res.data;
            break;
          case "dmjldjm":
            this.djmOps = res.data;
            break;
          case "dmjxjlxm":
            this.jxjlxmOps = res.data;
            break;
          case "dmsplcm":
            this.ztStatus = res.data;
            break;
        }
      });
    },
    del() {
      if (this.delArr && this.delArr.length > 0) {
        deleteJxj(this.delArr).then((res) => {
          this.$message.success("删除成功");
          this.getinList();
        });
      } else {
        this.$message.error("请先勾选数据");
      }
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getinList();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
    },
    bianji(row) {
      this.editData = [];

      this.editData.push(row);
      this.editModal = true;
    },
    editClick() {
      let data = this.editData[0];
      updateJxj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("编辑成功");
          this.getinList();
        } else {
          this.$message.error("编辑失败");
        }
      });
      this.editModal = false;
    },
    editCance() {
      this.editModal = false;
    },
    xinzeng() {
      this.addData = []; // 每次打开弹框先将弹框的table数组置空
      var newLine = {
        jxjmc: "",
        hjsj: "",
        djm: "",
        jbm: "",
        jxjlxm: "",
        je: "",
        sldw: "",
      };
      this.addData.push(newLine);
      this.addModal = true;
    },
    addClick() {
      let data = {
        jxjmc: this.addData[0].jxjmc,
        hjsj: this.addData[0].hjsj,
        djm: this.addData[0].djm,
        jbm: this.addData[0].jbm,
        jxjlxm: this.addData[0].jxjlxm,
        je: this.addData[0].je,
        sldw: this.addData[0].sldw,
        xh: this.$route.query.xh,
      };

      insertJxj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("新增成功");
          this.getinList();
        } else {
          this.$message.error("新增失败");
        }
      });
      this.addModal = false;
    },
    addCance() {
      this.addModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.getinList();
    },
    // editButtonClick() {
    //   this.isEdit = 2; // 控制是否可以编辑的字段
    // },
    // handleCancle() {
    //   this.isEdit = 1;
    // },
    // handleUpdata() {
    //   updateJxj().then((res) => {
    //     if (res.errcode == "00") {
    //       this.getinList(this.queryParams);
    //     }
    //   });
    // },
    // addDetailInfoData() {
    //   this.detailInfoData.xnJxj.push({});

    //   insertJxj(data).then((res) => {
    //     if (res.errcode == "00") {
    //       console.log(res);
    //       this.getinList(this.queryParams);
    //     }
    //   });
    // },
    // delDetailInfoData() {
    //   deleteJxj().then((res) => {
    //     if (res.errcode == "00") {
    //       this.getinList(this.queryParams);
    //     }
    //   });
    // },
    // //撤回
    // deleteDetail() {},
  },
};
</script>
<style lang="scss" scoped>
.scholarships {
  flex: 1;
  background: #fff;
  .right_top {
    .title {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
      color: #005657;
      line-height: 24px;
    }
    .timeWrap {
      text-align: center;
      font-weight: 400;
      font-size: 16px;
      color: #383838;
      line-height: 28px;
      .updataTime {
        margin-left: 20px;
      }
    }
  }
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
}
</style>
