<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">活动记录人</span>
      </div>
      <el-form ref="formTop" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4.5">
            <el-form-item label="姓名" prop="recordName">
              <el-input
                v-model="formTop.recordName"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="工号" prop="recordGh">
              <el-input
                v-model="formTop.recordGh"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="单位" prop="dwh">
              <el-input
                v-model="formTop.dwh"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="岗位" prop="job">
              <el-input
                v-model="formTop.job"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4.5">
            <el-form-item label="类型" prop="lxm">
              <el-input
                v-model="formTop.lxm"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="permissions">
      <div>
        <span class="title">活动详情</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="组织单位" prop="orgUnit">
              <el-input
                v-model="form.orgUnit"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" v-if="edit == 2">
            <el-form-item label="自定义单位" label-width="90px"></el-form-item>
          </el-col>
          <el-col :span="12" v-if="edit == 2">
            <el-tag
              v-for="item in tag.unitTags"
              :key="item.cyMsg"
              @click="pushData(item, 3)"
              @close="handleClose(item)"
              closable
            >
              {{ item.cyMsg }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="form.inputVisible"
              v-model="form.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="$event.target.blur"
              @blur="handleInputConfirm(3)"
            >
            </el-input>
            <el-button
              icon="el-icon-plus"
              style="margin-left: 15px"
              @click="showInput(3)"
              >新增单位</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动主题">
              <el-input
                v-model="form.theme"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5.5">
            <el-form-item label="活动时间">
              <el-date-picker
                v-model="form.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="edit == '1' ? true : false"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="开始时间">
              <el-time-picker
                v-model="form.begTime"
                format="hh时mm分"
                value-format="HH:mm"
                placeholder="选择开始时间"
                :disabled="edit == '1' ? true : false"
              >
              </el-time-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="结束时间">
              <el-time-picker
                v-model="form.endTime"
                format="hh时mm分"
                value-format="HH:mm"
                placeholder="选择结束时间"
                :disabled="edit == '1' ? true : false"
              >
              </el-time-picker> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动地址" prop="place">
              <el-input
                v-model="form.place"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" v-if="edit == 2">
            <el-form-item label="常用地址" label-width="90px"></el-form-item>
          </el-col>
          <el-col :span="12" v-if="edit == 2">
            <el-tag
              v-for="item in tag.addressTags"
              :key="item.cyMsg"
              @click="pushData(item, 2)"
              @close="handleClose(item)"
              closable
            >
              {{ item.cyMsg }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="form.inputVisible1"
              v-model="form.inputValue1"
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
              >新增地址</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="活动内容" prop="detail">
              <el-input
                v-model="form.detail"
                maxlength="2000"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="参与体会" prop="cyth">
              <el-input
                v-model="form.cyth"
                maxlength="2000"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加附件" v-if="edit == '1'">
          <!-- <div v-if="videoSrc" class="block">
            <video
              :src="videoSrc"
              controls="controls"
              :custom-cache="false"
              style="margin-left: 20px; width: 300px; height: 300px"
            ></video>
          </div> -->
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
            :before-remove="beforeRemove"
            :disabled="edit == '1' ? true : false"
          >
          </el-upload>
        </el-form-item>
        <el-form-item label="添加附件" v-if="edit == '2'">
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
            :disabled="edit == '1' ? true : false"
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
      <div class="headLeft">
        <button
          class="span1"
          v-if="
            edit == 1 &&
            (this.formTop.recordGh == this.$store.getters.userId ||
              this.$store.getters.roleId == '01')
          "
          @click="editClick()"
        >
          编辑
        </button>
        <button class="span1" v-if="edit == 2" @click="cancel()">取消</button>
        <button class="span2" v-if="edit == 2" @click="sava">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryFdyBthdById,
  insertFdyBthd,
  querywj,
  delwj,
  Exportwj,
} from "@/api/assistantWork/classEvent";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      // videoSrc: "",
      urlArr: [],
      fileList: [],
      fileListAdd: [],
      edit: 1,
      renshu: ["", "", "", "", ""],
      arr: [],
      arr1: ["01"],
      tag: {
        unitTags: [],
        addressTags: [],
      },
      formTop: {
        recordName: "",
        dwh: "",
        job: "",
        lxm: "",
        recordGh: "",
      },
      form: {
        orgUnit: "", //组织单位
        theme: "",
        date: "",
        begTime: "",
        endTime: "",

        inputVisible: false,
        inputValue: "",
        place: "",
        detail: "",
        cyth: "",
      },
      detailInfoList: [],
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    (this.form.date = new Date()),
      (this.form.endTime = new Date()),
      this.transTime(new Date());
    this.queryTag();
    this.getDetail();
    this.querywj();
  },

  methods: {
    change(file, fileList) {
      const index1 = file.name.lastIndexOf(".");
      const ext = file.name.substr(index1 + 1);
      //获取后缀 判断文件格式
      // 图片 2M  文件10M  视频50M
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        (ext == "jpg" || ext == "png" || ext == "png")
      ) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        this.$message.error("图片超过2M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        this.$message.error("文件超过10M,上传失败");
      } else {
        //用于文件先保存
        this.fileListAdd.push(file);
        this.fileList = fileList;
      }
    },
    handlePreview(file) {
      console.log("file", file);
      //用于文件下载
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
        console.log("file.id", file.id);
        delwj({ id: file.id.toString() }).then();
      }
    },
    querywj() {
      //用于文件查询
      querywj({ businesId: this.id }).then((res) => {
        this.fileList = res.data;
        this.fileList.map((ele) => {
          if (ele.fileSuffix == ".png" || ele.fileSuffix == ".jpg") {
            if (this.urlArr.length < 3) {
              this.urlArr.push(`${window.location.origin}/sfile/${ele.proId}`);
            }
          }
          //  else if (ele.fileSuffix == ".mp4") {
          //   this.videoSrc = `${window.location.origin}/sfile/${ele.proId}`;
          // }
        });
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    transTime(date) {
      var min = date.getMinutes();
      date.setMinutes(min - 30);
      this.form.begTime = date;
    },
    //标签查询
    queryTag() {
      var data = {
        cyType: "3", //1主题,2地点,3组织单位
        userId: this.$store.getters.userId,
      };
      var data1 = {
        cyType: "2", //1主题,2地点,3组织单位
        userId: this.$store.getters.userId,
      };
      queryTag(data).then((res) => {
        this.$set(this.tag, "unitTags", res.data);
      });
      queryTag(data1).then((res) => {
        this.$set(this.tag, "addressTags", res.data);
      });
    },
    //详情
    getDetail() {
      let data = { id: this.id };
      queryFdyBthdById(data).then((res) => {
        this.formTop.recordName = res.data.createXm;
        this.formTop.dwh = res.data.createDwhMc;
        this.formTop.job = res.data.createJsidMc;
        this.formTop.lxm = res.data.createSfjzfdyMc;
        this.formTop.recordGh = res.data.createXh;
        this.form.orgUnit = res.data.zzdw;
        this.form.theme = res.data.hdzt;
        this.form.date = res.data.hdksrq;
        this.form.begTime = res.data.hdkssj;
        this.form.endTime = res.data.hdjssj;
        this.form.place = res.data.hddz;
        this.form.detail = res.data.hdnr;
        this.form.cyth = res.data.cyth;
      });
    },
    //编辑
    editClick() {
      this.edit = 2;
    },
    //取消
    cancel() {
      this.edit = 1;
    },
    showInput(type) {
      if (type == 3) {
        if (this.tag.unitTags.length > 8) {
          this.$message.error("最多九条");
        } else {
          this.form.inputVisible = true;
        }
      } else {
        if (this.tag.addressTags.length > 8) {
          this.$message.error("最多九条");
        } else {
          this.form.inputVisible1 = true;
        }
      }
    },
    handleInputConfirm(type) {
      if (type == 3) {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.form.inputValue;
        if (this.form.inputValue.length > 15) {
          this.$message.error("常用组织单位标签输入值应不超过十五个字符");
        } else {
          addTag(obj).then((res) => {
            this.queryTag();
          });
          this.form.inputVisible = false;
          this.form.inputValue = "";
        }
      } else {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.form.inputValue1;
        if (this.form.inputVisible1.length > 15) {
          this.$message.error("常用地点标签输入值应不超过十五个字符");
        } else {
          addTag(obj).then((res) => {
            this.queryTag();
          });
          this.form.inputVisible1 = false;
          this.form.inputValue1 = "";
        }
      }
    },
    //关闭标签
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    //选中标签
    pushData(item, type) {
      if (type == 3) {
        if (this.form.orgUnit == "") {
          this.form.orgUnit = this.form.orgUnit + item.cyMsg;
        } else {
          if (this.form.orgUnit.length < 30) {
            this.form.orgUnit = this.form.orgUnit + "," + item.cyMsg;
          } else {
            this.$message.error("常用主题总长度不应该超过三十个字符长度");
          }
        }
      } else {
        if (this.form.place == "") {
          this.form.place = this.form.place + item.cyMsg;
        } else {
          if (this.form.place.length < 30) {
            this.form.place = this.form.place + "," + item.cyMsg;
          } else {
            this.$message.error("常用主题总长度不应该超过三十个字符长度");
          }
        }
      }
    },
    //保存
    sava() {
      let formData = new FormData();
      formData.append("id", this.$route.query.id.toString());
      formData.append("cyth", this.form.cyth);
      formData.append("hddz", this.form.place);
      formData.append("hdksrq", this.form.date);
      formData.append("hdjssj", this.form.endTime);
      formData.append("hdkssj", this.form.begTime);
      formData.append("hdnr", this.form.detail);
      formData.append("hdzt", this.form.theme);
      formData.append("zzdw", this.form.orgUnit);
      this.fileListAdd.map((ele) => {
        formData.append("files", ele.raw);
      });
      if (this.form.orgUnit == "") {
        this.$message.error("组织单位不能为空！");
      } else if (this.form.theme == "") {
        this.$message.error("活动主题不能为空!");
      } else if (this.form.date == "") {
        this.$message.error("活动日期不能为空!");
      } else if (this.form.place == "") {
        this.$message.error("活动地址不能为空!");
      } else if (this.form.detail == "") {
        this.$message.error("活动内容不能为空!");
      } else if (this.form.cyth == "") {
        this.$message.error("参与体会不能为空!");
      } else {
        insertFdyBthd(formData).then((res) => {
          window.history.go(-1);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
  .block {
    display: flex;
  }
  .permissions {
    margin-top: 20px;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    // height: calc(100vh - 250px);

    .title {
      display: flex;
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
      margin-bottom: 10px;
    }
    .perName {
      font-weight: 600;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 28px;
      margin-right: 20px;
    }
    .search {
      background: #005657;
      align-items: center;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
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
  .block {
    display: flex;
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
        background: url("~@/assets/images/no.png");
      }
      .yesIcon {
        background: url("~@/assets/images/yesW.png");
      }
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .shishi {
      width: 10px;
    }
  }
  .headLeft {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
}
</style>
