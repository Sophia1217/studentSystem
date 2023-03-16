<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">应征入伍服兵役高等学校学生 国家教育资助申请表</p>
      </div>

      <!-- 学生本人基本情况 -->
      <div class="headline">学生本人基本情况</div>
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
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ detailInfoData.csrq }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">身份证号</div>
                <div class="content">
                  {{ detailInfoData.sfzjh }}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">院系</div>
                <div class="content">
                  {{ detailInfoData.dwhmc }}
                </div>
              </div>
            </el-col>

            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zydmmc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">班级</div>
                <div class="content">
                  {{ detailInfoData.xbmmc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">现住址</div>
                <div class="content">
                  <el-input
                    v-model="detailInfoData.csrq"
                    maxlength="100"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  <el-input
                    v-model="detailInfoData.lxdh"
                    maxlength="100"
                  ></el-input>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16" class="rowStyle">
              <div class="wrap">
                <div class="title">就读高校</div>
                <div class="content">
                  <el-input
                    v-model="detailInfoData.csrq"
                    maxlength="100"
                  ></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">高校隶属关系</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.sfdq"
                    :disabled="isEdit != 1"
                  >
                    <el-radio label="中央" size="large">中央</el-radio>
                    <el-radio label="地方" size="large">地方</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 申请类型 -->
      <div class="headline">
        <div>申请类型</div>
      </div>

      <div class="tableStyle">
        <div class="inputArea" style="margin-bottom: 20px">
          <el-radio-group v-model="detailInfoData.sfdq" :disabled="isEdit != 1">
            <el-radio label="复学" size="large">退役复学</el-radio>
            <el-radio label="入学" size="large">退役入学</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 申请补偿或代偿 -->
      <div class="headline">
        <div>申请补偿或代偿</div>
      </div>

      <div class="tableStyle">
        <div class="inputArea" style="margin-bottom: 20px">
          <el-radio-group v-model="detailInfoData.sfdq" :disabled="isEdit != 1">
            <el-radio label="复学" size="large">学费补偿</el-radio>
            <el-radio label="入学" size="large">国家助学贷款代偿</el-radio>
          </el-radio-group>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">应缴纳学费金额总计（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">高校国家助学贷款本金（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">生源地信用助学贷款本金（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 就学和服役情况 -->
      <div class="headline">就学和服役情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">考入本校年月</div>
                <div class="content">
                  <el-date-picker
                    type="date"
                    v-model="detailInfoData.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">参加何种考试考入</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">服役前最高学历</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">入伍时间</div>
                <div class="content">
                  <el-date-picker
                    type="date"
                    v-model="detailInfoData.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">退役时间</div>
                <div class="content">
                  <el-date-picker
                    type="date"
                    v-model="detailInfoData.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">复学时间</div>
                <div class="content">
                  <el-date-picker
                    type="date"
                    v-model="detailInfoData.gwTime"
                    value-format="yyyy-MM-dd"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">现阶段就读学历层次</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="titlesmall">考入本校前是否享受过本政策资助</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.sfdq"
                    :disabled="isEdit != 1"
                  >
                    <el-radio label="1" size="large">是</el-radio>
                    <el-radio label="2" size="large">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">是否自主就业</div>
                <div class="content">
                  <el-radio-group
                    v-model="detailInfoData.sfdq"
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
      <!-- 申请学费减免情况 -->
      <div class="headline">申请学费减免情况</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学制年限</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">剩余就读年限</div>
                <div class="content">
                  <el-input v-model="detailInfoData.xm" maxlength="10" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">申请减免总计（元）</div>
                <div class="content">{{}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第一学年</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  <el-input v-model="detailInfoData.gwTime" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第二学年</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  <el-input v-model="detailInfoData.gwTime" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第三学年</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  <el-input v-model="detailInfoData.gwTime" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第四学年</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  <el-input v-model="detailInfoData.gwTime" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">第五学年</div>
                <div class="content">
                  <el-select v-model="detailInfoData.xm">
                    <el-option
                      v-for="(item, index) in sqlbOps"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学费（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">备注</div>
                <div class="content">
                  <el-input v-model="detailInfoData.gwTime" maxlength="100" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 历史缴纳学费信息 -->
      <div class="headline">历史缴纳学费信息</div>
      <div class="tableStyle">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">应缴纳学费金额（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">实际缴纳学费金额（元）</div>
                <div class="content">
                  <el-input-number
                    v-model="detailInfoData.xm"
                    :min="0"
                    :max="99999999"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 历史贷款信息 -->
      <div class="headline">历史贷款信息</div>
      <div class="tableStyle" style="margin-bottom: 20px">
        <div class="information">
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款学年</div>
                <div class="content"></div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款总金额（元）</div>
                <div class="content"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款类型</div>
                <div class="content"></div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款银行</div>
                <div class="content"></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">合同编号</div>
                <div class="content"></div>
              </div>
            </el-col>

            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">贷款开始时间</div>
                <div class="content"></div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div v-if="isEdit != 1" class="editBottom">
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
      sqlbOps: [], //培训级别码
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
            this.sqlbOps = res.data;
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
    jia(row, index) {
      var obj = {
        jx: "",
        je: 0,
        px: Number(this.detailInfoData.jxdjList.length) + 1,
      };
      this.detailInfoData.jxdjList.push(obj);
    },
    jian(row, index) {
      this.detailInfoData.jxdjList.splice(index, 1);
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
          .titlesmall {
            flex: 0 0 200px;
            line-height: 24px;
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
          .jia {
            margin-top: 9px;
            background: url("~@/assets/images/jia.png") no-repeat;
          }

          .jian {
            margin-top: 9px;
            background: url("~@/assets/images/jian.png") no-repeat;
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
