<template>
  <div class="kycg">
    <div class="right_top">
      <p class="toptitle">科研论文</p>
    </div>
    <div class="tableWrap mt15">
      <div class="headerTop">
        <div class="headerLeft">
          <span class="title">科研论文</span>
        </div>
        <div class="headerRight">
          <div class="btns borderGreen" @click="xinzeng">
            <i class="icon greenIcon"></i><span class="title1">新增</span>
          </div>
        </div>
      </div>
      <div class="backDetail" v-for="(ele, index) in LwDetail" :key="index">
        <div class="formLeft">
          <div class="title">论文期刊</div>
        </div>
        <div class="formRight">
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">论文名称</div>
                <div class="content">{{ ele.lwzwmc }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">论文英文名</div>
                <div class="content">{{ ele.lwywmc }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">刊物名称</div>
                <div class="content">{{ ele.fbkw }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">刊物类型</div>
                <div class="content">{{ ele.cbwlx }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">署名顺序</div>
                <div class="content">{{ ele.sm }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">收录类别</div>
                <div class="content">{{ ele.sllb }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">分类号</div>
                <div class="content">{{ ele.flh }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">版面</div>
                <div class="content">{{ ele.bm }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">卷期</div>
                <div class="content">{{ ele.jq }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">起止页</div>
                <div class="content">{{ ele.qzy }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">成果所属单位</div>
                <div class="content">{{ ele.cgssdw }}</div>
              </div>
            </el-col>
            <el-col :span="12" class="rowStyle">
              <div class="wrap">
                <div class="title">发表时间</div>
                <div class="content">{{ ele.fbrq }}</div>
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
          <el-row>
            <el-col :span="24" class="rowStyle">
              <div class="wrap">
                <div class="title">操作</div>
                <div class="content">
                  <el-button type="text" size="small" @click="bianji(index)">
                    <i class="scopeIncon Edit"></i>
                    <span>编辑</span>
                  </el-button>
                  <!-- <el-button
                    type="text"
                    size="small"
                    :disabled="true"
                    @click="bianji(index)"
                    v-show="ele.status !== '01' && ele.status !== '08'"
                  >
                    <i class="scopeIncon EditDis"></i>
                    <span style="color: #bfbfbf">编辑</span>
                  </el-button> -->

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
            </el-col>
            <!-- <el-col :span="2">
              <div class="GreenButton" @click="submit(index)">
                <i class="icon greenIcon"></i><span class="title1">提交</span>
              </div>
            </el-col> -->
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
              <div class="title">论文期刊</div>
            </div>
            <div class="formRight">
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="lwzwmc">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>论文名称
                      </div>

                      <div class="content">
                        <el-input
                          v-model="formAddLw.lwzwmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="lwywmc">
                    <div class="wrap">
                      <div class="title">论文英文名</div>
                      <div class="content">
                        <el-input
                          v-model="formAddLw.lwywmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="fbkw">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>刊物名称
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.fbkw"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="cbwlx">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>刊物类型
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.cbwlx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="sm">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>署名顺序
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.sm"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="sllb">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>收录类别
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.sllb"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="flh">
                    <div class="wrap">
                      <div class="title">分类号</div>
                      <div class="content">
                        <el-input v-model="formAddLw.flh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="bm">
                    <div class="wrap">
                      <div class="title">版面</div>
                      <div class="content">
                        <el-input v-model="formAddLw.bm"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="jq">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>卷期
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.jq"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="qzy">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>起止页
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.qzy"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="cgssdw">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>成果所属单位
                      </div>
                      <div class="content">
                        <el-input v-model="formAddLw.cgssdw"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="fbrq">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>发表时间
                      </div>
                      <div class="content">
                        <el-date-picker
                          v-model="formAddLw.fbrq"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        />
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
              <div class="title">论文期刊</div>
            </div>
            <div class="formRight">
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="lwzwmc">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>论文名称
                      </div>

                      <div class="content">
                        <el-input
                          v-model="formEditLw.lwzwmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="rowStyle">
                  <el-form-item prop="lwywmc">
                    <div class="wrap">
                      <div class="title">论文英文名</div>
                      <div class="content">
                        <el-input
                          v-model="formEditLw.lwywmc"
                          style="width: 300%"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="fbkw">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>刊物名称
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.fbkw"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="cbwlx">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>刊物类型
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.cbwlx"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="sm">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>署名顺序
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.sm"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="sllb">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>收录类别
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.sllb"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="flb">
                    <div class="wrap">
                      <div class="title">分类号</div>
                      <div class="content">
                        <el-input v-model="formEditLw.flh"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="bm">
                    <div class="wrap">
                      <div class="title">版面</div>
                      <div class="content">
                        <el-input v-model="formEditLw.bm"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="jq">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>卷期
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.jq"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="qzy">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>起止页
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.qzy"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="cgssdw">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>成果所属单位
                      </div>
                      <div class="content">
                        <el-input v-model="formEditLw.cgssdw"></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <el-form-item prop="fbrq">
                    <div class="wrap">
                      <div class="title">
                        <span style="color: red">*</span>发表时间
                      </div>
                      <div class="content">
                        <el-date-picker
                          v-model="formEditLw.fbrq"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        />
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
} from "@/api/growFiles/kycg";
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
        lwzwmc: [
          { required: true, message: "论文名称不能为空", trigger: "blur" },
        ],
        lwywmc: [
          //{ required: true, message: "论文英文名不能为空", trigger: "blur" },
        ],
        sm: [{ required: true, message: "署名顺序不能为空", trigger: "blur" }],
        jq: [{ required: true, message: "卷期不能为空", trigger: "blur" }],
        qzy: [{ required: true, message: "起止页不能为空", trigger: "blur" }],
        bm: [
          // {
          //   required: true,
          //   message: "版面不能为空",
          //   trigger: "blur",
          // },
        ],
        cbwlx: [
          { required: true, message: "刊物类型不能为空", trigger: "blur" },
        ],
        cbwlxdm: [
          { required: true, message: "收录类别不能为空", trigger: "blur" },
        ],
        cgssdw: [
          { required: true, message: "所属单位不能为空", trigger: "blur" },
        ],
        fbkw: [
          { required: true, message: "刊物名称不能为空", trigger: "blur" },
        ],
        fbrq: [
          { required: true, message: "发表日期不能为空", trigger: "blur" },
        ],
        sllb: [
          { required: true, message: "收录类别不能为空", trigger: "blur" },
        ],
        flh: [
          // {
          //   required: true,
          //   message: "分类号不能为空",
          //   trigger: "blur",
          // },
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
        xh: this.$route.query.xh,
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
      this.fileListAdd = [];
      this.editModal = true;
    },
    editClick() {
      if (!this.checkFormEdit()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formEditLw;
        let formData = new FormData();
        formData.append("bm", data.bm);
        formData.append("cbwlx", data.cbwlx);
        formData.append("cgssdw", data.cgssdw);
        formData.append("fbkw", data.fbkw);
        formData.append("fbrq", data.fbrq);
        formData.append("id", data.id);
        formData.append("flh", data.flh);
        formData.append("jq", data.jq);
        formData.append("lwzwmc", data.lwzwmc);
        formData.append("lwywmc", data.lwywmc);
        formData.append("qzy", data.qzy);
        formData.append("sllb", data.sllb);
        formData.append("sm", data.sm);
        formData.append("xh", this.$route.query.xh);
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
        formData.append("bm", data.bm);
        formData.append("cbwlx", data.cbwlx);
        formData.append("cgssdw", data.cgssdw);
        formData.append("fbkw", data.fbkw);
        formData.append("fbrq", data.fbrq);
        //formData.append("id", data.id);
        formData.append("flh", data.flh);
        formData.append("jq", data.jq);
        formData.append("lwzwmc", data.lwzwmc);
        formData.append("lwywmc", data.lwywmc);
        formData.append("qzy", data.qzy);
        formData.append("sllb", data.sllb);
        formData.append("sm", data.sm);
        formData.append("xh", this.$route.query.xh);
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
      //   if (this.LwDetail[index].status == "01") {
      this.delModal = true;
      this.delIndex = index;
      //   } else {
      //     this.$message.error("存在非草稿状态数据，不可以删除");
      //   }
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
          font-weight: 400;
          font-size: 14px;
          color: #1f1f1f;
          line-height: 22px;
          margin-left: 16px;
        }
      }

      .GreenButton {
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
