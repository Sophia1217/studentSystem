<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item,index) in dtailsList" :key="index">
          <div class="list" :class="index==current?'active':''" @click="handleList(index)">
            <div>{{item}}</div>
            <i :class="index==current?'el-icon-arrow-right':''"></i>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">个人异动情况</p>
          <div class="timeWrap">
            <span>创建时间：2022-03-23 23:21:34 </span> <span class="updataTime">更新时间：2022-03-23 23:21:34</span>
          </div>
        </div>
        <div class="headline">基本信息</div>
        <div class="tableStyle">
          <!-- 相片 -->
          <div class="imgWrap">
            <div class="photo">
              <img src="" alt="">
            </div>
          </div>
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.xh}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.xm}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.pyccm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学院??</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.pyccm}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.zydm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.bjm}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">异动类别</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.ydlbm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">异动日期</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.ydrq}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">异动说明</div>
                    <div class="content">{{infoRes.stuStatusChangeInfoJbxxRes.ydsm}}</div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">学籍异动信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">异动来源学校</div>
                    <div class="content">{{infoRes.xsXjyd.ydlyxx}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">异动去向学校</div>
                    <div class="content">{{infoRes.xsXjyd.ydqxxx}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原单位号</div>
                    <div class="content changColor">{{infoRes.xsXjyd.ydwh}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现单位号</div>
                    <div class="content changColor">{{infoRes.xsXjyd.xdwh}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原单位名称</div>
                    <div class="content changColor">{{infoRes.xsXjyd.ydwmc}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现单位名称</div>
                    <div class="content changColor">{{infoRes.xsXjyd.xdwmc}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原专业代码</div>
                    <div class="content">{{infoRes.xsXjyd.yzydm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现专业代码</div>
                    <div class="content">{{infoRes.xsXjyd.xzydm}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原专业名称</div>
                    <div class="content">{{infoRes.xsXjyd.yzymc}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现专业名称</div>
                    <div class="content">{{infoRes.xsXjyd.xzymc}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原年级</div>
                    <div class="content">{{infoRes.xsXjyd.ynj}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现年级</div>
                    <div class="content">{{infoRes.xsXjyd.xnj}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原导师号</div>
                    <div class="content">{{infoRes.xsXjyd.ydsh}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现导师号</div>
                    <div class="content">{{infoRes.xsXjyd.xdsh}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原导师姓名</div>
                    <div class="content">{{infoRes.xsXjyd.ydsxm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现导师姓名</div>
                    <div class="content">{{infoRes.xsXjyd.xdsxm}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原培养类别</div>
                    <div class="content">{{infoRes.xsXjyd.ypylb}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">现培养类别</div>
                    <div class="content">{{infoRes.xsXjyd.xpylb}}</div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">审批信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">操作人</div>
                    <div class="content">{{infoRes.xsXjyd.ydczrgh}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">审批日期</div>
                    <div class="content">{{infoRes.xsXjyd.sprq}}</div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">审批状态</div>
                    <div class="content">{{infoRes.xsXjyd.spztm}}</div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">审批文号</div>
                    <div class="content">{{infoRes.xsXjyd.spwh}}</div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {showStuStatusChangeInfoRes} from '@/api/student/index'
export default {
  name: 'detail',

  data() {
    return {
      dtailsList: ['基本信息', '学籍异动信息', '审核信息'],
      current: 0,
      infoRes: {},
      id:''
    };
  },
  created() {
    this.id = this.$route.query.id
    
  },
  mounted() {
    this.getshowStuStatusChangeInfoRes()
  },

  methods: {
    handleList(index) {
      this.current = index
    },
    getshowStuStatusChangeInfoRes() {
      let data = { XH:this.id }
      showStuStatusChangeInfoRes(data).then(res => {
        this.infoRes = res.result
        // this.$set(this.infoRes, 'stuStatusChangeInfoJbxxRes',res.result.stuStatusChangeInfoJbxxRes )
        // this.$set(this.infoRes, 'xsXjyd',res.result.xsXjyd )
      }).catch(err=>{})
    }
  },
};
</script>

<style lang="scss" scoped>
.detail{
  padding:20px 0;
  box-sizing: border-box;
  .wrap{
    display: flex;
    flex-direction: row;
    // overflow: hidden;
    .detail_left{
      flex:0 0 198px;
      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding:20px;
      box-sizing: border-box;
      .list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #1F1F1F;
        cursor: pointer;
        padding:0 10px;
        box-sizing: border-box;
      }
      .active{
        background: #F0F0F0;
        border-radius: 2px;
      }
    }
    .detail_right{
      flex:1;
      background: #fff;
      .right_top{
        .title{
          text-align: center;
          font-weight: 500;
          font-size: 24px;
          color: #005657;
          line-height: 24px
        }
        .timeWrap{
          text-align: center;
          font-weight: 400;
          font-size: 16px;
          color: #383838;
          line-height: 28px;
          .updataTime{
            margin-left: 20px;
          }
        }
      }
      .headline{
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #1F1F1F;
        line-height: 28px;
      }
      .tableStyle{
        position: relative;
        padding:20px;
        .imgWrap{
          position: absolute;
          right:20px;
          top:20px;
          z-index: 100;
          .photo{
            width:160px;
            height: 206px;
            background: #fff;
            overflow: hidden;
            img{
              width:160px;
              height: 206px;
            }
          }
        }
        .information{
          padding:0 20px;
          .rowStyle{
            padding:0 !important;
            margin:0;
            border-bottom:1px solid #cccccc;
          }
          .wrap{
            display: flex;
            align-items: center;
            .title{
              flex: 0 0 160px;
              line-height: 48px;
              background: #E0E0E0;
              text-align: right;
              padding-right: 5px;
            }
            .content{
              font-weight: 400;
              font-size: 14px;
              color: #1F1F1F;
              line-height: 22px;
              margin-left: 16px;
            }
            .changColor{
              color:#F17056;
            }
          }
        }
      }
    }
  }
}
</style>