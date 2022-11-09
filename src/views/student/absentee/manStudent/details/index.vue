<template>
  <div class="detail">
    <TopTitle v-if="roleType == 1"></TopTitle>
    <div :class="roleType == 1 ? 'wrap student' : 'wrap'">
      <div class="detail_left">
        <div class="titlename">
          <div v-for="(item, index) in dtailsList" :key="index">
            <div
              class="list"
              :class="index == current ? 'active' : ''"
              @click="handleList(index, 'tag')"
            >
              <div>{{ item }}</div>
              <i :class="index == current ? 'el-icon-arrow-right' : ''"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">学生信息</p>
          <div class="timeWrap">
            <span
              >创建时间：{{ formatDate(detailInfo.xsJbxx.createTime) }}
            </span>
            <span class="updataTime"
              >更新时间：{{ formatDate(detailInfo.xsJbxx.updateTime) }}</span
            >
          </div>
        </div>
        <div class="headline" id="tag_0">基本信息</div>
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img
                :src="
                  detailInfo.xsXszpb
                    ? 'data:image/png;base64,' + detailInfo.xsXszpb.bkzp
                    : ''
                "
                alt="报考照片"
              />
            </div>

            <div class="photo">
              <img
                :src="
                  detailInfo.xsXszpb
                    ? 'data:image/png;base64,' + detailInfo.xsXszpb.lqzp
                    : ''
                "
                alt="在校照片"
              />
            </div>

            <div class="photo" style="margin-top: 10px">
              <img
                :src="
                  detailInfo.xsXszpb
                    ? 'data:image/png;base64,' + detailInfo.xsXszpb.byzp
                    : ''
                "
                alt="毕业照片"
              />
            </div>
          </div>
          <div class="information" v-if="schooling == 1">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.xh"
                      :disabled="detailInfo.xsJbxx.xh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.xm"
                      :disabled="detailInfo.xsJbxx.xm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音姓</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.pyx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.pyx"
                      :disabled="detailInfo.xsJbxx.pyx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.pym }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.pym"
                      :disabled="detailInfo.xsJbxx.pym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.cym }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.cym"
                      :disabled="detailInfo.xsJbxx.cym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">英文姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.ywxm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.ywxm"
                      :disabled="detailInfo.xsJbxx.ywxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xbm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input v-model="detailInfo.xsJbxx.xbm" size="small" placeholder="请输入内容"></el-input> -->
                    <el-select
                      v-model="detailInfo.xsJbxx.xbm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.xbm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxbmOPs"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dwh_chinese }}
                    <!-- {{ getName(allDwh, detailInfo.xsXjxx.dwh) }} -->
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dwh"
                      size="small"
                      :disabled="detailInfo.xsXjxx.dwh_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allDwh"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.dwh_chinese"
                      :disabled="detailInfo.xsXjxx.dwh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.csrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.csrq"
                      :disabled="detailInfo.xsJbxx.csrq_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生地</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.csdm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-cascader
                      v-model="valueJlcsd"
                      :options="options"
                      @change="handleChangeCsd"
                      :disabled="detailInfo.xsJbxx.csdm_stuFlag == 2"
                      :props="locationProps"
                    ></el-cascader>
                    <!-- <el-select
                      v-model="detailInfo.xsJbxx.csdm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.csdm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in jgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.jg_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-cascader
                      v-model="valueJljg"
                      :options="options"
                      @change="handleChangeJg"
                      :props="locationProps"
                      :disabled="detailInfo.xsJbxx.jg_stuFlag == 2"
                    ></el-cascader>
                    <!-- <el-select
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
                      :disabled="detailInfo.xsJbxx.jg_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in jgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.mzm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.mzm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.mzm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmmzmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.gjdqm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.gjdqm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.mzm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in gjdqm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfzjlxm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.sfzjlxm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.sfzjlxm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfzjlxm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.sfzjlxm_chinese"
                      :disabled="detailInfo.xsJbxx.sfzjlxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfzjh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjh"
                      :disabled="detailInfo.xsJbxx.sfzjh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件有效期</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfzjyxq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjyxq"
                      :disabled="detailInfo.xsJbxx.sfzjyxq_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">楼栋</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsZsxx.ld }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsZsxx.ld"
                      :disabled="true"
                      size="small"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">房间号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsZsxx.fj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsZsxx.fj"
                      :disabled="true"
                      size="small"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学时间</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxny }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.rxny"
                      :disabled="detailInfo.xsXjxx.rxny_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.jsxyny }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.jsxyny"
                      :disabled="detailInfo.xsXjxx.jsxyny_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.nj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.nj"
                      :disabled="detailInfo.xsXjxx.nj_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.bjm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.bjm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.bjm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in bjOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.bjm_chinese"
                      :disabled="detailInfo.xsXjxx.bjm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.zydm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zydm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zydm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zyOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.zydm_chinese"
                      :disabled="detailInfo.xsXjxx.zydm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学制</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(xzOps, detailInfo.xsXjxx.xz) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xz"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xz_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xzOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">在册情况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.zcqk_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zcqk"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zcqk_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.zcqk_chinese"
                      :disabled="detailInfo.xsXjxx.zcqk_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfzx_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfzx"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfzx_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfzx_chinese"
                      :disabled="detailInfo.xsXjxx.sfzx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学籍状态</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(dmxjztmOps, detailInfo.xsXjxx.xjzt) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xjzt"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xjzt_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxjztmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生当前状态</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xsdqztm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xsdqztm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xsdqztm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxsdqztm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.xsdqztm_chinese"
                      :disabled="detailInfo.xsXjxx.xsdqztm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否毕业</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfby_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfby"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfby_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfby_chinese"
                      :disabled="detailInfo.xsXjxx.sfby_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.hyzkm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.hyzkm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.hyzkm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in dmhyzkm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.hyzkm_chinese"
                      :disabled="detailInfo.xsJbxx.hyzkm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">港澳台侨外</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.gatqwm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.gatqwm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.gatqwm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmgatqwm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.gatqwm_chinese"
                      :disabled="detailInfo.xsJbxx.gatqwm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(zzmmOps, detailInfo.xsJbxx.zzmmm) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input v-model="detailInfo.xsJbxx.zzmmm" size="small" placeholder="请输入内容"></el-input> -->
                    <el-select
                      v-model="detailInfo.xsJbxx.zzmmm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.zzmmm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zzmmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">健康状况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.jkztm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.jkztm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.jkztm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmjkzkm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.jkztm_chinese"
                      :disabled="detailInfo.xsJbxx.jkztm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">信仰宗教</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xyzjm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.xyzjm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.xyzjm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmzjxym"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.xyzjm_chinese"
                      :disabled="detailInfo.xsJbxx.xyzjm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">血型</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xxm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.xxm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.xxm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxxm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.xxm_chinese"
                      :disabled="detailInfo.xsJbxx.xxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否独生子女</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfdszn_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.sfdszn"
                      size="small"
                      :disabled="detailInfo.xsJbxx.sfdszn_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.sfdszn_chinese"
                      :disabled="detailInfo.xsJbxx.sfdszn_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身高</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.sg }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.sg"
                      :disabled="detailInfo.xsTxxx.sg_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">体重</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.tz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.tz"
                      :disabled="detailInfo.xsTxxx.tz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学校名称</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.yxxmc }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.yxxmc"
                      :disabled="detailInfo.xsJbxx.yxxmc_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.yxh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.yxh"
                      :disabled="detailInfo.xsJbxx.yxh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.rxfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.rxfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmrxfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.rxfsm_chinese"
                      :disabled="detailInfo.xsXjxx.rxfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.lydqm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.lydqm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.lydqm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in gjdqm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.lydqm_chinese"
                      :disabled="detailInfo.xsXjxx.lydqm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生来源</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xslym_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xslym"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xslym_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxslym"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.xslym_chinese"
                      :disabled="detailInfo.xsXjxx.xslym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.jdfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.jdfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.jdfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmjdfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.jdfsm_chinese"
                      :disabled="detailInfo.xsXjxx.jdfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学前学历</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxqxlm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.rxqxlm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.rxqxlm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxlm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.rxqxlm_chinese"
                      :disabled="detailInfo.xsXjxx.rxqxlm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学前学位</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxqxwm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.rxqxwm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.rxqxwm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxwm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.rxqxwm_chinese"
                      :disabled="detailInfo.xsXjxx.rxqxwm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获得学历方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.hdxlfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.hdxlfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.hdxlfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmhdxlfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.hdxlfsm_chinese"
                      :disabled="detailInfo.xsJbxx.hdxlfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfxfz_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfxfz"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfxfz_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfxfz_chinese"
                      :disabled="detailInfo.xsXjxx.sfxfz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否师范生</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfsfs_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfsfs"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfsfs_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfsfs_chinese"
                      :disabled="detailInfo.xsXjxx.sfsfs_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.pyfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.pyfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.pyfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmpyfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.pyfsm_chinese"
                      :disabled="detailInfo.xsXjxx.pyfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(pyccOps, detailInfo.xsXjxx.pyccm) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.pyccm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.pyccm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in pyccOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">连读方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.ldfsm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.ldfsm"
                      :disabled="detailInfo.xsXjxx.ldfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">定向或委培</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dxhwpdw }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.dxhwpdw"
                      :disabled="detailInfo.xsXjxx.dxhwpdw_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xslbm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xslbm"
                      :disabled="detailInfo.xsXjxx.dxhwpdw_stuFlag == 2"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xslbOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一外语语种</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dywyyz_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dywyyz"
                      :disabled="detailInfo.xsXjxx.dywyyz_stuFlag == 2"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmyzmcm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.dywyyz_chinese"
                      :disabled="detailInfo.xsJbxx.dywyyz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一外语水平</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dywysp_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dywysp"
                      :disabled="detailInfo.xsXjxx.dywysp_stuFlag == 2"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmlxsyzspm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.dywysp_chinese"
                      :disabled="detailInfo.xsJbxx.dywysp_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二外语语种</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dewyyz_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dewyyz"
                      :disabled="detailInfo.xsXjxx.dewyyz_stuFlag == 2"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmyzmcm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.dewyyz_chinese"
                      :disabled="detailInfo.xsXjxx.dewyyz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二外语水平</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dewysp_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dewysp"
                      :disabled="detailInfo.xsXjxx.dewysp_stuFlag == 2"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmlxsyzspm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.dewysp_chinese"
                      :disabled="detailInfo.xsXjxx.dewysp_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 研究生基本信息  XXXX_stuFlag 0必填，1可写，2可读-->
          <div class="information" v-if="schooling == 2">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.xh"
                      :disabled="detailInfo.xsJbxx.xh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.xm"
                      :disabled="detailInfo.xsJbxx.xm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音姓</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.pyx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.pyx"
                      :disabled="detailInfo.xsJbxx.pyx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.pym }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.pym"
                      :disabled="detailInfo.xsJbxx.pym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.cym }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.cym"
                      :disabled="detailInfo.xsJbxx.cym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">英文姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.ywxm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.ywxm"
                      :disabled="detailInfo.xsJbxx.ywxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.xbm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input v-model="detailInfo.xsJbxx.xbm" :disabled="detailInfo.xsJbxx.xbm_stuFlag == 2" size="small" placeholder="请输入内容"></el-input> -->
                    <el-select
                      v-model="detailInfo.xsJbxx.xbm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.xbm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxbmOPs"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dwh_chinese }}
                    <!-- {{ getName(allDwh, detailInfo.xsXjxx.dwh) }} -->
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.dwh"
                      size="small"
                      :disabled="detailInfo.xsXjxx.dwh_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allDwh"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.dwh_chinese"
                      :disabled="detailInfo.xsXjxx.dwh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.csrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.csrq"
                      :disabled="detailInfo.xsJbxx.csrq_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生地</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.csdm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-cascader
                      v-model="valueJlcsd"
                      :options="options"
                      @change="handleChangeCsd"
                      :disabled="detailInfo.xsJbxx.csdm_stuFlag == 2"
                      :props="locationProps"
                    ></el-cascader>
                    <!-- <el-select
                      v-model="detailInfo.xsJbxx.csdm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.csdm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in jgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select> -->
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.csdm_"
                      :disabled="detailInfo.xsJbxx.csdm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.jg_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-cascader
                      v-model="valueJljg"
                      :options="options"
                      @change="handleChangeJg"
                      :disabled="detailInfo.xsJbxx.jg_stuFlag == 2"
                      :props="locationProps"
                    ></el-cascader>
                    <!-- <el-select
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
                      :disabled="detailInfo.xsJbxx.jg_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in jgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select> -->
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.jg_chinese"
                      :disabled="detailInfo.xsJbxx.jg_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.mzm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input v-model="detailInfo.xsJbxx.mzm" :disabled="detailInfo.xsJbxx.mzm_stuFlag == 2" size="small" placeholder="请输入内容"></el-input> -->
                    <el-select
                      v-model="detailInfo.xsJbxx.mzm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.mzm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmmzmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.gjdqm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.gjdqm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.mzm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in gjdqm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfzjlxm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.sfzjlxm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.sfzjlxm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfzjlxm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <!-- <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjlxm_chinese"
                      :disabled="detailInfo.xsJbxx.sfzjlxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.sfzjh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjh"
                      :disabled="detailInfo.xsJbxx.sfzjh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.nj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.nj"
                      :disabled="detailInfo.xsXjxx.nj_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">楼栋</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsZsxx.ld }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsZsxx.ld"
                      :disabled="true"
                      size="small"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">房间号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsZsxx.fj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsZsxx.fj"
                      :disabled="true"
                      size="small"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学年月</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxny }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.rxny"
                      :disabled="detailInfo.xsXjxx.rxny_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">预计毕业时间</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.yjbysj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.yjbysj"
                      :disabled="detailInfo.xsXjxx.yjbysj_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">实际毕业时间</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sjbysj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.sjbysj"
                      :disabled="detailInfo.xsXjxx.sjbysj_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.jsxyny }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.jsxyny"
                      :disabled="detailInfo.xsXjxx.jsxyny_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.rxfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.rxfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.rxfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmrxfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.rxfsm_chinese"
                      :disabled="detailInfo.xsXjxx.rxfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学籍状态</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(dmxjztmOps, detailInfo.xsXjxx.xjzt) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xjzt"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xjzt_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxjztmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否毕业</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfby_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfby"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfby_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfby_chinese"
                      :disabled="detailInfo.xsXjxx.sfby_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfzx_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfzx"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfzx_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfzx_chinese"
                      :disabled="detailInfo.xsXjxx.sfzx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">港澳台侨外</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.gatqwm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.gatqwm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.gatqwm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmgatqwm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.gatqwm_chinese"
                      :disabled="detailInfo.xsJbxx.gatqwm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsJbxx.hyzkm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsJbxx.hyzkm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.hyzkm_stuFlag == 2"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in dmhyzkm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.hyzkm_chinese"
                      :disabled="detailInfo.xsJbxx.hyzkm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(zzmmOps, detailInfo.xsJbxx.zzmmm) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input v-model="detailInfo.xsJbxx.zzmmm" :disabled="detailInfo.xsJbxx.zzmmm_stuFlag == 2" size="small" placeholder="请输入内容"></el-input> -->
                    <el-select
                      v-model="detailInfo.xsJbxx.zzmmm"
                      size="small"
                      :disabled="detailInfo.xsJbxx.zzmmm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zzmmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.lydqm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.lydqm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.lydqm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in gjdqm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.lydqm_chinese"
                      :disabled="detailInfo.xsXjxx.lydqm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xxfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xxfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xxfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmxxfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.xxfsm_chinese"
                      :disabled="detailInfo.xsXjxx.xxfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.jdfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.jdfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.jdfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmjdfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.jdfsm_chinese"
                      :disabled="detailInfo.xsXjxx.jdfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.zydm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zydm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zydm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zyOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.zydm_chinese"
                      :disabled="detailInfo.xsXjxx.zydm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">研究方向</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.yjfx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.yjfx"
                      :disabled="detailInfo.xsXjxx.yjfx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dsxm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.dsxm"
                      :disabled="detailInfo.xsXjxx.dsxm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师类别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dslb }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.dslb"
                      :disabled="detailInfo.xsXjxx.dslb_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获得学历方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.hdxlfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.hdxlfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.hdxlfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmhdxlfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.hdxlfsm_chinese"
                      :disabled="detailInfo.xsXjxx.hdxlfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfxfz_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.sfxfz"
                      size="small"
                      :disabled="detailInfo.xsXjxx.sfxfz_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmsfbzm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfxfz_chinese"
                      :disabled="detailInfo.xsXjxx.sfxfz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(pyccOps, detailInfo.xsXjxx.pyccm) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.pyccm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.pyccm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in pyccOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.pyfsm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.pyfsm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.pyfsm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmpyfsm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.pyfsm_chinese"
                      :disabled="detailInfo.xsXjxx.pyfsm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养类别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.pylb }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.pylb"
                      :disabled="detailInfo.xsXjxx.pylb_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xslbm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.xslbm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.xslbm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xslbOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单双证</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dsz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.dsz"
                      :disabled="detailInfo.xsXjxx.dsz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">定向或委培单位</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.dxhwpdw }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.dxhwpdw"
                      :disabled="detailInfo.xsXjxx.dxhwpdw_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专项计划</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ getName(zxjhmOps, detailInfo.xsXjxx.zxjhm) }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zxjhm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zxjhm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zxjhmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" v-if="schooling == 2">学历学位信息</div>
        <div class="tableStyle" v-if="schooling == 2">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学历证书号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xlzsh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.xlzsh"
                      :disabled="detailInfo.xsXjxx.xlzsh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业证印制号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.byzyzh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.byzyzh"
                      :disabled="detailInfo.xsXjxx.byzyzh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获学位日期</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.hxwrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.hxwrq"
                      :disabled="detailInfo.xsXjxx.hxwrq_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位证书号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.xwzsh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsXjxx.xwzsh"
                      :disabled="detailInfo.xsXjxx.xwzsh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否专业学位</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.sfzyxw_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.sfzyxw"
                      :disabled="detailInfo.xsXjxx.sfzyxw_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                    <el-select
                      v-model="detailInfo.xsXjxx.sfzyxw"
                      size="small"
                      placeholder="请选择"
                      :disabled="detailInfo.xsXjxx.sfzyxw_stuFlag == 2"
                    >
                      <el-option
                        v-for="item in sfzyxwOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业学位类别</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.zyxwlbm_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zyxwlbm"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zyxwlbm_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmyjszyxwlbm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.zyxwlbm_chinese"
                      :disabled="detailInfo.xsXjxx.zyxwlbm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业学位领域</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsXjxx.zyxwlym_chinese }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfo.xsXjxx.zyxwlym"
                      size="small"
                      :disabled="detailInfo.xsXjxx.zyxwlym_stuFlag == 2"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dmyjszyxwlbm"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsXjxx.zyxwlym_chinese"
                      :disabled="detailInfo.xsXjxx.zyxwlym_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_1">联系方式</div>
        <div class="tableStyle" v-if="schooling == 1">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.yddh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.yddh"
                      :disabled="detailInfo.xsTxxx.yddh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.dzyx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.dzyx"
                      :disabled="detailInfo.xsTxxx.dzyx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ号码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.qqhm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.qqhm"
                      :disabled="detailInfo.xsTxxx.qqhm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.wxhm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.wxhm"
                      :disabled="detailInfo.xsTxxx.wxhm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">传真电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.czdh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.czdh"
                      :disabled="detailInfo.xsTxxx.czdh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮政编码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.yzbm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.yzbm"
                      :disabled="detailInfo.xsTxxx.yzbm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">通信地址</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.txdz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.txdz"
                      :disabled="detailInfo.xsTxxx.txdz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">网络地址</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.wldz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.wldz"
                      :disabled="detailInfo.xsTxxx.wldz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.jtdh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.jtdh"
                      :disabled="detailInfo.xsTxxx.jtdh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭邮编</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.jtyzbm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.jtyzbm"
                      :disabled="detailInfo.xsTxxx.jtyzbm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭住址</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.jtzz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.jtzz"
                      :disabled="detailInfo.xsTxxx.jtzz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭Email</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.jtdzxx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.jtdzxx"
                      :disabled="detailInfo.xsTxxx.jtdzxx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="tableStyle" v-if="schooling == 2">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.yddh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.yddh"
                      :disabled="detailInfo.xsTxxx.yddh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.dzyx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.dzyx"
                      :disabled="detailInfo.xsTxxx.dzyx_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ号码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.qqhm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.qqhm"
                      :disabled="detailInfo.xsTxxx.qqhm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.wxhm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.wxhm"
                      :disabled="detailInfo.xsTxxx.wxhm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.jtdh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.jtdh"
                      :disabled="detailInfo.xsTxxx.jtdh_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮政编码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.yzbm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.yzbm"
                      :disabled="detailInfo.xsTxxx.yzbm_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">通信地址</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfo.xsTxxx.txdz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.txdz"
                      :disabled="detailInfo.xsTxxx.txdz_stuFlag == 2"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_2">
          <div>家庭成员信息</div>
          <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable(1)">
            <i class="addIcon"></i> 添加家庭成员信息
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsJtcyxxList" style="width: 100%">
            <el-table-column prop="cyxm" label="姓名">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cyxm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.cyxm"
                    :disabled="scope.row.cyxm_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="csny" label="出生年月">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.csny }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.csny"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gxm" label="关系">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gxm }}</div>
                <div v-else>
                  <el-select
                    v-model="scope.row.gxm"
                    size="small"
                    :disabled="scope.row.gxm_stuFlag == 2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dmgxm"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    >
                    </el-option>
                  </el-select>
                  <!-- <el-input
                    v-model="scope.row.gxm"
                    :disabled="scope.row.gxm_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mzm" label="民族">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.mzm }}</div>
                <div v-else>
                  <el-select
                    v-model="scope.row.mzm"
                    size="small"
                    :disabled="scope.row.mzm_stuFlag == 2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dmmzmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gjdqm" label="国籍/地区">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gjdqm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gjdqm"
                    :disabled="scope.row.gjdqm_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jkzkm" label="健康状况">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jkztm_chinese }}</div>
                <div v-else>
                  <el-select
                    v-model="detailInfo.xsJbxx.jkztm"
                    size="small"
                    :disabled="detailInfo.xsJbxx.jkztm_stuFlag == 2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in dmjkzkm"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    >
                    </el-option>
                  </el-select>
                  <!-- <el-input
                    v-model="scope.row.jkzkm"
                    placeholder="请输入"
                  ></el-input> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdw" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cygzdw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.cygzdw"
                    :disabled="scope.row.cygzdw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdwdz" label="工作单位地址">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cygzdwdz }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.cygzdwdz"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cysfzh" label="身份证号码">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cysfzh }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.cysfzh"
                    :disabled="scope.row.cysfzh_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zyjszwm" label="专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zyjszwm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.zyjszwm"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zwjbm" label="职务级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zwjbm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.zwjbm"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="yddh" label="移动电话">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.yddh }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.yddh"
                    :disabled="scope.row.yddh_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="dzyx" label="电子邮箱">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.dzyx }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.dzyx"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index, 'a')"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_3">
          <div>学习经历</div>
          <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable(2)">
            <i class="addIcon"></i> 添加学习经历
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsXxjlList" style="width: 100%">
            <el-table-column prop="xxqsny" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxqsny }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.xxqsny"
                    :disabled="scope.row.xxqsny_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzzny" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxzzny }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.xxzzny"
                    :disabled="scope.row.xxzzny_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdw" label="学习单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxdw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.xxdw"
                    :disabled="scope.row.xxdw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sxzymc" label="所学专业">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.sxzymc }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.sxzymc"
                    :disabled="scope.row.sxzymc_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shxwm" label="获得学位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.shxwm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.shxwm"
                    :disabled="scope.row.shxwm_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzmr" label="学习证明人">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxzmr }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.xxzmr"
                    :disabled="scope.row.xxzmr_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zmrdw" label="证明人单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zmrdw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.zmrdw"
                    :disabled="scope.row.zmrdw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxjlbz" label="学习简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxjlbz }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.xxjlbz"
                    :disabled="scope.row.xxjlbz_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index, 'b')"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_4">
          <div>学籍异动信息</div>
          <!-- <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable(2)">
            <i class="addIcon"></i> 添加学籍异动信息
          </div> -->
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsXjydList" style="width: 100%">
            <el-table-column prop="ydwmc" label="原培养单位"> </el-table-column>
            <el-table-column prop="ybjmc" label="原班级"> </el-table-column>
            <el-table-column prop="ydlbm" label="异动类别"> </el-table-column>
            <el-table-column prop="spwh" label="异动文号"> </el-table-column>
            <el-table-column prop="ydrq" label="异动时间"> </el-table-column>
            <el-table-column prop="ynj" label="原年级"> </el-table-column>
            <el-table-column prop="yzymc" label="原专业"> </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index, 'b')"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_5">
          <div>工作经历</div>
          <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable(3)">
            <i class="addIcon"></i> 添加工作经历
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsGzjlList" style="width: 100%">
            <el-table-column prop="gzqsrq" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzqsrq }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzqsrq"
                    :disabled="scope.row.gzqsrq_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzzrq" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzzzrq }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzzzrq"
                    :disabled="scope.row.gzzzrq_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzdw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzdw"
                    :disabled="scope.row.gzdw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gznr" label="工作内容">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gznr }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gznr"
                    :disabled="scope.row.gznr_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwm" label="曾任党政职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.crdzzwm }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.crdzzwm"
                    :disabled="scope.row.crdzzwm_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crzyjszw" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.crzyjszw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.crzyjszw"
                    :disabled="scope.row.crzyjszw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmr" label="工作证明人">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzzmr }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzzmr"
                    :disabled="scope.row.gzzmr_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmrdw" label="证明人在何处">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzzmrdw }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzzmrdw"
                    :disabled="scope.row.gzzmrdw_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzjlbz" label="工作简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzjlbz }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.gzjlbz"
                    :disabled="scope.row.gzjlbz_stuFlag == 2"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index, 'c')"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="editBottom" v-if="isEdit == 2">
      <!-- this.$route.query.xh -->
      <div
        v-show="this.$route.query.xh"
        class="btn cancel"
        @click="handleCencle"
      >
        取消
      </div>
      <div
        v-show="!this.$route.query.xh"
        class="btns borderBlue"
        @click="getGraStu"
      >
        <i class="icon blueIcon"></i><span class="title">毕业生登记表</span>
      </div>
      <div
        v-show="!this.$route.query.xh"
        class="btns borderOrange"
        @click="getStuReg"
      >
        <i class="icon orangeIcon"></i><span class="title">学生登记表</span>
      </div>
      <div
        v-show="!this.$route.query.xh"
        class="btns borderLight"
        @click="getStu"
      >
        <i class="icon lightIcon"></i><span class="title">学生卡片</span>
      </div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>

