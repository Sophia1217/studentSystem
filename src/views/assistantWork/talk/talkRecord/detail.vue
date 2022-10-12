<template>
  <div class="addRole">
    <div class="permissions1">
      <div class="headTop">
        <div class="headRight">
          <span class="title">谈话详情</span>
        </div>
        <div class="headLeft">
          <button
            class="span1"
            v-if="
              edit == 1 &&
              (xgh == $store.getters.userId || $store.getters.roleId == '01')
            "
            @click="editClick()"
          >
            编辑
          </button>
          <button class="span1" v-if="edit == 2" @click="cancal()">取消</button>
          <button class="span2" v-if="edit == 2" @click="save()">保存</button>
        </div>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="谈话人">
              <el-input
                :disabled="true"
                v-model="xgh"
                placeholder="请输入"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="姓名">
              <el-input
                :disabled="true"
                v-model="thrxm"
                placeholder="请输入"
              ></el-input> </el-form-item></el-col
          ><el-col :span="4">
            <el-form-item label="单位">
              <el-input
                :disabled="true"
                v-model="rzdw"
                placeholder="请输入"
              ></el-input> </el-form-item></el-col
          ><el-col :span="4">
            <el-form-item label="岗位">
              <el-input
                :disabled="true"
                v-model="thrgw"
                placeholder="请输入"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="类型">
              <el-input
                :disabled="true"
                v-model="thrlb"
                placeholder="请输入"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-form-item label="学生姓名">
          <el-row :gutters="20" class="suibian">
            <div v-for="(ele, index) in stuDate">
              <div v-if="edit == 1">
                <el-input
                  :disabled="edit == 2 ? false : true"
                  v-model="ele.value"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <div v-for="(ele, index) in stuDate" :key="index">
              <div v-if="edit == 2" style="display: flex">
                <el-autocomplete
                  v-model="stuDate[index].value"
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
                <div
                  v-if="
                    index == stuDate.length - 1 &&
                    stuDate.length !== 6 &&
                    edit == 2
                  "
                  class="editBtn"
                  @click="addStu(ele, index)"
                >
                  <i class="addIcon"></i>
                </div>
                <div
                  v-if="
                    stuDate.length == 6 ||
                    (index < stuDate.length - 1 && edit == 2)
                  "
                  class="deleIcon"
                  @click="delStu(ele, index)"
                >
                  <i></i>
                </div>
                <div></div>
              </div>
            </div>
          </el-row>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item label="谈话主题">
              <el-input
                v-model="Zhuti"
                placeholder="请输入谈话主题"
                :disabled="edit == 2 ? false : true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="谈话标签">
              <el-input
                :disabled="edit == 2 ? false : true"
                v-model="zhutiValue"
                placeholder="请输入谈话标签"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" v-if="edit == 2">
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
              :disabled="edit == 2 ? false : true"
              >新增常用主题</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="谈话地点">
              <el-input
                v-model="addressValue"
                :disabled="edit == 2 ? false : true"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="17" v-if="edit == 2">
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
        <el-row :gutter="20">
          <el-col :span="5.5">
            <el-form-item label="谈话日期">
              <el-date-picker
                v-model="date"
                :disabled="edit == 2 ? false : true"
                format="yyyy 年 MM 月 dd 日"
                type="date"
                :clearable="false"
                placeholder="选择日期"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="开始时间">
              <el-time-picker
                v-model="value1"
                :clearable="false"
                format="HH时mm分"
                value-format="HH:mm"
                :disabled="edit == 2 ? false : true"
                placeholder="选择开始时间"
              >
              </el-time-picker> </el-form-item
          ></el-col>
          <el-col :span="5.5">
            <el-form-item label="结束时间">
              <el-time-picker
                v-model="value2"
                :clearable="false"
                format="HH时mm分"
                value-format="HH:mm"
                :disabled="edit == 2 ? false : true"
                placeholder="选择结束时间"
              >
              </el-time-picker> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label="谈话内容">
          <el-input
            :disabled="edit == 2 ? false : true"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="请输入内容"
            v-model="textarea1"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件" v-if="edit == '1'">
          <!-- <div v-if="urlArr.length > 0" class="block">
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
            :before-remove="beforeRemove"
            :on-change="change"
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
    </div>
  </div>
</template>

