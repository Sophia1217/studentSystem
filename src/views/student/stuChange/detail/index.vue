<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
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
      <div class="detail_right">
        <div class="right_top">
          <p class="title">个人异动情况</p>
          <div class="timeWrap">
            <span>创建时间：2022-03-23 23:21:34 </span>
            <span class="updataTime">更新时间：2022-03-23 23:21:34</span>
          </div>
        </div>
        <div class="headline" id="tag_0">基本信息</div>
        <div class="tableStyle">
          <!-- 相片 -->
          <div class="imgWrap">
            <div class="photo">
              <img src="" alt="" />
            </div>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.xh }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.xm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.pyccm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养单位</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.dwh }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.zydm }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.bjm }}
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">异动类别</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.ydlbm }}
                  </div>
                  <!-- <div v-else class="content">
                    <el-select
                      v-model="infoRes.stuStatusChangeInfoJbxxRes.ydlbm"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in ydlbmOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.dm"
                      >
                      </el-option>
                    </el-select>
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">异动日期</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.ydrq }}
                  </div>
                  <!-- <div v-else class="content">
                    <el-date-picker
                      v-model="infoRes.stuStatusChangeInfoJbxxRes.ydrq"
                      value-format="yyyy-MM-dd"
                    />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">异动说明</div>
                  <div class="content">
                    {{ infoRes.stuStatusChangeInfoJbxxRes.ydsm }}
                  </div>
                  <!-- <div v-else class="content">
                    <el-input
                      v-model="infoRes.stuStatusChangeInfoJbxxRes.ydsm"
                    />
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_1">学籍异动信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">异动来源学校</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[0].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[0].ydqsx }}
                  </div>
                  <!-- <div v-else class="content">
                    <el-input
                      v-model="infoRes.stuStatusChangeInfoJbxxRes.ydsm"
                    />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">异动去向学校</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[0].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[0].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.ydqxxx"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原单位号</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[1].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[1].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现单位号</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[1].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[1].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.xdwh"
                      size="small"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dwhOps"
                        :key="item.dm"
                        :label="item.dm"
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
                  <div class="title">原培养单位</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[2].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[2].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现培养单位</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[2].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[2].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.xdwmc"
                      size="small"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in dwhOps"
                        :key="item.dm"
                        :label="item.mc"
                        :value="item.mc"
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
                  <div class="title">原专业代码</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[3].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[3].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现专业代码</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[3].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[3].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xzydm"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原专业名称</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[4].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[4].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现专业名称</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[4].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[4].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xzymc"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原年级</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[5].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[5].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现年级</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[5].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[5].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xnj"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原导师号</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[6].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[6].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现导师号</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[6].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[6].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xdsh"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原导师姓名</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[7].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[7].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现导师姓名</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[7].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[7].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xdsxm"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原培养类别</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[8].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[8].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现培养类别</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[8].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[8].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xpylb"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原班级号</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[9].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[9].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现班级号</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[9].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[9].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.xbh"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学制</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[10].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[10].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现学制</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[10].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[10].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.ydhxz"
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
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原在校状态</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[11].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[11].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现在校状态</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[11].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[11].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.sfzx"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zxztOps"
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
                  <div class="title">原学期</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[12].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[12].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现学期</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[12].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[12].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.ydsxxqm"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xqOps"
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
                  <div class="title">原学年</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[13].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[13].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现学年</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[13].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[13].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-input
                      v-model="infoRes.xsXjyd.ydsxxnm"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学籍状态</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[14].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[14].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现学籍状态</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[14].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[14].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.ydhxjzt"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in xjztOps"
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
                  <div class="title">原培养层次</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[15].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[15].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现培养层次</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[15].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[15].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.ydhpyccm"
                      size="small"
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原师范生类别</div>
                  <div
                    class="content"
                    :class="
                      infoRes.xjydFormatList[16].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[16].ydqsx }}
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">现师范生类别</div>
                  <div
                    v-if="isEdit == 1"
                    class="content"
                    :class="
                      infoRes.xjydFormatList[16].isRed == 1 ? 'redcontent' : ''
                    "
                  >
                    {{ infoRes.xjydFormatList[16].ydhsx }}
                  </div>
                  <div v-else class="content">
                    <el-select
                      v-model="infoRes.xsXjyd.ydhsfslx"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in sfslbOps"
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

        <div class="headline" id="tag_2">审批信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">操作人</div>
                  <div class="content">{{ infoRes.xsXjyd.ydczrgh }}</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">审批日期</div>
                  <div class="content">{{ infoRes.xsXjyd.sprq }}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">审批状态</div>
                  <div class="content">{{ infoRes.xsXjyd.spztm }}</div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">审批文号</div>
                  <div class="content">{{ infoRes.xsXjyd.spwh }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEdit != 2" class="editBottom">
      <div class="btn editIcon" @click="editButtonClick">编辑</div>
      <div v-if="isConfirm == 1" class="btn cancel" @click="confirmButtonClick">
        确认
      </div>
    </div>

    <div v-if="isEdit == 2" class="editBottom">
      <div class="btn cancel" @click="handleCancle">取消</div>
      <div class="btn confirm" @click="handleUpdata">保存</div>
    </div>
  </div>
</template>

<script>
import {
  showStuStatusChangeInfoRes,
  updateStuStatusChangeInfo,
  confirm,
} from "@/api/student/stuChange";
import { getCodeInfoByEnglish } from "@/api/student/fieldSettings";
import { getCollege, getGrade } from "@/api/class/maintenanceClass";
export default {
  name: "detail",

  data() {
    return {
      dtailsList: ["基本信息", "学籍异动信息", "审核信息"],
      current: 0,
      infoRes: {},
      pyccOps: [],
      xzOps: [],
      xjztOps: [],
      dwhOps: [],
      sfslbOps: [],
      njOps: [],
      zxztOps: [],
      xqOps: [],
      changeInfo: {},
      isEdit: 1,
    };
  },
  created() {
    //this.xh = this.$route.query.xh;
    this.id = this.$route.query.id;
    this.isConfirm = this.$route.query.isConfirm;
  },
  mounted() {
    this.getCode("dmpyccm");
    this.getCode("dmxz");
    this.getCode("dmxjztm");
    this.getCode("dmxqm");
    this.getCode("dmzxztm");
    this.getCode("dmzxztm");
    this.getCode("dmsfslxm");
    this.getshowStuStatusChangeInfoRes();
  },

  methods: {
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
            case "dmxz":
              this.xzOps = res.data;
              break;
            case "dmxjztm":
              this.xjztOps = res.data;
              break;
            case "dmxqm":
              this.xqOps = res.data;
              break;
            case "dmzxztm":
              this.zxztOps = res.data;
              break;
            case "dmsfslxm":
              this.sfslbOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    getOption() {
      getCollege()
        .then((res) => {
          this.dwhOps = res.data.rows;
          // console.log("this.allDwh",this.allDwh);
        })
        .catch((err) => {});
      getGrade().then((response) => {
        // 获取年级列表数据
        if (response.errcode == "00") {
          this.njOps = response.data.rows;
        }
      });
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
    //获取详情
    getshowStuStatusChangeInfoRes() {
      let data = { ID: this.id };
      showStuStatusChangeInfoRes(data)
        .then((res) => {
          this.infoRes = res.result;
          console.log(this.infoRes.xjydFormatList[0].isRed);
        })
        .catch((err) => {});
    },
    editButtonClick() {
      this.isEdit = 2; // 控制是否可以编辑的字段
    },
    //确认
    confirmButtonClick() {
      confirm([this.id])
        .then((res) => {
          // this.$message({
          //   message: res.errmsg,
          //   type: "success",
          // });
          // this.$router.push({
          //   path: this.routerFrom,
          // });
          window.history.go(-1);
        })
        .catch((err) => {});
    },
    handleCancle() {
      this.isEdit = 1;
    },
    //保存
    handleUpdata() {
      let data = {
        id: this.id,
        xbh: this.infoRes.xsXjyd.xbh,
        xdsh: this.infoRes.xsXjyd.xdsh,
        xdsxm: this.infoRes.xsXjyd.xdsxm,
        xdwh: this.infoRes.xsXjyd.xdwh,
        xdwmc: this.infoRes.xsXjyd.xdwmc,

        xh: this.infoRes.stuStatusChangeInfoJbxxRes.xh,
        xnj: this.infoRes.xsXjyd.xnj,
        xpylb: this.infoRes.xsXjyd.xpylb,
        xzydm: this.infoRes.xsXjyd.xzydm,
        xzymc: this.infoRes.xsXjyd.xzymc,
        ydhxjzt: this.infoRes.xsXjyd.ydhxjzt,
        ydhpyccm: this.infoRes.xsXjyd.ydhpyccm,
        ydhxz: this.infoRes.xsXjyd.ydhxz,
        ydqxxx: this.infoRes.xsXjyd.ydqxxx,
        ydsxxnm: this.infoRes.xsXjyd.ydsxxnm,
        ydsxxqm: this.infoRes.xsXjyd.ydsxxqm,
        ydhsfslx: this.infoRes.xsXjyd.ydhsfslx,
        status: this.isConfirm == 1 ? "0" : "1",
      };
      updateStuStatusChangeInfo(data)
        .then((res) => {
          this.$message({
            message: res.errmsg,
            type: "success",
          });
          window.history.go(-1);
          // if (this.isConfirm == 1) {
          //   this.isEdit = 1;
          // } else {
          //
          // }
        })
        .catch((err) => {});
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
          padding: 0 10px;
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
              height: 40px;
              margin-top: 0px;
              display: flex;
              align-items: center;
            }
            .redcontent {
              font-weight: 400;
              font-size: 14px;
              color: #ff0000;
              line-height: 22px;
              margin-left: 16px;
              height: 40px;
            }
            .changColor {
              color: #f17056;
            }
            .redcontent {
              color: #ff0000 !important;
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
