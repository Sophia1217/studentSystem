<template>
  <div class="wrap">
    <!-- 基本情况 -->
    <div class="detail_right">
      <div class="right_top">
        <p class="toptitle">华中师范大学奖助学金申请表</p>
      </div>
      <div class="headline">学生本人基本情况</div>
      <div class="tableStyle">
        <!-- 本科基本情况 -->
        <div class="imgWrap" v-if="pyccflag == 1">
          <div class="photo">
            <img
              :src="
                detailInfoData
                  ? 'data:image/png;base64,' + detailInfoData.photo
                  : ''
              "
              alt="照片"
            />
          </div>
        </div>
        <div class="information" v-if="pyccflag == 1">
          <el-row :gutter="20">
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
                  {{ detailInfoData.xbMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">出生年月</div>
                <div class="content">
                  {{ detailInfoData.csny }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">民族</div>
                <div class="content">
                  {{ detailInfoData.mzMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">学院</div>
                <div class="content">
                  {{ detailInfoData.dwMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zyMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">年级</div>
                <div class="content">
                  {{ detailInfoData.nj }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">生源地</div>
                <div class="content">
                  {{ detailInfoData.sydMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">联系电话</div>
                <div class="content">
                  {{ detailInfoData.lxfs }}
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">英语四六级分数</div>
                <div class="content">
                  <div v-show="isEdit == 1">{{ formAdd.yysljfs }}</div>
                  <el-input
                    v-model="formAdd.yysljfs"
                    v-show="isEdit == 2"
                    maxlength="10"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="rowStyle">
              <div class="wrap">
                <div class="title">困难等级</div>
                <div class="content">
                  {{ detailInfoData.kndjMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">本学年学习成绩</div>
                <div class="content">
                  平均学分绩：{{ detailInfoData.pjxfj }} 必修课：{{
                    detailInfoData.bxkms
                  }}门，通过：{{ detailInfoData.bxktgms }}门 成绩排名：{{
                    detailInfoData.cjpm
                  }}
                  综合排名名次：{{ detailInfoData.cjpm }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 研究生基本信息 -->
        <div class="information" v-if="pyccflag == 2">
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">姓名</div>
                <div class="content">
                  {{ detailInfoData.xm }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">学号</div>
                <div class="content">
                  {{ detailInfoData.xh }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">培养单位</div>
                <div class="content">
                  {{ detailInfoData.dwMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">专业</div>
                <div class="content">
                  {{ detailInfoData.zyMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">硕/博</div>
                <div class="content">
                  {{ detailInfoData.pyccMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">性别</div>
                <div class="content">
                  {{ detailInfoData.xbMc }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">导师姓名</div>
                <div class="content">
                  {{ detailInfoData.dsXm }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">导师联系方式</div>
                <div class="content">
                  {{ detailInfoData.dsLxfs }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">政治面貌</div>
                <div class="content">
                  {{ detailInfoData.zzmmMc }}
                </div>
              </div>
            </el-col>
            <el-col :span="10" class="rowStyle">
              <div class="wrap">
                <div class="title">本人联系方式</div>
                <div class="content">
                  {{ detailInfoData.lxfs }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="headline top">申请信息</div>
      <el-form :model="formAdd" ref="formAdd" label-width="110px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item
              label="奖助类别"
              label-width="110px"
              prop="jzlbm"
              :rules="rules.jzlbm"
            >
              <div v-show="isEdit == 1">{{ formAdd.jzlbMc }}</div>
              <el-select
                v-model="formAdd.jzlbm"
                collapse-tags
                v-show="isEdit == 2"
                @change="changeLb"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in jzlbOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="申请项目"
              label-width="110px"
              prop="zzxmId"
              :rules="rules.zzxmId"
            >
              <div v-show="isEdit == 1">{{ formAdd.zzxmmc }}</div>
              <el-select
                v-model="formAdd.zzxmId"
                collapse-tags
                v-show="isEdit == 2"
                @change="changeXm"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in zzxmOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="申请等级"
              label-width="110px"
              prop="sqdjId"
              :rules="rules.sqdjId"
            >
              <div v-show="isEdit == 1">{{ formAdd.sqdj }}</div>
              <el-select
                v-model="formAdd.sqdjId"
                collapse-tags
                v-show="isEdit == 2"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in sqdjOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="评奖周期">
              <div>
                {{ (formAdd.pjxn || "") + " " + (formAdd.pjxqMc || "") }}
              </div>
              <!-- <el-input v-model="formAdd.pjxn" v-show="isEdit == 2" readonly/>  -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请人自述">
              <div v-show="isEdit == 1">{{ formAdd.sqrzs }}</div>
              <el-input
                type="textarea"
                :rows="6"
                maxlength="500"
                v-show="isEdit == 2"
                v-model="formAdd.sqrzs"
                placeholder="请输入申请人自述"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 本学年突出表现 -->
      <div class="headline">
        <div>本学年突出表现</div>
      </div>
      <el-form
        :model="formTable"
        ref="formTable"
        label-width="110px"
        :rules="rules"
      >
        <div class="baseline">
          <div>获奖情况</div>
          <div
            class="editBtn"
            @click="addTableData('获奖情况')"
            v-if="isEdit == 2"
          >
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table
            ref="multipleTable"
            :data="formTable.hjqkList"
            style="width: 100%"
          >
            <el-table-column
              label="获奖日期/发证时间"
              prop="mkRq"
              align="center"
            ></el-table-column>
            <el-table-column
              label="奖项名称/荣誉名称"
              prop="mkMc"
              align="center"
            ></el-table-column>
            <el-table-column
              label="等级"
              prop="mkDj"
              align="center"
            ></el-table-column>
            <el-table-column
              label="颁奖单位/表彰单位"
              prop="mkDw"
              align="center"
            ></el-table-column>
            <el-table-column label="删除选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jian"
                    v-if="isEdit == 2"
                    @click="jian(scope.row, scope.$index, 'hjqk')"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="baseline">
          <div>专著论文</div>
          <div
            class="editBtn"
            @click="addTableData('专著论文')"
            v-if="isEdit == 2"
          >
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table
            ref="multipleTable"
            :data="formTable.zzlwList"
            style="width: 100%"
          >
            <el-table-column
              label="发表(出版)日期"
              prop="mkRq"
              align="center"
            ></el-table-column>
            <el-table-column
              label="著作/论文名称"
              prop="mkMc"
              align="center"
            ></el-table-column>
            <el-table-column
              label="署名顺序"
              prop="mkDj"
              align="center"
            ></el-table-column>
            <el-table-column
              label="刊物名称/出版社"
              prop="mkDw"
              align="center"
            ></el-table-column>
            <el-table-column label="删除选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jian"
                    v-if="isEdit == 2"
                    @click="jian(scope.row, scope.$index, 'zzlw')"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="baseline">
          <div>专利发明</div>
          <div
            class="editBtn"
            @click="addTableData('专利发明')"
            v-if="isEdit == 2"
          >
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table
            ref="multipleTable"
            :data="formTable.zlfmList"
            style="width: 100%"
          >
            <el-table-column
              label="授权日期"
              prop="mkRq"
              align="center"
            ></el-table-column>
            <el-table-column
              label="专利/发明/软著名称"
              prop="mkMc"
              align="center"
            ></el-table-column>
            <el-table-column
              label="署名顺序"
              prop="mkDj"
              align="center"
            ></el-table-column>
            <el-table-column
              label="类型（权力取得方式）"
              prop="mkDw"
              align="center"
            ></el-table-column>
            <el-table-column label="删除选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jian"
                    v-if="isEdit == 2"
                    @click="jian(scope.row, scope.$index, 'zlfm')"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="baseline">
          <div>研究报告</div>
          <div
            class="editBtn"
            @click="addTableData('研究报告')"
            v-if="isEdit == 2"
          >
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table
            ref="multipleTable"
            :data="formTable.yjbgList"
            style="width: 100%"
          >
            <el-table-column
              label="采纳时间"
              prop="mkRq"
              align="center"
            ></el-table-column>
            <el-table-column
              label="报告名称"
              prop="mkMc"
              align="center"
            ></el-table-column>
            <el-table-column
              label="署名顺序"
              prop="mkDj"
              align="center"
            ></el-table-column>
            <el-table-column
              label="采纳单位"
              prop="mkDw"
              align="center"
            ></el-table-column>
            <el-table-column label="删除选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jian"
                    v-if="isEdit == 2"
                    @click="jian(scope.row, scope.$index, 'yjbg')"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="baseline">
          <div>社会实践</div>
          <div
            class="editBtn"
            @click="addTableData('社会实践')"
            v-if="isEdit == 2"
          >
            <i class="addIcon" /> 新增
          </div>
        </div>
        <div class="tableStyle">
          <el-table
            ref="multipleTable"
            :data="formTable.shsjList"
            style="width: 100%"
          >
            <el-table-column
              label="起止日期"
              prop="mkRq"
              align="center"
            ></el-table-column>
            <el-table-column
              label="项目名称"
              prop="mkMc"
              align="center"
            ></el-table-column>
            <el-table-column
              label="服务时长"
              prop="mkDj"
              align="center"
            ></el-table-column>
            <el-table-column
              label="组织单位"
              prop="mkDw"
              align="center"
            ></el-table-column>
            <el-table-column label="删除选项" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom: 20px">
                  <i
                    class="icon jian"
                    v-if="isEdit == 2"
                    @click="jian(scope.row, scope.$index, 'shsj')"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <el-dialog title="新增" :visible.sync="addModal" width="50%">
      <template>
        <div class="mt15">
          <el-table
            :data="tableData"
            ref="multipleTable"
            style="width: 100%"
            :default-sort="{ prop: 'date', order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="mkRq"
              label="模块时间"
              min-width="100"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="mkMc"
              label="模块名称"
              min-width="85"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="mkDj"
              label="模块等级"
              min-width="100"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="mkDw"
              label="模块单位"
              min-width="100"
              sortable
            >
            </el-table-column>
          </el-table>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="addConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div v-if="isEdit != 2" class="editBottom">
      <div class="btn cancel" @click="handleBack">返回</div>
      <div
        class="btn editIcon"
        @click="editButtonClick"
        v-show="status == '01' || status == '08'"
      >
        编辑
      </div>
    </div>
    <div v-if="isEdit == 2" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>
<script>
import {
  getDetail,
  insert,
  queryAllDj,
  queryAllZzxm,
  queryXsInfo,
  queryTcbxList,
  queryDataFromCzda,
  insertDataFromCzda,
  deleteDataFromCzda,
} from "@/api/awardSubsidy/stu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  data() {
    return {
      businesId: "",
      status: "",
      isEdit: 1, //2编辑，1只读
      nd: "",
      xh: "",
      activeName: "0",
      detailInfoData: {},
      pxjbmOps: [], //培训级别码
      tableData: [],
      pyccflag: 1, //1本科2硕博
      formAdd: {
        yysljfs: "",
        pjxn: "",
        pjxqm: "",
        jzlbm: "",
        zzxmId: "",
        sqdjId: "",
        sqrzs: "",
      },
      formTable: {
        hjqkList: [],
        zzlwList: [],
        zlfmList: [],
        yjbgList: [],
        shsjList: [],
      },
      jzlbOps: [
        { dm: "1", mc: "奖学金" },
        { dm: "2", mc: "助学金" },
      ],
      sqdjOps: [],
      zzxmOps: [],
      addModal: false,
      multipleSelection: [],
      bxList: [],
      delModal: false,
      delId:[],
      rules: {
        yysljfs: [
          {
            required: true,
            message: "英语四六级不能为空",
            trigger: "blur",
          },
        ],
        jzlbm: [
          {
            required: true,
            message: "奖助类别不能为空",
            trigger: "change",
          },
        ],
        zzxmId: [
          {
            required: true,
            message: "申请项目不能为空",
            trigger: "change",
          },
        ],
        sqdjId: [
          { required: true, message: "申请等级不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.xh = this.$store.getters.userId;
    this.status = this.$route.query.status;
    this.businesId = this.$route.query.businesId;
    // this.getCode("dmpxjbm");
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
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data).then((res) => {
        switch (paramsData) {
          case "dmpxjbm":
            this.pxjbmOps = res.data;
            break;
        }
      });
    },
    editButtonClick() {
      this.isEdit = 2;
    },
    getDetail() {
      if (this.businesId !== "") {
        //详情
        this.isEdit = 1;
        // console.log("id有值");
        getDetail({ businesId: this.businesId }).then((res) => {
          this.detailInfoData = res.data;
          this.formAdd = res.data;
          console.log("status", this.status);
          this.getZzxm(this.formAdd.jzlbm);
          this.getSqdj(this.formAdd.zzxmId);
        });
      } else {
        this.isEdit = 2; //新增，编辑
        // console.log("id空空");
        queryXsInfo({ xh: this.$store.getters.userId })
          .then((res) => {
            this.detailInfoData = res.data;
          })
          .catch((err) => {});
      }
    },
    //查询突出表现表
    queryTcbxList() {
      var data = {
        xh: this.$store.getters.userId,
        jzsqId: this.formAdd.zzxmId,
        pjxn: this.formAdd.pjxn,
        pjxqm: this.formAdd.pjxqm,
      };
      queryTcbxList(data)
        .then((res) => {
          this.formTable = res.data;
        })
        .catch((err) => {});
    },
    //获取资助项目
    getZzxm(val) {
      this.sqdjOps = [];
      this.zzxmOps = [];
      queryAllZzxm({ jzlbm: val }).then((res) => {
        this.zzxmOps = res.data.zzxmDataCodeList;
        this.formAdd.pjxn = res.data.pjxn || "";
        this.formAdd.pjxqMc = res.data.pjxq || "";
        this.formAdd.pjxqm = res.data.pjxqm || "";
      });
    },
    //获取等级
    getSqdj(val) {
      this.sqdjOps = [];
      queryAllDj({ zzxmId: val }).then((res) => {
        this.sqdjOps = res.data;
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
    handleCancle() {
      this.$router.go(-1);
    },
    handlUpdata() {
      if (!this.checkFormAdd) {
        this.$message.error("请完善表单相关信息!");
      } else {
        let data = {
          yysljfs: this.formAdd.yysljfs,
          jzlbm: this.formAdd.jzlbm,
          zzxmId: this.formAdd.zzxmId,
          sqdjId: this.formAdd.sqdjId,
          sqrzs: this.formAdd.sqrzs,
          pjxn: this.formAdd.pjxn,
          pjxqm: this.formAdd.pjxqm,
          id: this.businesId || "",
        };
        insert(data)
          .then((res) => {
            this.$message.success("保存成功");
            this.$router.go(-1);
          })
          .catch((err) => {});
      }
    },
    //类别
    changeLb(val) {
      this.zzxmOps = [];
      this.sqdjOps = [];
      this.$set(this.formAdd, "zzxmId", "");
      this.$set(this.formAdd, "sqdjId", "");
      this.getZzxm(val);
    },
    //项目
    changeXm(val) {
      this.sqdjOps = [];
      this.$set(this.formAdd, "sqdjId", "");
      this.getSqdj(val);
      this.queryTcbxList();
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("val", val);
      // this.commonParams = this.multipleSelection.map((v) => ({
      //   businesId: v.businesId,
      //   processId: v.processid,
      //   status: v.status,
      //   taskId: v.taskId,
      //   xh: v.xh,
      //   tjdjId: v.tjdjId,
      // }));
    },
    addCancel() {
      this.addModal = false;
    },
    addConfirm() {
      if (this.multipleSelection.length > 0) {
        var params = this.multipleSelection.map((item) => ({
          ...item,
          jzsqId: this.formAdd.zzxmId,
          pjxn: this.formAdd.pjxn,
          pjxqm: this.formAdd.pjxqm,
        }));
        insertDataFromCzda(params)
          .then((res) => {
            this.$message.success("新增成功");
            //查询
            this.addModal = false;
            this.queryTcbxList();
          })
          .catch((err) => {});
      } else {
        this.$message.warning("请勾选数据！");
      }
    },
    forBx(val) {
      this.bxList = [];
      for (var i = 0; i < val.length; i++) {
        this.bxList.push(val[i].czdaId);
      }
    },
    // 新增突出表现
    addTableData(val) {
      if (this.formAdd.zzxmId == "") {
        this.$message.warning("请完善申请信息！");
      } else {
        // var bxList = [];
        switch (val) {
          case "获奖情况":
            // for (var i = 0; i < this.formTable.hjqkList.length; i++) {
            //   bxList.push(this.formTable.hjqkList[i].jzsqId);
            // };
            this.forBx(this.formTable.hjqkList);
            break;
          case "专著论文":
            // for (var i = 0; i < this.formTable.zzlwList.length; i++) {
            //   bxList.push(this.formTable.zzlwList[i].jzsqId);
            // }
            this.forBx(this.formTable.zzlwList);
            break;
          case "专利发明":
            // for (var i = 0; i < this.formTable.zlfmList.length; i++) {
            //   bxList.push(this.formTable.zlfmList[i].jzsqId);
            // };
            this.forBx(this.formTable.zlfmList);
            break;
          case "研究报告":
            // for (var i = 0; i < this.formTable.yjbgList.length; i++) {
            //   bxList.push(this.formTable.yjbgList[i].jzsqId);
            // };
            this.forBx(this.formTable.yjbgList);
            break;
          case "社会实践":
            // for (var i = 0; i < this.formTable.shsjList.length; i++) {
            //   bxList.push(this.formTable.shsjList[i].jzsqId);
            // };
            this.forBx(this.formTable.shsjList);
            break;
        }
        this.addModal = true;

        var data = {
          czdaIdList: this.bxList,
          mkType: val,
          xh: this.xh,
          pjxn: this.formAdd.pjxn || "",
          pjxqm: this.formAdd.pjxqm || "",
        };
        queryDataFromCzda(data)
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {});
      }
    },
    del() {
      deleteDataFromCzda({idList: this.delId}).then((res) => {
        this.queryTcbxList();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    jian(row, index, flag) {
      this.delModal = true;
      this.delId = [row.id];
      console.log(row.id);
      // if (flag && flag == "hjqk") {
      //   if (this.formTable.hjqkList.length > 1) {
      //     this.delModal = true;
      //     this.delId = [row.id];
      //   } else {
      //     this.$message.error("至少保留一个题目");
      //   }
      // } else if (flag && flag == "zzlw") {
      //   if (this.formTable.zzlwList.length > 1) {
      //     this.formTable.zzlwList.splice(index, 1);
      //   } else {
      //     this.$message.error("至少保留一个题目");
      //   }
      // } else if (flag && flag == "zlfm") {
      //   if (this.formTable.zlfmList.length > 1) {
      //     this.formTable.zlfmList.splice(index, 1);
      //   } else {
      //     this.$message.error("至少保留一个题目");
      //   }
      // } else if (flag && flag == "yjbg") {
      //   if (this.formTable.yjbgList.length > 1) {
      //     this.formTable.yjbgList.splice(index, 1);
      //   } else {
      //     this.$message.error("至少保留一个题目");
      //   }
      // } else if (flag && flag == "shsj") {
      //   if (this.formTable.shsjList.length > 1) {
      //     this.formTable.shsjList.splice(index, 1);
      //   } else {
      //     this.$message.error("至少保留一个题目");
      //   }
      // }
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
    }
    .top {
      padding-bottom: 10px;
    }
    .baseline {
      padding-left: 20px;
      padding-top: 10px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 16px;
      color: #000;
      line-height: 20px;
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
.jia {
  margin-top: 9px;
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
</style>
