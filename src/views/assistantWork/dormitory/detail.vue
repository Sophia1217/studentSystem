<template>
  <div class="dormitoryVisit">
    <div class="writePeople">
      <div class="headight">
        <span class="title">走访人员</span>
      </div>

      <div class="peopleForm">
        <el-row :gutter="10">
          <el-form
            :model="peopledetail"
            ref="queryForm1"
            size="small"
            :inline="true"
            label-width="68px"
          >
            <el-form-item label="工号">
              <el-input v-model="peopledetail.gh" disabled></el-input
            ></el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="peopledetail.xm" disabled> </el-input>
            </el-form-item>
            <el-form-item label="单位" p>
              <el-input v-model="peopledetail.gzdw" disabled> </el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="peopledetail.gw" disabled> </el-input>
            </el-form-item>
            <el-form-item label="类型" prop="lx">
              <el-input v-model="peopledetail.lx" disabled> </el-input>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="dormitoryDetail">
      <div class="permissions">
        <div>
          <span class="title">走访宿舍</span>
        </div>

        <div class="wai-container">
          <div
            class="roleWrap"
            v-for="(dormitory, index) in dormitoryList"
            :key="index"
          >
            <div class="roleStyle">
              <div>
                <el-select
                  v-model="dormitory.ly"
                  size="small"
                  :disabled="isEdit == '1' ? true : false"
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
                  v-model="dormitory.fjh"
                  size="small"
                  :disabled="isEdit == '1' ? true : false"
                  placeholder="请选择宿舍号"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="(ele, ind) in dormitory.fjhOptions"
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
                @click="addRoles(dormitory, index)"
                v-show="isEdit == '2' ? true : false"
              >
                <i class="addIcon"></i>
              </div>
              <div
                v-else
                class="deleIcon"
                v-show="isEdit == '2' ? true : false"
                @click="deleRoles(dormitory, index)"
              >
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contextDetail">
      <div>
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
                <el-input
                  v-model="visitDetailForm.zfzt"
                  :disabled="isEdit == '1' ? true : false"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <div v-show="isEdit == '2' ? true : false">
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
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="走访时间" prop="beginDate"
              ><el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="visitDetailForm.beginDate"
                :disabled="isEdit == '1' ? true : false"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="开始时间" prop="beginTime">
              <el-time-picker
                :disabled="isEdit == '1' ? true : false"
                v-model="visitDetailForm.beginTime"
                format="HH时mm分"
                value-format="HH:mm"
                :clearable="false"
            /></el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker
                :disabled="isEdit == '1' ? true : false"
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
                style="width: 1000px"
                v-model="visitDetailForm.situation"
                :disabled="isEdit == '1' ? true : false"
                :autosize="{ minRows: 10 }"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="走访附件" v-if="isEdit == '1'">
              <div v-if="videoSrc" class="block">
                <video
                  :src="videoSrc"
                  controls="controls"
                  :custom-cache="false"
                  style="margin-left: 20px; width: 300px; height: 300px"
                ></video>
              </div>
              <div v-if="urlArr.length > 0" class="block">
                <div v-for="(item, i) in urlArr">
                  <el-image
                    style="margin-left: 20px; width: 300px; height: 300px"
                    :src="item"
                  ></el-image>
                </div>
              </div>
              <el-upload
                action="#"
                multiple
                :file-list="fileList"
                :auto-upload="false"
                class="el-upload"
                :on-preview="handlePreview"
                :disabled="isEdit == '1' ? true : false"
              >
              </el-upload>
            </el-form-item>
            <el-form-item label="走访附件" v-if="isEdit == '2'">
              <el-upload
                drag
                action="#"
                multiple
                :file-list="fileList"
                :auto-upload="false"
                class="el-upload"
                :on-preview="handlePreview"
                :on-change="change"
                :before-remove="beforeRemove"
                :disabled="isEdit == '1' ? true : false"
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
    <div
      v-if="
        isEdit == 1 &&
        (this.peopledetail.gh == this.$store.getters.userId ||
          this.$store.getters.roleId == '01')
      "
      class="editBottom"
    >
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
    </div>

    <div v-if="isEdit == 2" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handleUpdata">保存</div>
    </div>
  </div>
