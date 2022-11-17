<template>
  <div class="addHomeSchool">
    <div class="permissions">
      <div>
        <span class="title">家访人员</span>
      </div>
      <el-form ref="formTop" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="工号" prop="applyGh">
              <el-input
                v-model="formTop.applyGh"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="申报人" prop="applyXm">
              <el-input
                v-model="formTop.applyXm"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="单位" prop="dwh">
              <el-input
                v-model="formTop.dwh"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="岗位" prop="job">
              <el-input
                v-model="formTop.job"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="类型" prop="lxm">
              <el-input
                v-model="formTop.lxm"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="参与人">
          <el-row :gutters="20" class="suibian">
            <div v-for="(ele, index) in partDate">
              <div v-if="edit == 1">
                <el-input
                  :disabled="edit == 2 ? false : true"
                  v-model="ele.value"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <div v-for="(ele, index) in partDate" :key="index">
              <div v-if="edit == 2" style="display: flex">
                <el-autocomplete
                  v-model="partDate[index].value"
                  :fetch-suggestions="querySearchPart"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="
                    (item) => {
                      handleSelectPart(item, index);
                    }
                  "
                  size="small"
                ></el-autocomplete>
                <div
                  v-if="index == partDate.length - 1 && edit == 2"
                  class="editBtn"
                  @click="addPart(ele, index)"
                >
                  <i class="addIcon"></i>
                </div>
                <div
                  v-if="index < partDate.length - 1 && edit == 2"
                  class="deleIcon"
                  @click="delPart(ele, index)"
                >
                  <i></i>
                </div>
                <div></div>
              </div>
            </div>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="permissions">
      <div>
        <span class="title">家访详情</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="学生姓名">
          <el-row :gutters="20" class="suibian">
            <div v-for="(ele, index) in stuDate">
              <div v-if="edit == 1">
                <el-input
                  :disabled="edit == 2 ? false : true"
                  v-model="ele.value"
                  placeholder="请输入内容"
                ></el-input>
              </div>
            </div>
            <div v-for="(ele, index) in stuDate" :key="index">
              <div v-if="edit == 2" style="display: flex">
                <el-autocomplete
                  v-model="stuDate[index].value"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="
                    (item) => {
                      handleSelect(item, index);
                    }
                  "
                  size="small"
                ></el-autocomplete>
                <div
                  v-if="index == stuDate.length - 1 && edit == 2"
                  class="editBtn"
                  @click="addStu(ele, index)"
                >
                  <i class="addIcon"></i>
                </div>
                <div
                  v-if="index < stuDate.length - 1 && edit == 2"
                  class="deleIcon"
                  @click="delStu(ele, index)"
                >
                  <i></i>
                </div>
                <div></div>
              </div>
            </div>
          </el-row>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="家访主题" prop="theme">
              <el-input
                v-model="form.theme"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" v-if="edit == 2">
            <el-form-item label="常用主题" label-width="90px"></el-form-item>
          </el-col>
          <el-col :span="15" v-if="edit == 2">
            <el-tag
              v-for="item in tag.themeTags"
              :key="item.cyMsg"
              @click="pushData(item)"
              @close="handleClose(item)"
              closable
            >
              {{ item.cyMsg }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="form.inputVisible"
              v-model="form.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="$event.target.blur"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              icon="el-icon-plus"
              style="margin-left: 15px"
              @click="showInput"
              >新增主题</el-button
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="走访日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                :disabled="edit == '1' ? true : false"
                v-model="form.date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="家访形式" prop="homeModel">
              <el-select
                v-model="form.homeModel"
                @change="changeModel"
                placeholder="请选择"
                :disabled="edit == '1' ? true : false"
              >
                <el-option
                  v-for="item in modelOps"
                  :key="item.xm"
                  :label="item.xm"
                  :value="item.xm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="家访地点">
              <el-select
                v-model="form.proPlace"
                @change="changeX"
                placeholder="省"
                :disabled="
                  (edit == '1' ? true : false) ||
                  (xianshang == '1' ? true : false)
                "
              >
                <el-option
                  v-for="(item, index) in proOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
              <el-select
                v-model="form.cityPlace"
                @change="changeY"
                placeholder="市"
                :disabled="
                  (edit == '1' ? true : false) ||
                  (xianshang == '1' ? true : false)
                "
              >
                <el-option
                  v-for="(item, index) in cityOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
              <el-select
                v-model="form.countryPlace"
                placeholder="县"
                :disabled="
                  (edit == '1' ? true : false) ||
                  (xianshang == '1' ? true : false)
                "
              >
                <el-option
                  v-for="(item, index) in xianOps"
                  :key="index"
                  :label="item.mc"
                  :value="item.dm"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="详细地址" prop="detailPlace">
              <el-input
                v-model="form.detailPlace"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="走访情况" prop="state">
              <el-input
                v-model="form.state"
                maxlength="2000"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入"
                :disabled="edit == '1' ? true : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加附件" v-if="edit == '1'">
          <div v-if="videoSrc" class="block">
            <video
              :src="videoSrc"
              controls="controls"
              :custom-cache="false"
              style="margin-left: 20px; width: 300px; height: 300px"
            ></video>
          </div>
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
            :disabled="edit == '1' ? true : false"
          >
          </el-upload>
        </el-form-item>
        <el-form-item label="添加附件" v-if="edit == '2'">
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
            :disabled="edit == '1' ? true : false"
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
      <div class="headLeft">
        <button
          class="span1"
          v-if="
            edit == 1 &&
            (this.formTop.applyGh == this.$store.getters.userId ||
              this.$store.getters.roleId == '01')
          "
          @click="editClick()"
        >
          编辑
        </button>
        <button class="span1" v-if="edit == 2" @click="cancel()">取消</button>
        <button class="span2" v-if="edit == 2" @click="sava">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryTreeList,
  queryTreeListJ,
  savaTreeList,
  savaEditList,
} from "@/api/systemMan/role";
import {
  selectJxlxDetail,
  getCityList,
  updateJxlxDetail,
  queryStuList,
  getXmXgh,
} from "@/api/assistantWork/homeSchool";
import { Exportwj, querywj, delwj } from "@/api/assistantWork/classEvent";
import { queryTag, addTag, delTag } from "@/api/assistantWork/talk";
export default {
  data() {
    return {
      videoSrc: "",
      urlArr: [],
      fileList: [],
      fileListAdd: [],
      xianshang: 0,
      edit: 1,
      stuDate: [],
      partDate: [],
      modelOps: [
        { dm: "1", xm: "线上视频" },
        { dm: "2", xm: "线下走访" },
      ],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      isEdit: "",
      savaData: [], //新增提交所需要的menuList
      roleId1: "", ////编辑请求的id,
      arr: [],
      arr1: ["01"],
      tag: {
        themeTags: [],
      },
      formTop: {
        applyGh: "",
        applyXm: "",
        dwh: "",
        job: "",
        jfdd: "", //家访地点名称，暂定
      },
      form: {
        theme: "", //家访主题
        date: "",
        homeModel: "",
        proPlace: "", //省
        cityPlace: "",
        countryPlace: "",
        detailPlace: "",
        state: "",

        inputVisible: false,
        inputValue: "",
      },
      //地区筛选框数据
      proOps: [], //省
      cityOps: [],
      xianOps: [],
    };
  },

  mounted() {
    this.id = this.$route.query.id;
    this.queryTag();
    this.getDetail();
    this.getProOps();
    this.querywj();
  },

  methods: {
    change(file, fileList) {
      const index1 = file.name.lastIndexOf(".");
      const ext = file.name.substr(index1 + 1);
      //获取后缀 判断文件格式
      // 图片 2M  文件10M  视频50M
      if (
        Number(file.size / 1024 / 1024) > 2 &&
        (ext == "jpg" || ext == "png" || ext == "png")
      ) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        this.$message.error("图片超过2M,上传失败");
      } else if (Number(file.size / 1024 / 1024) > 10) {
        let uid = file.uid; // 关键作用代码，去除文件列表失败文件
        let idx = fileList.findIndex((item) => item.uid === uid); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）
        fileList.splice(idx, 1);
        this.fileList = fileList;
        this.$message.error("文件超过10M,上传失败");
      } else {
        //用于文件先保存
        this.fileListAdd.push(file);
        this.fileList = fileList;
      }
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
      querywj({ businesId: this.id }).then((res) => {
        this.fileList = res.data;
        var videoArr = [];
        this.fileList.map((ele) => {
          if (ele.fileSuffix == ".png" || ele.fileSuffix == ".jpg") {
            if (this.urlArr.length < 3) {
              this.urlArr.push(`${window.location.origin}/sfile/${ele.proId}`);
            }
          } else if (ele.fileSuffix == ".mp4" || ele.fileSuffix == ".MPEG") {
            videoArr.push(`${window.location.origin}/sfile/${ele.proId}`);
            // videoArr.push(`http://172.30.129.27/sfile/${ele.proId}`);
          }
        });
        this.videoSrc = videoArr.length > 0 ? videoArr[0] : "";
        this.fileList = this.fileList.map((ele) => {
          return {
            name: ele.fileName,
            ...ele,
          };
        });
      });
    },
    //标签查询
    queryTag() {
      var data = {
        cyType: "4", //1家校主题,2地点,3组织单位，4班团主题
        userId: this.$store.getters.userId,
      };
      queryTag(data).then((res) => {
        this.$set(this.tag, "themeTags", res.data);
      });
    },
    cancel() {
      this.edit = 1;
      this.getDetail();
    },
    showInput() {
      if (this.tag.themeTags.length > 8) {
        this.$message.error("最多九条");
      } else {
        this.form.inputVisible = true;
      }
    },
    handleInputConfirm() {
      var obj = {
        cyMsg: "",
        cyType: "4",
        userId: this.$store.getters.userId,
      };
      obj.cyMsg = this.form.inputValue;
      if (this.form.inputValue.length > 15) {
        this.$message.error("常用主题标签输入值应不超过十五个字符");
      } else {
        addTag(obj).then((res) => {
          this.queryTag();
        });
        this.form.inputVisible = false;
        this.form.inputValue = "";
      }
    },
    //关闭标签
    handleClose(item) {
      var param = { id: "" };
      param.id = item.id;
      delTag(param).then((_) => this.queryTag());
    },
    //选中标签
    pushData(item) {
      if (this.form.theme == "") {
        this.form.theme = this.form.theme + item.cyMsg;
      } else {
        if (this.form.theme.length < 30) {
          this.form.theme = this.form.theme + "," + item.cyMsg;
        } else {
          this.$message.error("常用主题总长度不应该超过三十个字符长度");
        }
      }
    },
    editClick() {
      this.edit = 2;
      if (this.form.homeModel == "线上视频") {
        this.xianshang = 1;
        // this.form.proPlace = " ";
        // this.form.cityPlace = " "; // 市
        // this.form.countryPlace = " ";
      } else {
        this.xianshang = 0;
      }
    },
    cancel() {
      this.edit = 1;
      //然后
    },
    //学生
    querySearch(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        queryStuList(Xm).then((res) => {
          // console.log("res",res.data);
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    addStu(ele, index) {
      // if (this.stuDate.length > 5) {
      //   this.$message.error("最多六条数据");
      // } else {
      //   this.stuDate.push({});
      // }
      this.stuDate.push({});
    },
    delStu(ele, index) {
      this.stuDate.splice(index, 1);
    },
    handleSelect(item, index) {
      this.stuDate[index] = item;
    },
    //共同参与人
    querySearchPart(queryString, cb) {
      if (queryString != "") {
        let callBackArr = [];
        var Xm = { xm: queryString };
        var result = [];
        var resultNew = [];
        getXmXgh(Xm).then((res) => {
          // console.log("res",res.data);
          result = res.data.length > 0 ? res.data : [];
          resultNew = result.map((ele) => {
            //注意此处必须要value的对象名，不然resolve的值无法显示，即使接口有数据返回，也无法展示
            //所以前端自己更换字段名，也可以找后台换,前端写有点浪费时间
            //此处找后台约定好
            return {
              value: `${ele.xm}(${ele.gh})`,
              gh: ele.gh,
              xm: ele.xm,
            };
          });
          resultNew.forEach((item) => {
            if (item.value.indexOf(queryString) > -1) {
              callBackArr.push(item);
            }
          });
          if (callBackArr.length == 0) {
            cb([{ value: "暂无数据", price: "暂无数据" }]);
          } else {
            cb(callBackArr);
          }
        });
      }
    },
    addPart(ele, index) {
      // if (this.partDate.length > 5) {
      //   this.$message.error("最多六条数据");
      // } else {
      //   this.partDate.push({});
      // }
      this.partDate.push({});
    },
    delPart(ele, index) {
      this.partDate.splice(index, 1);
    },
    handleSelectPart(item, index) {
      this.partDate[index] = item;
    },
    //详情
    getDetail() {
      let data = { id: this.id };
      selectJxlxDetail(data)
        .then((res) => {
          this.formTop.applyGh = res.data.sbrgh;
          this.formTop.applyXm = res.data.sbrxm;
          this.formTop.dwh = res.data.sbrdw;
          this.formTop.job = res.data.sbrgw;
          this.formTop.lxm = res.data.sbrlb;

          this.form.theme = res.data.jfzt;
          this.form.date = res.data.jfsj;
          this.form.homeModel = res.data.jfxs;
          this.form.proPlace =
            res.data.jfddList.length > 0 ? res.data.jfddList[0].dm : [];
          this.form.cityPlace =
            res.data.jfddList.length > 0 ? res.data.jfddList[1].dm : [];
          this.form.countryPlace =
            res.data.jfddList.length > 0 ? res.data.jfddList[2].dm : [];

          this.form.detailPlace = res.data.xxdz;
          this.form.state = res.data.jfqk;
          this.stuDate = res.data.xsXmXgh;
          this.partDate = res.data.gtcyrXmXgh;

          for (var i = 0; i < this.stuDate.length; i++) {
            if (this.stuDate[i].xm !== "") {
              //此处找后台约定好
              this.$set(
                this.stuDate[i],
                "value",
                `${this.stuDate[i].xm}(${this.stuDate[i].gh})`
              );
              this.$set(this.stuDate[i], "xm", `${this.stuDate[i].xm}`);
              this.$set(this.stuDate[i], "gh", `${this.stuDate[i].gh}`);
            } else {
              this.stuDate[i].value = "";
            }
          }
          for (var i = 0; i < this.partDate.length; i++) {
            if (this.partDate[i].xm !== "") {
              //此处找后台约定好
              this.$set(
                this.partDate[i],
                "value",
                `${this.partDate[i].xm}(${this.partDate[i].gh})`
              );
              this.$set(this.partDate[i], "xm", `${this.partDate[i].xm}`);
              this.$set(this.partDate[i], "gh", `${this.partDate[i].gh}`);
            } else {
              this.partDate[i].value = "";
            }
          }
          if (this.form.homeModel == "线下走访") {
            this.getCity(this.form.proPlace);
            this.getXian(this.form.cityPlace);
          }
        })
        .catch((err) => {
          // this.$message.error(err.errmsg);
        });
    },
    //改变家访形式
    changeModel(val) {
      if (val == "线上视频") {
        this.xianshang = 1;
        this.form.proPlace = " ";
        this.form.cityPlace = " "; // 市
        this.form.countryPlace = " ";
      } else {
        this.xianshang = 0;
      }
    },
    //获取省列表
    getProOps() {
      getCityList({}).then((res) => {
        this.proOps = res.data;
      });
    },
    // 省找市
    getCity(val) {
      this.cityOps = [];
      let data = { dm: val };
      if (Object.keys(val).length !== 0) {
        getCityList(data)
          .then((res) => {
            this.cityOps = res.data;
          })
          .catch((err) => {});
      }
    },
    // 市找县
    getXian(val) {
      this.xianOps = [];
      let data = { dm: val };
      if (Object.keys(val).length !== 0) {
        getCityList(data)
          .then((res) => {
            this.xianOps = res.data;
          })
          .catch((err) => {});
      }
    },
    changeX(val) {
      if (val) {
        this.form.cityPlace = ""; // 市
        this.form.countryPlace = "";
      }
      this.getCity(val);
    },
    changeY(val) {
      if (val) {
        this.form.countryPlace = ""; //县
      }
      this.getXian(val);
    },
    // 表单校验
    checkForm() {
      // 1.校验必填项
      let validForm = false;
      this.$refs.queryForm3.validate((valid) => {
        validForm = valid;
      });
      if (!validForm) {
        return false;
      }
      return true;
    },

    //保存
    sava() {
      ////参与人重复校验
      var flag = false;
      if (this.partDate !== null && this.partDate.length > 1) {
        for (var i = 0; i < this.partDate.length; i++) {
          for (var j = i + 1; j < this.partDate.length; j++) {
            if (
              this.partDate[i].value === this.partDate[j].value &&
              !!this.partDate[i].value &&
              !!this.partDate[j].value
            ) {
              flag = true;
            }
          }
        }
      } else {
        flag = false;
      }

      //学生重复校验
      var flagB = false;
      if (this.stuDate.length > 1) {
        for (var i = 0; i < this.stuDate.length; i++) {
          for (var j = i + 1; j < this.stuDate.length; j++) {
            if (
              this.stuDate[i].value === this.stuDate[j].value &&
              !!this.stuDate[i].value &&
              !!this.stuDate[j].value
            ) {
              flagB = true;
            }
          }
        }
      } else {
        flagB = false;
      }

      if (flag) {
        this.$message.error("存在相同参与人，请重新选择！");
      } else if (flagB) {
        this.$message.error("存在相同学生，请重新选择！");
      } else if (
        this.partDate !== null &&
        this.partDate.some((val) => val.gh == undefined) &&
        this.partDate[0].gh !== ""
      ) {
        this.$message.error("所添加参与人存在空值！");
      } else if (
        this.stuDate.some((val) => val.gh == undefined) ||
        this.stuDate.some((val) => val.gh == "")
      ) {
        this.$message.error("所添加学生存在空值！");
      } else if (this.stuDate[0].gh == "") {
        this.$message.error("未选择学生！");
      } else if (this.form.theme == "") {
        this.$message.error("家访主题不能为空!");
      } else if (this.form.date == "") {
        this.$message.error("走访日期不能为空!");
      } else if (this.form.homeModel == "") {
        this.$message.error("家访形式不能为空!");
      } else if (
        this.form.homeModel == "线下走访" &&
        this.form.countryPlace == ""
      ) {
        this.$message.error("家访地点不能为空!");
      } else if (
        this.form.homeModel == "线下走访" &&
        this.form.detailPlace == ""
      ) {
        this.$message.error("详细地址不能为空!");
      } else if (this.form.state == "") {
        this.$message.error("走访情况不能为空!");
      } else {
        let formData = new FormData();
        formData.append("id", this.$route.query.id.toString());
        formData.append("jfdd", this.form.countryPlace);
        //this.form.countryPlace
        formData.append("jfqk", this.form.state);
        formData.append("jfsj", this.form.date);
        formData.append("jfxs", this.form.homeModel);
        formData.append("jfzt", this.form.theme);
        formData.append("xxdz", this.form.detailPlace);
        for (let i = 0, len = this.stuDate.length; i < len; i++) {
          let locationInfo = this.stuDate[i];
          formData.append("xsXmXgh[" + i + "].xm", locationInfo.xm);
          formData.append("xsXmXgh[" + i + "].gh", locationInfo.gh);
        }
        if (this.partDate !== null) {
          for (let j = 0, leng = this.partDate.length; j < leng; j++) {
            let locationInfo = this.partDate[j];
            formData.append("gtcyrXmXgh[" + j + "].xm", locationInfo.xm);
            formData.append("gtcyrXmXgh[" + j + "].gh", locationInfo.gh);
          }
        }
        this.fileListAdd.map((ele) => {
          formData.append("files", ele.raw);
        });
        updateJxlxDetail(formData)
          .then((res) => {
            this.$message({
              message: res.errmsg,
              type: "success",
            });
            window.history.go(-1);
          })
          .catch((err) => {
            // this.$message.error(err.errmsg);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addHomeSchool {
  .block {
    display: flex;
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
