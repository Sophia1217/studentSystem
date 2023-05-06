<template>
  <div class="talkRec">
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">排班列表</span>
          <div style="margin-left: 10px">
            <el-cascader
              v-model="dqXnxq"
              :options="options"
              @change="handleChangeXnxq"
              :props="XnxqProps"
            ></el-cascader>
          </div>
        </div>
        <div class="headerRight">
          <!-- <div class="btns borderOrange" @click="mbDown()">
            <i class="icon downIcon"></i><span class="title">模板下载</span>
          </div>
          <div class="btns borderBlue">
            <el-upload
              accept=".xlsx,.xls"
              :auto-upload="true"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="fileHeader"
              :on-success="upLoadSuccess"
              :on-error="upLoadError"
            >
              <i class="icon inIcon"></i><span class="title">导入</span>
            </el-upload>
          </div> -->
          <div class="btns borderRed" @click="del">
            <i class="icon deteIcon"></i><span class="title">删除</span>
          </div>
          <div class="btns fullGreen" @click="xinzeng">
            <i class="icon addIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
          @selection-change="handleSelectionChange"
          @sort-change="changeTableSort"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>

          <el-table-column prop="xm" label="姓名" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="dwmc"
            label="单位"
            min-width="100px"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column prop="zcmc" label="职称" sortable="custom">
          </el-table-column>
          <el-table-column
            prop="yddh"
            label="联系方式"
            min-width="130px"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="rqfw"
            label="日期"
            min-width="130px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="pbsj"
            label="时间"
            min-width="200px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="zxdd"
            label="地点"
            min-width="200px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row)"
              >
                <i class="scopeIncon handledie"></i>
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>

      <el-dialog
        title="新增"
        :visible.sync="addModel"
        width="50%"
        :close-on-click-modal="false"
        @close="closeAdd"
      >
        <template>
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-position="left"
            label-width="100px"
          >
            <div class="baseInfo">
              <div style="margin-bottom: 20px">
                <el-table
                  :data="form.ghList"
                  ref="multipleTable"
                  style="width: 100%"
                >
                  <el-table-column prop="xm" label="姓名" :min-width="300">
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0px"
                        :prop="'ghList.' + scope.$index + '.xm'"
                        :rules="rules.common"
                      >
                        <el-autocomplete
                          v-model="scope.row.xm"
                          :fetch-suggestions="querySearchPart"
                          placeholder="请输入姓名"
                          :trigger-on-focus="false"
                          size="small"
                          @select="selectXm"
                        ></el-autocomplete>
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column prop="dwmc" label="单位" :min-width="230">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ghList.' + scope.$index + '.dwmc'"
                        label-width="0px"
                      >
                        {{ scope.row.dwmc }}
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="zcmc" label="职称" :min-width="230">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ghList.' + scope.$index + '.zcmc'"
                        label-width="0px"
                      >
                        {{ scope.row.zcmc }}
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="yddh"
                    label="联系方式"
                    :min-width="230"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'ghList.' + scope.$index + '.yddh'"
                        label-width="0px"
                      >
                        {{ scope.row.yddh }}
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      label="学年学期"
                      prop="xnxq"
                      :rules="rules.common"
                    >
                      <el-cascader
                        v-model="form.xnxq"
                        :options="options"
                        @change="handleChangeXnxqAdd"
                        :props="XnxqProps"
                      ></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="日期" prop="rq" :rules="rules.common">
                      <el-date-picker
                        type="daterange"
                        v-model="form.rq"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label="咨询地点"
                      prop="zxdd"
                      :rules="rules.common"
                    >
                      <el-input v-model="form.zxdd" maxlength="100"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div style="margin-top: 10px">
                <el-table :data="form.kfwsjdList" style="width: 100%" stripe>
                  <el-table-column
                    fixed="left"
                    width="100"
                    type="index"
                    :index="indexMethod"
                  >
                    <!-- <template slot-scope="scope">
                      
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="Mon" label="星期一" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Mon" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Tues" label="星期二" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Tues" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Wed" label="星期三" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Wed" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Thur" label="星期四" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Thur" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Fri" label="星期五" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Fri" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Sat" label="星期六" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Sat" size="large" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="Sun" label="星期日" width="80">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.Sun" size="large" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-form>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <pagination
        v-show="queryParams.total > 0"
        :total="queryParams.total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="handleSearch"
      />
    </div>

    <!-- 删除确认对话框 -->
    <el-dialog title="删除" :visible.sync="showRemove" width="30%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleRemove"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryXnXq } from "@/api/dailyBehavior/vocationTea";
