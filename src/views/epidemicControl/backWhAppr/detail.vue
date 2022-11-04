<template>
  <div class="backDetail">
    <!-- table -->
    <div class="tableWrap">
        <div class="headerLeft">
          <span class="title">返汉信息</span>
        </div>
        <div>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">申请人</div>
              <div class="bs">{{ this.detailData.xm }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">学号</div>
              <div class="bs">{{ detailData.xh }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">身份证号</div>
              <div class="bs">{{ detailData.sfzh }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">手机号</div>
              <div class="bs">{{ detailData.sjh }}</div>
            </div>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">培养单位</div>
              <div class="bs">{{ detailData.dwmc }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">专业</div>
              <div class="bs">{{ detailData.zymc }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">培养层次</div>
              <div class="bs">{{ detailData.pyccmc }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">年级</div>
              <div class="bs">{{ detailData.nj }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">所在地区</div>
              <div class="bs">{{ detailData.szdq }}</div>
            </div>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">返汉方式</div>
              <div class="bs">{{ detailData.fhfs }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs2">车次/航班/车牌号</div>
              <div class="bs">{{ detailData.fhccOrHbOrCph }}</div>
            </div>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">出行时间</div>
              <div class="bs">{{ detailData.wcsj }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">拟返校时间</div>
              <div class="bs">{{ detailData.fxsj }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">到达站点</div>
              <div class="bs">{{ detailData.ddzd }}</div>
            </div>
          </el-col> 
        </el-row>
        <el-row>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核人</div>
              <div class="bs">{{ detailData.shrXmAndGh }}</div>
            </div>
          </el-col>
          <el-col :span="12" class="yiny">
            <div style="display: flex; height: 50px">
              <div class="hs">审核时间</div>
              <div class="bs">{{ detailData.shsj }}</div>
            </div>
          </el-col> </el-row
        ><el-row>
          <el-col :span="24" class="yiny">
            <div
              style="display: flex; height: 50px; border-bottom: 1px solid grey"
            >
              <div class="hs">审核状态</div>
              <div class="bs">{{ detailData.shzt }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="tableWrap">
      <div class="headerLeft">
          <span class="title">核酸证明</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxCom from "../../components/checkboxCom";
import {
  getDetail,
} from "@/api/epidemicControl/backWhAppr";
export default {
  components: { CheckboxCom },
  data() {
    return {
      detailData: {
        xm: "",
        xh: "",
      },
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.handleDetail();
  },
  // activated() {
  //   this.handleDetail();
  // },

  methods: {
    handleDetail() {
      this.$nextTick((_) => {
        getDetail({id: this.id}).then((res) => {
          const {data} = res;
          this.detailData.xm = data ? data.xm : "";
          this.detailData.xh = data ? data.xh : "";
          this.detailData.sfzh = data ? data.sfzh : "";
          this.detailData.sjh = data ? data.sjh : "";
          this.detailData.dwmc = data ? data.dwmc : "";
          this.detailData.zymc = data ? data.zymc : "";
          this.detailData.pyccmc = data ? data.pyccmc : "";
          this.detailData.nj = data ? data.nj : "";
          this.detailData.szdq = data ? data.szdq : "";
          this.detailData.fhfs = data ? data.fhfs : "";
          this.detailData.fhccOrHbOrCph = data ? data.fhccOrHbOrCph : "";
          this.detailData.wcsj = data ? data.wcsj : "";
          this.detailData.fxsj = data ? data.fxsj : "";
          this.detailData.ddzd = data ? data.ddzd : "";
          this.detailData.shrXmAndGh = data ? data.shrXmAndGh : "";
          this.detailData.shsj = data ? data.shsj : "";
          this.detailData.shzt = data ? data.shzt : "";
          console.log(this.detailData.pyccmc);

        })
        .catch((err) => {});
      })
      
    },
  },
};
</script>

<style lang="scss" scoped>
.backDetail {
  margin-top: 15px;
  .yiny {
    border: 1px solid grey;
    background: rgba(0, 0, 0, 0.0001);
    box-shadow: inset -1px 0px 0px #e0e0e0, inset 1px 0px 0px #e0e0e0;
    height: 50px;
    border-bottom: none;
    border-left: none;
  }
  .hs {
    display: flex;
    flex: 0 0 162px;
    background: #ccc;
    align-items: center;
    padding-left: 45px;
    // padding-top: 14px;
  }
  .bs {
    display: flex;
    padding-left: 40px;
    align-items: center;
    // padding-top: 14px;
  }
  .hs2 {
    display: flex;
    flex: 0 0 162px;
    background: #ccc;
    align-items: center;
    padding-left: 20px;
    // padding-top: 14px;
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
    .headerLeft {
      height: 38px;
      .title {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
      }
    }
    // .headerTop {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: space-between;
    //   align-items: center;
    //   .headerLeft {
    //     .title {
    //       font-weight: 600;
    //       font-size: 20px;
    //       color: #1f1f1f;
    //       line-height: 28px;
    //     }
    //   }

    // }
  }
}
</style>
