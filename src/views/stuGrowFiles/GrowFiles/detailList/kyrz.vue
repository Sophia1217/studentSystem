<template>
  <div class="kycg">
    <div class="right_top">
      <p class="toptitle">软件著作</p>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">软件著作</span>
        </div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="backDetail" v-for="(ele, index) in LwDetail" :key="index">
        <div class="formLeft">
          <div class="title">软件著作</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">软著名称</div>
                <div class="content">{{ ele.rjzzmc }}</div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">软件著作权类型</div>
                <div class="content">{{ ele.rjzzqlx }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">音像制品类型</div>
                <div class="content">{{ ele.yxzplx }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">证书号</div>
                <div class="content">{{ ele.zsh }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">登记号</div>
                <div class="content">{{ ele.djh }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">著作权人</div>
                <div class="content">{{ ele.zzqr }}</div>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">学校署名顺序</div>
                <div class="content">{{ ele.xxsmsx }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">附件</div>
                <div class="content">
                  <div v-for="item in ele.fileList">
                    <div style="display: flex; justify-content: space-between">
                      <a>
                        {{ item.fileName }}
                      </a>
                      <!-- <el-button>预览</el-button> -->
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">审核状态</div>
                <div class="content">
                  <el-select
                    v-model="ele.status"
                    placeholder="请选择"
                    :disabled="true"
                  >
                    <el-option
                      v-for="(item, index) in ztStatus"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <!-- <el-col :span="21" class="rowStyle"> -->
            <div class="wrap">
              <div class="title">操作</div>
              <div class="content">
                <el-button
                  type="text"
                  size="small"
                  @click="bianji(index)"
                  v-show="ele.status === '01' || ele.status === '08'"
                >
                  <i class="scopeIncon Edit"></i>
                  <span>编辑</span>
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  :disabled="true"
                  @click="bianji(index)"
                  v-show="ele.status !== '01' && ele.status !== '08'"
                >
                  <i class="scopeIncon EditDis"></i>
                  <span style="color: #bfbfbf">编辑</span>
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  @click="chehui(index)"
                  v-show="ele.status === '02'"
                >
                  <i class="scopeIncon ch"></i>
                  <span>撤回</span>
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  :disabled="true"
                  @click="chehui(index)"
                  v-show="ele.status !== '02'"
                >
                  <i class="scopeIncon chDis"></i>
                  <span style="color: #bfbfbf">撤回</span>
                </el-button>
                <el-button type="text" size="small" @click="showDel(index)">
                  <i class="scopeIncon del"></i>
                  <span>删除</span>
                </el-button>
                <el-button type="text" size="small" @click="lctClick(index)">
                  <i class="scopeIncon lct"></i>
                  <span>流程图</span>
                </el-button>
              </div>
            </div>
            <!-- </el-col>
            <el-col :span="3"> -->
            <div class="GreenButton" @click="submit(index)">
              <i class="icon greenIcon"></i><span class="title1">提交</span>
            </div>
            <!-- </el-col> -->
          </el-row>
        </div>
      </div>

      <el-dialog
        title="新增"
        :visible.sync="addModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formAddLw" :model="formAddLw" :rules="rules">
          <div class="backDetail">
            <div class="formLeft">
              <div class="title">软件著作</div>
            </div>
            <div class="formRight">
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="rjzzmc">
                    <div class="wrap">
                      <div class="title">软著名称</div>

                      <div class="content">
                        <el-input
                          v-model="formAddLw.rjzzmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="rjzzqlx">
                    <div class="wrap">
                      <div class="title">软件著作权类型</div>
                      <div class="content">
                        <el-input v-model="formAddLw.rjzzqlx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="yxzplx">
                    <div class="wrap">
                      <div class="title">音像制品类型</div>
                      <div class="content">
                        <el-input v-model="formAddLw.yxzplx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="zsh">
                    <div class="wrap">
                      <div class="title">证书号</div>
                      <div class="content">
                        <el-input v-model="formAddLw.zsh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="djh">
                    <div class="wrap">
                      <div class="title">登记号</div>
                      <div class="content">
                        <el-input v-model="formAddLw.djh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="zzqr">
                    <div class="wrap">
                      <div class="title">著作权人</div>
                      <div class="content">
                        <el-input
                          v-model="formAddLw.zzqr"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="xxsmsx">
                    <div class="wrap">
                      <div class="title">学校署名顺序</div>
                      <div class="content">
                        <el-input
                          v-model="formAddLw.xxsmsx"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">附件</div>
                    <div class="content">
                      <el-upload
                        action="#"
                        multiple
                        class="el-upload"
                        :auto-upload="false"
                        ref="upload"
                        :file-list="formAddLw.files"
                        :on-change="fileChange"
                        accept=".pdf,.jpg"
                        :before-remove="beforeRemove"
                      >
                        <el-button size="small" type="primary"
                          >点击上传</el-button
                        >
                      </el-upload>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="addClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="编辑"
        :visible.sync="editModal"
        width="80%"
        :close-on-click-modal="false"
      >
        <el-form ref="formEditLw" :model="formEditLw" :rules="rules">
          <div class="backDetail">
            <div class="formLeft">
              <div class="title">软件著作</div>
            </div>
            <div class="formRight">
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="rjzzmc">
                    <div class="wrap">
                      <div class="title">软著名称</div>

                      <div class="content">
                        <el-input
                          v-model="formEditLw.rjzzmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="rjzzqlx">
                    <div class="wrap">
                      <div class="title">软件著作权类型</div>
                      <div class="content">
                        <el-input v-model="formEditLw.rjzzqlx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="yxzplx">
                    <div class="wrap">
                      <div class="title">音像制品类型</div>
                      <div class="content">
                        <el-input v-model="formEditLw.yxzplx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="zsh">
                    <div class="wrap">
                      <div class="title">证书号</div>
                      <div class="content">
                        <el-input v-model="formEditLw.zsh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="djh">
                    <div class="wrap">
                      <div class="title">登记号</div>
                      <div class="content">
                        <el-input v-model="formEditLw.djh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="zzqr">
                    <div class="wrap">
                      <div class="title">著作权人</div>
                      <div class="content">
                        <el-input
                          v-model="formEditLw.zzqr"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="xxsmsx">
                    <div class="wrap">
                      <div class="title">学校署名顺序</div>
                      <div class="content">
                        <el-input
                          v-model="formEditLw.xxsmsx"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">附件</div>
                    <div class="content">
                      <el-upload
                        action="#"
                        multiple
                        class="el-upload"
                        :auto-upload="false"
                        ref="upload"
                        :file-list="formEditLw.fileList"
                        :on-change="fileChange"
                        accept=".pdf,.jpg"
                        :before-remove="beforeRemove"
                      >
                        <el-button size="small" type="primary"
                          >点击上传</el-button
                        >
                      </el-upload>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editCance">取 消</el-button>
          <el-button type="primary" class="confirm" @click="editClick"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <lctCom
        ref="child"
        :lctModal="lctModal"
        @handleCloseLct="handleCloseLct"
      ></lctCom>
    </div>
    <el-dialog title="删除" :visible.sync="delModal" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="del()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提交" :visible.sync="submitModal" width="30%">
      <template>
        <div>
          <span>确认提交？</span>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="tj()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryLwqkList,
  deleteLwqk,
  cxLwqk,
  importCzdaLwqk,
  tjLwqk,
} from "@/api/growFiles/kyrz";
import { delwj } from "@/api/assistantWork/classEvent";
import lctCom from "../../../components/lct";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  name: "kycg",
  components: { lctCom },
  data() {
    return {
      fileList: [],
      fileListAdd: [],
      LwDetail: [],
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      submitModal: false,
      formAddLw: {},
      formEditLw: {},
      isEdit: 1,
      ztStatus: [],
      url: "",
      rules: {
        djh: [{ required: true, message: "登记号不能为空", trigger: "blur" }],
        rjzzmc: [
          { required: true, message: "软件著作名称不能为空", trigger: "blur" },
        ],
        rjzzqlx: [
          {
            required: true,
            message: "软件著作权类型不能为空",
            trigger: "blur",
          },
        ],
        xxsmsx: [
          { required: true, message: "学校署名顺序不能为空", trigger: "blur" },
        ],
        yxzplx: [
          { required: true, message: "音像制品类型不能为空", trigger: "blur" },
        ],
        zsh: [
          {
            required: true,
            message: "证书号不能为空",
            trigger: "blur",
          },
        ],
        zzqr: [
          { required: true, message: "著作权人不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  mounted() {
    this.getLwList();
    this.getCode("dmsplcm");
  },
  methods: {
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAddLw.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }

      return true;
    },
    checkFormEdit() {
      // 1.校验必填项
      console.log("111111111");
      let validForm = false;
      this.$refs.formEditLw.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    getLwList() {
      let data = {
        xh: this.$store.getters.userId,
      };
      queryLwqkList(data)
        .then((res) => {
          console.log(res);
          this.LwDetail = res.data;
        })
        .catch((err) => {});
    },
    lctClick(index) {
      if (!!this.LwDetail[index].processid) {
        this.$refs.child.inner(this.LwDetail[index].processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    chehui(index) {
      let data = {
        id: this.LwDetail[index].id,
        processid: this.LwDetail[index].processid,
      };
      cxLwqk(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("撤销成功");
          this.getLwList();
        } else {
          this.$message.error("撤销失败");
        }
      });
    },
    tj() {
      let data = {
        id: this.LwDetail[this.tjIndex].id,
        processid: this.LwDetail[this.tjIndex].processid,
      };
      tjLwqk([data]).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.getLwList();
        } else {
          this.$message.error("提交失败");
        }
      });
      this.submitModal = false;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm":
            this.ztStatus = res.data;
            break;
        }
      });
    },
    del() {
      deleteLwqk({ ids: [this.LwDetail[this.delIndex].id] }).then((res) => {
        this.$message.success("删除成功");
        this.getLwList();
      });
      this.delModal = false;
    },
    bianji(index) {
      this.formEditLw = this.LwDetail[index];
      this.editModal = true;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formEditLw;
        let formData = new FormData();
        formData.append("xxsmsx", data.xxsmsx);
        formData.append("yxzplx", data.yxzplx);
        formData.append("zsh", data.zsh);
        formData.append("zzqr", data.zzqr);
        formData.append("djh", data.djh);
        formData.append("rjzzmc", data.rjzzmc);
        formData.append("rjzzqlx", data.rjzzqlx);
        formData.append("id", data.id);
        formData.append("xh", this.$store.getters.userId);
        if (this.fileListAdd.length > 0) {
          this.fileListAdd.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importCzdaLwqk(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("编辑成功");
            this.getLwList();
          } else {
            this.$message.error("编辑失败");
          }
        });
        this.editModal = false;
      }
    },
    editCance() {
      this.editModal = false;
    },
    xinzeng() {
      this.formAddLw = {};
      this.formAddLw.files = [];
      this.fileList = [];
      this.addModal = true;
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAddLw;
        let formData = new FormData();
        formData.append("xxsmsx", data.xxsmsx);
        formData.append("yxzplx", data.yxzplx);
        formData.append("zsh", data.zsh);
        formData.append("zzqr", data.zzqr);
        formData.append("djh", data.djh);
        formData.append("rjzzmc", data.rjzzmc);
        formData.append("rjzzqlx", data.rjzzqlx);
        formData.append("xh", this.$store.getters.userId);
        //formData.append("id", data.id);

        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        importCzdaLwqk(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.getLwList();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    addCance() {
      this.addModal = false;
    },

    delCancel() {
      this.delModal = false;
    },
    showDel(index) {
      if (this.LwDetail[index].status == "01") {
        this.delModal = true;
        this.delIndex = index;
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    //提交
    submit(index) {
      if (this.LwDetail[index].status == "01") {
        this.tjIndex = index;
        this.submitModal = true;
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },

    subCancel() {
      this.submitModal = false;
    },
    beforeRemove(file, fileList) {
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      fileList.splice(idx, 0);
      this.fileList = fileList;
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    fileChange(file, fileList) {
      if (Number(file.size / 1024 / 1024) > 2) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("单个文件大小不得超过2M");
      } else if (file.status == "ready") {
        this.fileListAdd = [];
        this.fileListAdd.push(file); //修改编辑的文件参数
      }
      this.fileList = fileList;
    },
  },
};
</script>
<style lang="scss" scoped>
.kycg {
  flex: 1;
  background: #fff;
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
  }
  .scopeIncon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .chDis {
    background: url("~@/assets/dangan/chDisable.png");
  }
  .Edit {
    background: url("~@/assets/images/edit.png");
  }
  .EditDis {
    background: url("~@/assets/dangan/editDisable.png") no-repeat;
  }
  .del {
    background: url("~@/assets/assistantPng/delete.png") no-repeat;
  }
  .ch {
    background: url("~@/assets/dangan/ch.png");
  }
  .lct {
    background: url("~@/assets/dangan/lct.png");
  }
  .el-button--text {
    border-color: transparent;
    color: #005657;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
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
          background: url("../../../../assets/images/updata.png") no-repeat;
        }
      }
      .headerRight {
        display: flex;
        align-items: center;
        .borderBlue {
          background: #fff;
          border: 1px solid grey;
        }
        .borderOrange {
          border: 1px solid grey;
          background: #fff;
        }
        .borderLight {
          border: 1px solid grey;
          color: red;
          background: #fff;
        }
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
          .greenIcon {
            margin-top: 10px;
            background: url("~@/assets/assistantPng/add.png") no-repeat;
          }
        }
      }
    }
  }
  .backDetail {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    border-style: solid;
    border-width: 1px;
    border-color: #cccccc;
    .formLeft {
      width: 15%;
      background: #fff;
      display: flex;
      align-items: center;
      .title {
        width: 100%;
        text-align: center;
      }
    }
    .formRight {
      width: 85%;
      .rowStyle {
        padding: 0 !important;
        margin: 0;
        border-bottom: 1px solid #cccccc;
      }
      .wrap {
        display: flex;
        align-items: center;
        .title {
          flex: 0 0 160px;
          line-height: 48px;
          background: #e0e0e0;
          text-align: right;
          padding-right: 5px;
          margin: 0 !important;
        }
        .content {
          display: flex;
          font-weight: 400;
          font-size: 14px;
          color: #1f1f1f;
          line-height: 22px;
          margin-left: 16px;
        }
      }

      .GreenButton {
        width: 100px;
        //border: 1px solid grey;
        height: 49px;
        border-radius: 2px;
        background: #005657;
      }
      .title1 {
        font-size: 16px;
        text-align: center;
        line-height: 48px;
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
      .greenIcon {
        margin: 15px;
        background: url("~@/assets/assistantPng/add.png") no-repeat;
      }
    }
  }
  ::v-deep .el-form .el-form-item__error {
    top: 21%;
    right: 5% !important;
    left: unset;
  }
  ::v-deep .el-form .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
