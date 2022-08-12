<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item,index) in dtailsList" :key="index">
          <div class="list" :class="index==current?'active':''" @click="handleList(index,'tag')">
            <div>{{item}}</div>
            <i :class="index==current?'el-icon-arrow-right':''"></i>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">学生信息</p>
          <div class="timeWrap">
            <span>创建时间：{{formatDate(detailInfo.xsJbxx.createTime)}} </span> 
            <span class="updataTime">更新时间：{{formatDate(detailInfo.xsJbxx.updateTime)}}</span>
          </div>
        </div>
        <div class="headline" id="tag_0">基本信息</div>
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img :src="detailInfo.xsXszpb?detailInfo.xsXszpb.bkzp:''" alt="报考照片">
            </div>
            <div class="photo" style="margin-top:10px;">
              <img :src="detailInfo.xsXszpb?detailInfo.xsXszpb.byzp:''" alt="毕业照片">
            </div>
          </div>
          <div class="information" v-if="schooling==1">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">拼音姓</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.pyx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.pyx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">拼音名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.pym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.pym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">曾用名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.cym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.cym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">英文姓名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.ywxm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.ywxm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">单位</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dwh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.dwh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出生日期</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.csrq}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.csrq" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出生地</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.csdm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.csdm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">籍贯</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.jg}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.jg" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">民族</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.mzm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.mzm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">国籍/地区</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.gjdqm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.gjdqm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身份证件类型</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfzjlxm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.sfzjlxm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身份证件号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfzjh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.sfzjh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身份证件有效期</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfzjyxq}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.sfzjyxq" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">入学时间</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxny}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.rxny" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">结束学业年月</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.jsxyny}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.jsxyny" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">年级</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.nj}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.nj" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">班级</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.bjm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.bjm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zydm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.zydm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学制</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">在册情况</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zcqk}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.zcqk" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否在校</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfzx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.sfzx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学籍状态</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xjzt}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xjzt" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学生当前状态</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xsdqztm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xsdqztm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否毕业</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfby}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.sfby" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">婚姻状况</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.hyzkm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.hyzkm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">港澳台侨外</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.gatqwm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.gatqwm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">政治面貌</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.zzmmm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.zzmmm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">健康状况</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.jkztm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.jkztm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">信仰宗教</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xyzjm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xyzjm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">血型</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xxm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xxm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否独生子女</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfdszn}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.sfdszn" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身高</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.sg}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.sg" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">体重</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.tz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.tz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原学校名称</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.yxxmc}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.yxxmc" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">原学号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.yxh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.yxh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">入学方式</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxfsm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.rxfsm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">来源地区</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.lydqm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.lydqm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学生来源</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xslym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xslym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">就读方式</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.jdfsm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.jdfsm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">入学前学历</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxqxlm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.rxqxlm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">入学前学位</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxqxwm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.rxqxwm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获得学历方式</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.hdxlfsm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.hdxlfsm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否学分制</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfxfz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.sfxfz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否师范生</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfsfs}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.sfsfs" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养方式</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.pyfsm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.pyfsm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培养层次</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.pyccm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.pyccm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">连读方式</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.ldfsm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.ldfsm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">定向或委培</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dxhwpdw}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.dxhwpdw" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学生类别</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xslbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xslbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">第一外语语种</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dywyyz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.dywyyz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">第一外语水平</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dywysp}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.dywysp" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">第二外语语种</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dewyyz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.dewyyz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">第二外语水平</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dewysp}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.dewysp" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
          </div>

           <!-- 研究生基本信息 -->
          <div class="information" v-if="schooling==2">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学号 _研究生</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">拼音姓</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.pyx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.pyx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">拼音名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.pym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.pym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">曾用名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.cym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.cym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">英文姓名</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.ywxm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.ywxm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.xbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.xbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">单位</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dwh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.dwh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出生日期</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.csrq}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.csrq" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出生地</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.csdm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsJbxx.csdm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.jg}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.jg" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.mzm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.mzm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.gjdqm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.gjdqm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfzjlxm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.sfzjlxm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sfzjh}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.sfzjh" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">年级</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.nj}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.nj" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学年月</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxny}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.rxny" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">预计毕业时间</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.yjbysj}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.yjbys" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">实际毕业时间</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.sjbysj}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.sjbysj" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.jsxyny}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.jsxyny" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学方式</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.rxfsm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.rxfsm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学籍状态</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xjzt}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.xjzt" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否毕业</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfby}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.sfby" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfzx}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.sfzx" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">港澳台侨外</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.gatqwm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.gatqwm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.hyzkm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.hyzkm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsJbxx.zzmmm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsJbxx.zzmmm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.lydqm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.lydqm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习方式</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xxfsm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.xxfsm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.jdfsm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.jdfsm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">专业</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zydm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.zydm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">研究方向</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.yjfxm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.yjfxm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师姓名</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dsxm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.dsxm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">导师类别</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dslb}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.dslb" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获得学历方式</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.hdxlfsm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.hdxlfsm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfxfz}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.sfxfz" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养层次</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.pyccm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.pyccm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.pyfsm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.pyfsm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养类别？？</div>
                  <div v-if="isEdit ==1" class="content">3233440</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div v-if="isEdit ==1" class="content">{{ detailInfo.xsXjxx.xslbm }}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.xslbm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单双证</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dsz}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.dsz" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">定向或委培单位</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.dxhwpdw}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.dxhwpdw" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">专项计划码</div>
                  <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zxjhm}}</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="detailInfo.xsXjxx.zxjhm" size="small" placeholder="请输入内容"></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" v-if="schooling==2">学历学位信息</div>
        <div class="tableStyle" v-if="schooling==2">
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学历证书号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xlzsh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xlzsh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">毕业证印制号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.byzyzh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.byzyzh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获学位日期</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.hxwrq}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.hxwrq" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学位证书号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.xwzsh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.xwzsh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">是否专业学位</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.sfzyxw}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.sfzyxw" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业学位类别</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zyxwlbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.zyxwlbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专业学位领域</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsXjxx.zyxwlym}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsXjxx.zyxwlym" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_1">联系方式</div>
        <div class="tableStyle" v-if="schooling==1">
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">移动电话</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.yddh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.yddh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">电子邮箱</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.dzyx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.dzyx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">QQ号码</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.qqhm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.qqhm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">微信号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.wxhm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.wxhm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">传真电话</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.czdh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.czdh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">邮政编码</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.yzbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.yzbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">通信地址</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.txdz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.txdz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">网络地址</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.wldz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.wldz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭电话</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtdh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtdh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭邮编</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtyzbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtyzbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭住址</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtzz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtzz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭Email</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtdzxx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtdzxx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>

        <div class="tableStyle" v-if="schooling==2">
          <div class="information">
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">移动电话</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.yddh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.yddh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">电子邮箱</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.dzyx}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.dzyx" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">QQ号码</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.qqhm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.qqhm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">微信号</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.wxhm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.wxhm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">家庭电话</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtdh}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtdh" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">邮政编码</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.jtyzbm}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.jtyzbm" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">通信地址</div>
                    <div v-if="isEdit ==1" class="content">{{detailInfo.xsTxxx.txdz}}</div>
                    <div v-if="isEdit ==2" class="content">
                      <el-input v-model="detailInfo.xsTxxx.txdz" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline" id="tag_2">
          <div>家庭成员信息</div>
          <div class="editBtn" v-if="isEdit ==2" @click="addDetailTable(1)"><i class="addIcon"></i> 添加家庭成员信息</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsJtcyxxList" style="width: 100%;">
            <el-table-column prop="cyxm" label="姓名">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.cyxm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.cyxm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="csny" label="出生年月">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.csny}}</div>
                <div v-else>
                  <el-input v-model="scope.row.csny" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gxm" label="关系">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gxm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gxm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mzm" label="民族">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.mzm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.mzm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gjdqm" label="国籍/地区">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gjdqm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gjdqm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jkzkm" label="健康状况">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.jkzkm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.jkzkm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdw" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.cygzdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.cygzdw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cygzdwdz" label="工作单位地址">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.cygzdwdz}}</div>
                <div v-else>
                  <el-input v-model="scope.row.cygzdwdz" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cysfzh" label="身份证号码">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.cysfzh}}</div>
                <div v-else>
                  <el-input v-model="scope.row.cysfzh" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zyjszwm" label="专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.zyjszwm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.zyjszwm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zwjbm" label="职务级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.zwjbm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.zwjbm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="yddh" label="移动电话">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.yddh}}</div>
                <div v-else>
                  <el-input v-model="scope.row.yddh" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="dzyx" label="电子邮箱">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.dzyx}}</div>
                <div v-else>
                  <el-input v-model="scope.row.dzyx" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="" v-if="isEdit ==2">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index ,'a')">
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_3">
          <div>学习经历</div>
          <div class="editBtn" v-if="isEdit ==2" @click="addDetailTable(2)"><i class="addIcon"></i> 添加学习经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsXxjlList" style="width: 100%;">
            <el-table-column prop="xxqsny" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.xxqsny}}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxqsny" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzzny" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.xxzzny}}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxzzny" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxdw" label="学习单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.xxdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxdw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sxzymc" label="所学专业">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.sxzymc}}</div>
                <div v-else>
                  <el-input v-model="scope.row.sxzymc" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="shxwm" label="获得学位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.shxwm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.shxwm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxzmr" label="学习证明人">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.xxzmr}}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxzmr" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zmrdw" label="证明人单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.zmrdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.zmrdw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xxjlbz" label="学习简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.xxjlbz}}</div>
                <div v-else>
                  <el-input v-model="scope.row.xxjlbz" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="" v-if="isEdit ==2">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index, 'b')">
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline" id="tag_4">
          <div>工作经历</div>
          <div class="editBtn" v-if="isEdit ==2" @click="addDetailTable(3)"><i class="addIcon"></i> 添加工作经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="detailInfo.xsGzjlList" style="width: 100%;">
            <el-table-column prop="gzqsrq" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzqsrq}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzqsrq" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzzrq" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzzzrq}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzzzrq" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzdw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gznr" label="工作内容">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gznr}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gznr" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwm" label="曾任党政职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.crdzzwm}}</div>
                <div v-else>
                  <el-input v-model="scope.row.crdzzwm" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crzyjszw" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.crzyjszw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.crzyjszw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmr" label="工作证明人">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzzmr}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzzmr" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmrdw" label="证明人在何处">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzzmrdw}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzzmrdw" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzjlbz" label="工作简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{scope.row.gzjlbz}}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzjlbz" placeholder="请输入"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column  label="" v-if="isEdit ==2">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index, 'c')">
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="editBottom" v-if="isEdit == 2">
      <div class="btn cancel" @click="handleCencle">取消</div>
      <div class="btn confirm" @click="handlUpdata">保存</div>
    </div>
  </div>
