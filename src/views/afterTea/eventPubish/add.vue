<template>
  <div class="addHomeSchool">
    <el-form ref="form" label-width="80px" :model="form" :rules="rules">
      <div class="permissions">
        <div>
          <span class="title">参与人</span>
        </div>
        <div>
          <div v-for="(ele, ind) in form.cyrList">
            <div style="display: flex">
              <div style="width: 200px">
                <el-upload
                  class="avatar-uploader"
                  action="#"
                  :file-list="ele.fileList"
                  :show-file-list="false"
                  :on-change="
                    (item, item1) => {
                      change(item, item1, ind);
                    }
                  "
                  :auto-upload="false"
                  ref="upload"
                >
                  <img v-if="ele.imageUrl" :src="ele.imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div style="width: 1350px">
                <el-row :gutter="20">
                  <el-col :span="7">
                    <el-form-item label="姓名" :rules="rules.common" :prop="'cyrList.'+ind+'.acceptVlaue'" >
                      <el-autocomplete
                        v-model="ele.acceptVlaue"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入姓名"
                        :trigger-on-focus="false"
                        @select="
                          (item) => {
                            handleSelect(item, ind);
                          }
                        "
                        size="small"
                      ></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1.5" :offset="14">
                    <div
                      class="btns fullGreen"
                      v-if="ind == 0"
                      @click="xinzeng"
                    >
                      <i class="icon passIcon"></i
                      ><span class="title1">新增</span>
                    </div>
                    <div
                      class="btns borderRed"
                      v-if="ind > 0"
                      @click="shanchu(ind)"
                    >
                      <i class="icon lightIcon"></i
                      ><span class="title1">删除</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="23">
                    <el-form-item label="简介">
                      <el-input
                        :maxlength="500"
                        type="textarea"
                        :rows="4"
                        v-model="ele.cyrJj"
                        placeholder="请输入"
                        maxlength="50"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span class="title">活动详情</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="活动主题" prop="hdzt" :rules="rules.common">
                <el-input
                  :maxlength="50"
                  style="width: 220px"
                  v-model="form.hdzt"
                  placeholder="请输入"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="单个教授可通过人数"
                prop="dgjsktgrs"
                label-width="150px"
                :rules="rules.common"
              >
                <el-input-number
                  :max="999"
                  style="width: 150px"
                  v-model="form.dgjsktgrs"
                  placeholder="请输入人数"
                  :controls="false"
                  :min="1"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="组织单位" prop="zzdw" :rules="rules.common">
                <el-select
                  v-model="form.zzdw"
                  collapse-tags
                  :clearable="true"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in allDwh"
                    :key="item.dm"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动类别" prop="hdlb" :rules="rules.common">
                <el-select
                  v-model="form.hdlb"
                  collapse-tags
                  :clearable="true"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in lbLsit"
                    :key="item.dm"
                    :label="item.mc"
                    :value="item.dm"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="活动时间" prop="hdsj" :rules="rules.common">
                <el-date-picker
                  v-model="form.hdsj"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  :clearable="true"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="开始时间"
                prop="hdkssj"
                :rules="rules.common"
              >
                <el-time-picker
                  format="HH时mm分"
                  v-model="form.hdkssj"
                  :clearable="true"
                  value-format="HH:mm"
                  placeholder="选择开始时间"
                >
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="结束时间"
                prop="hdjssj"
                :rules="rules.common"
              >
                <el-time-picker
                  format="HH时mm分"
                  v-model="form.hdjssj"
                  :clearable="true"
                  value-format="HH:mm"
                  placeholder="选择结束时间"
                >
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动地点" prop="hddd" :rules="rules.common">
                <el-input
                  :maxlength="100"
                  style="width: 220px"
                  v-model="form.hddd"
                  placeholder="请输入"
                  maxlength="50"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="活动简介" prop="hdjj" :rules="rules.common">
                <el-input
                  :maxlength="1000"
                  type="textarea"
                  :rows="7"
                  placeholder="请输入内容"
                  v-model="form.hdjj"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="editBottom">
      <div class="btn confirm">取消</div>
      <div class="btn cancel" @click="addClick">保存</div>
    </div>
  </div>
</template>

