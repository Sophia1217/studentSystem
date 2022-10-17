<template>
  <div class="dormitoryVisit">
    <div class="dormitoryDetail">
      <div class="permissions">
        <div class="headight">
          <span class="title">走访宿舍</span>
        </div>

        <div class="wai-container">
          <div
            class="roleWrap"
            v-for="(role, index) in dormitoryList"
            :key="index"
          >
            <div class="roleStyle">
              <div>
                <el-select
                  v-model="role.ly"
                  size="small"
                  placeholder="请选择楼栋"
                  @change="lyChange(index)"
                  filterable
                >
                  <el-option
                    v-for="(ele1, ind1) in zfssOptions"
                    :key="ind1"
                    :label="ele1.mc"
                    :value="ele1.dm"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="role.fjh"
                  size="small"
                  placeholder="请选择宿舍号"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="(ele, ind) in role.fjhOptions"
                    :key="ind"
                    :label="ele.mc"
                    :value="ele.dm"
                  >
                  </el-option>
                </el-select>
              </div>
              <div
                v-if="index == dormitoryList.length - 1"
                class="editBtn"
                @click="addRoles(role, index)"
              >
                <i class="addIcon"></i>
              </div>
              <div v-else class="deleIcon" @click="deleRoles(role, index)">
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contextDetail">
      <div class="headight">
        <span class="title">走访详情</span>
      </div>
      <div class="detailForm">
        <el-form
          :model="visitDetailForm"
          ref="queryForm3"
          size="small"
          :inline="true"
          label-width="100px"
          :rules="rules"
        >
          <el-row :gutter="10">
            <el-col :span="6.5">
              <el-form-item label="走访主题" prop="zfzt">
                <el-input v-model="visitDetailForm.zfzt" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <span class="tagtitle">常用主题</span>
              <el-tag
                v-for="(item, i) in tags.themeTags"
                :key="i"
                @click="pushData(item, 6)"
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
                @blur="handleInputConfirm(6)"
              >
              </el-input>
              <el-button
                icon="el-icon-plus"
                style="margin-left: 15px"
                @click="showInput(6)"
                >新增常用主题</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="走访时间" prop="beginDate"
              ><el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="visitDetailForm.beginDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="开始时间">
              <el-time-picker
                v-model="visitDetailForm.beginTime"
                format="HH时mm分"
                value-format="HH:mm"
                :clearable="false"
            /></el-form-item>
            <el-form-item label="结束时间">
              <el-time-picker
                v-model="visitDetailForm.endTime"
                format="HH时mm分"
                value-format="HH:mm"
                :clearable="false"
            /></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="走访情况">
              <el-input
                maxlength="2000"
                placeholder="请输入..."
                show-word-limit
                v-model="visitDetailForm.situation"
                style="width: 1000px"
                :autosize="{ minRows: 10 }"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="走访附件" prop="activity">
              <el-upload
                drag
                action="#"
                multiple
                class="el-upload"
                :auto-upload="false"
                ref="upload"
                :file-list="fileList"
                :before-remove="
                  (item, item1) => {
                    beforeRemove(item, item1);
                  }
                "
                :on-change="change"
              >
                <div class="el-upload-dragger">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <em>点击</em>或<em>拖拽</em>上传附件
                  </div>
                  <div class="el-upload__text">
                    支持格式：PNG、JPG、WORD、PDF、PPT、ZIP或RAR等主流格式，压缩包10M以内，图片2M以内
                  </div>
                </div>
              </el-upload>
            </el-form-item>
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
import {
  addDetail,
  queryRelatedLd,
  queryRelatedFj,
} from "@/api/assistantWork/dormitory";
export default {
  name: "dormitoryAdd",

  data() {
    return {
      rules: {
        zfzt: [
          { required: true, message: "走访主题不能为空", trigger: "change" },
        ],
        beginDate: [
          { required: true, message: "走访日期不能为空", trigger: "change" },
        ],
      },
      tags: {
        themeTags: [], //主题标签
        addressTags: [],
      },

      addressValue: "",
      inputVisible: false,
      inputValue: "",
      inputVisible1: false,
      inputValue1: "",
      //走访详情表单
      visitDetailForm: {
        zfzt: "",
        beginTime: "",
        beginDate: "",
        endTime: "",
        situation: "",
      },

      dormitoryList: [{ ly: undefined, fjh: undefined }],
      zfssOptions: [],
      fjhOptions: [],
      zfssOptions: [],
      fileList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOptions();
    this.visitDetailForm.beginDate = this.formatDate(new Date()).slice(0, 10);
    this.visitDetailForm.endTime = this.formatDate(new Date()).slice(-8, -3);
    this.visitDetailForm.beginTime = this.formatDate(
      this.transTime(new Date())
    ).slice(-8, -3);
    //this.transTime(new Date());
    this.queryTag();
  },

  methods: {
    handleCancle() {
      this.$router.push({
        path: "/assistantWork/dormitory",
        query: {},
      });
    },
    //时间设置
    // transTime(date) {
    //   var min = date.getMinutes();
    //   date.setMinutes(min - 30);
    //   //this.visitDetailForm.beginTime = this.formatDate(date).slice(-8, -3);
    // },

    //上传文件
    change(file, fileList) {
      const index1 = file.name.lastIndexOf(".");
      const ext = file.name.substr(index1 + 1);
      //获取后缀 判断文件格式
      // 图片 2M  文件10M  视频50M
      console.log("file", file);
      console.log(
        "Number(file.size / 1024 / 1024)",
        Number(file.size / 1024 / 1024)
      );
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        (ext == "jpg" || ext == "png" || ext == "png")
      ) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        console.log("fileList", fileList);
        this.$message.error("图片超过2M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        console.log("fileList", fileList);
        this.$message.error("文件超过10M,上传失败");
      } else {
        this.fileList = fileList;
      }
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid == uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.queryForm3.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    //保存
    handleUpdata() {
      // for (let j = 0, len = this.dormitoryList.length; j < len; j++) {
      //   if (this.dormitoryList[j].ly == "") {
      //     this.$message.error("走访楼栋不能为空！");
      //     break;
      //   }
      var flag = false;
      if (this.dormitoryList.length > 1) {
        for (var i = 0; i < this.dormitoryList.length; i++) {
          for (var j = i + 1; j < this.dormitoryList.length; j++) {
            if (
              this.dormitoryList[i].ly === this.dormitoryList[j].ly &&
              !!this.dormitoryList[i].ly &&
              !!this.dormitoryList[j].ly &&
              (this.dormitoryList[i].fjh === this.dormitoryList[j].fjh ||
                this.dormitoryList[i].fjh == undefined ||
                this.dormitoryList[j].fjh == undefined ||
                this.dormitoryList[i].fjh == "" ||
                this.dormitoryList[j].fjh == "")
            ) {
              flag = true;
            }
          }
        }
      } else {
        flag = false;
      }
      if (flag) {
        this.$message.error("存在相同走访宿舍，请重新选择");
      } else if (this.dormitoryList.some((val) => val.ly == undefined)) {
        this.$message.error("所添加走访宿舍存在空值或未选择楼栋");
      } else if (!this.checkForm()) {
        this.$message.error("请完善表单其他相关信息！");
        return;
      } else {
        let formData = new FormData();

        formData.append("jssj ", this.visitDetailForm.endTime);
        formData.append("kssj", this.visitDetailForm.beginTime);
        // formData.append("zfLyFjh", this.dormitoryList);
        let lyList = [];
        for (let i = 0, len = this.dormitoryList.length; i < len; i++) {
          let locationInfo = this.dormitoryList[i];

          formData.append("zfLyFjh[" + i + "].ly", locationInfo.ly);
          formData.append("zfLyFjh[" + i + "].fjh", locationInfo.fjh);
          lyList.push(locationInfo.ly);
        }
        formData.append("zflyList", lyList);

        formData.append("zfqk ", this.visitDetailForm.situation);
        formData.append("zfrq", this.visitDetailForm.beginDate);
        formData.append("zfzt ", this.visitDetailForm.zfzt);
        formData.append("userId", this.$store.getters.userId);
        if (this.fileList.length > 0) {
          this.fileList.map((ele) => {
            formData.append("files", ele.raw);
          });
        }
        // let data = {
        //   // fjh: "",
        //   jssj: this.visitDetailForm.endTime,
        //   kssj: this.visitDetailForm.beginTime,
        //   // ly: "",
        //   zfLyFjh: this.dormitoryList,
        //   zfqk: this.visitDetailForm.situation,
        //   zfrq: this.visitDetailForm.beginDate,
        //   zfzt: this.visitDetailForm.zfzt,
        //   userId: this.$store.getters.userId,
        // };
        addDetail(formData).then((res) => {
          this.$router.push({
            path: "/assistantWork/dormitory",
          });
        });
      }
    },

    //新增主题确认
    handleInputConfirm(type) {
      if (type == 6) {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.inputValue;
        if (this.inputValue.length > 15) {
          this.$message.error("常用主题标签输入值应不超过十五个字符");
        } else {
          addTag(obj).then((res) => {
            this.queryTag();
          });

          this.inputVisible = false;
          this.inputValue = "";
        }
      } else {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.inputValue1;
        if (this.inputValue1.length > 15) {
          this.$message.error("常用标签输入值应不超过十五个字符");
        } else {
          addTag(obj).then((res) => {
            this.queryTag();
          });

          this.inputVisible1 = false;
          this.inputValue1 = "";
        }
      }
    },
    //获取标签
    queryTag() {
      var data = {
        cyType: "6", //1主题,2地点,3组织单位6走访主题
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
    //删除标签
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    //是否展示标签
    showInput(type) {
      if (type == 6) {
        if (this.tags.themeTags.length > 8) {
          this.$message.error("最多九条");
        } else {
          this.inputVisible = true;
        }
      } else {
        this.inputVisible1 = true;
      }
    },
    //标签添加
    pushData(item, type) {
      if (type == 6) {
        if (this.visitDetailForm.zfzt == "") {
          this.visitDetailForm.zfzt = this.visitDetailForm.zfzt + item.cyMsg;
        } else {
          if (this.visitDetailForm.zfzt.length < 30) {
            this.visitDetailForm.zfzt =
              this.visitDetailForm.zfzt + "," + item.cyMsg;
          } else {
            this.$message.error("常用主题总长度不应该超过三十个字符长度");
          }
        }
      } else {
        if (this.addressValue == "") {
          this.addressValue = this.addressValue + item.cyMsg;
        } else {
          this.addressValue = this.addressValue + "," + item.cyMsg;
        }
      }
    },
    //新增宿舍
    addRoles(role, index) {
      console.log(role, index);
      this.dormitoryList.push({});
    },
    //删除宿舍
    deleRoles(role, index) {
      this.dormitoryList.splice(index, 1);
    },
    //获取楼栋
    getOptions() {
      queryRelatedLd().then((response) => {
        // 获取走访宿舍列表数据
        if (response.errcode == "00") {
          this.zfssOptions = response.data;
        }
      });
    },
    lyChange(index) {
      this.dormitoryList[index].fjh
        ? (this.dormitoryList[index].fjh = undefined)
        : undefined;
      //this.dormitoryList[index].fjh = "";
      this.getFjh(index);
    },

    //获取房间号
    getFjh(index) {
      //console.log(index);

      let data = { dm: this.dormitoryList[index].ly };
      queryRelatedFj(data).then((response) => {
        // 获取走访宿舍列表数据
        if (response.errcode == "00") {
          // this.fjhOptions = response.data;
          this.$set(this.dormitoryList[index], "fjhOptions", response.data);
          //console.log(this.dormitoryList);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dormitoryVisit {
  .dormitoryDetail {
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .editBtn {
      padding: 0 10px;
      margin-left: 22px;
      border-radius: 4px;
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      cursor: pointer;
      line-height: 32px;
      .addIcon {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url("~@/assets/images/addicon.png") no-repeat center;
      }
    }
    .deleIcon {
      margin-left: 30px;
      cursor: pointer;
      i {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: url("~@/assets/images/detelIcon.png");
      }
    }
    .greenIcon {
      margin-top: 10px;
      background: url("~@/assets/assistantPng/add.png") no-repeat;
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
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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
  .contextDetail {
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .detailForm {
      margin-top: 20px;
    }
  }
  .title {
    //text-align: center;
    color: #1f1f1f;
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
    padding-top: 10px;
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
  .tagtitle {
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    line-height: 32px;
    font-weight: 700;
  }
  .wai-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
}
</style>
