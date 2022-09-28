<template>
  <div class="eduAdd">
    <div class="contextDetail">
      <div class="headTop">
        <div class="headight">
          <span class="title">主题教育详情</span>
        </div>
      </div>
      <div class="detailForm">
        <el-form
          :model="eduDetailForm"
          ref="queryForm2"
          size="small"
          :inline="true"
          label-width="68px"
        >
          <el-row :gutter="10">
            <el-col :span="3.5"
              ><el-form-item label="教育主题">
                <el-input
                  v-model="eduDetailForm.jyzt"
                  clearable
                /> </el-form-item
            ></el-col>
            <el-col :span="4"
              ><el-form-item label="关键词">
                <el-input
                  v-model="eduDetailForm.keyword"
                  clearable
                /> </el-form-item
            ></el-col>

            <el-col :span="12">
              <span class="tagtitle">常用关键词</span>
              <el-tag
                v-for="(item, i) in tags.themeTags"
                :key="i"
                @click="pushData(item, 1)"
                closable
                @close="handleClose(item)"
              >
                {{ item.cyMsg }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(1)"
              >
              </el-input>
              <el-button
                icon="el-icon-plus"
                style="margin-left: 15px"
                @click="showInput(1)"
                >新增常用关键词</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="教育对象">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-select
                    v-model="eduDetailForm.xy"
                    placeholder="学院（必选）"
                    @change="xyChange"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in xyOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="eduDetailForm.pycc"
                    placeholder="培养层次"
                    @change="changePYCC"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in pyccOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select
                    v-model="eduDetailForm.nj"
                    placeholder="年级"
                    @change="xyChange"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in njOptions"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="eduDetailForm.zy"
                    :disabled="this.eduDetailForm.bj != '' ? true : false"
                    placeholder="专业(请先选择学院和培养层次)"
                    @change="bjChange"
                    clearable
                    multiple
                    style="width: 250px"
                  >
                    <el-option
                      v-for="(item, index) in zyOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="eduDetailForm.bj"
                    placeholder="班级(请先选择学院和培养层次)"
                    :disabled="this.eduDetailForm.zy != '' ? true : false"
                    @change="bjChange"
                    clearable
                    style="width: 250px"
                    multiple
                  >
                    <el-option
                      v-for="(item, index) in bjOptions"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select> </el-col
              ></el-row>
            </el-form-item>
            <el-form-item label="其他">
              <el-input v-model="eduDetailForm.other"></el-input
            ></el-form-item>
            <el-form-item label="人数">
              <el-input v-model="eduDetailForm.peopleNum"></el-input
            ></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="开展时间"
              ><el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="eduDetailForm.beginDate"
              />
            </el-form-item>
            <el-form-item label="开始时间">
              <el-time-picker v-model="eduDetailForm.beginTime"
            /></el-form-item>
            <el-form-item label="结束时间">
              <el-time-picker v-model="eduDetailForm.endTime"
            /></el-form-item>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form-item label="开展地点">
                <el-input v-model="eduDetailForm.place"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <span class="tagtitle">常用地点</span>

              <el-tag
                v-for="(item, i) in tags.addressTags"
                :key="i"
                closable
                @click="pushData(item, 2)"
                @close="handleClose(item)"
              >
                {{ item.cyMsg }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible1"
                v-model="inputValue1"
                ref="saveTagInput1"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(2)"
              >
              </el-input>
              <el-button
                icon="el-icon-plus"
                style="margin-left: 15px"
                @click="showInput(2)"
                >新增常用地点</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="活动资料" prop="activity"> </el-form-item>
            <el-upload
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              class="el-upload"
            >
              <div class="el-upload-dragger">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <em>点击</em>或<em>拖拽</em>上传附件
                </div>
                <div class="el-upload__text">
                  支持格式：PNG、JPG、WORD、PDF、PPT、ZIP或RAR等主流格，压缩包10M以内，图片2M以内
                </div>
              </div>
            </el-upload>
          </el-row>
        </el-form>
      </div>
    </div>

    <div class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handleUpdata">保存</div>
    </div>
  </div>
</template>
<script>
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
import { addDetail, getMajor, getNum } from "@/api/assistantWork/themeEdu";
import {
  classList,
  getCollege,
  getLevel,
  getGrade,
} from "@/api/class/maintenanceClass"; // 引入班级列表查询、修改班级名称接口

export default {
  name: "eduAdd",

  data() {
    return {
      tags: {
        themeTags: [],
        addressTags: [],
      },

      inputVisible: false,
      inputValue: "",
      inputVisible1: false,
      inputValue1: "",
      date: "",
      // defaultValue1: null,
      // defaultValue2: null,

      xyOptions: [],
      pyccOptions: [],
      njOptions: [],
      zyOptions: [],
      bjOptions: [],

      eduDetailForm: {
        jyzt: "",
        keyword: "",
        xy: "",
        pycc: "",
        nj: "",
        zy: [],
        bj: [],
        other: "",
        peopleNum: "",
        place: "",
        beginDate: "",
        beginTime: "",
        endTime: "",
      },
      classList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.dafaultValue1 = new Date();
    // this.dafaultValue2 = new Date();
    // this.dafaultValue1.setHours(18);
    // this.dafaultValue2.setMinutes(20);
  },
  mounted() {
    this.queryTag();

    this.eduDetailForm.beginDate = new Date();
    //   this.transTime(new Date());
    this.eduDetailForm.beginTime = new Date(0, 0, 0, 18, 0, 0);
    this.eduDetailForm.endTime = new Date(0, 0, 0, 20, 0, 0);

    // this.eduDetailForm.beginTime = timeobj.setHours(18, 0, 0);
    // this.eduDetailForm.endTime = timeobj.setHours(20, 0, 0);
    //教育对象
    this.getOptions();
  },

  methods: {
    //取消按钮
    handleCancle() {
      this.$router.push({
        path: "/assistantWork/themeEdu",
        query: {},
      });
    },
    //保存按钮
    handleUpdata() {
      var bjstr = "";
      var zystr = "";

      zystr = this.eduDetailForm.zy ? this.eduDetailForm.zy.join() : "";
      bjstr = this.eduDetailForm.bj ? this.eduDetailForm.bj.join() : "";
      let data = {
        gjc: this.eduDetailForm.keyword,
        hddd: this.eduDetailForm.place,
        hdjssj: this.eduDetailForm.endTime,
        hdksrq: this.eduDetailForm.beginDate,
        hdkssj: this.eduDetailForm.beginTime,
        hdrs: this.eduDetailForm.peopleNum,
        jyzt: this.eduDetailForm.jyzt,
        pycc: this.eduDetailForm.pycc,
        // ssbj: this.eduDetailForm.bj,
        ssbj: bjstr,
        ssdwdm: this.eduDetailForm.xy,
        ssnj: this.eduDetailForm.nj,
        ssxz: this.eduDetailForm.other,
        // sszy: this.eduDetailForm.zy,
        sszy: zystr,
        //userId: this.$store.getters.userId,
      };
      //console.log("shijian", data.hdjssj, data.hdksrq);
      addDetail(data)
        .then(() => {
          this.$router.push({
            path: "/assistantWork/themeEdu",
          });
        })
        .catch((err) => {});
    },
    transTime(date) {
      var min = date.getMinutes();
      date.setMinutes(min - 30);
      this.eduDetailForm.beginTime = date;
    },

    handleInputConfirm(type) {
      if (type == 1) {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.inputValue;
        addTag(obj).then((res) => {
          this.queryTag();
        });
        this.inputVisible = false;
        this.inputValue = "";
      } else {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.inputValue1;
        addTag(obj).then((res) => {
          this.queryTag();
          this.inputVisible1 = false;
          this.inputValue1 = "";
        });
      }
    },
    queryTag() {
      var data = {
        cyType: "1", //1主题,2地点,3组织单位
        userId: this.$store.getters.userId,
      };
      var data1 = {
        cyType: "2", //1主题,2地点,3组织单位
        userId: this.$store.getters.userId,
      };
      queryTag(data).then((res) => {
        this.$set(this.tags, "themeTags", res.data);
      });
      queryTag(data1).then((res) => {
        this.$set(this.tags, "addressTags", res.data);
      });
    },
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    showInput(type) {
      if (type == 1) {
        this.inputVisible = true;
      } else {
        this.inputVisible1 = true;
      }
    },
    pushData(item, type) {
      if (type == 1) {
        if (this.eduDetailForm.keyword == "") {
          this.eduDetailForm.keyword = this.eduDetailForm.keyword + item.cyMsg;
        } else {
          this.eduDetailForm.keyword =
            this.eduDetailForm.keyword + "," + item.cyMsg;
        }
      } else {
        if (this.eduDetailForm.place == "") {
          this.eduDetailForm.place = this.eduDetailForm.place + item.cyMsg;
        } else {
          this.eduDetailForm.place =
            this.eduDetailForm.place + "," + item.cyMsg;
        }
      }
    },
    getOptions() {
      getCollege().then((response) => {
        // 获取培养单位列表数据
        if (response.errcode == "00") {
          this.xyOptions = response.data.rows;
        }
      });
      getLevel().then((response) => {
        // 获取培养层次列表数据
        if (response.errcode == "00") {
          this.pyccOptions = response.data.rows;
        }
      });
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOptions = response.data.rows;
        }
      });
    },

    //查询班级
    getBj(val) {
      this.bjOptions = [];
      this.zyOptions = [];
      let pyccList = [];
      let ssdwdmList = [];
      let ssnjList = [];
      if (this.eduDetailForm.xy != "" && this.eduDetailForm.pycc != "") {
        ssdwdmList.push(this.eduDetailForm.xy);
        // ssnjList.push(this.eduDetailForm.nj);
        pyccList.push(this.eduDetailForm.pycc);
      }
      if (this.eduDetailForm.nj != "") {
        ssnjList.push(this.eduDetailForm.nj);
      }
      let data = {
        pageNum: 1, // 默认请求第一页数据
        pageSize: 10, // 默认一页10条数据
        ssdwdmList: ssdwdmList, // 培养单位
        pyccList: pyccList, // 培养层次
        ssnjList: ssnjList, // 年级
        bjmc: "", //班级名称
        orderField: "", //
        orderType: "",
      };
      let query = {
        dwh: ssdwdmList, // 培养单位
        pycc: pyccList, // 培养层次
      };

      //获取专业

      getMajor(query).then((response) => {
        this.zyOptions = response.data;
      });

      classList(data).then((response) => {
        // 获取班级列表数据
        if (response.errcode == "00") {
          this.classList = response.data.rows; // 根据状态码接收数据
          //console.log("班级", this.classList);

          for (var i = 0; i < this.classList.length; i++) {
            let bj = { dm: "", mc: "" };
            bj.dm = this.classList[i].bjdm;
            bj.mc = this.classList[i].bjmc;
            //console.log(bj);
            this.bjOptions.push(bj);
          }
          //console.log("班级选项", this.bjOptions);
        }
      });
    },

    //查人数
    getPeopleNum() {
      let Opt = {
        gjc: "",
        hddd: "",
        hdjssj: "",
        hdksrq: "",
        hdkssj: "",
        hdrs: "",
        id: "",
        jlrlx: "",
        jlrssdw: "",
        jlrxm: "",
        jydx: "",
        jyzt: "",
        pycc: this.eduDetailForm.pycc, //培养层次
        sfyx: "",
        ssbjList: this.eduDetailForm.bj, //班级
        ssdwdm: this.eduDetailForm.xy, //学院
        ssdwmc: "",
        ssnj: this.eduDetailForm.nj,
        ssxz: "",
        sszyList: this.eduDetailForm.zy, //专业
        updateTime: "",
        userId: "",
        ztm: "",
      };
      getNum(Opt).then((response) => {
        this.eduDetailForm.peopleNum = response;
      });
    },
    changePYCC() {
      //console.log("pycc", this.pyccval);
      if (this.eduDetailForm.xy == "" || this.eduDetailForm.pycc == "") {
        this.eduDetailForm.zy = []; // 专业
        this.eduDetailForm.bj = []; // 班级
        console.log("列表是否空");
        this.bjOptions = [];
        this.zyOptions = [];
      } else {
        this.getBj();
      }
      this.getPeopleNum();
    },
    //学院培养层次改变
    xyChange() {
      if (this.eduDetailForm.pycc != "") {
        this.getBj();
        console.log("是否为空");
      }
      this.getPeopleNum();
    },

    //专业和班级改变
    bjChange() {
      this.getPeopleNum();
    },
  },
};
</script>
<style lang="scss" scoped>
.eduAdd {
  background: #fff;
  .contextDetail {
    padding: 20px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    .headTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .headRight {
        display: flex;
        align-items: center;
        .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
      }
    }
    .detailForm {
      margin-top: 20px;
    }
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .title {
    //text-align: center;
    color: #1f1f1f;
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
    padding-top: 10px;
  }
  ::v-deep .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 210px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-tag {
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    margin-left: 18px;
    font-size: 12px;
    color: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    ::v-deep .el-tag__close {
      color: #303133;
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
  }
  .tagtitle {
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    line-height: 32px;
    font-weight: 700;
  }
}
</style>