<script>
import myMixins from "./mixin";
import { getXmXgh } from "@/api/assistantWork/talk";
import { add } from "@/api/teacherTea/index";
export default {
  mixins: [myMixins],
  data() {
    return {
      form: {
        cyrList: [
          {
            fileList: [], //文件
            cyrJj: "", //简介
            cyrMc: "", //名称
            cyrGh: "", //工号
            acceptVlaue: "",
            imageUrl: "",
          },
        ],
        hdzt: "",
        dgjsktgrs: undefined,
        zzdw: "",
        hdlb: "",
        hdsj: "",
        hdkssj: "",
        hdjssj: "",
        hddd: "",
        hdjj: "",
      },
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.getAllCollege();
  },

  methods: {
    xinzeng() {
      if (this.form.cyrList.length < 10) {
        this.form.cyrList.push({
          fileList: [], //文件
          cyrJj: "", //简介
          cyrMc: "", //名称
          cyrGh: "", //工号
          acceptVlaue: "",
          imageUrl: "",
        });
      } else {
        this.$message.error("最多新增十位参与人数据");
      }
    },
    shanchu(num) {
      console.log("num", num);
      this.form.cyrList.splice(num, 1);
    },
    addClick() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.form;
        console.log("data", data);
        let formData = new FormData();
        formData.append("hdzt", data.hdzt);
        formData.append("dgjsktgrs", data.dgjsktgrs);
        formData.append("zzdw", data.zzdw);
        formData.append("hdlb", data.hdlb);
        formData.append("hdsj", data.hdsj);
        formData.append("hdkssj", data.hdkssj);
        formData.append("hdjssj", data.hdjssj);
        formData.append("hddd", data.hddd);
        formData.append("hdjj", data.hdjj);
        if (this.form.cyrList.length > 0) {
          for (let i = 0, len = data.cyrList.length; i < len; i++) {
            var location = data.cyrList[i];
            formData.append(
              "cyrList[" + i + "].cyrGh",
              location.cyrGh ? location.cyrGh : location.acceptVlaue
            );
            formData.append(
              "cyrList[" + i + "].cyrMc",
              location.cyrMc ? location.cyrMc : location.acceptVlaue
            );
            formData.append("cyrList[" + i + "].cyrJj", location.cyrJj || "");
            if (location.fileList.length > 0) {
              formData.append(
                "cyrList[" + i + "].file",
                location.fileList && location.fileList[0].raw
                  ? location.fileList[0].raw
                  : ""
              );
            }
          }
        }
        add(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.$router.push({
              path: "/afterTea/eventPubish",
            });
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    change(file, fileList, ind) {
      //因为上传覆盖，直接置空
      this.form.cyrList[ind].fileList = [];
      const index = file.name.lastIndexOf(".");
      const ext = file.name.substr(index + 1);
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      if ("jpe, jpeg, jpg, png".indexOf(ext) == -1) {
        this.$message.error("请上传图片格式");
        fileList.splice(idx, 1);
      } else if (Number(file.size / 1024 / 1024) > 2) {
        this.$message.error("图片大小不超过2M,上传失败");
        fileList.splice(idx, 1);
      } else {
        //让前端图片回显
        let binaryData = [];
        binaryData.push(file.raw);
        this.form.cyrList[ind].imageUrl = window.URL.createObjectURL(
          new Blob(binaryData)
        );
      }
      //取当前的file存入filelist
      this.form.cyrList[ind].fileList.push(file);
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
              value: `${ele.mc}(${ele.dm})`,
              label: ele.dm,
              xm: ele.mc,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          cb(callBackArr);
        });
      }
    },
    handleSelect(item, index) {
      this.form.cyrList[index].cyrMc = item.xm;
      this.form.cyrList[index].cyrGh = item.label;
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.form.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 158px;
    line-height: 158px;
    text-align: center;
  }
  .avatar {
    border-radius: 50%;
    width: 158px;
    height: 158px;
    display: block;
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
  }
  .fullGreen {
    // border:1px solid #005657;
    color: #fff;
    background: #005657;
  }
  .borderRed {
    border: 1px solid #e8e8e8;
    color: red;
    background: #fff;
  }
  .btns {
    margin-right: 15px;
    padding: 0px 10px;
    cursor: pointer;
    border-radius: 4px;
    .title1 {
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      // vertical-align: middle;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: top;
      margin-right: 5px;
    }
    .passIcon {
      margin-top: 10px;
      background: url("~@/assets/assistantPng/add.png") no-repeat;
    }
    .lightIcon {
      margin-top: 9px;
      background: url("~@/assets/assistantPng/delete.png") no-repeat;
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
