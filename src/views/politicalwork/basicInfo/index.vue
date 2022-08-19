<template>
  <div class="basicInfo">
    <div class="searchWrap">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="searchVal"
          placeholder="可输入多个查询条件，以半角空格区分"
          class="inputSelect"
        >
          <el-select
            slot="prepend"
            v-model="select"
            class="elSelect"
            @change="clear"
            placeholder="查询条件"
          >
            <el-option label="工号" value="gh" />
            <el-option label="姓名" value="xm" />
            <el-option label="身份证件号" value="sfzjh" />
            <el-option label="移动电话" value="yddh" />
          </el-select>
          <el-button
            slot="append"
            class="searchButton"
            icon="el-icon-search"
            @click="handleSearch"
            >查询</el-button
          >
        </el-input>
        <!-- 更多分类按钮 -->
        <div class="more" @click="handleMore">
          <span>更多分类</span>
          <i v-if="!isMore" class="moreIcon chevronDown" />
          <i v-else class="moreIcon chevronUp" />
        </div>
      </div>

      <!-- 更多分类下拉checkbox -->
      <div v-if="isMore" class="moreSelect">
        <el-form ref="form" :model="queryParams" label-width="100px">
          <el-row>
            <el-col span="8">
              <el-form-item label="籍贯：">
                <el-input v-model="queryParams.jg"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="毕业院校：">
                <el-input v-model="queryParams.byyx"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="专业背景：">
                <el-input v-model="queryParams.zybj"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <!-- 搜索结果显示表格 -->
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">政工干部列表</span> <i class="Updataicon" />
        </div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="handleImport">
            <i class="icon greenIcon" /><span class="title">导入</span>
          </div>
          <div class="btns borderGreen" @click="handleExport">
            <i class="icon greenIcon" /><span class="title">导出</span>
          </div>
        </div>
      </div>
      <div class="mt15">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="gh" label="工号" sortable />
          <el-table-column prop="xm" label="姓名" sortable />
          <el-table-column prop="xbm" label="性别" sortable>
            <template slot-scope="scope">
              <span v-if="scope.row.xbm == 1">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column prop="lxdh" label="联系方式" sortable />
          <el-table-column prop="gzdw" label="工作单位" sortable />
          <el-table-column prop="zgxl" label="最高学历" sortable />
          <el-table-column prop="zgxlbyxx" label="最高学历毕业学校" sortable />
          <el-table-column prop="zybj" label="专业背景" sortable />
          <el-table-column prop="gw" label="职务" sortable />
          <el-table-column prop="cjgzsj" label="参加工作时间" sortable />
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="hadleDetail(scope.row, 1)"
              >
                <i class="scopeIncon handledie" />
                <span class="handleName">详情</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams.total > 0"
          class="pagination"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="handleSearch"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getPoliticalWorkList } from "@/api/politicalWork/basicInfo";
import CheckboxCom from "../../components/checkboxCom";

export default {
  name: "BasicInfo",
  components: { CheckboxCom },
  props: [],
  data() {
    return {
      queryParams: {
        jg: "",
        byyx: "",
        zybj: "",
        pageNum: 1,
        total: 0,
        pageSize: 10,
      },
      searchVal: "",
      select: "",
      isMore: false,
      selectedCheckbox: [],
      selectedCategory: [],
      tableData: [],
      multipleSelection: [],
    };
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    // 查询
    handleSearch() {
      let data = {
        xm: this.select == "xm" ? this.searchVal : "",
        gh: this.select == "xh" ? this.searchVal : "",
        sfzjh: this.select == "xh" ? this.searchVal : "",
        yddh: this.select == "xh" ? this.searchVal : "",
        jg: this.queryParams.jg,
        byyx: this.queryParams.byyx,
        zybj: this.queryParams.zybj,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
      };
      getPoliticalWorkList(data)
        .then((res) => {
          this.tableData = res.stafflistRes;
          this.queryParams.total = res.count;
        })
        .catch((err) => {});
    },
    // 点击更多
    handleMore() {
      this.isMore = !this.isMore;
    },
    // 打开导出弹窗
    handleExport() {
      this.showExport = true;
    },
    // 导出取消
    handleCancel() {
      this.showExport = false;
    },
    // 导出确认
    handleConfirm() {
      this.showExport = false;
    },

    hadleDetail(row, flag) {
      this.$router.push({
        path: "/politicalwork/detailInfo",
        query: {
          gh: row.gh,
          id: row.date,
          show: flag,
        },
      });
    },

    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    clear() {
      this.searchVal = "";
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 详细信息查询 */
    // handleGet(row) {
    //   const name = row.name || ''
    //   this.$router.push({ path: '/basicInfo/detailInfo/index', query: { name: name }})
    // }
  },
};
</script>

<style lang="scss" scoped>
.basicInfo {
  .mt15 {
    margin-top: 15px;
  }
  .searchWrap {
    background: #fff;
    padding: 20px;
    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      .elSelect {
        width: 110px;
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
          background: url("~@/assets/images/chevronDown.png") no-repeat;
        }
        .chevronUp {
          background: url("~@/assets/images/chevronUp.png") no-repeat;
        }
      }
    }
    .moreSelect {
      margin-top: 20px;
      padding: 20px;
      background: #fafafa;
    }
  }
  .tableWrap {
    background: #fff;
    padding: 20px;
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
        .Updataicon {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        .borderBlue {
          border: 1px solid #0d84e0;
          color: #0d84e0;
          background: #ebfafd;
        }
        .borderOrange {
          border: 1px solid #cc3014;
          color: #cc3014;
          background: #fdf6f3;
        }
        .borderLight {
          border: 1px solid #0090a1;
          color: #0090a1;
          background: #e7fcfc;
        }
        .borderGreen {
          border: 1px solid #005657;
          color: #005657;
          background: #fff;
        }
        .btns {
          margin-right: 15px;
          padding: 5px 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
            text-align: center;
            line-height: 22px;
            // vertical-align: middle;
          }
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 5px;
          }
          .blueIcon {
            background: url("~@/assets/images/icon_1.png") no-repeat;
          }
          .orangeIcon {
            background: url("~@/assets/images/icon_2.png") no-repeat;
          }
          .lightIcon {
            background: url("~@/assets/images/icon_3.png") no-repeat;
          }
          .greenIcon {
            background: url("~@/assets/images/export.png");
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
</style>
