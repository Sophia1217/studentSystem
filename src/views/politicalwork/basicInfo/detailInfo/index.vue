<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div>
          <div
            v-for="(item, index) in dtailsList"
            :key="index"
            class="list"
            :class="index == current ? 'active' : ''"
            @click="handleList(index, 'tag')"
          >
            <div class="ellipsis">{{ item }}</div>
            <i :class="index == current ? 'el-icon-arrow-right' : ''" />
          </div>
        </div>
      </div>
      <!-- <div v-if="detailInfoData.zgZgjbxxes !== null && detailInfoData.zgZgjbxxes.length>0" class="detail_right"> -->
      <div class="detail_right">
        <div class="right_top">
          <p class="title">政工干部基本信息</p>
          <div class="timeWrap">
            <span>创建时间：{{ detailInfoData.createTime }} </span>
            <span class="updataTime"
              >更新时间：{{ detailInfoData.updateTime }}</span
            >
          </div>
        </div>
        <!-- <div class="headline"> -->
        <div id="tag_0" class="headline">基本信息</div>
        <!-- <div v-if="isEdit ==2" class="editBtn" @click="saveBasicInfoData"><i class="addIcon" /> 保存</div> -->
        <!-- </div> -->
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo" v-if="detailInfoData.zgZps != null">
              <img :src="detailInfoData.zgZps.zp" alt="照片" />
              <!-- <img src="" alt=""> -->
            </div>
            <div class="photo" v-else>
              <img src="" alt="" />
              <!-- <img src="" alt=""> -->
            </div>
          </div>

          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工号</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.gh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.GH == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.gh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.gh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.xm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.XM == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.xm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.xm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.cym }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.CYM == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.cym"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.cym"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.xbm == "1" ? "男" : "女" }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.xbm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xbmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.XBM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.dwh }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.dwh"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in dwhOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.DWH == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.dwh"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in dwhOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.dwh"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in dwhOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.csrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.CSRQ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.csrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.csrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div class="content">
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.jg"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in jgOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.JG == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.jg"
                        placeholder=""
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in jgOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.jg"
                        placeholder=""
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in jgOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.mzm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.mzm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in mzmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.MZM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.mzm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in mzmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.mzm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in mzmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.zzmmm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.zzmmm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in zzmmmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.ZZMMM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zzmmm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in zzmmmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zzmmm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in zzmmmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.gjdqm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.gjdqm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in gjdqmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.GJDQM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.gjdqm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in gjdqmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.gjdqm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in gjdqmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.sfzjlxm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.sfzjlxm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in sfzjlxmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.SFZJLXM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.sfzjlxm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in sfzjlxmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.sfzjlxm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in sfzjlxmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.sfzjh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.SFZJH == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.sfzjh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.sfzjh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.hyzkm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.hyzkm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in hyzkmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.HYZKM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.hyzkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in hyzkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.hyzkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in hyzkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">最高学历码</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.zgxlm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.zgxlm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in zgxlmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.ZGXLM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxlm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in zgxlmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxlm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in zgxlmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">教职工人员类别</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.jzgrylbm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.jzgrylbm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in jzgrylbmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.JZGRYLBM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.jzgrylbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in jzgrylbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.jzgrylbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in jzgrylbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员总分类</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.ryzfl }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.ryzfl"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in ryzflOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.RYZFL == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.ryzfl"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in ryzflOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.ryzfl"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in ryzflOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员岗位状态</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.rygwztm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.rygwztm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in rygwztmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.RYGWZTM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.rygwztm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in rygwztmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.rygwztm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in rygwztmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学科类别</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.xklbm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.xklbm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xklbmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.XKLBM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xklbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xklbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xklbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xklbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">一级学科</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.yjxkm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.yjxkm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in yjxkmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.YJXKM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.yjxkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in yjxkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.yjxkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in yjxkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">二级学科</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.ejxkm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.ejxkm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in ejxkmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.EJXKM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.ejxkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in ejxkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.ejxkm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in ejxkmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.xy }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.xy"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xyOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.XY == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xyOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.xy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xyOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校及单位</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.byxxjdw }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.BYXXJDW == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.byxxjdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.byxxjdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参加工作日期</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.cjgzrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.CJGZRQ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.cjgzrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.cjgzrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来校日期</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.lxrq }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.LXRQ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.lxrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.lxrq"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参保类型</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.cblbm }} -->
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.cblbm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in cblbmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.CBLBM == 2">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.cblbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in cblbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.cblbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in cblbmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">社保号</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.sbh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.SBH == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.sbh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.sbh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办公电话</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.bgdh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.BGDH == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bgdh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bgdh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.yddh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.YDDH == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.yddh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.yddh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.dzyx }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.DZYX == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.dzyx"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.dzyx"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">离校审批通过时间</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.lxsptgsj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.LXSPTGSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.lxsptgsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.lxsptgsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办理离校手续时间</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.bllxsxsj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.BLLXSXSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bllxsxsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bllxsxsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工资停发时间</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.gztfsj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.GZTFSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.gztfsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.gztfsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">调往单位</div>
                  <div class="content">
                    {{ detailInfoData.zgZgjbxxes.dwdw }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgZgjbxxesAuth.DWDW == 2">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.dwdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.dwdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">
          <div id="tag_1">工作简历</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(1)">
            <i class="addIcon" /> 添加工作经历
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgGzjls" style="width: 100%">
            <el-table-column prop="gzqsrq" label="起始时间">
              <template slot-scope="scope">
                <div>{{ scope.row.gzqsrq }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.GZQSRQ == 2">
                    <el-input
                      v-model="scope.row.gzqsrq"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.gzqsrq"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzzrq" label="终止时间">
              <template slot-scope="scope">
                <div>{{ scope.row.gzzzrq }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.GZZZRQ == 2">
                    <el-input
                      v-model="scope.row.gzzzrq"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.gzzzrq"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
                <div>{{ scope.row.gzdw }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.GZDW == 2">
                    <el-input
                      v-model="scope.row.gzdw"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.gzdw"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gznr" label="工作内容">
              <template slot-scope="scope">
                <div>{{ scope.row.gznr }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.GZNR == 2">
                    <el-input
                      v-model="scope.row.gznr"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.gznr"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zw" label="职位">
              <template slot-scope="scope">
                <div>{{ scope.row.zw }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.ZW == 2">
                    <el-input
                      v-model="scope.row.zw"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zw"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwmc" label="曾任党政职务">
              <template slot-scope="scope">
                <div>{{ scope.row.crdzzwmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.CRDZZWMC == 2">
                    <el-input
                      v-model="scope.row.crdzzwmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.crdzzwmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crzyjszwm" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.crzyjszwm }} -->

                  <el-select
                    v-model="scope.row.crzyjszwm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in crzyjszwmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.CRZYJSZWM == 2">
                    <el-select
                      v-model="scope.row.crzyjszwm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in crzyjszwmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.crzyjszwm"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in crzyjszwmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmr" label="工作证明人">
              <template slot-scope="scope">
                <div>{{ scope.row.gzzmr }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.GZZMR == 2">
                    <el-input
                      v-model="scope.row.gzzmr"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.gzzmr"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="bz" label="备注">
              <template slot-scope="scope">
                <div>{{ scope.row.bz }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgGzjlsAuth.BZ == 2">
                    <el-input
                      v-model="scope.row.bz"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.bz"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'a')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div id="tag_2" class="headline">学历学位信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学时间</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.rxsj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.RXSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.rxsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.rxsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业时间</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.bysj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.BYSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.bysj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.bysj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学制</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XZ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xz"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xz"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习方式码</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.xxfsm }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.xxfsm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xxfsmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XXFSM == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.xxfsm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xxfsmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.xxfsm"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in xxfsmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习形式码</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.xxxsm }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.xxxsm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xxxsmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XXXSM == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.xxxsm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xxxsmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.xxxsm"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in xxxsmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否当前最高学历</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.sfdqzgxlm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SFDQZGXLM == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.sfdqzgxlm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.sfdqzgxlm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学历获得时间</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xlhdsj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XLHDSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xlhdsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xlhdsj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学历证书号</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xlzsh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XLZSH == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xlzsh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xlzsh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.sxzym }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.sxzym"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in sxzymOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SXZYM == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.sxzym"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in sxzymOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.sxzym"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in sxzymOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业描述</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.sxzyms }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SXZYMS == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.sxzyms"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.sxzyms"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校或单位</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.byxxhdw }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.BYXXHDW == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.byxxhdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.byxxhdw"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习证明人</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xxzmr }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XXZMR == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xxzmr"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xxzmr"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.xwm }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.xwm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xwmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XWM == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.xwm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xwmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.xwm"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in xwmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否当前最高学位</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.sfdqzgxwm }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SFDQZGXWM == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.sfdqzgxwm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.sfdqzgxwm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位单位名称</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.sxwdwmc }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SXWDWMC == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.sxwdwmc"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.sxwdwmc"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位国家/地区</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.sxwgjdqm }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.sxwgjdqm"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in sxwgjdqmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.SXWGJDQM == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.sxwgjdqm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in sxwgjdqmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.sxwgjdqm"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in sxwgjdqmOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位授予时间</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xwsysj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XWSYSJ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xwsysj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xwsysj"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位证书号</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.xwzsh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XWZSH == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.xwzsh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.xwzsh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div class="content">
                    <!-- {{ detailInfoData.zgXlxws.xy }} -->
                    <el-select
                      v-model="detailInfoData.zgXlxws.xy"
                      placeholder=""
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in xyOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.XY == 2">
                      <el-select
                        v-model="detailInfoData.zgXlxws.xy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="item in xyOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                    <div v-else>
                      <el-select
                        v-model="detailInfoData.zgXlxws.xy"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in xyOps"
                          :key="item.dm"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div class="content">
                    {{ detailInfoData.zgXlxws.bz }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <div v-if="zgXlxwsAuth.BZ == 2">
                      <el-input
                        v-model="detailInfoData.zgXlxws.bz"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="true"
                      />
                    </div>
                    <div v-else>
                      <el-input
                        v-model="detailInfoData.zgXlxws.bz"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="false"
                      />
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div id="tag_3" class="headline">
          <div>专业技术职务</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(2)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgZyjszws" style="width: 100%">
            <el-table-column prop="zjzcdm" label="专技职称代码">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.zjzcdm }} -->
                  <el-select
                    v-model="scope.row.zjzcdm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in zjzcdmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.ZJZCDM == 2">
                    <el-select
                      v-model="scope.row.zjzcdm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in zjzcdmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.zjzcdm"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in zjzcdmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zjzcsj" label="专技职称时间">
              <template slot-scope="scope">
                <div>{{ scope.row.zjzcsj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.ZJZCSJ == 2">
                    <el-input
                      v-model="scope.row.zjzcsj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zjzcsj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prgwxlm" label="聘任岗位系列">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.prgwxlm }} -->
                  <el-select
                    v-model="scope.row.prgwxlm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in prgwxlmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.PRGWXLM == 2">
                    <el-select
                      v-model="scope.row.prgwxlm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in prgwxlmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.prgwxlm"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in prgwxlmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prgwdjm" label="聘任岗位等级">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.prgwdjm }} -->
                  <el-select
                    v-model="scope.row.prgwdjm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in prgwdjmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.PRGWDJM == 2">
                    <el-select
                      v-model="scope.row.prgwdjm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.prgwdjm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prrq" label="聘任日期">
              <template slot-scope="scope">
                <div>{{ scope.row.prrq }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.PRRQ == 2">
                    <el-input
                      v-model="scope.row.prrq"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.prrq"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prwh" label="聘任文号">
              <template slot-scope="scope">
                <div>{{ scope.row.prwh }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.PRWH == 2">
                    <el-input
                      v-model="scope.row.prwh"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.prwh"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gwdjm" label="岗位等级">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.gwdjm }} -->
                  <el-select
                    v-model="scope.row.gwdjm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in prgwdjmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.GWDJM == 2">
                    <el-select
                      v-model="scope.row.gwdjm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.gwdjm"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zjdj" label="专技等级">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.zjdj }} -->
                  <el-select
                    v-model="scope.row.zjdj"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in prgwdjmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZyjszwsAuth.ZJDJ == 2">
                    <el-select
                      v-model="scope.row.zjdj"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.zjdj"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in prgwdjmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'b')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_4" class="headline">
          <div>学习培训</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(3)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXxpxes" style="width: 100%">
            <el-table-column prop="pxmc" label="培训名称">
              <template slot-scope="scope">
                <div>{{ scope.row.pxmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.PXMC == 2">
                    <el-input
                      v-model="scope.row.pxmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.pxmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zzdw" label="组织单位">
              <template slot-scope="scope">
                <div>{{ scope.row.zzdw }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.ZZDW == 2">
                    <el-input
                      v-model="scope.row.zzdw"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zzdw"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxdd" label="培训地点">
              <template slot-scope="scope">
                <div>{{ scope.row.pxdd }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.PXDD == 2">
                    <el-input
                      v-model="scope.row.pxdd"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.pxdd"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div>{{ scope.row.qssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.QSSJ == 2">
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div>{{ scope.row.jssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.JSSJ == 2">
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxxz" label="培训性质">
              <template slot-scope="scope">
                <div>{{ scope.row.pxxz }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.PXXZ == 2">
                    <el-input
                      v-model="scope.row.pxxz"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.pxxz"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxjb" label="培训级别">
              <template slot-scope="scope">
                <div>{{ scope.row.pxjb }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXxpxesAuth.PXJB == 2">
                    <el-input
                      v-model="scope.row.pxjb"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.pxjb"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'c')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_5" class="headline">
          <div>年度考核</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(4)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgNdkhs" style="width: 100%">
            <el-table-column prop="khnd" label="考核年度">
              <template slot-scope="scope">
                <div>{{ scope.row.khnd }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgNdkhsAuth.KHND == 2">
                    <el-input
                      v-model="scope.row.khnd"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.khnd"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="khrq" label="考核日期">
              <template slot-scope="scope">
                <div>{{ scope.row.khrq }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgNdkhsAuth.KHRQ == 2">
                    <el-input
                      v-model="scope.row.khrq"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.khrq"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="khjgm" label="考核结果">
              <template slot-scope="scope">
                <div>
                  <!-- {{ scope.row.khjgm }} -->
                  <el-select
                    v-model="scope.row.khjgm"
                    placeholder=""
                    size="small"
                    disabled
                  >
                    <el-option
                      v-for="item in khjgmOps"
                      :key="item.dm"
                      :label="item.mc"
                      :value="item.dm"
                    />
                  </el-select>
                </div>
                <div v-if="isEdit == 2">
                  <div v-if="zgNdkhsAuth.KHJGM == 2">
                    <el-select
                      v-model="scope.row.khjgm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in khjgmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="scope.row.khjgm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="item in khjgmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'd')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div id="tag_6" class="headline">
          <div>奖励表彰信息</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(5)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgJlbzs" style="width: 100%">
            <el-table-column prop="zsh" label="证书号">
              <template slot-scope="scope">
                <div>{{ scope.row.zsh }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.ZSH == 2">
                    <el-input
                      v-model="scope.row.zsh"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zsh"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="hjlx" label="获奖类型">
              <template slot-scope="scope">
                <div>{{ scope.row.hjlx }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.HJLX == 2">
                    <el-input
                      v-model="scope.row.hjlx"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.hjlx"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jxmc" label="奖项名称">
              <template slot-scope="scope">
                <div>{{ scope.row.jxmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.JXMC == 2">
                    <el-input
                      v-model="scope.row.jxmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.jxmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="hjcgmc" label="获奖成果名称">
              <template slot-scope="scope">
                <div>{{ scope.row.hjcgmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.HJCGMC == 2">
                    <el-input
                      v-model="scope.row.hjcgmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.hjcgmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jxjb" label="奖项级别">
              <template slot-scope="scope">
                <div>{{ scope.row.jxjb }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.JXJB == 2">
                    <el-input
                      v-model="scope.row.jxjb"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.jxjb"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="hjsj" label="获奖时间">
              <template slot-scope="scope">
                <div>{{ scope.row.hjsj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.HJSJ == 2">
                    <el-input
                      v-model="scope.row.hjsj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.hjsj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div>{{ scope.row.brwc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.BRWC == 2">
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="bzbm" label="表彰部门">
              <template slot-scope="scope">
                <div>{{ scope.row.bzbm }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJlbzsAuth.BZBM == 2">
                    <el-input
                      v-model="scope.row.bzbm"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.bzbm"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'e')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- TODO：批准部门字段缺失 -->
        <div id="tag_7" class="headline">
          <div>政工科研情况（项目）</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(6)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXmkyqks" style="width: 100%">
            <el-table-column prop="xmmc" label="项目名称">
              <template slot-scope="scope">
                <div>{{ scope.row.xmmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.XMMC == 2">
                    <el-input
                      v-model="scope.row.xmmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.xmmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xmjb" label="项目级别">
              <template slot-scope="scope">
                <div>{{ scope.row.xmjb }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.XMJB == 2">
                    <el-input
                      v-model="scope.row.xmjb"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.xmjb"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xmbh" label="项目编号">
              <template slot-scope="scope">
                <div>{{ scope.row.xmbh }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.XMBH == 2">
                    <el-input
                      v-model="scope.row.xmbh"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.xmbh"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div>{{ scope.row.qssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.QSSJ == 2">
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div>{{ scope.row.jssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.JSSJ == 2">
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sdjf" label="实到经费">
              <template slot-scope="scope">
                <div>{{ scope.row.sdjf }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.SDJF == 2">
                    <el-input
                      v-model="scope.row.sdjf"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.sdjf"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div>{{ scope.row.brwc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.BRWC == 2">
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="批准部门">
              <template slot-scope="scope">
                <div>{{ scope.row.pzbm }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgXmkyqksAuth.PZBM == 2">
                    <el-input
                      v-model="scope.row.pzbm"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.pzbm"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'f')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_8" class="headline">
          <div>政工科研情况（论文）</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(7)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgLwkyqks" style="width: 100%">
            <el-table-column prop="lwmc" label="论文名称">
              <template slot-scope="scope">
                <div>{{ scope.row.lwmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.LWMC == 2">
                    <el-input
                      v-model="scope.row.lwmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.lwmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qkmc" label="期刊名称">
              <template slot-scope="scope">
                <div>{{ scope.row.qkmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.QKMC == 2">
                    <el-input
                      v-model="scope.row.qkmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.qkmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cnkh" label="期刊国内标准编号">
              <template slot-scope="scope">
                <div>{{ scope.row.cnkh }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.CNKH == 2">
                    <el-input
                      v-model="scope.row.cnkh"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.cnkh"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qklx" label="期刊类型">
              <template slot-scope="scope">
                <div>{{ scope.row.qklx }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.QKLX == 2">
                    <el-input
                      v-model="scope.row.qklx"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.qklx"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="fbsj" label="发表时间">
              <template slot-scope="scope">
                <div>{{ scope.row.fbsj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.FBSJ == 2">
                    <el-input
                      v-model="scope.row.fbsj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.fbsj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div>{{ scope.row.brwc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgLwkyqksAuth.BRWC == 2">
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'g')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_9" class="headline">
          <div>政工科研情况（著作）</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(8)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgZzkyqks" style="width: 100%">
            <el-table-column prop="zzmc" label="著作名称">
              <template slot-scope="scope">
                <div>{{ scope.row.zzmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.ZZMC == 2">
                    <el-input
                      v-model="scope.row.zzmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zzmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zzlx" label="著作类型">
              <template slot-scope="scope">
                <div>{{ scope.row.zzlx }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.ZZLX == 2">
                    <el-input
                      v-model="scope.row.zzlx"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.zzlx"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cgssdw" label="成果所属单位">
              <template slot-scope="scope">
                <div>{{ scope.row.cgssdw }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.CGSSDW == 2">
                    <el-input
                      v-model="scope.row.cgssdw"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.cgssdw"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="isbnno" label="ISBN号">
              <template slot-scope="scope">
                <div>{{ scope.row.isbnno }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.ISBNNO == 2">
                    <el-input
                      v-model="scope.row.isbnno"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.isbnno"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cbs" label="出版社">
              <template slot-scope="scope">
                <div>{{ scope.row.cbs }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.CBS == 2">
                    <el-input
                      v-model="scope.row.cbs"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.cbs"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cbsj" label="出版时间">
              <template slot-scope="scope">
                <div>{{ scope.row.cbsj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.CBSJ == 2">
                    <el-input
                      v-model="scope.row.cbsj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.cbsj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div>{{ scope.row.brwc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgZzkyqksAuth.BRWC == 2">
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.brwc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'h')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_10" class="headline">
          <div>政工科研情况（教学情况）</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(9)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgJxkyqks" style="width: 100%">
            <el-table-column prop="kcmc" label="课程名称">
              <template slot-scope="scope">
                <div>{{ scope.row.kcmc }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.KCMC == 2">
                    <el-input
                      v-model="scope.row.kcmc"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.kcmc"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="kclx" label="课程类型">
              <template slot-scope="scope">
                <div>{{ scope.row.kclx }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.KCLX == 2">
                    <el-input
                      v-model="scope.row.kclx"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.kclx"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="kcxz" label="课程性质">
              <template slot-scope="scope">
                <div>{{ scope.row.kcxz }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.KCXZ == 2">
                    <el-input
                      v-model="scope.row.kcxz"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.kcxz"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ksl" label="课时量">
              <template slot-scope="scope">
                <div>{{ scope.row.ksl }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.KSL == 2">
                    <el-input
                      v-model="scope.row.ksl"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.ksl"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="skrs" label="授课人数">
              <template slot-scope="scope">
                <div>{{ scope.row.skrs }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.SKRS == 2">
                    <el-input
                      v-model="scope.row.skrs"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.skrs"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div>{{ scope.row.qssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.QSSJ == 2">
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.qssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div>{{ scope.row.jssj }}</div>
                <div v-if="isEdit == 2">
                  <div v-if="zgJxkyqksAuth.JSSJ == 2">
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="true"
                    />
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.jssj"
                      placeholder="请输入"
                      :disabled="false"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'i')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="editBottom">
          <div class="btn editIcon" @click="editButtonClick">编辑</div>
        </div>

        <div v-if="isEdit == 2" class="editBottom">
          <div class="btn cancel" @click="handleCancle">取消</div>
          <div class="btn confirm" @click="handlUpdata">保存</div>
        </div>
      </div>
      <!-- <div v-else>
        暂无数据
      </div> -->
    </div>
  </div>
</template>

<script>
import {
  getDetailQueryPoliticalWorkList,
  updateDetailQueryPoliticalWorkList,
  getCodeInfoByEnglish,
  queryAllDwh,
} from "@/api/politicalWork/basicInfo";
export default {
  name: "DetailInfo",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.routerFrom = from.fullPath;
    });
  },
  data() {
    return {
      xbmOps: [],
      mzmOps: [],
      zzmmmOps: [],
      sxwgjdqmOps: [],
      sfzjlxmOps: [],
      hyzkmOps: [],
      zgxlmOps: [],
      xwmOps: [],
      jzgrylbmOps: [],
      ryzflOps: [],
      rygwztmOps: [],
      xklbmOps: [],
      yjxkmOps: [],
      ejxkmOps: [],
      xyOps: [],
      cblbmOps: [],
      dwhOps: [],
      gjdqmOps: [],
      sxzymOps: [],
      jgOps: [],

      crzyjszwmOps: [],

      xxfsmOps: [],
      xxxsmOps: [],

      zjzcdmOps: [],
      prgwxlmOps: [],
      prgwdjmOps: [],
      khjgmOps: [],

      zgZgjbxxesAuth: {},
      zgGzjlsAuth: {},
      zgXxpxesAuth: {},
      zgXlxwsAuth: {},
      zgNdkhsAuth: {},
      zgKycgsAuth: {},
      zgLwkyqksAuth: {},
      zgXmkyqksAuth: {},
      zgZyjszwsAuth: {},
      zgJlbzsAuth: {},
      zgJxkyqksAuth: {},
      zgZzkyqksAuth: {},
      routerFrom: "", // 跳转过来的路由
      detailInfoData: {
        zgZgjbxxes: {},
        zgGzjls: [],
        zgXlxws: {}, // 学历学位
        zgZyjszws: [],
        zgXxpxes: [],
        zgNdkhs: [],
        zgJlbzs: [],
        zgXmkyqks: [],
        zgLwkyqks: [],
        zgZzkyqks: [],
        zgJxkyqks: [],
        zgZps: {},
      },
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
      tableData: [],
      isEdit: false,
      value: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.getDetail();
    });
    this.isEdit = this.$route.query.show;
  },
  mounted() {
    this.getCode("dmxbm"); // 性别码
    this.getCode("dmmzm"); // 民族码
    this.getCode("dmxzqhm"); // 籍贯码
    this.getCode("dmzzmmm"); // 政治面貌码
    this.getCode("dmrsgjdqm"); // 国籍地区码
    this.getCode("dmsfzjlxm"); // 身份证件类型码
    this.getCode("dmrshyzkm"); // 婚姻状况码_公用
    this.getCode("dmrsxlm"); // 学历码
    this.getCode("dmxwm"); // 学位码
    // this.getWorkPlace('dmdwmc') // 单位

    this.getCode("dmrsrylbm"); // 人员类别码
    this.getCode("dmrsryflm"); // 人员总分类
    this.getCode("dmrsgwztm"); // 人员岗位状态
    this.getCode("dmrsxklbm"); // 学科类别
    this.getCode("dmrsxym"); // 学缘
    this.getCode("dmrscblbm"); // 参保类别码

    this.getCode("dmrszyjszwm"); // 曾任专业技术职务码

    this.getCode("dmxxfsm"); // 学习方式码
    this.getCode("dmrsxxxsm"); // 学习形式码
    // this.getCode('dmrsxlm') // 学习方式码
    // this.getCode('dmrsxklbm') // 学习方式码
    // this.getCode('dmxwm') // 学习方式码
    // this.getCode('dmrsgjdqm') // 学习方式码
    // this.getCode('dmrsxym') // 学习方式码

    this.getCode("dmkyzcm"); // 专业职称码
    this.getCode("dmrsprgwxlm"); // 聘任岗位系列码
    this.getCode("dmrsprgwdjm"); // 聘任岗位等级码
    // this.getCode('dmrsprgwdjm') // 岗位等级码
    // this.getCode('dmrsprgwdjm') // 专技等级

    this.getCode("dmrskhjgm"); // 考核结果码

    this.getListWorkPlace(); //单位码表
  },

  methods: {
    // getWorkPlace(data) {
    //   this.getListWorkPlace(data)
    // },

    // getListWorkPlace(paramsData) {
    //   const data = { listWorkPlace: paramsData }
    //   getListWorkPlace(data)
    //     .then((res) => {
    //       this.dwhOps = res.data.rows
    //     })
    //     .catch((err) => {})
    // },
    getListWorkPlace() {
      queryAllDwh()
        .then((res) => {
          this.dwhOps = res.data.rows;
        })
        .catch((err) => {});
    },
    getCode(data) {
      this.getCodeInfoByEnglish(data);
    },
    getCodeInfoByEnglish(paramsData) {
      const data = { codeTableEnglish: paramsData };
      getCodeInfoByEnglish(data)
        .then((res) => {
          switch (paramsData) {
            case "dmxbm":
              this.xbmOps = res.data;
              break;
            case "dmmzm":
              this.mzmOps = res.data;
              break;
            case "dmzzmmm":
              this.zzmmmOps = res.data;
              break;
            case "dmrsgjdqm":
              this.gjdqmOps = res.data;
              this.sxwgjdqmOps = res.data;
              break;
            case "dmsfzjlxm":
              this.sfzjlxmOps = res.data;
              break;
            case "dmrshyzkm":
              this.hyzkmOps = res.data;
              break;
            case "dmrsxlm":
              this.zgxlmOps = res.data;
              break;
            case "dmxwm":
              this.xwmOps = res.data;
              break;
            case "dmrsrylbm":
              this.jzgrylbmOps = res.data;
              break;
            case "dmrsryflm":
              this.rsryflmOps = res.data;
              break;
            case "dmrsgwztm":
              this.rygwztmOps = res.data;
              break;
            case "dmrsxklbm":
              this.xklbmOps = res.data;
              this.yjxkmOps = res.data;
              this.ejxkmOps = res.data;
              this.sxzymOps = res.data;
              break;
            case "dmrsxym":
              this.xyOps = res.data;
              break;
            case "dmrscblbm":
              this.cblbmOps = res.data;
              break;
            case "dmrszyjszwm":
              this.crzyjszwmOps = res.data;
              break;
            case "dmxxfsm":
              this.xxfsmOps = res.data;
              break;
            case "dmrsxxxsm":
              this.xxxsmOps = res.data;
              break;
            case "dmkyzcm":
              this.zjzcdmOps = res.data;
              break;
            case "dmrsprgwxlm":
              this.prgwxlmOps = res.data;
              break;
            case "dmrsprgwdjm":
              this.prgwdjmOps = res.data;
              break;
            case "dmrskhjgm":
              this.khjgmOps = res.data;
              break;
            //籍贯
            case "dmxzqhm":
              this.jgOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    getDetail() {
      // 学历学位;
      const data = {
        gh: this.$route.query.gh
          ? this.$route.query.gh
          : this.$store.getters.gh,
      };
      this.isEdit = 1;
      getDetailQueryPoliticalWorkList(data)
        .then((res) => {
          this.$set(
            this.detailInfoData,
            "zgZgjbxxes",
            res.zgZgjbxxes[0] ? res.zgZgjbxxes[0] : {} // 基本信息  如果接受不到第一个对象，那么就给他一个空对象
          );
          this.$set(
            this.detailInfoData,
            "zgGzjls",
            res.zgGzjls ? res.zgGzjls : {} // 工作简历
          );
          this.$set(
            this.detailInfoData,
            "zgXlxws",
            res.zgXlxws[0] ? res.zgXlxws[0] : {} // 学历学位
          );
          this.$set(
            this.detailInfoData,
            "zgKycgs",
            res.zgKycgs ? res.zgKycgs[0] : {} // 科研成果
          );
          this.$set(
            this.detailInfoData,
            "zgZyjszws",
            res.zgZyjszws ? res.zgZyjszws : {} // 专业技术职务
          );
          this.$set(
            this.detailInfoData,
            "zgXxpxes",
            res.zgXxpxes ? res.zgXxpxes : {} // 学习培训
          );
          this.$set(
            this.detailInfoData,
            "zgNdkhs",
            res.zgNdkhs ? res.zgNdkhs : {} // 年度考核
          );
          this.$set(
            this.detailInfoData,
            "zgJlbzs",
            res.zgJlbzs ? res.zgJlbzs : {} // 奖励表彰
          );
          this.$set(
            this.detailInfoData,
            "zgXmkyqks",
            res.zgXmkyqks ? res.zgXmkyqks : {} // 项目科研情况
          );
          this.$set(
            this.detailInfoData,
            "zgLwkyqks",
            res.zgLwkyqks ? res.zgLwkyqks : {} // 论文科研成果
          );
          this.$set(
            this.detailInfoData,
            "zgZzkyqks",
            res.zgZzkyqks ? res.zgZzkyqks : {} // 著作科研情况
          );
          this.$set(
            this.detailInfoData,
            "zgJxkyqks",
            res.zgJxkyqks ? res.zgJxkyqks : {} // 教学科研情况
          ),
            this.$set(
              this.detailInfoData,
              "zgZps",
              res.zgZps[0] ? res.zgZps[0] : {} // 照片
            );
          this.$set(this.detailInfoData, "updateTime", res.updateTime);
          this.$set(this.detailInfoData, "createTime", res.createTime);
          this.zgZgjbxxesAuth = res.auth.zg_zgjbxxAuth;
          this.zgGzjlsAuth = res.auth.zg_gzjlAuth;
          this.zgXxpxesAuth = res.auth.zg_xxpxAuth;
          this.zgXlxwsAuth = res.auth.zg_xlxwAuth;
          this.zgNdkhsAuth = res.auth.zg_ndkhAuth;
          this.zgKycgsAuth = res.auth.zg_kycgAuth;
          this.zgLwkyqksAuth = res.auth.zg_lwkyqkAuth;
          this.zgXmkyqksAuth = res.auth.zg_xmkyqkAuth;
          this.zgZyjszwsAuth = res.auth.zg_zyjszwAuth;
          this.zgJlbzsAuth = res.auth.zg_jlbzAuth;
          this.zgJxkyqksAuth = res.auth.zg_jxkyqkAuth;
          this.zgZzkyqksAuth = res.auth.zg_zzkyqkAuth;
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
    addDetailInfoData(index) {
      if (index == 1) {
        // 工作简历1
        this.detailInfoData.zgGzjls.push({});
      } else if (index == 2) {
        // 专业技术职务
        this.detailInfoData.zgZyjszws.push({});
      } else if (index == 3) {
        // 学习培训
        this.detailInfoData.zgXxpxes.push({});
      } else if (index == 4) {
        // 年度考核
        this.detailInfoData.zgNdkhs.push({});
      } else if (index == 5) {
        // 奖励表彰信息
        this.detailInfoData.zgJlbzs.push({});
      } else if (index == 6) {
        // 政工科研情况（项目）
        this.detailInfoData.zgXmkyqks.push({});
      } else if (index == 7) {
        // 政工科研情况（论文）
        this.detailInfoData.zgLwkyqks.push({});
      } else if (index == 8) {
        // 政工科研情况（著作）
        this.detailInfoData.zgZzkyqks.push({});
      } else if (index == 9) {
        // 政工科研情况（教学情况）
        this.detailInfoData.zgJxkyqks.push({});
      }
    },
    deleteWorkBrifeData(row, index, flag) {
      if (flag == "a") {
        // 工作简历
        this.detailInfoData.zgGzjls.splice(index, 1);
      } else if (flag == "b") {
        // 专业技术职务
        this.detailInfoData.zgZyjszws.splice(index, 1);
      } else if (flag == "c") {
        // 学习培训
        this.detailInfoData.zgXxpxes.splice(index, 1);
      } else if (flag == "d") {
        // 年度考核是D
        this.detailInfoData.zgNdkhs.splice(index, 1);
      } else if (flag == "e") {
        // 奖励是E
        this.detailInfoData.zgJlbzs.splice(index, 1);
      } else if (flag == "f") {
        // 政工科研情况（项目）
        this.detailInfoData.zgXmkyqks.splice(index, 1);
      } else if (flag == "g") {
        // 政工科研情况（论文）
        this.detailInfoData.zgLwkyqks.splice(index, 1);
      } else if (flag == "h") {
        // 政工科研情况（著作）
        this.detailInfoData.zgZzkyqks.splice(index, 1);
      } else if (flag == "i") {
        // 政工科研情况（教学情况）
        this.detailInfoData.zgJxkyqks.splice(index, 1);
      }
    },
    editButtonClick() {
      this.isEdit = 2; // 控制是否可以编辑的字段
    },
    // 取消
    handleCancle() {
      // this.$router.push({
      //   path: this.routerFrom,
      // });
      this.isEdit = 1;
      this.getDetail();
    },
    // 提交
    handlUpdata() {
      var data = this.detailInfoData;
      updateDetailQueryPoliticalWorkList(data)
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
      flex: 0 0 198px;
      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding: 20px;
      box-sizing: border-box;
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
        .ellipsis {
          width: 150px;
          overflow: hidden; //溢出隐藏
          white-space: nowrap; //禁止换行
          text-overflow: ellipsis; //...
        }
      }
      .active {
        background: #f0f0f0;
        border-radius: 2px;
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
    .editIcon {
      background: #005657;
      color: #fff;
      // background: url('~@/assets/images/icon_edit_white.png');
    }
  }
}
</style>