</template>
<script>
import {
  getDormitoryVisitList,
  editDetail,
  seeDetail,
  queryRelatedLd,
  queryRelatedFj,
} from "@/api/assistantWork/dormitory";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
export default {
  name: "dormitoryVisit",

  data() {
    return {
      videoSrc: "",
      xmOptions: [],
      gzdwOptions: [],
      gwOptions: [],
      lxOptions: [],
      rules: {
        zfzt: [
          { required: true, message: "走访主题不能为空", trigger: "change" },
        ],
        beginDate: [
          { required: true, message: "走访日期不能为空", trigger: "change" },
        ],
      },
      isEdit: 1, //1详情 2编辑
      dormitoryList: [],

      tags: {
        themeTags: [], //主题标签
        addressTags: [],
      },

      addressValue: "",
      inputVisible: false,
      inputValue: "",
      inputVisible1: false,
      inputValue1: "",
      //访人员表单
      peopledetail: {
        gh: "",
        xm: "",
        gzdw: "",
        gw: "",
        lx: "",
      },
      //走访详情表单
      visitDetailForm: {
        zfzt: "",
        beginTime: "",
        beginDate: "",
        endTime: "",
        situation: "",
      },
      id: this.$route.query.id,
      urlArr: [],
      fileList: [],
      fileListAdd: [],
      fjhOptions: [],
      zfssOptions: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.lgnSn = this.$route.query.id; //逻辑主键
    this.getDetailPage();
    this.queryTag();
    this.querywj();
    this.getOptions();
  },

  methods: {
    //获取详情
    getDetailPage() {
      let pageid = { id: this.$route.query.id };
      seeDetail(pageid).then((res) => {
        this.peopledetail.gh = res.data.gh;
        this.peopledetail.xm = res.data.xm;
        this.peopledetail.gzdw = res.data.dwmc;
        this.peopledetail.gw = res.data.gw;
        this.peopledetail.lx = res.data.fdylx;
        this.visitDetailForm.zfzt = res.data.zfzt;
        this.visitDetailForm.beginTime = res.data.kssj;
        this.visitDetailForm.endTime = res.data.jssj;
        this.visitDetailForm.situation = res.data.zfqk;
        this.visitDetailForm.beginDate = res.data.zfrq;
        this.dormitoryList = res.data.zfLyFjh;
      });
    },
    //时间设置
    // transTime(date) {
    //   var min = date.getMinutes();
    //   date.setMinutes(min - 30);
    //   this.visitDetailForm.beginTime = this.formatDate(date);
    // },
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
        formData.append("id", this.id);
        //let lyList = [];
        for (let i = 0, len = this.dormitoryList.length; i < len; i++) {
          let locationInfo = this.dormitoryList[i];
          formData.append("zfLyFjh[" + i + "].ly", locationInfo.ly);
          formData.append("zfLyFjh[" + i + "].fjh", locationInfo.fjh);
          //lyList.push(locationInfo.ly);
        }
        // formData.append("lyList", lyList);
        formData.append("zfqk ", this.visitDetailForm.situation);
        formData.append("zfrq", this.visitDetailForm.beginDate.slice(0, 10));
        formData.append("zfzt ", this.visitDetailForm.zfzt);
        this.fileListAdd.map((ele) => {
          formData.append("files", ele.raw);
        });
        // let data = {
        //   // fdylx: "string",
        //   // files: [null],

        //   id: this.$route.query.id,
        //   jssj: this.visitDetailForm.endTime,
        //   kssj: this.visitDetailForm.beginTime,
        //   zfLyFjh: this.dormitoryList,
        //   zfqk: this.visitDetailForm.situation,
        //   zfrq: this.visitDetailForm.beginDate,
        //   zfzt: this.visitDetailForm.zfzt,
        // };
        editDetail(formData).then((res) => {
          this.$router.push({
            path: "/assistantWork/dormitory",
          });
        });
      }
    },
    //取消
    handleCancle() {
      this.isEdit = 1;
    },
    //编辑
    editButtonClick() {
      this.isEdit = 2; // 控制是否可以编辑的字段
      for (let index = 0; index < this.dormitoryList.length; index++)
        //console.log("打印", this.dormitoryList[index]);
        this.getFjh(index);
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
        cyType: "6", //1主题,2地点,3组织单位
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
    change(file, fileList) {
      const index = file.name.lastIndexOf(".");
      const ext = file.name.substr(index + 1);
      //console.log("ext", ext);
      //获取后缀 判断文件格式
      // 图片 2M 文件10M 视频50M
      // console.log("file", file);
      console.log(
        "Number(file.size / 1024 / 1024)",
        Number(file.size / 1024 / 1024)
      );
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        (ext == "jpg" || ext == "png")
      ) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        console.log("图片", fileList);
        this.$message.error("图片大小超过2M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        console.log("文件", fileList);
        this.$message.error("文件大小超过10M,上传失败");
      } else {
        this.fileListAdd.push(file);
        this.fileList = fileList;
      }
    },
    handlePreview(file) {
      //用于文件下载
      console.log("file", file);
      console.log("dayin", file.id);
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    beforeRemove(file, fileList) {
      //用于文件删除

      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    querywj() {
      //用于文件查询
      querywj({ businesId: this.lgnSn }).then((res) => {
        this.fileList = res.data;
        this.fileList.map((ele) => {
          if (ele.fileSuffix == ".png" || ele.fileSuffix == ".jpg") {
            if (this.urlArr.length < 3) {
              this.urlArr.push(`${window.location.origin}/sfile/${ele.proId}`);
            }
          } else if (ele.fileSuffix == ".mp4") {
            this.videoSrc = `${window.location.origin}/sfile/${ele.proId}`;
          }
        });
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    //新增宿舍
    addRoles() {
      this.dormitoryList.push({});
    },
    //删除宿舍
    deleRoles(dormitory, index) {
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
      this.getFjh(index);
    },
    //获取房间号
    getFjh(index) {
      let data = { dm: this.dormitoryList[index].ly };
      queryRelatedFj(data).then((response) => {
        // 获取走访宿舍列表数据
        if (response.errcode == "00") {
          // this.fjhOptions = response.data;
          this.$set(this.dormitoryList[index], "fjhOptions", response.data);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dormitoryVisit {
  .block {
    display: flex;
  }
  .writePeople {
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .peopleForm {
      margin-top: 20px;
      .header-item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
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
