<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div class="titlename">
          <div v-for="(item, index) in dtailsList" :key="index">
            <div
              class="list"
              :class="index == current ? 'active' : ''"
              @click="handleList(index, 'tag')"
            >
              <div>{{ item }}</div>
              <i :class="index == current ? 'el-icon-arrow-right' : ''" />
            </div>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">
            信息修改字段设置
            <el-button class="saveButton" type="primary" @click="onSubmit"
              >保存</el-button
            >
          </p>
        </div>

        <!-- 基本信息 -->
        <div class="headline" id="tag_0">
          <div>基本信息</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.jbxxzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_zgjbxx, 1);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.jbxxbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_zgjbxx, 1);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_zgjbxx"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <!--- 0 必填 1可写 2可读--->
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 工作简历 -->
        <div class="headline" id="tag_1">
          <div>工作简历</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.gzjlzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_gzjl, 2);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.gzjlbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_gzjl, 2);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_gzjl"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 学历学位信息 -->
        <div class="headline" id="tag_2">
          <div>学历学位信息</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.xlxwzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_xlxw, 3);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.xlxwbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_xlxw, 3);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_xlxw"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 专业技术职务 -->
        <div class="headline" id="tag_3">
          <div>专业技术职务</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.zyjszwzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_zyjszw, 4);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.zyjszwbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_zyjszw, 4);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_zyjszw"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 学习培训 -->
        <div class="headline" id="tag_4">
          <div>学习培训</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.xxpxzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_xxpx, 5);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.xxpxbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_xxpx, 5);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_xxpx"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 年度考核 -->
        <div class="headline" id="tag_5">
          <div>年度考核</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.ndkhzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_ndkh, 6);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.ndkhbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_ndkh, 6);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_ndkh"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 奖励表彰信息 -->
        <div class="headline" id="tag_6">
          <div>奖励表彰信息</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.jlbzzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_jlbz, 7);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.jlbzbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_jlbz, 7);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_jlbz"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 科研情况（项目） -->
        <div class="headline" id="tag_7">
          <div>科研情况（项目）</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.xmkyqkzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_xmkyqk, 8);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.xmkyqkbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_xmkyqk, 8);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_xmkyqk"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 科研情况（论文） -->
        <div class="headline" id="tag_8">
          <div>科研情况（论文）</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.lwkyqkzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_lwkyqk, 9);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.lwkyqkbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_lwkyqk, 9);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_lwkyqk"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 科研情况（著作） -->
        <div class="headline" id="tag_9">
          <div>科研情况（著作）</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.zzkyqkzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_zzkyqk, 10);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.zzkyqkbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_zzkyqk, 10);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_zzkyqk"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 科研情况（著作） -->
        <div class="headline" id="tag_10">
          <div>科研情况（教学情况）</div>
          <div class="boxSelect">
            <el-checkbox
              v-model="basicCheckBox.jxkyqkzd"
              @change="
                (val) => {
                  xsjbxxReader(val, 1, columns.zg_jxkyqk, 11);
                }
              "
              >全部只读</el-checkbox
            >
            <el-checkbox
              v-model="basicCheckBox.jxkyqkbt"
              @change="
                (val) => {
                  xsjbxxReader(val, 2, columns.zg_jxkyqk, 11);
                }
              "
              >全部必填</el-checkbox
            >
          </div>
        </div>
        <div class="information">
          <el-row :gutter="20">
            <el-col
              :span="8"
              class="rowStyle"
              v-for="item in columns.zg_jxkyqk"
              :key="item.id"
            >
              <div class="wrap">
                <div class="title">{{ item.dicCloumnChinese }}</div>
                <div class="content">
                  <el-radio v-model="item.stuColumnAuth" label="2"
                    >只读</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="0"
                    >必填</el-radio
                  >
                  <el-radio v-model="item.stuColumnAuth" label="1"
                    >可写</el-radio
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loadStaffColumns,
  updateStuColumns,
} from "@/api/politicalWork/basicInfo";
export default {
  name: "DetailInfo",

  data() {
    return {
      dtailsList: [
        "基本信息",
        "工作简历",
        "学历学位信息",
        "专业技术职务",
        "学习培训",
        "年度考核",
        "奖励表彰信息",
        "科研情况（项目）",
        "科研情况（论文）",
        "科研情况（著作）",
        "科研情况（教学情况）",
      ],
      current: 0,
      basicCheckBox: {}, // 选中
      columns: {}, // 数据
    };
  },
  created() {},
  mounted() {
    this.getloadStaffColumns();
  },

  methods: {
    getloadStaffColumns() {
      loadStaffColumns()
        .then((res) => {
          let data = res.data;
          let columns = {
            zg_zgjbxx: [], // 政工基本信息
            zg_gzjl: [], // 政工工作简历
            zg_xlxw: [], // 政工学历学位
            zg_zyjszw: [], // 政工专业技术职务
            zg_xxpx: [], // 学习培训表
            zg_ndkh: [], // 政工年度考核
            zg_jlbz: [], // 政工奖励表彰信息表
            zg_xmkyqk: [], // 项目科研情况表
            zg_lwkyqk: [], // 论文科研情况表
            zg_zzkyqk: [], // 著作科研情况表
            zg_jxkyqk: [], // 教学科研情况表
          };
          for (let x = 0; x < data.length; x++) {
            if (data[x].dicEnglish == "zg_zgjbxx") {
              columns.zg_zgjbxx.push(data[x]);
            } else if (data[x].dicEnglish == "zg_gzjl") {
              columns.zg_gzjl.push(data[x]);
            } else if (data[x].dicEnglish == "zg_xlxw") {
              columns.zg_xlxw.push(data[x]);
            } else if (data[x].dicEnglish == "zg_zyjszw") {
              columns.zg_zyjszw.push(data[x]);
            } else if (data[x].dicEnglish == "zg_xxpx") {
              columns.zg_xxpx.push(data[x]);
            } else if (data[x].dicEnglish == "zg_ndkh") {
              columns.zg_ndkh.push(data[x]);
            } else if (data[x].dicEnglish == "zg_jlbz") {
              columns.zg_jlbz.push(data[x]);
            } else if (data[x].dicEnglish == "zg_xmkyqk") {
              columns.zg_xmkyqk.push(data[x]);
            } else if (data[x].dicEnglish == "zg_lwkyqk") {
              columns.zg_lwkyqk.push(data[x]);
            } else if (data[x].dicEnglish == "zg_zzkyqk") {
              columns.zg_zzkyqk.push(data[x]);
            } else if (data[x].dicEnglish == "zg_jxkyqk") {
              columns.zg_jxkyqk.push(data[x]);
            }
          }
          this.columns = columns;
        })
        .catch((err) => {});
    },
    // 基本信息全部只读
    xsjbxxReader(val, index, data, xm) {
      // val 选中 ，index 0必填 1可写 2可读 ,data数据  xm那块数据
      let jbxxData = data;
      if (!val) {
        for (let x = 0; x < jbxxData.length; x++) {
          jbxxData[x].stuColumnAuth = "1";
        }
      }
      if (index == 1) {
        if (val) {
          for (let x = 0; x < jbxxData.length; x++) {
            jbxxData[x].stuColumnAuth = "2";
          }
        }
        switch (xm) {
          case 1:
            this.basicCheckBox.jbxxbt = false;
            break;
          case 2:
            this.basicCheckBox.gzjlbt = false;
            break;
          case 3:
            this.basicCheckBox.xlxwbt = false;
            break;
          case 4:
            this.basicCheckBox.zyjszwbt = false;
            break;
          case 5:
            this.basicCheckBox.xxpxbt = false;
            break;
          case 6:
            this.basicCheckBox.ndkhbt = false;
            break;
          case 7:
            this.basicCheckBox.jlbzbt = false;
            break;
          case 8:
            this.basicCheckBox.xmkyqkbt = false;
            break;
          case 9:
            this.basicCheckBox.lwkyqkbt = false;
            break;
          case 10:
            this.basicCheckBox.zzkyqkbt = false;
            break;
          case 11:
            this.basicCheckBox.jxkyqkbt = false;
            break;
        }
      } else {
        if (val) {
          for (let x = 0; x < jbxxData.length; x++) {
            jbxxData[x].stuColumnAuth = "0";
          }
        }
        switch (xm) {
          case 1:
            this.basicCheckBox.jbxxzd = false;
            break;
          case 2:
            this.basicCheckBox.gzjlzd = false;
            break;
          case 3:
            this.basicCheckBox.xlxwzd = false;
            break;
          case 4:
            this.basicCheckBox.zyjszwzd = false;
            break;
          case 5:
            this.basicCheckBox.xxpxzd = false;
            break;
          case 6:
            this.basicCheckBox.ndkhzd = false;
            break;
          case 7:
            this.basicCheckBox.jlbzzd = false;
            break;
          case 8:
            this.basicCheckBox.xmkyqkzd = false;
            break;
          case 9:
            this.basicCheckBox.lwkyqkzd = false;
            break;
          case 10:
            this.basicCheckBox.zzkyqkzd = false;
            break;
          case 11:
            this.basicCheckBox.jxkyqkzd = false;
            break;
        }
      }
    },
    onSubmit() {
      let newData = [];
      newData = newData.concat(
        this.columns.zg_zgjbxx,
        this.columns.zg_gzjl,
        this.columns.zg_xlxw,
        this.columns.zg_zyjszw,
        this.columns.zg_xxpx,
        this.columns.zg_ndkh,
        this.columns.zg_jlbz,
        this.columns.zg_xmkyqk,
        this.columns.zg_lwkyqk,
        this.columns.zg_zzkyqk,
        this.columns.zg_jxkyqk
      );
      updateStuColumns(newData)
        .then((res) => {
          if (res.errcode == "00") {
            this.$message({
              message: res.errmsg,
              type: "success",
            });
          }
        })
        .catch((err) => {});
    },
    handleList(index, tag) {
      this.current = index;
      var id = "#" + tag + "_" + index;
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px 0;
  box-sizing: border-box;
  .wrap {
    display: flex;
    flex-direction: row;
    // overflow: hidden;
    .detail_left {
      flex: 0 0 220px;
      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding: 20px;
      box-sizing: border-box;
      .titlename {
        position: fixed;
        .list {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #1f1f1f;
          cursor: pointer;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .active {
          background: #f0f0f0;
          border-radius: 2px;
        }
      }
    }
    .detail_right {
      flex: 1;
      background: #fff;
      .right_top {
        position: relative;
        border-bottom: 1px solid #d8d8d8;
        padding-top: 20px;
        .title {
          text-align: center;
          font-weight: 500;
          font-size: 24px;
          color: #005657;
          line-height: 24px;
        }
        .saveBtn {
          position: absolute;
          top: 0;
          right: 20px;
          width: 84px;
          line-height: 36px;
          text-align: center;
          background: #005657;
          border-radius: 2px;
          color: #fff;
          cursor: pointer;
        }
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/saveIcon.png");
          vertical-align: middle;
        }
      }
      .information {
        padding: 0 20px;
        margin-top: 15px;
        .rowStyle {
          padding: 0 !important;
          margin: 0;
          border-bottom: 1px solid #cccccc;
        }
        .wrap {
          display: flex;
          align-items: center;
          .title {
            flex: 0 0 180px;
            line-height: 48px;
            background: #e0e0e0;
            text-align: right;
            padding-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .content {
            font-weight: 400;
            font-size: 14px;
            color: #1f1f1f;
            line-height: 22px;
            margin-left: 16px;
            .el-radio {
              margin-right: 15px;
            }
          }
        }
      }
      .headline {
        margin-top: 20px;
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .boxSelect {
          padding-right: 20px;
        }
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
  }
  .saveButton {
    position: absolute;
    right: 16px;
  }
  .checkButtons {
    position: relative;
    left: 2015px;
    // // left: 87%;
    top: -25px;
    // position: absolute;
    // right:100px
  }
  .checkButton {
    border-color: #005657;
    color: #005657;
  }
}
// .detail{
//   padding:20px 0;
//   box-sizing: border-box;
//   .wrap{
//     display: flex;
//     flex-direction: row;
//     // overflow: hidden;
//     .detail_left{
//       flex:0 0 198px;
//       margin-right: 24px;
//       background: #fff;
//       // height: calc(100vh - 170px);
//       padding:20px;
//       box-sizing: border-box;
//       .list{
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;
//         height: 36px;
//         line-height: 36px;
//         font-size: 14px;
//         color: #1F1F1F;
//         cursor: pointer;
//         padding:0 10px;
//         box-sizing: border-box;
//       }
//       .item {
//         ::v-deep.el-badge__content.is-fixed{
//           top: 20px;
//           right: -16px;
//         }
//       }
//       .active{
//         background: #F0F0F0;
//         border-radius: 2px;
//       }
//     }
//     .detail_right{
//       flex:1;
//       background: #fff;
//       .right_top{
//         position: relative;
//         border-bottom: 1px solid #D8D8D8;
//         .title{
//           text-align: center;
//           font-weight: 500;
//           font-size: 24px;
//           color: #005657;
//           line-height: 24px
//         }
//         .saveBtn{
//           position: absolute;
//           top:0;
//           right: 20px;
//           width: 84px;
//           line-height: 36px;
//           text-align: center;
//           background: #005657;
//           border-radius: 2px;
//           color:#fff;
//           cursor: pointer;
//         }
//         .icon{
//           display: inline-block;
//           width:20px;
//           height: 20px;
//           background: url('~@/assets/images/saveIcon.png');
//           vertical-align: middle;
//         }
//       }
//       .information{
//           padding:0 20px;
//           margin-top: 15px;
//           .rowStyle{
//             padding:0 !important;
//             margin:0;
//             border-bottom:1px solid #cccccc;
//           }
//           .wrap{
//             display: flex;
//             align-items: center;
//             .title{
//               flex: 0 0 160px;
//               line-height: 48px;
//               background: #E0E0E0;
//               text-align: right;
//               padding-right: 5px;
//             }
//             .content{
//               font-weight: 400;
//               font-size: 14px;
//               color: #1F1F1F;
//               line-height: 22px;
//               margin-left: 16px;
//             }
//           }
//         }
//       .headline{
//         margin-top: 20px;
//         padding-left: 20px;
//         box-sizing: border-box;
//         font-weight: 600;
//         font-size: 20px;
//         color: #1F1F1F;
//         line-height: 28px;
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         .boxSelect{
//           padding-right: 20px;
//         }
//       }
//     }
//   }
// }
</style>
