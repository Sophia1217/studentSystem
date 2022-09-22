<template>
  <div class="addRole">
    <div class="permissions">
      <div class="headTop">
        <div class="headRight">
          <span class="title">谈话对象</span>
        </div>
        <div class="headLeft">
          <button class="span1" @click="addDate">新增谈话</button>
        </div>
      </div>
      <div class="wai-container">
        <div class="roleWrap" v-for="(role, index) in renshu" :key="index">
          <div class="roleStyle">
            <div class="name">{{ index + 1 }}:</div>
            <div>
              <el-select v-model="role.value" size="small" placeholder="请选择">
                <el-option
                  v-for="(item, i) in stuData"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div
            v-if="index == renshu.length - 1"
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
    <div class="permissions1" v-for="(ele, index) in talkDate" :key="index">
      <div>
        <span class="title">谈话内容</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="谈话主题">
              <el-input
                v-model="ele.zhutiValue"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-tag
              v-for="(item, i) in ele.tag.tags.themeTags"
              :key="i"
              @click="pushData(item, 1, index)"
              closable
              @close="handleClose(item)"
            >
              {{ item.cyMsg }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="ele.inputVisible"
              v-model="ele.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="$event.target.blur"
              @blur="handleInputConfirm(1, index)"
            >
            </el-input>
            <el-button
              icon="el-icon-plus"
              style="margin-left: 15px"
              @click="showInput(1, index)"
              >新增常用主题</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="谈话地点">
              <el-input
                v-model="ele.addressValue"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-tag
              v-for="(item, i) in ele.tag.tags.addressTags"
              :key="i"
              closable
              @click="pushData(item, 2, index)"
              @close="handleClose(item)"
            >
              {{ item.cyMsg }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="ele.inputVisible1"
              v-model="ele.inputValue1"
              ref="saveTagInput1"
              size="small"
              @keyup.enter.native="$event.target.blur"
              @blur="handleInputConfirm(2, index)"
            >
            </el-input>
            <el-button
              icon="el-icon-plus"
              style="margin-left: 15px"
              @click="showInput(2, index)"
              >新增常用地点</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col el-col :span="5.5">
            <el-form-item label="谈话时间">
              <el-date-picker
                v-model="ele.value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col el-col :span="5.5">
            <el-form-item label="开始时间">
              <el-time-picker v-model="ele.value1" placeholder="选择开始时间">
              </el-time-picker> </el-form-item
          ></el-col>
          <el-col el-col :span="5.5">
            <el-form-item label="结束时间">
              <el-time-picker v-model="ele.value2" placeholder="选择结束时间">
              </el-time-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="谈话内容">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="ele.textarea1"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件">
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
      </el-form>
    </div>

    <!-- <div class="editBottom">
      <div class="btn cancel" @click="cancel()">
        <i class="icon noIcon"></i> 取消
      </div>
      <div class="btn confirm" @click="sava()">
        <i class="icon yesIcon"></i> 提交
      </div>
    </div> -->
  </div>
</template>

<script>
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      renshu: ["", "", "", "", ""],
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
      talkDate: [
        {
          tag: {
            tags: {
              themeTags: [],
              addressTags: [],
            },
          },
          zhutiValue: "",
          addressValue: "",
          inputVisible: false,
          inputValue: "",
          inputVisible1: false,
          inputValue1: "",
          date: "",
          value1: "",
          value2: "",
          textarea1: "",
        },
      ],
    };
  },

  mounted() {
    this.talkDate[0].date = new Date();
    this.talkDate[0].value2 = new Date();
    this.talkDate[0].value1 = this.transTime(new Date());
    this.queryTag();
  },

  methods: {
    addDate() {
      this.talkDate.push({
        tag: {
          tags: {
            themeTags: this.talkDate[0].tag.tags.themeTags,
            addressTags: this.talkDate[0].tag.tags.addressTags,
          },
        },
        zhutiValue: "",
        addressValue: "",
        inputVisible: false,
        inputValue: "",
        inputVisible1: false,
        inputValue1: "",
        date: this.talkDate[0].value2,
        value1: this.talkDate[0].value2,
        value2: this.talkDate[0].value1,
        textarea1: "",
      });
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
        this.$set(this.talkDate[0].tag.tags, "themeTags", res.data);
      });
      queryTag(data1).then((res) => {
        this.$set(this.talkDate[0].tag.tags, "addressTags", res.data);
      });
    },
    showInput(type, index) {
      if (type == 1) {
        this.talkDate[index].inputVisible = true;
        // console.log("this.$refs", this.$refs);
        // this.$nextTick((_) => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
      } else {
        this.talkDate[index].inputVisible1 = true;
        // this.$nextTick((_) => {
        //   this.$refs.saveTagInput1.$refs.input.focus();
        // });
      }
    },
    handleInputConfirm(type, index) {
      if (type == 1) {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.talkDate[index].inputValue;
        addTag(obj).then((res) => {
          this.queryTag();
        });
        this.talkDate[index].inputVisible = false;
        this.talkDate[index].inputValue = "";
      } else {
        var obj = {
          cyMsg: "",
          cyType: type.toString(),
          userId: this.$store.getters.userId,
        };
        obj.cyMsg = this.talkDate[index].inputValue1;
        addTag(obj).then((res) => {
          this.queryTag();
          this.talkDate[index].inputVisible1 = false;
          this.talkDate[index].inputValue1 = "";
        });
      }
    },
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    addRoles() {
      this.renshu.push("");
    },
    deleRoles(role, index) {
      this.renshu.splice(index, 1);
    },
    pushData(item, type, index) {
      if (type == 1) {
        if (this.talkDate[index].zhutiValue == "") {
          this.talkDate[index].zhutiValue =
            this.talkDate[index].zhutiValue + item.cyMsg;
        } else {
          this.talkDate[index].zhutiValue =
            this.talkDate[index].zhutiValue + "," + item.cyMsg;
        }
      } else {
        if (this.talkDate[index].addressValue == "") {
          this.talkDate[index].addressValue =
            this.talkDate[index].addressValue + item.cyMsg;
        } else {
          this.talkDate[index].addressValue =
            this.talkDate[index].addressValue + "," + item.cyMsg;
        }
      }
    },
    sava() {
      if (this.isEdit === "1") {
        let data = {
          userId: this.$store.getters.userId,
          menuList: this.savaData,
          roleName: this.queryParams.roleName,
          loginRoleId: this.$store.getters.roleId,
          roleRem: this.queryParams.roleRem,
        };
        savaTreeList(data)
          .then(() => {
            this.$router.push({
              path: "/systems/role",
            });
          })
          .catch((err) => {});
      } else {
        let data = {
          userId: this.$store.getters.userId,
          menuList: this.savaData.length > 0 ? this.savaData : this.arr, //如果用户进来没编辑，默认前一次筛选出来的树
          roleName: this.queryParams.roleName,
          roleId: this.roleId1,
          roleRem: this.queryParams.roleRem,
        };
        savaEditList(data)
          .then(() => {
            this.$router.push({
              path: "/systems/role",
            });
          })
          .catch((err) => {});
      }
    },
    savaEditList() {},
  },
};
</script>

<style lang="scss" scoped>
.addRole {
  .el-tag {
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
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
  .wai-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .permissions {
    margin-top: 20px;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    // height: calc(100vh - 250px);
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
  }
  .permissions1 {
    margin-top: 20px;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    height: 750px;
    // height: calc(100vh - 230px);
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
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
  }
}
</style>
