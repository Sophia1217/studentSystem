<template>
  <div class="detail">
    <div class="wrap">
    
      <!-- <div class="detail_left" > -->
        <div class="detail_left" v-if="detailInfoData.sffdy===1">
        <el-tabs
          v-model="activeName"
          class="tab_left"
          @tab-click="handleClick"
          tab-position="left"
        >
          <el-tab-pane label="基本信息" name="1"></el-tab-pane>
          <el-tab-pane label="学业成长" name="2"></el-tab-pane>
          <el-tab-pane label="职业发展" name="3"></el-tab-pane>
          <el-tab-pane label="学习培训" name="4"></el-tab-pane>
          <el-tab-pane label="职业资格" name="5"></el-tab-pane>
          <el-tab-pane label="岗位锻炼" name="6"></el-tab-pane>
          <el-tab-pane label="教学科研" name="7"></el-tab-pane>
          <el-tab-pane label="考核评价" name="8"></el-tab-pane>
          <el-tab-pane label="奖励表彰" name="9"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 基本信息 -->
      <div class="detail_right" v-if="activeName == '1'">
      
        <div class="right_top" >
          <p class="title">政工干部基本信息</p>
          <div class="timeWrap">
            <span>创建时间：{{detailInfoData.createTime}} </span>
            <span class="updataTime">更新时间：{{detailInfoData.updateTime}}</span>
          </div>
        </div>
        <div id="tag_0" class="headline">基本信息</div>
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo" v-if="detailInfoData.zgZps != null">
              <img  :src="detailInfoData.zgZps.zp"  alt="照片"> </img>
              
            </div>
            <div class="photo" >
              <img src="" alt=""> </img>
             
            </div>
          </div>

          <div class="information">
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.gh }}
                    </div>
                    <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.gh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="zgZgjbxxesAuth.GH == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.xm }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.xm"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="zgZgjbxxesAuth.XM == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div v-if="isEdit == 1" class="content">
                   <el-select
                      v-model="detailInfoData.zgZgjbxxes.xbm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item,index) in xbmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                   <div v-if="isEdit == 2" class="content">
                    <el-select
                      v-model="detailInfoData.zgZgjbxxes.xbm"
                      placeholder="请选择"
                      size="small"
                     :disabled="zgZgjbxxesAuth.XBM == 2 ||detailInfoData.sfxs==1"
                    >
                      <el-option
                        v-for="(item,index) in xbmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                   </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生年月</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.csrq }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                      <el-date-picker
                        v-model="detailInfoData.zgZgjbxxes.csrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :disabled="zgZgjbxxesAuth.CSRQ == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit == 1" class="content">
                   <el-select
                        v-model="detailInfoData.zgZgjbxxes.zzmmm"
                        placeholder=""
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zzmmmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                 
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zzmmm"
                        placeholder="请选择"
                        size="small"
                         :disabled="zgZgjbxxesAuth.ZZMMM == 2 ||detailInfoData.sfxs==1"
                      >
                        <el-option
                          v-for="(item,index) in zzmmmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.sfzjh }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.sfzjh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="zgZgjbxxesAuth.SFZJH == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学校名称</div>
                  <!-- <div v-if="isEdit == 1" class="content"> -->
                    <div class="content">
                    华中师范大学
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">二级单位</div>
                  <!-- <div v-if="isEdit == 1" class="content"> -->
                    <div  class="content">
                   <el-select
                      v-model="detailInfoData.zgZgjbxxes.rzdwh"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item,index) in rzdwhOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                   <!-- <div v-if="isEdit == 2" class="content">
                   
                      <el-select
                      v-model="detailInfoData.zgZgjbxxes.rzdwh"
                      placeholder="请选择"
                      size="small"
                       :disabled="zgZgjbxxesAuth.RZDWH == 2 "
                    >
                      <el-option
                        v-for="(item,index) in rzdwhOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                    </div> -->
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">行政职务</div>
                  <!-- <div v-if="isEdit == 1" class="content"> -->
                    <div class="content">
                   <el-select
                      v-model="detailInfoData.zgZgjbxxes.zwmcm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item,index) in zwmcmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">行政职务等级</div>
                  <!-- <div v-if="isEdit == 1" class="content"> -->
                     <div class="content">
                   <el-select
                      v-model="detailInfoData.zgZgjbxxes.zwjbm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item,index) in zwjbmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业技术职务</div>
                  <!-- <div v-if="isEdit == 1" class="content"> -->
                    <div  class="content">
                  <el-select
                      v-model="detailInfoData.zgZgjbxxes.zjzcdm"
                      placeholder="请选择"
                      size="small"
                      disabled
                    >
                      <el-option
                        v-for="(item,index) in zjzcdmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                  </div>
                  <!-- <div v-if="isEdit == 2" class="content">                   
                      <el-select
                      v-model="detailInfoData.zgZgjbxxes.zjzcdm"
                      placeholder="请选择"
                      size="small"
                       :disabled="zgZgjbxxesAuth.ZJZCDM== 2 "
                    >
                      <el-option
                        v-for="(item,index) in zjzcdmOps"
                        :key="index"
                        :label="item.mc"
                        :value="item.dm"
                      />
                    </el-select>
                    </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参加工作时间</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.cjgzrq }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                      <el-date-picker
                        v-model="detailInfoData.zgZgjbxxes.cjgzrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgZgjbxxesAuth.CJGZRQ == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">最高学历</div>
                  <div v-if="isEdit == 1" class="content">
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxlm"
                        placeholder=""
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zgxlmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxlm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgZgjbxxesAuth.ZGXLM == 2||detailInfoData.sfxs==1 "
                      >
                        <el-option
                          v-for="(item,index) in zgxlmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业院校</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.byxxjdw }}

                  </div>
                    <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.byxxjdw"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgZgjbxxesAuth.BYXXJDW == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div v-if="isEdit == 1" class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.sxzym }} -->
                    <el-cascader
                      v-model="detailInfoData.zgZgjbxxes.sxzym"
                      :options="sxzymOps"
                      @change="handleChangeZy"
                      disabled
                      :props="OpsProps"
                      filterable
                      :show-all-levels="false"
                    ></el-cascader>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                     <!-- <el-select
                        v-model="detailInfoData.zgZgjbxxes.sxzym"
                        placeholder="请选择"
                        size="small"
                        filterable
                        :disabled="zgZgjbxxesAuth.SXZYM == 2 ||detailInfoData.sfxs==1"
                      >
                        <el-option
                          v-for="(item,index) in sxzymOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select> -->
                       <el-cascader
                      v-model="detailInfoData.zgZgjbxxes.sxzym"
                      :options="sxzymOps"
                      @change="handleChangeZy"
                      :disabled="zgZgjbxxesAuth.SXZYM == 2 ||detailInfoData.sfxs==1"
                      :props="OpsProps"
                      filterable
                      :show-all-levels="false"
                    ></el-cascader>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业类别</div>
                  <div v-if="isEdit == 1" class="content">
                    <el-select
                        v-model="detailInfoData.zgZgjbxxes.zylb"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in zylbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                   <div v-if="isEdit == 2" class="content">
                      <!-- <el-input
                        v-model="detailInfoData.zgZgjbxxes.zylb"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgZgjbxxesAuth.ZYLB == 2||detailInfoData.sfxs==1 "
                      /> -->
                       <el-select
                        v-model="detailInfoData.zgZgjbxxes.zylb"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgZgjbxxesAuth.ZYLB == 2||detailInfoData.sfxs==1 "
                      >
                        <el-option
                          v-for="(item,index) in zylbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">最后学位</div>
                  <div v-if="isEdit == 1" class="content">
                    <!-- {{ detailInfoData.zgZgjbxxes.zgxwm }} -->
                    <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxwm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zgxwmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    <el-select
                        v-model="detailInfoData.zgZgjbxxes.zgxwm"
                        placeholder="请选择"
                        size="small"
                          :disabled="zgZgjbxxesAuth.ZGXWM == 2||detailInfoData.sfxs==1 "
                      >
                        <el-option
                          v-for="(item,index) in zgxwmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">博士后经历</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.bshjl }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bshjl"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgZgjbxxesAuth.BSHJL == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit == 1" class="content">
                    <el-select
                        v-model="detailInfoData.zgZgjbxxes.hyzkm"
                        placeholder=""
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in hyzkmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                    
                      <el-select
                        v-model="detailInfoData.zgZgjbxxes.hyzkm"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgZgjbxxesAuth.HYZKM == 2||detailInfoData.sfxs==1 "
                      >
                        <el-option
                          v-for="(item,index) in hyzkmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">生育状况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.syzk }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.syzk"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgZgjbxxesAuth.SYZK == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办公电话</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.bgdh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">

                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.bgdh"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="zgZgjbxxesAuth.BGDH == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div v-if="isEdit == 1" class="content">
                     {{ detailInfoData.zgZgjbxxes.dzyx }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.dzyx"
                        size="small"
                        placeholder="请输入内容"
                        :disabled="zgZgjbxxesAuth.DZYX == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">手机号码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.yddh }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.yddh"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgZgjbxxesAuth.YDDH == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信账号</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.wxzh }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.wxzh"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgZgjbxxesAuth.WXZH == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">QQ号码</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.qqzh }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.qqzh"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgZgjbxxesAuth.QQZH == 2||detailInfoData.sfxs==1 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮编</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.yb }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.yb"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgZgjbxxesAuth.YB == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">通讯地址</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgZgjbxxes.txdz }}
                  </div>
                   <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgZgjbxxes.txdz"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgZgjbxxesAuth.TXDZ == 2 ||detailInfoData.sfxs==1"
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
          </div>
          </div>

           <div id="tag_1" class="headline" v-if="detailInfoData.sffdy===1">带班情况</div>
           <div class="tableStyle" v-if="detailInfoData.sffdy===1">
            <div class="information">
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">担任辅导员时间</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.drfdysj }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                   
                      <el-input
                        v-model="detailInfoData.zgFdyrms.drfdysj"
                        size="small"
                        placeholder="请输入内容"
                       :disabled="zgFdyrmsAuth.DRFDYSJ == 2 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">岗位性质</div>
                  <div v-if="isEdit == 1" class="content">
                    <el-select
                        v-model="detailInfoData.zgFdyrms.gwxz"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in gwxzOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                  <el-select
                        v-model="detailInfoData.zgFdyrms.gwxz"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgFdyrmsAuth.GWXZ == 2 "
                      >
                        <el-option
                          v-for="(item,index) in gwxzOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                </div>
              </el-col>
             </el-row>
             <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">少数民族学生辅导员</div>
                  <div v-if="isEdit == 1" class="content">
                   <el-select
                        v-model="detailInfoData.zgFdyrms.sfssmzxsfdy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                  <el-select
                        v-model="detailInfoData.zgFdyrms.sfssmzxsfdy"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgFdyrmsAuth.SFSSMZXSFDY == 2 "
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国际学生辅导员</div>
                   <div v-if="isEdit == 1" class="content">
                   <el-select
                        v-model="detailInfoData.zgFdyrms.sfgjxsfdy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                  <el-select
                        v-model="detailInfoData.zgFdyrms.sfgjxsfdy"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgFdyrmsAuth.SFGJXSFDY == 2 "
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                </div>
              </el-col>
             </el-row>
             <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业班辅导员</div>
                   <div v-if="isEdit == 1" class="content">
                   <el-select
                        v-model="detailInfoData.zgFdyrms.sfbybfdy"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  <div v-if="isEdit == 2" class="content">
                  <el-select
                        v-model="detailInfoData.zgFdyrms.sfbybfdy"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgFdyrmsAuth.SFBYBFDY == 2 "
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">带学生情况</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.dxsqk }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgFdyrms.dxsqk"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgFdyrmsAuth.DXSQK == 2 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">带专科生人数</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.dzksrs }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgFdyrms.dzksrs"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgFdyrmsAuth.DZKSRS == 2 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">带本科生人数</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.dbksrs }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgFdyrms.dbksrs"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgFdyrmsAuth.DBKSRS == 2 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
              <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">带研究生人数</div>
                  <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.dyjsrs }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgFdyrms.dyjsrs"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgFdyrmsAuth.DYJSRS == 2 "
                      />
                    </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">带国际学生人数</div>
                 <div v-if="isEdit == 1" class="content">
                    {{ detailInfoData.zgFdyrms.dgjxsrs }}
                  </div>
                  <div v-if="isEdit == 2" class="content">
                      <el-input
                        v-model="detailInfoData.zgFdyrms.dgjxsrs"
                        size="small"
                        placeholder="请输入内容"
                         :disabled="zgFdyrmsAuth.DGJXSRS == 2 "
                      />
                    </div>
                </div>
              </el-col>
             </el-row>
            </div>
      </div>
    </div>
    <!-- 学业成长 -->
    <div class="detail_right" v-if="activeName == '2'&&detailInfoData.sffdy==1">
        <div id="tag_2" class="headline">
          <div>学业成长</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(1)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXlxws" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="xlm" label="学历类型">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.xlm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zgxlmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.xlm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgXlxwsAuth.XLM == 2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in zgxlmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
              </template>
            </el-table-column>   
        
           <el-table-column prop="byxxhdw" label="毕业学校">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.byxxhdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.byxxhdw" placeholder="请输入" :disabled="zgXlxwsAuth.BYXXHDW==2||scope.row.sftb=='0'"/>
                  </div>
              </template>
            </el-table-column>   
            <el-table-column prop="byxxlb" label="毕业学校类型">
              <template slot-scope="scope">
                <!-- <div v-if="isEdit == 1">{{ scope.row.byxxlb }}</div>
                <div v-else>
                  <el-input v-model="scope.row.byxxlb" placeholder="请输入" :disabled="zgXlxwsAuth.BYXXLB==2||scope.row.sftb=='0'"/>
                  </div> -->
                   <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.byxxlb"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in byxxlbOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                 <el-select
                        v-model="scope.row.byxxlb"
                        placeholder="请选择"
                        size="small"
                        filterable
                       :disabled="zgXlxwsAuth.BYXXLB==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in byxxlbOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
              </template>
            </el-table-column> 
            <el-table-column prop="sxzym" label="专业">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">
                       <el-cascader
                      v-model="scope.row.sxzym"
                      :options="sxzymOps"
                      @change="handleChangeZy"
                      disabled
                      :props="OpsProps"
                      filterable
                      :show-all-levels="false"
                    ></el-cascader></div>
                <div v-else>
                      <el-cascader
                      v-model="scope.row.sxzym"
                      :options="sxzymOps"
                      @change="handleChangeZy"
                      :disabled="zgXlxwsAuth.SXZYM == 2 ||scope.row.sftb=='0'"
                      :props="OpsProps"
                      filterable
                      :show-all-levels="false"
                    ></el-cascader>
                      </div>
              </template>
            </el-table-column> 
            <el-table-column prop="bysj" label="毕业时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.bysj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.bysj" placeholder="请输入" :disabled="zgXlxwsAuth.BYSJ==2||scope.row.sftb=='0'"/> -->
                  <el-date-picker
                        v-model="scope.row.bysj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgXlxwsAuth.BYSJ==2||scope.row.sftb=='0'"
                      />
                  </div>
              </template>
            </el-table-column> 
            <el-table-column prop="xz" label="学制">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.xz"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in xzOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                 <el-select
                        v-model="scope.row.xz"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgXlxwsAuth.XZ == 2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in xzOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
              </template>
            </el-table-column> 
            <el-table-column prop="xwm" label="学位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-select
                        v-model="scope.row.xwm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zgxwmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                   <el-select
                        v-model="scope.row.xwm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgXlxwsAuth.XWM == 2||scope.row.sftb=='0' "
                      >
                        <el-option
                          v-for="(item,index) in zgxwmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
              </template>
            </el-table-column> 
            <el-table-column prop="xwsysj" label="学位授予时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xwsysj }}</div>
                <div v-else>
                  <el-date-picker
                        v-model="scope.row.xwsysj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgXlxwsAuth.XWSYSJ==2||scope.row.sftb=='0'"
                      />
                  <!-- <el-input v-model="scope.row.xwsysj" placeholder="请输入" :disabled="zgXlxwsAuth.XWSYSJ==2||scope.row.sftb=='0'"/> -->
                  </div>
                 
              </template>
            </el-table-column> 
              <el-table-column v-if="isEdit == 2" label="" type="fixed">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'a')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <!-- 职业发展 -->
     <div class="detail_right" v-if="activeName == '3'&&detailInfoData.sffdy==1">
        <div id="tag_31" class="headline">
          <div>行政职务</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(2)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgDzzws" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zwmcm" label="行政职务名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.zwmcm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zwmcmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  
                  <el-select
                        v-model="scope.row.zwmcm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgDzzwsAuth.ZWMCM==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in zwmcmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                
              </template>
            </el-table-column>   
            <el-table-column prop="jdhtmrzrq" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jdhtmrzrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jdhtmrzrq" placeholder="请输入" :disabled="zgDzzwsAuth.JDHTMRZRQ==2||scope.row.sftb=='0'"/> -->
                  <el-date-picker
                        v-model="scope.row.jdhtmrzrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change='changeDate(scope.row,1)'
                         :disabled="zgDzzwsAuth.JDHTMRZRQ==2||scope.row.sftb=='0'"
                      />
                  </div>
                
              </template>
            </el-table-column> 
            <el-table-column prop="jdhtmmzdrq" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jdhtmmzdrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jdhtmmzdrq" placeholder="请输入" :disabled="zgDzzwsAuth.JDHTMMZDRQ==2||scope.row.sftb=='0'"/> -->
                  <el-date-picker
                        v-model="scope.row.jdhtmmzdrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         @change='changeDate(scope.row,2)'
                         :disabled="zgDzzwsAuth.JDHTMMZDRQ==2||scope.row.sftb=='0'"
                      />
                  </div>
                  </template>
            </el-table-column> 
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'b')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <div id="tag_34" class="headline">
          <div>行政级别</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(16)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgDzzjs" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zwjbm" label="行政级别发展">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.zwjbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zwjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  
                  <el-select
                        v-model="scope.row.zwjbm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgDzzjsAuth.ZWJBM==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in zwjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                
              </template>
            </el-table-column>   
            <el-table-column prop="zjpzrq" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zjpzrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.zjpzrq" placeholder="请输入" :disabled="zgDzzjsAuth.ZJPZRQ==2||scope.row.sftb=='0'"/> -->
                  <el-date-picker
                        v-model="scope.row.zjpzrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         @change='changeDate(scope.row,3)'
                         :disabled="zgDzzjsAuth.ZJPZRQ==2||scope.row.sftb=='0'"
                      />
                  </div>
                
              </template>
            </el-table-column> 
            <el-table-column prop="zjzzrq" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zjzzrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.zjzzrq" placeholder="请输入" :disabled="zgDzzjsAuth.ZJZZRQ==2||scope.row.sftb=='0'"/> -->
                  <el-date-picker
                        v-model="scope.row.zjzzrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         @change='changeDate(scope.row,4)'
                         :disabled="zgDzzjsAuth.ZJZZRQ==2||scope.row.sftb=='0'"
                      />
                  </div>
                  </template>
            </el-table-column> 
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'p')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
          <div id="tag_32" class="headline">
          <div>专技职称</div>
          <!-- <div v-if="isEdit == 2&&detailInfoData.zgZyjszws.sftb==0" class="editBtn" @click="addDetailInfoData(3)">zjzcdm
            <i class="addIcon" /> 添加
          </div> -->
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgZyjszws" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zjzcdm" label="专业技术职务">
              <template slot-scope="scope">
                 <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.zjzcdm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zjzcdmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.zjzcdm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in zjzcdmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
              </template>
            </el-table-column>   
        
           <el-table-column prop="prrq" label="起始时间">
              <template slot-scope="scope">
                 
                <div v-if="isEdit == 1">{{ scope.row.prrq }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prrq" placeholder="请输入" disabled/>
                  
                  </div>
                  
              </template>
            </el-table-column>   
          
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                 
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="true"/>
                  </div>
              </template>
            </el-table-column> 
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'c')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div id="tag_33" class="headline">
          <div>工作履历</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(4)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgGzjls" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
 <div v-if="isEdit == 1">{{ scope.row.gzdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzdw" placeholder="请输入" :disabled="zgGzjlsAuth.GZDW==2"/>
                  </div>
                
              </template>
            </el-table-column>   
        
           <el-table-column prop="zw" label="职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zw" placeholder="请输入" :disabled="zgGzjlsAuth.ZW==2"/>
                  
                  </div>
                  
              </template>
            </el-table-column>   
          <el-table-column prop="zsh" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzqsrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.gzqsrq" placeholder="请输入" :disabled="zgGzjlsAuth.GZQSRQ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.gzqsrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,5)"
                         :disabled="zgGzjlsAuth.GZQSRQ==2"
                      />
                  </div>
               
              </template>
            </el-table-column> 
            <el-table-column prop="gzzzrq" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gzzzrq }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.gzzzrq" placeholder="请输入" :disabled="zgGzjlsAuth.GZZZRQ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.gzzzrq"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,6)"
                         :disabled="zgGzjlsAuth.GZZZRQ==2"
                      />
                  </div>
                  
              </template>
            </el-table-column> 
           <el-table-column prop="gzgwxz" label="工作岗位性质">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.gzgwxz"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in gwxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.gzgwxz" placeholder="请输入" :disabled="zgGzjlsAuth.GZGWXZ==2"/> -->
                  <el-select
                        v-model="scope.row.gzgwxz"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgGzjlsAuth.GZGWXZ==2"
                      >
                        <el-option
                          v-for="(item,index) in gwxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
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
         <div id="tag_35" class="headline">
          <div>职员职级</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(17)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgPrxxes" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="przwdj" label="聘任职务等级">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.przwdj"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in przwdjOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.przwdj"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgPrxxesAuth.PRZWDJ==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in przwdjOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                </div>
              </template>
            </el-table-column>   
        
           <el-table-column prop="prsj" label="聘任时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.prsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.prsj" placeholder="请输入" :disabled="zgPrxxesAuth.PRSJ==2||scope.row.sftb=='0'"/> -->
                   <el-date-picker
                        v-model="scope.row.prsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgPrxxesAuth.PRSJ==2||scope.row.sftb=='0'"
                      />
                  </div>
                  
              </template>
            </el-table-column> 
            <el-table-column prop="prwh" label="聘任文号">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.prwh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prwh" placeholder="请输入" :disabled="zgPrxxesAuth.PRWH==2||scope.row.sftb=='0'"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="zylb" label="职员类别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zylb }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zylb" placeholder="请输入" :disabled="zgPrxxesAuth.ZYLB==2||scope.row.sftb=='0'"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="jslb" label="晋升类别">
              <template slot-scope="scope">
                 <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.jslb"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in jslbOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.jslb"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgPrxxesAuth.JSLB==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in jslbOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                </div>
                 
              </template>
            </el-table-column>   
             <el-table-column prop="rmbz" label="任免标志">
              <template slot-scope="scope">
                 <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.rmbz"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.rmbz"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgPrxxesAuth.RMBZ==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                </div>
                 
              </template>
            </el-table-column>  
             <el-table-column prop="stateId" label="是否当前状态">
              <template slot-scope="scope">
                 <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.stateId"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <el-select
                        v-model="scope.row.stateId"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgPrxxesAuth.STATE_ID==2||scope.row.sftb=='0'"
                      >
                        <el-option
                          v-for="(item,index) in sfOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                </div>
                 
              </template>
            </el-table-column>  
           
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'q')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <!-- 学习培训 -->
    <div class="detail_right" v-if="activeName == '4'&&detailInfoData.sffdy==1">
        <div id="tag_41" class="headline">
          <div>培训经历</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(5)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXxpxes" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="pxmc" label="培训名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.pxmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxmc" placeholder="请输入" :disabled="zgXxpxesAuth.PXMC==2"/>
                  </div>
                  
              </template>
            </el-table-column>   
        
           <el-table-column prop="zzdw" label="组织单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zzdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzdw" placeholder="请输入" :disabled="zgXxpxesAuth.ZZDW==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="pxdd" label="培训地点">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.pxdd}}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxdd" placeholder="请输入" :disabled="zgXxpxesAuth.PXDD==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qssj" placeholder="请输入" :disabled="zgXxpxesAuth.QSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.qssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,7)"
                         :disabled="zgXxpxesAuth.QSSJ==2"
                      />
                  </div>
               
              </template>
            </el-table-column> 
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="zgXxpxesAuth.JSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.jssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,8)"
                         :disabled="zgXxpxesAuth.JSSJ==2"
                      />
                  </div>
                  
              </template>
            </el-table-column> 
            <el-table-column prop="pxxz" label="培训性质">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-select
                        v-model="scope.row.pxxz"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in zgpxxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.pxxz" placeholder="请输入" :disabled="zgXxpxesAuth.PXXZ==2"/> -->
                  <el-select
                        v-model="scope.row.pxxz"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgXxpxesAuth.PXXZ==2"
                      >
                        <el-option
                          v-for="(item,index) in zgpxxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="pxjb" label="培训级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.pxjb"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in pxjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.pxjb" placeholder="请输入" :disabled="zgXxpxesAuth.PXJB==2"/> -->
                  <el-select
                        v-model="scope.row.pxjb"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgXxpxesAuth.PXJB==2"
                      >
                        <el-option
                          v-for="(item,index) in pxjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
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
        <div id="tag_42" class="headline">
          <div>项目学习</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(6)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXmxxes" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="pxmc" label="项目名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.pxmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxmc" placeholder="请输入" :disabled="zgXmxxesAuth.PXMC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
        
           <el-table-column prop="zzdw" label="组织单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zzdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzdw" placeholder="请输入" :disabled="zgXmxxesAuth.ZZDW==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="xxdd" label="学习地点">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xxdd }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxdd" placeholder="请输入" :disabled="zgXmxxesAuth.XXDD==2"/>
                  </div>
                
              </template>
            </el-table-column> 
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qssj" placeholder="请输入" :disabled="zgXmxxesAuth.QSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.qssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,7)"
                         :disabled="zgXmxxesAuth.QSSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="zgXmxxesAuth.JSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.jssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,8)"
                         :disabled="zgXmxxesAuth.JSSJ==2"
                      />
                  </div>
                  
              </template>
            </el-table-column> 
            <el-table-column prop="xmlb" label="项目类别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xmlb }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmlb" placeholder="请输入" :disabled="zgXmxxesAuth.XMLB==2"/>
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
    </div>
   <!-- 职业资格 -->
     <div class="detail_right" v-if="activeName == '5'&&detailInfoData.sffdy==1">
        <div id="tag_5" class="headline">
          <div>职业资格</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(7)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgZyzgs" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zsmc" label="证书名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-cascader
                      v-model="scope.row.zsmc"
                      :options="zsmcOps"
                      disabled
                      :props="OpsProps"
                    
                    ></el-cascader></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.zsmc" placeholder="请输入" :disabled="zgZyzgsAuth.ZSMC==2"/> -->
                   <el-cascader
                      v-model="scope.row.zsmc"
                      :options="zsmcOps"
                      @change="(val)=>{handleChangeZsmc(val,scope.row)}"
                    :disabled="zgZyzgsAuth.ZSMC==2"
                      :props="OpsProps"
                      filterable
                    ></el-cascader>
                  </div>
                
              </template>
            </el-table-column>   
        
           <el-table-column prop="sydw" label="授予单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.sydw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.sydw" placeholder="请输入" :disabled="zgZyzgsAuth.SYDW==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="hqsj" label="获取时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.hqsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.hqsj" placeholder="请输入" :disabled="zgZyzgsAuth.HQSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.hqsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgZyzgsAuth.HQSJ==2"
                      />
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
    </div>
     <!-- 岗位锻炼 -->
       <div class="detail_right" v-if="activeName == '6'&&detailInfoData.sffdy==1">
        <div id="tag_6" class="headline">
          <div>岗位锻炼</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(8)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgGwdls" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zzdw" label="组织单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zzdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzdw" placeholder="请输入" :disabled="zgGwdlsAuth.ZZDW==2"/>
                  </div>
                
              </template>
            </el-table-column>   
        
           <el-table-column prop="jsdw" label="接收单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-cascader
                      v-model="scope.row.jsdw"
                      :options="jsdwlxOps"
                     
                      disabled
                      :props="OpsProps"
                     
                    ></el-cascader></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jsdw" placeholder="请输入" :disabled="zgGwdlsAuth.JSDW==2"/> -->
                  <el-cascader
                      v-model="scope.row.jsdw"
                      :options="jsdwlxOps"
                      @change="(val)=>{handleChangeJsdwlx(val.scope.row)}"
                      :disabled="zgGwdlsAuth.JSDW==2"
                      :props="OpsProps"
                      filterable
                    ></el-cascader>
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="dlxz" label="锻炼性质">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-select
                        v-model="scope.row.dlxz"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in dlxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.dlxz" placeholder="请输入" :disabled="zgGwdlsAuth.DLXZ==2"/> -->
                   <el-select
                        v-model="scope.row.dlxz"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgGwdlsAuth.DLXZ==2"
                      >
                        <el-option
                          v-for="(item,index) in dlxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="gwmc" label="岗位名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.gwmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gwmc" placeholder="请输入" :disabled="zgGwdlsAuth.GWMC==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
             <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qssj" placeholder="请输入" :disabled="zgGwdlsAuth.QSSJ==2"/> -->
                   <el-date-picker
                        v-model="scope.row.qssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,7)"
                         :disabled="zgGwdlsAuth.QSSJ==2"
                      />
                  </div>
                  
              </template>
            </el-table-column> 
             <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="zgGwdlsAuth.JSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.jssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,8)"
                         :disabled="zgGwdlsAuth.JSSJ==2"
                      />
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
    </div>
     <!-- 教学科研 -->
     <div class="detail_right" v-if="activeName == '7'&&detailInfoData.sffdy==1">
        <div id="tag_71" class="headline">
          <div>教学情况</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(9)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgJxkyqks" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="kcmc" label="课程名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.kcmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.kcmc" placeholder="请输入" :disabled="zgJxkyqksAuth.KCMC==2"/>
                  </div>
                
              </template>
            </el-table-column>   
        
           <el-table-column prop="kclx" label="课程类型">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-select
                        v-model="scope.row.kclx"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in kclxmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.kclx" placeholder="请输入" :disabled="zgJxkyqksAuth.KCLX==2"/> -->
                   <el-select
                        v-model="scope.row.kclx"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgJxkyqksAuth.KCLX==2"
                      >
                        <el-option
                          v-for="(item,index) in kclxmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                
              </template>
            </el-table-column>   
            <el-table-column prop="kcxz" label="课程性质">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.kcxz"
                        placeholder="请选择"
                        size="small"
                       disabled
                      >
                        <el-option
                          v-for="(item,index) in kcxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.kcxz" placeholder="请输入" :disabled="zgJxkyqksAuth.KCXZ==2"/> -->
                   <el-select
                        v-model="scope.row.kcxz"
                        placeholder="请选择"
                        size="small"
                       :disabled="zgJxkyqksAuth.KCXZ==2"
                      >
                        <el-option
                          v-for="(item,index) in kcxzmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="ksl" label="课时量">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.ksl }}</div>
                <div v-else>
                  <el-input v-model="scope.row.ksl" placeholder="请输入" :disabled="zgJxkyqksAuth.KSL==2"/>
                  </div>
                
              </template>
            </el-table-column> 
           <el-table-column prop="skrs" label="授课人数">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.skrs }}</div>
                <div v-else>
                  <el-input v-model="scope.row.skrs" placeholder="请输入" :disabled="zgJxkyqksAuth.SKRS==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qssj" placeholder="请输入" :disabled="zgJxkyqksAuth.QSSJ==2"/> -->
                   <el-date-picker
                        v-model="scope.row.qssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,7)"
                         :disabled="zgJxkyqksAuth.QSSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="zgJxkyqksAuth.JSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.jssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,8)"
                         :disabled="zgJxkyqksAuth.JSSJ==2"
                      />
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
          <div id="tag_72" class="headline">
          <div>科研论文</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(10)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgLwkyqks" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="lwmc" label="题目">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.lwmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.lwmc" placeholder="请输入" :disabled="zgLwkyqksAuth.LWMC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
        <el-table-column prop="lwjbm" label="论文级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.lwjbm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in lwjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                 <el-select
                        v-model="scope.row.lwjbm"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgLwkyqksAuth.LWJB==2"
                      >
                        <el-option
                          v-for="(item,index) in lwjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                          
                        />
                      </el-select>
                  </div>
                 
              </template>
            </el-table-column>  
           <el-table-column prop="qkmc" label="期刊名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qkmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qkmc" placeholder="请输入" :disabled="zgLwkyqksAuth.QKMC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
          
            <el-table-column prop="cnkh" label="期刊国内标准刊号(CN)">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cnkh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cnkh" placeholder="请输入" :disabled="zgLwkyqksAuth.CNKH==2"/>
                  </div>
                  
              </template>
            </el-table-column> 
           <el-table-column prop="qklx" label="期刊类型">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-cascader
                      v-model="scope.row.qklx"
                      :options="qklxOps"
                    disabled
                      :props="OpsProps"
                      
                    ></el-cascader></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qklx" placeholder="请输入" :disabled="zgLwkyqksAuth.QKLX==2"/> -->
                  <el-cascader
                      v-model="scope.row.qklx"
                      :options="qklxOps"
                      @change="(val)=>{handleChangeQklx(val,scope.row)}"
                    :disabled="zgLwkyqksAuth.QKLX==2"
                      :props="OpsProps"
                      filterable
                    ></el-cascader>
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="fbsj" label="发表时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.fbsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.fbsj" placeholder="请输入" :disabled="zgLwkyqksAuth.FBSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.fbsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgLwkyqksAuth.FBSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column>   
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" :disabled="zgLwkyqksAuth.BRWC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'j')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div id="tag_73" class="headline">
          <div>科研项目</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(11)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgXmkyqks" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="xmmc" label="项目名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xmmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmmc" placeholder="请输入" :disabled="zgXmkyqksAuth.XMMC==2"/>
                  </div>
                  
              </template>
            </el-table-column>   
        
           <el-table-column prop="xmjb" label="项目级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-select
                        v-model="scope.row.xmjb"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in xmjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.xmjb" placeholder="请输入" :disabled="zgXmkyqksAuth.XMJB==2"/> -->
                  <el-select
                        v-model="scope.row.xmjb"
                        placeholder="请选择"
                        size="small"
                        :disabled="zgXmkyqksAuth.XMJB==2"
                      >
                        <el-option
                          v-for="(item,index) in xmjbmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                  
              </template>
            </el-table-column>   
          <el-table-column prop="xmbh" label="项目编号">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.xmbh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmbh" placeholder="请输入" :disabled="zgXmkyqksAuth.XMBH==2"/>
                  </div>
                  
              </template>
            </el-table-column> 
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.qssj" placeholder="请输入" :disabled="zgXmkyqksAuth.QSSJ==2"/> -->
                   <el-date-picker
                        v-model="scope.row.qssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        @change="changeDate(scope.row,7)"
                         :disabled="zgXmkyqksAuth.QSSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jssj" placeholder="请输入" :disabled="zgXmkyqksAuth.JSSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.jssj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         @change="changeDate(scope.row,8)"
                         :disabled="zgXmkyqksAuth.JSSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
           <el-table-column prop="sdjf" label="实到经费">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.sdjf }}</div>
                <div v-else>
                  <el-input v-model="scope.row.sdjf" placeholder="请输入" :disabled="zgXmkyqksAuth.SDJF==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" :disabled="zgXmkyqksAuth.BRWC==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="pzbm" label="批准部门">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.pzbm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pzbm" placeholder="请输入" :disabled="zgXmkyqksAuth.PZBM==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'k')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <div id="tag_74" class="headline">
          <div>科研著作</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(12)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgZzkyqks" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="zzmc" label="著作名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.zzmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzmc" placeholder="请输入" :disabled="zgZzkyqksAuth.ZZMC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
        
           <el-table-column prop="zzlx" label="著作类型">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.zzlx"
                        placeholder="请选择"
                        size="small"
                         disabled
                      >
                        <el-option
                          v-for="(item,index) in zzlxmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.zzlx" placeholder="请输入" :disabled="zgZzkyqksAuth.ZZLX==2"/> -->
                    <el-select
                        v-model="scope.row.zzlx"
                        placeholder="请选择"
                        size="small"
                         :disabled="zgZzkyqksAuth.ZZLX==2"
                      >
                        <el-option
                          v-for="(item,index) in zzlxmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                  </div>
                 
              </template>
            </el-table-column>   
          <el-table-column prop="cbs" label="出版社">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cbs }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cbs" placeholder="请输入" :disabled="zgZzkyqksAuth.CBS==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="cbsj" label="出版时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.cbsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.cbsj" placeholder="请输入" :disabled="zgZzkyqksAuth.CBSJ==2"/> -->
                   <el-date-picker
                        v-model="scope.row.cbsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgZzkyqksAuth.CBSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
           <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" :disabled="zgZzkyqksAuth.BRWC==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'l')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
         <div id="tag_75" class="headline">
          <div>科研情况</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(13)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgQtkyqks" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="tm" label="题目">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.tm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.tm" placeholder="请输入" :disabled="zgQtkyqksAuth.TM==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
        
           <el-table-column prop="cglx" label="成果类型">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"> <el-cascader
                      v-model="scope.row.cglx"
                      :options="cglxOps"
                      disabled
                      :props="OpsProps"
                      filterable
                    ></el-cascader></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.cglx" placeholder="请输入" :disabled="zgQtkyqksAuth.CGLX==2"/> -->
                  <el-cascader
                      v-model="scope.row.cglx"
                      :options="cglxOps"
                      @change="(val)=>{
                        handleChangeCglx(val,scope.row)
                      }"
              :disabled="zgQtkyqksAuth.CGLX==2"
                      :props="OpsProps"
                      filterable
                    ></el-cascader>
                  </div>
                 
              </template>
            </el-table-column>   
          <el-table-column prop="fbsj" label="发表时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.fbsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.fbsj" placeholder="请输入" :disabled="zgQtkyqksAuth.FBSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.fbsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgQtkyqksAuth.FBSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" :disabled="zgQtkyqksAuth.BRWC==2"/>
                  </div>
                  
              </template>
            </el-table-column> 
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'm')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <!-- 考核评价 -->
    <div class="detail_right" v-if="activeName == '8'&&detailInfoData.sffdy==1">
        <div id="tag_8" class="headline">
          <div>年度考核</div>
          <!-- <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(14)">
            <i class="addIcon" /> 添加
          </div> -->
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgNdkhs" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="khnd" label="考核年度">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.khnd }}</div>
                <div v-else>
                  <el-input v-model="scope.row.khnd" placeholder="请输入" disabled/>
                  </div>
               
              </template>
            </el-table-column>   
        
           <el-table-column prop="khjgm" label="学校年度考核结果">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-select
                        v-model="scope.row.khjgm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in khjgmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select></div>
                <div v-else>
      
                  <el-select
                        v-model="scope.row.khjgm"
                        placeholder="请选择"
                        size="small"
                        disabled
                      >
                        <el-option
                          v-for="(item,index) in khjgmOps"
                          :key="index"
                          :label="item.mc"
                          :value="item.dm"
                        />
                      </el-select>
                 </div>
              </template>
            </el-table-column>   
            <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div v-if="scope.row.sftb!=='1'"
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'n')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    <!-- 奖励表彰 -->
    <div class="detail_right" v-if="activeName == '9'&&detailInfoData.sffdy==1">
        <div id="tag_9" class="headline">
          <div>奖励表彰</div>
          <div v-if="isEdit == 2" class="editBtn" @click="addDetailInfoData(15)">
            <i class="addIcon" /> 添加
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfoData.zgJlbzs" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column prop="jxmc" label="奖项名称">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.jxmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.jxmc" placeholder="请输入" :disabled="zgJlbzsAuth.JXMC==2"/>
                  </div>
                 
              </template>
            </el-table-column>   
        
           <el-table-column prop="jxjb" label="奖项级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1"><el-cascader
                      v-model="scope.row.jxjb"
                      :options="jxjbOps"
                     disabled
                      :props="OpsProps"
                     
                    ></el-cascader></div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.jxjb" placeholder="请输入" :disabled="zgJlbzsAuth.JXJB==2"/> -->
                  <el-cascader
                      v-model="scope.row.jxjb"
                      :options="jxjbOps"
                      @change="(val)=>{handleChangeJxjb(val,scope.row)}"
                      :disabled="zgJlbzsAuth.JXJB==2"
                      :props="OpsProps"
                      filterable
                    ></el-cascader>
                  </div>
                
              </template>
            </el-table-column>   
            <el-table-column prop="hjsj" label="获奖时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.hjsj }}</div>
                <div v-else>
                  <!-- <el-input v-model="scope.row.hjsj" placeholder="请输入" :disabled="zgJlbzsAuth.HJSJ==2"/> -->
                  <el-date-picker
                        v-model="scope.row.hjsj"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                         :disabled="zgJlbzsAuth.HJSJ==2"
                      />
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" :disabled="zgJlbzsAuth.BRWC==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
            <el-table-column prop="bzbm" label="表彰部门">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.bzbm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.bzbm" placeholder="请输入" :disabled="zgJlbzsAuth.BZBM==2"/>
                  </div>
                 
              </template>
            </el-table-column> 
             <el-table-column v-if="isEdit == 2" label="">
              <template slot-scope="scope">
                <div
                  class="deleteBtn"
                  @click="deleteWorkBrifeData(scope.row, scope.$index, 'o')"
                >
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
    </div>
    <div v-if="isEdit != 2" class="editBottom" v-show="AUTHFLAG">
          <div class="btn editIcon" @click="editButtonClick">编辑</div>
        </div>

        <div v-if="isEdit == 2" class="editBottom">
          <div class="btn cancel" @click="handleCancle">取消</div>
          <div class="btn confirm" @click="handlUpdata">保存</div>
        </div>
  </div>
  
