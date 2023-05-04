<template>
  <div class="talkRec">
    <!-- table -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">咨询师列表</span>
        </div>
        <div class="headerRight">
          <div class="btns borderOrange" @click="mbDown()">
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
          </div>
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
            prop="zxfx"
            label="咨询方向"
            min-width="130px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="grxx"
            label="咨询师介绍"
            min-width="200px"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
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
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="详情"
        :visible.sync="detailModal"
        :before-close="detailCancel"
        width="50%"
      >
        <template>
          <div class="baseInfo">
            <div class="information">
              <div class="picture" style="width: 30%">
                <!-- <el-upload
                  class="avatar-uploader"
                  action="#"
                  :file-list="ele.fileList"
                  :show-file-list="false"
                  :on-change="
                    (item, item1) => {
                      change(item, item1, ind);
                    }
                  "
                  :auto-upload="false"
                  ref="upload"
                > -->
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
                <div class="itemtitle">咨询方向</div>
                <div class="word">{{ basicInfo.zxfx }}</div>
                <div class="itemtitle">个人信息</div>
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

                <el-table-column prop="xm" label="日期"> </el-table-column>
                <el-table-column prop="ssdwdmmc" label="时间" min-width="100px">
                </el-table-column>
                <el-table-column prop="bjdmmc" label="状态" />
              </el-table>
            </div>
          </div>
        </template>
        <span slot="footer" class="dialog-footer footerFlex">
          <el-button
            @click="detailCancel"
            style="margin-right: 12px; padding: 8px 20px"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="新增"
        :visible.sync="addModel"
        width="50%"
        :close-on-click-modal="false"
      >
        <template>
          <el-form :model="form" :rules="rules" ref="form">
            <div class="baseInfo">
              <div class="information">
                <div class="picture" style="width: 30%">
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :file-list="form.fileList"
                    :show-file-list="false"
                    :on-change="
                      (item, item1) => {
                        change(item, item1, ind);
                      }
                    "
                    :auto-upload="false"
                    ref="upload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="title">
                    <el-form-item label="姓名" prop="xm" :rules="rules.common">
                      <el-autocomplete
                        v-model="form.xm"
                        :fetch-suggestions="querySearchPart"
                        placeholder="请输入姓名"
                        :trigger-on-focus="false"
                        size="small"
                        @select="selectXm"
                      ></el-autocomplete>
                    </el-form-item>
                  </div>
                  <div class="post">
                    <el-form-item label="职称" prop="zcmc">
                      {{ form.zcmc }}
                    </el-form-item>
                  </div>
                </div>
                <div style="width: 70%">
                  <div class="itemtitle">联系方式</div>
                  <div class="word">
                    <el-form-item prop="yddh" :rules="rules.common">
                      <el-input
                        :maxlength="50"
                        style="width: 150px"
                        v-model="form.yddh"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="itemtitle">咨询方向</div>
                  <div class="word">
                    <el-form-item prop="zxfx" :rules="rules.common">
                      <el-input
                        :maxlength="200"
                        v-model="form.zxfx"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="itemtitle">个人信息</div>
                  <div class="word">
                    <el-form-item prop="grxx" :rules="rules.common">
                      <el-input
                        :maxlength="500"
                        v-model="form.grxx"
                        placeholder="请输入"
                        type="textarea"
                        :rows="7"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
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
    <!-- <el-dialog title="导出提示" :visible.sync="showExport" width="30%">
      <span>确认导出数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
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
import {
  queryList,
  insert,
  deleteList,
  queryTeaInfoByGh,
  detail,
  downLoad,
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
      uploadUrl: process.env.VUE_APP_BASE_API + "/syfzZxsb/importExcel",
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
        cyrList: [
          {
            fileList: [], //文件
            cyrJj: "", //简介
            cyrMc: "", //名称
            cyrGh: "", //工号
            acceptVlaue: "",
            imageUrl: "",
          },
        ],
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderZd: "",
        orderPx: "",
        total: 0,
      },

      multipleSelection: [],
      detailModal: false,
      addModel: false,

      basicInfo: { dutyData: [] },

      delArr: [],

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
    this.handleSearch();
  },

  methods: {
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
    mbDown() {
      downLoad().then((res) => {
        this.downloadFn(res, "咨询师列表模板下载", "xlsx");
        this.$message.success("下载成功！");
      });
    },
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "上传失败",
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.handleSearch();
        this.$message({
          type: "success",
          message: res.errmsg,
        });
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    hadleDetail(row) {
      this.detailModal = true;
      detail({ id: row.id }).then((res) => {
        this.basicInfo = res.data;
      });
    },
    changeXm() {},
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
          xm: this.form.xm,
          gh: this.form.gh[1],
          grxx: this.form.grxx,
          zxfx: this.form.zxfx,
          yddh: this.form.yddh,
          zcmc: this.form.zcmc ? this.form.zcmc : "",
        };
        insert(params).then((res) => {
          this.$message.success("新增成功");
          this.addModel = false;
          this.handleSearch();
        });
      }
    },
    changeSelect() {
      this.searchVal = "";
    },
    // 查询
    handleSearch() {
      let data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      queryList(data)
        .then((res) => {
          this.tableData = res.data;
          this.queryParams.total = res.totalCount;
        })
        .catch((err) => {});
    },

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
          }
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
        getXmXgh(Xm).then((res) => {
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
      console.log(this.form.xm);
      let gh = this.form.xm.match(/\(([^)]*)\)/);
      this.$set(this.form, "gh", gh);
      queryTeaInfoByGh({ gh: gh[1] }).then((res) => {
        if (res.data) {
          this.$set(this.form, "zcmc", res.data.zcmc);
          this.$set(this.form, "yddh", res.data.yddh);
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 158px;
    line-height: 158px;
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    width: 158px;
    height: 158px;
    display: block;
  }
}
</style>
