<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学学生及家庭情况调查表</p>
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
      <div class="tableStyle">
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
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">曾用名</div>
                <div class="content">
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ detailInfoData.dwhmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭出身</div>
                <div class="content">
                  {{ detailInfoData.zydmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">本人成分</div>
                <div class="content">
                  {{ detailInfoData.nj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">籍贯</div>
                <div class="content">
                  {{ detailInfoData.csrq }}
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">民族</div>
                <div class="content">
                  {{ detailInfoData.jgmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">现在家庭住址</div>
                <div class="content">
                  {{ detailInfoData.sfzjh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">是否华侨侨居何处</div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    v-model="detailInfoData.sfzjh"
                    maxlength="100"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">本人身体健康状况</div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    v-model="detailInfoData.sfzjh"
                    maxlength="100"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">何时何地何人介参加共产党或共青团</div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="detailInfoData.sfzjh"
                    maxlength="500"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">
                  婚否？对方姓名、政治面貌、现在何处、任何处
                </div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="detailInfoData.sfzjh"
                    maxlength="500"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">家庭经济情况及主要经济来源</div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="detailInfoData.sfzjh"
                    maxlength="500"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">何时何地因何原因受过何种奖励或处分</div>
                <div class="content" v-if="isEdit != 1">
                  {{ detailInfoData.sfzjh }}
                </div>
                <div class="content" v-else>
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="detailInfoData.sfzjh"
                    maxlength="500"
                    style="width: 300%"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 家庭成员信息 -->
      <div class="headline">
        <div>学习经历</div>
        <div class="editBtn" @click="addDetailInfoData(1)" v-if="isEdit == 1">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableStyle">
        <el-table :data="jtList" style="width: 100%">
          <el-table-column prop="nsr" label="自何年何月起至何年何月止">
            <template slot-scope="scope">
              <div v-if="isEdit != 1">{{ scope.row.nsr }}</div>
              <div v-else>
                <el-date-picker
                  v-model="scope.row.nsrscope.row.nsr"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  clearable
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="bz"
            label="在何地、何校（或单位）学习（或任何职）"
          >
            <template slot-scope="scope">
              <div v-if="isEdit != 1">{{ scope.row.nsr }}</div>
              <div v-else>
                <el-input
                  v-model="scope.row.bz"
                  placeholder="请输入"
                  maxlength="100"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="证明人 现在何处">
            <template slot-scope="scope">
              <div v-if="isEdit != 1">{{ scope.row.nsr }}</div>
              <div v-else>
                <el-input
                  v-model="scope.row.bz"
                  placeholder="请输入"
                  maxlength="100"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 影响家庭经济状况相关信息 -->
      <!-- <div class="headline">影响家庭经济状况相关信息</div> -->
      <div class="tableStyle">
        <!-- <div class="pieceName">学生本学年已获资助情况</div> -->
        <div class="inputArea">
          <div class="title">
            家庭主要成员和主要社会关系，他们的姓名、年龄，在何地、何单位、任何职，政治面貌，现在与本人的关系如何
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtZz"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">
            家庭主要成员和主要社会关系中有无被杀、关、管的，与本人关系如何
          </div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtZrzh"
              :readonly="isEdit == 2"
            />
          </div>

          <div class="title">自我鉴定</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="1500"
              show-word-limit
              v-model="tableData.jtTfyw"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">班组鉴定</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="1500"
              show-word-limit
              v-model="tableData.jtLdnl"
              placeholder="班主任审核时需要填写"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">院系党组织意见</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="5"
              maxlength="1500"
              show-word-limit
              v-model="tableData.jtFz"
              placeholder="院系审核时需要填写"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">毕业论文题目或毕业设计</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtSy"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">有何特长</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtQt"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">懂何种外语、程度如何</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtQt"
              :readonly="isEdit == 2"
            />
          </div>
          <div class="title">本人工作意愿</div>
          <div class="content">
            <el-input
              type="textarea"
              :rows="3"
              maxlength="500"
              show-word-limit
              v-model="tableData.jtQt"
              :readonly="isEdit == 2"
            />
          </div>
        </div>
        <div style="padding: 30px"></div>
      </div>
    </div>

    <!-- <div class="editBottom" v-show="isEdit == 1">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div> -->
    <div v-if="isEdit != 1" class="editBottom">
      <div class="btn cancel" @click="handleBack">审核记录</div>
      <div class="btn cancel" @click="handleBack">返回</div>
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
      xh: this.$store.getters.userId,
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
    handleBack() {
      this.$router.go(-1);
    },
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
