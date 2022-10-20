<template>
  <div class="addRole">
    <div style="background-color: white; margin-top: 20px; padding: 24px">
      <div style="margin-bottom: 20px">
        <span class="titleTop">记录人员</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="5">
            申请人工号：<el-input
              v-model="defaultForm.jlrgh"
              :disabled="true"
              style="width: 200px"
            ></el-input>
          </el-col>
          <el-col :span="4">
            姓名 :<el-input
              v-model="defaultForm.jlrxm"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            单位:
            <el-input
              v-model="defaultForm.jlrssdw"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            岗位:<el-input
              v-model="defaultForm.jlrgw"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            类型:<el-input
              v-model="defaultForm.jlrlx"
              :disabled="true"
              style="width: 200px"
            ></el-input
          ></el-col>
        </el-row>
      </div>
    </div>
    <div class="permissions1">
      <div class="headTop">
        <div class="headRight">
          <span class="title">课程详情</span>
        </div>
      </div>
      <el-form ref="Form" label-width="80px" v-model="Form">
        <el-form-item
          label="任课教师
        "
        >
          <el-row>
            <el-col :span="5.5">
              <el-autocomplete
                v-model="Form.rkls"
                :fetch-suggestions="querySearch"
                placeholder="请输入任课教师"
                :trigger-on-focus="false"
                style="width: 250px"
                @select="
                  (item) => {
                    handleSelect(item);
                  }
                "
                size="small"
              ></el-autocomplete>
            </el-col>
            <el-col :span="2.5">
              <el-button
                style="background: #005657; color: white; margin-left: 10px"
                @click="classQuery"
                >课程查询</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <div style="display: flex">
          <el-form-item
            label="课堂名称
        "
          >
            <el-input size="small" v-model="Form.ktmc"> </el-input>
          </el-form-item>
          <el-form-item
            label="编号
        "
          >
            <el-input size="small" v-model="Form.bh"> </el-input>
          </el-form-item>
        </div>
        <el-form-item label="开课时间">
          <el-row>
            <el-col :span="4">
              <el-select v-model="Form.xq" placeholder="星期">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="Form.jsBegin" placeholder="请选择开始节数">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span>-</span>
              <el-select v-model="Form.jsEnd" placeholder="请选择结束节数">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input
                placeholder="请输入开始到结束的周"
                size="small"
                v-model="Form.week"
                style="width: 240px"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="授课时间">
          <el-date-picker
            v-model="Form.sksj"
            type="date"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="授课教室">
          <el-input size="small" v-model="Form.skjs" style="width: 240px">
          </el-input>
        </el-form-item>
        <el-form-item label="听课情况">
          <el-input
            size="small"
            v-model="Form.tkqk"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="请输入内容"
            maxlength="2000"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件">
          <el-upload
            drag
            action="#"
            multiple
            :file-list="Form.fileList"
            :auto-upload="false"
            class="el-upload"
            :before-remove="beforeRemove"
            :on-change="change"
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
        </el-form-item>
      </el-form>
    </div>
    <div class="p2">
      <el-button
        style="background: #005657; color: white; margin-left: 10px"
        @click="saveListen"
        >保存</el-button
      >
      <el-button>取消</el-button>
    </div>
    <el-dialog title="课程查询" :visible.sync="dialogFormVisible">
      <el-form v-model="queryParams" :inline="true">
        <el-form-item label="任课教师" prop="jsxx">
          <el-input
            v-model="queryParams.jsxx"
            placeholder="请输入任课教师"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="sjm">
          <el-select v-model="queryParams.xnm" placeholder="学年" size="small">
            <el-option
              v-for="(item, index) in njOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" prop="xqm">
          <el-select
            v-model="queryParams.xqm"
            collapse-tags
            placeholder="请选择学期"
            size="small"
          >
            <el-option
              v-for="item in xqList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> </el-select
        ></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal(form)">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getXmXgh,
  getGrade,
  FdyKcxxPageList,
  getDetail,
} from "@/api/assistantWork/listen";
export default {
  data() {
    return {
      dialogFormVisible: false,
      queryParams: {
        jsxx: "",
        xqm: "",
        xnm: "",
      },
      options: [
        {
          value: "星期一",
          label: "星期一",
        },
        {
          value: "星期二",
          label: "星期二",
        },
        {
          value: "星期三",
          label: "星期三",
        },
        {
          value: "星期四",
          label: "星期四",
        },
        {
          value: "星期五",
          label: "星期五",
        },
        {
          value: "星期六",
          label: "星期六",
        },
        {
          value: "星期天",
          label: "星期天",
        },
      ],
      xqList: [
        {
          value: "3",
          label: "第一学期",
        },
        {
          value: "12",
          label: "第二学期",
        },
        {
          value: "16",
          label: "第三学期",
        },
      ],
      njOptions: [],
      options1: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
      ],
      Form: {
        fileList: [],
        rkls: "",
        ktmc: "",
        bh: "",
        kksj: "",
        week: "",
        jsBegin: "",
        jsEnd: "",
        xq: "",
        sksj: "",
        skjs: "",
        tkqk: "",
      },
      defaultForm: {
        jlrgh: "",
        jlrxm: "",
        jlrssdw: "",
        jlrgw: "",
        jlrlx: "",
      },
      lgnSn: "",
    };
  },

  mounted() {
    this.lgnSn = this.$route.query.id;
    this.getYears();
    this.getDetail();
  },

  methods: {
    getDetail() {
      getDetail({ id: this.lgnSn }).then((res) => {
        this.defaultForm.jlrgh = res.data.jlrgh;
        this.defaultForm.jlrxm = res.data.jlrxm;
        this.defaultForm.jlrlx = res.data.jlrlx;
        this.defaultForm.jlrssdw = res.data.jlrssdw;
        this.defaultForm.jlrgw = res.data.jlrgw;
        this.Form.rkls = "";
        this.Form.ktmc = "";
        this.Form.bh = res.data.kcbh;
        this.Form.kksj = "";
        this.Form.week = res.data.kckksj;
        this.Form.jsBegin = "";
        this.Form.jsEnd = "";
        this.Form.xq = res.data.kckksj;
        this.Form.sksj = res.data.kcsksj;
        this.Form.skjs = res.data.jxdd;
        this.Form.tkqk = res.data.tkqk;
      });
    },
    FdyKcxxPageList() {
      console.log("12");
      FdyKcxxPageList(this.queryParams).then((res) => {
        console.log("res", res);
      });
    },
    getYears() {
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOptions = response.data.rows;
        }
      });
    },
    classQuery() {
      this.dialogFormVisible = true;
      this.FdyKcxxPageList();
    },
    change(file, fileList) {
      //用于文件先保存
      const ind = file.name.lastIndexOf(".");
      const ext = file.name.substr(ind + 1);
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        ["jpe", "jpeg", "jpg", "png"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("图片大小不超过2M,上传失败");
      } else if (
        Number(file.size / 1024 / 1024) > 10 &&
        ["zip", "pdf", "word", "ppt"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("常见文件格式大小不超过10M,上传失败");
      } else if (
        Number(file.size / 1024 / 1024) > 50 &&
        ["mp3", "mp4", "mpe", "mpeg", "mpg"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("视频大小不超过50M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 50) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("文件大小不超过50M,上传失败");
      } else {
        this.fileListAdd.push(file);
      }
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      //用于文件删除
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res.data;
          resultNew = result.map((ele) => {
            return {
              value: `${ele.xm}(${ele.gh})`.trim(),
              xh: ele.gh.trim(),
              xm: ele.xm.trim(),
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            this.$message.error("请输入正确模糊值");
          } else {
            cb(callBackArr);
          }
        });
      }
    },

    handleSelect(item) {
      console.log("item", item);
    },
    saveListen() {
      console.log("this.from", this.Form);
    },
    save() {
      var flag = false;
      if (this.stuDate.length > 1) {
        for (var i = 0; i < this.stuDate.length; i++) {
          for (var j = i + 1; j < this.stuDate.length; j++) {
            if (
              this.stuDate[i].value === this.stuDate[j].value &&
              !!this.stuDate[i].value &&
              !!this.stuDate[j].value
            ) {
              flag = true;
            }
          }
        }
      } else {
        flag = false;
      }
      if (flag) {
        this.$message.error("存在相同谈话对象，请重新选择");
      } else if (this.stuDate.some((val) => val.value == "")) {
        this.$message.error("所添加谈话对象存在空值或未选择学生信息");
      } else if (this.addressValue == "") {
        this.$message.error("请至少选择一个谈话地点");
      } else if (this.zhutiValue == "") {
        this.$message.error("请至少选择一个谈话主题");
      } else {
        var list = [];
        var list2 = [];
        for (var i = 0; i < this.stuDate.length; i++) {
          list.push(this.stuDate[i].xm);
          list2.push(this.stuDate[i].xh);
        }
        var data = {
          thdd: this.addressValue,
          thnr: this.textarea1,
          thsj: this.date,
          id: this.lgnSn,
          startTime: this.value1,
          endTime: this.value2,
          thzt: this.Zhuti,
          thzt_type: this.zhutiValue,
          xhList: list2,
          xmList: list,
        };
        let formData = new FormData();
        formData.append("id", this.lgnSn.toString());
        formData.append("thdd", data.thdd);
        formData.append("thnr", data.thnr);
        formData.append("thsj", data.thsj);
        formData.append("startTime", data.startTime);
        formData.append("endTime", data.endTime);
        formData.append("thzt_type", data.thzt_type);
        formData.append("thzt", data.thzt);
        formData.append("xhList", data.xhList);
        formData.append("xmList", data.xmList);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        updateTalk(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("保存成功");
          } else {
            this.$message.error("保存失败");
          }
        });
      }
    },

    editClick() {
      this.edit = 2;
    },
    cancal() {
      this.edit = 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.addRole {
  .titleTop {
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
  }
  .block {
    display: flex;
  }
  .thr {
    color: #606266;
    margin-top: 30px;
    margin-left: 16px;
    margin-right: 20px;
    font-size: 15px;
    font-weight: 900;
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
  .editBtn {
    padding: 0 12px;
    margin-left: 4px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 38px;
    .addIcon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("~@/assets/images/addicon.png") no-repeat center;
    }
  }
  .roleWrap {
    background: #fff;
    margin-top: 20px;

    padding: 5px;
    display: flex;
    align-items: center;
    .roleStyle {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #1f1f1f;
      .name {
        margin-right: 20px;
        font-weight: 600;
      }
      .treeStyle {
        font-weight: 400;
        margin-left: 30px;
      }
    }
  }
  .deleIcon {
    padding: 0 12px;
    margin-left: 4px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 38px;
    i {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/detelIcon.png") no-repeat center;
    }
  }
  .wai-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .p2 {
    height: 40px;
    line-height: normal;
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
    background: #fff;
  }
  .permissions1 {
    margin-top: 10px;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    height: 100%;
    // height: calc(100vh - 230px);
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
  }
  .suibian {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 90%;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
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

    .headLeft {
      display: flex;
      align-items: center;
      .span1 {
        cursor: pointer;
        color: #fff;
        background: #005657;
        border: 1px solid #005657;
        padding: 10px;
      }
      .span2 {
        cursor: pointer;
        color: #fff;
        background: #005657;
        border: 1px solid #005657;
        padding: 10px;
        margin-left: 15px;
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
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .noIcon {
        background: url("~@/assets/images/no.png") no-repeat center;
      }
      .yesIcon {
        background: url("~@/assets/images/yesW.png") no-repeat center;
      }
    }
    .cancel {
      color: #005657;
    }

    .confirm {
      background: #005657;
      color: #fff;
    }
  }
}
</style>
