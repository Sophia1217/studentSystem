<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学学生及家庭情况调查表</p>
        <div class="timeWrap">
          <span class="updataTime"
            >创建时间：{{ formatDate(tableData.createTime) }}</span
          >
          <span class="updataTime"
            >更新时间：{{ formatDate(tableData.updataTime) }}</span
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
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ detailInfoData.dwhmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zydmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ detailInfoData.nj }}
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
                <div class="title">身份证号码</div>
                <div class="content">
                  {{ detailInfoData.sfzjh }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmmc }}
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
                <div class="title">毕业学校</div>
                <div class="content">{{ detailInfoData.byxx }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭人口数</div>
                <div class="content" v-if="isEdit == 1">
                  <el-input-number v-model="tableData.jtRks" :max="100" />
                </div>
                <div class="content" v-else>
                  {{ tableData.jtRks }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本人号码</div>
                <div class="content">
                  {{ detailInfoData.brdh }}
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
                    v-model="tableData.sfdq"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfgcxs"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sflszn"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfnctkjzgy"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfCj"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfdbh"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfjdlkjt"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sfydbhz"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.sffmssldnl"
                    :disabled="isEdit != 1"
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
                    v-model="tableData.jtrjnsr"
                    :min="0"
                    :max="1000000"
                  />
                </div>
                <div class="content" v-else>
                  {{ tableData.jtrjnsr }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">需赡养人数（人）</div>
                <div class="content" v-if="isEdit == 1">
                  <el-input-number
                    v-model="tableData.xsyrs"
                    :min="0"
                    :max="100"
                  />
                </div>
                <div class="content" v-else>
                  {{ tableData.xsyrs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">详细通讯地址</div>
                <div class="content">
                  {{ detailInfoData.jtzz }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">邮政编码</div>
                <div class="content">
                  {{ detailInfoData.jtyzbm }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ detailInfoData.jtdh }}
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
      <div class="tableStyle">
        <el-table :data="jtList" style="width: 100%">
          <el-table-column prop="cyxm" label="姓名" />
          <el-table-column prop="csny" label="出生年月" />
          <el-table-column prop="gx" label="关系" />
          <el-table-column prop="cygzdw" label="工作（学习）单位" />
          <el-table-column prop="zyjszwm" label="职业" />
          <el-table-column prop="nsr" label="年收入（元）">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.nsr"
                :min="0"
                :readonly="isEdit == 2"
              />
            </template>
          </el-table-column>
          <el-table-column prop="jkzk" label="健康状况" />
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
        <!-- <div class="pieceName">学生本学年已获资助情况</div> -->
        <div class="inputArea">
          <div class="title">学生本学年已获资助情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtZz"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">家庭遭受自然灾害情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtZrzh"
              :readonly="isEdit == 2"
            />
          </div>

          <div class="title">家庭遭受突发意外事件</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtTfyw"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">家庭成员因老、病、残而劳动能力弱情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtLdnl"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">家庭成员失业情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtFz"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">家庭负债情况及原因</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtSy"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">其他需要说明的情况</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="500"
              v-model="tableData.jtQt"
              :readonly="isEdit == 2"
            />
          </div>
        </div>
        <div style="padding: 30px">
          <el-checkbox
            v-model="checked"
            label="本人承诺以上所填资料真实，如有虚假，愿承担相应责任"
            :disabled="isEdit == 2"
          />
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
import {
  importUpdateJtqkdc,
  InsertJtList,
  GetDetail,
} from "@/api/familyDifficulties/table";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  data() {
    return {
      isEdit: 2,
      nd: "",
      xh: this.$route.query.XH
        ? this.$route.query.XH
        : this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {},
      jtList: [],
      njOptions: [],
      lwjbmOps: [],
      pxjbmOps: [], //培训级别码
      tableData: {},
      checked: false,
    };
  },
  created() {},
  mounted() {
    this.getCode("dmlwkwjbm");
    this.getCode("dmpxjbm");
    this.getDetail();
  },
  methods: {
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
          case "dmlwkwjbm":
            this.lwjbmOps = res.data;
            break;
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
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
      GetDetail({ xh: this.xh }).then((res) => {
        console.log(res);

        // this.tableData.jt_fz = res.data.addList.jt_fz;
        // this.tableData.jt_ldnl = res.data.addList.jt_ldnl || "";
        // this.tableData.jt_qt = res.data.addList.jt_qt || "";
        // this.tableData.jt_rks = res.data.addList.jt_rks || "";
        // this.tableData.jt_sy = res.data.addList.jt_sy || "";
        // this.tableData.jt_tfyw = res.data.addList.jt_tfyw || "";
        // this.tableData.jt_zrzh = res.data.addList.jt_zrzh || "";
        // this.tableData.jt_zz = res.data.addList.jt_zz || "";
        // this.tableData.jtrjnsr = res.data.addList.jtrjnsr || "";
        // this.tableData.sf_cj = res.data.addList.sf_cj || "";
        // this.tableData.sfdbh = res.data.addList.sfdbh || "";
        // this.tableData.sfdq = res.data.addList.sfdq || "";
        // this.tableData.sffmssldnl = res.data.addList.sffmssldnl || "";
        // this.tableData.sfgcxs = res.data.addList.sfgcxs || "";
        // this.tableData.sfjdlkjt = res.data.addList.sfjdlkjt || "";
        // this.tableData.sflszn = res.data.addList.sflszn || "";
        // this.tableData.sfnctkjzgy = res.data.addList.sfydbhz || "";
        // this.tableData.sfydbhz = res.data.addList.sfydbhz || "";
        // this.tableData.xsyrs = res.data.addList.xsyrs || "";
        // this.tableData.id = res.data.addList.xsyrs || "";
        this.tableData = res.data.addList;

        this.detailInfoData = res.data.jbxx;
        this.jtList = res.data.jtList;
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
    handleCancle() {
      this.isEdit = 2;
    },
    handlUpdata() {
      if (!this.checked) {
        this.$message.error("请勾选承诺协议!");
      } else {
        this.$set(this.tableData, "xh", this.xh);
        this.$set(this.tableData, "xm", this.detailInfoData.xm);
        this.$set(this.tableData, "jtcyList", this.jtList);
        let data = this.tableData;
        // if (this.tableData.id == null) {
        //   InsertJtList(data)
        //     .then((res) => {
        //       this.$message.success("保存成功");
        //       this.getDetail();
        //       this.isEdit = 2;
        //     })
        //     .catch((err) => {});
        // } else {
        InsertJtList(data)
          .then((res) => {
            this.$message.success("保存成功");
            this.getDetail();
            this.isEdit = 2;
          })
          .catch((err) => {});
      }
      //}
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
}
</style>