import { queryYshList, updateQgzxGw } from "@/api/stuPunish/nichufen";
import { queryPbList, insert, deleteList } from "@/api/career/zxsPb";
import {
  queryTeaInfoByGh,
  detail,
  downLoad,
  queryList,
} from "@/api/career/zxs";
import { getXmXgh } from "@/api/assistantWork/homeSchool";
import { getToken } from "@/utils/auth";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "manStudent",
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
      uploadUrl: process.env.VUE_APP_BASE_API + "/rcswJtknXjmd/import",
      showExport: false,
      lctModal: false,
      showRemove: false,
      ztStatus: [],
      status: [],
      datePicker: [],
      searchVal: "",
      select: "",
      isMore: false,
      imageUrl: "",
      exportParams: {},
      leng: 0,
      tableData: [],
      form: {
        ghList: [{ xm: "", dwmc: "", zcmc: "", yddh: "" }],
        xnxq: [],
        kfwsjdList: [
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
        ],
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        total: 0,
        xn: "",
        xqm: "",
      },

      multipleSelection: [],
      detailModal: false,
      addModel: false,
      formDetails: {},
      formEdit: {},
      basicInfo: {},
      dutyData: [],
      delArr: [],
      dqXnxq: [],
      XnxqProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],

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
    this.getXnxq();
  },

  methods: {
    closeAdd() {
      this.$ref.form.resetFields();
      this.form = {
        ghList: [{ xm: "", dwmc: "", zcmc: "", yddh: "" }],
        xnxq: [],
        kfwsjdList: [
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
          {
            Mon: false,
            Tues: false,
            Wed: false,
            Thur: false,
            Fri: false,
            Sat: false,
            Sun: false,
          },
        ],
      };
    },
    indexMethod(val) {
      var index = [
        "8:00~10:00",
        "10:00~11:30",
        "14:30~16:00",
        "16:00~17:30",
        "18:30~19:30",
        "19:30~20:30",
      ];
      return index[val];
    },
    change(file, fileList, ind) {
      //   //因为上传覆盖，直接置空
      //   this.form.cyrList[ind].fileList = [];
      //   const index = file.name.lastIndexOf(".");
      //   const ext = file.name.substr(index + 1);
      //   let uid = file.uid;
      //   let idx = fileList.findIndex((item) => item.uid === uid);
      //   if ("jpe, jpeg, jpg, png".indexOf(ext) == -1) {
      //     this.$message.error("请上传图片格式");
      //     fileList.splice(idx, 1);
      //   } else if (Number(file.size / 1024 / 1024) > 2) {
      //     this.$message.error("图片大小不超过2M,上传失败");
      //     fileList.splice(idx, 1);
      //   } else {
      //     //让前端图片回显
      //     let binaryData = [];
      //     binaryData.push(file.raw);
      //     this.form.cyrList[ind].imageUrl = window.URL.createObjectURL(
      //       new Blob(binaryData)
      //     );
      //   }
      //   //取当前的file存入filelist
      //   this.form.cyrList[ind].fileList.push(file);
    },
    xinzeng() {
      this.addModel = true;
    },
    addCancel() {
      this.addModel = false;
    },
    //获取学年学期
    getXnxq() {
      queryXnXq().then((res) => {
        this.options = res.data;
        for (let item of res.data) {
          for (let num of item.dataCodeCascadingList)
            if (num.dataCodeCascadingList !== null) {
              this.dqXnxq = [item.dm, num.dm];
            }
        }
        this.queryParams.xn = this.dqXnxq[0];
        this.queryParams.xqm = this.dqXnxq[1];
        this.handleSearch();
      });
    },
    handleChangeXnxq() {
      this.queryParams.xn = " ";
      this.queryParams.xqm = "";
      if (this.dqXnxq[0]) {
        this.queryParams.xn = this.dqXnxq[0];
      }
      if (this.dqXnxq[1]) {
        this.queryParams.xqm = this.dqXnxq[1];
      }
      this.handleSearch();
    },
    handleChangeXnxqAdd() {
      this.form.xn = " ";
      this.form.xqm = "";
      if (this.form.xnxq[0]) {
        this.form.xn = this.form.xnxq[0];
      }
      if (this.form.xnxq[1]) {
        this.form.xqm = this.form.xnxq[1];
      }
      this.handleSearch();
    },
    hadleDetail(row) {},

    del() {
      this.showRemove = true;
    },
    handleRemove() {
      if (this.multipleSelection.length > 0) {
        let idlist = this.multipleSelection.map((item) => item.id);
        deleteList({ idList: idlist }).then((res) => {
          this.$message.success("删除成功");
          this.showRemove = false;
          this.handleSearch();
        });
      } else {
        this.$message.error("请至少选择一条数据！");
      }
    },
    removeCancel() {
      this.showRemove = false;
    },
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    detailCancel() {
      this.detailModal = false;
    },
    addClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var params = {
          gh: this.form.gh[1],
          jsrq: this.form.rq[1] ? this.form.rq[1] : null,
          ksrq: this.form.rq[0] ? this.form.rq[0] : null,
          kfwsjdList: this.form.kfwsjdList,
          xm: this.form.ghList[0].xm.split("(")[0],
          xn: this.form.xn,
          xqm: this.form.xqm,
          zxdd: this.form.zxdd,
        };

        insert(params).then((res) => {
          this.$message.success("新增成功");
          this.addModel = false;
          this.handleSearch();
        });
      }
    },

    // 查询
    handleSearch() {
      let data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        xn: this.queryParams.xn,
        xqm: this.queryParams.xqm,
      };
      queryPbList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delArr = val.map((item) => item.id);
    },
    //排序
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.handleSearch();
    },
    querySearchPart(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryList(Xm).then((res) => {
          // console.log("res",res.data);
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    selectXm() {
      let gh = this.form.ghList[0].xm.match(/\(([^)]*)\)/);
      this.$set(this.form, "gh", gh);
      queryTeaInfoByGh({ gh: gh[1] }).then((res) => {
        if (res.data) {
          this.$set(this.form.ghList[0], "zcmc", res.data.zcmc);
          this.$set(this.form.ghList[0], "yddh", res.data.yddh);
          this.$set(this.form.ghList[0], "dwmc", res.data.dwmc);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.footerFlex {
  display: flex;
  justify-content: flex-end;
}

.lct {
  background: url("~@/assets/dangan/lct.png");
}

.talkRec {
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .handledie {
    background: url("~@/assets/images/details.png");
  }

  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }

  .mt15 {
    margin-top: 15px;
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
  .headline2 {
    padding: 15px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
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

        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }

        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
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

          .deteIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }

          .inIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/in.png") no-repeat;
          }

          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }

          .addIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
          .downIcon {
            margin-top: 10px;
            background: url("~@/assets/images/down.png") no-repeat;
          }
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
  }
}
</style>
