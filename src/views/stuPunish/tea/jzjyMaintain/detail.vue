<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">矫正教育详情</p>
      </div>
      <!-- 学生本人基本情况 -->
      <div class="headline">学生信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ basicInfo.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ basicInfo.xm }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ basicInfo.xbmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养层次</div>
                <div class="content">
                  {{ basicInfo.pyccmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">
                  {{ basicInfo.ssdwdmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ basicInfo.ssnj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ basicInfo.zydmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">班级</div>
                <div class="content">
                  {{ basicInfo.bjmc }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 岗位信息 -->
      <div class="headline">岗位信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-form :model="formGw">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="岗位类型" prop="gwTypeMc">
                  {{ formGw.gwTypeMc }}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="用人部门" prop="gwYrbmc">
                  {{ formGw.gwYrbmc }}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="指导老师" prop="gwZdls">
                  {{ formGw.gwZdls }}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系方式" prop="gwLxfs">
                  {{ formGw.gwLxfs }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="工作地点" prop="gwGzdd">
                  {{ formGw.gwGzdd }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="23">
                <el-form-item label="工作内容" prop="gwGznr">
                  {{ formGw.gwGznr }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="学时" prop="xs">
                  {{ detailInfoData.xs }}
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="谈话次数" prop="thcs">
                  {{ detailInfoData.thcs }}次
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="最早可结束时间" prop="zzkjssj">
                  {{ detailInfoData.zzkjssj }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-form :model="formEdit" ref="formEdit">
        <div style="display: flex; justify-content: space-between">
          <div class="headline">打卡记录</div>
          <div class="tableStyle">
            已完成：{{ detailInfoData.xsed }}学时 应完成：{{
              detailInfoData.xs
            }}学时<i class="icon jia2" @click="jia2(1)"></i>
          </div>
        </div>
        <el-table
          :data="formEdit.tableDataDk"
          ref="multipleTable"
          style="width: 100%"
        >
          <el-table-column label="日期" min-width="100">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataDk.' + scope.$index + '.dkRq'"
                :rules="rules.common"
              >
                <el-date-picker
                  v-model="scope.row.dkRq"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :clearable="false"
                >
                </el-date-picker
              ></el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="dkSj" label="打卡时间" min-width="100">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataDk.' + scope.$index + '.dkSj'"
                :rules="rules.common"
              >
                <el-time-picker
                  v-model="scope.row.dkSj"
                  placeholder="选择时间"
                  value-format="hh-mm-ss"
                  :clearable="false"
                >
                </el-time-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="dkNr" label="工作内容" min-width="100">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataDk.' + scope.$index + '.dkNr'"
                :rules="rules.common"
              >
                <el-input
                  maxlength="50"
                  v-model="scope.row.dkNr"
                  placeholder="请输入"
                ></el-input
              ></el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="dkXs" label="学时（小时）" min-width="100">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataDk.' + scope.$index + '.dkXs'"
                :rules="rules.common"
              >
                <el-input-number
                  :min="0"
                  :max="9999"
                  controls-position="right"
                  v-model="scope.row.dkXs"
                  placeholder="请输入"
                ></el-input-number
              ></el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="添加选项" align="center">
            <template slot-scope="scope">
              <div style="margin-bottom: 20px">
                <i
                  class="icon jian"
                  @click="jian(scope.row, scope.$index, 1)"
                ></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 谈话记录 -->
        <div style="display: flex; justify-content: space-between">
          <div class="headline">谈话记录</div>
          <div class="tableStyle">
            已完成：{{ detailInfoData.thcsed }}次 应完成：{{
              detailInfoData.thcs
            }}次<i class="icon jia2" @click="jia2(2)"></i>
          </div>
        </div>
        <el-table
          :data="formEdit.tableDataTh"
          ref="multipleTable"
          style="width: 100%"
        >
          <el-table-column type="thRq" label="日期" min-width="100">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataTh.' + scope.$index + '.thRq'"
                :rules="rules.common"
              >
                <el-date-picker
                  v-model="scope.row.thRq"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker
              ></el-form-item> </template
          ></el-table-column>
          <el-table-column prop="thNr" label="谈话内容" min-width="200">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableDataTh.' + scope.$index + '.thNr'"
                :rules="rules.common"
              >
                <el-input
                  maxlength="50"
                  v-model="scope.row.thNr"
                  placeholder="请输入"
                ></el-input
              ></el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="附件" width="250">
            <template slot-scope="scope">
              <el-upload
                action="#"
                multiple
                class="el-upload"
                accept=".pdf,.jpg"
                :auto-upload="false"
                ref="upload"
                :limit="1"
                :file-list="scope.row.fileTh"
                :on-preview="handlePreview"
                :on-change="
                  (file, fileList) => {
                    fileChangeList(file, fileList, scope.$index);
                  }
                "
                :before-remove="
                  (file, fileList) => {
                    beforeRemoveList(file, fileList, scope.$index);
                  }
                "
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="添加选项" align="center">
            <template slot-scope="scope">
              <div style="margin-bottom: 20px">
                <i
                  class="icon jian"
                  @click="jian(scope.row, scope.$index, 2)"
                ></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="handleBack">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { queryJdList, saveGw } from "@/api/stuPunish/stu";
import {
  queryLRDkList,
  queryLRThList,
  importDkThJl,
} from "@/api/stuPunish/jzjyMaintain";
import { delwj, Exportwj } from "@/api/assistantWork/classEvent";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
export default {
  data() {
    return {
      isEdit: 2,
      basicInfo: {},
      detailInfoData: {
        id: "",
        xh: "",
        gwInfo: {},
      },

      formGw: {},
      formEdit: {
        tableDataDk: [],
        tableDataTh: [],
      },
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
  created() {},
  mounted() {
    this.detailInfoData = this.$route.query.bodyData;
    this.formGw = this.detailInfoData.gwInfo;
    this.getDetail();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
        }
      });
    },

    editButtonClick() {
      this.isEdit = 1;
    },
    async getDetail() {
      queryKnssqxsjbxx({ xh: this.detailInfoData.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      queryLRDkList({ jzjyId: this.detailInfoData.id }).then((res) => {
        this.formEdit.tableDataDk = res.data;
      });
      let res = await queryLRThList({ jzjyId: this.detailInfoData.id });
      if (res.errcode == "00") {
        this.formEdit.tableDataTh = res.data;
      }
      for (var j = 0; j < this.formEdit.tableDataTh.length; j++) {
        var data;
        if (this.formEdit.tableDataTh[j].file) {
          this.formEdit.tableDataTh[j].file.name =
            this.formEdit.tableDataTh[j].file.fileName;
          //将file赋值给fileTh
          this.formEdit.tableDataTh[j].fileTh = [];
          this.formEdit.tableDataTh[j].fileTh.push(
            this.formEdit.tableDataTh[j].file
          );
          let res2 = await Exportwj({
            id: this.formEdit.tableDataTh[j].file.id.toString(),
          });
          data = new File([res2], this.formEdit.tableDataTh[j].file.fileName, {
            type: "application/png",
            lastModified: Date.now(),
          });
          //最多传一个文件时可这样写，否则要循环
          this.$set(this.formEdit.tableDataTh[j].fileTh[0], "raw", data);
          // console.log("th", this.formEdit.tableDataTh[j]);
        }
      }
      
    },
    jia2(ind) {
      if (ind == 1) {
        var obj = { dkRq: "", dkSj: "", dkNr: "", dkXs: "" };
        this.formEdit.tableDataDk.push(obj);
      } else {
        var abj = { thRq: "", thNr: "", fileTh: [] };
        this.formEdit.tableDataTh.push(abj);
      }
    },
    jian(row, index, ind) {
      if (ind == 1) {
        this.formEdit.tableDataDk.splice(index, 1);
      } else {
        this.formEdit.tableDataTh.splice(index, 1);
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
    handlUpdata() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let formData = new FormData();
        formData.append("jzjyId", this.detailInfoData.id);

        for (let i = 0; i < this.formEdit.tableDataDk.length; i++) {
          var dkdata = this.formEdit.tableDataDk[i];
          formData.append("dkList[" + i + "].dkNr", dkdata.dkNr);
          formData.append("dkList[" + i + "].dkRq", dkdata.dkRq);
          formData.append("dkList[" + i + "].dkSj", dkdata.dkSj);
          formData.append("dkList[" + i + "].dkXs", dkdata.dkXs);
        }
        for (let j = 0; j < this.formEdit.tableDataTh.length; j++) {
          var thdata = this.formEdit.tableDataTh[j];
          formData.append("thList[" + j + "].thNr", thdata.thNr);
          formData.append("thList[" + j + "].thRq", thdata.thRq);
          if (
            this.formEdit.tableDataTh[j].fileTh &&
            this.formEdit.tableDataTh[j].fileTh.length > 0
          ) {
            this.formEdit.tableDataTh[j].fileTh.map((ele) => {
              formData.append("thList[" + j + "].file", ele.raw);
            });
          }
        }
        importDkThJl(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("保存成功");
            this.$router.go(-1);
          } else {
            this.$message.error("保存失败");
          }
        });
      }
    },
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName);
      });
    },
    beforeRemoveList(file, fileList, index) {
      // console.log("file", file);
      // console.log("fileList", fileList);
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      // this.fileList = fileList;
      this.formEdit.tableDataTh[index].fileTh = fileList;
      // if (file.id) {
      //   //如果是后端返回的文件就走删除接口，不然前端自我删除
      //   delwj({ id: file.id.toString() }).then();
      // }
    },
    fileChangeList(file, fileList, index) {
      if (Number(file.size / 1024 / 1024) > 1) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else {
        //多行表上传附件
        this.formEdit.tableDataTh[index].fileTh = fileList;
        // console.log("fileList", fileList);
      }
    },
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
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;
  .detail_right {
    flex: 1;
    background: #fff;
    padding: 30px;
    .right_top {
      .toptitle {
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
    .headline {
      padding-left: 20px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 20px;
      color: #000;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/arrowDown.png") no-repeat;
          vertical-align: middle;
          margin-bottom: 4px;
        }
      }
    }

    .tableStyle {
      position: relative;
      padding: 20px;
      .information {
        padding: 0 20px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 200px;
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
      }
      .pieceName {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        color: #1f1f1f;
        line-height: 28px;
      }
      .inputArea {
        display: flex;
        flex-direction: column;
        //align-items: center;
        .title {
          //   flex: 0 0 160px;
          //   line-height: 48px;
          //   background: #e0e0e0;
          //   text-align: right;
          //   padding-right: 5px;
          //   margin: 0 !important;
          font-weight: 400;
          font-size: 16px;
          color: #1f1f1f;
          line-height: 22px;
          margin: 16px;
          text-align: left;
        }
        .content {
          .cishu {
            margin-bottom: 10px;
          }
        }
      }
      .tableArea {
        padding-right: 20px;
        padding-left: 20px;
      }
    }
  }

  .editBottom {
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1), 0 -2px 6px -1px rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn {
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
  .jia {
    margin-top: 9px;
    background: url("~@/assets/images/jia.png") no-repeat;
  }
  .jia2 {
    margin-left: 15px;
    background: url("~@/assets/images/jia.png") no-repeat;
  }
  .jian {
    margin-top: 9px;
    background: url("~@/assets/images/jian.png") no-repeat;
  }
  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: top;
    margin-right: 5px;
  }
}
</style>