<script>
import {
  getRegStuInfoDetailPage,
  updateRegStuInfo,
  loadRegStuInfoUpdatePage,
  gradStu,
  stuCard,
  stuReg,
  getZY,
  getBJ,
  getLocationjl,
} from "@/api/student/index";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import TopTitle from "@/components/TopTitle/index.vue";
import { queryAllDwh } from "@/api/politicalWork/basicInfo";
export default {
  name: "detail",
  components: {
    TopTitle,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.routerFrom = from.fullPath;
    });
  },
  data() {
    return {
      routerFrom: "", // 跳转过来的路由
      dtailsList: [
        "基本信息",
        "联系方式",
        "家庭成员信息",
        "学习经历",
        "学籍异动信息",
        "工作经历",
      ],
      current: 0,
      tableData: [],
      isEdit: false,
      schooling: "",
      xh: "",
      value: "",
      detailInfo: {
        xsJbxx: {},
        xsTxxx: {},
        xsXjxx: {}, // 学生学籍信息
        xsZsxx: {}, //宿舍楼栋
        xsJtcyxxList: [], // 家庭成员
        xsXxjlList: [], // 学生学习经历
        xsGzjlList: [], // 学生工作经历
        xsXszpb: {}, // 学生信息照片
      },
      dmxbmOPs: [], //性别
      dmmzmOps: [], //民族
      dmxjztmOps: [], //学籍状态
      pyccOps: [], //培养层次
      zzmmOps: [], //政治面貌
      xzOps: [], //学制
      jgOps: [], //籍贯和出生地
      allDwh: [], //单位
      zyOps: [], //专业
      bjOps: [],
      xslbOps: [], //;学生类别
      zxjhmOps: [], // 专项计划码
      gjdqm: [], //国籍
      dmsfzjlxm: [], // 身份证类型
      dmhyzkm: [], // 婚姻状况
      dmgatqwm: [], // 港澳台侨外
      dmrxfsm: [], // 入学方式
      dmjdfsm: [], // 就读方式
      dmhdxlfsm: [], // 获得学历方式
      dmpyfsm: [], // 培养方式
      dmxxfsm: [], // 学习方式
      dmyjszyxwlbm: [], // 专业学位类别
      dmsfbzm: [], //  是否毕业 是否学分制 是否师范生
      dmxsdqztm: [], //学生当前状态
      dmjkzkm: [], //健康状况
      dmzjxym: [], //信仰宗教
      dmxxm: [], //血型
      dmxslym: [], //学生来源
      dmxlm: [], //入学前学历
      dmxwm: [], //入学前学位
      dmyzmcm: [], //第一外语语种 第二外语语种
      dmlxsyzspm: [], //第一外语水平 第二外语水平
      dmgxm: [], //关系
      sfzyxwOps: [], //是否专业学位

      // 地区级联
      valueJljg: "",
      valueJlcsd: "",
      // value: [],
      locationProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
      options: [],
      updateJg: "",
      updateCsd: "",
    };
  },
  created() {
    // schooling = ""; // 3 4 5 是本科
    this.isEdit = this.$route.query.show ? this.$route.query.show : "2"; // 1是详情，2是编辑
    this.schooling = this.$route.query.schooling
      ? this.$route.query.schooling
      : this.pycc == 1 || this.pycc == 2
      ? 2
      : 1;
    this.xh = this.$route.query.xh ? this.$route.query.xh : this.userId;
  },

  computed: {
    roleId() {
      return this.$store.state.user.roleId;
    },
    roleType() {
      return this.$store.state.user.roleType;
    },
    userId() {
      return this.$store.state.user.userId;
    },
    pycc() {
      return this.$store.state.user.pycc;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getCode("dmxbm"); // 性别码
      this.getCode("dmmzm"); // 民 族
      this.getCode("dmxjztm"); // 学籍
      this.getCode("dmpyccm"); // 培养层次
      this.getCode("dmzzmmm"); // 政治面貌
      this.getCode("dmxz"); // 学制
      this.getCode("dmxslbm"); // 学生类别
      this.getCode("dmyjszxjhm"); // 专项计划码
      this.getCode("dmxzqhm"); // 籍贯
      this.getCode("dmsjgghdqmcm"); // 国籍地区 来源地区
      this.getCode("dmsfzjlxm"); // 身份证类型
      this.getCode("dmhyzkm"); // 婚姻状况
      this.getCode("dmgatqwm"); // 港澳台侨外
      this.getCode("dmxjztm"); // 学籍状态
      this.getCode("dmsfbzm"); // 是否毕业 是否学分制 是否师范生
      this.getCode("dmrxfsm"); // 入学方式
      this.getCode("dmjdfsm"); // 就读方式
      this.getCode("dmhdxlfsm"); // 获得学历方式
      this.getCode("dmpyfsm"); // 培养方式
      this.getCode("dmxxfsm"); // 学习方式
      this.getCode("dmyjszyxwlbm"); // 专业学位类别

      this.getCode("dmxsdqztm"); //学生当前状态
      this.getCode("dmjkzkm"); //健康状况
      this.getCode("dmzjxym"); //信仰宗教
      this.getCode("dmxxm"); //血型
      this.getCode("dmxslym"); //学生来源
      this.getCode("dmxlm"); //入学前学位
      this.getCode("dmxwm"); //入学前学位
      this.getCode("dmyzmcm"); //第一外语语种 第二外语语种
      this.getCode("dmlxsyzspm"); //第一外语水平 第二外语水平
      this.getCode("dmgxm"); //关系
      this.getLocationjl();

      if (this.isEdit == 1) {
        this.getDetail();
      } else {
        this.getloadRegStuInfoUpdatePage();
      }
    });
  },

  methods: {
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxbm":
              this.dmxbmOPs = res.data; //性别
              break;
            case "dmmzm": //民族
              this.dmmzmOps = res.data;
              break;
            case "dmxjztm": //学籍状态
              this.dmxjztmOps = res.data;
              break;
            case "dmpyccm": //培养层次
              this.pyccOps = res.data;
              break;
            case "dmzzmmm": //政治面貌
              this.zzmmOps = res.data;
              break;
            case "dmxz": //学制
              this.xzOps = res.data;
              break;
            case "dmxzqhm": //籍贯和出生地
              this.jgOps = res.data;
              break;
            case "dmxslbm": //;学生类别
              this.xslbOps = res.data;
              break;
            case "dmyjszxjhm": // 专项计划码
              this.zxjhmOps = res.data;
              break;
            //******************* */
            //  newnew
            case "dmsjgghdqmcm": //国籍地区 来源地区
              this.gjdqm = res.data;
              break;
            case "dmsfzjlxm": //身份证类型
              this.dmsfzjlxm = res.data;
              break;
            case "dmhyzkm": //婚姻状况
              this.dmhyzkm = res.data;
              break;
            case "dmgatqwm": //港澳台侨外
              this.dmgatqwm = res.data;
              break;
            case "dmsfbzm": //是否毕业 是否学分制 是否师范生 在册情况 是否独生子女
              this.dmsfbzm = res.data;
              this.sfzyxwOps = res.data;
              break;
            case "dmrxfsm": //入学方式
              this.dmrxfsm = res.data;
              break;
            case "dmjdfsm": //就读方式
              this.dmjdfsm = res.data;
              break;
            case "dmhdxlfsm": //获得学历方式
              this.dmhdxlfsm = res.data;
              break;
            case "dmpyfsm": //培养方式
              this.dmpyfsm = res.data;
              break;
            case "dmxxfsm": //;学习方式
              this.dmxxfsm = res.data;
              break;
            case "dmyjszyxwlbm": //;专业学位类别
              this.dmyjszyxwlbm = res.data;
              break;
            case "dmxsdqztm": //学生当前状态
              this.dmxsdqztm = res.data;
              break;
            case "dmjkzkm": //健康状况
              this.dmjkzkm = res.data;
              break;
            case "dmzjxym": //信仰宗教
              this.dmzjxym = res.data;
              break;
            case "dmxxm": //血型
              this.dmxxm = res.data;
              break;
            case "dmxslym": //学生来源
              this.dmxslym = res.data;
              break;
            case "dmxlm": //入学前学历
              this.dmxlm = res.data;
              break;
            case "dmxwm": //入学前学位
              this.dmxwm = res.data;
              break;
            case "dmyzmcm": //第一外语语种 第二外语语种
              this.dmyzmcm = res.data;
              break;
            case "dmlxsyzspm": //第一外语水平 第二外语水平
              this.dmlxsyzspm = res.data;
              break;
            case "dmgxm": //关系
              this.dmgxm = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 查询学院
    getAllCollege() {
      queryAllDwh()
        .then((res) => {
          this.allDwh = res.data.rows;
          // console.log("this.allDwh",this.allDwh);
        })
        .catch((err) => {});
    },
    changeXY(val) {
      if (val && val.length == 0) {
        this.moreIform.stuInfo = []; // 专业
        this.moreIform.pread = []; // 班级
      }
      this.getZY(val);
      this.getBJ(val);
    },
    // 学院找专业
    getZY(val) {
      let data = { DWH: val };
      getZY(data)
        .then((res) => {
          this.zyOps = res.data;
        })
        .catch((err) => {});
    },
    getBJ(val) {
      let data = { DWH: val };
      getBJ(data)
        .then((res) => {
          this.bjOps = res.data;
        })
        .catch((err) => {});
    },
    getName(data, val) {
      if (data.length > 0 && val) {
        for (let x = 0; x < data.length; x++) {
          if (data[x].dm == val) {
            return data[x].mc;
          }
        }
      }
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },

    getloadRegStuInfoUpdatePage() {
      let data = { XH: this.xh };
      loadRegStuInfoUpdatePage(data)
        .then((res) => {
          //  console.log(res.data.xsJbxx,"???");
          this.valueJljg = res.data.xsJbxx.jg || "";
          this.valueJlcsd = res.data.xsJbxx.csdm || "";
          this.$set(
            this.detailInfo,
            "xsJbxx",
            res.data.xsJbxx ? res.data.xsJbxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsTxxx",
            res.data.xsTxxx ? res.data.xsTxxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsXjxx",
            res.data.xsXjxx ? res.data.xsXjxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsZsxx", //楼栋房间
            res.data.xsZsxx ? res.data.xsZsxx : {}
          );
          this.$set(this.detailInfo, "xsJtcyxxList", res.data.xsJtcyxxList);
          this.$set(this.detailInfo, "xsXxjlList", res.data.xsXxjlList);
          this.$set(this.detailInfo, "xsGzjlList", res.data.xsGzjlList);
          this.$set(
            this.detailInfo,
            "xsXszpb",
            res.data.xsXszpb ? res.data.xsXszpb : {}
          );
          this.getAllCollege(this.detailInfo.xsXjxx.dwh);
          this.getZY([this.detailInfo.xsXjxx.dwh]);
          this.getBJ([this.detailInfo.xsXjxx.dwh]);
        })
        .catch((err) => {});
    },
    async getDetail() {
      let data = { XH: this.$route.query.xh };
      await getRegStuInfoDetailPage(data)
        .then((res) => {
          // var arr = res.data.xsGzjlList || [];
          // var arr1 = arr.filter(function (s) {
          //   return s && s.trim();
          // });
          this.$set(
            this.detailInfo,
            "xsJbxx",
            res.data.xsJbxx ? res.data.xsJbxx : {}
          );

          this.$set(
            this.detailInfo,
            "xsTxxx",
            res.data.xsTxxx ? res.data.xsTxxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsXjxx",
            res.data.xsXjxx ? res.data.xsXjxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsZsxx", //楼栋房间
            res.data.xsZsxx ? res.data.xsZsxx : {}
          );
          this.$set(
            this.detailInfo,
            "xsJtcyxxList",
            res.data.xsJtcyxxList ? res.data.xsJtcyxxList : []
          );
          this.$set(
            this.detailInfo,
            "xsXxjlList",
            res.data.xsXxjlList ? res.data.xsXxjlList : []
          );
          this.$set(
            this.detailInfo,
            "xsGzjlList",
            res.data.xsGzjlList ? res.data.xsGzjlList : []
          );
          this.$set(
            this.detailInfo,
            "xsXszpb",
            res.data.xsXszpb ? res.data.xsXszpb : {}
          );
          this.$set(
            this.detailInfo,
            "xsXjydList",
            res.data.xsXjydList ? res.data.xsXjydList : {} //学籍异动信息
          );
          this.getAllCollege(this.detailInfo.xsXjxx.dwh);
          this.getZY([this.detailInfo.xsXjxx.dwh]);
          this.getBJ([this.detailInfo.xsXjxx.dwh]);
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
    // 添加
    addDetailTable(index) {
      if (index == 1) {
        this.detailInfo.xsJtcyxxList.push({});
      } else if (index == 2) {
        this.detailInfo.xsXxjlList.push({});
      } else if (index == 3) {
        this.detailInfo.xsGzjlList.push({});
      }
    },
    // 删除
    deteleItem(row, index, leg) {
      // console.log(row,index,leg)
      if (leg == "a") {
        this.detailInfo.xsJtcyxxList.splice(index, 1);
      } else if (leg == "b") {
        this.detailInfo.xsXxjlList.splice(index, 1);
      } else if (leg == "c") {
        this.detailInfo.xsGzjlList.splice(index, 1);
      }
      detailInfo;
    },
    // 取消
    handleCencle() {
      this.$router.push({
        path: this.routerFrom,
      });
    },
    // 提交
    handlUpdata() {
      this.$set(this.detailInfo, "xh", this.$route.query.xh);
      this.detailInfo.xsJbxx.jg = this.updateJg
        ? this.updateJg
        : this.detailInfo.xsJbxx.jg;
      console.log("jiguan", this.detailInfo.xsJbxx.jg);
      this.detailInfo.xsJbxx.csdm = this.updateCsd
        ? this.updateCsd
        : this.detailInfo.xsJbxx.csdm;
      console.log("csd", this.detailInfo.xsJbxx.csdm);
      let data = this.detailInfo;
      //0必填和空的校验
      if (data.xsJbxx.xh_stuFlag == 0 && !data.xsJbxx.xh) {
        this.$message.error("学号不能为空");
      } else if (data.xsJbxx.xm_stuFlag == 0 && !data.xsJbxx.xm) {
        this.$message.error("姓名不能为空");
      } else if (data.xsTxxx.yddh_stuFlag == 0 && !data.xsTxxx.yddh) {
        this.$message.error("移动电话不能为空"); //
      } else if (data.xsTxxx.dzyx_stuFlag == 0 && !data.xsTxxx.dzyx) {
        this.$message.error("电子邮箱不能为空"); //
      } else if (data.xsTxxx.qqhm_stuFlag == 0 && !data.xsTxxx.qqhm) {
        this.$message.error("QQ号码不能为空"); //
      } else if (
        data.xsTxxx.jtzz_stuFlag == 0 &&
        !data.xsTxxx.jtzz &&
        this.schooling == 1
      ) {
        this.$message.error("家庭住址不能为空"); //
      } else if (data.xsTxxx.jtdh_stuFlag == 0 && !data.xsTxxx.jtdh) {
        this.$message.error("家庭电话不能为空"); //
      } else if (
        data.xsTxxx.jtyzbm_stuFlag == 0 &&
        !data.xsTxxx.jtyzbm &&
        this.schooling == 1
      ) {
        this.$message.error("家庭邮编不能为空"); //
        // } else if (data.xsTxxx.yzbm_stuFlag == 0 && !data.xsTxxx.yzbm) {
        //   this.$message.error("邮政编码不能为空");
      } else if (data.xsJbxx.csdm_stuFlag == 0 && !data.xsJbxx.csdm) {
        this.$message.error("出生地不能为空");
      } else if (data.xsJbxx.csrq_stuFlag == 0 && !data.xsJbxx.csrq) {
        this.$message.error("出生日期不能为空");
      } else if (data.xsJbxx.gjdqm_stuFlag == 0 && !data.xsJbxx.gjdqm) {
        this.$message.error("户口所在地不能为空");
      } else if (data.xsJbxx.jq_stuFlag == 0 && !data.xsJbxx.jq) {
        this.$message.error("籍贯不能为空");
      } else if (data.xsJbxx.mzm_stuFlag == 0 && !data.xsJbxx.mzm) {
        this.$message.error("民族不能为空");
      } else if (data.xsJbxx.sfzjh_stuFlag == 0 && !data.xsJbxx.sfzjh) {
        this.$message.error("身份证件号不能为空");
      } else if (data.xsJbxx.xbm_stuFlag == 0 && !data.xsJbxx.xbm) {
        this.$message.error("性别不能为空");
        // } else if (data.xsGzjlList.gzdw_stuFlag == 0 && !data.xsGzjlList.gzdw) {
        //   this.$message.error("工作单位不能为空");
        // } else if (data.xsGzjlList.gznr_stuFlag == 0 && !data.xsGzjlList.gznr) {
        //   this.$message.error("工作内容不能为空");
        // } else if (
        //   data.xsGzjlList.gzzmrdw_stuFlag == 0 &&
        //   !data.xsGzjlList.gzzmrdw
        // ) {
        //   this.$message.error("工作证明人单位不能为空");
        // } else if (
        //   data.xsJtcyxxList.cygzdw_stuFlag == 0 &&
        //   !data.xsJtcyxxList.cygzdw
        // ) {
        //   this.$message.error("成员工作单位不能为空");
        // } else if (
        //   data.xsJtcyxxList.cysfzh_stuFlag == 0 &&
        //   !data.xsJtcyxxList.cysfzh
        // ) {
        //   this.$message.error("成员身份证号不能为空");
        // } else if (
        //   data.xsJtcyxxList.cyxm_stuFlag == 0 &&
        //   !data.xsJtcyxxList.cyxm
        // ) {
        //   this.$message.error("家庭成员不能为空");
        // } else if (data.xsJtcyxxList.gxm_stuFlag == 0 && !data.xsJtcyxxList.gxm) {
        //   this.$message.error("关系不能为空");
        // } else if (
        //   data.xsJtcyxxList.yddh_stuFlag == 0 &&
        //   !data.xsJtcyxxList.yddh
        // ) {
        //   this.$message.error("单位电话不能为空");
      } else if (data.xsXjxx.bjm_stuFlag == 0 && !data.xsXjxx.bjm) {
        this.$message.error("班级不能为空");
      } else if (data.xsXjxx.dwh_stuFlag == 0 && !data.xsXjxx.dwh) {
        this.$message.error("培养单位不能为空");
      } else if (data.xsXjxx.nj_stuFlag == 0 && !data.xsXjxx.nj) {
        this.$message.error("年级不能为空");
      } else if (data.xsXjxx.xjzt_stuFlag == 0 && !data.xsXjxx.xjzt) {
        this.$message.error("学籍状态不能为空");
      } else if (data.xsXjxx.xz_stuFlag == 0 && !data.xsXjxx.xz) {
        this.$message.error("学制不能为空");
      } else if (data.xsXjxx.zydm_stuFlag == 0 && !data.xsXjxx.zydm) {
        this.$message.error("专业不能为空");
      }
      // else if (
      //   data.xsXxjlList.sxzymc_stuFlag == 0 &&
      //   !data.xsXxjlList.sxzymc
      // ) {
      //   this.$message.error("所学专业名称不能为空");
      // } else if (data.xsXxjlList.xxnr_stuFlag == 0 && !data.xsXxjlList.xxnr) {
      //   this.$message.error("学习内容不能为空");
      // } else if (data.xsXxjlList.xxzmr_stuFlag == 0 && !data.xsXxjlList.xxzmr) {
      //   this.$message.error("学习证明人不能为空");
      // }
      // else if (data.xsTxxx.wxhm_stuFlag == 0 && !data.xsTxxx.wxhm) {
      //   this.$message.error("微信号不能为空");
      // } else if (data.xsTxxx.txdz_stuFlag == 0 && !data.xsTxxx.txdz) {
      //   this.$message.error("通信地址不能为空");
      // } else if (data.xsTxxx.czdh_stuFlag == 0 && !data.xsTxxx.czdh) {
      //   this.$message.error("传真电话不能为空");
      // } else if (data.xsTxxx.jtdzxx_stuFlag == 0 && !data.xsTxxx.jtdzxx) {
      //   this.$message.error("家庭Email不能为空");
      // } // else if (data.xsTxxx.wldz_stuFlag == 0 && !data.xsTxxx.wldz) {
      //   this.$message.error("网络地址不能为空");
      // }
      else {
        updateRegStuInfo(data)
          .then((res) => {
            this.$message({
              message: res.errmsg,
              type: "success",
            });
            this.$router.push({
              path: this.routerFrom,
            });
          })
          .catch((err) => {
            this.$message.error(err.errmsg);
          });
      }
    },
    // 毕业生登记表
    getGraStu() {
      let xhs = [this.xh];
      let data = { xhs: xhs, etype: "docx" };
      gradStu(data).then((res) => this.downloadFn(res, "毕业生登记表", "zip"));
    },
    //学生登记
    getStuReg() {
      let xhs = [this.xh];
      let data = { xhs: xhs, etype: "docx" };
      stuReg(data).then((res) => this.downloadFn(res, "学生登记表", "zip"));
    },
    //学生卡片
    getStu() {
      let xhs = [this.xh];
      let data = { xhs: xhs, etype: "docx" };
      stuCard(data).then((res) => this.downloadFn(res, "学生卡片", "zip"));
    },
    //地区级联
    getLocationjl() {
      getLocationjl().then((res) => {
        this.options = res.data;
        // this.value = ["150000", "150600"]; //meiqubie
      });
    },
    handleChangeJg(value) {
      if (value.length == 1) {
        this.updateJg = value[0];
      } else if (value.length == 2) {
        this.updateJg = value[1];
      } else {
        this.updateJg = value[2];
      }
      console.log("this.updateJg", this.updateJg);
    },
    handleChangeCsd(value) {
      if (value.length == 1) {
        this.updateCsd = value[0];
      } else if (value.length == 2) {
        this.updateCsd = value[1];
      } else {
        this.updateCsd = value[2];
      }
      console.log("this.updateCsd", this.updateCsd);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px 0;
  box-sizing: border-box;
  .student {
    margin-top: 60px;
  }
  .wrap {
    display: flex;
    flex-direction: row;
    // overflow: hidden;
    .detail_left {
      flex: 0 0 198px;
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
        .title {
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
      .headline {
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #1f1f1f;
        line-height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .editBtn {
          padding: 4px 5px;
          margin-right: 20px;
          border: 1px solid #005657;
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
      .tableStyle {
        position: relative;
        padding: 20px;
        .imgWrap {
          position: absolute;
          right: 20px;
          top: 20px;
          z-index: 100;
          .photo {
            width: 160px;
            height: 206px;
            background: #fff;
            overflow: hidden;
            img {
              width: 160px;
              height: 206px;
            }
          }
        }
        .information {
          padding: 0 20px;
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
              ::v-deep .el-input {
                width: 200px;
              }
            }
          }
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
</style>
