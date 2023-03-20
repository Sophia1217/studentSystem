 <template>
  <div class="basicInfo">
    <div class="tableWrap mt15">
      <div class="mt15">
        <el-table ref="multipleTable" :data="basicInfoList" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="businessName" label="事项" />
          <el-table-column prop="sqkfsj" label="申请开放时间" width="500px">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.sqkfsj"
                type="datetimerange"
                range-separator="至"
                start-placeholder="起始年月日"
                end-placeholder="结束年月日"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeChange(scope.row)"
                :disabled="scope.row.kgzt == '0' ? false : true"
                :clearable="false"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="kgzt" label="申请状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.kgzt"
                active-color="#23AD6F"
                inactive-color="#E0E0E0"
                active-value="0"
                inactive-value="1"
                @change="kgChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="flowName" label="审批流程" />

          <el-table-column label="流程图">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleReadImage(scope.row.flowId)"
                v-show="scope.row.flowId !== ''"
              >
                <i class="scopeIncon lct"></i>
                <span class="handleName">流程图</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="其他" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="qjClick(scope.row)"
                v-show="scope.row.businessName == '日常请假'"
                style="margin-left: 10px"
              >
                <span class="handleName">请假区间说明</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="jeClick(scope.row)"
                v-show="scope.row.businessName == '临时困难'"
              >
                <span class="handleName">设置</span>
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="pyccClick(scope.row)"
                v-show="scope.row.businessName == '学籍异动_保留学籍'"
              >
                <span class="handleName">培养层次设置</span>
              </el-button>
              <div v-show="scope.row.businessName == '大病救助'">
                <el-upload
                  accept=".pdf"
                  :auto-upload="true"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :before-upload="
                    (item) => {
                      beforeUpload(item, scope.row);
                    }
                  "
                  :headers="fileHeader"
                  :data="fileData"
                  :on-success="upLoadSuccess"
                  :on-error="upLoadError"
                >
                  <el-button
                    type="text"
                    size="small"
                    style="margin-left: 10px"
                    @click="thmb(scope.row)"
                  >
                    <span class="handleName">上传协议附件</span>
                  </el-button>
                </el-upload>
                <el-button
                  type="text"
                  size="small"
                  @click="dbjzDownClick"
                  style="margin-left: 10px"
                >
                  <span class="handleName">下载协议附件</span>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="请假区间说明" :visible.sync="qjModal" width="30%">
      <template>
        <div>
          <span
            >规则：①7个自然天数内（含）辅导员审批即可。<br />
            ②8-14个自然天数内（含），在①的基础上，增加本科学工负责人/本研学工负责人审批。<br />
            ③15个自然天数（含）以上，在②的基础上增加学工部工作人员审批。<br />
          </span>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      title="设置"
      :visible.sync="jeModal"
      width="30%"
      @close="emptyDetails()"
    >
      <template>
        <div>
          <el-form inline ref="formje" :model="formje" :rules="rules">
            <el-form-item label="金额上限(元)" prop="je">
              <el-input
                v-model="formje.je"
                type="number"
                maxlength="9"
              ></el-input>
            </el-form-item>
            <el-form-item label="学院审批是否受额度限制(本科生)" prop="bkssfsx">
              <el-select v-model="formje.bkssfsx" placeholder="请选择">
                <el-option
                  v-for="(item, index) in sfOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学院审批是否受额度限制(研究生)" prop="yjssfsx">
              <el-select v-model="formje.yjssfsx" placeholder="请选择">
                <el-option
                  v-for="(item, index) in sfOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="jeCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="jeConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="培养层次设置" :visible.sync="pyccModal" width="30%">
      <template>
        <div>
          <el-form>
            <el-form-item label="培养层次">
              <el-select v-model="pycc" placeholder="未选择" clearable multiple>
                <el-option
                  v-for="(item, index) in pyccOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pyccCancel">取 消</el-button>
        <el-button type="primary" class="confirm" @click="pyccConfirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="设置" :visible.sync="sjModal" width="30%">
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
    </el-dialog>
    <!-- 流程图 -->
    <el-dialog
      :title="readImage.title"
      :visible.sync="readImage.open"
      width="70%"
      append-to-body
    >
      <!-- <el-image :src="readImage.src"></el-image> -->
      <flow :xmlData="xmlData" />
    </el-dialog>
  </div>
