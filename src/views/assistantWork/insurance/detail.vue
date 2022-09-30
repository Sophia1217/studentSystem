<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">基础人员</span>
      </div>
      <el-form ref="formTop" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="工号" prop="applyGh">
              <el-input placeholder="请输入" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="申报人" prop="applyXm">
              <el-input placeholder="请输入" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="单位" prop="dwh">
              <el-input placeholder="请输入" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="岗位" prop="job">
              <el-input placeholder="请输入" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="类型" prop="lxm">
              <el-input placeholder="请输入" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="permissions">
      <div>
        <el-form>
          <span class="title">保险内容</span>
          <el-form-item label="附件">
            <!-- <div v-if="urlArr.length > 0" class="block">
              <div v-for="(item, i) in urlArr">
                <el-image
                  style="margin-left: 20px; width: 300px; height: 300px"
                  :src="item"
                ></el-image>
              </div>
            </div> -->
            <el-upload
              action="#"
              :file-list="fileList"
              class="el-upload"
              :limit="1"
              :on-exceed="handleExceed"
              :on-preview="handlePreview"
              :disabled="true"
            >
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <div class="headLeft">
        <!-- <button class="span1" @click="downlo">下载</button> -->
        <el-upload
          accept=".pdf"
          :auto-upload="true"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="fileHeader"
          :data="fileData"
          :on-success="upLoadSuccess"
          :on-error="upLoadError"
        >
          <el-button class="export"> 更新</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { fjsc } from "@/api/assistantWork/baoxian";
import { getToken } from "@/utils/auth";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";

export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/fdyXpx/importAppend",
      fileList: [],
      form: {
        xh: "",
        xm: "", //家访主题
        pycc: "",
        nj: "",
        mc: [], //省
        lx: [],
        bxdh: [],
        startSj: [],
        endSj: [],
        money: "",
      },
    };
  },
  mounted() {
    this.querywj();
  },
  methods: {
    handleExceed() {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    querywj() {
      //用于文件查询
      querywj({ businesId: 0 }).then((res) => {
        this.fileList = res.data;
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    upLoadSuccess(res, file, fileList) {
      console.log("jinlaile");
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.querywj();
      } else {
        this.$message({
          type: "error",
          message: res.errmsg,
        });
      }
    },
    upLoadError(err, file, fileList) {
      this.$message({
        type: "error",
        message: "更新失败",
      });
    },
  },
  computed: {
    fileData: {
      get() {
        return {
          type: 0,
        };
      },
    },
    fileHeader: {
      get() {
        return {
          accessToken: getToken(), // 让每个请求携带自定义token 请根据实际情况自行修改
          uuid: new Date().getTime(),
          clientId: "111",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
  .editBtn {
    padding: 0 12px;
    margin-left: 4px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 38px;
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
      .inputStyle {
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
    padding: 0 12px;
    margin-left: 4px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    color: #005657;
    cursor: pointer;
    line-height: 38px;
    i {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      background: url("~@/assets/images/detelIcon.png");
    }
  }
  .suibian {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
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
    .search {
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
    justify-content: flex-end;
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
