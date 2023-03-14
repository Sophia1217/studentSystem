<template>
  <div>
    <div style="margin-top: 15px">
      <topTitle :routeTitle="routeTitle"></topTitle>
    </div>
    <div style="margin: 0 20% 0 20%">
      <div class="topHeader">
        <span>基层就业代偿申请表</span>
      </div>
      <div style="text-align: center"><span>2022年度</span></div>
      <el-form
        ref="formAdd"
        style="margin-bottom: 60px"
        :model="formAdd"
        :rules="rules"
        :inline-message="true"
      >
        <div class="mkHeader">学生基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学号" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学号姓名" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="政治面貌"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="民族" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省份证号" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="毕业时间"
                class="grayBg"
                label-width="42%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd "
                    v-model="formAdd.dkkssj"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历及学制" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所学专业" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="家庭住址"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="联系电话"
                class="grayBg"
                label-width="42%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="QQ"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="邮箱"
                class="grayBg"
                label-width="21%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">就业单位基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="基业单位名称"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="人事部门联系电话"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="省" class="grayBg" label-width="42%">
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市" class="grayBg" label-width="42%">
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="县（区）" class="grayBg" label-width="42%">
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="乡（街道）" class="grayBg" label-width="42%">
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="是否县政府所在地"
                class="grayBg"
                label-width="21%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-radio v-model="formAdd.sfszd" label="1">是</el-radio>
                  <el-radio v-model="formAdd.sfszd" label="2">否</el-radio>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="行业类别"
                class="grayBg"
                label-width="42%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="已签订服务年限"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    controls-position="right"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">学费及贷款基本信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="应缴纳学费金额"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="实际缴纳学费金额"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款本金金额"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="经办银行名称"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.xn" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="贷款合同号"
                class="grayBg"
                label-width="21%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-input
                    style="width: 216px"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="贷款起止时间"
                class="grayBg"
                label-width="21%"
                prop="dkzje"
                :rules="rules.common"
              >
                <div class="sqList">
                  <el-date-picker
                    type="daterange"
                    placeholder="选择日期"
                    v-model="formAdd.dksjArr"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width= 60px;"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">历史贷款信息</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="贷款学年" class="grayBg" label-width="42%">
                <div class="sqList">
                  <span> {{ formAdd.xn }}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款总金额（元）"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="贷款类型"
                prop="dklx"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.dklx" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dglxList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款银行"
                prop="dkyh"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-select v-model="formAdd.dkyh" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in dgyhList"
                      :key="index"
                      :label="item.mc"
                      :value="item.dm"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="合同编号"
                prop="htbh"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input
                    :minlength="0"
                    :maxlength="50"
                    v-model="formAdd.htbh"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="贷款开始时间"
                prop="dkkssj"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd "
                    v-model="formAdd.dkkssj"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">申请补偿金额</div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="申请补偿金额"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="银行卡号"
                prop="dkzje"
                :rules="rules.common"
                class="grayBg"
                label-width="42%"
              >
                <div class="sqList">
                  <el-input-number
                    style="width: 216px"
                    :min="0"
                    :max="9999999"
                    :controls="false"
                    v-model="formAdd.dkzje"
                    placeholder="请输入内容"
                  ></el-input-number>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="mkHeader">备注</div>
        <el-row :gutter="20">
          <el-col :span="23">
            <el-input
              v-model="formAdd.bz"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              placeholder="请输入内容"
              maxlength="500"
            ></el-input>
          </el-col>
        </el-row>
        <span class="redSpan">请务必加入基层就业QQ群，长期关注群消息</span>
      </el-form>
      <div style="height: 80px"></div>
    </div>
    <div class="editBottom">
      <div class="btn confirm">取消</div>
      <div class="btn cancel">保存</div>
    </div>
  </div>
