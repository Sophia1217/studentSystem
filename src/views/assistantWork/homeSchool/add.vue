<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">家访人员</span>
      </div>
      <div class="wai-container">
        <div class="roleWrap" v-for="(role, index) in renshu" :key="index">
          <div class="roleStyle">
            <div class="name">姓名{{ index + 1 }}:</div>
            <div>
              <el-select
                v-model="role.value"
                size="small"
                placeholder="请选择"
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
    <div class="permissions">
      <div>
        <span class="title">家访详情</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="学生姓名" prop="stuName">
              <el-input v-model="form.stuName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-button
            type="primary"
            size="mini"
            class="search"
            @click="handleQuery"
            >查询</el-button>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="家访主题">
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
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="家访形式" prop="homeModel">
              <el-select v-model="form.homeModel" placeholder="请选择">
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
                  v-for="item in modelOps"
                  :key="item.dm"
                  :label="item.xm"
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
                  :label="item.xm"
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
                  :label="item.xm"
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
        <button class="span1"  @click="cancel()">取消</button>
        <button class="span2"  @click="sava">保存</button>
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
    <!-- 查询学生对话框 -->
    <el-dialog
      title="学生查询"
      :visible.sync="openStuSearch"
      width="800px"
      height="243px"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="formSearch"
        :model="formSearch"
        label-width="40px"
      >
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="学院" prop="dwhStu">
              <el-select v-model="formSearch.dwhStu" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in modelOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="formSearch.grade" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in modelOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="班级" prop="class">
              <el-select v-model="formSearch.class" placeholder="请选择" clearable>
                <el-option
                  v-for="(item, index) in modelOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-radio v-model="formSearch.radio" label="1">备选项</el-radio>
        <el-radio v-model="formSearch.radio" label="2">备选项</el-radio>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSearch">取消</el-button>
        <el-button type="primary" @click="searchConfirm" class="confirm"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryTreeList,
  queryTreeListJ,
  savaTreeList,
  savaEditList,
} from "@/api/systemMan/role";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        // { name: "标签五", type: "danger" },
      ],
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
      form: {
        stuName: "",
        theme: "",//家访主题
        date:"",
        homeModel:"",
        placePro:"",//省
        placeCity:"",//市
        placeCounty:"",//县
        detailPlace:"",
        state:"",

        inputVisible: false,
        inputValue: "",
      },
      formSearch: {
        dwhStu:"",
        grade:"",
        class:"",
        radio: "",
      },
      openStuSearch: false,
    };
  },

  mounted() {
    this.isEdit = this.$route.query.isEdit;
    this.roleId1 = this.$route.query?.UpId;
    this.roleName1 = this.$route.query?.roleNameEdit;
    this.queryParams.roleRem = this.$route.query?.rem;
    this.handleTree();

    (this.form.date = new Date());
    this.queryTag();
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
    addRoles() {
      this.renshu.push("");
    },
    deleRoles(role, index) {
      this.renshu.splice(index, 1);
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

    //查询
    handleQuery(){
      console.log(1);
      this.openStuSearch = true;
    },
    //查询确认
    searchConfirm(){
      console.log(2);
      let stus = "";
      stus = this.formSearch.radio;


    },
    //查询取消
    cancelSearch(){
      console.log(3);
      this.openStuSearch = false;
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