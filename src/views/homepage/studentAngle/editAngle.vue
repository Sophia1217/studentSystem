<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item, index) in dtailsList" :key="index">
          <div
            class="list"
            :class="index == current ? 'active' : ''"
            @click="handleList(index)"
          >
            <div>{{ item }}</div>
            <i :class="index == current ? 'el-icon-arrow-right' : ''"></i>
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">学生信息</p>
        </div>
        <div class="headline">基本信息</div>
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img src="" alt="" />
            </div>
            <div class="photo" style="margin-top: 10px">
              <img src="" alt="" />
            </div>
          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学号</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">拼音名</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">英文姓名</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">出生日期</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生地</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">籍贯</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">国籍/地区</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">身份证件号</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件有效期</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">入学时间</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">结束学业年月</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">班级</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">专业</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学制</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">在册情况</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否在校</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">学籍状态</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生当前状态</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">是否毕业</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">港澳台侨外</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">健康状况</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">信仰宗教</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">血型</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否独生子女</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">身高</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">体重</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">原学号</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来源地区</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">学生来源</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">就读方式</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">入学前学历</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">入学前学位</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否学分制</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">是否师范生</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">培养方式</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">培养层次</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">连读方式</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学生类别</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">第一外语语种</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第一外语水平</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div class="title">第二外语语种</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">第二外语水平</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">联系方式</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">微信号</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">邮政编码</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭电话</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">家庭住址</div>
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
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
                  <div v-if="isEdit == 1" class="content">3233440</div>
                  <div v-if="isEdit == 2" class="content">
                    <el-input
                      v-model="value"
                      size="small"
                      placeholder="请输入内容"
                    ></el-input>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">
          <div>家庭成员信息</div>

          <!-- <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable"> -->
          <div class="editBtn" @click="addDetailTable">
            <i class="addIcon"></i> 添加家庭成员
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="姓名">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="出生年月">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="关系">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="民族">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="国籍/地区">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="健康状况">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作单位地址">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="身份证号码">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="职务级别">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="移动电话">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="电子邮箱">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index)"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline">
          <div>学习经历</div>

          <!-- <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable"> -->
          <div class="editBtn" @click="addDetailTable">
            <i class="addIcon"></i> 添加学习经历
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="学习单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="所学专业">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="获得学位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="学习证明人">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="证明人单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="学习简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index)"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="headline">
          <div>工作经历</div>
          <!-- <div class="editBtn" v-if="isEdit == 2" @click="addDetailTable"> -->
          <div class="editBtn" @click="addDetailTable">
            <i class="addIcon"></i> 添加工作经历
          </div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作内容">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="曾任党政职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作证明人">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="证明人在何处">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作简历备注">
              <template slot-scope="scope">
                <div v-if="isEdit == 1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input
                    v-model="scope.row.date"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="" v-if="isEdit == 2">
              <template slot-scope="scope">
                <div
                  class="deteleBtn"
                  @click="deteleItem(scope.row, scope.$index)"
                >
                  <i class="el-icon-close"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="headerBottom">
      <div class="headerRight">
        <div class="btns borderBlue">
          <i class="icon blueIcon"></i><span class="title">毕业生登记表</span>
        </div>
        <div class="btns borderOrange">
          <i class="icon orangeIcon"></i><span class="title">学生登记表</span>
        </div>
        <div class="btns borderLight">
          <i class="icon lightIcon"></i><span class="title">学生卡片</span>
        </div>

        <div class="btns borderGreen">
          <i class="icon greenIcon"></i><span class="title2">保存</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentAngle",
  data() {
    return {
      dtailsList: [
        "基本信息",
        "联系方式",
        "家庭成员信息",
        "学习经历",
        "工作经历",
      ],
      current: 0,
      tableData: [{ date: 1 }, { date: 2 }, { date: 3 }, { date: 4 }],
      isEdit: false,
      value: "",
    };
  },
  created() {
    this.isEdit = this.$route.query.show;
  },
  mounted() {},

  methods: {
    handleList(index) {
      this.current = index;
    },
    addDetailTable() {
      this.tableData.push({
        date: 3,
      });
    },
    deteleItem(row, index) {
      console.log(index);
      this.tableData.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px 0 40px;
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
    .deteleBtn {
      cursor: pointer;
    }
  }

  .headerBottom {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    // box-shadow: 0px -2px 5px #000;
    .headerRight {
      display: flex;
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
        background: #005657;
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
        .title2 {
          font-size: 14px;
          text-align: center;
          line-height: 22px;
          color: #fff;
        }
        .icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: top;
          margin-right: 5px;
        }
        .blueIcon {
          background: url("../../../assets/images/icon_1.png") no-repeat;
        }
        .orangeIcon {
          background: url("../../../assets/images/icon_2.png") no-repeat;
        }
        .lightIcon {
          background: url("../../../assets/images/icon_3.png") no-repeat;
        }

        .greenIcon {
          background: url("../../../assets/images/saveIcon.png");
        }
      }
    }
  }
}
</style>