</template>
<script>
import {
  getDetailQueryPoliticalWorkList,
  updateDetailQueryPoliticalWorkList,
  getCodeInfoByEnglish,
  queryAllDwh,
  getMajors,
  getFdyZy,
  getZgCglx,
  getZgJsdwlx,
  getZgJxjb,
  getZgQklx,
  getZgZsmc,
} from "@/api/politicalWork/basicInfo";
export default {
  name: "DetailInfo",
  data() {
    return {
      activeName: this.$route.query.activeName
        ? this.$route.query.activeName
        : "1",
      isEdit: 1,
      //value: "测试",
      //选项
      sfOps: [],
      hyzkmOps: [],
      zjzcdmOps: [], //专业技术职务
      zzmmmOps: [],
      rzdwhOps: [], //二级学科
      sxzymOps: [], //专业
      zylbmOps: [], //专业类别
      gwxzOps: [
        { dm: "0", mc: "专职辅导员" },
        { dm: "1", mc: "兼职辅导员" },
      ],
      zgxlmOps: [], //学历
      xbmOps: [],
      zgxwmOps: [], //学位
      xzOps: [], //学制
      khjgmOps: [], //考核结果
      zwmcmOps: [], //行政职务名称
      zwjbmOps: [], //职务级别码
      gzdwOps: [], //工作单位
      przwdjOps: [], //聘任职务等级
      jslbOps: [], //晋升类别
      byxxlbOps: [], //毕业学校类别
      lwjbmOps: [],
      gwxzmOps: [], //岗位性质码
      zgpxxzmOps: [], //政工培训性质码
      pxjbmOps: [], //培训级别码
      dlxzmOps: [], //'锻炼性质码
      kclxmOps: [], //课程类型码
      kcxzmOps: [], //课程性质码
      xmjbmOps: [], //项目级别码
      zzlxmOps: [], //,著作类型码
      cglxOps: [],
      jsdwlxOps: [],
      jxjbOps: [],
      qklxOps: [],
      zsmcOps: [],
      zgZgjbxxesAuth: {},
      zgFdyrmsAuth: {},
      zgXlxwsAuth: {},
      zgDzzwsAuth: {},
      zgDzzjsAuth: {},
      zgZyjszwsAuth: {},
      zgGzjlsAuth: {},
      zgPrxxesAuth: {},
      zgXxpxesAuth: {},
      zgXmxxesAuth: {},
      zgZyzgsAuth: {},
      zgGwdlsAuth: {},
      zgNdkhsAuth: {},
      zgLwkyqksAuth: {},
      zgXmkyqksAuth: {},
      zgJxkyqksAuth: {},
      zgZzkyqksAuth: {},
      zgQtkyqksAuth: {},
      zgJlbzsAuth: {},

      routerFrom: "", // 跳转过来的路由

      detailInfoData: {
        zgZgjbxxes: {}, //基本信息
        zgFdyrms: {}, //辅导员信息

        zgXlxws: [], // 学历学位

        zgDzzws: [], //行政职业发展
        zgDzzjs: [], //级别
        zgZyjszws: [], //专业技术职务
        zgGzjls: [], //工作经历
        zgPrxxes: [], //聘任信息

        zgXxpxes: [], //学习培训
        zgXmxxes: [], //项目学习
        zgZyzgs: [], //职业资格
        zgGwdls: [], //岗位锻炼
        zgNdkhs: [], //考核
        zgJlbzs: [], //奖励
        zgXmkyqks: [], //项目可研
        zgLwkyqks: [], //论文科研
        zgZzkyqks: [], //著作科研
        zgJxkyqks: [], //教学科研
        zgQtkyqks: [], //其他科研
        zgZps: {},
      },
      OpsProps: {
        value: "dm", //匹配响应数据中的id
        label: "mc", //匹配响应数据中的name
        checkStrictly: true,
        children: "dataCodeCascadingList", //匹配响应数据中的children }
      },
    };
  },
  created() {},
  mounted() {
    this.getCode("dmxbm");
    this.getCode("dmsfbzm");
    this.getCode("dmzzmmm");
    this.getCode("dmrszyjszwm");
    this.getCode("dmrsxlm");
    this.getCode("dmrsxklbm");
    this.getCode("dmxwm");
    this.getCode("dmhyzkm");
    this.getCode("dmxz");
    this.getCode("dmlwkwjbm");
    this.getCode("dmrskhjgm");
    this.getCode("dmzzbzwmcm");
    this.getCode("dmzzbzwjbm");
    this.getCode("dmrsprzwdjm");
    this.getCode("dmrsjslbm");
    this.getCode("dmbyxxlxm");
    this.getCode("dmzylbm");
    this.getCode("dmgwxzm");
    this.getCode("dmzgpxxzm");
    this.getCode("dmpxjbm");
    this.getCode("dmdlxzm");
    this.getCode("dmkclxm");
    this.getCode("dmkcxzm");
    this.getCode("dmxmjbm");
    this.getCode("dmzzlxm");
    this.getOps();
    this.getListWorkPlace();
    this.getDetail();
  },
  created() {
    this.authConfirm(this.$route.path.split("/")[2]);
    this.AUTHFLAG = this.$store.getters.AUTHFLAG;
  },
  methods: {
    handleClick() {
      console.log(this.detailInfoData.zgZyjszws.sftb);
    },
    getListWorkPlace() {
      queryAllDwh()
        .then((res) => {
          this.rzdwhOps = res.data.rows;
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
            case "dmsfbzm":
              this.sfOps = res.data;
              break;
            case "dmzzmmm":
              this.zzmmmOps = res.data;
              break;
            case "dmrszyjszwm":
              this.zjzcdmOps = res.data;
              break;
            case "dmrsxlm":
              this.zgxlmOps = res.data;
              break;
            case "dmzylbm":
              this.zylbmOps = res.data; //专业类别
              break;
            case "dmxwm":
              this.zgxwmOps = res.data;
              break;
            case "dmhyzkm":
              this.hyzkmOps = res.data;
              break;
            case "dmxz":
              this.xzOps = res.data;
              break;
            case "dmzzbzwmcm":
              this.zwmcmOps = res.data;
              break;
            case "dmzzbzwjbm":
              this.zwjbmOps = res.data;
              break;
            case "dmrskhjgm":
              this.khjgmOps = res.data;
              break;
            case "dmrsprzwdjm":
              this.przwdjOps = res.data;
              break;
            case "dmrsjslbm":
              this.jslbOps = res.data;
              break;
            case "dmbyxxlxm":
              this.byxxlbOps = res.data;
              break;

            case "dmlwkwjbm":
              this.lwjbmOps = res.data;
              break;
            case "dmgwxzm":
              this.gwxzmOps = res.data;
              break;
            case "dmzgpxxzm":
              this.zgpxxzmOps = res.data;
              break;
            case "dmpxjbm":
              this.pxjbmOps = res.data;
              break;
            case "dmdlxzm":
              this.dlxzmOps = res.data;
              break;
            case "dmkclxm":
              this.kclxmOps = res.data;
              break;
            case "dmkcxzm":
              this.kcxzmOps = res.data;
              break;

            case "dmxmjbm":
              this.xmjbmOps = res.data;
              break;
            case "dmzzlxm":
              this.zzlxmOps = res.data;
              break;
          }
        })
        .catch((err) => {});
    },
    getOps() {
      getFdyZy().then((res) => {
        this.sxzymOps = res.data;
      });
      getZgCglx().then((res) => {
        this.cglxOps = res.data;
      });
      getZgJsdwlx().then((res) => {
        this.jsdwlxOps = res.data;
      });
      getZgJxjb().then((res) => {
        this.jxjbOps = res.data;
      });
      getZgQklx().then((res) => {
        this.qklxOps = res.data;
      });
      getZgZsmc().then((res) => {
        this.zsmcOps = res.data;
      });
    },
    changeDate(row, flag) {
      console.log("111111");
      switch (flag) {
        case 1: //新增开始时间
          if (row.jdhtmmzdrq) {
            if (row.jdhtmrzrq > row.jdhtmmzdrq) {
              row.jdhtmrzrq = null;
              this.$message.error("开始时间不能大于结束时间！");
            }
          }
          break;
        case 2: //新增结束时间
          if (row.jdhtmrzrq) {
            if (row.jdhtmrzrq > row.jdhtmmzdrq) {
              row.jdhtmmzdrq = null;
              this.$message.error("结束时间不能小于开始时间！");
            }
          }
          break;
        case 3: //新增开始时间
          if (row.zjzzrq) {
            if (row.zjpzrq > row.zjzzrq) {
              row.zjpzrq = null;
              this.$message.error("开始时间不能大于结束时间！");
            }
          }
          break;
        case 4: //新增结束时间
          if (row.zjpzrq) {
            if (row.zjpzrq > row.zjzzrq) {
              row.zjzzrq = null;
              this.$message.error("结束时间不能小于开始时间！");
            }
          }
          break;
        case 5: //新增开始时间
          if (row.gzzzrq) {
            if (row.gzqsrq > row.gzzzrq) {
              row.gzqsrq = null;
              this.$message.error("开始时间不能大于结束时间！");
            }
          }
          break;
        case 6: //新增结束时间
          if (row.gzqsrq) {
            if (row.gzqsrq > row.gzzzrq) {
              row.gzzzrq = null;
              this.$message.error("结束时间不能小于开始时间！");
            }
          }
          break;

        case 7: //新增开始时间
          if (row.jssj) {
            if (row.qssj > row.jssj) {
              row.qssj = null;
              this.$message.error("开始时间不能大于结束时间！");
            }
          }
          break;
        case 8: //新增结束时间
          if (row.qssj) {
            if (row.qssj > row.jssj) {
              row.jssj = null;
              this.$message.error("结束时间不能小于开始时间！");
            }
          }
          break;
      }
    },
    handleChangeZy(value) {
      if (value.length == 1) {
        this.detailInfoData.zgZgjbxxes.sxzym = value[0];
      } else if (value.length == 2) {
        this.detailInfoData.zgZgjbxxes.sxzym = value[1];
      } else {
        this.detailInfoData.zgZgjbxxes.sxzym = value[2];
      }
    },
    handleChangeCglx(value, row) {
      if (value.length == 1) {
        row.cglx = value[0];
      } else if (value.length == 2) {
        row.cglx = value[1];
      } else {
        row.cglx = value[2];
      }
    },
    handleChangeJsdwlx(value, row) {
      if (value.length == 1) {
        row.jsdw = value[0];
      } else if (value.length == 2) {
        row.jsdw = value[1];
      } else {
        row.jsdw = value[2];
      }
    },
    handleChangeJxjb(value, row) {
      if (value.length == 1) {
        row.jxjb = value[0];
      } else if (value.length == 2) {
        row.jxjb = value[1];
      } else {
        row.jxjb = value[2];
      }
    },
    handleChangeQklx(value, row) {
      if (value.length == 1) {
        row.qklx = value[0];
      } else if (value.length == 2) {
        row.qklx = value[1];
      } else {
        row.qklx = value[2];
      }
    },
    handleChangeZsmc(value, row) {
      if (value.length == 1) {
        row.zsmc = value[0];
      } else if (value.length == 2) {
        row.zsmc = value[1];
      } else {
        row.zsmc = value[2];
      }
    },
    getDetail() {
      // 学历学位;
      const data = {
        gh: this.$route.query.gh
          ? this.$route.query.gh
          : this.$store.getters.userId,
      };
      this.isEdit = 1;
      getDetailQueryPoliticalWorkList(data)
        .then((res) => {
          console.log(res);
          this.$set(
            this.detailInfoData,
            "zgZgjbxxes",
            res.zgZgjbxxes[0] ? res.zgZgjbxxes[0] : {} // 基本信息  如果接受不到第一个对象，那么就给他一个空对象
          );
          this.$set(
            this.detailInfoData,
            "zgFdyrms",
            res.zgFdyrms[0] ? res.zgFdyrms[0] : {} // 辅导员信息
          );
          this.$set(
            this.detailInfoData,
            "zgGzjls",
            res.zgGzjls ? res.zgGzjls : [] // 工作简历
          );
          this.$set(
            this.detailInfoData,
            "zgXlxws",
            res.zgXlxws ? res.zgXlxws : [] // 学历学位
          );
          this.$set(
            this.detailInfoData,
            "zgZyjszws",
            res.zgZyjszws ? res.zgZyjszws : [] // 专业技术职务
          );
          this.$set(
            this.detailInfoData,
            "zgXxpxes",
            res.zgXxpxes ? res.zgXxpxes : [] // 学习培训
          );
          this.$set(
            this.detailInfoData,
            "zgNdkhs",
            res.zgNdkhs ? res.zgNdkhs : [] // 年度考核
          );
          this.$set(
            this.detailInfoData,
            "zgJlbzs",
            res.zgJlbzs ? res.zgJlbzs : [] // 奖励表彰
          );
          this.$set(
            this.detailInfoData,
            "zgXmkyqks",
            res.zgXmkyqks ? res.zgXmkyqks : [] // 项目科研情况
          );
          this.$set(
            this.detailInfoData,
            "zgLwkyqks",
            res.zgLwkyqks ? res.zgLwkyqks : [] // 论文科研成果
          );
          this.$set(
            this.detailInfoData,
            "zgZzkyqks",
            res.zgZzkyqks ? res.zgZzkyqks : [] // 著作科研情况
          );
          this.$set(
            this.detailInfoData,
            "zgJxkyqks",
            res.zgJxkyqks ? res.zgJxkyqks : [] // 教学科研情况
          ),
            this.$set(
              this.detailInfoData,
              "zgQtkyqks",
              res.zgQtkyqks ? res.zgQtkyqks : [] // 其他科研情况
            );
          this.$set(
            this.detailInfoData,
            "zgDzzjs",
            res.zgDzzjs ? res.zgDzzjs : [] // 行政级别
          );
          this.$set(
            this.detailInfoData,
            "zgDzzws",
            res.zgDzzws ? res.zgDzzws : [] // 行政职务
          );
          this.$set(
            this.detailInfoData,
            "zgGwdls",
            res.zgGwdls ? res.zgGwdls : [] // 岗位锻炼
          );
          this.$set(
            this.detailInfoData,
            "zgPrxxes",
            res.zgPrxxes ? res.zgPrxxes : [] // 聘任信息
          );
          this.$set(
            this.detailInfoData,
            "zgXmxxes",
            res.zgXmxxes ? res.zgXmxxes : [] // 项目学习
          );
          this.$set(
            this.detailInfoData,
            "zgZyzgs",
            res.zgZyzgs ? res.zgZyzgs : [] // 职业资格
          );
          this.$set(
            this.detailInfoData,
            "zgZps",
            res.zgZps[0] ? res.zgZps[0] : {} // 照片
          );
          this.$set(this.detailInfoData, "updateTime", res.updateTime);
          this.$set(this.detailInfoData, "createTime", res.createTime);
          this.$set(this.detailInfoData, "sffdy", res.sffdy);
          this.$set(this.detailInfoData, "sfxs", res.sfxs);
          this.zgZgjbxxesAuth = res.auth.zg_zgjbxxAuth;
          this.zgGzjlsAuth = res.auth.zg_gzjlAuth;
          this.zgXxpxesAuth = res.auth.zg_xxpxAuth;
          this.zgXlxwsAuth = res.auth.zg_xlxwAuth;
          this.zgNdkhsAuth = res.auth.zg_ndkhAuth;
          this.zgLwkyqksAuth = res.auth.zg_lwkyqkAuth;
          this.zgXmkyqksAuth = res.auth.zg_xmkyqkAuth;
          this.zgZyjszwsAuth = res.auth.zg_zyjszwAuth;
          this.zgJlbzsAuth = res.auth.zg_jlbzAuth;
          this.zgJxkyqksAuth = res.auth.zg_jxkyqkAuth;
          this.zgZzkyqksAuth = res.auth.zg_zzkyqkAuth;
          this.zgDzzjsAuth = res.auth.zg_dzzjAuth;
          this.zgDzzwsAuth = res.auth.zg_dzzwAuth;
          this.zgFdyrmsAuth = res.auth.zg_fdyrmAuth;
          this.zgGwdlsAuth = res.auth.zg_gwdlAuth;
          this.zgPrxxesAuth = res.auth.zg_prxxAuth;
          this.zgQtkyqksAuth = res.auth.zg_qtkyqkAuth;
          this.zgXmxxesAuth = res.auth.zg_xmxxAuth;
          this.zgZyzgsAuth = res.auth.zg_zyzgAuth;
        })
        .catch((err) => {});
    },
    editButtonClick() {
      this.isEdit = 2; // 控制是否可以编辑的字段
    },
    handleCancle() {
      // this.$router.push({
      //   path: this.routerFrom,
      // });
      this.isEdit = 1;
    },
    handlUpdata() {
      console.log(this.detailInfoData.zgGzjls);
      let data = this.detailInfoData;
      let flag = 0;

      if (this.zgZgjbxxesAuth.GH == 0 && !data.zgZgjbxxes.gh) {
        flag = 1;
        this.$message.error("工号不能为空");
      } else if (this.zgZgjbxxesAuth.XM == 0 && !data.zgZgjbxxes.xm) {
        flag = 1;
        this.$message.error("姓名不能为空");
      } else if (this.zgZgjbxxesAuth.XBM == 0 && !data.zgZgjbxxes.xbm) {
        flag = 1;
        this.$message.error("性别不能为空");
      } else if (this.zgZgjbxxesAuth.CSRQ == 0 && !data.zgZgjbxxes.csrq) {
        flag = 1;
        this.$message.error("出生年月不能为空");
      } else if (this.zgZgjbxxesAuth.ZZMMM == 0 && !data.zgZgjbxxes.zzmmm) {
        flag = 1;
        this.$message.error("政治面貌不能为空");
      } else if (this.zgZgjbxxesAuth.SFZJH == 0 && !data.zgZgjbxxes.sfzjh) {
        flag = 1;
        this.$message.error("身份证号不能为空");
      } else if (this.zgZgjbxxesAuth.HYZKM == 0 && !data.zgZgjbxxes.hyzkm) {
        flag = 1;
        this.$message.error("婚姻状况不能为空");
      } else if (this.zgZgjbxxesAuth.ZGXLM == 0 && !data.zgZgjbxxes.zgxlm) {
        flag = 1;
        this.$message.error("最高学历不能为空");
      } else if (this.zgZgjbxxesAuth.ZGXWM == 0 && !data.zgZgjbxxes.zgxwm) {
        flag = 1;
        this.$message.error("最后学位不能为空");
      } else if (this.zgZgjbxxesAuth.BYXXJDW == 0 && !data.zgZgjbxxes.byxxjdw) {
        flag = 1;
        this.$message.error("毕业院校不能为空");
      } else if (this.zgZgjbxxesAuth.CJGZRQ == 0 && !data.zgZgjbxxes.cjgzrq) {
        flag = 1;
        this.$message.error("参加工作时间不能为空");
      } else if (this.zgZgjbxxesAuth.BGDH == 0 && !data.zgZgjbxxes.bgdh) {
        flag = 1;
        this.$message.error("办公电话不能为空");
      } else if (this.zgZgjbxxesAuth.YDDH == 0 && !data.zgZgjbxxes.yddh) {
        flag = 1;
        this.$message.error("手机号码不能为空");
      } else if (this.zgZgjbxxesAuth.DZYX == 0 && !data.zgZgjbxxes.dzyx) {
        flag = 1;
        this.$message.error("电子邮箱不能为空");
      } else if (this.zgZgjbxxesAuth.WXZH == 0 && !data.zgZgjbxxes.wxzh) {
        flag = 1;
        this.$message.error("微信账号不能为空");
      } else if (this.zgZgjbxxesAuth.QQZH == 0 && !data.zgZgjbxxes.qqzh) {
        flag = 1;
        this.$message.error("qq号码不能为空");
      } else if (this.zgZgjbxxesAuth.YB == 0 && !data.zgZgjbxxes.yb) {
        flag = 1;
        this.$message.error("邮编不能为空");
      } else if (this.zgZgjbxxesAuth.TXDZ == 0 && !data.zgZgjbxxes.txdz) {
        flag = 1;
        this.$message.error("通讯地址不能为空");
      } else if (this.zgZgjbxxesAuth.SYZK == 0 && !data.zgZgjbxxes.syzk) {
        flag = 1;
        this.$message.error("生育状况不能为空");
      } else if (this.zgZgjbxxesAuth.BSHJL == 0 && !data.zgZgjbxxes.bshjl) {
        flag = 1;
        this.$message.error("博士后经历不能为空");
      } else if (this.zgZgjbxxesAuth.SXZYM == 0 && !data.zgZgjbxxes.sxzym) {
        flag = 1;
        this.$message.error("专业不能为空");
      } else if (this.zgZgjbxxesAuth.ZYLB == 0 && !data.zgZgjbxxes.zylb) {
        flag = 1;
        this.$message.error("专业类别不能为空");
      } else if (
        this.zgFdyrmsAuth.DRFDYSJ == 0 &&
        !data.zgFdyrms.drfdysj &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("担任辅导员时间不能为空");
      } else if (
        this.zgFdyrmsAuth.GWXZ == 0 &&
        !data.zgFdyrms.gwxz &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("岗位性质不能为空");
      } else if (
        this.zgFdyrmsAuth.SFSSMZXSFDY == 0 &&
        !data.zgFdyrms.sfssmzxsfdy &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("是否少数民族学生辅导员不能为空");
      } else if (
        this.zgFdyrmsAuth.SFGJXSFDY == 0 &&
        !data.zgFdyrms.sfgjxsfdy &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("是否国际学生辅导员不能为空");
      } else if (
        this.zgFdyrmsAuth.SFBYBFDY == 0 &&
        !data.zgFdyrms.sfbybfdy &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("是否毕业班辅导员不能为空");
      } else if (
        this.zgFdyrmsAuth.DXSQK == 0 &&
        !data.zgFdyrms.dxsqk &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("带学生情况不能为空");
      } else if (
        this.zgFdyrmsAuth.DZKSRS == 0 &&
        !data.zgFdyrms.dzksrs &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("带专科生人数不能为空");
      } else if (
        this.zgFdyrmsAuth.DBKSRS == 0 &&
        !data.zgFdyrms.dbksrs &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("带本科生人数不能为空");
      } else if (
        this.zgFdyrmsAuth.DYJSRS == 0 &&
        !data.zgFdyrms.dyjsrs &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("带研究生人数不能为空");
      } else if (
        this.zgFdyrmsAuth.DGJXSRS == 0 &&
        !data.zgFdyrms.dgjxsrs &&
        data.sffdy == 1
      ) {
        flag = 1;
        this.$message.error("带国际学生人数不能为空");
      }
      if (data.sffdy == 1 && this.detailInfoData.zgXlxws.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgXlxws.length; i++) {
          if (this.detailInfoData.zgXlxws[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgXlxws[i].xlm &&
            this.zgXlxwsAuth.XLM == 0
          ) {
            flag = 1;
            this.$message.error("学历不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].byxxhdw &&
            this.zgXlxwsAuth.BYXXHDW == 0
          ) {
            flag = 1;
            this.$message.error("毕业院校不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].byxxlb &&
            this.zgXlxwsAuth.BYXXLB == 0
          ) {
            flag = 1;
            this.$message.error("毕业学校类别不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].sxzym &&
            this.zgXlxwsAuth.SXZYM == 0
          ) {
            flag = 1;
            this.$message.error("专业不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].bysj &&
            this.zgXlxwsAuth.BYSJ == 0
          ) {
            flag = 1;
            this.$message.error("毕业时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].xz &&
            this.zgXlxwsAuth.XZ == 0
          ) {
            flag = 1;
            this.$message.error("学制不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].xwm &&
            this.zgXlxwsAuth.XWM == 0
          ) {
            flag = 1;
            this.$message.error("学位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXlxws[i].xwsysj &&
            this.zgXlxwsAuth.XWSYSJ == 0
          ) {
            flag = 1;
            this.$message.error("学位授予时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgDzzws.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgDzzws.length; i++) {
          if (this.detailInfoData.zgDzzws[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgDzzws[i].zwmcm &&
            this.zgDzzwsAuth.ZWMCM == 0
          ) {
            flag = 1;
            this.$message.error("行政职务名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgDzzws[i].jdhtmrzrq &&
            this.zgDzzwsAuth.JDHTMRZRQ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgDzzws[i].jdhtmmzdrq &&
            this.zgDzzwsAuth.JDHTMMZDRQ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgDzzjs.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgDzzjs.length; i++) {
          if (this.detailInfoData.zgDzzjs[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgDzzjs[i].zwjbm &&
            this.zgDzzjsAuth.ZWJBM == 0
          ) {
            flag = 1;
            this.$message.error("行政级别发展不能为空");

            break;
          } else if (
            !this.detailInfoData.zgDzzjs[i].zjpzrq &&
            this.zgDzzjsAuth.ZJPZRQ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgDzzjs[i].zjzzrq &&
            this.zgDzzjsAuth.ZJZZRQ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgZyjszws.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgZyjszws.length; i++) {
          if (this.detailInfoData.zgZyjszws[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgZyjszws[i].zjzcdm &&
            this.zgZyjszwsAuth.XJZCDM == 0
          ) {
            flag = 1;
            this.$message.error("专业技术职务不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZyjszws[i].prrq &&
            this.zgZyjszwsAuth.PRRQ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZyjszws[i].jssj &&
            this.zgZyjszwsAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgGzjls.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgGzjls.length; i++) {
          // if (this.detailInfoData.zgGzjls[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgGzjls[i].gzdw &&
            this.zgGzjlsAuth.GZDW == 0
          ) {
            flag = 1;
            this.$message.error("工作单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGzjls[i].zw &&
            this.zgGzjlsAuth.ZW == 0
          ) {
            flag = 1;
            this.$message.error("职务不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGzjls[i].gzqsrq &&
            this.zgGzjlsAuth.GZQSRQ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGzjls[i].gzzzrq &&
            this.zgGzjlsAuth.GZZZRQ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGzjls[i].gzgwxz &&
            this.zgGzjlsAuth.GZGWXZ == 0
          ) {
            flag = 1;
            this.$message.error("工作岗位性质不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgPrxxes.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgPrxxes.length; i++) {
          // if (this.detailInfoData.zgPrxxes[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgPrxxes[i].przwdj &&
            this.zgPrxxesAuth.PRZWDJ == 0
          ) {
            flag = 1;
            this.$message.error("聘任职务等级不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].prsj &&
            this.zgPrxxesAuth.PRSJ == 0
          ) {
            flag = 1;
            this.$message.error("聘任时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].prwh &&
            this.zgPrxxesAuth.PRWH == 0
          ) {
            flag = 1;
            this.$message.error("聘任文号不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].zylb &&
            this.zgPrxxesAuth.ZYLB == 0
          ) {
            flag = 1;
            this.$message.error("职员类别不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].jslb &&
            this.zgPrxxesAuth.JSLB == 0
          ) {
            flag = 1;
            this.$message.error("晋升类别不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].rmbz &&
            this.zgPrxxesAuth.RMBZ == 0
          ) {
            flag = 1;
            this.$message.error("任免标志不能为空");

            break;
          } else if (
            !this.detailInfoData.zgPrxxes[i].stateId &&
            this.zgPrxxesAuth.STATE_ID == 0
          ) {
            flag = 1;
            this.$message.error("是否当前状态不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgXxpxes.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgXxpxes.length; i++) {
          // if (this.detailInfoData.zgXxpxes[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgXxpxes[i].pxmc &&
            this.zgXxpxesAuth.PXMC == 0
          ) {
            flag = 1;
            this.$message.error("培训名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].zzdw &&
            this.zgXxpxesAuth.ZZDW == 0
          ) {
            flag = 1;
            this.$message.error("组织单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].pxdd &&
            this.zgXxpxesAuth.PXDD == 0
          ) {
            flag = 1;
            this.$message.error("培训地点不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].qssj &&
            this.zgXxpxesAuth.QSSJ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].jssj &&
            this.zgXxpxesAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].pxxz &&
            this.zgXxpxesAuth.PXXZ == 0
          ) {
            flag = 1;
            this.$message.error("培训性质不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXxpxes[i].pxjb &&
            this.zgXxpxesAuth.PXJB == 0
          ) {
            flag = 1;
            this.$message.error("培训级别不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgXmxxes.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgXmxxes.length; i++) {
          // if (this.detailInfoData.zgXmxxes[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgXmxxes[i].pxmc &&
            this.zgXmxxesAuth.PXMC == 0
          ) {
            flag = 1;
            this.$message.error("项目名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmxxes[i].zzdw &&
            this.zgXmxxesAuth.ZZDW == 0
          ) {
            flag = 1;
            this.$message.error("组织单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmxxes[i].xxdd &&
            this.zgXmxxesAuth.XXDD == 0
          ) {
            flag = 1;
            this.$message.error("学习地点不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmxxes[i].qssj &&
            this.zgXmxxesAuth.QSSJ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmxxes[i].jssj &&
            this.zgXmxxesAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmxxes[i].xmlb &&
            this.zgXmxxesAuth.XMLB == 0
          ) {
            flag = 1;
            this.$message.error("项目类别不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgZyzgs.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgZyzgs.length; i++) {
          // if (this.detailInfoData.zgZyzgs[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgZyzgs[i].zsmc &&
            this.zgZyzgsAuth.ZSMC == 0
          ) {
            flag = 1;
            this.$message.error("证书名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZyzgs[i].sydw &&
            this.zgZyzgsAuth.SYDW == 0
          ) {
            flag = 1;
            this.$message.error("授予单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZyzgs[i].hqsj &&
            this.zgZyzgsAuth.HQSJ == 0
          ) {
            flag = 1;
            this.$message.error("获取时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgGwdls.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgGwdls.length; i++) {
          // if (this.detailInfoData.zgGwdls[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgGwdls[i].zzdw &&
            this.zgGwdlsAuth.ZZDW == 0
          ) {
            flag = 1;
            this.$message.error("组织单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGwdls[i].jsdw &&
            this.zgGwdlsAuth.JSDW == 0
          ) {
            flag = 1;
            this.$message.error("接收单位不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGwdls[i].dlxz &&
            this.zgGwdlsAuth.DLXZ == 0
          ) {
            flag = 1;
            this.$message.error("锻炼性质不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGwdls[i].gwmc &&
            this.zgGwdlsAuth.GWMC == 0
          ) {
            flag = 1;
            this.$message.error("岗位名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGwdls[i].qssj &&
            this.zgGwdlsAuth.QSSJ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgGwdls[i].jssj &&
            this.zgGwdlsAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgJxkyqks.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgJxkyqks.length; i++) {
          // if (this.detailInfoData.zgJxkyqks[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgJxkyqks[i].kcmc &&
            this.zgJxkyqksAuth.KCMC == 0
          ) {
            flag = 1;
            this.$message.error("课程名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].kclx &&
            this.zgJxkyqksAuth.KCLX == 0
          ) {
            flag = 1;
            this.$message.error("课程类型不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].kcxz &&
            this.zgJxkyqksAuth.KCXZ == 0
          ) {
            flag = 1;
            this.$message.error("课程性质不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].ksl &&
            this.zgJxkyqksAuth.KSL == 0
          ) {
            flag = 1;
            this.$message.error("课时量不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].skrs &&
            this.zgJxkyqksAuth.SKRS == 0
          ) {
            flag = 1;
            this.$message.error("授课人数不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].qssj &&
            this.zgJxkyqksAuth.QSSJ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJxkyqks[i].jssj &&
            this.zgJxkyqksAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgLwkyqks.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgLwkyqks.length; i++) {
          // if (this.detailInfoData.zgLwkyqks[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgLwkyqks[i].lwmc &&
            this.zgLwkyqksAuth.LWMC == 0
          ) {
            flag = 1;
            this.$message.error("题目不能为空");

            break;
          } else if (
            !this.detailInfoData.zgLwkyqks[i].qkmc &&
            this.zgLwkyqksAuth.QKMC == 0
          ) {
            flag = 1;
            this.$message.error("期刊名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgLwkyqks[i].cnkh &&
            this.zgLwkyqksAuth.CNKH == 0
          ) {
            flag = 1;
            this.$message.error("期刊国内标准刊号不能为空");

            break;
          } else if (
            !this.detailInfoData.zgLwkyqks[i].qklx &&
            this.zgLwkyqksAuth.QKLX == 0
          ) {
            flag = 1;
            this.$message.error("期刊类型不能为空");

            break;
          } else if (
            !this.detailInfoData.zgLwkyqks[i].fbsj &&
            this.zgLwkyqksAuth.FBSJ == 0
          ) {
            flag = 1;
            this.$message.error("发表时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgLwkyqks[i].brwc &&
            this.zgLwkyqksAuth.BRWC == 0
          ) {
            flag = 1;
            this.$message.error("本人位次不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgXmkyqks.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgXmkyqks.length; i++) {
          // if (this.detailInfoData.zgXmkyqks[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgXmkyqks[i].xmmc &&
            this.zgXmkyqksAuth.XMMC == 0
          ) {
            flag = 1;
            this.$message.error("项目名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].xmjb &&
            this.zgXmkyqksAuth.XMJB == 0
          ) {
            flag = 1;
            this.$message.error("项目级别不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].xmbh &&
            this.zgXmkyqksAuth.XMBH == 0
          ) {
            flag = 1;
            this.$message.error("项目编号不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].qssj &&
            this.zgXmkyqksAuth.QSSJ == 0
          ) {
            flag = 1;
            this.$message.error("起始时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].jssj &&
            this.zgXmkyqksAuth.JSSJ == 0
          ) {
            flag = 1;
            this.$message.error("结束时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].sdjf &&
            this.zgXmkyqksAuth.SDJF == 0
          ) {
            flag = 1;
            this.$message.error("实到经费不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].brwc &&
            this.zgXmkyqksAuth.BRWC == 0
          ) {
            flag = 1;
            this.$message.error("本人位次不能为空");

            break;
          } else if (
            !this.detailInfoData.zgXmkyqks[i].pzbm &&
            this.zgXmkyqksAuth.PZBM == 0
          ) {
            flag = 1;
            this.$message.error("批准部门不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgZzkyqks.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgZzkyqks.length; i++) {
          // if (this.detailInfoData.zgZzkyqks[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgZzkyqks[i].zzmc &&
            this.zgZzkyqksAuth.ZZMC == 0
          ) {
            flag = 1;
            this.$message.error("著作名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZzkyqks[i].zzlx &&
            this.zgZzkyqksAuth.ZZLX == 0
          ) {
            flag = 1;
            this.$message.error("著作类型不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZzkyqks[i].cbs &&
            this.zgZzkyqksAuth.CBS == 0
          ) {
            flag = 1;
            this.$message.error("出版社不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZzkyqks[i].cbsj &&
            this.zgZzkyqksAuth.CBSJ == 0
          ) {
            flag = 1;
            this.$message.error("出版时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgZzkyqks[i].brwc &&
            this.zgZzkyqksAuth.BRWC == 0
          ) {
            flag = 1;
            this.$message.error("本人位次不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgQtkyqks.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgQtkyqks.length; i++) {
          if (
            !this.detailInfoData.zgQtkyqks[i].tm &&
            this.zgQtkyqksAuth.TM == 0
          ) {
            flag = 1;
            this.$message.error("题目不能为空");

            break;
          } else if (
            !this.detailInfoData.zgQtkyqks[i].cglx &&
            this.zgQtkyqksAuth.CGLX == 0
          ) {
            flag = 1;
            this.$message.error("成果类型不能为空");

            break;
          } else if (
            !this.detailInfoData.zgQtkyqks[i].fbsj &&
            this.zgQtkyqksAuth.FBSJ == 0
          ) {
            flag = 1;
            this.$message.error("发表时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgQtkyqks[i].brwc &&
            this.zgQtkyqksAuth.BRWC == 0
          ) {
            flag = 1;
            this.$message.error("本人位次不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgNdkhs.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgNdkhs.length; i++) {
          if (this.detailInfoData.zgNdkhs[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgNdkhs[i].khnd &&
            this.zgQtkyqksAuth.KHND == 0
          ) {
            flag = 1;
            this.$message.error("考核年度不能为空");

            break;
          } else if (
            !this.detailInfoData.zgNdkhs[i].khjgm &&
            this.zgQtkyqksAuth.KHJGM == 0
          ) {
            flag = 1;
            this.$message.error("学校年度考核结果不能为空");

            break;
          }
        }
      }
      if (data.sffdy == 1 && this.detailInfoData.zgJlbzs.length > 0) {
        for (var i = 0; i < this.detailInfoData.zgJlbzs.length; i++) {
          if (this.detailInfoData.zgJlbzs[i].sftb == 1) continue;
          if (
            !this.detailInfoData.zgJlbzs[i].jxmc &&
            this.zgJlbzsAuth.JXMC == 0
          ) {
            flag = 1;
            this.$message.error("奖项名称不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJlbzs[i].jxjb &&
            this.zgJlbzsAuth.JXJB == 0
          ) {
            flag = 1;
            this.$message.error("奖项级别不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJlbzs[i].hjsj &&
            this.zgJlbzsAuth.HJSJ == 0
          ) {
            flag = 1;
            this.$message.error("获奖时间不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJlbzs[i].brwc &&
            this.zgJlbzsAuth.BRWC == 0
          ) {
            flag = 1;
            this.$message.error("本人位次不能为空");

            break;
          } else if (
            !this.detailInfoData.zgJlbzs[i].bzbm &&
            this.zgJlbzsAuth.BZBM == 0
          ) {
            flag = 1;
            this.$message.error("表彰部门不能为空");

            break;
          }
        }
      }
      if (flag == 0) {
        updateDetailQueryPoliticalWorkList(data)
          .then((res) => {
            this.$message({
              message: res.errmsg,
              type: "success",
            });
            this.isEdit = 1;
          })
          .catch((err) => {
            this.$message.error(err.errmsg);
          });
      }
    },
    addDetailInfoData(index) {
      if (index == 1) {
        // 学业成长
        this.detailInfoData.zgXlxws.push({});
      } else if (index == 2) {
        // 行政职业发展
        this.detailInfoData.zgDzzws.push({});
      } else if (index == 3) {
        // 专业技术职务发展
        this.detailInfoData.zgZyjszws.push({});
      } else if (index == 4) {
        // 工作履历
        this.detailInfoData.zgGzjls.push({});
      } else if (index == 5) {
        // 培训
        this.detailInfoData.zgXxpxes.push({});
      } else if (index == 6) {
        // 项目学习
        this.detailInfoData.zgXmxxes.push({});
      } else if (index == 7) {
        // 职业资格
        this.detailInfoData.zgZyzgs.push({});
      } else if (index == 8) {
        // 岗位锻炼
        this.detailInfoData.zgGwdls.push({});
      } else if (index == 9) {
        // 政工科研情况（教学情况）
        this.detailInfoData.zgJxkyqks.push({});
      } else if (index == 10) {
        // 政工科研情况（论文）
        this.detailInfoData.zgLwkyqks.push({});
      } else if (index == 11) {
        // 政工科研情况（项目）
        this.detailInfoData.zgXmkyqks.push({});
      } else if (index == 12) {
        // 政工科研情况（著作）
        this.detailInfoData.zgZzkyqks.push({});
      } else if (index == 13) {
        // 政工科研情况（其他）
        this.detailInfoData.zgQtkyqks.push({});
      } else if (index == 14) {
        // 年度考核
        this.detailInfoData.zgNdkhs.push({});
      } else if (index == 15) {
        // 奖励表彰信息
        this.detailInfoData.zgJlbzs.push({});
      } else if (index == 16) {
        // 职务级别
        this.detailInfoData.zgDzzjs.push({});
      } else if (index == 17) {
        // 聘任信息
        this.detailInfoData.zgPrxxes.push({});
      }
    },
    deleteWorkBrifeData(row, index, flag) {
      if (flag == "a") {
        this.detailInfoData.zgXlxws.splice(index, 1);
      } else if (flag == "b") {
        this.detailInfoData.zgDzzws.splice(index, 1);
      } else if (flag == "c") {
        this.detailInfoData.zgZyjszws.splice(index, 1);
      } else if (flag == "d") {
        this.detailInfoData.zgGzjls.splice(index, 1);
      } else if (flag == "e") {
        this.detailInfoData.zgXxpxes.splice(index, 1);
      } else if (flag == "f") {
        this.detailInfoData.zgXmxxes.splice(index, 1);
      } else if (flag == "g") {
        this.detailInfoData.zgZyzgs.splice(index, 1);
      } else if (flag == "h") {
        this.detailInfoData.zgGwdls.splice(index, 1);
      } else if (flag == "i") {
        this.detailInfoData.zgJxkyqks.splice(index, 1);
      } else if (flag == "j") {
        this.detailInfoData.zgLwkyqks.splice(index, 1);
      } else if (flag == "k") {
        this.detailInfoData.zgXmkyqks.splice(index, 1);
      } else if (flag == "l") {
        this.detailInfoData.zgZzkyqks.splice(index, 1);
      } else if (flag == "m") {
        this.detailInfoData.zgQtkyqks.splice(index, 1);
      } else if (flag == "n") {
        this.detailInfoData.zgNdkhs.splice(index, 1);
      } else if (flag == "o") {
        this.detailInfoData.zgJlbzs.splice(index, 1);
      } else if (flag == "p") {
        this.detailInfoData.zgDzzjs.splice(index, 1);
      } else if (flag == "q") {
        this.detailInfoData.zgPrxxes.splice(index, 1);
      }
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

    .detail_left {
      flex: 0 0 198px;

      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding: 20px;
      box-sizing: border-box;

      .tab-left {
        padding: 0 40px;
      }
    }
    .detail_right {
      //flex: 1;
      width: 100%;
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