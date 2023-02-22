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
                  <el-input v-model="formAdd.yysljfs" v-show="isEdit == 2" maxlength="10"/> 
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
                <div class="content">平均学分绩：{{detailInfoData.pjxfj}} 必修课：{{detailInfoData.bxkms}}门，通过：{{ detailInfoData.bxktgms}}门  成绩排名：{{detailInfoData.cjpm}}  综合排名名次：{{detailInfoData.cjpm}}</div>
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
      <el-form :model="formAdd" ref="formAdd" label-width="110px" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="5">
              <el-form-item label="奖助类别"
                label-width="110px" 
                prop="jzlb"
              >
                <div v-show="isEdit == 1">{{formAdd.jzlbMc}}</div>
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
              <el-form-item label="申请项目"
                label-width="110px" 
                prop="jzlb"
              >
                <div v-show="isEdit == 1">{{formAdd.zzxmmc}}</div>
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
              <el-form-item label="申请等级"
                label-width="110px" 
                prop="jzlb"
              >
                <div v-show="isEdit == 1">{{formAdd.sqdj}}</div>
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
                <div>{{(formAdd.pjxn ||"") + ' ' + (formAdd.pjxqMc ||"")}}</div>
                <!-- <el-input v-model="formAdd.pjxn" v-show="isEdit == 2" readonly/>  -->
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="申请人自述">
              <div v-show="isEdit == 1">{{formAdd.sqrzs}}</div>
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
      
    </div>
    <div v-if="isEdit != 2" class="editBottom">
      <div class="btn cancel" @click="handleBack">返回</div>
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
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
} from "@/api/awardSubsidy/stu";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";

export default {
  data() {
    return {
      businesId: this.$route.query.businesId,
      isEdit: 1, //2编辑，1只读
      nd: "",
      xh: this.$store.getters.userId,
      activeName: "0",
      detailInfoData: {},
      pxjbmOps: [], //培训级别码
      tableData: {},
      pyccflag: 1, //1本科2硕博
      formAdd:{
        yysljfs:"",
        pjxn:"",
        pjxqMc:"",
        jzlbm:"",
        zzxmId:"",
        sqdjId:"",
        sqrzs:"",
      },
      formTable:{
        jxList:[ //奖项
          { jx: "", jxmc:"", bjdw:"" },
        ],
        lwList: [ //论文
          { jx: "", jxmc:"", bjdw:"" },
        ],
        kycgList: [ //科研成果
          { jx: "", jxmc:"", bjdw:"" },
        ],
        shsjList: [ //社会实践
          { jx: "", jxmc:"", bjdw:"" },
        ],
        ddwtList: [ //道德文体
          { jx: "", jxmc:"", bjdw:"" },
        ],
        kycgYanList: [ //科研成果（研）
          { jx: "", jxmc:"", bjdw:"" },
        ],
        hjqkYanList: [ //获奖情况
          { jx: "", jxmc:"", bjdw:"" },
        ],
      },
      jzlbOps:[
        { dm: "1", mc: "奖学金" },
        { dm: "2", mc: "助学金" },
      ], 
      sqdjOps:[],
      zzxmOps:[],
      rules: {
        sqdj: [
          {
            required: true,
            message: "申请等级不能为空",
            trigger: "blur",
          },
        ],
        sqly: [
          {
            required: true,
            message: "申请理由不能为空",
            trigger: "blur",
          },
        ],
        jxdjListRule: [
          {
            required: true,
            message: "奖项不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {

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
      if (this.businesId !=="") {
        //详情
        this.isEdit = 1;
        console.log("id有值");
        getDetail({businesId: this.businesId}).then((res) => {
          this.detailInfoData = res.data;
          this.formAdd = res.data;

          this.getZzxm(this.formAdd.jzlbm);
          this.getSqdj(this.formAdd.zzxmId);
        });
        
      } else{
        this.isEdit = 2;//新增，编辑
        console.log("id空空");
        queryXsInfo({xh: this.$store.getters.userId}).then((res)=>{
          this.detailInfoData = res.data;
        }).catch((err)=>{});
        this.formAdd.pjxn = res.data.pjxn ||"";
        this.formAdd.pjxqMc = res.data.pjxqMc ||"";
      };
    },
    //获取资助项目
    getZzxm(val){
      this.sqdjOps =[];
      queryAllZzxm({jzlbm: val}).then((res) => {
        this.zzxmOps = res.data; 
      });
    },
    //获取等级
    getSqdj(val){
      this.sqdjOps =[];
      queryAllDj({zzxmId: val}).then((res) => {
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
      this.zzxmOps =[];
      this.getZzxm(val);
    },
    //项目
    changeXm(val) {
      this.sqdjOps =[];
      this.getSqdj(val);
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
    .top{
      padding-bottom: 10px;
    }
    .baseline{
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