</template>
<script>
import topTitle from "@/components/topTitleStu";
import lctCom from "@/components/lct";
import {
  nowYear,
  edit,
  query,
  del,
  back,
  tj,
  getDetails,
} from "@/api/gzzxdk/gjzxdk";
import { getCodeInfoByEnglish } from "@/api/politicalWork/basicInfo";
export default {
  components: {
    topTitle,
    lctCom,
  },
  data() {
    return {
      routeTitle: "",
      dglxList: [],
      dgyhList: [],
      //草稿状态和退回状态有编辑功能  01 || 08
      submitModal: false,
      lctModal: false,
      addModal: false,
      editModal: false,
      delModal: false,
      formAdd: {},
      formEdit: {},
      tableDate: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0,
        orderZd: "",
        orderPx: "",
      },
      editFlag: 2,
      fileList: [],
      delArr: [],
      tjArr: [],
      fileListAdd: [],
      ztStatus: [],
      val: [],
      czlx: [],
      dmsfbzm: [],
      chehuiModal: false,
      rules: {
        common: [
          {
            required: true,
            message: "请完善对应表单内容",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.routeTitle = this.$route.meta.title;
    this.query();
    this.getCode("dmsplcm"); //状态
    this.getCode("dmgjzxdk"); //国家助学贷款码
    this.getCode("dmzudkyhm"); //国家助学贷款银行码
    this.getYear();
  },

  methods: {
    getYear() {
      nowYear().then((res) => {
        this.dkxn = res.errmsg;
      });
    },
    tjModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.tjArr && this.tjArr.length > 0) {
          this.submitModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("不是草稿状态数据，不可以提交");
      }
    },
    tj() {
      var data = this.val;
      tj(data).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("提交成功");
          this.query();
          this.submitModal = false;
        } else {
          this.$message.error("提交失败");
        }
      });
    },
    subCancel() {
      this.submitModal = false;
    },
    // 表单校验
    checkFormAdd() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formAdd.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    handleCloseLct() {
      this.lctModal = false;
    },
    lctClick(row) {
      if (!!row.processid) {
        this.$refs.child.inner(row.processid);
        this.lctModal = true;
      } else {
        this.$message.warning("此项经历为管理员新增，暂无流程数据");
      }
    },
    checkFormEdit() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.formEdit.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },
    getCode(val) {
      const data = { codeTableEnglish: val };
      getCodeInfoByEnglish(data).then((res) => {
        switch (val) {
          case "dmsplcm": //审批结果
            this.ztStatus = res.data;
            break;
          case "dmgjzxdk":
            this.dglxList = res.data; //贷款类型
            break;
          case "dmzudkyhm":
            this.dgyhList = res.data; //银行
            break;
        }
      });
    },
    async showDetail(row) {
      let res = await getDetails({
        id: row.id,
      });
      // async await的正确用法是await返回值，而不是直接.then之后获取值
      if (res.errcode == "00") {
        this.formEdit = res.data;
        if (res.data.fileList && res.data.fileList.length > 0) {
          this.formEdit.fileList = res.data.fileList.map((ele) => {
            return {
              name: ele.fileName,
              ...ele,
            };
          });
        }
        this.editModal = true;
      }
    },
    chCancel() {
      this.chehuiModal = false;
    },
    ch() {
      back({ ids: this.delArr }).then((res) => {
        this.$message.success("撤回成功");
        this.query();
        this.chehuiModal = false;
      });
    },
    chModal() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "02") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.chehuiModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非待审核状态数据，不可以撤回");
      }
    },
    showDel() {
      var falg = 1;
      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i].status !== "01") falg = 2;
      }
      if (falg == 1) {
        if (this.delArr && this.delArr.length > 0) {
          this.delModal = true;
        } else {
          this.$message.error("请先勾选数据");
        }
      } else {
        this.$message.error("存在非草稿状态数据，不可以删除");
      }
    },
    del() {
      del({ ids: this.delArr }).then((res) => {
        this.query();
        this.delModal = false;
        this.$message.success("删除成功");
      });
    },
    delCancel() {
      this.delModal = false;
    },
    changeTableSort(column) {
      this.queryParams.orderZd = column.prop;
      this.queryParams.orderPx = column.order === "descending" ? "1" : "0"; // 0是asc升序，1是desc降序
      this.query();
    },
    handleSelectionChange(val) {
      this.val = val;
      this.delArr = val.map((item) => item.id);
      this.tjArr = val.map((item) => item.id);
    },
    editCance() {
      this.editModal = false;
      this.editFlag = 2;
      this.$refs.formEdit.resetFields();
    },
    addClick() {
      if (!this.checkFormAdd()) {
        this.$message.error("请完善表单相关信息！");
        return;
      } else {
        var data = this.formAdd;
        let formData = new FormData();
        formData.append("dkxn", this.dkxn);
        formData.append("bz", data.bz);
        formData.append("zsfys", data.zsfys);
        formData.append("xfys", data.xfys);
        formData.append("dkzje", data.dkzje);
        formData.append("dklx", data.dklx);
        formData.append("dkyh", data.dkyh);
        formData.append("htbh", data.htbh);
        formData.append("dkkssj", data.dkkssj);
        formData.append("dkqx", data.dkqx);
        formData.append("hzjym", data.hzjym);
        formData.append("xh", this.$store.getters.userId);
        formData.append("shrgh", "");
        formData.append("id", "");
        if (this.fileList.length > 0) {
          this.fileList.map((file) => {
            formData.append("files", file.raw);
          });
        }
        edit(formData).then((res) => {
          if (res.errcode == "00") {
            this.$message.success("新增成功");
            this.query();
          } else {
            this.$message.error("新增失败");
          }
        });
        this.addModal = false;
      }
    },
    query() {
      var data = {
        xh: this.$store.getters.userId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderZd: this.queryParams.orderZd,
        orderPx: this.queryParams.orderPx,
      };
      query(data).then((res) => {
        this.tableDate = res.data;
        this.queryParams.totalCount = res.totalCount;
      });
    },
    xinzeng() {
      this.formAdd = {
        xn: this.dkxn, //贷款学年
        bz: "", //备注
        zsfys: "", //
        xfys: "", //
        dkzje: "",
        dklx: "",
        dkyh: "",
        htbh: "",
        dkkssj: "",
        dkqx: "",
        hzjym: "",
      }; // 每次打开弹框先将弹框的table数组置空
      this.fileList = [];
      this.addModal = true;
    },
    addCance() {
      this.addModal = false;
      this.$refs.formAdd.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.topHeader {
  text-align: center;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #005657;
}
.mkHeader {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #1f1f1f;
  margin: 15px 0 15px 3px;
}
.redSpan {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #ff0000;
}
::v-deep .grayBg .el-form-item__label {
  background-color: #f0f0f0;
  padding: 5px 10px 5px 0px;
}
.grayBg {
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 0;
}
.sqList {
  padding: 5px 0px 5px 10px;
  width: 85%;
}
.scopeIncon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.handledie {
  background: url("~@/assets/images/details.png");
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

.lct {
  background: url("~@/assets/dangan/lct.png");
}
::v-deep .el-dialog__header {
  border-bottom: 1px solid #eee;
}

// dialog标题黑色
::v-deep .el-dialog__title {
  font-weight: bold;
}
.el-button--text {
  border-color: transparent;
  color: #005657;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
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
}
</style>
