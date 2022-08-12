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
          <div class="timeWrap">
            <span>创建时间：2022-03-23 23:21:34 </span> <span class="updataTime">更新时间：2022-03-23 23:21:34</span>
          </div>
        </div>
        <!-- <div class="headline"> -->
          <div id="tag_0" class="headline">基本信息</div>
          <!-- <div v-if="isEdit ==2" class="editBtn" @click="saveBasicInfoData"><i class="addIcon" /> 保存</div> -->
        <!-- </div> -->
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
                  <div  class="content">{{ basicInfoData[0].gh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].gh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">姓名</div>
                  <div  class="content">{{ basicInfoData[0].xm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].xm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">曾用名</div>
                  <div  class="content">{{ basicInfoData[0].cym }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].cym" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">性别</div>
                  <div  class="content">{{ basicInfoData[0].xbm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].xbm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">单位</div>
                  <div  class="content">{{ basicInfoData[0].dwh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].dwh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">出生日期</div>
                  <div  class="content">{{ basicInfoData[0].csrq }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].csrq" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">籍贯</div>
                  <div  class="content">{{ basicInfoData[0].jg }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].jg" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">民族</div>
                  <div  class="content">{{ basicInfoData[0].mzm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].mzm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">政治面貌</div>
                  <div  class="content">{{ basicInfoData[0].zzmmm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].zzmmm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">国籍/地区</div>
                  <div  class="content">{{ basicInfoData[0].gjdqm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].gjdqm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件类型</div>
                  <div  class="content">{{ basicInfoData[0].sfzjlxm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].sfzjlxm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">身份证件号</div>
                  <div  class="content">{{ basicInfoData[0].sfzjh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].sfzjh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">婚姻状况</div>
                  <div  class="content">{{ basicInfoData[0].hyzkm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].hyzkm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">最高学历码</div>
                  <div  class="content">{{ basicInfoData[0].zgxlm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].zgxlm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">教职工人员类别</div>
                  <div  class="content">{{ basicInfoData[0].jzgrylbm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].jzgrylbm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员总分类</div>
                  <div  class="content">{{ basicInfoData[0].ryzfl }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].ryzfl" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">人员岗位状态</div>
                  <div  class="content">{{ basicInfoData[0].rygwztm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].rygwztm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学科类别</div>
                  <div  class="content">{{ basicInfoData[0].xklbm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].xklbm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">一级学科</div>
                  <div  class="content">{{ basicInfoData[0].yjxkm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].yjxkm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">二级学科</div>
                  <div  class="content">{{ basicInfoData[0].ejxkm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].ejxkm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div  class="content">{{ basicInfoData[0].xy }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].xy" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校及单位</div>
                  <div  class="content">{{ basicInfoData[0].byxxjdw }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].byxxjdw" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参加工作日期</div>
                  <div  class="content">{{ basicInfoData[0].cjgzrq }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].cjgzrq" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">来校日期</div>
                  <div  class="content">{{ basicInfoData[0].lxrq }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].lxrq" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">参保类型</div>
                  <div  class="content">{{ basicInfoData[0].cblbm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].cblbm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">社保号</div>
                  <div  class="content">{{ basicInfoData[0].sbh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].sbh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办公电话</div>
                  <div  class="content">{{ basicInfoData[0].bgdh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].bgdh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">移动电话</div>
                  <div  class="content">{{ basicInfoData[0].yddh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].yddh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" class="rowStyle">
                <div class="wrap">
                  <div class="title">电子邮箱</div>
                  <div  class="content">{{ basicInfoData[0].dzyx }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].dzyx" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">离校审批通过时间</div>
                  <div  class="content">{{ basicInfoData[0].lxsptgsj }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].lxsptgsj" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">办理离校手续时间</div>
                  <div  class="content">{{ basicInfoData[0].bllxsxsj }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].bllxsxsj" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">工资停发时间</div>
                  <div  class="content">{{ basicInfoData[0].gztfsj }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].gztfsj" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">调往单位</div>
                  <div  class="content">{{ basicInfoData[0].dwdw }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="basicInfoData[0].dwdw" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="headline">
          <div id="tag_1">工作简历</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addWorkBrifeData"><i class="addIcon" /> 添加工作经历</div>
        </div>
        <div class="tableStyle">
          <el-table :data="workBrifeData" style="width: 100%;">
            <el-table-column prop="gzqsrq" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gzqsrq }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzqsrq" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzzrq" label="终止时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gzzzrq }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzzzrq" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzdw" label="工作单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gzdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzdw" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gznr" label="工作内容">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gznr }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gznr" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zw" label="职位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zw" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crdzzwmc" label="曾任党政职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.crdzzwmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.crdzzwmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="crzyjszwm" label="曾任专业技术职务">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.crzyjszwm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.crzyjszwm" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gzzmr" label="工作证明人">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gzzmr }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gzzmr" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="bz" label="备注">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.bz }}</div>
                <div v-else>
                  <el-input v-model="scope.row.bz" placeholder="请输入" />
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
        <!-- TODO:后台接口暂无 -->
        <div id="tag_2" class="headline">学历学位信息</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果编号</div>
                  <div  class="content">{{ degreeData[0].cgbh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].cgbh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">证书编号</div>
                  <div  class="content">{{ degreeData[0].zsbh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].zsbh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">文理科类别</div>
                  <div  class="content">{{ degreeData[0].wlklb }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].wlklb" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果名称</div>
                  <div  class="content">{{ degreeData[0].cgmc }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].cgmc" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果形式</div>
                  <div  class="content">{{ degreeData[0].cgxs }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].cgxs" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人</div>
                  <div  class="content">{{ degreeData[0].wcr }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].wcr" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">完成人工号</div>
                  <div  class="content">{{ degreeData[0].wcrgh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].wcrgh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所属单位</div>
                  <div  class="content">{{ degreeData[0].ssdw }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].ssdw" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业</div>
                  <div  class="content">{{ degreeData[0].sxzym }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].sxzym" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">所学专业描述</div>
                  <div  class="content">{{ degreeData[0].sxzyms }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].sxzyms" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">毕业学校或单位</div>
                  <div  class="content">{{ degreeData[0].byxxhdw }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].byxxhdw" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学习证明人</div>
                  <div  class="content">{{ degreeData[0].xxzmr }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].xxzmr" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位</div>
                  <div  class="content">{{ degreeData[0].xwm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].xwm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">是否当前最高学位</div>
                  <div  class="content">{{ degreeData[0].sfdqzgxwm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].sfdqzgxwm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位单位名称</div>
                  <div  class="content">{{ degreeData[0].sxwdwmc }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].sxwdwmc" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">授学位国家/地区</div>
                  <div  class="content">{{ degreeData[0].sxwgjdqm }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].sxwgjdqm" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位授予时间</div>
                  <div  class="content">{{ degreeData[0].xwsysj }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].xwsysj" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学位证书号</div>
                  <div  class="content">{{ degreeData[0].xwzsh }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].xwzsh" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">学缘</div>
                  <div  class="content">{{ degreeData[0].xy }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].xy" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">备注</div>
                  <div  class="content">{{ degreeData[0].bz }}</div>
                  <!-- <div v-if="isEdit ==2" class="content">
                    <el-input v-model="degreeData[0].bz" size="small" placeholder="请输入内容" />
                  </div> -->
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 科研成果记录表删除 -->
        <!-- <div id="tag_3" class="headline">科研成果记录表</div>
        <div class="tableStyle">
          <div class="information">
            <el-row :gutter="20">
              <el-col :span="12" class="rowStyle">
                <div class="wrap">
                  <div class="title">成果编号</div>
                  <div v-if="isEdit ==1" class="content">{{researchData[0].}}</div>
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
        </div> -->

        <div id="tag_4" class="headline">
          <div>专业技术职务</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addtechnicalData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="technicalData" style="width: 100%;">
            <el-table-column prop="zjzcdm" label="专技职称代码">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zjzcdm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zjzcdm" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zjzcsj" label="专技职称时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zjzcsj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zjzcsj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prgwxlm" label="聘任岗位系列">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.prgwxlm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prgwxlm" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prgwdjm" label="聘任岗位等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.prgwdjm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prgwdjm" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prrq" label="聘任日期">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.prrq }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prrq" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prwh" label="聘任文号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.prwh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.prwh" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="gwdjm" label="岗位等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.gwdjm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.gwdjm" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zjdj" label="专技等级">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zjdj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zjdj" placeholder="请输入" />
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
          <div v-if="isEdit ==2" class="editBtn" @click="addTrainData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="trainData" style="width: 100%;">
            <el-table-column prop="pxmc" label="培训名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.pxmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zzdw" label="组织单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zzdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzdw" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxdd" label="培训地点">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.pxdd }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxdd" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qssj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.jssj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxxz" label="培训性质">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.pxxz }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxxz" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pxjb" label="培训级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.pxjb }}</div>
                <div v-else>
                  <el-input v-model="scope.row.pxjb" placeholder="请输入" />
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
          <div v-if="isEdit ==2" class="editBtn" @click="addExamData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="examData" style="width: 100%;">
            <el-table-column prop="khnd" label="考核年度">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.khnd }}</div>
                <div v-else>
                  <el-input v-model="scope.row.khnd" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="khrq" label="考核日期">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.khrq }}</div>
                <div v-else>
                  <el-input v-model="scope.row.khrq" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="khjgm" label="考核结果">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.khjgm }}</div>
                <div v-else>
                  <el-input v-model="scope.row.khjgm" placeholder="请输入" />
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
        <!-- TODO:后台接口字段和UI不一致 -->
        <div id="tag_7" class="headline">
          <div>奖励表彰信息</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addRewardsData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="rewardsData" style="width: 100%;">
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
        <!-- TODO：批准部门字段缺失 -->
        <div id="tag_8" class="headline">
          <div>政工科研情况（项目）</div>
          <div v-if="isEdit ==2" class="editBtn" @click="addProjectData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="projectData" style="width: 100%;">
            <el-table-column prop="xmmc" label="项目名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.xmmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xmjb" label="项目级别">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.xmjb }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmjb" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xmbh" label="项目编号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.xmbh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.xmbh" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qssj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.jssj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sdjf" label="实到经费">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.sdjf }}</div>
                <div v-else>
                  <el-input v-model="scope.row.sdjf" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" />
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
          <div v-if="isEdit ==2" class="editBtn" @click="addThesisData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="thesisData" style="width: 100%;">
            <el-table-column prop="lwmc" label="论文名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.lwmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.lwmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qkmc" label="期刊名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.qkmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qkmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cnkh" label="期刊国内标准编号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.cnkh }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cnkh" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qklx" label="期刊类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.qklx }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qklx" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="fbsj" label="发表时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.fbsj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.fbsj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" />
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
          <div v-if="isEdit ==2" class="editBtn" @click="addWritingData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="writingData" style="width: 100%;">
            <el-table-column prop="zzmc" label="著作名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zzmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="zzlx" label="著作类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.zzlx }}</div>
                <div v-else>
                  <el-input v-model="scope.row.zzlx" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cgssdw" label="成果所属单位">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.cgssdw }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cgssdw" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="isbnno" label="ISBN号">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.isbnno }}</div>
                <div v-else>
                  <el-input v-model="scope.row.isbnno" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cbs" label="出版社">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.cbs }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cbs" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="cbsj" label="出版时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.cbsj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.cbsj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brwc" label="本人位次">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.brwc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.brwc" placeholder="请输入" />
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
          <div v-if="isEdit ==2" class="editBtn" @click="addTeachingData"><i class="addIcon" /> 添加</div>
        </div>
        <div class="tableStyle">
          <el-table :data="teachingData" style="width: 100%;">
            <el-table-column prop="kcmc" label="课程名称">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.kcmc }}</div>
                <div v-else>
                  <el-input v-model="scope.row.kcmc" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="kclx" label="课程类型">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.kclx }}</div>
                <div v-else>
                  <el-input v-model="scope.row.kclx" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="kcxz" label="课程性质">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.kcxz }}</div>
                <div v-else>
                  <el-input v-model="scope.row.kcxz" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ksl" label="课时量">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.ksl }}</div>
                <div v-else>
                  <el-input v-model="scope.row.ksl" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="skrs" label="授课人数">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.skrs }}</div>
                <div v-else>
                  <el-input v-model="scope.row.skrs" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="qssj" label="起始时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.qssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.qssj" placeholder="请输入" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jssj" label="结束时间">
              <template slot-scope="scope">
                <div v-if="isEdit ==1">{{ scope.row.jssj }}</div>
                <div v-else>
                  <el-input v-model="scope.row.jssj" placeholder="请输入" />
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
       <div class="saveBtn"> <i class="icon"></i> 编辑</div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { getDetailQueryPoliticalWorkList } from '@/api/politicalWork/basicInfo'
export default {
  name: 'DetailInfo',

  data() {
    return {
      // basicInfoData: [{ 'pageNum': 1, 'pageSize': 20, 'totalCount': 0, 'orderDirection': 'asc', 'gh': '2005690002', 'xm': '肖科', 'cym': null, 'xbm': '1', 'dwh': '4500', 'csrq': '19701220', 'jg': null, 'jgmc': null, 'mzm': '01', 'zzmmm': null, 'gjdqm': '中国', 'sfzjlxm': null, 'sfzjh': '42032119701220005X', 'hyzkm': '2', 'zgxlm': null, 'zgxwm': null, 'jzgrylbm': '05', 'ryzfl': '非事业编制人员', 'rygwztm': null, 'xklbm': null, 'yjxkm': null, 'ejxkm': null, 'xy': null, 'byxxjdw': null, 'cjgzrq': '19920701', 'lxrq': '20040801', 'cblbm': null, 'sbh': null, 'bgdh': null, 'yddh': '13006156570', 'dzyx': null, 'lxsptgsj': null, 'bllxsxsj': null, 'gztfsj': null, 'dwdw': null, 'sfdqzt': '1', 'mqzt': null, 'yydy': null, 'createTime': 1632793347000, 'updateTime': null, 'totalPage': 0, 'startIndex': 0 }],
      basicInfoData: [],
      workBrifeData: [],
      degreeData: [],
      researchData: [],
      technicalData: [],
      trainData: [],
      examData: [],
      rewardsData: [],
      projectData: [],
      thesisData: [],
      writingData: [],
      teachingData: [],

      dtailsList: ['基本信息', '工作简历', '学历学位信息', '专业技术职务', '学习培训', '年度考核', '奖励表彰信息', '科研情况（项目）', '科研情况（论文）', '科研情况（著作）', '科研情况（教学情况）'],
      current: 0,
      tableData: [],
      isEdit: false,
      value: ''
    }
  },
  created() {
    this.getDetail()
    this.isEdit = this.$route.query.show
  },
  mounted() {

  },

  methods: {
    getDetail() {
      getDetailQueryPoliticalWorkList({ gh: this.$route.query.gh }).then(response => {
        this.basicInfoData = response.zgZgjbxxes
        this.workBrifeData = response.zgGzjls
        this.degreeData = response.zgGzjls
        // this.researchData = response.
        this.technicalData = response.zgZyjszws
        this.trainData = response.zgXxpxes
        this.examData = response.zgNdkhs
        this.rewardsData = response.zgJlbzs
        this.projectData = response.zgXmkyqks
        this.thesisData = response.zgLwkyqks
        this.writingData = response.zgZzkyqks
        this.teachingData = response.zgJxkyqks
        console.log(response, 'response')
      })
    },
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
    addWorkBrifeData() {
      this.workBrifeData.push({
        date: 3
      })
    },
    addtechnicalData() {
      this.tableData.push({
        date: 3
      })
    },
    addTrainData() {
      this.tableData.push({
        date: 3
      })
    },
    addRewardsData() {
      this.tableData.push({
        date: 3
      })
    },
    addExamData() {
      this.tableData.push({
        date: 3
      })
    },
    addProjectData() {
      this.tableData.push({
        date: 3
      })
    },
    addThesisData() {
      this.tableData.push({
        date: 3
      })
    },
    addWritingData() {
      this.tableData.push({
        date: 3
      })
    },
    addTeachingData() {
      this.tableData.push({
        date: 3
      })
    },
    deteleWorkBrifeData(row, index) {
      console.log(index)
      this.workBrifeData.splice(index, 1)
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
  .saveBtn{
          position: relative;
          top:0;
          left: 2200px;
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
          background: url('~@/assets/images/icon_edit_white.png');
          vertical-align: middle;
        }
}
</style>
