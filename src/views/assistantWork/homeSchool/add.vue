<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">家访人员</span>
      </div>
      <div class="wai-container">
        <div class="roleWrap" v-for="(ele, index) in renshu" :key="index">
          <div class="roleStyle">
            <div class="name">参与人{{ index + 1 }}:</div>
            <div>
              <el-autocomplete
                v-model="ele.acceptVlaue"
                :fetch-suggestions="querySearchPart"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="
                  (item) => {
                    handleSelectPart(item, index);
                  }
                "
                size="small"
              ></el-autocomplete>
            </div>
          </div>
          <div
            v-if="index == renshu.length - 1 && renshu.length !== 6"
            class="editBtn"
            @click="addPart(ele, index)"
          >
            <i class="addIcon"></i>
          </div>
          <div
            v-if="renshu.length == 6 || index < renshu.length - 1"
            class="deleIcon"
            @click="delPart(ele, index)"
          >
            <i></i>
          </div>
        </div>
      </div>
    </div>
    <div class="permissions">
      <div>
        <span class="title">家访详情</span>
      </div>
      <el-form ref="queryForm" label-width="80px" :rules="rules">
        <el-form-item label="学生姓名">
          <el-row :gutters="20" class="suibian">
            <div v-for="(ele, index) in renshuStu" :key="index">
              <!-- <div class="name">{{ index + 1 }}:</div> -->
              <div style="display: flex">
                <el-autocomplete
                v-model="ele.acceptVlaue"
                :fetch-suggestions="querySearchStu"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="
                  (item) => {
                    handleSelectStu(item, index);
                  }
                "
                size="small"
                ></el-autocomplete>
                <div
                  v-if="index == renshuStu.length - 1 && renshuStu.length !== 6"
                  class="editBtn"
                  @click="addStu(ele, index)"
                >
                  <i class="addIcon"></i>
                </div>
                <div
                  v-if="renshuStu.length == 6 || index < renshuStu.length - 1"
                  class="deleIcon"
                  @click="delStu(ele, index)"
                >
                  <i></i>
                </div>
              </div>
            </div>
          </el-row>
          
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="家访主题" prop="theme">
              <el-input v-model="form.theme" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="常用主题" label-width="90px"></el-form-item>
            </el-col>
          <el-col :span="15">
            <el-tag
              v-for="item in tag.themeTags"
              :key="item.cyMsg"
              @click="pushData(item)"
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
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              icon="el-icon-plus"
              style="margin-left: 15px"
              @click="showInput"
              >新增主题</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="走访日期" prop="date">
              <el-date-picker 
                type="date" 
                placeholder="选择日期" 
                v-model="form.date" 
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="家访形式" prop="homeModel">
              <el-select 
                v-model="form.homeModel" 
                placeholder="请选择"
                @change="changeModel"
                >
                <el-option
                  v-for="item in modelOps"
                  :key="item.xm"
                  :label="item.xm"
                  :value="item.xm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="家访地点" prop="didian">
              <el-select 
                v-model="form.proPlace" 
                @change="changeX"
                :disabled="xianshang == '1' ? true : false"
                placeholder="省"
                >
                <el-option
                  v-for="(item, index) in proOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
              <el-select 
                v-model="form.cityPlace" 
                @change="changeY"
                :disabled="xianshang == '1' ? true : false"
                placeholder="市"
                >
                <el-option
                  v-for="(item, index) in cityOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
              <el-select 
                v-model="form.countryPlace" 
                :disabled="xianshang == '1' ? true : false"
                placeholder="县"
                >
                <el-option
                  v-for="(item, index) in xianOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="详细地址" prop="detailPlace">
              <el-input 
                v-model="form.detailPlace" 
                placeholder="请输入"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="走访情况" prop="state">
              <el-input 
                v-model="form.state" 
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
        <button class="span1"  @click="cancel()">取消</button>
        <button class="span2"  @click="sava">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryTreeList,
  queryTreeListJ,
  savaTreeList,
  savaEditList,
} from "@/api/systemMan/role";
import { 
  insertJxlx,
  getXmXgh,
  queryStuList,
  getCityList,
} from "@/api/assistantWork/homeSchool";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      fileList: [],
      xianshang: 0,
      renshu: [
        {
          acceptVlaue: "",
          value: "",
          label: "",
        },
      ],
      renshuStu: [
        {
          acceptVlaue: "",
          value: "",
          label: "",
        },
      ],
      partDate: [],
      stuDate:[],
      modelOps:[
        { dm:"1",xm:"线上视频" },
        { dm:"2",xm:"线下实地" },
      ],
      modId: "",
      // 查询参数
      // queryParams: {
      //   roleRem: "",
      //   roleName: this.isEdit == "1" ? "" : this.$route.query.roleNameEdit, // 编辑是2
      // },
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },

      savaData: [], //新增提交所需要的menuList
      roleId1: "", ////编辑请求的id,
      arr: [],
      arr1: ["01"],
      tag: {
        themeTags: [],
      },
      form: {
        theme: "",//家访主题
        date:"",
        homeModel:"",
        proPlace:"",//省
        cityPlace:"",//市
        countryPlace:"",//县
        detailPlace:"",
        state:"",

        inputVisible: false,
        inputValue: "",
      },
      //地区筛选框数据
      proOps: [],//省
      cityOps:[],
      xianOps:[],
      //表单校验
      rules: {
        // theme: [
        //   { required: true, message: "家访主题为空", trigger: "change" },
        // ],
        // homeModel: [
        //   { required: true, message: "家访形式为空", trigger: "change" },
        // ],
        // date: [
        //   { required: true, message: "家访日期为空", trigger: "change" },
        // ],
        // didian: [
        //   { required: true, message: "请选择家访地点", trigger: "change" },
        // ],
    }
    };
  },

  mounted() {
    // this.isEdit = this.$route.query.isEdit;
    // this.roleId1 = this.$route.query?.UpId;
    // this.roleName1 = this.$route.query?.roleNameEdit;
    // this.queryParams.roleRem = this.$route.query?.rem;
    // this.handleTree();

    (this.form.date = new Date());
    this.queryTag();
    this.getProOps();
  },

  methods: {
    //标签查询
    queryTag() {
      var data = {
        cyType: "4", //1家校主题,2地点,3组织单位，4班团主题
        userId: this.$store.getters.userId,
      };
      queryTag(data).then((res) => {
        this.$set(this.tag, "themeTags", res.data);
      });
    },
    cancel() {
      window.history.go(-1);
    },

    showInput() {
      this.form.inputVisible = true;
    },
    handleInputConfirm() {
      var obj = {
        cyMsg: "",
        cyType:"4",
        userId: this.$store.getters.userId,
      };
      obj.cyMsg = this.form.inputValue;
      addTag(obj).then((res) => {
        this.queryTag();
      });
      this.form.inputVisible = false;
      this.form.inputValue = "";
    },
    //关闭标签
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    //选中标签
    pushData(item) {
        if (this.form.theme == "") {
          this.form.theme =
            this.form.theme + item.cyMsg;
        } else {
          this.form.theme =
            this.form.theme + "," + item.cyMsg;
        }
     
    },
    //共同参与人
    querySearchPart(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(Xm).then((res) => {
          console.log("res",res.data);
          result = res.data.length > 0 ? res.data:[];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
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
    handleSelectPart(item, index) {
      //可以在点击时候动态添加参数，免得拼接,单独设计一个参数作为提交参数，免得各种复杂的截取和判断
      this.partDate[index] = item;
    },
    addPart() {
      if (this.renshu.length > 5) {
        this.$message.error("最多六条数据");
      } else {
        this.renshu.push({ value: "", label: "" });
      }
    },
    delPart(role, index) {
      this.renshu.splice(index, 1);
    },
    //学生
    querySearchStu(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xm).then((res) => {
          console.log("res",res.data);
          result = res.data.length > 0 ? res.data:[];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
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
    handleSelectStu(item, index) {
      //可以在点击时候动态添加参数，免得拼接,单独设计一个参数作为提交参数，免得各种复杂的截取和判断
      this.stuDate[index] = item;
    },
    addStu() {
      if (this.renshu.length > 5) {
        this.$message.error("最多六条数据");
      } else {
        this.renshuStu.push({ value: "", label: "" });
      }
    },
    delStu(role, index) {
      this.renshuStu.splice(index, 1);
    },
    //改变家访形式
    changeModel(val){
      if (val =="线上视频"){
        this.xianshang = 1;
        this.form.proPlace = [];
        this.form.cityPlace = []; // 市
        this.form.countryPlace = []; 
      }else{
        this.xianshang = 0;
      }
    },
    //获取省列表
    getProOps(){
      getCityList({}).then((res) => {
          this.proOps = res.data;
      });
    },
    // 省找市
    getCity(val) {
      this.cityOps = [];
      let data = { dm: val };
      if (Object.keys(val).length !== 0) {
        getCityList(data)
          .then((res) => {
            this.cityOps = res.data;
          })
          .catch((err) => {});
      }
    },
    // 市找县
    getXian(val) {
      this.xianOps = [];
      let data = { dm: val };
      if (Object.keys(val).length !== 0) {
        getCityList(data)
          .then((res) => {
            this.xianOps = res.data;
          })
          .catch((err) => {});
      }
    },
    changeX(val) {
      if (val) {
        this.form.cityPlace = []; // 市
        this.form.countryPlace = []; 
      }
      this.getCity(val);
    },
    changeY(val) {
      if (val) {
        this.form.countryPlace = []; //县
      }
      this.getXian(val);
    },
    //上传文件
    change(file, fileList) {
      this.fileList = fileList;
      console.log("file", file);
      console.log("fileList", fileList);
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.queryForm.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    //保存
    sava() {
      //校验
      //  if (!this.checkForm()) {
      //   this.$message.error("请完善家访信息！");
      //   return;
      // }
      let formData = new FormData();
      formData.append("jfdd", this.form.countryPlace);
      formData.append("jfqk", this.form.state);
      formData.append("jfsj", this.form.date);
      formData.append("jfxs", this.form.homeModel);
      formData.append("jfzt", this.form.theme);
      formData.append("xxdz", this.form.detailPlace);
      for(let i=0,len= this.stuDate.length;i<len;i++){
        let locationInfo = this.stuDate[i];
        formData.append('xsXmXgh['+i+'].xm',locationInfo.xm);
        formData.append('xsXmXgh['+i+'].gh',locationInfo.gh);
      }
      for(let j=0,leng= this.partDate.length;j<leng;j++){
        let locationInfo = this.partDate[j];
        formData.append('gtcyrXmXgh['+j+'].xm',locationInfo.xm);
        formData.append('gtcyrXmXgh['+j+'].gh',locationInfo.gh);
      }

      insertJxlx(formData).then((res) => {
        this.$message({
          message: res.errmsg,
          type: "success",
        })
        window.history.go(-1);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
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
  .suibian {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
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
  .name {
        margin-right: 20px;
        font-weight: 600;
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
    .search{
      background: #005657;
      align-items: center;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
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
  .headLeft {
      display: flex;
      align-items: center;
      justify-content:flex-end;
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
</style>