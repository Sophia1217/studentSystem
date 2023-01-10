<template>
  <div class="testList">
    <div class="header">
      <div class="headerRight">问卷列表</div>
      <div class="headerLeft">
        <div class="btns borderGreen" @click="createTest">
          <span class="title1">创建问卷</span>
        </div>
      </div>
    </div>
    <div class="item" v-for="(item, index) in detailData">
      <div class="title">
        <div class="titleRight">{{ item.wjName }}</div>
        <div class="titleLeft">
          <div class="btns borderWhite" @click="yulan(item)">
            <span class="title2">预览</span>
          </div>
          <div class="btns borderWhite" @click="copyItem(item)">
            <span class="title2">复制</span>
          </div>
          <div class="btns borderWhite" @click="deleteItem(item)">
            <span class="title2">删除</span>
          </div>
          <div class="btns borderGreen" @click="editItem(item)">
            <span class="title1">编辑</span>
          </div>
        </div>
      </div>
      <div class="contentAll">
        <div class="contentRight">适用年度：{{ item.wjYear }}</div>
        <div class="contentLeft">
          <span>问卷起始时间:</span>

          <el-date-picker
            v-model="item.sqkfsj"
            type="datetimerange"
            range-separator="至"
            start-placeholder="起始年月日"
            end-placeholder="结束年月日"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            @change="timeChange(item)"
            :disabled="item.sfyx == '0' ? false : true"
            :clearable="false"
          >
          </el-date-picker>

          <el-switch
            v-model="item.sfyx"
            active-color="#23AD6F"
            inactive-color="#E0E0E0"
            active-value="0"
            inactive-value="1"
            @change="kgChange(item)"
          ></el-switch>
        </div>
      </div>
    </div>
    <pagination
      v-show="total > 0"
      class="pagination"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getList"
    />
    <el-dialog title="删除" :visible.sync="deleteModal" width="30%">
      <div>
        <span>确认删除问卷？</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="deleteConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  deleteXscpLs,
  LsdList,
  switchXscpLs,
  copyXscpWjLs,
} from "@/api/test/stuTest";
import { getToken } from "@/utils/auth";
export default {
  name: "testList",
  props: [],
  data() {
    return {
      total: 0,
      detailData: [],
      deleteModal: false,
      testid: "",
      pageNum: 1,
      pageSize: 10,
    };
  },
  computed: {},
  watch: {},

  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let data = {
        orderPx: "",
        orderZd: "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        wjLy: "3",
      };
      LsdList(data).then((res) => {
        //console.log(res);
        this.detailData = res.data;
        this.total = res.totalCount;
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].wjStartDate && res.data[i].wjEndDate) {
            this.$set(this.detailData[i], "sqkfsj", [
              res.data[i].wjStartDate,
              res.data[i].wjEndDate,
            ]);
          }
        }
        //console.log(this.detailData);
      });
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.testid = item.id;
    },
    deleteCancel() {
      this.deleteModal = false;
    },
    deleteConfirm() {
      deleteXscpLs(this.testid).then((res) => {
        this.$message.success("删除成功");
        this.getList();
        this.deleteModal = false;
      });
    },
    createTest() {
      this.$router.push({
        path: "/assistantTest/schoolTest/createTest",
      });
    },
    editItem(item) {
      this.$router.push({
        path: "/assistantTest/schoolTest/editTest",
        query: {
          id: item.id,
        },
      });
    },
    yulan(item) {
      this.$router.push({
        path: "/assistantTest/viewTest",
        query: {
          id: item.id,
          sfwc: "1",
          xghBpcr: "",
        },
      });
    },
    kgChange(item) {
      //console.log(item);
      if (item.sfyx == "1") {
        let data = {
          sfyx: item.sfyx,
          id: item.id,
          wjStartDate: item && item.sqkfsj ? item.sqkfsj[0] : "",
          wjEndDate: item && item.sqkfsj ? item.sqkfsj[1] : "",
        };
        switchXscpLs(data).then((res) => {
          this.$message.success("设置成功");
          this.getList();
        });
      } else {
        if (item && item.sqkfsj) {
          let data = {
            sfyx: item.sfyx,
            id: item.id,
            wjStartDate: item.sqkfsj[0],
            wjEndDate: item.sqkfsj[1],
          };
          switchXscpLs(data).then((res) => {
            this.$message.success("设置成功");
            this.getList();
          });
        } else {
          this.$message.warning("请选择时间！");
        }
      }
    },
    timeChange(item) {
      let data = {
        sfyx: item.sfyx,
        id: item.id,
        wjStartDate: item.sqkfsj[0],
        wjEndDate: item.sqkfsj[1],
      };
      switchXscpLs(data).then((res) => {
        this.$message.success("设置成功");
        this.getList();
      });
    },
    copyItem(item) {
      copyXscpWjLs(item.id).then((res) => {
        this.$message.success("复制成功");
        this.getList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.testList {
  padding: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    // margin: 10px 10px 10px 10px;
    margin-bottom: 5px;
    .headerRight {
      font-size: 22px;
      font-weight: 600;
    }
    .headerLeft {
      .btns {
        cursor: pointer;
        border-radius: 4px;
        .title1 {
          font-size: 16px;
          text-align: center;
          line-height: 32px;
          color: #fff;
          padding: 3px;
          // vertical-align: middle;
        }
      }
      .borderGreen {
        border: 1px solid grey;
        background: #005657;
        display: flex;
        align-items: center;
      }
    }
  }
  .item {
    background: #ffffff;
    height: 120px;
    padding: 10px;
    margin-top: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 20px 10px;
      .titleRight {
        font-size: 20px;
        font-weight: 500;
        color: #000;
      }
      .titleLeft {
        display: flex;
        flex-direction: row;
        align-items: center;
        .btns {
          cursor: pointer;
          border-radius: 2px;
          .title2 {
            font-size: 16px;
            text-align: center;
            line-height: 28px;
            padding: 3px 15px 3px 15px;
            // vertical-align: middle;
          }
          .title1 {
            font-size: 16px;
            text-align: center;
            line-height: 28px;
            color: #fff;
            padding: 3px 15px 3px 15px;
            // vertical-align: middle;
          }
        }
        .borderGreen {
          border: 1px solid grey;
          background: #005657;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .borderWhite {
          background: #fff;
          border: 1px solid grey;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }
    }
    .contentAll {
      display: flex;
      justify-content: space-between;
      margin: 10px 10px 10px 10px;
      align-items: center;
      .contentRight {
        font-size: 16px;
        font-weight: 400;
      }
      .contentLeft {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
  }
  .pagination {
    background-color: transparent;
  }
}
</style>
