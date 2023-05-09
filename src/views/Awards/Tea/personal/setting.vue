<template>
  <div>
    <div class="searchWrap">
      <div class="search">
        <el-input
          placeholder="请输入"
          maxlength="50"
          v-model.trim="searchVal"
          class="inputSelect"
          clearable
        >
          <el-select
            v-model="select"
            @change="changeSelect"
            class="elSelect"
            slot="prepend"
            placeholder="请选择查询条件"
          >
            <el-option label="奖项文号" value="jxwh"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            class="searchBtn"
            @click="getList"
            >查询</el-button
          >
        </el-input>
        <div class="more" @click="handleMore">
          <span> {{ !isMore ? "更多分类" : "收起分类" }}</span>
          <i v-if="!isMore" class="moreIcon chevronDown"></i>
          <i v-else class="moreIcon chevronUp"></i>
        </div>
      </div>
      <!-- 更多选择 -->
      <div class="moreSelect" v-if="isMore">
        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="8">
            <span>评奖奖项：</span>
            <el-select
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
              v-model="pjjxList"
            >
              <el-option
                v-for="(item, index) in PjjxArr"
                :key="index"
                :label="item.mc"
                :value="item.mc"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="8">
            <span>奖项级别：</span>
            <el-select
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
              v-model="jxjbmList"
            >
              <el-option
                v-for="(item, index) in jxjbList"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="8">
            <span>培养层次：</span>
            <el-select
              multiple
              collapse-tags
              placeholder="请选择"
              size="small"
              v-model="pyccmList"
            >
              <el-option
                v-for="(item, index) in PyccArr"
                :key="index"
                :label="item.mc"
                :value="item.dm"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 15px">
          <el-col :span="8">
            <span>评审时间：</span>
            <el-date-picker
              v-model="Csrq"
              type="daterange"
              unlink-panels
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="basicInfo">
      <div class="tableWrap mt15">
        <div class="headerTop">
          <div class="headerLeft">
            <span class="title">评奖设置列表</span>
          </div>
          <div class="headerRight">
            <div class="btns borderGreen" @click="xinzeng" v-show="AUTHFLAG">
              <i class="icon greenIcon"></i><span class="title1">新增</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px">
          <el-table
            ref="multipleTable"
            :data="basicInfoList"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="pjjx" label="评奖奖项" />
            <el-table-column prop="jxjb" label="奖项级别" />
            <el-table-column prop="pycc" label=" 培养层次" />
            <el-table-column prop="jxwh" label=" 奖项文号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.jxwh"
                  clearable
                  maxlength="50"
                  width="200px"
                  :disabled="scope.row.sqkg == '0' ? false : true"
                  @blur="alterjxwh(scope.row)"
                  @keyup.enter.native="alterjxwh($event, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="spsj" label="评审时间" width="500px">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.sqkfsj"
                  type="daterange"
                  unlink-panels
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :disabled="scope.row.sqkg == '0' ? false : true"
                  @blur="alterjxwh(scope.row)"
                  :clearable="false"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="sqkg" label="申请开关">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.sqkg"
                  active-color="#23AD6F"
                  inactive-color="#E0E0E0"
                  active-value="1"
                  inactive-value="0"
                  @change="alterjxwh(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="hadleDetail(scope.row)"
                >
                  <i class="scopeIncon handledie"></i>
                  <span class="handleName">详情</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- <el-dialog title="设置" :visible.sync="sjModal" width="30%">
        <template>
          <div>
            <span>确认修改申请开放时间？</span>
          </div>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sjCancel">取 消</el-button>
          <el-button type="primary" class="confirm" @click="sjConfirm()"
            >确 定</el-button
          >
        </span>
      </el-dialog> -->
    </div>
    <pagination
      v-show="queryParams.total > 0"
      :total="queryParams.total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>