</template>

<script>
import { getRegStuInfoDetailPage,updateRegStuInfo } from "@/api/student/index"
export default {
  name: 'detail',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.routerFrom = from.fullPath
    })
    
  },
  data() {
    return {
      routerFrom:'', // 跳转过来的路由
      dtailsList: ['基本信息', '联系方式', '家庭成员信息', '学习经历', '工作经历'],
      current: 0,
      tableData: [{date:1}],
      isEdit: false,
      schooling:'',
      value: '',
      detailInfo: {
        xsJbxx: {},
        xsTxxx: {},
        xsXjxx: {}, // 学生学籍信息
        xsJtcyxxList: [], // 家庭成员
        xsXxjlList: [], // 学生学习经历
        xsGzjlList: [], // 学生工作经历
        xsXszpb:{} // 学生信息照片
      }
    };
  },
  created() {
    this.isEdit = this.$route.query.show// 1是详情，2是编辑
    this.schooling = this.$route.query.schooling
  },
  mounted() {
    this.$nextTick(() => {
      this.getDetail()
    })
  },

  methods: {
    getDetail() {
      let data = { XH: this.$route.query.xh }
      getRegStuInfoDetailPage(data).then(res => {
        this.$set(this.detailInfo, 'xsJbxx', res.data.xsJbxx?res.data.xsJbxx:{})
        this.$set(this.detailInfo, 'xsTxxx', res.data.xsTxxx?res.data.xsTxxx:{})
        this.$set(this.detailInfo, 'xsXjxx', res.data.xsXjxx?res.data.xsXjxx:{})
        this.$set(this.detailInfo, 'xsJtcyxxList', res.data.xsJtcyxxList)
        this.$set(this.detailInfo, 'xsXxjlList', res.data.xsXxjlList)
        this.$set(this.detailInfo, 'xsGzjlList', res.data.xsGzjlList)
        this.$set(this.detailInfo, 'xsXszpb', res.data.xsXszpb?res.data.xsXszpb:{})
        
        
      }).catch(err=>{})
    },
    handleList(index,tag) {
      this.current = index
      var id = "#" + tag + '_' + index;
      console.log(id)
      document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
      });
    },
    // 添加
    addDetailTable(index) {
      if (index == 1) {
        this.detailInfo.xsJtcyxxList.push({})
      } else if (index == 2) {
        this.detailInfo.xsXxjlList.push({})
      } else if (index == 3) {
        this.detailInfo.xsGzjlList.push({})
      }
    },
    // 删除 
    deteleItem(row, index, leg) {
      // console.log(row,index,leg)
      if (leg == 'a') {
        this.detailInfo.xsJtcyxxList.splice(index, 1)
      } else if (leg == 'b') {
        this.detailInfo.xsXxjlList.splice(index, 1)
      } else if (leg == 'c') {
        this.detailInfo.xsGzjlList.splice(index, 1)
      }
    },
    // 取消
    handleCencle() {
      this.$router.push({
        path:this.routerFrom
      })
    },
    // 提交
    handlUpdata() {
      let data = this.detailInfo
      updateRegStuInfo(data).then(res => {
        this.$message({
          message: res.errmsg,
          type: 'success'
        })
        this.$router.push({
          path:this.routerFrom
        })
      }).catch(err => {
        this.$message.error(err.errmsg);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.detail{
  padding:20px 0;
  box-sizing: border-box;
  .wrap{
    display: flex;
    flex-direction: row;
    // overflow: hidden;
    .detail_left{
      flex:0 0 198px;
      margin-right: 24px;
      background: #fff;
      // height: calc(100vh - 170px);
      padding:20px;
      box-sizing: border-box;
      .list{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #1F1F1F;
        cursor: pointer;
        padding:0 10px;
        box-sizing: border-box;
      }
      .active{
        background: #F0F0F0;
        border-radius: 2px;
      }
    }
    .detail_right{
      flex:1;
      background: #fff;
      .right_top{
        .title{
          text-align: center;
          font-weight: 500;
          font-size: 24px;
          color: #005657;
          line-height: 24px
        }
        .timeWrap{
          text-align: center;
          font-weight: 400;
          font-size: 16px;
          color: #383838;
          line-height: 28px;
          .updataTime{
            margin-left: 20px;
          }
        }
      }
      .headline{
        padding-left: 20px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 20px;
        color: #1F1F1F;
        line-height: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .editBtn{
          padding:4px 5px;
          margin-right: 20px;
          border: 1px solid #005657;
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          color: #005657;
          cursor: pointer;
          .addIcon{
            display: inline-block;
            width:15px;
            height: 15px;
            background: url('~@/assets/images/addicon.png') no-repeat center;
            vertical-align: middle;
          }
        }
      }
      .tableStyle{
        position: relative;
        padding:20px;
        .imgWrap{
          position: absolute;
          right:20px;
          top:20px;
          z-index: 100;
          .photo{
            width:160px;
            height: 206px;
            background: #fff;
            overflow: hidden;
            img{
              width:160px;
              height: 206px;
            }
          }
        }
        .information{
          padding:0 20px;
          .rowStyle{
            padding:0 !important;
            margin:0;
            border-bottom:1px solid #cccccc;
          }
          .wrap{
            display: flex;
            align-items: center;
            .title{
              flex: 0 0 160px;
              line-height: 48px;
              background: #E0E0E0;
              text-align: right;
              padding-right: 5px;
            }
            .content{
              font-weight: 400;
              font-size: 14px;
              color: #1F1F1F;
              line-height: 22px;
              margin-left: 16px;
            }
          }
        }
      }
    }
  }
  .editBottom{
    width:100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.10), 0 -2px 6px -1px rgba(0,0,0,0.20);
    position: fixed;
    bottom:0;
    left:0;
    z-index:100;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .btn{
      width: 84px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #005657;
      border-radius: 2px;
      margin-right: 20px;
    }
    .cancel{
      color: #005657;
    }
    .confirm{
      background: #005657;
      color:#fff;
    }
  }
}
</style>