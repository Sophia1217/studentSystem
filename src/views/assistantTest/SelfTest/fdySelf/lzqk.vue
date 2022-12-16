<template>
  <div class="right_top">
    <p class="toptitle">华中师范大学辅导员工作考核个人自评表</p>
    <div class="timeWrap">
      <!-- <div class="yearOption"><el-select></el-select><span>年度</span></div> -->
      <span class="updataTime">更新时间：{{}}</span>
    </div>
    <div class="headline">02履职情况</div>
    <div class="tableStyle">
      <div class="pieceName">学生教育</div>
      <div class="inputArea">
        <div class="title">晚点名情况（本科）</div>
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
        <div class="title">与学生谈话情况</div>
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
        <div class="title">查寝情况</div>
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
        <div class="title">参加学生活动情况</div>
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
        <div class="title">学风教育情况</div>
        <div class="content">
          <el-input type="textarea" :rows="5" maxlength="500" />
        </div>
      </div>
      <div class="pieceName">
        <div>授课情况</div>
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
        <div>培训情况</div>
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
        <div>学生获奖</div>
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
      <div class="pieceName">
        <div>学生违纪</div>
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
  </div>
</template>
<script>
export default {
  data() {
    return { detailInfoData: [] };
  },
  mounted() {},
  methods: { addDetailInfoData() {}, deleteWorkBrifeData() {} },
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
}
</style>