<script>
import {
  queryTag,
  addTag,
  delTag,
  detailTalk,
  updateTalk,
  getXmXgh,
} from "@/api/assistantWork/talk";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
export default {
  data() {
    return {
      // videoSrc:
      //   "https://hzypt.oss-cn-hangzhou.aliyuncs.com/web/course/videocoursevideo1651113800000",
      urlArr: [],
      fileList: [],
      fileListAdd: [],
      lgnSn: "", //逻辑主键
      edit: 1,
      stuDate: [],
      tags: {
        themeTags: [],
        addressTags: [],
      },
      thrgw: "",
      rzdw: "",
      thrlb: "",
      thrxm: "",
      xgh: "",
      Zhuti: "",
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
      arr: [],
      val: "",
    };
  },

  mounted() {
    this.lgnSn = this.$route.query.id; //逻辑主键
    this.queryTag();
    this.getUrl();
    this.querywj();
    this.$nextTick((_) => {
      this.queryDetail();
    });
  },

  methods: {
    getUrl() {
      querywj({ businesId: this.lgnSn }).then((res) => {
        var arr = res.data || [];
        // console.log("arr", arr);
        var arr1 = [];
        // var ship = [];
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].fileSuffix == ".png" || arr[i].fileSuffix == ".jpg") {
            arr1.push(arr[i]);
          }
          // else if (arr[i].fileSuffix == ".mp4") {
          //   ship.push(arr[i]);
          // }
        }
        var arr2 = arr1.slice(0, 3) || [];
        // if (arr2.length > 0) {
        // console.log("arr2", arr2);
        for (var j = 0; j < arr2.length; j++) {
          Exportwj({ id: arr[j].id.toString() }).then((res) => {
            // console.log("res", res);
            this.urlArr.push(window.URL.createObjectURL(res));
            // console.log("this.urlArr", this.urlArr);
          });
        }
        // } else {
        //视频
        // console.log("shipinliyu", ship);
        // Exportwj({ id: ship[0].id.toString() }).then((res) => {
        //   console.log("res", res);
        //   this.videoSrc =
        //     "https://hzypt.oss-cn-hangzhou.aliyuncs.com/web/course/videocoursevideo1651113800000";
        //   // this.videoSrc = window.URL.createObjectURL(res);
        //   console.log("this.viedeo", this.videoSrc);
        // });
        // }
      });
    },
    change(file, fileList) {
      console.log("fileList", fileList);
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
        ["mp3", "mp2", "mpe", "mpeg", "mpg"].indexOf(ext) != -1
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
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    beforeRemove(file, fileList) {
      //用于文件删除
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
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
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    queryDetail() {
      detailTalk({ id: this.lgnSn }).then((res) => {
        const { list, stuList, fdyMain } = res.data;
        this.zhutiValue = list.thzttype;
        this.Zhuti = list.thzt;
        this.addressValue = list.thdd;
        this.date = list.thsj;
        this.value1 = list.startTime;
        this.value2 = list.endTime;
        this.textarea1 = list.thnr;
        this.stuDate = stuList;
        this.arr = stuList;
        this.thrgw = fdyMain.thrgw;
        this.rzdw = fdyMain.rzdw;
        this.thrlb = fdyMain.thrlb;
        this.thrxm = fdyMain.thrxm;
        this.xgh = fdyMain.xgh;
        for (var i = 0; i < this.stuDate.length; i++) {
          if (this.stuDate[i].xm !== "") {
            //此处找后台约定好
            this.$set(
              this.stuDate[i],
              "value",
              `${this.stuDate[i].xm}(${this.stuDate[i].xh})`
            );
            this.$set(this.stuDate[i], "xm", `${this.stuDate[i].xm}`);
            this.$set(this.stuDate[i], "xh", `${this.stuDate[i].xh}`);
          } else {
            this.stuDate[i].value = "";
          }
        }
      });
    },
    addStu(ele, index) {
      if (this.stuDate.length > 5) {
        this.$message.error("最多六条数据");
      } else {
        this.stuDate.push({ value: "" });
      }
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
            return {
              value: `${ele.mc}(${ele.dm})`.trim(),
              xh: ele.dm.trim(),
              xm: ele.mc.trim(),
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

    delStu(ele, index) {
      this.stuDate.splice(index, 1);
    },
    handleSelect(item, index) {
      this.stuDate[index] = item;
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
    showInput(type) {
      if (type == 1) {
        if (this.tags.themeTags.length > 8) {
          this.$message.error("常用主题标签最多九条");
        } else {
          this.inputVisible = true;
          this.$nextTick((_) => {
            this.$refs.saveTagInput$refs.input.focus();
          });
        }
      } else {
        if (this.tags.addressTags.length > 8) {
          this.$message.error("常用地点标签最多九条");
        } else {
          this.inputVisible1 = true;
          this.$nextTick((_) => {
            this.$refs.saveTagInput1.$refs.input.focus();
          });
        }
      }
    },
    handleInputConfirm(type) {
      if (type == 1) {
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
        if (this.inputValue1.length > 15) {
          this.$message.error("常用地点标签输入值应不超过十五个字符");
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
      }
    },
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    pushData(item, type) {
      if (type == 1) {
        if (this.zhutiValue == "") {
          this.zhutiValue = this.zhutiValue + item.cyMsg;
        } else {
          if (this.zhutiValue.length < 30) {
            this.zhutiValue = this.zhutiValue + "," + item.cyMsg;
          } else {
            this.$message.error("常用主题总长度不应该超过三十个字符长度");
          }
        }
      } else {
        if (this.addressValue == "") {
          this.addressValue = this.addressValue + item.cyMsg;
        } else {
          if (this.addressValue.length < 30) {
            this.addressValue = this.addressValue + "," + item.cyMsg;
          } else {
            this.$message.error("常用地点总长度不应该超过三十个字符长度");
          }
        }
      }
    },

    cancal() {
      this.edit = 1;
      //然后
    },
  },
};
</script>

<style lang="scss" scoped>
.addRole {
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
