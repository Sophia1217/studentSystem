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
        <div class="roleWrap" v-for="(ele, index) in renshu" :key="index">
          <div class="roleStyle">
            <div class="name">{{ index + 1 }}:</div>
            <div>
              <el-autocomplete
                v-model="ele.acceptVlaue"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="
                  (item) => {
                    handleSelect(item, index);
                  }
                "
                size="small"
              ></el-autocomplete>
              <!-- <el-select
                v-model="ele.label"
                :value-key="ele.value"
                size="small"
                remote       这个如果遍历层级较多，会有显示覆盖bug
                filterable
                :remote-method="querySearchAsync"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in stuData"
                  :key="i"
                  :label="`${item.xm}(${item.gh})`"
                  :value="item.gh"
                >
                </el-option>
              </el-select> -->
            </div>
          </div>
          <div
            v-if="index == renshu.length - 1 && renshu.length !== 6"
            class="editBtn"
            @click="addStu(ele, index)"
          >
            <i class="addIcon"></i>
          </div>
          <div
            v-if="renshu.length == 6 || index < renshu.length - 1"
            class="deleIcon"
            @click="delStu(ele, index)"
          >
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
          <el-col :span="18">
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
          <el-col :span="17">
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
                v-model="ele.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
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
            maxlength="2000"
            v-model="ele.textarea1"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件">
          <el-upload
            drag
            action="#"
            multiple
            class="el-upload"
            :auto-upload="false"
            ref="upload"
            :file-list="ele.fileList"
            :on-change="
              (item, item1) => {
                change(item, item1, index);
              }
            "
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
        <div class="buttonStle">
          <el-button @click="cancel(index)">取消</el-button>
          <el-button class="saveButton" @click="save(index)">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  queryTag,
  addTag,
  delTag,
  getXmXgh,
  addTalk,
} from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      renshu: [
        {
          acceptVlaue: "",
          value: "",
          label: "",
        },
      ],
      addParams: [],
      stuData: [],
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
          fileList: [],
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
    cancel(index) {},
    save(index) {
      if (this.renshu[0].acceptVlaue == "") {
        this.$message.error("请至少选择一名学生");
      } else {
        var list = [];
        var list2 = [];
        for (var i = 0; i < this.addParams.length; i++) {
          list.push(this.addParams[i].xm);
          list2.push(this.addParams[i].label);
        }
        var data = {
          thdd: this.talkDate[index].addressValue,
          thnr: this.talkDate[index].textarea1,
          thsj: this.talkDate[index].date,
          startTime: this.talkDate[index].value1,
          endTime: this.talkDate[index].value2,
          thzt: this.talkDate[index].zhutiValue,
          xhList: list2,
          xmList: list,
        };
        let formData = new FormData();
        formData.append("thdd", data.thdd);
        formData.append("thnr", data.thnr);
        formData.append("thsj", data.thsj);
        formData.append("startTime", data.startTime);
        formData.append("endTime", data.endTime);
        formData.append("thzt", data.thzt);
        formData.append("xhList", data.xhList);
        formData.append("xmList", data.xmList);
        this.talkDate[index].fileList.map((file) => {
          formData.append("files", file.raw);
        });
        addTalk(formData).then((res) => {
          this.$message.success("保存成功");
        });
      }
    },
    change(file, fileList, index) {
      this.talkDate[index].fileList = fileList;
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res.data.stuList;
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            return {
              value: `${ele.dm}(${ele.mc})`,
              label: ele.dm,
              xm: ele.mc,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    // 点击谁，就把谁放进去
    handleSelect(item, index) {
      //可以在点击时候动态添加参数，免得拼接,单独设计一个参数作为提交参数，免得各种复杂的截取和判断
      this.addParams[index] = item;
    },
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
        for (var i = 0; i < this.talkDate.length; i++) {
          this.$set(this.talkDate[i].tag.tags, "themeTags", res.data);
        }
      });
      queryTag(data1).then((res) => {
        for (var j = 0; j < this.talkDate.length; j++) {
          this.$set(this.talkDate[j].tag.tags, "addressTags", res.data);
        }
      });
    },
    showInput(type, index) {
      if (type == 1) {
        if (this.talkDate[index].tag.tags.themeTags.length > 9) {
          this.$message.error("最多九条");
        } else {
          this.talkDate[index].inputVisible = true;
          this.$nextTick((_) => {
            this.$refs.saveTagInput[index].$refs.input.focus();
          });
        }
      } else {
        this.talkDate[index].inputVisible1 = true;
        this.$nextTick((_) => {
          this.$refs.saveTagInput1[index].$refs.input.focus();
        });
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
    addStu() {
      if (this.renshu.length > 5) {
        this.$message.error("最多六条数据");
      } else {
        this.renshu.push({ value: "", label: "" });
      }
    },
    delStu(role, index) {
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
    height: 900px;
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
  .buttonStle {
    float: right;
    .saveButton {
      background: #005657;
      color: #ffffff;
    }
  }
}
</style>
