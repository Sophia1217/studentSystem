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
                  disabled
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
                    <el-form-item
                      label="姓名"
                      :rules="rules.common"
                      :prop="'cyrList.' + ind + '.acceptVlaue'"
                    >
                      <span>{{ ele.acceptVlaue }}</span>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="1.5" :offset="14">
                    <div
                      class="btns fullGreen"
                      v-if="ind == 0 && bjzt == '2'"
                      @click="xinzeng"
                    >
                      <i class="icon passIcon"></i
                      ><span class="title1">新增</span>
                    </div>
                    <div
                      class="btns borderRed"
                      v-if="ind > 0 && bjzt == '2'"
                      @click="shanchu(ind)"
                    >
                      <i class="icon lightIcon"></i
                      ><span class="title1">删除</span>
                    </div>
                  </el-col> -->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="23">
                    <el-form-item label="简介">
                      <div>{{ ele.cyrJj }}</div>
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
              <el-form-item label="活动主题" prop="hdzt">
                <span>{{ form.hdzt }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="单个教授可通过人数"
                prop="dgjsktgrs"
                label-width="150px"
              >
                <span>{{ form.dgjsktgrs }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="组织单位" prop="zzdw">
                <span>{{ form.zzdwmc }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动类别" prop="hdlb">
                <span>{{ form.hdlb }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="活动时间" prop="hdsj">
                <span>{{ form.hdsj }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开始时间" prop="hdkssj">
                <span>{{ form.hdkssj }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间" prop="hdjssj">
                <span>{{ form.hdjssj }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动地点" prop="hddd">
                <span>{{ form.hddd }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="活动简介" prop="hdjj">
                <div>{{ form.hdjj }}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item label="所选教授" prop="xzjs" :rules="rules.common">
                <span v-if="bjzt == '1'">{{ form.sxjsxm }}</span>
                <el-select
                  v-else
                  v-model="form.xzjs"
                  placeholder="请选择"
                  :clearable="true"
                  size="small"
                >
                  <el-option
                    v-for="(item, index) in jsOps"
                    :key="index"
                    :label="item.mc"
                    :value="item.gh"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-form-item
                label="拟提问问题"
                prop="ntwwt"
                :rules="rules.common"
                label-width="100"
              >
                <div v-if="bjzt == '1'">{{ form.ntwwt }}</div>
                <el-input
                  v-else
                  type="textarea"
                  :maxlength="500"
                  :rows="4"
                  v-model="form.ntwwt"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <div class="editBottom">
      <div class="btn cancel" @click="back">返回</div>
      <div class="btn confirm" v-if="bjzt != '1'" @click="apply">申请</div>
    </div>
  </div>
</template>

<script>
import myMixins from "@/views/afterTea/eventPubish/mixin";
import { getXmXgh } from "@/api/assistantWork/talk";
import { add, getDetail } from "@/api/teacherTea/index";
import { jsxwcSqTj, queryJsList } from "@/api/afterTea/stu";
import { Exportwj } from "@/api/assistantWork/classEvent";
export default {
  mixins: [myMixins],
  data() {
    return {
      bjzt: this.$route.query.bjzt,
      jsOps: [],
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
        ntwwt: "",
      },
      allInfo: {},
      lgnSn: "",
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
    this.id = this.$route.query.id; //逻辑主键
    this.allInfo = this.$route.query.allInfo; //基本信息
    this.form = Object.assign(this.form, this.allInfo);
    this.getInfo();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    async getInfo() {
      await getDetail({ hdId: this.id }).then((res) => {
        this.form.cyrList = res.data.map((ele) => {
          return {
            fileList: [],
            ...ele,
          };
        });
      });
      for (var j = 0; j < this.form.cyrList.length; j++) {
        var data;
        if (this.form.cyrList[j].file) {
          await Exportwj({ id: this.form.cyrList[j].file.id.toString() }).then(
            (res) => {
              data = new File([res], this.form.cyrList[j].file.fileName, {
                type: "application/png",
                lastModified: Date.now(),
              });

              this.form.cyrList[j].fileList.push(data);

              this.form.cyrList[j].imageUrl = URL.createObjectURL(res);
            }
          );
        }
        this.jsOps.push({
          mc: this.form.cyrList[j].cyrMc,
          gh: this.form.cyrList[j].cyrMc + "," + this.form.cyrList[j].cyrGh,
        });
      }
      // console.log("form", this.form);
      // console.log(this.jsOps);
    },
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
      this.form.cyrList.splice(num, 1);
    },
    apply() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        let data = {
          hdid: this.id,
          dgjsktgrs: this.form.dgjsktgrs,
          ntwwt: this.form.ntwwt,
          sxjsgh: this.form.xzjs.split(",")[1],
          sxjsxm: this.form.xzjs.split(",")[0],
          // sxjsgh: this.form.xzjs.gh,
          // sxjsxm: this.form.xzjs.mc,
        };
        jsxwcSqTj(data).then((res) => {
          this.$router.go(-1);
        });
      }
    },
    change(file, fileList, ind) {
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
        console.log("huixian");
        let binaryData = [];
        binaryData.push(file.raw);
        this.form.cyrList[ind].imageUrl = window.URL.createObjectURL(
          new Blob(binaryData)
        );
        console.log(
          " this.form.cyrList[ind].imageUrl",
          this.form.cyrList[ind].imageUrl
        );
      }
      //取当前的file存入filelist
      this.form.cyrList[ind].fileList.push(file);
      console.log(
        "  this.form.cyrList[ind].fileList2222",
        this.form.cyrList[ind].fileList
      );
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
    cursor: default;
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
