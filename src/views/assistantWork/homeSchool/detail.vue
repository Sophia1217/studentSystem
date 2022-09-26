<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">家访人员</span>
      </div>
      <el-form ref="formTop" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4.1">
            <el-form-item label="工号" prop="applyGh">
              <el-input 
                v-model="formTop.applyGh" 
                placeholder="请输入"
                :disabled= true
                ></el-input>
            </el-form-item>
            
          </el-col>
          <el-col :span="4">
            <el-form-item label="申报人" prop="applyXm">
              <el-input 
                v-model="formTop.applyXm" 
                placeholder="请输入"
                :disabled= true
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="单位" prop="dwh">
              <el-input 
                v-model="formTop.dwh" 
                placeholder="请输入"
                :disabled= true
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="岗位" prop="job">
              <el-input 
                v-model="formTop.job" 
                placeholder="请输入"
                :disabled= true
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="类型" prop="lxm">
              <el-input 
                v-model="formTop.lxm" 
                placeholder="请输入"
                :disabled= true
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="参与人" prop="joinName">
              <el-input 
                v-model="formTop.joinName" 
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="参与人" prop="joinName">
              <el-input 
                v-model="formTop.joinName" 
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
  
    </div>
    <div class="permissions">
      <div>
        <span class="title">家访详情</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <!-- <el-form-item label="姓 名" prop="stuName">
              <el-select
                v-model="form.stuName"
                placeholder="未选择"
                @change="selectClick"
              >
                <el-option
                  v-for="(item, index) in nameOptions"
                  :key="index"
                  :label="item.xm + '（' + item.gh + '）'"
                  :value="item.xm"
                ></el-option
              ></el-select>
          </el-form-item> -->
            <el-form-item label="学生姓名" prop="stuName">
              <el-input 
                v-model="form.stuName" 
                :disabled="edit == '1' ? true : false"
                placeholder="请输入"
                ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="家访主题" prop="theme">
              <el-input 
              v-model="form.theme" 
              placeholder="请输入"
              ></el-input>
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
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="家访形式" prop="model">
              <el-select v-model="form.model" placeholder="请选择">
                <el-option
                  v-for="item in modelOps"
                  :key="item.dm"
                  :label="item.xm"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="家访地点" prop="placePro">
              <el-select v-model="form.placePro" placeholder="省">
                <el-option
                  v-for="item in proOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item  prop="placeCity">
              <el-select v-model="form.placeCity" placeholder="市">
                <el-option
                  v-for="item in modelOps"
                  :key="item.dm"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item  prop="placeCounty">
              <el-select v-model="form.placeCounty" placeholder="县">
                <el-option
                  v-for="item in modelOps"
                  :key="item.dm"
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
      <div class="headLeft">
          <button class="span1" v-if="edit == 1" @click="editClick()">
            编辑
          </button>
          <button class="span1" v-if="edit == 2" @click="cancel()">取消</button>
          <button class="span2" v-if="edit == 2" @click="sava">保存</button>
      </div>
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
import {
  queryTreeList,
  queryTreeListJ,
  savaTreeList,
  savaEditList,
} from "@/api/systemMan/role";
import { 
  selectJxlxDetail,
  getCityList,
  updateJxlxDetail,
} from "@/api/assistantWork/homeSchool";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      edit: 1,
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
      modelOps:[
        { dm:"1",xm:"线上" },
        { dm:"2",xm:"线下" },
      ],
      modId: "",
      // 查询参数
      queryParams: {
        roleRem: "",
        roleName: this.isEdit == "1" ? "" : this.$route.query.roleNameEdit, // 编辑是2
      },
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      isEdit: "",
      savaData: [], //新增提交所需要的menuList
      roleId1: "", ////编辑请求的id,
      arr: [],
      arr1: ["01"],
      tag: {
        themeTags: [],
      },
      formTop:{
        applyGh:"",
        applyXm:"",
        dwh:"",
        job:"",
        joinName:"",
        gtcyrXmXgh:[],
        jfdd:"",//家访地点名称，暂定

      },
      form: {
        stuName: "",
        xsXmXgh:[],
        theme: "",//家访主题
        date:"",
        model:"",
        placePro:"",//省
        placeCity:"",//市
        placeCounty:"",//县
        detailPlace:"",
        state:"",
        

        inputVisible: false,
        inputValue: "",
        
      },
      //地区筛选框数据
      proOps: [],//省
      cityOps:[],
      countryOps:[],
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    // this.isEdit = this.$route.query.isEdit;
    // this.roleId1 = this.$route.query?.UpId;
    // this.roleName1 = this.$route.query?.roleNameEdit;
    // this.queryParams.roleRem = this.$route.query?.rem;
    // this.handleTree();

    (this.form.date = new Date());
    this.queryTag();
    this.getDetail();
    

  },

  methods: {
    //标签查询
    queryTag() {
      var data = {
        cyType: "1", //1主题,2地点,3组织单位
        userId: this.$store.getters.userId,
      };
      queryTag(data).then((res) => {
        this.$set(this.tag, "themeTags", res.data);
      });
    },
    cancel() {
      window.history.go(-1);
    },
    handleTree() {
      if (this.isEdit == 2) {
        let data = { roleId: this.roleId1 };
        let dataALL = { roleId: this.$store.state.user.roleId };
        queryTreeListJ(data)
          .then((res) => {
            var result = res.data;
            this.arr = result;
            // this.getData(result); //
          })
          .catch((err) => {});
        queryTreeList(dataALL)
          .then((res) => {
            this.treeData = res.data;
            this.setkeys();
          })
          .catch((err) => {});
      } else {
        let data = { roleId: this.$store.state.user.roleId };
        queryTreeList(data)
          .then((res) => {
            this.treeData = res.data;
          })
          .catch((err) => {});
      }
    },
    setkeys() {
      this.$refs.tree.setCheckedKeys(this.arr);
    },
    getData(data) {
      for (var i in data) {
        this.arr.push(data[i].modId); //将第一层的保存出来，
        if (data[i].children) {
          // if(data[i].length >)
          this.getData(data[i].children);
        }
      }
      return this.arr;
    },
    //elementUi中自带的方法，可以获取到所有选中的节点
    currentChecked(nodeObj, SelectedObj) {
      var that = this;
      const { checkedNodes, halfCheckedKeys } = SelectedObj;
      var menuList = checkedNodes.map((item) => item.modId);
      that.savaData = menuList.concat(halfCheckedKeys); //要获取上级根节点
    },
    showInput() {
      this.form.inputVisible = true;
    },
    handleInputConfirm() {
      var obj = {
        cyMsg: "",
        cyType:"1",
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
    editClick() {
      this.edit = 2;
      this.getAreaOps();
    },
    cancel() {
      this.edit = 1;
      //然后
    },
    //详情
    getDetail(){
      let data = { id: this.id };
      selectJxlxDetail(data).then((res)=>{
        // this.detailInfoList = res.data.rows;
        this.formTop.applyGh = res.data.sbrgh;
        this.formTop.applyXm = res.data.sbrxm;
        this.formTop.dwh = res.data.sbrdw;
        this.formTop.job = res.data.sbrgw;
        this.formTop.lxm = res.data.sbrlb;
        this.formTop.joinName = res.data.gtcyrxm;

        this.form.stuName = res.data.xm;
        this.form.theme = res.data.jfzt;
        this.form.date = res.data.jfsj
        this.form.model = res.data.jfxs
        this.form.placePro = res.data.jfddList[0].mc
        this.form.placeCity = res.data.jfddList[1].mc
        this.form.placeCounty = res.data.jfddList[2].mc
        this.form.detailPlace = res.data.xxdz
        this.form.state = res.data.jfqk

        this.formTop.xsXmXgh = res.data.xsXmXgh//暂时固定
        this.form.gtcyrXmXgh = res.data.gtcyrXmXgh//暂时固定
        this.form.jfdd = res.data.jfdd//暂时固定

      })
      // let data =  { id: this.$route.query.id };
      // selectJxlxDetail(data).then((res)=>{
      //   console.log(2);
      // })
    },
    //获取省市区列表
    getAreaOps(){
      getCityList({}).then((response) => {
        // 获取省列表数据
          this.proOps = response.data.rows;
      });
    },
    //保存
    sava() {
      let data ={
        id: this.id,
        jfdd: this.form.jfdd,//暂
        jfqk: this.form.state,
        jfsj: this.form.date,
        jfxs: this.form.model,
        jfzt: this.form.theme,
        xxdz: this.form.detailPlace,

        xsXmXgh: this.form.xsXmXgh,
        gtcyrXmXgh: this.formTop.gtcyrXmXgh

      }
      updateJxlxDetail(data).then((res) => {
        this.$message({
          message: res.errmsg,
          type: "success",
        })
        window.history.go(-1);
        
      });
      // if (this.isEdit === "1") {
      //   let data = {
      //     userId: this.$store.getters.userId,
      //     menuList: this.savaData,
      //     roleName: this.queryParams.roleName,
      //     loginRoleId: this.$store.getters.roleId,
      //     roleRem: this.queryParams.roleRem,
      //   };
      //   savaTreeList(data)
      //     .then(() => {
      //       this.$router.push({
      //         path: "/systems/role",
      //       });
      //     })
      //     .catch((err) => {});
      // } else {
      //   let data = {
      //     userId: this.$store.getters.userId,
      //     menuList: this.savaData.length > 0 ? this.savaData : this.arr, //如果用户进来没编辑，默认前一次筛选出来的树
      //     roleName: this.queryParams.roleName,
      //     roleId: this.roleId1,
      //     roleRem: this.queryParams.roleRem,
      //   };
      //   savaEditList(data)
      //     .then(() => {
      //       this.$router.push({
      //         path: "/systems/role",
      //       });
      //     })
      //     .catch((err) => {});
      // }
    },
    // savaEditList() {},

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
  .greenIcon {
    margin-top: 10px;
    background: url("~@/assets/assistantPng/add.png") no-repeat;
  }
  .roleWrap {
    background: #fff;
    margin-top: 10px;

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
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: #1f1f1f;
      font-weight: 400;
      line-height: 22px;
      margin-left: 16px;
    }
    .inputStyle{
      // margin-left: 20px;
      font-size: 14px;
      color: #1f1f1f;

      font-weight: 400;
      font-size: 14px;
      color: #1f1f1f;
              
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