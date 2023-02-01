<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学学生及家庭情况调查表</p>
        <div class="timeWrap">
          <span class="updataTime"
            >创建时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
          <span class="updataTime"
            >更新时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
        </div>
      </div>
      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.xb }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.csrq }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.csrq }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.zgxl }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.zgxl }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.lx }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">籍贯</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.pycc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">身份证号码</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.rs }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.tkcs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">民族</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.rs }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">毕业学校</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.tkcs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭人口数</div>
                <div class="content" v-if="isEdit == 1">
                  <el-input-number
                    v-model="detailInfoData.fdyZpJbqkRes.xgjz"
                    max="100"
                  />
                </div>
                <div class="content" v-else>
                  {{ detailInfoData.fdyZpJbqkRes.xgjz }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本人号码</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.tkcs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">单亲</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">孤残学生</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">烈士子女</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">农村特困救助供养</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭紧急困难残疾学生及残疾人子女</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 家庭基本情况 -->
      <div class="headline">家庭基本情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">低保户</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">建档立卡家庭</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">有大病患者</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">父母丧失劳动能力</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.fdyZpJbqkRes.tkcs"
                    :disabled="isEdit !== 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭人均年收入（元）</div>
                <div class="content" v-if="isEdit == 1">
                  <el-input-number
                    v-model="detailInfoData.fdyZpJbqkRes.xgjz"
                    max="100"
                  />
                </div>
                <div class="content" v-else>
                  {{ detailInfoData.fdyZpJbqkRes.xgjz }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">需赡养人数（人）</div>
                <div class="content" v-if="isEdit == 1">
                  <el-input-number
                    v-model="detailInfoData.fdyZpJbqkRes.xgjz"
                    max="100"
                  />
                </div>
                <div class="content" v-else>
                  {{ detailInfoData.fdyZpJbqkRes.xgjz }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">详细通讯地址</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.rs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">邮政编码</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.rs }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ detailInfoData.fdyZpJbqkRes.tkcs }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 家庭成员信息 -->
      <div class="headline">
        <div>家庭成员信息</div>
        <div class="editBtn" @click="addDetailInfoData(1)" v-if="isEdit == 1">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableArea">
        <el-table :data="detailInfoData.zgJxkyqkList" style="width: 100%">
          <el-table-column prop="kcmc" label="姓名" />
          <el-table-column prop="ksl" label="出生年月" />
          <el-table-column prop="ksl" label="关系" />
          <el-table-column prop="ksl" label="工作（学习）单位" />
          <el-table-column prop="ksl" label="职业" />
          <el-table-column prop="ksl" label="年收入（元）">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="ksl" label="健康状况" />
          <!-- <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column> -->
        </el-table>
      </div>
      <!-- 影响家庭经济状况相关信息 -->
      <div class="headline">影响家庭经济状况相关信息</div>
      <div class="tableStyle">
        <div class="pieceName">学生本学年已获资助情况</div>
        <div class="inputArea">
          <div class="title">学生本学年已获资助情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.wdmqk"
              :readonly="isEdit == 0"
            />
          </div>
          <div class="title">家庭遭受自然灾害情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.txthqk"
              :readonly="isEdit == 0"
            />
          </div>

          <div class="title">家庭遭受突发意外事件</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.xfjyqk"
              :readonly="isEdit == 0"
            />
          </div>
          <div class="title">家庭成员因老、病、残而劳动能力弱情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.txthqk"
              :readonly="isEdit == 0"
            />
          </div>
          <div class="title">家庭成员失业情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.txthqk"
              :readonly="isEdit == 0"
            />
          </div>
          <div class="title">家庭负债情况及原因</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.txthqk"
              :readonly="isEdit == 0"
            />
          </div>
          <div class="title">其他需要说明的情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="detailInfoData.fdyZpJbqkRes.txthqk"
              :readonly="isEdit == 0"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="editBottom" v-show="isEdit == 1">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
    <div v-if="isEdit != 1" class="editBottom">
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
    </div>

    <div v-if="isEdit == 1" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>
<script>
import {
  getFdyZpDetail,
  updateFdyZpDetail,
  getFdyNdByGh,
} from "@/api/test/fdySelfTest";
import { getGrade } from "@/api/assistantWork/listen";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  data() {
    return {
      isEdit: 1,
      nd: "",
      gh: this.$route.query.gh
        ? this.$route.query.gh
        : this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {},
      njOptions: [],
      lwjbmOps: [],
      pxjbmOps: [], //培训级别码
    };
  },
  created() {},
  mounted() {
    this.getCode("dmlwkwjbm");
    this.getCode("dmpxjbm");
    //this.getOption();
  },
  methods: {
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmlwkwjbm":
            this.lwjbmOps = res.data;
            break;
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    async getOption() {
      await getFdyNdByGh({ gh: this.gh }).then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOptions = response.data;
          console.log(response);
          this.nd = this.$route.query.nd
            ? this.$route.query.nd
            : this.njOptions[0];
        }
      });
      this.getDetail();
    },
    ndChange() {
      this.getDetail();
    },
    getDetail() {
      getFdyZpDetail({ nd: this.nd, gh: this.gh }).then((res) => {
        console.log(res);
        this.$set(
          this.detailInfoData,
          "fdyZpJbqkRes",
          res.data.fdyZpJbqkRes ? res.data.fdyZpJbqkRes : {} //基本情况
        );
        this.$set(
          this.detailInfoData,
          "fdyZpXshjResList",
          res.data.fdyZpXshjResList ? res.data.fdyZpXshjResList : [] //学生获奖
        );
        this.$set(
          this.detailInfoData,
          "fdyZpXswjResList",
          res.data.fdyZpXswjResList ? res.data.fdyZpXswjResList : [] //学生违纪
        );
        this.$set(
          this.detailInfoData,
          "zgJlbzList",
          res.data.zgJlbzList ? res.data.zgJlbzList : [] //个人或将
        );
        this.$set(
          this.detailInfoData,
          "zgJxkyqkList",
          res.data.zgJxkyqkList ? res.data.zgJxkyqkList : [] //授课情况
        );
        this.$set(
          this.detailInfoData,
          "zgLwkyqkList",
          res.data.zgLwkyqkList ? res.data.zgLwkyqkList : [] //论文成果
        );
        this.$set(
          this.detailInfoData,
          "zgXmkyqkList",
          res.data.zgXmkyqkList ? res.data.zgXmkyqkList : [] //课题研究
        );
        this.$set(
          this.detailInfoData,
          "zgXxpxList",
          res.data.zgXxpxList ? res.data.zgXxpxList : [] //培训情况
        );
        this.$set(
          this.detailInfoData,
          "zgZzkyqkList",
          res.data.zgZzkyqkList ? res.data.zgZzkyqkList : [] //专住书记
        );
      });
    },
    addDetailInfoData(index) {
      if (index == 1) {
        this.$router.push({
          path: "/student/studetails",
          query: {
            xh: this.$store.getters.userId,
            activeName: "7",
          },
        });
      }
    },
    // deleteWorkBrifeData(row, index, flag) {
    //   if (flag == "a") {
    //     this.detailInfoData.fdyZpXshjResList.splice(index, 1);
    //   } else if (flag == "b") {
    //     this.detailInfoData.fdyZpXswjResList.splice(index, 1);
    //   }
    // },
    handlUpdata() {
      this.$set(this.detailInfoData, "gh", this.detailInfoData.fdyZpJbqkRes.gh);
      this.$set(this.detailInfoData, "nd", this.nd);
      let data = this.detailInfoData;
      updateFdyZpDetail(data)
        .then((res) => {
          this.$message.success("保存成功");
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: row;

  .detail_left {
    flex: 0 0 120px;
    margin-right: 24px;
    background: #fff;
    // height: calc(100vh - 170px);
    padding: 20px;
    box-sizing: border-box;

    .tab-left {
      padding: 0 40px;
    }
  }
  .detail_right {
    flex: 1;
    background: #fff;
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
      .headline {
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #005657;
        line-height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
