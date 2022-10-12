<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div class="titlename">
          <div v-for="(item, index) in detailInfo.dtailsList" :key="index">
            <div
              class="list"
              :class="index == current ? 'active' : ''"
              @click="handleList(index, 'tag')"
            >
              <el-badge :value="item.num > 0 ? item.num : ''" class="item">
                <div>{{ item.name }}</div>
              </el-badge>
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
                  <div
                    v-if="
                      (detailInfo.xsJbxx.xh_approveFlag == 1 ||
                        detailInfo.xsJbxx.xh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.xh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xh_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.xm_approveFlag == 1 ||
                        detailInfo.xsJbxx.xm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.xm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音姓</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.pyx_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.pyx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.pym_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.pym }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.cym_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.cym }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">英文姓名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.ywxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.ywxm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.xbm_approveFlag == 1 ||
                        detailInfo.xsJbxx.xbm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.xbm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.XBM_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xbm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.dwh_approveFlag == 1 ||
                      detailInfo.xsXjxx.dwh_approveFlag == 0) && isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.dwh_chinese"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dwh_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dwh_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.csrq_approveFlag == 1 ||
                        detailInfo.xsJbxx.csrq_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.csrq"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.csrq_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.csrq }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生地</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                        detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.csdm"
                      size="small"
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
                    </el-select>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.csdm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.csdm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.jg_approveFlag == 1 ||
                        detailInfo.xsJbxx.jg_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
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
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.jg_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.jg_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.mzm_approveFlag == 1 ||
                        detailInfo.xsJbxx.mzm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.mzm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.MZM_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ getName(dmmzmOps, detailInfo.xsJbxx.mzm) }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsJbxx.gjdqm_approveFlag == 1 ||
                        detailInfo.xsJbxx.gjdqm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.gjdqm"
                      size="small"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in gjdqOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.gjdqm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.gjdqm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfzjlxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfzjlxm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.sfzjh_approveFlag == 1 ||
                        detailInfo.xsJbxx.sfzjh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfzjh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfzjh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件有效期</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfzjyxq_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfzjyxq }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学时间</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxny_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxny }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.jsxyny_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.jsxyny }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.nj_approveFlag == 1 ||
                        detailInfo.xsXjxx.nj_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.nj"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.nj_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.nj }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.bjm_approveFlag == 1 ||
                        detailInfo.xsXjxx.bjm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.bjm_chinese"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.bjm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.bjm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.zydm_approveFlag == 1 ||
                        detailInfo.xsXjxx.zydm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.zydm_chinese"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zydm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zydm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学制</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.xz_approveFlag == 1 ||
                        detailInfo.xsXjxx.xz_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                    disabled ="true"
                  >
                    <el-select
                      v-model="detailInfo.xsXjxx.xz"
                      size="small"
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
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xz_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ getName(xzOps, detailInfo.xsXjxx.xz) }}
                    <!-- detailInfo.xsXjxx.xz -->
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">在册情况</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zcqk_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zcqk_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfzx_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfzx_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学籍状态</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.xjzt_approveFlag == 1 ||
                        detailInfo.xsXjxx.xjzt_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsXjxx.xjzt"
                      size="small"
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
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xjzt_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(dmxjztmOps, detailInfo.xsXjxx.xjzt) }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生当前状态</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xsdqztm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xsdqztm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否毕业</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfby_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfby_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.hyzkm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.hyzkm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">港澳台侨外</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.gatqwm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.gatqwm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.zzmmm_approveFlag == 1 ||
                        detailInfo.xsJbxx.zzmmm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.zzmmm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.zzmmm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(zzmmOps, detailInfo.xsJbxx.zzmmm) }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">健康状况</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.jkztm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.jkztm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">信仰宗教</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xyzjm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xyzjm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">血型</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xxm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xxm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否独生子女</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfdszn_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfdszn_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身高</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.sg_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.sg }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">体重</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.tz_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.tz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学校名称</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.yxxmc_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.yxxmc }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学号</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.yxh_approveFlag == 1 ||
                        detailInfo.xsJbxx.yxh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.yxh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.yxh_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.yxh }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxfsm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.lydqm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.lydqm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生来源</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xslym_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xslym_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.jdfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.jdfsm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学前学历</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxqxlm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxqxlm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学前学位</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxqxwm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxqxwm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获得学历方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.hdxlfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.hdxlfsm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfxfz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfxfz_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否师范生</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfsfs_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfsfs_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.pyfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.pyfsm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.pyccm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(pyccOps, detailInfo.xsXjxx.pyccm) }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">连读方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.ldfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.ldfsm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">定向或委培</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dxhwpdw_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dxhwpdw }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xslbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xslbm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一外语语种</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dywyyz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dywyyz_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一外语水平</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dywysp_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dywysp_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二外语语种</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dewyyz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dewyyz_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二外语水平</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dewysp_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dewysp_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 研究生基本信息 -->
          <div class="information" v-if="schooling == 2">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xh_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.xm_approveFlag == 1 ||
                        detailInfo.xsJbxx.xm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.xm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音姓</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.pyx_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.pyx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.pym_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.pym }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.cym_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.cym }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">英文姓名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.ywxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.ywxm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.xbm_approveFlag == 0 ||
                        detailInfo.xsJbxx.xbm_approveFlag == 1) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.xbm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.xbm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.xbm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.dwh_approveFlag == 1 ||
                      detailInfo.xsXjxx.dwh_approveFlag == 0) && isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.dwh_chinese"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dwh_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dwh_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.csrq_approveFlag == 1 ||
                        detailInfo.xsJbxx.csrq_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.csrq"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.csrq_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.csrq }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生地</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                        detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.csdm"
                      size="small"
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
                    </el-select>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.csdm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.csdm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.jg_approveFlag == 1 ||
                        detailInfo.xsJbxx.jg_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
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
                    </el-select>
                    <!-- <el-input
                      v-model="detailInfo.xsJbxx.jg"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input> -->
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.jg_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.jg_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.mzm_approveFlag == 1 ||
                        detailInfo.xsJbxx.mzm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.mzm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.mzm_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ getName(dmmzmOps, detailInfo.xsJbxx.mzm) }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsJbxx.gjdqm_approveFlag == 1 ||
                        detailInfo.xsJbxx.gjdqm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.gjdqm"
                      size="small"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="item in gjdqOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.gjdqm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.gjdqm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfzjlxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfzjlxm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.sfzjh_approveFlag == 1 ||
                        detailInfo.xsJbxx.sfzjh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsJbxx.sfzjh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sfzjh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.sfzjh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.nj_approveFlag == 1 ||
                        detailInfo.xsJbxx.nj_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.nj"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsXjxx.nj_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.nj }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学年月</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxny_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxny }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">预计毕业时间</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.yjbysj_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.yjbysj }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">实际毕业时间</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.sjbysj_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sjbysj }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.jsxyny_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.jsxyny }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.rxfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.rxfsm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学籍状态</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsJbxx.xjzt_approveFlag == 1 ||
                        detailInfo.xsJbxx.xjzt_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsXjxx.xjzt"
                      size="small"
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
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xjzt_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(dmxjztmOps, detailInfo.xsXjxx.xjzt) }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否毕业</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfby_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfby_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfzx_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfzx_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">港澳台侨外</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.gatqwm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.gatqwm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsJbxx.hyzkm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsJbxx.hyzkm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.zzmmm_approveFlag == 1 ||
                        detailInfo.xsJbxx.zzmmm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-select
                      v-model="detailInfo.xsJbxx.zzmmm"
                      size="small"
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
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsJbxx.zzmmm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(zzmmOps, detailInfo.xsJbxx.zzmmm) }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.lydqm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.lydqm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xxfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xxfsm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.jdfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.jdfsm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <!-- <div
                    v-if="
                      (detailInfo.xsXjxx.zydm_approveFlag == 1 ||
                        detailInfo.xsXjxx.zydm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsXjxx.zydm_chinese"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div> -->
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zydm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zydm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">研究方向</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.yjfxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.yjfx }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师姓名</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dsxm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dsxm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师类别</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dslb_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dslb }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获得学历方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.hdxlfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.hdxlfsm_chinese }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.sfxfz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfxfz_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.pyccm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ getName(pyccOps, detailInfo.xsXjxx.pyccm) }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.pyfsm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.pyfsm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养类别</div>
                  <div class="content"> 
                    {{ detailInfo.xsXjxx.pylb }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xslbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xslbm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单双证</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dsz_approveFlag == 1 ? 'greenColor' : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dsz }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">定向或委培单位</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.dxhwpdw_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.dxhwpdw }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专项计划</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zxjhm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zxjhm_chinese }}
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
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xlzsh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xlzsh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业证印制号</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.byzyzh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.byzyzh }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获学位日期</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.hxwrq_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.hxwrq }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位证书号</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xwzsh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.xwzsh }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否专业学位</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.xsfzyxw_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.sfzyxw }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业学位类别</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zyxwlbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zyxwlbm_chinese }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业学位领域</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsXjxx.zyxwlym_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsXjxx.zyxwlym_chinese }}
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
                  <div
                    v-if="
                      (detailInfo.xsTxxx.yddh_approveFlag == 1 ||
                        detailInfo.xsTxxx.yddh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.yddh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.yddh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.yddh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.dzyx_approveFlag == 1 ||
                        detailInfo.xsTxxx.dzyx_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.dzyx"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.dzyx_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.dzyx }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ号码</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.qqhm_approveFlag == 1 ||
                        detailInfo.xsTxxx.qqhm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.qqhm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.qqhm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.qqhm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信号</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.wxhm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.wxhm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">传真电话</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.czdh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.czdh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮政编码</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.yzbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.yzbm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">通信地址</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.txdz_approveFlag == 1 ||
                        detailInfo.xsTxxx.txdz_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.txdz"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.txdz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.txdz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">网络地址</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.wldz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.wldz }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭电话</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.jtdh_approveFlag == 1 ||
                        detailInfo.xsTxxx.jtdh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.jtdh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.jtdh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.jtdh }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭邮编</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.jtyzbm_approveFlag == 1 ||
                        detailInfo.xsTxxx.jtyzbm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.jtyzbm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.jtyzbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.jtyzbm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭住址</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.jtzz_approveFlag == 1 ||
                        detailInfo.xsTxxx.jtzz_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.jtzz"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.jtzz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.jtzz }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭Email</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.jtdzxx_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.jtdzxx }}
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
                  <div
                    v-if="
                      (detailInfo.xsTxxx.yddh_approveFlag == 1 ||
                        detailInfo.xsTxxx.yddh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.yddh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.yddh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.yddh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.dzyx_approveFlag == 1 ||
                        detailInfo.xsTxxx.dzyx_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.dzyx"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.dzyx_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.dzyx }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ号码</div>
                  <div
                    v-if="
                      (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                        detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.qqhm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.qqhm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.qqhm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信号</div>
                  <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.wxhm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.wxhm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭电话</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.jtdh_approveFlag == 1 ||
                        detailInfo.xsTxxx.jtdh_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.jtdh"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.jtdh_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.jtdh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮政编码</div>
                  <div
                    v-if="
                      (detailInfo.xsTxxx.yzbm_approveFlag == 1 ||
                        detailInfo.xsTxxx.yzbm_approveFlag == 0) &&
                      isSh == 1
                    "
                    class="content"
                  >
                    <el-input
                      v-model="detailInfo.xsTxxx.yzbm"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <div
                    v-else
                    class="content"
                    :class="
                      detailInfo.xsTxxx.yzbm_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.yzbm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">通信地址</div>
                  <div class="content">
                    <el-input
                      v-model="detailInfo.xsTxxx.txdz"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                  <!-- <div
                    class="content"
                    :class="
                      detailInfo.xsTxxx.txdz_approveFlag == 1
                        ? 'greenColor'
                        : ''
                    "
                  >
                    {{ detailInfo.xsTxxx.txdz }}
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_2">
          <div>家庭成员信息</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsJtcyxxList" style="width: 100%">
            <el-table-column prop="cyxm" label="姓名">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJtcyxxList.cyxm_approveFlag == 1 ||
                      detailInfo.xsJtcyxxList.cyxm_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.cyxm"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.cyxm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.cyxm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="csny" label="出生年月">
              <template slot-scope="scope">
                <div
                  :class="scope.row.csny_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.csny }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gxm" label="关系">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJtcyxxList.csdm_approveFlag == 1 ||
                      detailInfo.xsJtcyxxList.csdm_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.gxm"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.gxm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gxm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mzm" label="民族">
              <template slot-scope="scope">
                <div
                  :class="scope.row.mzm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.mzm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gjdqm" label="国籍/地区">
              <template slot-scope="scope">
                <div
                  :class="scope.row.gjdqm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gjdqm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jkzkm" label="健康状况">
              <template slot-scope="scope">
                <div
                  :class="scope.row.jkzkm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.jkzkm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdw" label="工作单位">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJtcyxxList.cygzdw_approveFlag == 1 ||
                      detailInfo.xsJtcyxxList.cygzdw_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.cygzdw"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.cygzdw_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.cygzdw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdwdz" label="工作单位地址">
              <template slot-scope="scope">
                <div
                  :class="
                    scope.row.cygzdwdz_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.cygzdwdz }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cysfzh" label="身份证号码">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJtcyxxList.cysfzh_approveFlag == 1 ||
                      detailInfo.xsJtcyxxList.cysfzh_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.cysfzh"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.cysfzh_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.cysfzh }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zyjszwm" label="专业技术职务">
              <template slot-scope="scope">
                <div
                  :class="
                    scope.row.zyjszwm_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.zyjszwm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zwjbm" label="职务级别">
              <template slot-scope="scope">
                <div
                  :class="scope.row.zwjbm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.zwjbm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="yddh" label="移动电话">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJtcyxxList.yddh_approveFlag == 1 ||
                      detailInfo.xsJtcyxxList.yddh_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.yddh"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.yddh_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.yddh }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="dzyx" label="电子邮箱">
              <template slot-scope="scope">
                <!-- <div
                  v-if="
                    (detailInfo.xsJtcyxxList.dzyx_approveFlag == 1 ||
                    detailInfo.xsJtcyxxList.dzyx_approveFlag == 0) && isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.dzyx"
                    placeholder="请输入"
                  ></el-input>
                </div> -->
                <div
                  :class="scope.row.dzyx_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.dzyx }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_3">
          <div>学习经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsXxjlList" style="width: 100%">
            <el-table-column prop="xxqsny" label="起始时间">
              <template slot-scope="scope">
                <div
                  :class="scope.row.xxqsny_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.xxqsny }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzzny" label="终止时间">
              <template slot-scope="scope">
                <div
                  :class="scope.row.xxzzny_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.xxzzny }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdw" label="学习单位">
              <template slot-scope="scope">
                <div
                  :class="scope.row.xxdw_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.xxdw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sxzymc" label="所学专业">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                      detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.sxzymc"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.sxzymc_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.sxzymc }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shxwm" label="获得学位">
              <template slot-scope="scope">
                <div
                  :class="scope.row.shxwm_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.shxwm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzmr" label="学习证明人">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                      detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.xxzmr"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.xxzmr_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.xxzmr }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zmrdw" label="证明人单位">
              <template slot-scope="scope">
                <div
                  :class="scope.row.zmrdw_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.zmrdw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxjlbz" label="学习简历备注">
              <template slot-scope="scope">
                <div
                  :class="scope.row.xxjlbz_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.xxjlbz }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_4">
          <div>工作经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsGzjlList" style="width: 100%">
            <el-table-column prop="gzqsrq" label="起始时间">
              <template slot-scope="scope">
                <div
                  :class="scope.row.gzqsrq_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gzqsrq }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzzrq" label="终止时间">
              <template slot-scope="scope">
                <div
                  :class="scope.row.gzzzrq_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gzzzrq }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
                <div
                  v-if="
                    (scope.row.gzdw_approveFlag == 1 ||
                      scope.row.gzdw_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.gzdw"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.gzdw_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gzdw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gznr" label="工作内容">
              <template slot-scope="scope">
                <div
                  v-if="
                    (scope.row.gznr_approveFlag == 1 ||
                      scope.row.gznr_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.gznr"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="scope.row.gznr_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gznr }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwm" label="曾任党政职务">
              <template slot-scope="scope">
                <div
                  :class="
                    scope.row.crdzzwm_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.crdzzwm }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crzyjszw" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div
                  :class="
                    scope.row.crzyjszw_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.crzyjszw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmr" label="工作证明人">
              <template slot-scope="scope">
                <div
                  :class="scope.row.gzzmr_approveFlag == 1 ? 'greenColor' : ''"
                >
                  {{ scope.row.gzzmr }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmrdw" label="证明人在何处">
              <template slot-scope="scope">
                <div
                  v-if="
                    (detailInfo.xsJbxx.csdm_approveFlag == 1 ||
                      detailInfo.xsJbxx.csdm_approveFlag == 0) &&
                    isSh == 1
                  "
                >
                  <el-input
                    v-model="scope.row.gzzmrdw"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div
                  v-else
                  :class="
                    scope.row.gzzmrdw_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.gzzmrdw }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzjlbz" label="工作简历备注">
              <template slot-scope="scope">
                <div
                  :class="
                    scope.row.ggzjlbz_approveFlag == 1 ? 'greenColor' : ''
                  "
                >
                  {{ scope.row.gzjlbz }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="editBottom" v-show="active == '2'">
      <div class="btn cancel" @click="handleBack">
        <i class="icon backIcon"></i> 退回
      </div>
      <div class="btn confirm" @click="handleThrough">
        <i class="icon throughIcon"></i> 通过
      </div>
      <div class="btn confirm" @click="save">
        <i class="icon throughIcon"></i> 保存
      </div>
    </div>

    <el-dialog
      title="退回理由"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="通过" :visible.sync="throughDialogV" width="800px">
      <div class="dialogMsg">是否确认审核通过？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="throughDialogV = false">取 消</el-button>
        <el-button type="primary" @click="handleConThrou">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDetailQueryPoliticalWorkList } from "../../../../../../api/politicalWork/basicInfo";
import { updateRegStuInfo1 } from "@/api/student/index";
import {
  getStuInfoFlowUpdatePage,
  passFlow,
  backFlow,
} from "@/api/student/index";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
export default {
  name: "detail",

  data() {
    return {
      dtailsList: [
        // { name: '基本信息', num: '1' },
        // { name: '联系方式', num: '' },
        // { name: '家庭成员信息', num: '' },
        // { name: '学习经历', num: '' },
        // { name: '工作经历', num: '' }
      ],
      current: 0,
      tableData: [],
      isEdit: false,
      dialogVisible: false,
      textarea: "", // 退回原因
      throughDialogV: false,
      detailInfo: {
        xsJbxx: {},
        xsTxxx: {},
        xsXjxx: {}, // 学生学籍信息
        xsJtcyxxList: [], // 家庭成员
        xsXxjlList: [], // 学生学习经历
        xsGzjlList: [], // 学生工作经历
        xsXszpb: {}, // 学生信息照片
        dtailsList: [],
      },
      pyccOps: [],
      dmxjztmOps: [],
      dmmzmOps: [],
      zzmmOps: [],
      xzOps: [],
      dmxbmOPs: [],
      xslbOps: [],
      zxjhmOps: [],
      allDwh: [],
      zyOps: [],
      bjOps: [],
      jgOps: [], //籍贯 出生地
      gjdqOps: [], //国籍地区 来源地区
      dmsfzjlxm: [], // 身份证类型
      dmhyzkm: [], // 婚姻状况
      gatqwm: [], // 港澳台侨外
      dmrxfsm: [], // 入学方式
      dmjdfsm: [], // 就读方式
      hdxlfsm: [], // 获得学历方式
      dmpyfsm: [], // 培养方式
      dmxxfsm: [], // 学习方式
      dmyjszyxwlbm: [], // 专业学位类别
      dmsfbzm: [], //  是否毕业 是否学分制 是否师范生
    };
  },
  props: {
    active: {
      type: String | Number,
      default: "",
    },
  },
  created() {
    this.schooling = this.$route.query.schooling;
  },
  mounted() {
    this.getCode("dmxbm"); // 性别码
    this.getCode("dmmzm"); // 民 族
    this.getCode("dmxjztm"); // 学籍状态
    this.getCode("dmpyccm"); // 培养层次
    this.getCode("dmzzmmm"); // 政治面貌
    this.getCode("dmxz"); // 学 制
    this.getCode("dmxslbm"); // 学生类别
    this.getCode("dmyjszxjhm"); // 专项计划码
    this.getCode("dmxzqhm"); // 籍贯
    this.getCode("dmsjgghdqmcm"); // 国籍地区 来源地区
    this.getCode("dmsfzjlxm"); // 身份证类型
    this.getCode("dmhyzkm"); // 婚姻状况
    this.getCode("gatqwm"); // 港澳台侨外
    this.getCode("dmsfbzm"); // 是否毕业 是否学分制 是否师范生
    // this.getCode("dmrxfsm"); // 入学方式
    // this.getCode("dmjdfsm"); // 就读方式
    // this.getCode("hdxlfsm"); // 获得学历方式
    // this.getCode("dmpyfsm"); // 培养方式
    // this.getCode("dmxxfsm"); // 学习方式
    // this.getCode("dmyjszyxwlbm"); // 专业学位类别
    this.getDetailQueryPoliticalWorkList();
    this.isSh = this.$route.query.isSh ? this.$route.query.isSh : 2;
    console.log("this.isSh", this.isSh);
  },

  methods: {
    save() {
      this.$set(this.detailInfo, "id", this.$route.query.id);
      let data = this.detailInfo;
      console.log("this.detailInfo", this.detailInfo);
      //0必填和空的校验
      if (data.xsJbxx.xh_approveFlag == 0 && !data.xsJbxx.xh) {
        this.$message.error("学号不能为空");
      } else if (data.xsJbxx.xm_approveFlag == 0 && !data.xsJbxx.xm) {
        this.$message.error("姓名不能为空");
      } else if (data.xsTxxx.yddh_approveFlag == 0 && !data.xsTxxx.yddh) {
        this.$message.error("移动电话不能为空"); //
      } else if (data.xsTxxx.dzyx_approveFlag == 0 && !data.xsTxxx.dzyx) {
        this.$message.error("电子邮箱不能为空"); //
      } else if (data.xsTxxx.qqhm_approveFlag == 0 && !data.xsTxxx.qqhm) {
        this.$message.error("QQ号码不能为空"); //
      } else if (
        data.xsTxxx.jtzz_approveFlag == 0 &&
        !data.xsTxxx.jtzz &&
        this.schooling == 1
      ) {
        this.$message.error("家庭住址不能为空"); //
      } else if (data.xsTxxx.jtdh_approveFlag == 0 && !data.xsTxxx.jtdh) {
        this.$message.error("家庭电话不能为空"); //
      } else if (
        data.xsTxxx.jtyzbm_approveFlag == 0 &&
        !data.xsTxxx.jtyzbm &&
        this.schooling == 1
      ) {
        this.$message.error("家庭邮编不能为空"); //
        // } else if (data.xsTxxx.yzbm_approveFlag == 0 && !data.xsTxxx.yzbm) {
        //   this.$message.error("邮政编码不能为空");
      } else if (data.xsJbxx.csdm_approveFlag == 0 && !data.xsJbxx.csdm) {
        this.$message.error("生源地区不能为空");
      } else if (data.xsJbxx.csrq_approveFlag == 0 && !data.xsJbxx.csrq) {
        this.$message.error("出生日期不能为空");
      } else if (data.xsJbxx.gjdqm_approveFlag == 0 && !data.xsJbxx.gjdqm) {
        this.$message.error("户口所在地不能为空");
      } else if (data.xsJbxx.jg_approveFlag == 0 && !data.xsJbxx.jg) {
        this.$message.error("籍贯不能为空");
      } else if (data.xsJbxx.mzm_approveFlag == 0 && !data.xsJbxx.mzm) {
        this.$message.error("民族不能为空");
      } else if (data.xsJbxx.sfzjh_approveFlag == 0 && !data.xsJbxx.sfzjh) {
        this.$message.error("身份证件号不能为空");
      } else if (data.xsJbxx.xbm_approveFlag == 0 && !data.xsJbxx.xbm) {
        this.$message.error("性别不能为空");
        // } else if (data.xsGzjlList.gzdw_approveFlag == 0 && !data.xsGzjlList.gzdw) {
        //   this.$message.error("工作单位不能为空");
        // } else if (data.xsGzjlList.gznr_approveFlag == 0 && !data.xsGzjlList.gznr) {
        //   this.$message.error("工作内容不能为空");
        // } else if (
        //   data.xsGzjlList.gzzmrdw_approveFlag == 0 &&
        //   !data.xsGzjlList.gzzmrdw
        // ) {
        //   this.$message.error("工作证明人单位不能为空");
        // } else if (
        //   data.xsJtcyxxList.cygzdw_approveFlag == 0 &&
        //   !data.xsJtcyxxList.cygzdw
        // ) {
        //   this.$message.error("成员工作单位不能为空");
        // } else if (
        //   data.xsJtcyxxList.cysfzh_approveFlag == 0 &&
        //   !data.xsJtcyxxList.cysfzh
        // ) {
        //   this.$message.error("成员身份证号不能为空");
        // } else if (
        //   data.xsJtcyxxList.cyxm_approveFlag == 0 &&
        //   !data.xsJtcyxxList.cyxm
        // ) {
        //   this.$message.error("家庭成员不能为空");
        // } else if (data.xsJtcyxxList.gxm_approveFlag == 0 && !data.xsJtcyxxList.gxm) {
        //   this.$message.error("关系不能为空");
        // } else if (
        //   data.xsJtcyxxList.yddh_approveFlag == 0 &&
        //   !data.xsJtcyxxList.yddh
        // ) {
        //   this.$message.error("单位电话不能为空");
      } else if (data.xsXjxx.bjm_approveFlag == 0 && !data.xsXjxx.bjm) {
        this.$message.error("班级不能为空");
      } else if (data.xsXjxx.dwh_approveFlag == 0 && !data.xsXjxx.dwh) {
        this.$message.error("学院不能为空");
      } else if (data.xsXjxx.nj_approveFlag == 0 && !data.xsXjxx.nj) {
        this.$message.error("年级不能为空");
      } else if (data.xsXjxx.xjzt_approveFlag == 0 && !data.xsXjxx.xjzt) {
        this.$message.error("学籍状态不能为空");
      } else if (data.xsXjxx.xz_approveFlag == 0 && !data.xsXjxx.xz) {
        this.$message.error("学制不能为空");
      } else if (data.xsXjxx.zydm_approveFlag == 0 && !data.xsXjxx.zydm) {
        this.$message.error("专业不能为空");
      }
      // else if (
      //   data.xsXxjlList.sxzymc_approveFlag == 0 &&
      //   !data.xsXxjlList.sxzymc
      // ) {
      //   this.$message.error("所学专业名称不能为空");
      // } else if (data.xsXxjlList.xxnr_approveFlag == 0 && !data.xsXxjlList.xxnr) {
      //   this.$message.error("学习内容不能为空");
      // } else if (data.xsXxjlList.xxzmr_approveFlag == 0 && !data.xsXxjlList.xxzmr) {
      //   this.$message.error("学习证明人不能为空");
      // }
      // else if (data.xsTxxx.wxhm_approveFlag == 0 && !data.xsTxxx.wxhm) {
      //   this.$message.error("微信号不能为空");
      // } else if (data.xsTxxx.txdz_approveFlag == 0 && !data.xsTxxx.txdz) {
      //   this.$message.error("通信地址不能为空");
      // } else if (data.xsTxxx.czdh_approveFlag == 0 && !data.xsTxxx.czdh) {
      //   this.$message.error("传真电话不能为空");
      // } else if (data.xsTxxx.jtdzxx_approveFlag == 0 && !data.xsTxxx.jtdzxx) {
      //   this.$message.error("家庭Email不能为空");
      // } // else if (data.xsTxxx.wldz_approveFlag == 0 && !data.xsTxxx.wldz) {
      //   this.$message.error("网络地址不能为空");
      // }
      else {
        updateRegStuInfo1(data)
          .then((res) => {
            this.$message({
              message: res.errmsg,
              type: "success",
            });
            // this.$router.push({
            //   path: this.routerFrom,
            // });
          })
          .catch((err) => {
            this.$message.error(err.errmsg);
          });
      }
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
    getAllCollege() {
      getCollege()
        .then((res) => {
          this.allDwh = res.data.rows;
        })
        .catch((err) => {});
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
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      let data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmpyccm": // 培养层次
              this.pyccOps = res.data;
              break;
            case "dmxjztm": //学籍状态
              this.dmxjztmOps = res.data;
              break;
            case "dmmzm": // 民族
              this.dmmzmOps = res.data;
              break;
            case "dmzzmmm": //政治面貌
              this.zzmmOps = res.data;
              break;
            case "dmxz": //学制
              this.xzOps = res.data;
              break;
            case "dmxbm": //性别
              this.dmxbmOPs = res.data;
            case "dmxslbm": //学生类别
              this.xslbOps = res.data;
            case "dmyjszxjhm": //专项计划码
              this.zxjhmOps = res.data;

            case "dmxzqhm": //籍贯和出生地
              this.jgOps = res.data;
              break;
            case "dmsjgghdqmcm": //国籍地区 来源地区
              this.gjdqOps = res.data;
              break;
            case "dmsfzjlxm": //身份证类型
              this.dmsfzjlxm = res.data;
              break;
            case "dmhyzkm": //婚姻状况
              this.dmhyzkm = res.data;
              break;
            case "gatqwm": //港澳台侨外
              this.gatqwm = res.data;
              break;
            case "dmsfbzm": //是否毕业 是否学分制 是否师范生
              this.dmsfbzm = res.data;
              break;
            case "dmrxfsm": //入学方式
              this.dmrxfsm = res.data;
              break;
            case "dmjdfsm": //就读方式
              this.dmjdfsm = res.data;
              break;
            case "hdxlfsm": //获得学历方式
              this.hdxlfsm = res.data;
              break;
            case "dmpyfsm": //培养方式
              this.dmpyfsm = res.data;
              break;
            case "dmxxfsm": //学习方式
              this.dmxxfsm = res.data;
              break;
            case "dmyjszyxwlbm": //专业学位类别
              this.dmyjszyxwlbm = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    // 左侧list
    handleList(index, tag) {
      this.current = index;
      var id = "#" + tag + "_" + index;
      // console.log(id)
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },
    getDetailQueryPoliticalWorkList() {
      console.log(11111);
      let data = { XH: this.$route.query.xh, id: this.$route.query.id };
      getStuInfoFlowUpdatePage(data)
        .then((res) => {
          // console.log(res.data,'res.data')
          this.$set(
            this.detailInfo,
            "xsJbxx",
            res.data.xsJbxxMap ? res.data.xsJbxxMap : {}
          );
          this.$set(
            this.detailInfo,
            "xsTxxx",
            res.data.xsTxxxMap ? res.data.xsTxxxMap : {}
          );
          this.$set(
            this.detailInfo,
            "xsXjxx",
            res.data.xsXjxxMap ? res.data.xsXjxxMap : {}
          );
          this.$set(this.detailInfo, "xsJtcyxxList", res.data.xsJtcyxxListMap);
          this.$set(this.detailInfo, "xsXxjlList", res.data.xsXxjlListMap);
          this.$set(this.detailInfo, "xsGzjlList", res.data.xsGzjlListMap);
          this.$set(
            this.detailInfo,
            "xsXszpb",
            res.data.xsXszpbMap ? res.data.xsXszpbMap : {}
          );
          this.$set(this.detailInfo, "dtailsList", res.data.modelColNum);
          this.getAllCollege(this.detailInfo.xsXjxx.dwh);
          this.getZY([this.detailInfo.xsXjxx.dwh]);
          this.getBJ([this.detailInfo.xsXjxx.dwh]);
        })
        .catch((err) => {});
    },
    // 打开退回弹窗
    handleBack() {
      this.dialogVisible = true;
      this.textarea = "";
    },
    // 退回取消
    handleClose() {
      this.dialogVisible = false;
      this.textarea = "";
    },
    // 退回确认
    handleConfirm() {
      if (this.textarea == "") {
        this.$message({
          message: "请输入退回理由!",
          type: "warning",
        });
      } else {
        this.dialogVisible = false;
        let data = {
          id: this.$route.query.id,
          approver: this.$route.query.approver,
          rollbackReason: this.textarea,
        };
        backFlow(data)
          .then((res) => {
            this.textarea = "";
            this.$emit("parendFn", "th");
          })
          .catch((err) => {});
      }
    },
    // 通过确定
    handleConThrou() {
      this.throughDialogV = false;
      let data = [
        {
          id: this.$route.query.id,
          xh: this.$route.query.xh,
          approver: this.$route.query.approver,
        },
      ];
      passFlow(data)
        .then((res) => {
          this.$message({
            message: res.errmsg,
            type: "success",
          });
          this.$emit("parendFn", "tg");
        })
        .catch((err) => {});
    },
    // 通过弹窗
    handleThrough() {
      this.throughDialogV = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px 0;
  box-sizing: border-box;
  .greenColor {
    color: #005657 !important;
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
        .item {
          ::v-deep.el-badge__content.is-fixed {
            top: 20px;
            right: -16px;
          }
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
      .dialogMsg {
        font-weight: 400;
        font-size: 16px;
        color: #1f1f1f;
        line-height: 28px;
      }
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
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .backIcon {
        background: url("~@/assets/images/no.png");
      }
      .throughIcon {
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
  }
}
</style>
