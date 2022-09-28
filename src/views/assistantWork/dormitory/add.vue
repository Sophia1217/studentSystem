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
                >
                  <el-option
                    v-for="(item, index) in stuData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="role.fjh"
                  size="small"
                  placeholder="请选择宿舍号"
                >
                  <el-option
                    v-for="(item, index) in stuData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
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
      <span class="title">走访详情</span>
      <div class="detailForm">
        <el-form
          :model="visitDetailForm"
          ref="queryForm3"
          size="small"
          :inline="true"
          label-width="68px"
        >
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="走访主题">
                <el-input v-model="visitDetailForm.zfzt" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <span class="tagtitle">常用主题</span>
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
                >新增常用主题</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="走访时间"
              ><el-date-picker
                type="date"
                placeholder="Pick a day"
                v-model="visitDetailForm.beginDate"
              />
            </el-form-item>
            <el-form-item label="开始时间">
              <el-time-picker v-model="visitDetailForm.beginTime"
            /></el-form-item>
            <el-form-item label="结束时间">
              <el-time-picker v-model="visitDetailForm.endTime"
            /></el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="走访情况">
              <el-input
                maxlength="2000"
                placeholder="Please input"
                show-word-limit
                style="width: 2000px"
                v-model="visitDetailForm.situation"
                :autosize="{ minRows: 10 }"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="添加附件" prop="activity">
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
import { addDetail } from "@/api/assistantWork/dormitory";
export default {
  name: "dormitoryAdd",

  data() {
    return {
      xmOptions: [],
      gzdwOptions: [],
      gwOptions: [],
      lxOptions: [],

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

      dormitoryList: [{ ly: "", fjh: "" }],
      stuData: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    ((this.visitDetailForm.beginDate = new Date()),
    (this.visitDetailForm.endTime = new Date())),
      this.transTime(new Date());
  },

  methods: {
    handleCancle() {
      this.$router.push({
        path: "/assistantWork/dormitory",
        query: {},
      });
    },
    //时间设置
    transTime(date) {
      var min = date.getMinutes();
      date.setMinutes(min - 30);
      this.visitDetailForm.beginTime = date;
    },
    //保存
    handleUpdata() {
      let data = {
        // fjh: "",
        jssj: this.visitDetailForm.endTime,
        kssj: this.visitDetailForm.beginTime,
        // ly: "",
        zfLyFjh: this.dormitoryList,
        zfqk: this.visitDetailForm.situation,
        zfrq: this.visitDetailForm.beginDate,
        zfzt: this.visitDetailForm.zfzt,
        userId: this.$store.getters.userId,
      };
      addDetail(data).then((res) => {
        this.$router.push({
          path: "/assistantWork/dormitory",
        });
      });
    },

    //新增主题确认
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
    //获取标签
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
    //删除标签
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    //是否展示标签
    showInput(type) {
      if (type == 1) {
        this.inputVisible = true;
      } else {
        this.inputVisible1 = true;
      }
    },
    //标签添加
    pushData(item, type) {
      if (type == 1) {
        if (this.visitDetailForm.zfzt == "") {
          this.visitDetailForm.zfzt = this.visitDetailForm.zfzt + item.cyMsg;
        } else {
          this.visitDetailForm.zfzt =
            this.visitDetailForm.zfzt + "," + item.cyMsg;
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
    addRoles() {
      this.dormitoryList.push({});
    },
    //删除宿舍
    deleRoles(role, index) {
      this.dormitoryList.splice(index, 1);
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
