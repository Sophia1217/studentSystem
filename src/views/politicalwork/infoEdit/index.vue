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
          <p class="title">信息修改字段设置<el-button class="saveButton" type="primary" @click="onSubmit">保存</el-button></p>
        </div>
        <div id="tag_0" class="headline">基本信息</div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <!-- ///////////////////////////////////////////////////////// -->

        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="allRead()">全部只读</el-button>
        </el-form-item> -->

        <!-- ///////////////////////////////////////////////////////// -->
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">工号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">姓名</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">曾用名</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">性别</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">单位</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出生日期</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">籍贯</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">民族</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">政治面貌</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">国籍/地区</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.nation">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身份证件类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.idType">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">身份证件号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.idNumber">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">婚姻状况</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.marriage">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">最高学历码</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.degreeCode">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">教职工人员类别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.type">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">人员总分类</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.classification">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">人员岗位状态</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.jobStatus">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学科类别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.subject">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">一级学科</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.firstDiscipline">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">二级学科</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.secondDiscipline">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">学缘</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.originDegree">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">毕业学校及单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.university">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">参加工作日期</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.attendWorkDate">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">来校日期</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.attendSchoolDate">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">参保类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.insurance">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">社保号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.insuranceNumber">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">办公电话</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.telephone">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">移动电话</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.mobilephone">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24" class="rowStyle">
                  <div class="wrap">
                    <div class="title">电子邮箱</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.email">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">离校审批通过时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.leavingApprovalDate">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">办理离校手续时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.leavingApplyDate">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">工资停发时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.salaryStopDate">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">调往单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.newWorkPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_1" class="headline">
          <div>工作简历</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">起始时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">终止时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">工作单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">工作内容</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">职位</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">曾任党政职务</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">曾任专业技术职务</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">工作证明人</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">备注</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_2" class="headline">学历学位信息</div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">证书编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">文理科类别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果名称</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果形式</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">完成人</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">完成人工号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">所属单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">所学专业</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">所学专业</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_3" class="headline">科研成果记录表</div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">证书编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">文理科类别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果名称</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果形式</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">完成人</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">完成人工号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">所属单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">华师是否第一单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">奖励类别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">奖种</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">奖励等级</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获奖年份</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">证书颁发日期</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">备注</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.political">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_4" class="headline">
          <div>专业技术职务</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专技职称代码</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专技职称时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">聘任岗位系列</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">聘任岗位等级</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">聘任日期</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">聘任文号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">岗位等级</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">专技等级</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.ethnic">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_5" class="headline">
          <div>学习培训</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>

        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培训名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">组织单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培训地点</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">起始时间</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.sex">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">结束时间</div>
                    <el-form-item>
                      <el-checkbox-group v-model="basicInfoForm.workPlace">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培训性质</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.birth">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">培训级别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.origin">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- <div class="headline">年度考核</div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="考核年度" />
            <el-table-column prop="date" label="考核日期" />
            <el-table-column prop="date" label="考核结果" />
          </el-table>
        </div> -->

        <div id="tag_6" class="headline">
          <div>年度考核</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">考核年度</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">考核日期</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">考核结果</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_7" class="headline">
          <div>奖励表彰信息</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">证书号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获奖类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">奖项名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获奖成果名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">奖项级别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">获奖时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">本人位次</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">表彰部门</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- <div class="headline">政工科研情况（项目）</div>
        <div class="tableStyle">
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="项目名称" />
            <el-table-column prop="date" label="项目级别" />
            <el-table-column prop="date" label="项目编号" />
            <el-table-column prop="date" label="起始时间" />
            <el-table-column prop="date" label="结束时间" />
            <el-table-column prop="date" label="实到经费" />
            <el-table-column prop="date" label="本人位次" />
            <el-table-column prop="date" label="批准部门" />
          </el-table>
        </div> -->

        <div id="tag_8" class="headline">
          <div>政工科研情况（项目）</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">项目名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">项目级别</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">项目编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">起始时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">结束时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">实到经费</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">本人位次</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">批准部门</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_9" class="headline">
          <div>政工科研情况（论文）</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">论文名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">期刊名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">期刊国内标准编号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">期刊类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">发表时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">本人位次</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_10" class="headline">
          <div>政工科研情况（著作）</div>

        </div>
        <div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">著作名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">著作类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">成果所属单位</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">ISBN号</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出版社</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">出版时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">本人位次</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <div id="tag_11" class="headline">
          <div>政工科研情况（教学情况）</div>
