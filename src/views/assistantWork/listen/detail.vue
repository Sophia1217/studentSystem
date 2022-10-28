<template>
  <div class="addRole">
    <div style="background-color: white; margin-top: 20px; padding: 24px">
      <div style="margin-bottom: 20px">
        <span class="titleTop">记录人员</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="5">
            申请人工号：<el-input
              v-model="defaultForm.jlrgh"
              :disabled="true"
              style="width: 200px"
            ></el-input>
          </el-col>
          <el-col :span="4">
            姓名 :<el-input
              v-model="defaultForm.jlrxm"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            单位:
            <el-input
              v-model="defaultForm.jlrssdw"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            岗位:<el-input
              v-model="defaultForm.jlrgw"
              style="width: 200px"
              :disabled="true"
            ></el-input
          ></el-col>
          <el-col :span="4">
            类型:<el-input
              v-model="defaultForm.jlrlx"
              :disabled="true"
              style="width: 200px"
            ></el-input
          ></el-col>
        </el-row>
      </div>
    </div>
    <div class="permissions1">
      <div class="headTop">
        <div class="headRight">
          <span class="title">课程详情</span>
        </div>
      </div>
      <el-form ref="Form" label-width="80px" v-model="Form">
        <el-form-item
          label="任课教师
        "
        >
          <el-row>
            <div v-if="listFlag == true || state == 0 || flag == true">
              <el-col v-for="(ele, index) in Form.rkls" :key="index" :span="4">
                <el-input
                  v-model="ele.value"
                  :disabled="state == 0 || listFlag == true || flag == true"
                >
                </el-input>
              </el-col>
            </div>
            <el-col :span="5.5" v-else>
              <el-autocomplete
                v-model="Form.rkls[0].value"
                :disabled="state == 0"
                :fetch-suggestions="querySearch"
                placeholder="请输入任课教师"
                :trigger-on-focus="false"
                style="width: 250px"
                @select="
                  (item) => {
                    handleSelect(item);
                  }
                "
                size="small"
              ></el-autocomplete>
            </el-col>
            <el-col :span="2.5">
              <el-button
                style="background: #005657; color: white; margin-left: 10px"
                @click="classQuery"
                v-if="state == 1"
                >课程查询</el-button
              >
            </el-col>
            <el-col :span="2.5">
              <el-button
                style="background: #005657; color: white; margin-left: 10px"
                @click="delInfo"
                v-if="state == 1"
                >清空</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <div style="display: flex">
          <el-form-item
            label="课堂名称
        "
          >
            <el-input
              v-model="Form.kcmc"
              :disabled="state == 0 || listFlag == true || flag == true"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="编号
        "
          >
            <el-input
              v-model="Form.bh"
              :disabled="state == 0 || listFlag == true || flag == true"
            >
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="开课时间">
          <div v-if="flag == true || listFlag == true">
            <div v-for="(ele, index) in Form.kksj">
              <el-row>
                <el-col :span="3.5">
                  <el-select
                    v-model="Form.kksj[index].xingqi"
                    :disabled="true"
                    placeholder="星期"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入节数"
                    :disabled="true"
                    size="small"
                    v-model="Form.kksj[index].jieKs"
                    style="width: 240px"
                  ></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入开始到结束的周"
                    size="small"
                    :disabled="true"
                    v-model="Form.kksj[index].week"
                    style="width: 240px"
                  ></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="flag == false && listFlag == false">
            <div v-for="(ele, index) in Form.kksj">
              <el-row>
                <el-col :span="4">
                  <el-select
                    v-model="Form.kksj[index].xingqi"
                    placeholder="星期"
                    :disabled="state == 0"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="3.5">
                  <el-select
                    @change="
                      (item) => {
                        wh(item, index);
                      }
                    "
                    v-model="Form.kksj[index].jieKs"
                    :disabled="state == 0"
                    placeholder="请选择开始节数"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="0.5">
                  <span>-</span>
                </el-col>
                <el-col :span="4">
                  <el-select
                    @change="
                      (item) => {
                        bj(item, index);
                      }
                    "
                    v-model="Form.kksj[index].jieJs"
                    :disabled="state == 0"
                    placeholder="请选择结束节数"
                  >
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-input
                    placeholder="请输入开始到结束的周"
                    :disabled="state == 0"
                    size="small"
                    v-model="Form.kksj[index].week"
                    style="width: 240px"
                  ></el-input>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="授课时间">
          <el-date-picker
            v-model="Form.sksj"
            type="date"
            :disabled="state == 0"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="授课教室">
          <el-input
            size="small"
            v-model="Form.skjs"
            :disabled="state == 0 || listFlag == true || flag == true"
            style="width: 240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="听课情况">
          <el-input
            size="small"
            v-model="Form.tkqk"
            :disabled="state == 0"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10 }"
            placeholder="请输入内容"
            maxlength="2000"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="添加附件" v-if="state == '0'">
          <div v-if="urlArr.length > 0" class="block">
            <div v-for="(item, i) in urlArr">
              <el-image
                style="margin-left: 20px; width: 300px; height: 300px"
                :src="item"
              ></el-image>
            </div>
          </div>
          <el-upload
            action="#"
            multiple
            :file-list="fileList"
            :auto-upload="false"
            class="el-upload"
            :on-preview="handlePreview"
            :disabled="state == '1' ? true : false"
          >
          </el-upload>
        </el-form-item>
        <el-form-item label="添加附件" v-if="state !== '0'">
          <el-upload
            drag
            action="#"
            multiple
            :file-list="fileList"
            :auto-upload="false"
            class="el-upload"
            :on-preview="handlePreview"
            :on-change="change"
            :before-remove="beforeRemove"
            :disabled="state == '0'"
          >
            <div class="el-upload-dragger">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击</em>或<em>拖拽</em>上传附件
              </div>
              <div class="el-upload__text">
                支持格式：PNG、JPG、WORD、PDF、PPT、ZIP或RAR等主流格，压缩包10M以内，图片2M以内
              </div>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="p2" v-if="state == 0 && sf == 0">
      <el-button
        style="background: #005657; color: white; margin-left: 10px"
        @click="edit"
        >编辑</el-button
      >
    </div>
    <div class="p2" v-if="state == 1">
      <el-button
        style="background: #005657; color: white; margin-left: 10px"
        @click="saveListen"
        >保存</el-button
      >
      <el-button @click="quxiao">取消</el-button>
    </div>
    <el-dialog title="课程查询" :visible.sync="dialogFormVisible">
      <el-form v-model="queryParams" :inline="true">
        <el-form-item label="任课教师" prop="jsxx">
          <el-input
            v-model="queryParams.jsxx"
            placeholder="请输入任课教师"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="sjm">
          <el-select v-model="queryParams.xnm" placeholder="学年" size="small">
            <el-option
              v-for="(item, index) in njOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学期" prop="xqm">
          <el-select
            v-model="queryParams.xqm"
            collapse-tags
            placeholder="请选择学期"
            size="small"
          >
            <el-option
              v-for="item in xqList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> </el-select
          ><el-button
            style="background: rgb(0, 86, 87); color: white; margin-left: 10px"
            @click="FdyKcxxPageList"
          >
            查询
          </el-button></el-form-item
        >
        <el-table
          :data="tableDate"
          ref="multipleTable"
          style="width: 100%"
          @select="select"
          @select-all="selectAll"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="kch" label="课程编号" sortable="custom">
          </el-table-column>
          <el-table-column prop="kcmc" label="课程名称" sortable="custom">
          </el-table-column>
          <el-table-column prop="jxdd" label="教室" sortable="custom">
          </el-table-column>
          <el-table-column prop="sksj" label="开课时间" sortable="custom">
          </el-table-column>
          <el-table-column prop="jsxx" label="教师信息" sortable="custom">
          </el-table-column>
        </el-table>
        <pagination
          v-show="queryParams.total > 0"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="FdyKcxxPageList"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModal()">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getXmXgh,
  getGrade,
  FdyKcxxPageList,
  getDetail,
  updateListen,
} from "@/api/assistantWork/listen";
import { querywj, delwj, Exportwj } from "@/api/assistantWork/classEvent";
export default {
  data() {
    return {
      tjlx: "1", //新增的单条数据标志
      flag: true,
      listFlag: false,
      dialogFormVisible: false,
      tableDate: [],
      queryParams: {
        jsxx: "",
        xqm: "",
        xnm: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      options: [
        {
          value: "星期一",
          label: "星期一",
        },
        {
          value: "星期二",
          label: "星期二",
        },
        {
          value: "星期三",
          label: "星期三",
        },
        {
          value: "星期四",
          label: "星期四",
        },
        {
          value: "星期五",
          label: "星期五",
        },
        {
          value: "星期六",
          label: "星期六",
        },
        {
          value: "星期天",
          label: "星期天",
        },
      ],
      xqList: [
        {
          value: "3",
          label: "第一学期",
        },
        {
          value: "12",
          label: "第二学期",
        },
        {
          value: "16",
          label: "第三学期",
        },
      ],
      njOptions: [],
      options1: [
        {
          value: "1",
          label: "第1",
        },
        {
          value: "2",
          label: "第2",
        },
        {
          value: "3",
          label: "第3",
        },
        {
          value: "4",
          label: "第4",
        },
        {
          value: "5",
          label: "第5",
        },
        {
          value: "6",
          label: "第6",
        },
        {
          value: "7",
          label: "第7",
        },
        {
          value: "8",
          label: "第8",
        },
        {
          value: "9",
          label: "第9",
        },
        {
          value: "10",
          label: "第10",
        },
        {
          value: "11",
          label: "第11",
        },
        {
          value: "12",
          label: "第12",
        },
        {
          value: "13",
          label: "第13",
        },
      ],
      options2: [
        {
          value: "1",
          label: "1节",
        },
        {
          value: "2",
          label: "2节",
        },
        {
          value: "3",
          label: "3节",
        },
        {
          value: "4",
          label: "4节",
        },
        {
          value: "5",
          label: "5节",
        },
        {
          value: "6",
          label: "6节",
        },
        {
          value: "7",
          label: "7节",
        },
        {
          value: "8",
          label: "8节",
        },
        {
          value: "9",
          label: "9节",
        },
        {
          value: "10",
          label: "10节",
        },
        {
          value: "11",
          label: "11节",
        },
        {
          value: "12",
          label: "12节",
        },
        {
          value: "13",
          label: "13节",
        },
      ],
      Form: {
        fileList: [],
        rkls: [],
        kcmc: "",
        bh: "",
        kksj: [],
        xq: "",
        sksj: "",
        skjs: "",
        tkqk: "",
      },
      defaultForm: {
        jlrgh: "",
        jlrxm: "",
        jlrssdw: "",
        jlrgw: "",
        jlrlx: "",
      },
      lgnSn: "",
      state: 0, //是编辑还是详情
      multipleSelection: {},
      fileListAdd: [],
      urlArr: [],
      fileList: [],
      sf: 0,
    };
  },

  mounted() {
    this.lgnSn = this.$route.query.id;
    this.state = this.$route.query.state;
    this.sf = this.$route.query.sf;
    this.querywj();
    this.getYears();
    this.getDetail();
  },

  methods: {
    selectAll() {
      this.$message.error("请不要一次性勾选多个数据");
      this.$refs.multipleTable.clearSelection();
    },
    select(selection, row) {
      this.multipleSelection = row;
      // 清除 所有勾选项
      this.$refs.multipleTable.clearSelection();
      // 当表格数据都没有被勾选的时候 就返回
      // 主要用于将当前勾选的表格状态清除
      if (selection.length == 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
    },
    wh(val, index) {
      if (
        Number(this.Form.kksj[index].jieJs) <= Number(val) &&
        this.Form.kksj[index].jieJs != ""
      ) {
        this.$message.error("开课节数要大于开始节数");
        this.Form.kksj[index].jieKs = "";
      }
    },
    bj(val, index) {
      if (
        Number(this.Form.kksj[index].jieJs) <=
          Number(this.Form.kksj[index].jieKs) &&
        this.Form.kksj[index].jieKs != ""
      ) {
        this.$message.error("开课节数要大于开始节数");
        this.Form.kksj[index].jieJs = "";
      }
    },
    delInfo() {
      this.flag = false;
      this.listFlag = false;
      this.tjlx = "1";
      this.Form.xq = "";
      this.Form.kcmc = "";
      this.Form.bh = "";
      this.Form.skjs = "";
      this.Form.kksj = [
        {
          xingqi: "",
          jieKs: "",
          jieJs: "",
          week: "",
        },
      ];
      this.Form.rkls = [{ value: "", xh: "", xm: "" }];
    },
    handlePreview(file) {
      //用于文件下载
      Exportwj({ id: file.id.toString() }).then((res) => {
        this.url = window.URL.createObjectURL(res);
        this.downloadFn(res, file.fileName, file.fileSuffix);
      });
    },
    beforeRemove(file, fileList) {
      //用于文件删除
      let uid = file.uid;
      let idx = fileList.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
      if (file.id) {
        //如果是后端返回的文件就走删除接口，不然前端自我删除
        delwj({ id: file.id.toString() }).then();
      }
    },
    querywj() {
      //用于文件查询
      querywj({ businesId: this.lgnSn }).then((res) => {
        this.fileList = res.data;
        this.fileList.map((ele) => {
          if (ele.fileSuffix == ".png" || ele.fileSuffix == ".jpg") {
            if (this.urlArr.length < 3) {
              this.urlArr.push(`${window.location.origin}/sfile/${ele.proId}`);
            }
          }
        });
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    getDetail() {
      getDetail({ id: this.lgnSn }).then((res) => {
        var lsXhList = res.data.rklsgh.split(",");
        var lsXmList = res.data.rkls.split(",");
        var lsList = lsXhList.map((v, i) => ({
          xh: lsXhList[i],
          xm: lsXmList[i],
          value: lsXmList[i] + "/" + lsXhList[i],
        }));
        this.flag = res.data.tjlx == "0" ? true : false; //0是列表数据不让修改，1是新增单条数据
        this.Form.kksj = res.data.kcsksjList; //后台给的处理数据
        this.Form.xq = res.data.kckksj; //后台给的未处理时间数据
        this.defaultForm.jlrgh = res.data.jlrgh;
        this.defaultForm.jlrxm = res.data.jlrxm;
        this.defaultForm.jlrlx = res.data.jlrlx;
        this.defaultForm.jlrssdw = res.data.jlrssdw;
        this.defaultForm.jlrgw = res.data.jlrgw;
        this.Form.rkls = lsList;
        this.Form.kcmc = res.data.kcmc;
        this.Form.bh = res.data.kcbh;
        this.Form.sksj = res.data.kcsksj;
        this.Form.skjs = res.data.jxdd;
        this.Form.tkqk = res.data.tkqk;
      });
    },
    confirm() {
      this.listFlag = true; //代表是列表数据
      this.dialogFormVisible = false;
      this.tjlx = "0";
      //处理数据时间
      var tar = this.multipleSelection.sksj;
      this.Form.xq = tar;
      var list = tar.split(";");
      var xingqi = [];
      var jieKs = [];
      var week = [];
      for (var i = 0; i < list.length; i++) {
        xingqi.push(list[i].slice(0, 3));
        week.push(
          list[i].slice(list[i].indexOf("{") + 1, list[i].indexOf("}"))
        );
        jieKs.push(
          list[i].slice(list[i].indexOf("第"), list[i].indexOf("节") + 1)
        );
      }
      let result = xingqi.map((v, i) => ({
        xingqi: xingqi[i],
        jieKs: jieKs[i],
        week: week[i],
      }));
      //处理数据老师信息
      var jsList = this.multipleSelection.jsxxList;
      var a = [];
      jsList.map((item, i) => {
        a.push(item.slice(0, item.indexOf("/", 13)));
      });
      var lsList = a.map((v, i) => ({
        xm: a[i].slice(a[i].indexOf("/") + 1),
        xh: a[i].slice(0, a[i].indexOf("/")),
        value: a[i],
      }));
      this.Form.skjs = this.multipleSelection.jxdd;
      this.Form.kksj = result;
      this.Form.kcmc = this.multipleSelection.kcmc;
      this.Form.bh = this.multipleSelection.kch;
      this.Form.rkls = lsList;
    },
    edit() {
      this.state = 1;
    },
    quxiao() {
      this.state = 0;
    },
    cancelModal() {
      this.dialogFormVisible = false;
    },
    FdyKcxxPageList() {
      FdyKcxxPageList(this.queryParams).then((res) => {
        this.tableDate = res.data;
        this.queryParams.total = res.totalCount;
      });
    },

    getYears() {
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOptions = response.data.rows;
        }
      });
    },
    classQuery() {
      this.dialogFormVisible = true;
      this.FdyKcxxPageList();
    },
    change(file, fileList) {
      //用于文件先保存
      const ind = file.name.lastIndexOf(".");
      const ext = file.name.substr(ind + 1);
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        ["jpe", "jpeg", "jpg", "png"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("图片大小不超过2M,上传失败");
      } else if (
        Number(file.size / 1024 / 1024) > 10 &&
        ["zip", "pdf", "word", "ppt"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("常见文件格式大小不超过10M,上传失败");
      } else if (
        Number(file.size / 1024 / 1024) > 50 &&
        ["mp3", "mp4", "mpe", "mpeg", "mpg"].indexOf(ext) != -1
      ) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("视频大小不超过50M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 50) {
        let uid = file.uid;
        let idx = fileList.findIndex((item) => item.uid === uid);
        fileList.splice(idx, 1);
        this.$message.error("文件大小不超过50M,上传失败");
      } else {
        this.fileListAdd.push(file);
      }
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      //用于文件删除
      let uid = file.uid;
      let idx = this.fileListAdd.findIndex((item) => item.uid === uid);
      this.fileListAdd.splice(idx, 1);
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var XmXgh = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(XmXgh).then((res) => {
          result = res.data;
          resultNew = result.map((ele) => {
            return {
              value: `${ele.xm}/${ele.gh}`,
              xh: ele.gh.trim(),
              xm: ele.xm.trim(),
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            this.$message.error("请输入正确模糊值");
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    handleSelect(item) {
      this.Form.rkls[0] = item;
    },
    saveListen() {
      var list = [];
      var list2 = [];
      for (var i = 0; i < this.Form.rkls.length; i++) {
        list.push(this.Form.rkls[i].xm);
        list2.push(this.Form.rkls[i].xh);
      }
      var xmAlone = this.Form.rkls[0].xm;
      var ghAlone = this.Form.rkls[0].xh;
      var kksj = this.Form.kksj[0];
      var ksshijian =
        this.tjlx == "0"
          ? this.Form.xq
          : `${kksj.xingqi}第${kksj.jieKs}-${kksj.jieJs}节${kksj.week}`;
      let formData = new FormData();
      formData.append("id", this.lgnSn.toString());
      formData.append("tjlx", this.tjlx);
      formData.append("tkqk", this.Form.tkqk);
      formData.append("jxdd", this.Form.skjs);
      formData.append("kcbh", this.Form.bh);
      formData.append("kckksj", ksshijian); //开始时间
      formData.append(
        "rkls",
        this.tjlx == "0" ? list : this.tjlx == "0" ? list : this.Form.rkls[0].xm
      ); //老师工号
      formData.append(
        "rklsgh",
        this.tjlx == "0" ? list2 : this.Form.rkls[0].xh
      ); //老师姓名
      formData.append("kcmc", this.Form.kcmc);
      formData.append("kcsksj", this.Form.sksj);
      if (this.fileListAdd.length > 0) {
        this.fileListAdd.map((file) => {
          formData.append("files", file.raw);
        });
      }
      updateListen(formData).then((res) => {
        if (res.errcode == "00") {
          this.$message.success("保存成功");
          this.$router.push({
            path: "/assistantWork/listen",
          });
        } else {
          this.$message.error("保存失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addRole {
  .titleTop {
    font-weight: 600;
    font-size: 20px;
    color: #1f1f1f;
    line-height: 28px;
  }
  .block {
    display: flex;
  }
  .thr {
    color: #606266;
    margin-top: 30px;
    margin-left: 16px;
    margin-right: 20px;
    font-size: 15px;
    font-weight: 900;
  }
  .el-tag {
    background: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    margin-left: 18px;
    font-size: 12px;
    color: black;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    ::v-deep .el-tag__close {
      color: #303133;
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
  .roleWrap {
    background: #fff;
    margin-top: 20px;

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
        margin-right: 20px;
        font-weight: 600;
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
      background: url("~@/assets/images/detelIcon.png") no-repeat center;
    }
  }
  .wai-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .p2 {
    height: 40px;
    line-height: normal;
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
    background: #fff;
  }
  .permissions1 {
    margin-top: 10px;
    flex-direction: row;
    background: #fff;
    padding: 20px;
    height: 100%;
    // height: calc(100vh - 230px);
    .title {
      font-weight: 600;
      font-size: 20px;
      color: #1f1f1f;
      line-height: 28px;
    }
  }
  .suibian {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #1f1f1f;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 90%;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .headTop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .headRight {
      display: flex;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
      }
    }

    .headLeft {
      display: flex;
      align-items: center;
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
        background: url("~@/assets/images/no.png") no-repeat center;
      }
      .yesIcon {
        background: url("~@/assets/images/yesW.png") no-repeat center;
      }
    }
    .cancel {
      color: #005657;
    }

    .confirm {
      background: #005657;
      color: #fff;
    }
  }
}
</style>
