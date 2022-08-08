<template>
  <div class="detail">
    <div class="wrap">
      <div class="detail_left">
        <div v-for="(item,index) in dtailsList" :key="index">
          <div class="list" :class="index==current?'active':''" @click="handleList(index,'tag')">
            <div>{{ item }}</div>
            <i :class="index==current?'el-icon-arrow-right':''" />
          </div>
        </div>
      </div>
      <div class="detail_right">
        <div class="right_top">
          <p class="title">政工干部基本信息</p>
          <!-- <div class="saveBtn"> <i class="icon"></i> 保存</div> -->
          <div class="timeWrap">
            <span>创建时间：2022-03-23 23:21:34 </span> <span class="updataTime">更新时间：2022-03-23 23:21:34</span>
          </div>
        </div>
        <div id="tag_0" class="headline">基本信息</div>
        <div class="tableStyle">
          <div class="imgWrap">
            <div class="photo">
              <img src="" alt="">
            </div>

          </div>
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">最高学历码</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">教职工人员类别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员总分类</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员岗位状态</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学科类别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">一级学科</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">二级学科</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校及单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参加工作日期</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来校日期</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参保类型</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">社保号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办公电话</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">离校审批通过时间</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办理离校手续时间</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工资停发时间</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">调往单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">
          <div id="tag_1">工作简历</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加工作经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作内容">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="职位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="曾任党政职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="工作证明人">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="备注">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
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
                  <div class="title">成果编号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">证书编号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">文理科类别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果名称</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果形式</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人工号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所属单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业描述</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校或单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习证明人</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否当前最高学位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位单位名称</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位国家/地区</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位授予时间</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位证书号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div id="tag_3" class="headline">科研成果记录表</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果编号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">证书编号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">文理科类别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果名称</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果形式</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人工号</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所属单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">华师是否第一单位</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">奖励类别</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">奖种</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">奖励等级</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">获奖年份</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">证书颁发日期</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div v-if="isEdit ==1" class="content">123123123</div>
                  <div v-if="isEdit ==2" class="content">
                    <el-input v-model="value" size="small" placeholder="请输入内容" />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div id="tag_4" class="headline">
          <div>专业技术职务</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="专技职称代码">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="专技职称时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="聘任岗位系列">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="聘任岗位等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="聘任日期">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="聘任文号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="岗位等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="专技等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_5" class="headline">
          <div>学习培训</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="培训名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="组织单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="培训地点">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="培训性质">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="培训级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_6" class="headline">
          <div>年度考核</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="考核年度">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="考核日期">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="考核结果">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_7" class="headline">
          <div>奖励表彰信息</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="证书号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="获奖类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="奖项名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="获奖成果名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="奖项级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="获奖时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="表彰部门">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_8" class="headline">
          <div>政工科研情况（项目）</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="项目名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="项目级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="项目编号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="实到经费">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="批准部门">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_9" class="headline">
          <div>政工科研情况（论文）</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="论文名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="期刊名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="期刊国内标准编号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="期刊类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="发表时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_10" class="headline">
          <div>政工科研情况（著作）</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="著作名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="著作类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="成果所属单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="ISBN号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="出版社">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="出版时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div id="tag_11" class="headline">
          <div>政工科研情况（教学情况）</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addDetailTable"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="课程名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="课程类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="课程性质">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="课时量">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="授课人数">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.date }}</div>
                <div v-else>
                  <el-input v-model="scope.row.date" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit ==2" label="">
              <template slot-scope="scope">
                <div class="deteleBtn" @click="deteleItem(scope.row,scope.$index)">
                  <i class="el-icon-close" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailInfo',

  data() {
    return {
      dtailsList: ['基本信息', '工作简历', '学历学位信息', '科研成果记录', '专业技术职务', '学习培训', '年度考核', '奖励表彰信息', '科研情况（项目）', '科研情况（论文）', '科研情况（著作）', '科研情况（教学情况）'],
      current: 0,
      tableData: [],
      isEdit: false,
      value: ''
    }
  },
  created() {
    this.isEdit = this.$route.query.show
  },
  mounted() {

  },

  methods: {
    handleList(index, tag) {
      this.current = index
      var id = '#' + tag + '_' + index
      console.log(id)
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    },
    addDetailTable() {
      this.tableData.push({
        date: 3
      })
    },
    deteleItem(row, index) {
      console.log(index)
      this.tableData.splice(index, 1)
    }
  }
}
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
      flex:0 0 220px;
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
        .saveBtn{
          position: absolute;
          top:0;
          right: 20px;
          width: 84px;
          line-height: 36px;
          text-align: center;
          background: #005657;
          border-radius: 2px;
          color:#fff;
          cursor: pointer;
        }
        .icon{
          display: inline-block;
          width:20px;
          height: 20px;
          background: url('~@/assets/images/saveIcon.png');
          vertical-align: middle;
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
