<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">活动详情</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="组织单位" prop="orgUnit">
              <el-input v-model="form.orgUnit" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="自定义单位" label-width="90px"></el-form-item>
          </el-col>
          <el-col :span="12">
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
              <el-input v-model="form.theme" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5.5">
            <el-form-item label="活动日期">
              <el-date-picker
                v-model="form.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="开始时间">
              <el-time-picker 
                v-model="form.begTime" 
                
                placeholder="选择开始时间">
              </el-time-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="结束时间">
              <el-time-picker 
                v-model="form.endTime" 
                
                placeholder="选择结束时间">
              </el-time-picker> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动地址" prop="place">
              <el-input v-model="form.place" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="常用地址" label-width="90px"></el-form-item>
          </el-col>
          <el-col :span="12">
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
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="参与体会" prop="cyth">
              <el-input
                v-model="form.cyth"
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加附件">
          <el-upload
            drag
            action="#"
            multiple
            class="el-upload"
            :auto-upload="false"
            ref="upload"
            :file-list="fileList"
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
      <div class="headLeft">
        <button class="span1" @click="cancel()">取消</button>
        <button class="span2" @click="sava">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { insertFdyBthd } from "@/api/assistantWork/classEvent";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      fileList: [],
      modelOps: [
        { dm: "1", xm: "线上" },
        { dm: "2", xm: "线下" },
      ],
      tag: {
        unitTags: [],
        addressTags: [],
      },
      form: {
        orgUnit: "", //组织单位
        theme: "",
        date: "",
        begTime: "",
        endTime: "",

        inputVisible: false,
        inputValue: "",
        inputVisible1: false,
        inputValue: "",
        place: "",
        detail: "",
        cyth: "",
      },
    };
  },

  mounted() {
    this.form.date = new Date();
    this.form.endTime = new Date();
    this.transTime(new Date());
    this.queryTag();
  },

  methods: {
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
    //取消
    cancel() {
      window.history.go(-1);
    },
    showInput(type) {
      if (type == 3) {
        this.form.inputVisible = true;
      } else {
        this.form.inputVisible1 = true;
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
        addTag(obj).then((res) => {
          this.queryTag();
        });
        this.form.inputVisible = false;
        this.form.inputValue = "";
      } else {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.form.inputValue1;
        addTag(obj).then((res) => {
          this.queryTag();
        });
        this.form.inputVisible1 = false;
        this.form.inputValue1 = "";
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
          this.form.orgUnit = this.form.orgUnit + "," + item.cyMsg;
        }
      } else {
        if (this.form.place == "") {
          this.form.place = this.form.place + item.cyMsg;
        } else {
          this.form.place = this.form.place + "," + item.cyMsg;
        }
      }
    },
    change(file, fileList) {
      this.fileList = fileList;
      console.log("file", file);
      console.log("fileList", fileList);
    },
    sava() {
      let formData = new FormData();
      formData.append("id", "");
      formData.append("cyth", this.form.cyth);
      formData.append("hddz", this.form.place);
      formData.append("hdksrq", this.form.date);
      formData.append("hdjssj", this.form.endTime);
      formData.append("hdkssj", this.form.begTime);
      formData.append("hdnr", this.form.detail);
      formData.append("hdzt", this.form.theme);
      formData.append("zzdw", this.form.orgUnit);
      if (this.fileList.length > 0) {
        this.fileList.map((ele) => {
          formData.append("files", ele.raw);
        });
      }
      insertFdyBthd(formData).then((res) => {
        window.history.go(-1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
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