<script>
import {
  pjList,
  pjjxListQuery,
  changePjsz,
  // updateSqkgsjsz,
} from "@/api/dailyBehavior/pjpySetting";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "BasicInfo",
  data() {
    return {
      AUTHFLAG: false,
      //查询四个参数以及可以复用的码表
      jxjbList: [],
      pjjxList: [],
      PjjxArr: [],
      jxjbmList: [],
      JxjbArr: [],
      pyccmList: [],
      PyccArr: [],
      Csrq: [],
      //
      searchVal: "",
      select: "",
      isMore: false,
      basicInfoList: [],
      sqkfsj: [],
      qjModal: false,
      jeModal: false,
      pyccModal: false,
      sjModal: false,
      pycc: "",
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        orderZd: "",
        orderPx: "",
      },
    };
  },
  mounted() {
    this.authConfirm(this.$route.path.split("/"));
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
    this.getList();
    this.getCode("dmpyccm"); //培养层次
    this.getCode("dmpjpyjxjbm"); //奖项级别
    this.pjjxList1(); //评奖奖项
  },
  methods: {
    pjjxList1() {
      pjjxListQuery({ jxlb: "1" }).then((res) => {
        this.PjjxArr = res.data;
      });
    },
    changeSelect(val) {
      this.searchVal = "";
    },
    handleMore() {
      this.isMore = !this.isMore;
    },
    alterjxwh(row) {
      var data = {
        pssjstart: row.sqkfsj && row.sqkfsj[0] ? row.sqkfsj[0] : "",
        pssjend: row.sqkfsj && row.sqkfsj[1] ? row.sqkfsj[1] : "",
        jxwh: row.jxwh,
        sqkg: row.sqkg,
        id: row.id,
      };
      changePjsz(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("更新成功");
          this.getList();
        }
      });
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formje.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    xinzeng() {
      this.$router.push({
        path: "/awardsTea/personalSettingAdd",
      });
    },
    getList() {
      let data = {
        pjjxList: this.pjjxList,
        jxjbmList: this.jxjbmList,
        pyccmList: this.pyccmList,
        pssjend: this.Csrq && this.Csrq[1] ? this.Csrq[1] : "",
        pssjstart: this.Csrq && this.Csrq[0] ? this.Csrq[0] : "",
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        jxwh: this.select == "jxwh" ? this.searchVal : "",
        szzl: "1",
      };
      pjList(data).then((res) => {
        this.basicInfoList = res.data;
        for (var i = 0; i < this.basicInfoList.length; i++) {
          this.basicInfoList[i].sqkfsj = [
            this.basicInfoList[i].pssjstart,
            this.basicInfoList[i].pssjend,
          ];
        }
        this.queryParams.total = res.totalCount;
      });
    },
    hadleDetail(row) {
      var auth = "1";
      if (row.sqkg && row.sqkg == "1") {
        auth = "2";
      }
      this.$router.push({
        path: "/awardsTea/personalSettingEdit",
        query: {
          au: auth, //1是可以编辑  2是不可以
          id: row.id,
        },
      });
    },

    sjCancel() {
      this.sjModal = false;
    },
    //获取培养层次
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpjpyjxjbm": //奖项级别
              this.jxjbList = res.data;
              break;
            case "dmpyccm":
              this.PyccArr = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.searchWrap {
  background: #ffffff;
  padding: 20px;
  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
    .elSelect {
      width: 150px;
    }
    .inputSelect {
      width: 50%;
    }
    .more {
      flex: 0 0 100px;
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #005657;
      cursor: pointer;
      .moreIcon {
        display: block;
        width: 20px;
        height: 20px;
      }
      .chevronDown {
        background: url("../../../../assets/images/chevronDown.png") no-repeat;
      }
      .chevronUp {
        background: url("../../../../assets/images/chevronUp.png") no-repeat;
      }
    }
  }
  .moreSelect {
    margin-top: 20px;
    padding: 20px;
    background: #fafafa;
  }
}
.headerTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .headerLeft {
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
  }
  .headerRight {
    display: flex;
    align-items: center;

    .borderGreen {
      border: 1px solid grey;
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
      }
      .title1 {
        font-size: 14px;
        text-align: center;
        line-height: 32px;
        color: #fff;
      }
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin-right: 5px;
      }
      .greenIcon {
        margin-top: 10px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
}
.basicInfo {
  background: #ffffff;
  .mt15 {
    margin-top: 15px;
    padding: 20px;
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
</style>