<div class="checkButtons">
          <el-button class="checkButton" @click="allRead(basicInfoForm)">全部只读</el-button>
          <el-button class="checkButton" @click="allMust(basicInfoForm)">全部必填</el-button>
        </div>
        </div>
        
        <div class="tableStyle">
          <div class="information">
            <el-form :model="basicInfoForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">课程名称</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.workId">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">课程类型</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.name">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">课程性质</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">课时量</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">授课人数</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">起始时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" class="rowStyle">
                  <div class="wrap">
                    <div class="title">结束时间</div>
                    <el-form-item label="">
                      <el-checkbox-group v-model="basicInfoForm.usedName">
                        <el-checkbox label="只读" />
                        <el-checkbox label="必填" />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
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
      readFlag: false,
      mustFlag: false,
      dtailsList: ['基本信息', '工作简历', '学历学位信息', '科研成果记录', '专业技术职务', '学习培训', '年度考核', '奖励表彰信息', '科研情况（项目）', '科研情况（论文）', '科研情况（著作）', '科研情况（教学情况）'],
      current: 0,
      tableData: [],
      isEdit: false,
      value: '',
      basicInfoForm: {
        workId: [],
        name: [],
        usedName: [],
        sex: [],
        workPlace: [],
        birth: [],
        origin: [],
        ethnic: [],
        political: [],
        nation: [],
        idType: [],
        idNumber: [],
        marriage: [],
        degreeCode: [],
        type: [],
        classification: [],
        jobStatus: [],
        subject: [],
        firstDiscipline: [],
        secondDiscipline: [],
        originDegree: [],
        university: [],
        attendWorkDate: [],
        attendSchoolDate: [],
        insurance: [],
        insuranceNumber: [],
        telephone: [],
        mobilephone: [],
        email: [],
        leavingApprovalDate: [],
        leavingApplyDate: [],
        salaryStopDate: [],
        newWorkPlace: []
      }
    }
  },
  created() {

  },
  mounted() {

  },

  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.basicInfoForm)
    },
    allRead(val) {
      // 勾选
      console.log(val)
      if (!this.readFlag) {
        for (var i in val) {
          if (val[i] != null) {
            if (!val[i].includes('必填')) {
              val[i] = ['只读']
            } else {
              val[i] = ['只读', '必填']
            }
          } else {
            val[i] = ['只读']
          }
        }
        this.readFlag = true
      } else {
        // 反勾选
        this.readFlag = false
        for (var j in val) {
          if (val[j] != null) {
            if (val[j].includes('必填')) {
              val[j] = ['必填']
            } else {
              val[j] = []
            }
          } else {
            val[j] = []
          }
        }
      }
    },
    allMust(val) {
    // 勾选
      if (!this.mustFlag) {
        for (var i in val) {
          if (val[i] != null) {
            if (!val[i].includes('只读')) {
              val[i] = ['必填']
            } else {
              val[i] = ['只读', '必填']
            }
          } else {
            val[i] = ['必填']
          }
        }
        this.mustFlag = true
      } else {
      // 反勾选
        this.mustFlag = false
        for (var j in val) {
          if (val[j] != null) {
            if (val[j].includes('只读')) {
              val[j] = ['只读']
            } else {
              val[j] = []
            }
          } else {
            val[j] = []
          }
        }
      }
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
    }
  }

  // handleList(index) {
  //   this.current = index
  // },
  // addDetailTable() {
  //   this.tableData.push({
  //     date: 3
  //   })
  // },
  // deteleItem(row, index) {
  //   console.log(index)
  //   this.tableData.splice(index, 1)
  // }
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
  .saveButton{
    position: absolute;
    right: 100px;
  }
  .checkButtons{
    position: relative;
    left: 2015px;
    top: -25px;

  }
  .checkButton{
    border-color: #005657;
    color:#005657;

  }
}
</style>
