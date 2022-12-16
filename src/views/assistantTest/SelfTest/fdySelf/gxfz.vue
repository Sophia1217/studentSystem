<template>
  <div class="right_top">
    <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
    <div class="timeWrap">
      <!-- <div class="yearOption"><el-select></el-select><span>年度</span></div> -->
      <span class="updataTime">更新时间：{{}}</span>
    </div>
    <div class="headline">03个人发展</div>
    <div class="tableStyle">
      <div class="pieceName">
        <div>课题研究</div>
        <div class="editBtn" @click="addDetailInfoData()">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableArea">
        <el-table :data="detailInfoData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gzdw" label="课程名称" />
          <el-table-column prop="gzdw" label="课时量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pieceName">
        <div>论文成果</div>
        <div class="editBtn" @click="addDetailInfoData()">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableArea">
        <el-table :data="detailInfoData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gzdw" label="名称" />
          <el-table-column prop="gzdw" label="级别">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="时长">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pieceName">
        <div>专著书籍</div>
        <div class="editBtn" @click="addDetailInfoData()">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableArea">
        <el-table :data="detailInfoData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gzdw" label="获奖项目" />
          <el-table-column prop="gzdw" label="获奖名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="级别">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="等次">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column type="fixed" label="操作">
            <template slot-scope="scope">
              <div
                class="deleteBtn"
                @click="deleteWorkBrifeData(scope.row, scope.$index, 'a')"
              >
                <i class="el-icon-close" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pieceName">职业资质</div>
      <div class="inputArea">
        <!-- <div class="title"></div> -->
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
      </div>
      <div class="pieceName">
        <div>个人获奖</div>
        <div class="editBtn" @click="addDetailInfoData()">
          <i class="addIcon" /> 新增
        </div>
      </div>
      <div class="tableArea">
        <el-table :data="detailInfoData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gzdw" label="违纪情况" />
          <el-table-column prop="gzdw" label="处分">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="gzdw" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gzdw" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column type="fixed" label="操作">
            <template slot-scope="scope">
              <div
                class="deleteBtn"
                @click="deleteWorkBrifeData(scope.row, scope.$index, 'a')"
              >
                <i class="el-icon-close" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="editBottom">
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { detailInfoData: [] };
  },
  mounted() {},
  methods: {
    addDetailInfoData() {},
    deleteWorkBrifeData() {},
    handlUpdata() {},
  },
};
</script>
<style lang="scss" scoped>
.right_top {
  .toptitle {
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    color: #005657;
    line-height: 24px;
  }
  .timeWrap {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: #383838;
    line-height: 28px;
    .updataTime {
      margin-left: 20px;
    }
  }
  .headline {
    padding-left: 20px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 20px;
    color: #005657;
    line-height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tableStyle {
    position: relative;
    padding: 20px;
    .pieceName {
      box-sizing: border-box;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 18px;
      color: #1f1f1f;
      line-height: 28px;
      .editBtn {
        padding: 4px 5px;
        margin-right: 20px;
        // border: 1px solid #005657;
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        color: #005657;
        cursor: pointer;
        .addIcon {
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url("~@/assets/images/addicon.png") no-repeat center;
          vertical-align: middle;
        }
      }
    }
    .inputArea {
      display: flex;
      flex-direction: column;
      //align-items: center;
      .title {
        //   flex: 0 0 160px;
        //   line-height: 48px;
        //   background: #e0e0e0;
        //   text-align: right;
        //   padding-right: 5px;
        //   margin: 0 !important;
        font-weight: 400;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 22px;
        margin: 16px;
      }
      .content {
        //   font-weight: 400;
        //   font-size: 14px;
        //   color: #1f1f1f;
        //   line-height: 22px;
        //   margin-left: 16px;
      }
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
    }
    .cancel {
      color: #005657;
    }
    .confirm {
      background: #005657;
      color: #fff;
    }
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
}
</style>