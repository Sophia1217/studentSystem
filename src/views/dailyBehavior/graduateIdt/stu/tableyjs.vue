<template>
  <div class="wrap">
    <topTitle :routeTitle="routeTitle"></topTitle>
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学毕业生鉴定表</p>
        <!-- <div class="timeWrap">
          <span class="updataTime"
            >创建时间：{{ formatDate(tableData.createTime) }}</span
          >
          <span class="updataTime"
            >更新时间：{{ formatDate(tableData.updataTime) }}</span
          >
        </div> -->
      </div>
      <!-- 学生本人基本情况 -->
      <!-- <div class="headline">学生本人基本情况</div> -->
      <el-form
        :model="detailInfoData"
        ref="formAdd"
        size="small"
        :rules="rules"
      >
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img
                :src="
                  detailInfoData
                    ? 'data:image/png;base64,' + detailInfoData.byzp
                    : ''
                "
                alt="照片"
              />
            </div>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ detailInfoData.xm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ detailInfoData.xbmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生年月</div>
                  <div class="content">
                    {{ detailInfoData.csrq }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div class="content">
                    {{ detailInfoData.jgmc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div class="content">
                    {{ detailInfoData.mzmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>

                  <div class="content">
                    {{ detailInfoData.brcf }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 获奖情况 -->
        <div class="headline" style="margin-top: 40px">
          <div>获奖情况</div>
          <div class="editBtn" @click="addDetailInfoData(1)" v-if="isEdit == 1">
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="xxsj" label="时间"> </el-table-column>
            <el-table-column prop="jlxq" label="名称"> </el-table-column>
            <el-table-column prop="zmrxq" label="奖励单位"> </el-table-column>
          </el-table>
        </div>
        <!-- 科研情况 -->
        <div class="headline">
          <div>科研情况</div>
          <div class="editBtn" @click="addDetailInfoData(2)" v-if="isEdit == 1">
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="xxsj" label="时间"> </el-table-column>
            <el-table-column prop="jlxq" label="成果名称及作者排序">
            </el-table-column>
            <el-table-column prop="zmrxq" label="发表刊物或机构">
            </el-table-column>
          </el-table>
        </div>
        <!-- 实践情况 -->
        <div class="headline">
          <div>实践情况</div>
          <div class="editBtn" @click="addDetailInfoData(3)" v-if="isEdit == 1">
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData3" style="width: 100%">
            <el-table-column prop="xxsj" label="时间"> </el-table-column>
            <el-table-column prop="jlxq" label="内容"> </el-table-column>
            <el-table-column prop="zmrxq" label="地点 "></el-table-column>
          </el-table>
        </div>

        <!-- 本人建立 -->
        <div class="headline">
          <div>本人简历</div>
          <div class="editBtn" @click="addDetailInfoData(4)" v-if="isEdit == 1">
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData4" style="width: 100%">
            <el-table-column prop="xxsj" label="起止年月">
              <template slot-scope="scope">
                <div v-if="isEdit != 1">
                  {{ scope.row.ssjlkssj }}至{{ scope.row.xxjljssj }}
                </div>
                <div v-else>
                  <el-date-picker
                    v-model="scope.row.xxsj"
                    format="yyyy-MM-dd"
                    type="daterange"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    clearable
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jlxq" label="学习或工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit != 1">{{ scope.row.jlxq }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.jlxq"
                    placeholder="请输入"
                    maxlength="100"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zmrxq" label="职务">
              <template slot-scope="scope">
                <div v-if="isEdit != 1">{{ scope.row.zmrxq }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.zmrxq"
                    placeholder="请输入"
                    maxlength="100"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column type="fixed" label="操作" v-if="isEdit == 1">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index)"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 实践情况 -->
        <div class="headline">
          <div>主要家庭成员及社会关系</div>
          <div class="editBtn" @click="addDetailInfoData(5)" v-if="isEdit == 1">
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData5" style="width: 100%">
            <el-table-column prop="xxsj" label="关系"> </el-table-column>
            <el-table-column prop="jlxq" label="姓名"> </el-table-column>
            <el-table-column prop="zmrxq" label="出生年月 "></el-table-column>
            <el-table-column prop="zmrxq" label="政治面貌 "></el-table-column>
            <el-table-column
              prop="zmrxq"
              label="工作单位及职务 "
            ></el-table-column>
          </el-table>
        </div>
        <div class="tableStyle">
          <div class="inputArea">
            <el-form-item :rules="rules.blank" prop="zwjd">
              <div class="title">自我鉴定</div>
              <div class="content">
                <el-input
                  type="textarea"
                  :rows="5"
                  maxlength="1500"
                  show-word-limit
                  v-model="detailInfoData.zwjd"
                  :readonly="isEdit == 2"
                />
              </div>
            </el-form-item>
            <div class="title">研究生导师意见</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                show-word-limit
                v-model="detailInfoData.bzjd"
                placeholder="导师审核时需要填写"
                readonly
              />
            </div>
            <div class="title">研究生培养单位意见</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                show-word-limit
                v-model="detailInfoData.ydzzyj"
                placeholder="培养单位审核时需要填写"
                readonly
              />
            </div>
          </div>
          <div style="padding: 30px"></div>
        </div>
      </el-form>
    </div>

    <!-- <div class="editBottom" v-show="isEdit == 1">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
    <div v-if="isEdit != 1" class="editBottom">
      <div class="btn cancel" @click="lctClick">审核记录</div>
      <div class="btn cancel" @click="chModal">撤回</div>

      <div class="btn editIcon" @click="tjModal">提交</div>

      <div class="btn cancel" @click="handleBack">返回</div>
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
    </div>

    <div v-if="isEdit == 1" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
    <el-dialog title="撤回" :visible.sync="chehuiModal" width="20%">
      <span>确认撤回？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="ch()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
    <lctCom
      ref="child"
      :lctModal="lctModal"
      @handleCloseLct="handleCloseLct"
    ></lctCom>
  </div>
</template>
<script>
import {
  getXsJbxx,
  getByjdYjsDetail,
  byjdCxById,
  tjByjd,
  updateByjdDetailYjs,
} from "@/api/dailyBehavior/graduationIdt";
import lctCom from "../../../components/lct";
import topTitle from "../../../components/topTitle";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  components: { lctCom, topTitle },
  data() {
    return {
      formAdd: {},
      isEdit: 2,
      nd: "",
      xh: this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {},
      routeTitle: "毕业生鉴定表",
      njOptions: [],
      zzmmOps: [],
      bzjd: "",
      ydzzyj: "",
      zwjd: "",
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      lctModal: false,
      chehuiModal: false,
      submitModal: false,
      rules: {
        blank: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {
    this.getCode("dmlwkwjbm");
    this.getCode("dmpxjbm");
    this.getDetail();
  },
  methods: {
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    dayin() {
      console.log(this.checked);
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmzzmmm":
            this.zzmmOps = res.data;
            break;
        }
      });
    },
    deleteWorkBrifeData(row, index) {
      this.tableData.splice(index, 1);
    },
    // async getOption() {
    //   await getFdyNdByGh({ gh: this.gh }).then((response) => {
    //     // 获取年级列表数据
    //     if (response.errcode == "00") {
    //       this.njOptions = response.data;
    //       console.log(response);
    //       this.nd = this.$route.query.nd
    //         ? this.$route.query.nd
    //         : this.njOptions[0];
    //     }
    //   });
    //   this.getDetail();
    // },
    editButtonClick() {
      this.isEdit = 1;
    },
    getDetail() {
      getByjdYjsDetail({ xh: this.xh }).then((res) => {
        console.log(res);
        this.detailInfoData = res.data.rcswByjdJbxxYjsRes;
        this.bzjd = res.data.bzjd;
        this.ydzzyj = res.data.ydzzyj;
        this.zwjd = res.data.zwjd;
        this.tableData1 = res.data.czdaJxjRes || [];
        this.tableData2 = res.data.rcswBjjdLwqkRes || [];
        this.tableData3 = res.data.rcswByjdShsjRes || [];
        this.tableData4 = res.data.rcswByjdBrjlYjsRes || [];
        this.tableData5 = res.data.rcswByjdJtcygxYjsRes || [];
      });
    },
    addDetailInfoData(index) {
      if (index == 1) {
        this.$router.push({
          path: "/stuGrowFiles/filesDetail",
          query: {
            activeName: "3",
          },
        });
      } else if (index == 2) {
        this.$router.push({
          path: "/stuGrowFiles/filesDetail",
          query: {
            activeName: "1",
          },
        });
      } else if (index == 3) {
        this.$router.push({
          path: "/stuGrowFiles/filesDetail",
          query: {
            activeName: "5",
          },
        });
      } else if (index == 4) {
        this.tableData.push({});
      }
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.isEdit = 2;
      this.$refs.formAdd.clearValidate();
    },
    handlUpdata() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        // if (this.tableData.length > 0) {
        //   for (var i = 0; i < this.tableData.length; i++) {
        //     this.$set(
        //       this.tableData[i],
        //       "ssjlkssj",
        //       new Date(this.tableData[i].xxsj[0]).getTime() || ""
        //     );
        //     this.$set(
        //       this.tableData[i],
        //       "xxjljssj",
        //       new Date(this.tableData[i].xxsj[1]).getTime() || ""
        //     );

        //     this.$set(this.tableData[i], "xh", this.xh);
        //   }
        // }
        // console.log("this.tableData", this.tableData);
        //this.$delete(this.tableData, "xxsj");
        let data = {
          bzyj: this.bzjd,
          ydzzyj: this.ydzzyj,
          zwjd: this.zwjd,
          xh: this.xh,
        };
        updateByjdYjsDetail(data)
          .then((res) => {
            this.$message.success("保存成功");
            this.getDetail();
            this.isEdit = 2;
          })
          .catch((err) => {});
      }
    },
    //}
    //},
    tjModal() {
      if (this.detailInfoData.status == "01") {
        this.submitModal = true;
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tj() {
      let data = {
        byjdXxjlListRes: this.tableData,
        rcswByjdJbxxRes: this.detailInfoData,
        xh: this.xh,
      };
      tjByjd(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.getDetail();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    lctClick() {
      if (!!this.detailInfoData.processid) {
        this.$refs.child.inner(this.detailInfoData.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("数据未保存，不能提交！");
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      let data = {
        byjdXxjlListRes: this.tableData,
        rcswByjdJbxxRes: this.detailInfoData,
        xh: this.xh,
      };
      byjdCxById(data).then((res) => {
        this.$message.success("撤回成功");
        this.getDetail();
        this.chehuiModal = false;
      });
    },
    chModal() {
      if (this.detailInfoData.status !== "02") {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      } else {
        this.chehuiModal = true;
      }
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
      .imgWrap {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 100;
        .photo {
          width: 160px;
          height: 206px;
          background: #fff;
          overflow: hidden;
          img {
            width: 160px;
            height: 206px;
          }
        }
      }
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
}
</style>