</template>
<script>
import {
  querySqkgList,
  updateQt,
  updateSqkgsjsz,
} from "@/api/dailyBehavior/applySetting";
import { readXml } from "@/api/flowable/definition";
import flow from "@/views/flowable/task/record/flow";
import { querywj, Exportwj } from "@/api/assistantWork/classEvent";
import { delwj } from "@/api/dailyBehavior/graduationIdt";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getToken } from "@/utils/auth";
export default {
  name: "BasicInfo",
  components: { flow },
  computed: {
    fileData: {
      get() {
        return {
          pageType: "dbjzsq",
          roleType: "rcsw",
          businesId: this.businesId,
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
  data() {
    return {
      businesId: "",
      uploadUrl: process.env.VUE_APP_BASE_API + "/fileCommon/uploadFileCommon",
      basicInfoList: [],
      sqkfsj: [],
      lctModal: false,
      qjModal: false,
      jeModal: false,
      pyccModal: false,
      sjModal: false,
      pyccOps: [],
      pycc: "",
      formje: { je: "", bkssfsx: "", yjssfsx: "" },

      readImage: {
        open: false,
        src: "",
      },
      // xml
      xmlData: "",
      rowDetail: {},
      sfOps: [
        { dm: "0", mc: "是" },
        { dm: "1", mc: "否" },
      ],
      fileListJm: [],
      rules: {
        je: [{ required: true, message: "金额上限不能为空", trigger: "blur" }],
        bkssfsx: [{ required: true, message: "设置不能为空", trigger: "blur" }],
        yjssfsx: [{ required: true, message: "设置不能为空", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.getList();
    this.getCode("dmpyccm");
  },
  methods: {
    emptyDetails() {
      this.$nextTick(() => {
        this.$refs.formje.clearValidate();
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
    getList() {
      querySqkgList().then((res) => {
        this.basicInfoList = res.data;
        for (let val of this.basicInfoList) {
          var a = val.sqkfqjs ? val.sqkfqjs : "";
          var b = val.sqkfqje ? val.sqkfqje : "";
          var arr = [];

          arr.push(a);
          arr.push(b);
          this.$set(val, "sqkfsj", arr);
        }
      });
    },
    hadleDetail() {},
    lctClick(row) {
      if (!!row.flowId) {
        this.$refs.child.inner(row.flowId);
        this.lctModal = true;
      }
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    qjClick() {
      this.qjModal = true;
    },
    jeClick(row) {
      this.jeModal = true;
      this.rowDetail = row;
      this.formje.je = this.rowDetail.qt.split(",")[0];
      this.formje.bkssfsx = this.rowDetail.qt.split(",")[1];
      this.formje.yjssfsx = this.rowDetail.qt.split(",")[2];
    },
    pyccClick(row) {
      this.pyccModal = true;
      this.rowDetail = row;

      this.pycc = this.rowDetail.qt.split(",");
    },
    jeCancel() {
      this.jeModal = false;
    },
    jeConfirm() {
      if (!this.checkForm()) {
        this.$message.error("请完善表单相关信息！");

        return;
      } else {
        let data = {
          qt:
            this.formje.je +
            "," +
            this.formje.bkssfsx +
            "," +
            this.formje.yjssfsx,
          businessName: this.rowDetail.businessName,
          // id: this.rowDetail.id,
          // kgzt: this.rowDetail.kgzt,
          // sqkfqje: this.rowDetail.sqkfsj[1] ? this.rowDetail.sqkfsj[1] : "",
          // sqkfqjs: this.rowDetail.sqkfsj[0] ? this.rowDetail.sqkfsj[0] : "",
        };
        updateQt(data).then((res) => {
          this.jeModal = false;
          this.getList();
        });
      }
    },
    pyccCancel() {
      this.pyccModal = false;
    },
    pyccConfirm() {
      let data = {
        qt: this.pycc.toString(),
        businessName: "学籍异动",
      };
      updateQt(data).then((res) => {
        this.pyccModal = false;
        this.getList();
      });
    },
    sjCancel() {
      this.sjModal = false;
    },
    sjConfirm() {
      let data = {
        businessName:
          this.rowDetail.businessName == "学籍异动_保留学籍" ||
          this.rowDetail.businessName == "学籍异动_复学" ||
          this.rowDetail.businessName == "学籍异动_退学" ||
          this.rowDetail.businessName == "学籍异动_休学"
            ? "学籍异动"
            : this.rowDetail.businessName,
        id: this.rowDetail.id,
        kgzt: this.rowDetail.kgzt,
        qt: this.rowDetail.qt,
        sqkfqje: this.rowDetail.sqkfsj[1] ? this.rowDetail.sqkfsj[1] : "",
        sqkfqjs: this.rowDetail.sqkfsj[0] ? this.rowDetail.sqkfsj[0] : "",
      };
      updateSqkgsjsz(data).then((res) => {
        this.sjModal = false;
        this.getList();
      });
    },
    timeChange(row) {
      this.sjModal = true;
      this.rowDetail = row;
      console.log(this.rowDetail);
    },
    kgChange(row) {
      if (row.kgzt == "1") {
        this.$set(row, "sqkfsj", []);

        let data = {
          businessName:
            row.businessName == "学籍异动_保留学籍" ||
            row.businessName == "学籍异动_复学" ||
            row.businessName == "学籍异动_退学" ||
            row.businessName == "学籍异动_休学"
              ? "学籍异动"
              : row.businessName,
          id: row.id,
          kgzt: row.kgzt,
          qt: row.qt,
          sqkfqje: row.sqkfsj[1] ? row.sqkfsj[1] : "",
          sqkfqjs: row.sqkfsj[0] ? row.sqkfsj[0] : "",
        };
        updateSqkgsjsz(data).then((res) => {
          this.getList();
        });
      } else {
        this.$message.warning("请选择开放时间！");
      }
    },
    /** 流程图查看 */
    handleReadImage(flowId) {
      this.readImage.title = "流程图";
      this.readImage.open = true;
      // this.readImage.src = process.env.VUE_APP_BASE_API + "/flowable/definition/readImage/" + flowId;
      // 发送请求，获取xml
      readXml(flowId).then((res) => {
        this.xmlData = res.data;
      });
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
            case "dmpyccm":
              this.pyccOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    dbjzDownClick() {
      querywj({ businesId: "大病救助" }).then((res) => {
        if (res.data && res.data.length > 0) {
          var aid = res.data[0];
          Exportwj({ id: aid.id }).then((res) => {
            this.url = window.URL.createObjectURL(res);
            this.downloadFn(res, aid.fileName);
          });
        }
      });
    },
    upLoadSuccess(res, file, fileList) {
      if (res.errcode == "00") {
        this.$message({
          type: "success",
          message: res.errmsg,
        });
        this.getList();
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
    beforeUpload(file, row, index) {
      console.log("row.businessName", row.businessName);
      if (row.businessName == "大病救助") {
        delwj({ businesId: "大病救助" }).then((res) => {});
      }
    },
    thmb(row) {
      this.businesId = "大病救助";
    },
  },
};
</script>
   <style lang="scss" scoped>
.lct {
  background: url("~@/assets/dangan/lct.png");
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

