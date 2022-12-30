<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <div class="headerTop1">
        <span class="title">{{form.wjName}}</span>
      </div>
      <el-form :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="问卷导语：" label-width="100px">
              {{form.wjDy}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="适用年度：" label-width="100px">
              {{form.wjYear}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索结果显示表格 -->
    <div class="tableWrap">
      <div>
        <div v-for="(item, index) in mkList" :key="index">
          <div v-if="item.mk !== null">
            <div style="font-weight: bolder;line-height:30px">
              <span>第{{item.mk1}}部分</span>
            </div>
            <div style="font-weight: bold;line-height:30px">
              <span>评分类别：{{item.mk2}}</span>
            </div>
          </div>
          <el-table :data="item.fdycpTmJgResList" style="margin-bottom:15px">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column
              label="评分项目"
              min-width="200">
              <template slot-scope="scope">
                <span> {{ scope.row.fdycpTm.tmName }}（{{ scope.row.fdycpTm.tmFz }}分）</span>
              </template>
            </el-table-column>
            <el-table-column prop="fdycpTmxxjg.xxFz" label="分数" min-width="100">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="确认提交提示" :visible.sync="showSubmit" width="30%">
      <span>确认提交？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="handleConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  excelFdyBthd,
} from "@/api/assistantWork/classEvent";
import { queryWjDetail } from "@/api/test/unitTest";
export default {
  name: "BasicInfo",
  props: [],
  data() {
    return {
      AUTHFLAG: false,
      showSubmit:false,
      rules: {
        // ghContent: [
        //   { required: true, message: "工号不能为空", trigger: "blur" },
        // ],
      },
      mkList:[
        {
          fdycpTmJgResList: [{
            fdycpTmxxjg:{xxFz:"",},
            fdycpTm:{},
          }],
        }
      ],
      queryParams: {
        xghBpcr: this.$route.query.gh,//被测评人
        id: this.$route.query.id,
        xghDtr:"",
      },
      form: {
        wjDy:"",
        wjYear:"",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG; 
    this.getList(this.queryParams);
  },

  methods: {
    //获取数据列表
    async getList() {
      queryWjDetail(this.queryParams)
        .then((res) => {
          this.form = res.data.fdycpWj;
          this.mkList = res.data.fdycpMkTmResList;//模块
          for(var x=0;x<this.mkList.length;x++){
            this.mkList[x].mk1 = this.mkList[x].mk.slice(0,1);
            this.mkList[x].mk2 = this.mkList[x].mk.slice(3);
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    // 打开提交弹窗
    handleSubmit() {
      this.showSubmit = true;
    },
    // 提交取消
    handleCancel() {
      this.showSubmit = false;
    },
    // 提交确认
    handleConfirm() {
      this.showSubmit = false;
      let data = {
        ids: "2",
      };
      excelFdyBthd(data)
        .then((res) => {
          this.$message.success("提交成功") 
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {

  // margin-top: 15px;
  padding:20px;
  .headerDilog{
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    .tableTop{
      margin-bottom:15px;
    }
    .title{
      font-weight: 600;
      font-size: 18px;
      color: #1f1f1f;
      line-height: 28px;
    }
    .zhu{
      margin-top: 15px;
    }
    .title2{
      font-weight: 500;
      font-size: 14px;
      color: #1f1f1f;
      line-height: 20px;
    }
  }
  .searchWrap {
    background: #fff;
    // margin-top: 30px;
    .headerTop1 {
      display: flex;
      padding-top: 30px;
      flex-direction: row;
      justify-content:center;
      align-items: center;
      background: #fff;
      .title {
          font-weight: 600;
          font-size: 20px;
          color: #1f1f1f;
          line-height: 28px;
        }
    }
  }
  .tableWrap {
    background: #fff;
    padding: 0 20px 0;
    .headerTop {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          border: 1px solid grey;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fdf6f3;
        }
        .borderGreen {
          border: 1px solid grey;
          background: #fff;
        }
        .borderRed {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
        .fullGreen {
          // border:1px solid #005657;
          color: #fff;
          background: #005657;
        }
        .btns {
          margin-right: 15px;
          padding: 0px 10px;
          cursor: pointer;
          border-radius: 4px;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 14px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .orangeIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/out.png") no-repeat;
          }
          .lightIcon {
            margin-top: 9px;
            background: url("~@/assets/assistantPng/delete.png") no-repeat;
          }
        }
      }
    }
    .scopeIncon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    .handleName {
      font-weight: 400;
      font-size: 14px;
      color: #005657;
      line-height: 28px;
    }
    .handledie {
      background: url("~@/assets/images/details.png");
    }
    .handleEdit {
      background: url("~@/assets/images/edit.png");
    }
  }
  .searchButton {
    background: #005657;
    color: white;
  }
}

.pagination {
  left: 20%;
  transform: translateX(-50%);
  text-align: center;
}
.pagination2 {
  left: 20%;
  transform: translateX(-25%);
  text-align: center;
}
</style>
