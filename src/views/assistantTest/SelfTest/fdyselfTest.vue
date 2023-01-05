<template>
  <div class="wrap">
    <div class="detail_left">
      <el-tabs v-model="activeName" class="tab_left" tab-position="left">
        <el-tab-pane label="基本情况" name="0"> </el-tab-pane>
        <el-tab-pane label="履职情况" name="1"> </el-tab-pane>
        <el-tab-pane label="个性发展" name="2"> </el-tab-pane>
        <el-tab-pane label="年度总结" name="3"> </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 基本情况 -->
    <div class="detail_right" v-if="activeName == '0'">
      <div class="right_top">
        <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
        <div class="timeWrap">
          <div class="yearOption">
            <el-select
              v-model="nd"
              placeholder="请选择"
              @change="ndChange"
              style="width: 80px"
            >
              <el-option
                v-for="(item, index) in njOptions"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
            ><span>年度</span>
          </div>
          <span class="updataTime"
            >更新时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
        </div>
        <div class="headline">01基本情况</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.xm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.xb }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.csrq }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">入职年限</div>
                  <div class="content" v-if="isEdit == 1">
                    <el-input
                      v-model="detailInfoData.fdyZpJbqkRes.rznx"
                      maxlength="500"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.fdyZpJbqkRes.rznx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">最高学历</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.zgxl }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">类别</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.lx }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">所辖培养层次</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.pycc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">所带学生人数</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.rs }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">听课次数</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.tkcs }}
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="rowStyle">
                <div class="wrap">
                  <div class="title">谈话人次</div>
                  <div class="content">
                    {{ detailInfoData.fdyZpJbqkRes.thrc }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">学工兼职</div>
                  <div class="content" v-if="isEdit == 1">
                    <el-input
                      v-model="detailInfoData.fdyZpJbqkRes.xgjz"
                      maxlength="500"
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
                  <div class="title">其他兼职</div>
                  <div class="content" v-if="isEdit == 1">
                    <el-input
                      v-model="detailInfoData.fdyZpJbqkRes.qtjz"
                      maxlength="500"
                    />
                  </div>
                  <div class="content" v-else>
                    {{ detailInfoData.fdyZpJbqkRes.qtjz }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 履职情况 -->
    <div class="detail_right" v-if="activeName == '1'">
      <div class="right_top">
        <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
        <div class="timeWrap">
          <!-- <div class="yearOption"><el-select></el-select><span>年度</span></div> -->
          <span class="updataTime"
            >更新时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
        </div>
        <div class="headline">02履职情况</div>
        <div class="tableStyle">
          <div class="pieceName">学生教育</div>
          <div class="inputArea">
            <div class="title">晚点名情况（本科）</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.wdmqk"
                :readonly="isEdit == 0"
              />
            </div>
            <div class="title">与学生谈话情况</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.txthqk"
                :readonly="isEdit == 0"
              />
            </div>
            <div class="title">查寝情况</div>
            <div class="content">
              <div class="cishu" v-if="isEdit == 1">
                <el-input
                  style="width: 100px"
                  v-model="detailInfoData.fdyZpJbqkRes.cqcs"
                  oninput="this.value=this.value.replace(/[^\d]/g,'')"
                  placeholder="请输入数字"
                /><span>次</span>
              </div>
              <div class="cishu" v-else>
                <span>{{ detailInfoData.fdyZpJbqkRes.cqcs }}次</span>
              </div>
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.cqqk"
                :readonly="isEdit == 0"
              />
            </div>
            <div class="title">参加学生活动情况</div>
            <div class="content">
              <div class="cishu" v-if="isEdit == 1">
                <el-input
                  style="width: 100px"
                  v-model="detailInfoData.fdyZpJbqkRes.bthdcs"
                  placeholder="请输入数字"
                  oninput="this.value=this.value.replace(/[^\d]/g,'')"
                /><span>次</span>
              </div>
              <div class="cishu" v-else>
                <span>{{ detailInfoData.fdyZpJbqkRes.bthdcs }}次</span>
              </div>
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.bthdqk"
                :readonly="isEdit == 0"
              />
            </div>
            <div class="title">学风教育情况</div>
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.xfjyqk"
                :readonly="isEdit == 0"
              />
            </div>
          </div>
          <div class="pieceName">
            <div>授课情况</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(1)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgJxkyqkList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="kcmc" label="课程名称" />
              <el-table-column prop="ksl" label="课时量"> </el-table-column>
              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pieceName">
            <div>培训情况</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(2)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgXxpxList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="pxmc" label="名称" />
              <el-table-column prop="pxjb" label="级别"> </el-table-column>
              <el-table-column prop="pxmc" label="时长"> </el-table-column>
              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pieceName">
            <div>学生获奖</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(3)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table
              :data="detailInfoData.fdyZpXshjResList"
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="hjxm" label="获奖项目">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.hjxm"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.hjxm }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hjmc" label="获奖名称">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.hjmc"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.hjmc }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hjjb" label="级别">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.hjjb"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.hjjb }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hjdc" label="等次">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.hjdc"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.hjdc }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="hjbz" label="备注">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.hjbz"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.hjbz }}</span>
                </template>
              </el-table-column>
              <el-table-column type="fixed" label="操作" v-if="isEdit == 1">
                <template slot-scope="scope">
                  <div
                    class="deleteBtn"
                    @click="deleteWorkBrifeData(scope.row, scope.$index, 'a')"
                  >
                    <i class="el-icon-close" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pieceName">
            <div>学生违纪</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(4)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table
              :data="detailInfoData.fdyZpXswjResList"
              style="width: 100%"
            >
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="wjqk" label="违纪情况">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.wjqk"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.wjqk }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="wjcf" label="处分">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.wjcf"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.wjcf }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="wjbz" label="备注">
                <template slot-scope="scope">
                  <el-input
                    v-if="isEdit == 1"
                    v-model="scope.row.wjbz"
                    placeholder="请输入"
                  />
                  <span v-else>{{ scope.row.wjbz }}</span>
                </template>
              </el-table-column>
              <el-table-column type="fixed" label="操作" v-if="isEdit == 1">
                <template slot-scope="scope">
                  <div
                    class="deleteBtn"
                    @click="deleteWorkBrifeData(scope.row, scope.$index, 'b')"
                  >
                    <i class="el-icon-close" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 个性发展 -->
    <div class="detail_right" v-if="activeName == '2'">
      <div class="right_top">
        <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
        <div class="timeWrap">
          <!-- <div class="yearOption"><el-select></el-select><span>年度</span></div> -->
          <span class="updataTime"
            >更新时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
        </div>
        <div class="headline">03个人发展</div>
        <div class="tableStyle">
          <div class="pieceName">
            <div>课题研究</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(5)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgXmkyqkList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="xmmc" label="名称" />
              <el-table-column prop="xmjb" label="级别" />
              <el-table-column prop="brwc" label="作者排名" />
              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pieceName">
            <div>论文成果</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(6)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgLwkyqkList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="lwmc" label="题目" />
              <el-table-column prop="qkmc" label="期刊" />

              <el-table-column prop="lwjbm" label="级别">
                <template slot-scope="scope">
                  <div>
                    <el-select
                      v-model="scope.row.lwjbm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item, index) in lwjbmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="brwc" label="作者排名" />
              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pieceName">
            <div>专著书籍</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(7)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgZzkyqkList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="zzmc" label="书名" />
              <el-table-column prop="cbs" label="出版社" />
              <el-table-column prop="brwc" label="作者排名" />
              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
              <!-- <el-table-column type="fixed" label="操作">
                <template slot-scope="scope">
                  <div
                    class="deleteBtn"
                    @click="deleteWorkBrifeData(scope.row, scope.$index, 'c')"
                  >
                    <i class="el-icon-close" />
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="pieceName">职业资质</div>
          <div class="inputArea">
            <!-- <div class="title"></div> -->
            <div class="content">
              <el-input
                type="textarea"
                :rows="5"
                maxlength="500"
                v-model="detailInfoData.fdyZpJbqkRes.zyzz"
                :readonly="isEdit == 0"
              />
            </div>
          </div>
          <div class="pieceName">
            <div>个人获奖</div>
            <div
              class="editBtn"
              @click="addDetailInfoData(8)"
              v-if="isEdit == 1"
            >
              <i class="addIcon" /> 新增
            </div>
          </div>
          <div class="tableArea">
            <el-table :data="detailInfoData.zgJlbzList" style="width: 100%">
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column prop="jxmc" label="名称" />
              <el-table-column prop="jxjb" label="级别" />

              <el-table-column prop="bz" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
                </template>
              </el-table-column>
              <!-- <el-table-column type="fixed" label="操作">
                <template slot-scope="scope">
                  <div
                    class="deleteBtn"
                    @click="deleteWorkBrifeData(scope.row, scope.$index, 'd')"
                  >
                    <i class="el-icon-close" />
                  </div>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 年度总结 -->
    <div class="detail_right" v-if="activeName == '3'">
      <div class="right_top">
        <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
        <div class="timeWrap">
          <!-- <div class="yearOption"><el-select></el-select><span>年度</span></div> -->
          <span class="updataTime"
            >更新时间：{{
              formatDate(detailInfoData.fdyZpJbqkRes.updateTime)
            }}</span
          >
        </div>
        <div class="headline">04年度个人总结</div>
        <div class="tableStyle">
          <el-input
            type="textarea"
            :rows="10"
            maxlength="2000"
            v-model="detailInfoData.fdyZpJbqkRes.ndzj"
            :readonly="isEdit == 0"
          />
        </div>
      </div>
    </div>
    <div class="editBottom" v-show="isEdit == 1">
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
      isEdit: this.$route.query.isEdit ? this.$route.query.isEdit : 1,
      nd: "",
      gh: this.$route.query.gh
        ? this.$route.query.gh
        : this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {},
      njOptions: [],
      lwjbmOps: [],
    };
  },
  created() {},
  mounted() {
    this.getCode("dmlwkwjbm");
    this.getOption();
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
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "7",
          },
        });
      } else if (index == 2) {
        this.$router.push({
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "4",
          },
        });
      } else if (index == 3) {
        this.detailInfoData.fdyZpXshjResList.push({});
      } else if (index == 4) {
        this.detailInfoData.fdyZpXswjResList.push({});
      } else if (index == 5) {
        this.$router.push({
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "7",
          },
        });
      } else if (index == 6) {
        this.$router.push({
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "7",
          },
        });
      } else if (index == 7) {
        this.$router.push({
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "7",
          },
        });
      } else if (index == 8) {
        this.$router.push({
          path: "/politicalwork/detailInfo",
          query: {
            gh: this.$store.getters.userId,
            activeName: "9",
          },
        });
      }
    },
    deleteWorkBrifeData(row, index, flag) {
      if (flag == "a") {
        this.detailInfoData.fdyZpXshjResList.splice(index, 1);
      } else if (flag == "b") {
        this.detailInfoData.fdyZpXswjResList.splice(index, 1);
      }
    },
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
