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
      <!-- 打卡记录 -->
      <div style="display: flex; justify-content: space-between">
        <div class="headline">打卡记录</div>
        <div class="tableStyle">
          已完成：{{ detailInfoData.xsed }}学时 应完成：{{
            detailInfoData.xs
          }}学时
        </div>
      </div>
      <el-table :data="tableDataDk" ref="multipleTable" style="width: 100%">
        <el-table-column
          prop="dkRq"
          label="日期"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="dkSj" label="起止时间"> </el-table-column>
        <el-table-column prop="dkNr" label="工作内容"> </el-table-column>
        <el-table-column prop="dkXs" label="时长（小时）"> </el-table-column>
      </el-table>
      <!-- 谈话记录 -->
      <div style="display: flex; justify-content: space-between">
        <div class="headline">谈话记录</div>
        <div class="tableStyle">
          已完成：{{ detailInfoData.thcsed }}次 应完成：{{
            detailInfoData.thcs
          }}次
        </div>
      </div>
      <el-table :data="tableDataTh" ref="multipleTable" style="width: 100%">
        <el-table-column
          prop="thRq"
          label="日期"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="thNr" label="谈话内容" min-width="150">
        </el-table-column>
        <el-table-column prop="fjName" label="附件" min-width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.file !== null">
              <div v-for="item in [scope.row.file]">
                <div style="display: flex; justify-content: space-between">
                  <el-button type="text" size="small" @click="xzWj(item)">
                    <span class="handleName">{{ item.fileName || "" }}</span>
                  </el-button>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="editBottom" v-show="isEdit == 1">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
    <div class="editBottom">
      <div class="btn cancel" @click="handleBack">返回</div>
      <!-- <div class="btn editIcon" @click="editButtonClick">编辑</div> -->
    </div>

    <!-- <div v-if="isEdit == 1" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
  </div>
</template>
<script>
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
import { saveGw } from "@/api/stuPunish/stu";
import { queryLRDkList, queryLRThList } from "@/api/stuPunish/jzjyMaintain";
import { queryKnssqxsjbxx } from "@/api/familyDifficulties/stu";
import { Exportwj } from "@/api/assistantWork/classEvent";
export default {
  data() {
    return {
      isEdit: 2,
      xh: "",
      basicInfo: {},
      formGw: {
        gwMainMc: "",
        gwTypeMc: "",
        gwKjnrs: "",
        gwGzdd: "",
        gwZdls: "",
        gwLxfs: "",
        gwGznr: "",
      },
      detailInfoData: {
        id: "",
        gwInfo: {},
      },
      tableDataDk: [],
      tableDataTh: [],
    };
  },
  created() {},
  mounted() {
    this.xh = this.$store.getters.userId;
    this.detailInfoData = this.$route.query.bodyData;

    // console.log("this.detailInfoData", this.detailInfoData);
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
    getDetail() {
      queryKnssqxsjbxx({ xh: this.xh }).then((res) => {
        this.basicInfo = res.data;
      });
      if (this.detailInfoData.gwInfo) {
        this.formGw = this.detailInfoData.gwInfo;
      }
      queryLRDkList({ jzjyId: this.detailInfoData.id }).then((res) => {
        this.tableDataDk = res.data;
      });
      queryLRThList({ jzjyId: this.detailInfoData.id }).then((res) => {
        this.tableDataTh = res.data;
      });
    },

    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.isEdit = 2;
    },
    handlUpdata() {
      saveGw()
        .then((res) => {
          this.$message.success("保存成功");
          this.getDetail();
          this.isEdit = 2;
        })
        .catch((err) => {});
    },
    //下载附件
    xzWj(item) {
      Exportwj({ id: item.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, item.fileName);
      });
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
  .handleName {
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    line-height: 28px;
  }
}
</style>
